import { useState } from "react";
import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

const TIMELINE = [
  {
    year: "1001",
    title: "The First Deed",
    text: "A single stone hall in the border country, traded for grain and a promise. The Mikaelson name enters the property trade.",
  },
  {
    year: "1187",
    title: "Caerleon Keep Acquired",
    text: "The family's first fortified property, still in the portfolio today after eight hundred years of repairs.",
  },
  {
    year: "1345",
    title: "Duncairn Castle",
    text: "A strategic marriage brings a castle in the north of Ireland into the family's keeping.",
  },
  {
    year: "1521",
    title: "St. Aubyn Manor",
    text: "Acquired during the dissolution of the monasteries — one of the first properties the family brokered for another family rather than keeping.",
  },
  {
    year: "1603",
    title: "The Great Rebuild",
    text: "Netherwood Hall is rebuilt in the Jacobean style; the family begins keeping formal records of every transaction.",
  },
  {
    year: "1701",
    title: "The Modern Practice",
    text: "What had been a family habit becomes a trade. The first paper ledger of commissions is opened.",
  },
  {
    year: "1892",
    title: "The First Office",
    text: "A townhouse in Bath becomes the family's first formal office. It still stands, now a museum.",
  },
  {
    year: "1978",
    title: "The Register Digitised",
    text: "The complete archive of deeds and correspondence is microfilmed; only the oldest two centuries remain on parchment.",
  },
  {
    year: "Today",
    title: "Four Generations On",
    text: "The family continues to work the way it always has — fewer properties, known well, represented honestly.",
  },
];

export default function About() {
  const [activeYear, setActiveYear] = useState(TIMELINE[0].year);
  const active = TIMELINE.find((t) => t.year === activeYear);

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">OUR STORY</span>
          <h1 className="font-display text-4xl text-parchment">
            A Thousand Years in the Trade
          </h1>
          <OrnamentDivider />
        </div>

        {/* Section: Opening */}
        <p className="font-body text-lg leading-relaxed text-parchment/80">
          A family that has sold land for a thousand years has learned
          something a younger firm cannot buy: that a house is not a
          transaction, but a chapter. The Mikaelsons have placed homes into
          hands that intended to keep them since the year 1001, when the first
          deed was drawn on parchment and signed by a name that is still
          spoken today.
        </p>

        {/* Section: The Founding */}
        <div className="mt-14">
          <p className="eyebrow mb-3">THE FOUNDING · 1001–1200</p>
          <p className="font-body text-lg leading-relaxed text-parchment/80">
            The family&apos;s first recorded property was a single stone hall
            in the border country, traded for grain and a promise of loyalty
            to a local lord. Over the next two centuries, the Mikaelsons
            acquired scattered parcels of land, smallholdings, and the ruins
            of an older Norman keep — learning, by necessity, the craft of
            matching families to places.
          </p>
        </div>

        {/* Section: The Middle Centuries */}
        <div className="mt-12">
          <p className="eyebrow mb-3">THE MIDDLE CENTURIES · 1200–1700</p>
          <p className="font-body text-lg leading-relaxed text-parchment/80">
            Through plagues, wars, and the dissolution of the monasteries, the
            family survived by being useful rather than grand — brokering the
            transfer of estates for those who could no longer keep them. By
            the seventeenth century, the Mikaelson name was known in three
            shires as the quiet party in any transfer that needed to be done
            well and forgotten quickly.
          </p>
        </div>

        {/* Section: The Modern Trade */}
        <div className="mt-12">
          <p className="eyebrow mb-3">THE MODERN TRADE · 1700–PRESENT</p>
          <p className="font-body text-lg leading-relaxed text-parchment/80">
            The eighteenth century brought the modern estate agency into
            being, and the Mikaelsons adapted. What had once been a matter of
            local trust became a formal profession. By 1892, the family had
            opened its first proper office — in a townhouse that still stands,
            now a museum. Four generations later, the trade is unchanged at
            its heart: fewer properties, known well, represented honestly.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <p className="eyebrow">THE LINE</p>
            <h2 className="mt-2 font-display text-2xl text-parchment">
              A Thousand Years, in Nine Moments
            </h2>
          </div>

          {/* Year buttons row */}
          <div className="mb-10 overflow-x-auto">
            <div className="mx-auto flex min-w-max items-center justify-center gap-1 px-4">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex items-center">
                  <button
                    onClick={() => setActiveYear(item.year)}
                    className={`flex flex-col items-center gap-2 px-3 py-2 transition-colors ${
                      activeYear === item.year
                        ? "text-gold"
                        : "text-parchment/40 hover:text-parchment/80"
                    }`}
                  >
                    <span className="font-display text-xs tracking-wider2">
                      {item.year}
                    </span>
                    <span
                      className={`h-3 w-3 rotate-45 border transition-all ${
                        activeYear === item.year
                          ? "scale-125 border-gold bg-gold"
                          : "border-parchment/40 bg-transparent"
                      }`}
                    />
                  </button>
                  {i < TIMELINE.length - 1 && (
                    <span className="h-px w-6 bg-gold/30 md:w-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active event card */}
          <div className="frame mx-auto max-w-2xl p-8 text-center transition-opacity duration-300">
            <p className="font-display text-3xl text-gold">{active.year}</p>
            <h3 className="mt-4 font-display text-xl text-parchment">
              {active.title}
            </h3>
            <OrnamentDivider className="mx-auto my-6" />
            <p className="font-body leading-relaxed text-parchment/75">
              {active.text}
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-20">
          <p className="eyebrow mb-3">THE FAMILY TODAY</p>
          <p className="font-body text-lg leading-relaxed text-parchment/80">
            Today the family works from three offices across England,
            Scotland, and Ireland — but the discipline remains the same. Every
            property in the portfolio has been walked, documented, and vouched
            for by someone bearing the Mikaelson name. If you are considering
            selling or buying a home you intend to keep for a long time, we
            would be glad to hear from you.
          </p>

          <div className="mt-10 text-center">
            <OrnamentDivider className="mx-auto" />
            <a href="/contact" className="btn-primary mt-8 inline-block">
              Write to the Family
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}