"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { categoryLabels, termLabels, trackLabels, type Course } from "@/app/data/curriculum";
import { coursePdfDetails } from "@/app/data/course-details";
import { CloseIcon, DetailMetric, motionTiming, stateTransition } from "./ui";
import { getReferencedCourses, parseCoursePdfDetail } from "./course-detail-parser";

export function CourseDetailModal({
  course,
  onClose,
  onSelectCourse,
  reduceMotion,
}: {
  course: Course | null;
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
  reduceMotion: boolean | null;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const detail = course ? coursePdfDetails[course.code] : undefined;
  const parsedDetail = course ? parseCoursePdfDetail(course, detail?.excerpt) : null;
  const prerequisiteCourses = parsedDetail ? getReferencedCourses(parsedDetail.prerequisite) : [];
  const corequisiteCourses = parsedDetail ? getReferencedCourses(parsedDetail.corequisite) : [];

  useEffect(() => {
    if (!course) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(
        (element) => element.offsetParent !== null,
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={stateTransition(reduceMotion, motionTiming.feedback)}
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="h-dvh max-h-dvh w-full overflow-auto bg-[var(--panel)] shadow-xl sm:h-auto sm:max-h-[88vh] sm:max-w-3xl sm:rounded-lg sm:border sm:border-[var(--line)]"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
          transition={stateTransition(reduceMotion, motionTiming.reveal)}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--panel)] p-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[var(--text)] px-2.5 py-1 text-xs font-semibold text-[var(--page)]">{course.code}</span>
                <span className="text-xs font-medium text-[var(--muted)]">{course.thaiCode}</span>
              </div>
              <h2 id={titleId} className="mt-3 text-2xl font-semibold leading-8">
                {course.titleTh}
              </h2>
              {course.titleEn ? <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{course.titleEn}</p> : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line)] bg-[var(--panel)] transition hover:border-[var(--line-strong)] active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="ปิดรายละเอียดรายวิชา"
              title="ปิด"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="space-y-5 p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DetailMetric label="หน่วยกิต" value={`${course.credits}`} />
              <DetailMetric label="หมวด" value={categoryLabels[course.category]} />
              <DetailMetric label="ปี/ภาค" value={[course.year ? `ปี ${course.year}` : "", course.term ? termLabels[course.term] : ""].filter(Boolean).join(" ")} />
              <DetailMetric label="กลุ่ม" value={course.track ? trackLabels[course.track] : "-"} />
            </div>

            {course.note ? (
              <section className="rounded-lg border border-[var(--line)] bg-[var(--panel-soft)] p-4">
                <h3 className="font-semibold">หมายเหตุในแผน</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{course.note}</p>
              </section>
            ) : null}

            <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold">คำอธิบายจากเอกสารหลักสูตร</h3>
                {detail ? (
                  <a
                    href={`/PDF-infomation/MU2_DST_2569.pdf#page=${detail.sourcePage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[var(--accent)] transition hover:underline active:opacity-75"
                  >
                    เปิด PDF หน้า {detail.sourcePage}
                  </a>
                ) : null}
              </div>
              {detail && parsedDetail ? (
                <>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <RequirementDetail
                      label="รายวิชาที่ต้องเรียนมาก่อน"
                      value={parsedDetail.prerequisite}
                      referencedCourses={prerequisiteCourses}
                      onSelectCourse={onSelectCourse}
                    />
                    <RequirementDetail
                      label="รายวิชาที่ต้องเรียนควบคู่กัน"
                      value={parsedDetail.corequisite}
                      referencedCourses={corequisiteCourses}
                      onSelectCourse={onSelectCourse}
                    />
                  </div>

                  <div className="mt-4 space-y-4">
                    {parsedDetail.thaiDescription ? (
                      <section className="rounded-md border border-[var(--line)] bg-[var(--panel-soft)] p-3">
                        <h4 className="text-sm font-semibold">คำอธิบายภาษาไทย</h4>
                        <p className="mt-2 text-sm leading-7 text-[var(--text)]">{parsedDetail.thaiDescription}</p>
                      </section>
                    ) : null}

                    {parsedDetail.englishDescription ? (
                      <section className="rounded-md border border-[var(--line)] bg-[var(--panel-soft)] p-3">
                        <h4 className="text-sm font-semibold">English description</h4>
                        <p className="mt-2 text-sm leading-7 text-[var(--text)]">{parsedDetail.englishDescription}</p>
                      </section>
                    ) : null}
                  </div>

                  <p className="mt-3 border-t border-[var(--line)] pt-3 text-xs text-[var(--muted)]">
                    อ้างอิงจาก MU2_DST_2569.pdf หน้า {detail.sourcePage}
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  ยังไม่พบคำอธิบายรายวิชาเดี่ยวในช่วงข้อความที่ดึงจาก PDF สำหรับรายการนี้ ให้ตรวจสอบรายละเอียดจากเอกสารต้นฉบับ
                </p>
              )}
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function RequirementDetail({
  label,
  value,
  referencedCourses,
  onSelectCourse,
}: {
  label: string;
  value: string;
  referencedCourses: Course[];
  onSelectCourse: (course: Course) => void;
}) {
  return (
    <section className="rounded-md border border-[var(--line)] bg-[var(--panel-soft)] p-3">
      <h4 className="text-sm font-semibold">{label}</h4>
      <p className="mt-2 text-sm leading-6 text-[var(--text)]">{value || "ไม่มี"}</p>
      {referencedCourses.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {referencedCourses.map((referencedCourse) => (
            <button
              key={referencedCourse.code}
              type="button"
              onClick={() => onSelectCourse(referencedCourse)}
              className="inline-flex items-center gap-1 rounded-md border border-[var(--accent)] bg-[var(--panel)] px-2.5 py-1.5 text-xs font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label={`ดูรายละเอียด ${referencedCourse.code} ${referencedCourse.titleTh}`}
            >
              <span aria-hidden="true">↗</span>
              {referencedCourse.code}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
