"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { sourceDocumentUrl } from "@/app/data/curriculum";
import { getYearCopy, yearOptions } from "./year-copy";
import { BurgerIcon, CloseIcon, DocumentIcon, HomeIcon, MoonIcon, SunIcon, YearNavIcon, motionTiming, stateTransition } from "./ui";

export function DesktopNav({ activeYear }: { activeYear?: number }) {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--page)_88%,transparent)] backdrop-blur md:block">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--text)] text-sm text-[var(--page)]">69</span>
          <span>NextDST</span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
          <Link className="rounded-md px-3 py-2 transition hover:bg-[var(--panel-soft)] hover:text-[var(--text)] active:scale-[0.98]" href="/#years">
            เลือกปี
          </Link>
          {yearOptions.map((year) => (
            <Link
              key={year}
              aria-current={activeYear === year ? "page" : undefined}
              className={`rounded-md px-3 py-2 transition hover:bg-[var(--panel-soft)] hover:text-[var(--text)] active:scale-[0.98] ${
                activeYear === year ? "bg-[var(--panel-soft)] text-[var(--text)]" : ""
              }`}
              href={`/year/${year}`}
            >
              {getYearCopy(year).navLabel}
            </Link>
          ))}
          <a
            className="rounded-md px-3 py-2 transition hover:bg-[var(--panel-soft)] hover:text-[var(--text)] active:scale-[0.98]"
            href={sourceDocumentUrl}
            target="_blank"
            rel="noreferrer"
          >
            เอกสารต้นฉบับ
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export function MobileSidebar({ activeYear }: { activeYear?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-md border border-[var(--line)] bg-[color-mix(in_srgb,var(--page)_88%,transparent)] backdrop-blur transition hover:border-[var(--line-strong)] active:scale-[0.96] md:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label="Open mobile menu"
        title="Open menu"
      >
        <BurgerIcon />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile menu overlay"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={stateTransition(shouldReduceMotion, motionTiming.feedback)}
              onClick={close}
            />
            <motion.aside
              id="mobile-navigation"
              className="fixed inset-y-0 right-0 z-50 flex w-[286px] max-w-[84vw] flex-col border-l border-[var(--line)] bg-[var(--page)] py-4 shadow-xl md:hidden"
              initial={shouldReduceMotion ? { opacity: 0 } : { x: 310 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: 310 }}
              transition={stateTransition(shouldReduceMotion, motionTiming.reveal)}
            >
              <div className="flex items-center justify-between gap-3 px-4">
                <Link href="/" onClick={close} className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[var(--text)] text-sm font-semibold text-[var(--page)]">
                    69
                  </span>
                  <span className="truncate text-sm font-semibold">NextDST</span>
                </Link>

                <button
                  type="button"
                  onClick={close}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[var(--panel)] transition hover:border-[var(--line-strong)] active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  aria-label="Close mobile menu"
                  title="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="mt-8 flex flex-1 flex-col gap-2 px-3">
                <MobileLink href="/" label="Home" detail="เลือกชั้นปี" icon={<HomeIcon />} onNavigate={close} />
                {yearOptions.map((year) => (
                  <MobileLink
                    key={year}
                    href={`/year/${year}`}
                    label={getYearCopy(year).sidebarLabel}
                    detail={activeYear === year ? "กำลังเปิดอยู่" : "ดูแผนการเรียน"}
                    icon={<YearNavIcon year={year} />}
                    active={activeYear === year}
                    onNavigate={close}
                  />
                ))}
                <MobileLink href={sourceDocumentUrl} label="PDF" detail="เอกสารต้นฉบับ" icon={<DocumentIcon />} external onNavigate={close} />
              </div>

              <div className="px-4">
                <ThemeToggle />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MobileLink({
  href,
  label,
  detail,
  icon,
  external,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  detail: string;
  icon: ReactNode;
  external?: boolean;
  active?: boolean;
  onNavigate: () => void;
}) {
  const className = `group flex h-12 w-full items-center justify-start gap-3 rounded-md border px-3 text-sm font-semibold transition active:scale-[0.99] ${
    active
      ? "border-[var(--line)] bg-[var(--panel-soft)] text-[var(--text)]"
      : "border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:bg-[var(--panel-soft)] hover:text-[var(--text)]"
  }`;

  const content = (
    <>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-md transition ${
          active
            ? "bg-[var(--text)] text-[var(--page)]"
            : "bg-[var(--panel-soft)] text-[var(--muted)] group-hover:text-[var(--text)]"
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col overflow-hidden">
        <span className="truncate text-[13px] text-[var(--text)]">{label}</span>
        <span className="truncate text-[11px] font-medium text-[var(--muted)]">{detail}</span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" onClick={onNavigate} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={className}>
      {content}
    </Link>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("nextdst-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("nextdst-theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggle}
        className="grid h-11 w-11 place-items-center rounded-md border border-[var(--line)] bg-[var(--panel)] transition hover:border-[var(--text)] hover:text-[var(--text)] active:scale-[0.96]"
      aria-label="Toggle dark and light mode"
      title="Toggle dark and light mode"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
