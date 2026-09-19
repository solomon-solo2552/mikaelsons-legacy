import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

const PLEDGES = [
  {
    title: "What you tell us stays between us",
    body: "Names, contact details, and anything you share about your circumstances are held in confidence. They are never sold, rented, or shared with third parties for marketing.",
  },
  {
    title: "We do not track you",
    body: "This site has no analytics trackers, no advertising pixels, and no fingerprinting. The only cookie used is the one required to keep you logged in if you are a member of staff.",
  },
  {
    title: "You can ask us to forget",
    body: "Write to the family at any time and ask what we hold about you, or ask us to remove it. We will confirm in writing within fourteen days, unless a legal obligation requires us to keep a record.",
  },
  {
    title: "We keep records the way our ancestors did",
    body: "Carefully, and for good reason. Correspondence relating to an active property transaction is retained until the sale completes or the enquiry is withdrawn. After that, it is archived or destroyed at your request.",
  },
  {
    title: "Nothing on this site is for sale",
    body: "We do not sell advertising, sponsored placements, or featured listings to third parties. Every property shown here is on the family's own books.",
  },
];

export default function Pledge() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">OUR PLEDGE</span>
          <h1 className="font-display text-4xl text-parchment">
            What We Promise
          </h1>
          <OrnamentDivider />
          <p className="mt-2 max-w-xl font-body text-parchment/60">
            A family that has kept records for a thousand years knows the
            weight of a name. Here is what yours is worth to us.
          </p>
        </div>

        <div className="space-y-8">
          {PLEDGES.map((item, index) => (
            <div key={item.title} className="flex gap-5">
              <div className="flex-shrink-0 pt-1">
                <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-gold/50">
                  <span className="-rotate-45 font-display text-xs text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
              </div>
              <div>
                <h2 className="font-display text-xl text-gold">{item.title}</h2>
                <p className="mt-2 font-body leading-relaxed text-parchment/75">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <OrnamentDivider className="mx-auto mt-16" />

        <div className="mt-10 text-center">
          <p className="font-body text-parchment/60">
            Questions about any of this? Write to us.
          </p>
          <a href="/contact" className="btn-primary mt-4 inline-block">
            Contact the Estate Office
          </a>
        </div>
      </div>
    </PageTransition>
  );
}