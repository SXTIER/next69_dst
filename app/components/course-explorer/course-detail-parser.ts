import { courses, type Course } from "@/app/data/curriculum";

export type ParsedCoursePdfDetail = {
  prerequisite: string;
  corequisite: string;
  thaiDescription: string;
  englishDescription: string;
};

const thaiDigitMap: Record<string, string> = {
  "๐": "0",
  "๑": "1",
  "๒": "2",
  "๓": "3",
  "๔": "4",
  "๕": "5",
  "๖": "6",
  "๗": "7",
  "๘": "8",
  "๙": "9",
};

const thaiCoursePrefixMap: Record<string, string> = {
  ทสวด: "ITDS",
  ทสศท: "ITGE",
  ทสภษ: "ITLG",
  มมศท: "MUGE",
  ศศลท: "LATP",
  ศศภอ: "LAEN",
};

export function parseCoursePdfDetail(course: Course, excerpt?: string): ParsedCoursePdfDetail | null {
  if (!excerpt) return null;

  const compactExcerpt = trimExcerptToCourse(course, excerpt).replace(/\s+/g, " ").trim();
  const prerequisitePattern = /รายวิชาที่ต้องเรียนมาก่อน\s*:\s*/;
  const corequisitePattern = /รายวิชาที่ต้องเรียนควบคู่กัน\s*:\s*/;
  const prerequisiteMatch = prerequisitePattern.exec(compactExcerpt);
  const corequisiteMatch = corequisitePattern.exec(compactExcerpt);

  if (!prerequisiteMatch || !corequisiteMatch || corequisiteMatch.index <= prerequisiteMatch.index) {
    const descriptions = splitThaiAndEnglishDescriptions(compactExcerpt);
    return {
      prerequisite: "ไม่มีข้อมูลในส่วนที่ดึงได้",
      corequisite: "ไม่มีข้อมูลในส่วนที่ดึงได้",
      thaiDescription: descriptions.thaiDescription,
      englishDescription: descriptions.englishDescription,
    };
  }

  const prerequisite = compactExcerpt.slice(prerequisiteMatch.index + prerequisiteMatch[0].length, corequisiteMatch.index).trim() || "ไม่มี";
  const corequisiteAndDescription = compactExcerpt.slice(corequisiteMatch.index + corequisiteMatch[0].length).trim();
  const { requirement: corequisite, description } = splitRequirementAndDescription(corequisiteAndDescription);
  const descriptions = splitThaiAndEnglishDescriptions(description);

  return {
    prerequisite,
    corequisite,
    thaiDescription: descriptions.thaiDescription,
    englishDescription: descriptions.englishDescription,
  };
}

function trimExcerptToCourse(course: Course, excerpt: string) {
  const currentCourseIndex = excerpt.indexOf(course.code);
  const searchStart = currentCourseIndex >= 0 ? currentCourseIndex + course.code.length : 0;
  const nextCourseIndex = courses
    .filter((candidate) => candidate.code !== course.code && /^[A-Z]{2,}\s\d{3}$/.test(candidate.code))
    .map((candidate) => excerpt.indexOf(candidate.code, searchStart))
    .filter((index) => index > searchStart)
    .sort((left, right) => left - right)[0];

  return typeof nextCourseIndex === "number" ? excerpt.slice(0, nextCourseIndex).trim() : excerpt.trim();
}

function splitRequirementAndDescription(value: string) {
  const compactValue = value.trim();

  if (!compactValue) {
    return { requirement: "ไม่มี", description: "" };
  }

  if (compactValue.startsWith("ไม่มี")) {
    return { requirement: "ไม่มี", description: compactValue.slice("ไม่มี".length).trim() };
  }

  const descriptionStart = compactValue.search(/\s(?:การ|หลักการ|แนวคิด|บทบาท|โครงสร้าง|ทักษะ|ข้อมูล|คุณค่า|นักศึกษา|วิศวกรรม|ภาพรวม|กระบวนการ)/);

  if (descriptionStart > 0) {
    return {
      requirement: compactValue.slice(0, descriptionStart).trim(),
      description: compactValue.slice(descriptionStart).trim(),
    };
  }

  return { requirement: compactValue, description: "" };
}

function splitThaiAndEnglishDescriptions(value: string) {
  const compactValue = trimTrailingCatalogText(value.trim());
  const englishMatch = compactValue.match(/\s([A-Z][A-Za-z0-9][A-Za-z0-9,;:'’()./& -]{40,})$/);

  if (!englishMatch || englishMatch.index === undefined) {
    return { thaiDescription: compactValue, englishDescription: "" };
  }

  return {
    thaiDescription: trimTrailingCatalogText(compactValue.slice(0, englishMatch.index).trim()),
    englishDescription: trimTrailingCatalogText(englishMatch[1].trim()),
  };
}

function trimTrailingCatalogText(value: string) {
  return value
    .replace(/\s+-\s+รายวิชาบังคับ[\s\S]*$/u, "")
    .replace(/\s+\([๐-๙0-9]+\)\s+กลุ่มวิชา[\s\S]*$/u, "")
    .replace(/\s+(?:ทสวด|ทสศท|ทสภษ|มมศท|ศศลท|ศศภอ)\s+[๐-๙0-9]{3}[\s\S]*$/u, "")
    .replace(/\s+(?:ITDS|ITGE|ITLG|MUGE|LATP|LAEN)\s+\d{3}[\s\S]*$/u, "")
    .trim();
}

export function getReferencedCourses(value: string) {
  const normalizedValue = normalizeCourseReferenceText(value);
  if (!normalizedValue || normalizedValue === "ไม่มี") return [];

  return courses.filter((candidate) => {
    const normalizedThaiCode = normalizeCourseReferenceText(candidate.thaiCode);
    return normalizedValue.includes(candidate.code) || Boolean(normalizedThaiCode && normalizedValue.includes(normalizedThaiCode));
  });
}

export function normalizeCourseReferenceText(value: string) {
  return Object.entries(thaiCoursePrefixMap)
    .reduce((current, [thaiPrefix, englishPrefix]) => current.replaceAll(thaiPrefix, englishPrefix), value)
    .replace(/[๐-๙]/g, (digit) => thaiDigitMap[digit] ?? digit)
    .replace(/\s+/g, " ")
    .trim();
}
