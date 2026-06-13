/* eslint-disable @typescript-eslint/no-require-imports */

const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");

require.extensions[".ts"] = function loadTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  }).outputText;

  module._compile(output, filename);
};

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveAlias(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    return originalResolveFilename.call(this, path.join(projectRoot, request.slice(2)), parent, isMain, options);
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

const { getYearCurriculumView } = require("../app/lib/year-curriculum-view.ts");
const { coursePdfDetails } = require("../app/data/course-details.ts");

test("year view separates planned courses from requirement slots and elective options", () => {
  const view = getYearCurriculumView(3);

  assert.equal(view.year, 3);
  assert.equal(view.planCredits, 32);
  assert.equal(view.plannedCourses.some((course) => course.code === "SPECIALIZED"), false);
  assert.equal(view.plannedCourses.some((course) => course.code === "FREE"), false);
  assert.equal(view.requirementSlots.length, 1);
  assert.equal(view.requirementSlots[0].code, "SPECIALIZED");
  assert.equal(view.requirementSlots[0].requiredCredits, 18);
  assert.equal(view.electiveOptions.length, 4);
  assert.equal(view.electiveOptions.every((group) => group.courses.length > 0), true);
});

test("displayed credits exclude elective catalog options", () => {
  const view = getYearCurriculumView(1);
  const plannedCredits = view.plannedCourses.reduce((total, course) => total + course.credits, 0);

  assert.equal(view.planCredits, 40);
  assert.equal(view.displayedCourseCredits, plannedCredits);
  assert.equal(view.displayedCourseCredits < 56, true);
});

test("fourth year free elective options only show independent study", () => {
  const firstYearView = getYearCurriculumView(1);
  const fourthYearView = getYearCurriculumView(4);

  const firstYearFreeCourses = firstYearView.electiveOptions
    .filter((group) => group.requirementCode === "FREE")
    .flatMap((group) => group.courses);
  const fourthYearFreeCourses = fourthYearView.electiveOptions
    .filter((group) => group.requirementCode === "FREE")
    .flatMap((group) => group.courses);

  assert.equal(firstYearFreeCourses.some((course) => course.code === "ITDS 192"), true);
  assert.deepEqual(
    fourthYearFreeCourses.map((course) => course.code),
    ["ITDS 495"],
  );
});

test("course PDF details expose source excerpts for modal reading", () => {
  assert.equal(coursePdfDetails["ITDS 120"].sourcePage, 35);
  assert.match(coursePdfDetails["ITDS 120"].excerpt, /Fundamentals of Programming/);
  assert.match(coursePdfDetails["ITDS 120"].excerpt, /รายวิชาที่ต้องเรียนมาก่อน/);
  assert.equal(coursePdfDetails["ITDS 381"].sourcePage, 43);
});
