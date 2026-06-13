export const yearOptions = [1, 2, 3, 4] as const;
export type YearOption = (typeof yearOptions)[number];

const fallbackYearCopy = {
  heading: "แผนการเรียน",
  navLabel: "ปี",
  sidebarLabel: "แผนการเรียน",
  cardTitle: "ปี",
  summaryTitle: "ปี",
  heroDescription: "ดูแผนการเรียนและรายวิชาของชั้นปีนี้",
};

const yearCopy: Record<
  YearOption,
  {
    heading: string;
    navLabel: string;
    sidebarLabel: string;
    cardTitle: string;
    summaryTitle: string;
    heroDescription: string;
  }
> = {
  1: {
    heading: "ปี 1",
    navLabel: "ปี 1",
    sidebarLabel: "ปี 1",
    cardTitle: "ปี 1",
    summaryTitle: "ปี 1",
    heroDescription: "ดูแผนการเรียนและรายวิชาชั้นปี 1",
  },
  2: {
    heading: "ปี 2",
    navLabel: "ปี 2",
    sidebarLabel: "ปี 2",
    cardTitle: "ปี 2",
    summaryTitle: "ปี 2",
    heroDescription: "ดูแผนการเรียนและรายวิชาชั้นปี 2",
  },
  3: {
    heading: "ปี 3",
    navLabel: "ปี 3",
    sidebarLabel: "ปี 3",
    cardTitle: "ปี 3",
    summaryTitle: "ปี 3",
    heroDescription: "ดูแผนการเรียนและรายวิชาชั้นปี 3",
  },
  4: {
    heading: "ปี 4",
    navLabel: "ปี 4",
    sidebarLabel: "ปี 4",
    cardTitle: "ปี 4",
    summaryTitle: "ปี 4",
    heroDescription: "ดูแผนการเรียนและรายวิชาชั้นปี 4",
  },
};

export function getYearCopy(year: number) {
  return year in yearCopy ? yearCopy[year as YearOption] : fallbackYearCopy;
}
