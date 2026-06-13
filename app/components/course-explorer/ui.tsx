"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

export const motionTiming = {
  instant: 0.01,
  feedback: 0.12,
  state: 0.18,
  reveal: 0.22,
} as const;

const easeOutQuint = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function stateTransition(reduceMotion?: boolean | null, duration: number = motionTiming.state) {
  return reduceMotion ? { duration: motionTiming.instant } : { duration, ease: easeOutQuint };
}

export function listTransition(index: number, reduceMotion?: boolean | null) {
  return reduceMotion
    ? { duration: motionTiming.instant }
    : {
        duration: motionTiming.state,
        delay: Math.min(index, 8) * 0.025,
        ease: easeOutQuint,
      };
}

export function AccordionItem({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(Boolean(defaultOpen));
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-[var(--panel-soft)] active:bg-[var(--panel-soft)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronIcon open={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={stateTransition(shouldReduceMotion, motionTiming.reveal)}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--line)] p-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SectionEmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--line-strong)] bg-[var(--panel-soft)] p-6 text-center text-sm text-[var(--muted)]">
      {children}
    </div>
  );
}

export function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-[var(--panel-soft)] p-3">
      <div className="text-xs font-medium text-[var(--muted)]">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value || "-"}</div>
    </div>
  );
}

export function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs font-medium text-[var(--muted)]">{label}</div>
    </div>
  );
}

export function CourseSkeleton({ compactTop }: { compactTop?: boolean }) {
  return (
    <div className={`${compactTop ? "" : "mt-5"} grid gap-3 xl:grid-cols-2`} aria-label="Loading courses">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="w-full">
              <div className="h-6 w-28 animate-pulse rounded-md bg-[var(--skeleton)]" />
              <div className="mt-4 h-5 w-10/12 animate-pulse rounded-md bg-[var(--skeleton)]" />
              <div className="mt-2 h-4 w-7/12 animate-pulse rounded-md bg-[var(--skeleton)]" />
            </div>
            <div className="h-14 w-14 animate-pulse rounded-md bg-[var(--skeleton)]" />
          </div>
          <div className="mt-5 flex gap-2">
            <div className="h-7 w-24 animate-pulse rounded-md bg-[var(--skeleton)]" />
            <div className="h-7 w-16 animate-pulse rounded-md bg-[var(--skeleton)]" />
            <div className="h-7 w-20 animate-pulse rounded-md bg-[var(--skeleton)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BurgerIcon() {
  return (
    <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
      <span className="h-0.5 rounded-full bg-[var(--text)]" />
      <span className="h-0.5 rounded-full bg-[var(--text)]" />
      <span className="h-0.5 rounded-full bg-[var(--text)]" />
    </span>
  );
}

export function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 11 8-7 8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function YearNavIcon({ year }: { year: number }) {
  if (year === 1) return <BookIcon />;
  if (year === 2) return <CodeIcon />;
  if (year === 3) return <BranchesIcon />;
  return <FlagIcon />;
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5v16" />
      <path d="M8 7h8" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

function BranchesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M8 7.5 11 15" />
      <path d="M16 7.5 13 15" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21V4" />
      <path d="M6 4h11l-2 4 2 4H6" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6" />
      <path d="M10 17h6" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <span className="relative h-5 w-5" aria-hidden="true">
      <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-[var(--text)]" />
      <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-[var(--text)]" />
    </span>
  );
}

export function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5Z" />
    </svg>
  );
}

export function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 transition ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
