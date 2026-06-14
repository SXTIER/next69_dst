"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { categoryLabels, termLabels, trackLabels, type CourseCategory, type SpecializedTrack, type Term } from "@/app/data/curriculum";
import type { CourseFilters, CourseSort } from "@/app/lib/curriculum";
import { ChevronIcon, motionTiming, stateTransition } from "./ui";
import { Search } from "lucide-react";

const categoryOptions = Object.keys(categoryLabels) as CourseCategory[];
const trackOptions = Object.keys(trackLabels) as SpecializedTrack[];
const termOptions: Term[] = ["1", "2", "summer"];

export const initialFilters: CourseFilters = {
  query: "",
  category: "all",
  year: "all",
  term: "all",
  track: "all",
  sort: "year",
};

export function CourseFiltersPanel({
  filters,
  setFilter,
  resetFilters,
}: {
  filters: CourseFilters;
  setFilter: <K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) => void;
  resetFilters: () => void;
}) {
  const activeFilters = getActiveFilterLabels(filters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const panelId = useId();
  const shouldReduceMotion = useReducedMotion();
  const clearFilter = <K extends keyof CourseFilters>(key: K) => {
    setFilter(key, initialFilters[key]);
  };

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm" aria-labelledby={`filter-heading-${panelId}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id={`filter-heading-${panelId}`} className="mt-1 text-lg font-semibold">
                ค้นหารายวิชา
              </h2>
            </div>
            <p className="text-sm leading-6 text-[var(--muted)]">
              {activeFilters.length > 0 ? `ใช้อยู่ ${activeFilters.length} ตัวกรอง` : ""}
            </p>
          </div>
          <label className="mt-3 relative block">
            <Search className="pointer-events-none absolute z-10 ml-3 mt-[11px] size-5 text-[var(--muted)]" aria-hidden="true" />
            <span className="sr-only">ค้นหารายวิชา</span>
            <input
              value={filters.query}
              onChange={(event) => setFilter("query", event.target.value)}
              placeholder="ค้นหาด้วยรหัสวิชา, ชื่อไทย, English"
              className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--field)] pl-10 pr-3 text-sm outline-none transition placeholder:font-sans placeholder:text-xs placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 lg:w-[340px]">
          <span className="text-sm font-medium text-[var(--muted)]">ภาคการศึกษา</span>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap" role="group" aria-label="กรองภาคการศึกษา">
            {[{ value: "all", label: "ทุกภาค" }, ...termOptions.map((term) => ({ value: term, label: termLabels[term] }))].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter("term", option.value as Term | "all")}
                className={`h-10 rounded-md border px-3 text-sm font-semibold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                  filters.term === option.value
                    ? "border-[var(--text)] bg-[var(--text)] text-[var(--page)]"
                    : "border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                }`}
                aria-pressed={filters.term === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-[var(--line)] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap gap-2">
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => clearFilter(filter.key)}
                className="rounded-md border border-[var(--line)] bg-[var(--panel-soft)] px-2.5 py-1 text-xs font-medium text-[var(--text)] transition hover:border-[var(--line-strong)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label={`ล้างตัวกรอง ${filter.label}`}
              >
                {filter.label} ×
              </button>
            ))
          ) : (
            <span className="text-sm text-[var(--muted)]">แสดงรายวิชาทั้งหมดของปีนี้</span>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          {activeFilters.length > 0 ? (
            <button
              type="button"
              onClick={resetFilters}
              className="h-10 rounded-md border border-[var(--line)] px-3 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--text)] hover:text-[var(--text)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              ล้างทั้งหมด
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setIsFilterOpen((current) => !current)}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--line)] px-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--line-strong)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-expanded={isFilterOpen}
            aria-controls={`filter-panel-${panelId}`}
            aria-label="ตัวกรองเพิ่มเติม"
          >
            ตัวกรองเพิ่มเติม
            <ChevronIcon open={isFilterOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isFilterOpen ? (
          <motion.div
            id={`filter-panel-${panelId}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={stateTransition(shouldReduceMotion, motionTiming.reveal)}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-4 border-t border-[var(--line)] pt-4 md:grid-cols-3">
                <FilterSelect
                  label="หมวดรายวิชา"
                  value={filters.category}
                  onChange={(value) => setFilter("category", value as CourseCategory | "all")}
                  options={[
                    { value: "all", label: "ทั้งหมด" },
                    ...categoryOptions.map((category) => ({ value: category, label: categoryLabels[category] })),
                  ]}
                />

                <FilterSelect
                  label="กลุ่มเลือกเฉพาะด้าน (ปี 3)"
                  value={filters.track}
                  onChange={(value) => setFilter("track", value as SpecializedTrack | "all")}
                  options={[
                    { value: "all", label: "ทุกกลุ่ม" },
                    ...trackOptions.map((track) => ({ value: track, label: trackLabels[track] })),
                  ]}
                />

                <FilterSelect
                  label="เรียงลำดับ"
                  value={filters.sort}
                  onChange={(value) => setFilter("sort", value as CourseSort)}
                  options={[
                    { value: "year", label: "ตามแผนปี/ภาค" },
                    { value: "code", label: "รหัสวิชา" },
                    { value: "credits", label: "หน่วยกิตมากไปน้อย" },
                    { value: "title", label: "ชื่อวิชา" },
                  ]}
                />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export function getActiveFilterLabels(filters: CourseFilters) {
  const labels: { key: keyof CourseFilters; label: string }[] = [];

  if (filters.query) labels.push({ key: "query", label: `ค้นหา: ${filters.query}` });
  if (filters.category !== "all") labels.push({ key: "category", label: categoryLabels[filters.category] });
  if (filters.term !== "all") labels.push({ key: "term", label: termLabels[filters.term] });
  if (filters.track !== "all") labels.push({ key: "track", label: trackLabels[filters.track] });
  if (filters.sort !== initialFilters.sort) labels.push({ key: "sort", label: "เปลี่ยนการเรียง" });

  return labels;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-md border border-[var(--line)] bg-[var(--field)] px-3 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Re-export for convenience. */
export type { CourseFilters, CourseSort } from "@/app/lib/curriculum";
