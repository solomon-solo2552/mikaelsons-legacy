import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition"; 

const TIMELINE = [
  { year: "1001", text: "The first Mikaelson deed is recorded — a single stone hall traded for grain and a promise." },
  { year: "1421", text: "Ravenswick Manor is acquired and becomes the family's seat for the next six centuries." },
  { year: "1732", text: "The family begins handling estates for others, not only their own — the trade begins in earnest." },
  { year: "Today", text: "Four generations later, the name still means the same thing it always has: kept, not just sold." },
];

export default function About() {
  return (
    <PageTransition>
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-14 flex flex-col items-center gap-3 text-center">
        <span className="eyebrow">OUR STORY</span>
        <h1 className="font-display text-4xl text-parchment">A Thousand Years in the Trade</h1>
        <OrnamentDivider />
      </div>

      <p className="font-body text-lg leading-relaxed text-parchment/80">
        Mikaelson&apos;s Legacy did not begin as a business. It began as a family
        keeping its own house in order, and slowly earning the trust of
        neighbors who wanted the same. What started with a single hall in 1001
        has become four generations of finding homes for families who intend
        to keep them — not simply sell them again next year.
      </p>

      <p className="mt-6 font-body text-lg leading-relaxed text-parchment/80">
        We still work the way the first Mikaelsons did: fewer properties,
        known well, represented honestly. Every estate in our portfolio has
        been walked, documented, and vouched for by someone bearing the
        family name.
      </p>

      <div className="mt-16">
        <h2 className="mb-8 text-center font-display text-2xl text-parchment">The Line</h2>
        <div className="space-y-8 border-l border-gold/30 pl-8">
          {TIMELINE.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[38px] top-1 h-3 w-3 rotate-45 border border-gold bg-ink" />
              <p className="font-display text-gold">{item.year}</p>
              <p className="mt-1 font-body text-parchment/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
