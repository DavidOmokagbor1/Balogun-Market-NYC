import {
  SHOP_CATEGORIES,
  SHOP_HOUSES,
  SHOP_OCCASIONS,
  hasActiveFilters,
  shopHref,
  toggleShopFilter,
  type ShopFilters as ShopFilterState,
  type ShopLane,
} from "@/lib/shop-taxonomy";

const GROUPS: { key: keyof ShopFilterState; label: string; lanes: ShopLane[] }[] = [
  { key: "house", label: "House", lanes: SHOP_HOUSES },
  { key: "category", label: "Category", lanes: SHOP_CATEGORIES.filter((lane) => !lane.forthcoming) },
  { key: "occasion", label: "Occasion", lanes: SHOP_OCCASIONS },
];

export function ShopFilters({ filters }: { filters: ShopFilterState }) {
  return (
    <div style={{ margin: "2rem 0 0" }}>
      {GROUPS.map((group) => (
        <div
          key={group.key}
          className="asa-shop-filter-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            flexWrap: "wrap",
            marginBottom: "0.7rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.32)",
              minWidth: "5.5rem",
            }}
          >
            {group.label}
          </span>
          {group.lanes.map((lane) => {
            const active = filters[group.key] === lane.slug;
            return (
              <a
                key={lane.slug}
                href={shopHref(toggleShopFilter(filters, group.key, lane.slug))}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "0.4rem 0.7rem",
                  border: active
                    ? "1px solid rgba(201,168,106,0.65)"
                    : "1px solid rgba(245,241,232,0.1)",
                  color: active ? "#0A0A0A" : "rgba(245,241,232,0.62)",
                  background: active ? "#C9A86A" : "transparent",
                }}
              >
                {lane.label}
              </a>
            );
          })}
        </div>
      ))}
      {hasActiveFilters(filters) && (
        <a
          href={shopHref()}
          style={{
            display: "inline-block",
            marginTop: "0.35rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A86A",
            textDecoration: "none",
          }}
        >
          Clear filters
        </a>
      )}
    </div>
  );
}
