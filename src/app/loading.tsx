export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/70 px-6 py-5 text-brand-700 shadow-inner">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
        <p className="text-sm font-medium">Preparing your Joyletter dashboard…</p>
      </div>
    </div>
  );
}

