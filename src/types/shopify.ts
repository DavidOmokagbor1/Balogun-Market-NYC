export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifyProductOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: ShopifyProductOption[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
  };
  merchandise: ShopifyProductVariant & {
    product: Pick<ShopifyProduct, "handle" | "title" | "featuredImage">;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney | null;
  };
  lines: ShopifyCartLine[];
}
