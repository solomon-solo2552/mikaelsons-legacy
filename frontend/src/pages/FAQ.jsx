import { useState } from "react";
import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

const FAQS = [
  {
    q: "What kinds of properties does the family handle?",
    a: "Manors, country estates, historic townhouses, cottages, and land. We deliberately keep a small portfolio — every property we list has been walked, documented, and vouched for by someone bearing the family name.",
  },
  {
    q: "Do you handle international buyers?",
    a: "Yes. The family has placed properties with buyers from across Europe and North America for over two centuries. Correspondence in English, French, and German is welcome; all legal proceedings are handled through your own solicitor.",
  },
  {
    q: "How long does a sale typically take?",
    a: "From first enquiry to completed deed, most sales run between three and nine months. Historic properties with listed status can take longer — we will tell you honestly on the first call what we expect for your specific case.",
  },
  {
    q: "Are property images and descriptions accurate?",
    a: "Every photograph on this site was taken by the family or by a photographer we have worked with for years. Descriptions include what is remarkable and what is difficult — the roof that needs replacing, the wing that stays cold in winter. You should know both before you visit.",
  },
  {
    q: "Do you offer valuations for properties not on your books?",
    a: "Yes, for a modest fee. This is how many of our longest relationships began — a family wanting an honest second opinion on a property they already own, or intend to purchase elsewhere.",
  },
  {
    q: "How do I arrange a viewing?",
    a: "Use the contact form on any property page, or write to us through the Contact page directly. Someone from the family will respond within one business day to arrange a time that suits you.",
  },
  {
    q: "What is your commission?",
    a: "Our standard commission is disclosed in writing before any property is listed with us. There are no hidden fees, no marketing surcharges, and no charge if a sale does not complete.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">FREQUENTLY ASKED</span>
          <h1 className="font-display text-4xl text-parchment">
            Questions Put to the Family
          </h1>
          <OrnamentDivider />
          <p className="mt-2 max-w-xl font-body text-parchment/60">
            Asked often enough, over enough centuries, that we finally wrote
            them down.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`frame transition-colors ${
                  isOpen ? "border-gold/60" : "hover:border-gold/50"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span
                    className={`font-display text-base transition-colors ${
                      isOpen ? "text-gold" : "text-parchment"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 font-display text-xl text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="border-t border-gold/20 px-5 py-4 font-body leading-relaxed text-parchment/75">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <OrnamentDivider className="mx-auto" />
          <p className="mt-8 font-body text-parchment/60">
            Still curious about something?
          </p>
          <a href="/contact" className="btn-primary mt-4 inline-block">
            Write to the Family
          </a>
        </div>
      </div>
    </PageTransition>
  );
}