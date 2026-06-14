"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { Course } from "@/app/data/curriculum";
import type { ElectiveOptionGroup, RequirementSlot } from "@/app/lib/year-curriculum-view";
import { stateTransition, motionTiming, ChevronIcon } from "./ui";
import { CourseCard } from "./course-list";

/**
 * Shows requirement slots and elective option groups below the main course list.
 */
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