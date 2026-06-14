"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useReducedMotion } from "framer-motion";
import { type Course } from "@/app/data/curriculum";
import { applyCourseFilters, sumCredits, type CourseFilters } from "@/app/lib/curriculum";
import { getYearCurriculumView } from "@/app/lib/year-curriculum-view";
import { CourseDetailModal } from "./course-detail-modal";
import { CourseAccordionSection } from "./course-accordion";
import { CourseFiltersPanel, initialFilters } from "./course-filters";
import { CourseResultsList } from "./course-list";
import { RequirementOptionsSection } from "./requirement-options";
import { DesktopNav, MobileSidebar } from "./navigation";
import { CourseSkeleton, SectionEmptyState } from "./ui";
import { HomeHero, HomeSummaryPanel, ResponsiveYearOverview, YearCard, YearHero } from "./year-sections";
import { yearOptions } from "./year-copy";

export function YearSelectorPage() {
  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--text)]">
      <DesktopNav />
      <MobileSidebar />

      <main className="min-h-screen">
        <HomeHero />

        <section id="years" className="border-y border-[var(--line)] bg-[var(--panel-soft)]">
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">เลือกชั้นปี</p>
                <h2 className="mt-2 text-2xl font-semibold">เลือกชั้นปีของนักศึกษา</h2>
              </div>
              {/* <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
                แยกเนื้อหาแต่ละปีออกเป็นหน้าเฉพาะ เพื่อลดความแน่นของข้อมูลและทำให้ดูแผนการเรียนได้เร็วขึ้น
              </p> */}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {yearOptions.map((year) => (
                <YearCard key={year} year={year} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <HomeSummaryPanel />
        </section>
      </main>
    </div>
  );
}

export function YearCoursePage({ year }: { year: number }) {
  const yearView = useMemo(() => getYearCurriculumView(year), [year]);
  const [filters, setFilters] = useState<CourseFilters>(initialFilters);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isPending, startTransition] = useTransition();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsPreparing(false), 220);
    return () => window.clearTimeout(timer);
  }, [year]);

  const filteredCourses = useMemo(() => applyCourseFilters(yearView.plannedCourses, filters), [filters, yearView.plannedCourses]);
  const filteredRequirementSlots = useMemo(() => applyCourseFilters(yearView.requirementSlots, filters), [filters, yearView.requirementSlots]);
  const filteredElectiveOptions = useMemo(
    () =>
      yearView.electiveOptions
        .map((group) => ({ ...group, courses: applyCourseFilters(group.courses, filters) }))
        .filter((group) => group.courses.length > 0),
    [filters, yearView.electiveOptions],
  );
  const visibleCredits = useMemo(() => sumCredits(filteredCourses), [filteredCourses]);
  const hasAnyResult = filteredCourses.length > 0 || filteredRequirementSlots.length > 0 || filteredElectiveOptions.length > 0;

  const setFilter = <K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) => {
    startTransition(() => setFilters((current) => ({ ...current, [key]: value })));
  };

  const resetFilters = () => {
    startTransition(() => setFilters(initialFilters));
  };

  const openCourse = (course: Course) => {
    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedCourse(course);
  };

  const closeCourse = () => {
    setSelectedCourse(null);
    window.requestAnimationFrame(() => {
      lastFocusedElementRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--text)]">
      <DesktopNav activeYear={year} />
      <MobileSidebar activeYear={year} />

      <main className="min-h-screen">
        <YearHero
          year={year}
          planCredits={yearView.planCredits}
          courseCount={yearView.plannedCourses.length}
          requirementCount={yearView.requirementSlots.length}
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:px-10">
          <section id="study-plan" className="order-2 lg:sticky lg:top-24 lg:order-1">
            <ResponsiveYearOverview
              year={year}
              terms={yearView.terms}
              courseCount={yearView.plannedCourses.length}
              requirementCount={yearView.requirementSlots.length}
              planCredits={yearView.planCredits}
            />
          </section>

          <section id="courses" className="order-1 min-w-0 lg:order-2">
            <div className="space-y-5">
              <CourseFiltersPanel filters={filters} setFilter={setFilter} resetFilters={resetFilters} />

            <div className="min-w-0 space-y-4">
              <CourseAccordionSection
                title="แผนการเรียนปีนี้"
                eyebrow={`รายวิชาในแผน ${filteredCourses.length} รายการ`}
                meta={
                  <>
                    หน่วยกิตรายวิชาที่แสดง <span className="font-semibold text-[var(--text)]">{visibleCredits}</span>
                  </>
                }
              >
                {isPreparing || isPending ? (
                  <CourseSkeleton compactTop />
                ) : filteredCourses.length > 0 ? (
                  <CourseResultsList courses={filteredCourses} reduceMotion={shouldReduceMotion} onOpenCourse={openCourse} />
                ) : (
                  <SectionEmptyState>ไม่มีรายวิชาในแผนที่ตรงกับตัวกรองนี้</SectionEmptyState>
                )}
              </CourseAccordionSection>

              {!isPreparing && !isPending && hasAnyResult ? (
                <CourseAccordionSection
                  title="ตัวเลือก/เงื่อนไขเพิ่มเติม"
                  eyebrow="ไม่ใช่ภาระเรียนทั้งหมดพร้อมกัน"
                  description="ส่วนนี้ช่วยดูตัวเลือกที่ต้องเลือกให้ครบตามหน่วยกิต แยกออกจากรายวิชาที่อยู่ในแผนของปีนี้แล้ว"
                  className="border-dashed bg-[var(--panel-soft)] shadow-none"
                >
                  {filteredRequirementSlots.length > 0 || filteredElectiveOptions.length > 0 ? (
                    <RequirementOptionsSection
                      slots={filteredRequirementSlots}
                      groups={filteredElectiveOptions}
                      reduceMotion={shouldReduceMotion}
                      onOpenCourse={openCourse}
                    />
                  ) : (
                    <SectionEmptyState>ไม่มีตัวเลือกเพิ่มเติมที่ตรงกับตัวกรองนี้</SectionEmptyState>
                  )}
                </CourseAccordionSection>
              ) : null}

              {!isPreparing && !isPending && !hasAnyResult ? (
                <div className="mt-5 rounded-lg border border-dashed border-[var(--line-strong)] bg-[var(--panel-soft)] p-8 text-center">
                  <h3 className="text-lg font-semibold">ไม่พบรายวิชาที่ตรงกับเงื่อนไข</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">ลองลดเงื่อนไขการกรอง หรือกลับไปดูรายวิชาและตัวเลือกทั้งหมดของปีนี้</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 rounded-md bg-[var(--text)] px-4 py-2 text-sm font-semibold text-[var(--page)] transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--panel-soft)]"
                  >
                    ล้างตัวกรอง
                  </button>
                </div>
              ) : null}
              </div>
            </div>
          </section>
        </div>
      </main>
      <CourseDetailModal
        course={selectedCourse}
        onClose={closeCourse}
        onSelectCourse={setSelectedCourse}
        reduceMotion={shouldReduceMotion}
      />
    </div>
  );
}
