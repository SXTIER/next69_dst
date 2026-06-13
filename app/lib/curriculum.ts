import type { Course, CourseCategory, SpecializedTrack, Term } from "@/app/data/curriculum";

export type CourseSort = "year" | "code" | "credits" | "title";

export type CourseFilters = {
  query: string;
  category: CourseCategory | "all";
  year: number | "all";
  term: Term | "all";
  track: SpecializedTrack | "all";
  sort: CourseSort;
};

const normalize = (value: string) => value.toLocaleLowerCase("th-TH").trim();

export function filterCourses<TCourse extends Course>(courses: TCourse[], filters: CourseFilters) {
  const query = normalize(filters.query);

  return courses.filter((course) => {
    const matchesQuery =
      !query ||
      normalize(
        [course.code, course.thaiCode, course.titleTh, course.titleEn, course.note]
          .filter(Boolean)
          .join(" "),
      ).includes(query);
    const matchesCategory = filters.category === "all" || course.category === filters.category;
    const matchesYear = filters.year === "all" || course.year === filters.year;
    const matchesTerm = filters.term === "all" || course.term === filters.term;
    const matchesTrack = filters.track === "all" || course.track === filters.track;

    return matchesQuery && matchesCategory && matchesYear && matchesTerm && matchesTrack;
  });
}

export function sortCourses<TCourse extends Course>(courses: TCourse[], sort: CourseSort) {
  return [...courses].sort((a, b) => {
    if (sort === "credits") {
      return b.credits - a.credits || a.code.localeCompare(b.code);
    }

    if (sort === "title") {
      return a.titleTh.localeCompare(b.titleTh, "th-TH") || a.code.localeCompare(b.code);
    }

    if (sort === "code") {
      return a.code.localeCompare(b.code);
    }

    return (a.year ?? 99) - (b.year ?? 99) || termOrder(a.term) - termOrder(b.term) || a.code.localeCompare(b.code);
  });
}

export function applyCourseFilters<TCourse extends Course>(courses: TCourse[], filters: CourseFilters) {
  return sortCourses(filterCourses(courses, filters), filters.sort);
}

export function sumCredits(courses: Course[]) {
  return courses.reduce((total, course) => total + course.credits, 0);
}

function termOrder(term?: Term) {
  if (term === "1") return 1;
  if (term === "2") return 2;
  if (term === "summer") return 3;
  return 9;
}
