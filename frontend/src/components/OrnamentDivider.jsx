// A simple gold flourish used instead of a plain <hr>, to keep the
// "gothic manuscript" feel without pulling in an icon library.
export default function OrnamentDivider({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`h-4 w-40 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <line x1="0" y1="12" x2="95" y2="12" />
      <line x1="145" y1="12" x2="240" y2="12" />
      <path d="M120 2 L128 12 L120 22 L112 12 Z" />
      <circle cx="120" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
