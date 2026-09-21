import { Link } from "react-router-dom";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
      <rect width='100%' height='100%' fill='#1E1713'/>
      <text x='50%' y='50%' fill='#B8933F' font-family='serif' font-size='18'
        text-anchor='middle' dominant-baseline='middle'>Mikaelson's Legacy</text>
    </svg>
  `);

function formatPrice(price) {
  const n = Number(price);
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function PropertyCard({ property }) {
  const imageSrc = property.image || PLACEHOLDER;

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="group frame flex flex-col overflow-hidden transition-colors hover:border-gold/70"
    >
      <div className="relative h-56 overflow-hidden border-b border-gold/25">
        <img
          src={imageSrc}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Top-left: FEATURED badge (existing) */}
        {property.is_featured && (
          <span className="absolute left-3 top-3 border border-gold bg-ink/80 px-2 py-1 font-display text-[10px] tracking-wider2 text-gold">
            FEATURED
          </span>
        )}

        {/* Top-right: Status badge (only if not available) */}
        {property.status && property.status !== "available" && (
          <span
            className={`absolute right-3 top-3 border px-2 py-1 font-display text-[10px] tracking-wider2 ${
              property.status === "sold"
              ? "border-burgundy bg-burgundy/80 text-parchment"
              : "border-gold bg-ink/80 text-gold"
            }`}
          >
            {property.status === "sold" ? "SOLD" : "UNDER OFFER"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="eyebrow">{property.property_type}</p>
        <h3 className="font-display text-lg text-parchment">{property.title}</h3>
        <p className="font-body text-sm text-parchment/60">{property.location}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-gold">{formatPrice(property.price)}</span>
          <span className="font-body text-xs text-parchment/50">
            {property.bedrooms} bd &middot; {property.bathrooms} ba
          </span>
        </div>
      </div>
    </Link>
  );
}
