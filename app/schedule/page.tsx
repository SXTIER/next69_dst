"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  prepSchedule,
  type PrepScheduleDay,
  type PrepScheduleEvent,
} from "@/app/data/prep-schedule";
import { DesktopNav, MobileSidebar } from "@/app/components/course-explorer/navigation";

// Icons
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const monthLabel: Record<string, string> = {
  Jun: "มิถุนายน",
  Jul: "กรกฎาคม",
  Aug: "สิงหาคม",
};

function getTodaySchedule(): { week: number; day: PrepScheduleDay } | null | "before" | "after" {
  const now = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = months[now.getMonth()];
  const currentDate = now.getDate();

  const start = new Date(2026, 5, 21);
  const end = new Date(2026, 7, 1);

  if (now < start) return "before";
  if (now > end) return "after";

  for (const week of prepSchedule) {
    for (const day of week.days) {
      if (day.date === currentDate && day.month === currentMonth) {
        return { week: week.weekNumber, day };
      }
    }
  }
  return null;
}

export default function SchedulePage() {
  const [todayData, setTodayData] = useState<{ week: number; day: PrepScheduleDay } | null | "loading" | "before" | "after">("loading");

  useEffect(() => {
    setTodayData(getTodaySchedule());
  }, []);

  return (
    <div className="min-h-screen bg-(--page) text-(--text)">
      <DesktopNav />
      <MobileSidebar />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold">ตารางเรียน</h1>
          <p className="mt-1 text-xs sm:text-sm leading-6 text-(--muted)">
            DST รุ่น 69
          </p>
        </header>

        <div className="space-y-4 sm:space-y-6">
          {/* Card 1: Today's Schedule Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl border border-(--line) bg-(--panel) p-4 sm:p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-(--line) pb-4">
              <CalendarIcon className="h-5 w-5 text-(--accent)" />
              <h2 className="text-base sm:text-lg font-semibold text-(--text)">วันนี้เรียนอะไร?</h2>
            </div>

            <div className="flex-1 mt-4 sm:mt-6">
              <TodayContent todayData={todayData} />
            </div>
          </motion.div>

          {/* Card 2: PDF Card (Small Horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between gap-3 rounded-xl border border-(--line) bg-(--panel) p-3 sm:p-4 shadow-sm"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {/* PDF Icon (small) */}
              <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="absolute -bottom-1 -right-1 rounded-sm bg-red-600 px-1 py-0.2 text-[6px] sm:text-[7px] font-bold tracking-wider text-white shadow-sm dark:bg-red-700">
                  PDF
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-(--text) leading-tight sm:leading-normal">
                  ตาราง Prep DST รุ่น 69 (v.6)
                </h3>
              </div>
            </div>

            <a
              href="/PDF-infomation/Prep_Program_2026_Schedule_DST_v6.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1 sm:gap-1.5 rounded-md bg-(--text) px-3 py-2 sm:px-4 sm:py-2 text-xs font-semibold text-(--page) shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <span>Open</span>
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function TodayContent({
  todayData,
}: {
  todayData: { week: number; day: PrepScheduleDay } | null | "loading" | "before" | "after";
}) {
  if (todayData === "loading") {
    return (
      <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-(--skeleton)" />
        <div className="h-20 w-full animate-pulse rounded bg-(--skeleton)" />
      </div>
    );
  }

  if (todayData === "before") {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-sm sm:text-base font-medium text-(--text)">โปรแกรมปรับพื้นฐานยังไม่เริ่มนะ</p>
        <p className="mt-2 text-xs text-(--muted)">เริ่มตั้งแต่วันที่ 21 มิถุนายน 2026 เป็นต้นไป</p>
      </div>
    );
  }

  if (todayData === "after") {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-sm sm:text-base font-medium text-(--text)">โปรแกรมปรับพื้นฐานสิ้นสุดแล้ว</p>
      </div>
    );
  }

  if (todayData === null) {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-sm sm:text-base font-medium text-(--text)">วันนี้ไม่มีกิจกรรมน้าา</p>
        <p className="mt-2 text-xs text-(--muted)">
          {new Date().toLocaleDateString("th-TH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    );
  }

  const { day } = todayData;

  return (
    <div className="space-y-4">
      <div className="text-xs sm:text-sm font-medium text-(--muted)">
        {day.dayNameTh}ที่ {day.date} {monthLabel[day.month] ?? day.month} 2026
      </div>

      {day.isHoliday ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-950/20 dark:bg-red-950/20">
          <StarIcon className="mx-auto h-5.5 w-5.5 text-red-500" />
          <p className="mt-2 text-xs sm:text-sm font-semibold text-red-700 dark:text-red-300">{day.holidayName}</p>
          <p className="mt-1 text-[11px] text-red-600/70 dark:text-red-400/70">วันหยุด — ไม่มีการเรียนการสอน</p>
        </div>
      ) : day.events.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base font-medium text-(--text)">วันนี้ไม่มีกิจกรรมน้าา</p>
        </div>
      ) : (
        <div className="space-y-3">
          {day.events.map((event, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-3.5 sm:p-4 transition ${
                event.variant === "info"
                  ? "border-(--accent) bg-(--accent-soft)/20 dark:bg-(--accent-soft)/10"
                  : "border-(--line) bg-(--panel-soft)/30 dark:bg-(--panel-soft)/10"
              }`}
            >
              {event.time ? (
                <span className="inline-block rounded bg-(--accent) px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-(--page)">
                  {event.time}
                </span>
              ) : null}
              <h3 className="mt-1.5 text-xs sm:text-sm font-semibold text-(--text) leading-snug">{event.title}</h3>
              {event.instructor ? (
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-(--muted)">
                  <UserIcon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{event.instructor}</span>
                </p>
              ) : null}
              {event.room ? (
                <p className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-xs text-(--muted)">
                  <MapPinIcon className="h-3.5 w-3.5 text-red-600 dark:text-red-400 shrink-0" />
                  <span className="truncate">ห้อง {event.room}</span>
                </p>
              ) : null}
              {event.note ? (
                <p className="mt-2 text-[11px] sm:text-xs italic text-(--muted) border-l-2 border-(--line) pl-2 break-words">
                  {event.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
