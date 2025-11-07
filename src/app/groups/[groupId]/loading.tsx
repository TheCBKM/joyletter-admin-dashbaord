export default function GroupLoading() {
  return (
    <div className="space-y-6">
      <div className="glass-panel h-40 animate-pulse rounded-4xl bg-white/60" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="glass-panel h-32 animate-pulse rounded-3xl bg-white/60" />
        ))}
      </div>
    </div>
  );
}

