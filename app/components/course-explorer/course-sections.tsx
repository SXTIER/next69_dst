"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { categoryLabels, termLabels, trackLabels, type Course, type CourseCategory, type SpecializedTrack, type Term } from "@/app/data/curriculum";
import type { CourseFilters, CourseSort } from "@/app/lib/curriculum";
import type { ElectiveOptionGroup, RequirementSlot } from "@/app/lib/year-curriculum-view";
import { ChevronIcon, listTransition, motionTiming, stateTransition } from "./ui";
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

export function RequirementOptionsSection({
  slots,
  groups,
  reduceMotion,
  onOpenCourse,
}: {
  slots: RequirementSlot[];
  groups: ElectiveOptionGroup[];
  reduceMotion: boolean | null;
  onOpenCourse: (course: Course) => void;
}) {
  if (slots.length === 0 && groups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {slots.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {slots.map((slot) => (
            <article key={slot.code} className="rounded-lg border border-dashed border-[var(--line-strong)] bg-[var(--panel)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                    {slot.code}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-7">{slot.titleTh}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{slot.note ?? slot.helperText}</p>
                </div>
                <div className="shrink-0 rounded-md border border-[var(--line)] px-3 py-2 text-center">
                  <div className="text-lg font-semibold">{slot.requiredCredits}</div>
                  <div className="text-[10px] font-medium text-[var(--muted)]">หน่วยกิต</div>
                </div>
              </div>
              <p className="mt-4 border-t border-[var(--line)] pt-3 text-sm leading-6 text-[var(--muted)]">
                มีตัวเลือกให้ดู {slot.optionCount} รายวิชา แต่ต้องเลือกให้ครบตามเงื่อนไขเท่านั้น
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {groups.length > 0 ? (
        <div className="space-y-3">
          {groups.map((group) => (
            <RequirementGroupDisclosure key={`${group.requirementCode}-${group.id}`} group={group} reduceMotion={reduceMotion} onOpenCourse={onOpenCourse} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RequirementGroupDisclosure({
  group,
  reduceMotion,
  onOpenCourse,
}: {
  group: ElectiveOptionGroup;
  reduceMotion: boolean | null;
  onOpenCourse: (course: Course) => void;
}) {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const groupPanelId = useId();
  const shownCourses = group.courses.slice(0, 3);
  const hiddenCount = Math.max(group.courses.length - shownCourses.length, 0);

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)]">
      <button
        type="button"
        onClick={() => setIsGroupOpen((current) => !current)}
        className="flex w-full flex-col gap-3 rounded-lg px-4 py-3 text-left transition hover:bg-[var(--panel-soft)] active:bg-[var(--panel-soft)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)] sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={isGroupOpen}
        aria-controls={groupPanelId}
      >
        <span className="min-w-0">
          <span className="block text-base font-semibold">{group.label}</span>
          <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{group.description}</span>
          <span className="mt-2 flex flex-wrap gap-2">
            {shownCourses.map((course) => (
              <span key={course.code} className="rounded-md bg-[var(--panel-soft)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
                {course.code}
              </span>
            ))}
            {hiddenCount > 0 ? (
              <span className="rounded-md bg-[var(--panel-soft)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">+{hiddenCount}</span>
            ) : null}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="rounded-md bg-[var(--panel-soft)] px-3 py-2 text-sm font-semibold text-[var(--muted)]">{group.courses.length} รายวิชา</span>
          <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] bg-[var(--panel)]">
            <ChevronIcon open={isGroupOpen} />
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isGroupOpen ? (
          <motion.div
            id={groupPanelId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={stateTransition(reduceMotion, motionTiming.reveal)}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--line)] p-3">
              <div className="grid gap-3 md:grid-cols-2">
                {group.courses.map((course, index) => (
                  <CourseCard key={`${group.id}-${course.code}`} course={course} reduceMotion={reduceMotion} compact index={index} onOpen={onOpenCourse} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

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
              className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--field)] pl-10 pr-3 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 lg:w-[340px]">
          <span className="text-sm font-medium text-[var(--muted)]">ภาคการศึกษา</span>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="กรองภาคการศึกษา">
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

function getActiveFilterLabels(filters: CourseFilters) {
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

export function CourseResultsList({
  courses,
  reduceMotion,
  onOpenCourse,
}: {
  courses: Course[];
  reduceMotion: boolean | null;
  onOpenCourse: (course: Course) => void;
}) {
  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div layout className="divide-y divide-[var(--line)] lg:hidden">
          {courses.map((course, index) => (
            <CourseCard
              key={`${course.code}-${course.category}-${course.track ?? "base"}`}
              course={course}
              reduceMotion={reduceMotion}
              index={index}
              onOpen={onOpenCourse}
              mobile
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="hidden overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] lg:block">
        <div className="grid grid-cols-[112px_minmax(0,1fr)_86px_128px_128px] gap-4 border-b border-[var(--line)] bg-[var(--panel-soft)] px-4 py-2 text-xs font-semibold text-[var(--muted)]">
          <span>รหัส</span>
          <span>รายวิชา</span>
          <span className="text-center">หน่วยกิต</span>
          <span>ภาค</span>
          <span className="text-right">รายละเอียด</span>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div layout role="list" className="divide-y divide-[var(--line)]">
            {courses.map((course, index) => (
              <CourseRow
                key={`${course.code}-${course.category}-${course.track ?? "base"}`}
                course={course}
                reduceMotion={reduceMotion}
                index={index}
                onOpen={onOpenCourse}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function CourseRow({
  course,
  reduceMotion,
  index = 0,
  onOpen,
}: {
  course: Course;
  reduceMotion: boolean | null;
  index?: number;
  onOpen: (course: Course) => void;
}) {
  return (
    <motion.button
      type="button"
      role="listitem"
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={listTransition(index, reduceMotion)}
      onClick={() => onOpen(course)}
      className="grid w-full grid-cols-[112px_minmax(0,1fr)_86px_128px_128px] items-center gap-4 px-4 py-3 text-left transition hover:bg-[var(--panel-soft)] active:scale-[0.995] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
      aria-label={`ดูรายละเอียดรายวิชา ${course.code} ${course.titleTh}`}
    >
      <span className="min-w-0">
        <span className="block w-fit rounded-md bg-[var(--text)] px-2.5 py-1 text-xs font-semibold text-[var(--page)]">{course.code}</span>
        <span className="mt-1 block truncate text-xs text-[var(--muted)]">{course.thaiCode}</span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-[var(--text)]">{course.titleTh}</span>
        {course.titleEn ? <span className="mt-1 block truncate text-xs text-[var(--muted)]">{course.titleEn}</span> : null}
        {course.note ? <span className="mt-1 block truncate text-xs text-[var(--muted)]">{course.note}</span> : null}
      </span>
      <span className="justify-self-center rounded-md border border-[var(--line)] px-3 py-1 text-center text-sm font-semibold">{course.credits}</span>
      <span className="min-w-0 text-sm text-[var(--muted)]">
        {[course.term ? termLabels[course.term] : "", course.track ? trackLabels[course.track] : ""].filter(Boolean).join(" · ") || "-"}
      </span>
      <span className="justify-self-end text-sm font-semibold text-[var(--accent)]">รายละเอียด ›</span>
    </motion.button>
  );
}

function CourseCard({
  course,
  reduceMotion,
  compact,
  mobile,
  index = 0,
  onOpen,
}: {
  course: Course;
  reduceMotion?: boolean | null;
  compact?: boolean;
  mobile?: boolean;
  index?: number;
  onOpen: (course: Course) => void;
}) {
  if (mobile) {
    return (
      <motion.button
        type="button"
        onClick={() => onOpen(course)}
        layout
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={listTransition(index, reduceMotion)}
        className="w-full bg-[var(--panel)] px-6 py-6 text-left transition hover:bg-[var(--panel-soft)] active:bg-[var(--panel-soft)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
        aria-label={`ดูรายละเอียดรายวิชา ${course.code} ${course.titleTh}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="rounded-sm bg-[var(--text)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--page)]">{course.code}</span>
              {course.thaiCode ? <span className="text-[11px] font-medium text-[var(--muted)]">{course.thaiCode}</span> : null}
            </div>
            <h3 className="mt-3 text-s font-semibold leading-5">{course.titleTh}</h3>
            {course.titleEn ? <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{course.titleEn}</p> : null}
          </div>
          <div className="shrink-0 rounded-sm border border-[var(--line)] px-2 py-1 text-center">
            <div className="text-sm font-semibold">{course.credits}</div>
            <div className="text-[9px] font-medium text-[var(--muted)]">หน่วยกิต</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-medium">
          <span className="rounded-sm bg-[var(--panel-soft)] px-1.5 py-0.5 text-[var(--muted)]">{categoryLabels[course.category]}</span>
          {course.year ? <span className="rounded-sm bg-[var(--panel-soft)] px-1.5 py-0.5 text-[var(--muted)]">ปี {course.year}</span> : null}
          {course.term ? <span className="rounded-sm bg-[var(--panel-soft)] px-1.5 py-0.5 text-[var(--muted)]">{termLabels[course.term]}</span> : null}
          {course.track ? <span className="rounded-sm bg-[var(--accent-soft)] px-1.5 py-0.5 text-[var(--accent)]">{trackLabels[course.track]}</span> : null}
        </div>
        {course.note ? <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{course.note}</p> : null}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(course)}
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={listTransition(index, reduceMotion)}
      className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 text-left shadow-sm transition hover:border-[var(--line-strong)] hover:bg-[var(--panel-soft)] active:scale-[0.995] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label={`ดูรายละเอียดรายวิชา ${course.code} ${course.titleTh}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[var(--text)] px-2.5 py-1 text-xs font-semibold text-[var(--page)]">{course.code}</span>
            <span className="text-xs font-medium text-[var(--muted)]">{course.thaiCode}</span>
          </div>
          <h3 className={`${compact ? "mt-2 text-base leading-6" : "mt-3 text-lg leading-7"} font-semibold`}>{course.titleTh}</h3>
          {course.titleEn ? <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{course.titleEn}</p> : null}
        </div>
        <div className="shrink-0 rounded-md border border-[var(--line)] px-3 py-2 text-center">
          <div className="text-lg font-semibold">{course.credits}</div>
          <div className="text-[10px] font-medium text-[var(--muted)]">หน่วยกิต</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-md bg-[var(--panel-soft)] px-2.5 py-1 text-[var(--muted)]">{categoryLabels[course.category]}</span>
        {course.year ? <span className="rounded-md bg-[var(--panel-soft)] px-2.5 py-1 text-[var(--muted)]">ปี {course.year}</span> : null}
        {course.term ? <span className="rounded-md bg-[var(--panel-soft)] px-2.5 py-1 text-[var(--muted)]">{termLabels[course.term]}</span> : null}
        {course.track ? <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-[var(--accent)]">{trackLabels[course.track]}</span> : null}
      </div>
      {course.note ? <p className="mt-3 border-t border-[var(--line)] pt-3 text-sm leading-6 text-[var(--muted)]">{course.note}</p> : null}
      <span className="mt-4 block border-t border-[var(--line)] pt-3 text-sm font-semibold text-[var(--accent)]">ดูรายละเอียดรายวิชา</span>
    </motion.button>
  );
}
