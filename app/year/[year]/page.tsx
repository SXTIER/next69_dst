import { notFound } from "next/navigation";
import { YearCoursePage } from "@/app/components/course-explorer";

const years = ["1", "2", "3", "4"] as const;

export function generateStaticParams() {
  return years.map((year) => ({ year }));
}

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;

  if (!years.includes(year as (typeof years)[number])) {
    notFound();
  }

  return <YearCoursePage year={Number(year)} />;
}
