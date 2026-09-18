import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import OrnamentDivider from "../components/OrnamentDivider";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import PageTransition from "../components/PageTransition";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProperties()
      .then((data) => {
        const results = data.results || data;
        setFeatured(results.filter((p) => p.is_featured).slice(0, 3));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <PageTransition>
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-gradient">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-28 md:py-36">
          <span className="eyebrow">A FAMILY BUSINESS SINCE 1001</span>
          <h1 className="max-w-2xl font-display text-4xl leading-tight text-parchment md:text-6xl">
            Four generations of doors opened.
            <br />
            <span className="text-gold">One name behind every one of them.</span>
          </h1>
          <p className="max-w-lg font-body text-lg text-parchment/70">
            For over a thousand years, the Mikaelson family has found homes worth
            keeping in the family — manors, estates, and land passed down rather
            than simply sold.
          </p>
          <div className="mt-4 flex gap-4">
            <Link to="/properties" className="btn-primary">
              View Properties
            </Link>
            <Link to="/about" className="btn-ghost">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">THE CURRENT PORTFOLIO</span>
          <h2 className="font-display text-3xl text-parchment">Featured Properties</h2>
          <OrnamentDivider />
        </div>

        {status === "loading" && (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
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
        {status === "ready" && featured.length === 0 && (
          <p className="text-center font-body text-parchment/50">
            No featured properties yet — run{" "}
            <code className="text-gold">python manage.py seed_properties</code> to add
            sample listings.
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Family line */}
      <section className="border-y border-gold/20 bg-ink-light">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 text-center md:grid-cols-3">
          <div>
            <p className="font-display text-4xl text-gold">1001</p>
            <p className="mt-2 font-body text-sm text-parchment/60">Year the family began</p>
          </div>
          <div>
            <p className="font-display text-4xl text-gold">4</p>
            <p className="mt-2 font-body text-sm text-parchment/60">Generations in the trade</p>
          </div>
          <div>
            <p className="font-display text-4xl text-gold">1</p>
            <p className="mt-2 font-body text-sm text-parchment/60">Name behind every door</p>
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
