"use client";

export default function SchedulePage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div className="mx-4 w-full max-w-md rounded-xl border border-[var(--line)] bg-[var(--page)] p-8 shadow-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-semibold">ตารางเรียน</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          ตารางเรียนยังไม่มาอ่าา รอแปปนึงนะะ 🚧
        </p>
        <a
          href="/"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-[var(--text)] px-5 text-sm font-semibold text-[var(--page)] transition hover:opacity-90 active:scale-[0.98]"
        >
          กลับหน้าแรก
        </a>
      </div>
    </div>
  );
}