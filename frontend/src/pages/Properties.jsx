import { useEffect, useState } from "react";
import { getProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import OrnamentDivider from "../components/OrnamentDivider";
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
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  // Reset page to 1 whenever search/type changes
  useEffect(() => {
    setPage(1);
  }, [search, type]);

  useEffect(() => {
    setStatus("loading");
    const params = { page };
    if (search) params.search = search;
    if (type) params.type = type;

    const timeout = setTimeout(() => {
      getProperties(params)
        .then((data) => {
          // DRF paginated response
          if (data && typeof data === "object" && "results" in data) {
            setProperties(data.results || []);
            setTotalCount(data.count || 0);
            setHasNext(Boolean(data.next));
            setHasPrevious(Boolean(data.previous));
          } else {
            // Fallback: non-paginated response
            setProperties(data || []);
            setTotalCount((data || []).length);
            setHasNext(false);
            setHasPrevious(false);
          }
          setStatus("ready");
        })
        .catch(() => setStatus("error"));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, type, page]);

  const goToPage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">THE PORTFOLIO</span>
          <h1 className="font-display text-4xl text-parchment">All Properties</h1>
          <OrnamentDivider />
          {totalCount > 0 && (
            <p className="mt-2 font-body text-sm text-parchment/50">
              {totalCount} propert{totalCount === 1 ? "y" : "ies"} on the family&apos;s books
            </p>
          )}
        </div>

        {/* Filters */}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
          <div className="frame mx-auto max-w-md p-10 text-center">
            <p className="font-display text-2xl text-gold">No Properties Match</p>
            <p className="mt-3 font-body text-parchment/60">
              Try a different search or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setType("");
              }}
              className="btn-ghost mt-6"
            >
              Clear Filters
            </button>
          </div>
        )}

        {status === "ready" && properties.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination controls */}
            {(hasNext || hasPrevious) && (
              <div className="mt-14 flex items-center justify-center gap-4">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={!hasPrevious}
                  className={`font-display text-xs tracking-wider2 transition-colors ${
                    hasPrevious
                      ? "text-gold hover:text-parchment"
                      : "cursor-not-allowed text-parchment/25"
                  }`}
                >
                  &larr; PREVIOUS
                </button>

                <span className="font-display text-xs tracking-wider2 text-parchment/60">
                  PAGE {page}
                </span>

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={!hasNext}
                  className={`font-display text-xs tracking-wider2 transition-colors ${
                    hasNext
                      ? "text-gold hover:text-parchment"
                      : "cursor-not-allowed text-parchment/25"
                  }`}
                >
                  NEXT &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}