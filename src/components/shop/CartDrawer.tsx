"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const {
    cart,
    isOpen,
    isLoading,
    error,
    closeCart,
    updateItem,
    removeItem,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 700,
              border: 0,
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(5px)",
              cursor: "pointer",
            }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 710,
              width: "min(460px, 100vw)",
              display: "flex",
              flexDirection: "column",
              background: "#0A0A0A",
              borderLeft: "1px solid rgba(201,168,106,0.2)",
            }}
          >
            <div
              style={{
                height: 72,
                padding: "0 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(245,241,232,0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <ShoppingBag size={16} color="#C9A86A" />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#F5F1E8",
                  }}
                >
                  The bag ({cart?.totalQuantity ?? 0})
                </span>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                style={{
                  padding: "0.4rem",
                  border: 0,
                  background: "transparent",
                  color: "#F5F1E8",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
              {error && (
                <p
                  style={{
                    padding: "0.8rem",
                    border: "1px solid rgba(201,168,106,0.3)",
                    color: "#C9A86A",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </p>
              )}

              {!cart?.lines.length ? (
                <div
                  style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <ShoppingBag
                    size={30}
                    strokeWidth={1}
                    color="rgba(245,241,232,0.25)"
                  />
                  <h2
                    style={{
                      margin: "1.25rem 0 0.5rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 300,
                      color: "#F5F1E8",
                    }}
                  >
                    Your bag is waiting.
                  </h2>
                  <p
                    style={{
                      maxWidth: 260,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      lineHeight: 1.7,
                      color: "rgba(245,241,232,0.4)",
                    }}
                  >
                    Pieces from Y&apos;WANDELAG and Mokhueleigbe — Shop the Show
                    when the collection is live.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    style={{
                      marginTop: "1.2rem",
                      color: "#C9A86A",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Enter the shop →
                  </Link>
                </div>
              ) : (
                cart.lines.map((line) => {
                  const image =
                    line.merchandise.image ||
                    line.merchandise.product.featuredImage;
                  return (
                    <article
                      key={line.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "92px 1fr",
                        gap: "1rem",
                        paddingBottom: "1.25rem",
                        marginBottom: "1.25rem",
                        borderBottom: "1px solid rgba(245,241,232,0.08)",
                      }}
                    >
                      <Link
                        href={`/shop/${line.merchandise.product.handle}`}
                        onClick={closeCart}
                        style={{
                          display: "block",
                          height: 118,
                          background: "#111",
                          overflow: "hidden",
                        }}
                      >
                        {image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={image.url}
                            alt={
                              image.altText ||
                              line.merchandise.product.title
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </Link>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "0.8rem",
                          }}
                        >
                          <div>
                            <Link
                              href={`/shop/${line.merchandise.product.handle}`}
                              onClick={closeCart}
                              style={{
                                color: "#F5F1E8",
                                textDecoration: "none",
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "1.15rem",
                              }}
                            >
                              {line.merchandise.product.title}
                            </Link>
                            {line.merchandise.title !== "Default Title" && (
                              <p
                                style={{
                                  margin: "0.3rem 0 0",
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "0.58rem",
                                  color: "rgba(245,241,232,0.4)",
                                }}
                              >
                                {line.merchandise.title}
                              </p>
                            )}
                          </div>
                          <button
                            aria-label={`Remove ${line.merchandise.product.title}`}
                            onClick={() => removeItem(line.id)}
                            disabled={isLoading}
                            style={{
                              alignSelf: "flex-start",
                              border: 0,
                              padding: "0.2rem",
                              background: "transparent",
                              color: "rgba(245,241,232,0.35)",
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p
                          style={{
                            margin: "0.8rem 0",
                            color: "#C9A86A",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.7rem",
                          }}
                        >
                          {formatMoney(line.cost.totalAmount)}
                        </p>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            border: "1px solid rgba(245,241,232,0.12)",
                          }}
                        >
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              line.quantity === 1
                                ? removeItem(line.id)
                                : updateItem(line.id, line.quantity - 1)
                            }
                            disabled={isLoading}
                            style={quantityButtonStyle}
                          >
                            <Minus size={11} />
                          </button>
                          <span
                            style={{
                              minWidth: 32,
                              textAlign: "center",
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.65rem",
                              color: "#F5F1E8",
                            }}
                          >
                            {line.quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateItem(line.id, line.quantity + 1)
                            }
                            disabled={isLoading}
                            style={quantityButtonStyle}
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {cart && cart.totalQuantity > 0 && (
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid rgba(245,241,232,0.1)",
                  background: "#080808",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(245,241,232,0.5)",
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.4rem",
                      color: "#F5F1E8",
                    }}
                  >
                    {formatMoney(cart.cost.subtotalAmount)}
                  </span>
                </div>
                <p
                  style={{
                    margin: "0 0 1rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.58rem",
                    color: "rgba(245,241,232,0.3)",
                  }}
                >
                  Shipping and taxes are calculated securely by Shopify.
                </p>
                {cart.checkoutUrl ? (
                  <a
                    href={cart.checkoutUrl}
                    rel="noopener noreferrer"
                    style={{
                      width: "100%",
                      minHeight: 52,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#C9A86A",
                      color: "#0A0A0A",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Secure checkout
                  </a>
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,241,232,0.35)",
                    }}
                  >
                    Checkout is preparing — return shortly.
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

const quantityButtonStyle = {
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  background: "transparent",
  color: "rgba(245,241,232,0.7)",
  cursor: "pointer",
} as const;
