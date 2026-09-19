// import { NavLink } from "react-router-dom";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/properties", label: "Properties" },
//   { to: "/about", label: "Our Story" },
//   { to: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   return (
//     <header className="border-b border-gold/25 bg-ink/95 backdrop-blur sticky top-0 z-40">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
//         <NavLink to="/" className="flex items-baseline gap-3">
//           <span className="font-crest text-3xl text-gold leading-none">M</span>
//           <span className="font-display text-sm tracking-wider2 text-parchment">
//             MIKAELSON&apos;S <span className="text-gold">LEGACY</span>
//           </span>
//         </NavLink>

//         <nav className="hidden gap-8 md:flex">
//           {links.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               end={link.to === "/"}
//               className={({ isActive }) =>
//                 `font-display text-xs tracking-wider2 transition-colors ${
//                   isActive ? "text-gold" : "text-parchment/80 hover:text-gold"
//                 }`
//               }
//             >
//               {link.label.toUpperCase()}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }


import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "Our Story" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-baseline gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="font-crest text-3xl text-gold leading-none">M</span>
          <span className="font-display text-sm tracking-wider2 text-parchment">
            MIKAELSON&apos;S <span className="text-gold">LEGACY</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `font-display text-xs tracking-wider2 transition-colors ${
                  isActive ? "text-gold" : "text-parchment/80 hover:text-gold"
                }`
              }
            >
              {link.label.toUpperCase()}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-gold transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gold transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gold transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <nav
        className={`overflow-hidden border-t border-gold/25 bg-ink transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-80" : "max-h-0 border-t-0"
        }`}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block border-b border-gold/10 px-6 py-4 font-display text-xs tracking-wider2 transition-colors ${
                isActive ? "text-gold" : "text-parchment/80 hover:text-gold"
              }`
            }
          >
            {link.label.toUpperCase()}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}