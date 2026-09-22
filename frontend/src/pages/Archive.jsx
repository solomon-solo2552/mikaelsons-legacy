import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

export default function Archive() {
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProperties({ status: "sold" })
      .then((data) => {
        setProperties(data.results || data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">THE ARCHIVE</span>
          <h1 className="font-display text-4xl text-parchment">
            Properties Placed Into Good Hands
          </h1>
          <OrnamentDivider />
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-parchment/70">
            Since 1001, the family has placed thousands of properties into
            hands that intended to keep them. A selection from the family&apos;s
            records — homes that are no longer on the market, but whose stories
            remain in the register.
          </p>
        </div>

        {/* Loading skeletons */}
        {status === "loading" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
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

        {/* Empty state */}
        {status === "ready" && properties.length === 0 && (
          <div className="frame mx-auto max-w-md p-10 text-center">
            <p className="font-display text-2xl text-gold">
              The Archive Is Being Prepared
            </p>
            <p className="mt-3 font-body text-parchment/60">
              The family&apos;s earliest records are still being catalogued.
              Please visit again soon.
            </p>
          </div>
        )}

        {/* Results */}
        {status === "ready" && properties.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <OrnamentDivider className="mx-auto" />
              <p className="mt-8 font-body text-parchment/60">
                Looking for something currently available?
              </p>
              <Link to="/properties" className="btn-primary mt-4 inline-block">
                View the Current Portfolio
              </Link>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}