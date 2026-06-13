export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--page)] p-5 text-[var(--text)] sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-10 w-40 animate-pulse rounded-md bg-[var(--skeleton)]" />
        <div className="mt-10 h-12 w-8/12 max-w-2xl animate-pulse rounded-md bg-[var(--skeleton)]" />
        <div className="mt-4 h-5 w-7/12 max-w-xl animate-pulse rounded-md bg-[var(--skeleton)]" />
        <div className="mt-10 grid gap-3 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="h-56 animate-pulse rounded-lg border border-[var(--line)] bg-[var(--panel)]" />
          <div className="h-56 animate-pulse rounded-lg border border-[var(--line)] bg-[var(--panel)]" />
        </div>
        <div className="mt-8 grid gap-3 xl:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-lg border border-[var(--line)] bg-[var(--panel)]" />
          ))}
        </div>
      </div>
    </div>
  );
}
