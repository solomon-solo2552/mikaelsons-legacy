import { useEffect, useState } from "react";
import { getProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import OrnamentDivider from "../components/OrnamentDivider";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import PageTransition from "../components/PageTransition";

const TYPES = [
  { value: "", label: "All Types" },
  { value: "manor", label: "Manor" },
  { value: "estate", label: "Estate" },
  { value: "townhouse", label: "Townhouse" },
  { value: "cottage", label: "Cottage" },
  { value: "land", label: "Land" },
];

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setStatus("loading");
    const params = {};
    if (search) params.search = search;
    if (type) params.type = type;

    const timeout = setTimeout(() => {
      getProperties(params)
        .then((data) => {
          setProperties(data.results || data);
          setStatus("ready");
        })
        .catch(() => setStatus("error"));
    }, 300); // small debounce so typing doesn't fire a request per key

    return () => clearTimeout(timeout);
  }, [search, type]);

  return (
    <PageTransition>
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <span className="eyebrow">THE PORTFOLIO</span>
        <h1 className="font-display text-4xl text-parchment">All Properties</h1>
        <OrnamentDivider />
      </div>

      <div className="mb-10 flex flex-col gap-4 border border-gold/25 bg-ink-soft/40 p-5 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search by name or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gold/30 bg-transparent px-4 py-2 font-body text-parchment placeholder:text-parchment/40 focus:border-gold focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gold/30 bg-ink px-4 py-2 font-display text-sm tracking-wider text-parchment focus:border-gold focus:outline-none"
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {status === "loading" && (
  <div className="grid gap-8 md:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
)}
      {status === "error" && (
  <div className="frame mx-auto max-w-md p-8 text-center">
    <p className="font-display text-lg text-burgundy-light">
      The estate office is unreachable
    </p>
    <p className="mt-3 font-body text-sm text-parchment/60">
      Make sure the Django server is running on port 8000.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="btn-ghost mt-6"
    >
      Try Again
    </button>
  </div>
)}
      {status === "ready" && properties.length === 0 && (
        <p className="text-center font-body text-parchment/50">
          Nothing matches that search — try a different name or type.
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
    </PageTransition>
  );
}
