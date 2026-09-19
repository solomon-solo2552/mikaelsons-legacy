// import OrnamentDivider from "./OrnamentDivider";

// export default function Footer() {
//   return (
//     <footer className="mt-24 border-t border-gold/25 bg-ink-light">
//       <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
//         <span className="font-crest text-3xl text-gold">M</span>
//         <p className="font-display text-xs tracking-wider2 text-parchment/70">
//           MIKAELSON&apos;S LEGACY &middot; EST. 1001
//         </p>
//         <OrnamentDivider />
//         <p className="max-w-md font-body text-sm text-parchment/60">
//           Four generations of doors opened. One name behind every one of them.
//         </p>
//         <p className="font-body text-xs text-parchment/40">
//           &copy; {new Date().getFullYear()} Mikaelson&apos;s Legacy. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }


import { Link } from "react-router-dom";
import OrnamentDivider from "./OrnamentDivider";

const NAV_LINKS = [
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "Our Story" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { to: "/pledge", label: "Our Pledge" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/25 bg-ink-light">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top: brand + nav columns */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand block */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-crest text-3xl text-gold">M</span>
            <p className="mt-1 font-display text-xs tracking-wider2 text-parchment/70">
              MIKAELSON&apos;S LEGACY
            </p>
            <p className="mt-0.5 font-body text-xs text-parchment/40">
              EST. 1001
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-3 font-display text-xs tracking-wider2 text-gold">
              EXPLORE
            </p>
            <nav className="flex flex-col items-center gap-2 md:items-end">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm text-parchment/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Ornament divider */}
        <OrnamentDivider className="mx-auto my-10" />

        {/* Bottom: motto + copyright + pledge */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="max-w-md font-body text-sm text-parchment/60">
            Four generations of doors opened. One name behind every one of them.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-parchment/40">
            <span>
              &copy; {new Date().getFullYear()} Mikaelson&apos;s Legacy
            </span>
            <span className="hidden sm:inline">&middot;</span>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}