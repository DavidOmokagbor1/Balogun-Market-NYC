import type {
  ShopifyCart,
  ShopifyProduct,
} from "@/types/shopify";

function normalizeStoreDomain(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;
  const value = raw.trim();

  // People often paste the Headless admin URL instead of the store domain.
  // https://admin.shopify.com/store/{handle}/headless/...
  const adminMatch = value.match(/admin\.shopify\.com\/store\/([^/?#]+)/i);
  if (adminMatch?.[1]) return `${adminMatch[1]}.myshopify.com`;

  try {
    const url = value.includes("://") ? new URL(value) : new URL(`https://${value}`);
    return url.hostname;
  } catch {
    return value.replace(/^https?:\/\//, "").split("/")[0]?.replace(/\/$/, "") || undefined;
  }
}

const domain = normalizeStoreDomain(process.env.SHOPIFY_STORE_DOMAIN);
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-07";
// Shopify primary/checkout host. Apex stays on Shopify; www is the Vercel storefront.
const checkoutHost =
  process.env.SHOPIFY_CHECKOUT_HOST?.trim().replace(/^https?:\/\//, "") ||
  "balogunmarketnyc.com";

export const isShopifyConfigured = Boolean(domain && accessToken);

interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface UserError {
  field?: string[] | null;
  message: string;
}

export class ShopifyConfigError extends Error {
  constructor() {
    super(
      "Shopify is not configured. Add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
    this.name = "ShopifyConfigError";
  }
}

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!domain || !accessToken) throw new ShopifyConfigError();

  const response = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify Storefront API returned ${response.status}.`);
  }

  const payload = (await response.json()) as ShopifyResponse<T>;
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }
  if (!payload.data) throw new Error("Shopify returned no data.");

  return payload.data;
}

function assertNoUserErrors(errors: UserError[]) {
  if (errors.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }
}

const productFields = `
  id
  handle
  title
  description
  descriptionHtml
  productType
  vendor
  tags
  availableForSale
  featuredImage {
    url
    altText
    width
    height
  }
  images(first: 10) {
    nodes {
      url
      altText
      width
      height
    }
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  variants(first: 50) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      selectedOptions {
        name
        value
      }
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      image {
        url
        altText
        width
        height
      }
    }
  }
`;

const cartFields = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
          product {
            handle
            title
            featuredImage {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

function reshapeProduct(product: Omit<ShopifyProduct, "images" | "variants"> & {
  images: { nodes: ShopifyProduct["images"] };
  variants: { nodes: ShopifyProduct["variants"] };
}): ShopifyProduct {
  return {
    ...product,
    images: product.images.nodes,
    variants: product.variants.nodes,
  };
}

function reshapeCart(cart: Omit<ShopifyCart, "lines"> & {
  lines: { nodes: ShopifyCart["lines"] };
}): ShopifyCart {
  return {
    ...cart,
    checkoutUrl: normalizeCheckoutUrl(cart.checkoutUrl),
    lines: cart.lines.nodes,
  };
}

function normalizeCheckoutUrl(url: string): string {
  if (!url || !checkoutHost) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith(".myshopify.com")) {
      parsed.hostname = checkoutHost;
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

export async function getProducts(first = 24): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: {
      nodes: Array<
        Omit<ShopifyProduct, "images" | "variants"> & {
          images: { nodes: ShopifyProduct["images"] };
          variants: { nodes: ShopifyProduct["variants"] };
        }
      >;
    };
  }>(
    `query Products($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        nodes { ${productFields} }
      }
    }`,
    { first }
  );

  return data.products.nodes.map(reshapeProduct);
}

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    product: (Omit<ShopifyProduct, "images" | "variants"> & {
      images: { nodes: ShopifyProduct["images"] };
      variants: { nodes: ShopifyProduct["variants"] };
    }) | null;
  }>(
    `query Product($handle: String!) {
      product(handle: $handle) { ${productFields} }
    }`,
    { handle }
  );

  return data.product ? reshapeProduct(data.product) : null;
}

export async function getCart(id: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{
    cart: (Omit<ShopifyCart, "lines"> & {
      lines: { nodes: ShopifyCart["lines"] };
    }) | null;
  }>(
    `query Cart($id: ID!) {
      cart(id: $id) { ${cartFields} }
    }`,
    { id }
  );

  return data.cart ? reshapeCart(data.cart) : null;
}

export async function addToCart(
  merchandiseId: string,
  quantity: number,
  cartId?: string
): Promise<ShopifyCart> {
  if (cartId) {
    const data = await shopifyFetch<{
      cartLinesAdd: {
        cart: Omit<ShopifyCart, "lines"> & {
          lines: { nodes: ShopifyCart["lines"] };
        };
        userErrors: UserError[];
      };
    }>(
      `mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${cartFields} }
          userErrors { field message }
        }
      }`,
      { cartId, lines: [{ merchandiseId, quantity }] }
    );
    assertNoUserErrors(data.cartLinesAdd.userErrors);
    return reshapeCart(data.cartLinesAdd.cart);
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: Omit<ShopifyCart, "lines"> & {
        lines: { nodes: ShopifyCart["lines"] };
      };
      userErrors: UserError[];
    };
  }>(
    `mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart { ${cartFields} }
        userErrors { field message }
      }
    }`,
    { input: { lines: [{ merchandiseId, quantity }], buyerIdentity: { countryCode: "US" } } }
  );
  assertNoUserErrors(data.cartCreate.userErrors);
  return reshapeCart(data.cartCreate.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: Omit<ShopifyCart, "lines"> & {
        lines: { nodes: ShopifyCart["lines"] };
      };
      userErrors: UserError[];
    };
  }>(
    `mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${cartFields} }
        userErrors { field message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: Omit<ShopifyCart, "lines"> & {
        lines: { nodes: ShopifyCart["lines"] };
      };
      userErrors: UserError[];
    };
  }>(
    `mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${cartFields} }
        userErrors { field message }
      }
    }`,
    { cartId, lineIds: [lineId] }
  );
  assertNoUserErrors(data.cartLinesRemove.userErrors);
  return reshapeCart(data.cartLinesRemove.cart);
}
