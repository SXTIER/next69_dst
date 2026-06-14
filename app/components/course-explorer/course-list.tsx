"use client";

import { AnimatePresence, motion } from "framer-motion";
import { categoryLabels, termLabels, trackLabels, type Course } from "@/app/data/curriculum";
import { listTransition } from "./ui";

/**
 * Main course results list with responsive layout:
 * mobile = card stack, desktop = table-like grid rows.
 */
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
            <CourseCardMobile
              key={`${course.code}-${course.category}-${course.track ?? "base"}`}
              course={course}
              reduceMotion={reduceMotion}
              index={index}
              onOpen={onOpenCourse}
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

function CourseCardMobile({
  course,
  reduceMotion,
  index = 0,
  onOpen,
}: {
  course: Course;
  reduceMotion?: boolean | null;
  index?: number;
  onOpen: (course: Course) => void;
}) {
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

/**
 * Standalone course card used for desktop grid views (e.g. requirement groups).
 */
export function CourseCard({
  course,
  reduceMotion,
  compact,
  index = 0,
  onOpen,
}: {
  course: Course;
  reduceMotion?: boolean | null;
  compact?: boolean;
  index?: number;
  onOpen: (course: Course) => void;
}) {
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