/* eslint-disable @typescript-eslint/no-require-imports */

const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");

const courseExplorerFacadeSource = fs.readFileSync(path.resolve(__dirname, "../app/components/course-explorer.tsx"), "utf8");
const courseExplorerDir = path.resolve(__dirname, "../app/components/course-explorer");
const source = [
  courseExplorerFacadeSource,
  ...fs
    .readdirSync(courseExplorerDir)
    .filter((fileName) => fileName.endsWith(".ts") || fileName.endsWith(".tsx"))
    .sort()
    .map((fileName) => fs.readFileSync(path.join(courseExplorerDir, fileName), "utf8")),
].join("\n");
const layoutSource = fs.readFileSync(path.resolve(__dirname, "../app/layout.tsx"), "utf8");
const eslintConfigSource = fs.readFileSync(path.resolve(__dirname, "../eslint.config.mjs"), "utf8");

test("course explorer facade preserves the public route imports", () => {
  assert.match(courseExplorerFacadeSource, /export \{ YearCoursePage, YearSelectorPage \} from "\.\/course-explorer\/pages"/);
});

test("year curriculum sections use accessible accordion controls", () => {
  assert.match(source, /CourseAccordionSection/);
  assert.match(source, /title="แผนการเรียนปีนี้"/);
  assert.match(source, /title="ตัวเลือก\/เงื่อนไขเพิ่มเติม"/);
  assert.match(source, /aria-expanded=\{isOpen\}/);
  assert.match(source, /aria-controls=/);
});

test("course cards expose a detail modal interaction", () => {
  assert.match(source, /CourseDetailModal/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /setSelectedCourse/);
});

test("mobile sidebar stays on the right side", () => {
  assert.match(source, /right-0 z-50/);
  assert.match(source, /border-l border-\[var\(--line\)\]/);
  assert.match(source, /x: 310/);
  assert.match(source, /items-center justify-between gap-3 px-4/);
});

test("mobile sidebar uses icons instead of sliced text badges", () => {
  assert.doesNotMatch(source, /label\.slice\(0, 2\)/);
  assert.match(source, /icon=\{<HomeIcon \/>\}/);
  assert.match(source, /icon=\{<YearNavIcon year=\{year\} \/>\}/);
  assert.match(source, /icon=\{<DocumentIcon \/>\}/);
  assert.match(source, /function YearNavIcon/);
});

test("year labels are centralized for headings and navigation", () => {
  assert.match(source, /const yearCopy: Record/);
  assert.match(source, /function getYearCopy/);
  assert.match(source, /heading: "ปี 1"/);
  assert.match(source, /sidebarLabel: "ปี 1"/);
  assert.doesNotMatch(source, /ปูพื้นฐาน/);
  assert.doesNotMatch(source, /ต่อแกนหลัก/);
  assert.doesNotMatch(source, /ลงลึกสายเลือก/);
  assert.doesNotMatch(source, /เตรียมจบ/);
  assert.match(source, /label=\{getYearCopy\(year\)\.sidebarLabel\}/);
  assert.match(source, /\{copy\.heading\}/);
  assert.match(source, /\{copy\.summaryTitle\}/);
  assert.doesNotMatch(source, /yearHeadings/);
});

test("root html declares smooth scroll behavior for Next route transitions", () => {
  assert.match(layoutSource, /data-scroll-behavior="smooth"/);
});

test("course filters are an accordion that starts closed", () => {
  assert.match(source, /const \[isFilterOpen, setIsFilterOpen\] = useState\(false\)/);
  assert.match(source, /aria-expanded=\{isFilterOpen\}/);
  assert.match(source, /filter-panel-\$\{panelId\}/);
});

test("course section exposes search before advanced filters", () => {
  assert.match(source, /CourseFiltersPanel/);
  assert.match(source, /ตัวกรองเพิ่มเติม/);
  assert.match(source, /value=\{filters\.query\}/);
  assert.match(source, /setFilter\("query", event\.target\.value\)/);
});

