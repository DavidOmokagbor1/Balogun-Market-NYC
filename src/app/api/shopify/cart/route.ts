import { NextRequest, NextResponse } from "next/server";
import {
  addToCart,
  getCart,
  isShopifyConfigured,
  removeCartLine,
  updateCartLine,
} from "@/lib/shopify";

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured) {
    return NextResponse.json(
      { error: "The shop has not been connected to Shopify yet." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      action?: "get" | "add" | "update" | "remove";
      cartId?: string;
      merchandiseId?: string;
      lineId?: string;
      quantity?: number;
    };

    const quantity = Math.max(0, Math.floor(body.quantity ?? 1));

    switch (body.action) {
      case "get": {
        if (!body.cartId) {
          return NextResponse.json({ cart: null });
        }
        return NextResponse.json({ cart: await getCart(body.cartId) });
      }
      case "add": {
        if (!body.merchandiseId || quantity < 1) {
          return NextResponse.json(
            { error: "A product variant and quantity are required." },
            { status: 400 }
          );
        }
        const cart = await addToCart(
          body.merchandiseId,
          quantity,
          body.cartId
        );
        return NextResponse.json({ cart });
      }
      case "update": {
        if (!body.cartId || !body.lineId) {
          return NextResponse.json(
            { error: "Cart and line identifiers are required." },
            { status: 400 }
          );
        }
        const cart = await updateCartLine(
          body.cartId,
          body.lineId,
          quantity
        );
        return NextResponse.json({ cart });
      }
      case "remove": {
        if (!body.cartId || !body.lineId) {
          return NextResponse.json(
            { error: "Cart and line identifiers are required." },
            { status: 400 }
          );
        }
        const cart = await removeCartLine(body.cartId, body.lineId);
        return NextResponse.json({ cart });
      }
      default:
        return NextResponse.json(
          { error: "Unknown cart action." },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Shopify cart error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Shopify could not update the cart.",
      },
      { status: 500 }
    );
  }
}
