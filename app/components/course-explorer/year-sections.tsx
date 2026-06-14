"use client";

import Link from "next/link";
import { curriculumSummary, sourceDocumentUrl, studyPlan, termLabels, type StudyTerm } from "@/app/data/curriculum";
import { getYearCurriculumView } from "@/app/lib/year-curriculum-view";
import { Metric } from "./ui";
import { AccordionItem } from "./course-accordion";
import { getYearCopy } from "./year-copy";

export function HomeHero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 md:py-16 lg:px-10">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Digital Science and Technology</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[var(--text)] sm:text-5xl lg:text-6xl">NextDST 69</h1>
        <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:text-lg">
          เว็บสรุปแผนการเรียนหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการและเทคโนโลยีดิจิทัล พ.ศ. 2569
          เริ่มจากเลือกชั้นปี แล้วเข้าไปดูแผน รายวิชา และตัวกรองเฉพาะปีนั้น
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="rounded-md bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page)]" href="#years">
            เลือกชั้นปี
          </a>
          <a
            className="rounded-md border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold"
            href={sourceDocumentUrl}
            target="_blank"
            rel="noreferrer"
          >
            เปิดเอกสารต้นฉบับ
          </a>
        </div>
      </div>
    </section>
  );
}

export function YearHero({
  year,
  planCredits,
  courseCount,
  requirementCount,
}: {
  year: number;
  planCredits: number;
  courseCount: number;
  requirementCount: number;
}) {
  const copy = getYearCopy(year);

  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 md:py-10 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
        <div>
          <Link className="text-sm font-semibold text-[var(--accent)] hover:underline" href="/#years">
            กลับไปเลือกชั้นปี
          </Link>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--text)] sm:text-5xl lg:text-6xl">{copy.heading}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">{copy.heroDescription}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="rounded-md bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page)]" href="#courses">
              ดูรายวิชา
            </a>
            <a className="rounded-md border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold" href="#study-plan">
              ดูแผนการเรียน
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Metric label="หน่วยกิตตามแผน" value={planCredits} />
          <Metric label="ภาคเรียน" value={studyPlan.filter((term) => term.year === year).length} />
          <Metric label={requirementCount > 0 ? "รายวิชา + เงื่อนไข" : "รายวิชาในแผน"} value={courseCount + requirementCount} />
        </div>
      </div>
    </section>
  );
}

export function YearCard({ year }: { year: number }) {
  const yearView = getYearCurriculumView(year);
  const copy = getYearCopy(year);

  return (
    <Link
      href={`/year/${year}`}
        className="group rounded-lg bg-[var(--panel)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">ชั้นปี</p>
          <h3 className="mt-1 text-3xl font-semibold">{copy.cardTitle}</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--panel-soft)] text-sm font-semibold transition group-hover:bg-[var(--text)] group-hover:text-[var(--page)]">
          →
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="font-semibold">{yearView.planCredits}</div>
          <div className="text-xs text-[var(--muted)]">หน่วยกิต</div>
        </div>
        <div>
          <div className="font-semibold">{yearView.plannedCourses.length}</div>
          <div className="text-xs text-[var(--muted)]">วิชาในแผน</div>
        </div>
      </div>
      {yearView.requirementSlots.length > 0 ? (
        <p className="mt-4 pt-3 text-xs leading-5 text-[var(--muted)]">
          มีเงื่อนไขเลือกเพิ่ม {yearView.requirementSlots.length} รายการ แสดงแยกจากรายวิชาบังคับ
        </p>
      ) : null}
    </Link>
  );
}

export function ResponsiveYearOverview({
  year,
  terms,
  courseCount,
  requirementCount,
  planCredits,
}: {
  year: number;
  terms: StudyTerm[];
  courseCount: number;
  requirementCount: number;
  planCredits: number;
}) {
  return (
    <div className="lg:space-y-4">
      <div className="space-y-3 lg:hidden">
        <AccordionItem title="ภาพรวมหลักสูตร">
          <YearSummaryPanel
            year={year}
            terms={terms}
            courseCount={courseCount}
            requirementCount={requirementCount}
            planCredits={planCredits}
            compact
          />
        </AccordionItem>
        <AccordionItem title="แผนการเรียนรายภาค">
          <StudyPlanGrid terms={terms} />
        </AccordionItem>
      </div>

      <div className="hidden lg:block">
        <YearSummaryPanel
          year={year}
          terms={terms}
          courseCount={courseCount}
          requirementCount={requirementCount}
          planCredits={planCredits}
        />
      </div>
      <div className="hidden lg:block">
        <StudyPlanGrid terms={terms} compact />
      </div>
    </div>
  );
}

export function HomeSummaryPanel() {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">ภาพรวมหลักสูตร</p>
      <h2 className="mt-2 text-2xl font-semibold">{curriculumSummary.program}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{curriculumSummary.programEn}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {curriculumSummary.structure.map((item) => (
          <div key={item.label} className="rounded-md border border-[var(--line)] bg-[var(--panel-soft)] p-3 text-sm">
            <span className="block text-[var(--muted)]">{item.label}</span>
            <span className="mt-2 block font-semibold">{item.credits} หน่วยกิต</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YearSummaryPanel({
  year,
  terms,
  courseCount,
  requirementCount,
  planCredits,
  compact,
}: {
  year: number;
  terms: StudyTerm[];
  courseCount: number;
  requirementCount: number;
  planCredits: number;
  compact?: boolean;
}) {
  const copy = getYearCopy(year);

  return (
    <div className={compact ? "" : "rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm"}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">ภาพรวมปี</p>
      <h2 className="mt-2 text-2xl font-semibold">{copy.summaryTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        แผนปีนี้มี {terms.length} ภาคเรียน รวม {planCredits} หน่วยกิตตามแผน รายวิชาในแผน {courseCount} รายการ
        {requirementCount > 0 ? ` และมีเงื่อนไขเลือกเพิ่ม ${requirementCount} รายการ` : ""}
      </p>
      <div className="mt-5 space-y-3">
        {terms.map((term) => (
          <div key={`${term.year}-${term.term}`} className="flex items-center justify-between border-t border-[var(--line)] pt-3 text-sm">
            <span className="text-[var(--muted)]">{termLabels[term.term]}</span>
            <span className="font-semibold">{term.credits} หน่วยกิต</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyPlanGrid({ terms, compact }: { terms: StudyTerm[]; compact?: boolean }) {
  return (
    <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"}>
      {terms.map((term) => (
        <div key={`${term.year}-${term.term}`} className={`rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm ${compact ? "p-3" : "p-4"}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[var(--muted)]">ปี {term.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{termLabels[term.term]}</h3>
            </div>
            <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
              {term.credits} หน่วยกิต
            </span>
          </div>
          <div className={`${compact ? "mt-3" : "mt-4"} flex flex-wrap gap-2`}>
            {term.courseCodes.map((code) => (
              <span key={code} className="rounded-md border border-[var(--line)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
                {code}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