test("planned courses use a desktop scan list and mobile cards", () => {
  assert.match(source, /CourseResultsList/);
  assert.match(source, /hidden overflow-hidden rounded-lg border border-\[var\(--line\)\] bg-\[var\(--panel\)\] lg:block/);
  assert.match(source, /lg:hidden/);
});

test("optional courses are disclosed by requirement group", () => {
  assert.match(source, /RequirementGroupDisclosure/);
  assert.match(source, /const \[isGroupOpen, setIsGroupOpen\] = useState\(false\)/);
});

test("mobile year page prioritizes course content before overview", () => {
  assert.match(source, /max-w-7xl flex-col/);
  assert.match(source, /id="study-plan" className="order-2/);
  assert.match(source, /id="courses" className="order-1/);
  assert.doesNotMatch(source, /<AccordionItem title="ภาพรวมหลักสูตร" defaultOpen>/);
});

test("desktop year page uses a stable overview sidebar beside course content", () => {
  assert.match(source, /lg:grid-cols-\[360px_minmax\(0,1fr\)\]/);
  assert.match(source, /lg:sticky lg:top-24/);
  assert.match(source, /<StudyPlanGrid terms=\{terms\} compact \/>/);
});

test("visible interface labels are Thai-first", () => {
  assert.doesNotMatch(source, />Filter</);
  assert.doesNotMatch(source, />Summary</);
  assert.doesNotMatch(source, />Year summary</);
  assert.doesNotMatch(source, />credits</);
  assert.match(source, />ค้นหา</);
  assert.match(source, />ภาพรวมหลักสูตร</);
  assert.match(source, />ภาพรวมปี</);
  assert.match(source, />หน่วยกิต</);
});

test("course detail modal is fullscreen on mobile and parses PDF details", () => {
  assert.match(source, /h-dvh max-h-dvh w-full/);
  assert.match(source, /parseCoursePdfDetail/);
  assert.match(source, /prerequisite/);
  assert.match(source, /corequisite/);
  assert.match(source, /thaiDescription/);
  assert.match(source, /englishDescription/);
});

test("course detail modal header scrolls normally instead of sticking", () => {
  assert.doesNotMatch(source, /sticky top-0 z-10 flex items-start justify-between gap-4 border-b/);
  assert.match(source, /flex items-start justify-between gap-4 border-b border-\[var\(--line\)\] bg-\[var\(--panel\)\] p-4/);
});

test("course detail modal can jump to referenced prerequisite courses", () => {
  assert.match(source, /onSelectCourse/);
  assert.match(source, /getReferencedCourses/);
  assert.match(source, /normalizeCourseReferenceText/);
});

test("animations use restrained product motion with reduced-motion fallbacks", () => {
  assert.match(source, /const motionTiming = \{/);
  assert.match(source, /const easeOutQuint = \[0\.22, 1, 0\.36, 1\]/);
  assert.match(source, /function stateTransition/);
  assert.match(source, /function listTransition/);
  assert.match(source, /Math\.min\(index, 8\) \* 0\.025/);
  assert.match(source, /duration: motionTiming\.instant/);
  assert.match(source, /transition=\{listTransition\(index, reduceMotion\)\}/);
  assert.match(source, /active:scale-\[0\.99\]/);
  assert.match(source, /active:scale-\[0\.995\]/);
});

test("course detail parser removes catalog tails before splitting languages", () => {
  assert.match(source, /รายวิชาบังคับ\[\\s\\S\]\*\$/);
  assert.match(source, /กลุ่มวิชา\[\\s\\S\]\*\$/);
  assert.match(source, /splitThaiAndEnglishDescriptions/);
});

test("course detail modal traps focus and restores the opener", () => {
  assert.match(source, /lastFocusedElementRef/);
  assert.match(source, /dialogRef/);
  assert.match(source, /event\.key !== "Tab"/);
  assert.match(source, /focusableSelector/);
  assert.match(source, /preventScroll: true/);
});

test("lint focuses on app source instead of local agent tooling", () => {
  assert.match(eslintConfigSource, /"\.agents\/\*\*"/);
  assert.match(eslintConfigSource, /"\.impeccable\/\*\*"/);
});
