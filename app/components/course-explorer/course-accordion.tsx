"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { ChevronIcon, motionTiming, stateTransition } from "./ui";

/**
 * Animated collapsible section used to group course content.
 */
export function CourseAccordionSection({
  title,
  eyebrow,
  description,
  meta,
  className,
  children,
}: {
  title: string;
  eyebrow: string;
  description?: string;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <section className={`rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full flex-col gap-3 px-4 py-4 text-left transition hover:bg-[var(--panel-soft)] active:bg-[var(--panel-soft)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)] sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="min-w-0">
          <span className="block text-sm text-[var(--muted)]">{eyebrow}</span>
          <span className="mt-1 block text-2xl font-semibold">{title}</span>
          {description ? <span className="mt-2 block max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</span> : null}
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {meta ? <span className="rounded-md bg-[var(--panel-soft)] px-3 py-2 text-sm text-[var(--muted)]">{meta}</span> : null}
          <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] bg-[var(--panel)]">
            <ChevronIcon open={isOpen} />
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={stateTransition(shouldReduceMotion, motionTiming.reveal)}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--line)] p-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/**
 * Simplified accordion used in sidebars and non-course contexts.
 */
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
            <div className="border-t border-[var(--line)] p-6">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}