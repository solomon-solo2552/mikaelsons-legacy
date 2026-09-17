export default function PropertyCardSkeleton() {
  return (
    <div className="frame animate-pulse overflow-hidden">
      {/* Image placeholder */}
      <div className="h-56 border-b border-gold/25 bg-ink-soft" />

      {/* Text lines */}
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 bg-gold/20" />
        <div className="h-5 w-3/4 bg-parchment/10" />
        <div className="h-3 w-1/2 bg-parchment/10" />

        {/* Bottom row (price + specs) */}
        <div className="flex items-center justify-between pt-4">
          <div className="h-4 w-20 bg-gold/20" />
          <div className="h-3 w-16 bg-parchment/10" />
        </div>
      </div>
    </div>
  );
}