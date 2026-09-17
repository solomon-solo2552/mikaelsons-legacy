import OrnamentDivider from "./OrnamentDivider";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/25 bg-ink-light">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
        <span className="font-crest text-3xl text-gold">M</span>
        <p className="font-display text-xs tracking-wider2 text-parchment/70">
          MIKAELSON&apos;S LEGACY &middot; EST. 1001
        </p>
        <OrnamentDivider />
        <p className="max-w-md font-body text-sm text-parchment/60">
          Four generations of doors opened. One name behind every one of them.
        </p>
        <p className="font-body text-xs text-parchment/40">
          &copy; {new Date().getFullYear()} Mikaelson&apos;s Legacy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
