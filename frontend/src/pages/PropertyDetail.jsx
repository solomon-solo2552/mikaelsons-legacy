import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProperty } from "../api/client";
import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
      <rect width='100%' height='100%' fill='#1E1713'/>
      <text x='50%' y='50%' fill='#B8933F' font-family='serif' font-size='22'
        text-anchor='middle' dominant-baseline='middle'>Mikaelson's Legacy</text>
    </svg>
  `);

function formatPrice(price) {
  const n = Number(price);
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    getProperty(slug)
      .then((data) => {
        setProperty(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") {
    return <p className="py-24 text-center font-body text-parchment/50">Retrieving the deed…</p>;
  }

  if (status === "error" || !property) {
    return (
      <div className="py-24 text-center">
        <p className="font-body text-parchment/50">
          This property couldn&apos;t be found, or the Django server isn&apos;t
          running.
        </p>
        <Link to="/properties" className="btn-ghost mt-6 inline-block">
          Back to Properties
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
    { label: "Area", value: `${property.area_sqft.toLocaleString()} sqft` },
    { label: "Established", value: property.year_established || "Unrecorded" },
  ];

  return (
    <PageTransition>
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/properties" className="font-display text-xs tracking-wider2 text-gold hover:underline">
        &larr; BACK TO PROPERTIES
      </Link>

      <div className="mt-6 border border-gold/25">
        <img
          src={property.image || PLACEHOLDER}
          alt={property.title}
          className="h-96 w-full border-b border-gold/25 object-cover"
        />

        <div className="p-8">
          <span className="eyebrow">{property.property_type}</span>
          <h1 className="mt-2 font-display text-4xl text-parchment">{property.title}</h1>
          <p className="mt-1 font-body text-parchment/60">{property.location}</p>

          <p className="mt-6 font-display text-3xl text-gold">{formatPrice(property.price)}</p>

          <OrnamentDivider className="my-8" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-xl text-parchment">{s.value}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-wide text-parchment/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <OrnamentDivider className="my-8" />

          <p className="whitespace-pre-line font-body text-lg leading-relaxed text-parchment/80">
            {property.description || "No description has been recorded for this property yet."}
          </p>

          <Link to={`/contact?property=${property.slug}`} className="btn-primary mt-8 inline-block">
            Request a Viewing
          </Link>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
