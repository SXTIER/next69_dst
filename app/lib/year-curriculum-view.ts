import {
  courses,
  studyPlan,
  trackLabels,
  type Course,
  type SpecializedTrack,
  type StudyTerm,
} from "@/app/data/curriculum";
import { sumCredits } from "@/app/lib/curriculum";

const requirementCodes = ["SPECIALIZED", "FREE"] as const;
const specializedTracks: SpecializedTrack[] = ["iot", "data", "cybersecurity", "software"];

export type RequirementCode = (typeof requirementCodes)[number];

export type RequirementSlot = Course & {
  code: RequirementCode;
  requiredCredits: number;
  optionCount: number;
  helperText: string;
};

export type ElectiveOptionGroup = {
  id: string;
  requirementCode: RequirementCode;
  label: string;
  description: string;
  courses: Course[];
};

export type YearCurriculumView = {
  year: number;
  terms: StudyTerm[];
  plannedCourses: Course[];
  requirementSlots: RequirementSlot[];
  electiveOptions: ElectiveOptionGroup[];
  planCredits: number;
  displayedCourseCredits: number;
};

export function getYearCurriculumView(year: number): YearCurriculumView {
  const terms = studyPlan.filter((term) => term.year === year);
  const plannedCodes = new Set(terms.flatMap((term) => term.courseCodes));
  const activeRequirementCodes = requirementCodes.filter((code) => plannedCodes.has(code));

  const plannedCourses = courses.filter((course) => course.year === year && !isRequirementCourse(course));
  const electiveOptions = activeRequirementCodes.flatMap((code) => getElectiveOptionGroups(code, year));

  return {
    year,
    terms,
    plannedCourses,
    requirementSlots: activeRequirementCodes.map((code) => buildRequirementSlot(code, year)),
    electiveOptions,
    planCredits: sumStudyTermCredits(terms),
    displayedCourseCredits: sumCredits(plannedCourses),
  };
}

function buildRequirementSlot(code: RequirementCode, year: number): RequirementSlot {
  const course = courses.find((item) => item.code === code);

  if (!course) {
    throw new Error(`Missing requirement course: ${code}`);
  }

  const optionGroups = getElectiveOptionGroups(code, year);
  const optionCount = optionGroups.reduce((total, group) => total + group.courses.length, 0);

  return {
    ...course,
    code,
    requiredCredits: course.credits,
    optionCount,
    helperText:
      code === "SPECIALIZED"
        ? "เลือกจากกลุ่มเฉพาะด้านด้านล่าง ไม่ได้นับทุกตัวเลือกเป็นภาระเรียนพร้อมกัน"
        : "เลือกให้ครบตามหน่วยกิตที่หลักสูตรกำหนด ไม่ได้นับทุกตัวเลือกเป็นภาระเรียนพร้อมกัน",
  };
}

function getElectiveOptionGroups(code: RequirementCode, year: number): ElectiveOptionGroup[] {
  if (code === "SPECIALIZED") {
    return specializedTracks.map((track) => ({
      id: track,
      requirementCode: code,
      label: trackLabels[track],
      description: "กลุ่มวิชาเลือกเฉพาะด้าน",
      courses: courses.filter((course) => course.category === "specialized" && course.track === track),
    }));
  }

  return [
    {
      id: "free",
      requirementCode: code,
      label: "วิชาเลือกเสรี",
      description: "ตัวอย่างรายวิชาเลือกเสรีในหลักสูตร",
      courses: courses.filter((course) => isFreeElectiveOptionForYear(course, year)),
    },
  ];
}

function isRequirementCourse(course: Course) {
  return requirementCodes.some((code) => course.code === code);
}

function isFreeElectiveOptionForYear(course: Course, year: number) {
  if (course.category !== "free" || course.code === "FREE") {
    return false;
  }

  return year !== 4 || course.code === "ITDS 495";
}

function sumStudyTermCredits(terms: StudyTerm[]) {
  return terms.reduce((total, term) => total + term.credits, 0);
}
