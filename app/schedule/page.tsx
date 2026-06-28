"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  prepSchedule,
  type PrepScheduleDay,
  type PrepScheduleEvent,
} from "@/app/data/prep-schedule";
import { DesktopNav, MobileSidebar } from "@/app/components/course-explorer/navigation";
import { CloseIcon, motionTiming, stateTransition } from "@/app/components/course-explorer/ui";

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

const dayHeadersTh = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

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
  const [selectedDay, setSelectedDay] = useState<{ day: PrepScheduleDay; weekNumber: number } | null>(null);
  const [todayData, setTodayData] = useState<{ week: number; day: PrepScheduleDay } | null | "loading" | "before" | "after">("loading");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayData(getTodaySchedule());
  }, []);

  const handleDayClick = useCallback((day: PrepScheduleDay, weekNumber: number) => {
    setSelectedDay({ day, weekNumber });
  }, []);

  return (
    <div className="min-h-screen bg-(--page) text-(--text)">
      <DesktopNav />
      <MobileSidebar />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--muted)">
            Preparatory Program 2026
          </p>
          <h1 className="mt-2 text-3xl font-semibold">ตารางเรียนปรับพื้นฐาน</h1>
          <p className="mt-1 text-sm leading-6 text-(--muted)">
            Prep [2026]
          </p>
        </header>

        <TodaySection todayData={todayData} onDayClick={handleDayClick} />

        <div className="space-y-8">
          {prepSchedule.map((week) => (
            <WeekSection
              key={week.weekNumber}
              week={week}
              onDayClick={handleDayClick}
            />
          ))}
        </div>
      </main>

      <DayDetailModal
        day={selectedDay?.day ?? null}
        weekNumber={selectedDay?.weekNumber ?? 0}
        onClose={() => setSelectedDay(null)}
      />
    </div>
  );
}

function TodaySection({
  todayData,
  onDayClick,
}: {
  todayData: { week: number; day: PrepScheduleDay } | null | "loading" | "before" | "after";
  onDayClick: (day: PrepScheduleDay, weekNumber: number) => void;
}) {
  if (todayData === "loading") {
    return (
      <div className="mb-8 rounded-xl border border-(--line) bg-(--panel) p-5 shadow-sm">
        <div className="h-4 w-24 animate-pulse rounded bg-(--skeleton)" />
        <div className="mt-3 h-6 w-64 animate-pulse rounded bg-(--skeleton)" />
        <div className="mt-4 h-20 animate-pulse rounded bg-(--skeleton)" />
      </div>
    );
  }

  if (todayData === "before") {
    return (
      <div className="mb-8 rounded-xl border border-(--line) bg-(--panel) p-6 shadow-sm">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-(--accent)"><CalendarIcon className="h-4 w-4" /> วันนี้</p>
        <p className="mt-3 text-lg font-semibold">โปรแกรมปรับพื้นฐานยังไม่เริ่มนะ</p>
        <p className="mt-1 text-sm text-(--muted)">เริ่มวันที่ 21 มิถุนายน 2026</p>
      </div>
    );
  }

  if (todayData === "after") {
    return (
      <div className="mb-8 rounded-xl border border-(--line) bg-(--panel) p-6 shadow-sm">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-(--accent)"><CalendarIcon className="h-4 w-4" /> วันนี้</p>
        <p className="mt-3 text-lg font-semibold">โปรแกรมปรับพื้นฐานสิ้นสุดแล้ว</p>
      </div>
    );
  }

  if (todayData === null) {
    return (
      <div className="mb-8 rounded-xl border border-(--line) bg-(--panel) p-6 shadow-sm">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-(--accent)"><CalendarIcon className="h-4 w-4" /> วันนี้</p>
        <p className="mt-3 text-lg font-semibold">วันนี้ไม่มีกิจกรรมน้าา</p>
        <p className="mt-1 text-sm text-(--muted)">
          {new Date().toLocaleDateString("th-TH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    );
  }

  const { week, day } = todayData;

  return (
    <button
      type="button"
      onClick={() => onDayClick(day, week)}
      className="mb-8 w-full rounded-xl border border-(--line) bg-(--panel) p-5 text-left shadow-sm transition hover:bg-(--accent-soft) active:scale-[0.99]"
    >
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-(--accent)" />
        <span className="text-xs font-semibold uppercase tracking-wider text-(--accent)">วันนี้</span>
      </div>
      <h3 className="mt-2 text-xl font-semibold">
        {day.dayNameTh}ที่ {day.date} {monthLabel[day.month] ?? day.month} 2026
      </h3>

      {day.isHoliday ? (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950/20">
          <StarIcon className="h-6 w-6 text-red-500" />
          <p className="mt-1 text-lg font-semibold text-red-700 dark:text-red-300">{day.holidayName}</p>
          <p className="mt-1 text-sm text-red-600/70 dark:text-red-400/70">วันหยุด — ไม่มีการเรียนการสอน</p>
        </div>
      ) : day.events.length === 0 ? (
        <>
          <p className="mt-3 text-lg font-semibold">วันนี้ไม่มีกิจกรรมน้าา</p>
        </>
      ) : (
        <div className="mt-3 space-y-2">
          {day.events.map((event, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-4 ${event.variant === "info"
                  ? "border-(--accent) bg-(--accent-soft)"
                  : "border-(--line) bg-(--panel-soft)"
                }`}
            >
              {event.time ? (
                <span className="inline-block rounded-md bg-(--accent) px-2 py-0.5 text-xs font-semibold text-(--page)">
                  {event.time}
                </span>
              ) : null}
              <p className="mt-1.5 text-xs font-semibold">{event.title}</p>
              {event.instructor ? <p className="mt-0.5 text-[11px] text-(--muted)"><UserIcon className="inline h-3 w-3 align-text-bottom" /> {event.instructor}</p> : null}
              {event.room ? <p className="text-[11px] text-(--muted)"><MapPinIcon className="inline h-3 w-3 align-text-bottom text-red-600" /> ห้อง {event.room}</p> : null}
              {event.note ? <p className="mt-0.5 text-[11px] italic text-(--muted)">{event.note}</p> : null}
            </div>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-(--muted)">กดเพื่อดูรายละเอียดแบบเต็ม →</p>
    </button>
  );
}

const WeekSection = memo(function WeekSection({
  week,
  onDayClick,
}: {
  week: (typeof prepSchedule)[number];
  onDayClick: (day: PrepScheduleDay, weekNumber: number) => void;
}) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="rounded-xl border border-(--line) bg-(--panel) shadow-sm">
      <div className="rounded-t-xl border-b border-(--line) bg-(--panel-soft) px-4 py-3 sm:px-5">
        <h2 className="text-sm font-semibold">
          สัปดาห์ที่ {week.weekNumber}
          <span className="ml-2 font-normal text-(--muted)">
            {week.dateRangeTh}
          </span>
        </h2>
      </div>

      {/* Desktop: 7-column grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 divide-x divide-(--line) border-b border-(--line) bg-(--panel-soft) text-center text-[11px] font-semibold uppercase tracking-wider text-(--muted)">
          {dayHeadersTh.map((h) => (
            <div key={h} className="px-1 py-2">{h}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-(--line)">
          {week.days.map((day) => (
            <button
              key={`${day.dayName}-${day.date}`}
              type="button"
              onClick={() => onDayClick(day, week.weekNumber)}
              className="flex min-h-[120px] flex-col gap-0.5 px-1.5 py-2 text-left text-[10px] leading-tight transition hover:bg-(--accent-soft) active:scale-[0.99]"
            >
              <DayCellContent day={day} />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden">
        {week.days.map((day, idx) => {
          const isOpen = expandedIdx === idx;
          return (
            <div key={`${day.dayName}-${day.date}`} className="border-b border-(--line) last:border-b-0">
              <button
                type="button"
                onClick={() => setExpandedIdx(isOpen ? null : idx)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-(--panel-soft) active:scale-[0.99]"
              >
                <div className="w-12 shrink-0 text-center">
                  <div className="text-[10px] font-semibold text-(--muted)">{day.dayNameTh}</div>
                  <div className="text-sm font-semibold leading-5">{day.date}</div>
                </div>
                <div className="min-w-0 flex-1 text-xs text-(--muted) truncate">
                  {day.isHoliday ? day.holidayName : day.events.length > 0 ? day.events[0].title : "—"}
                </div>
                <span
                  className={`shrink-0 text-(--muted) transition-transform ${isOpen ? "rotate-90" : ""}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </span>
              </button>
              {isOpen ? (
                <div className="border-t border-(--line) bg-(--panel-soft) px-4 py-4">
                  <DayAccordionContent day={day} onDayClick={onDayClick} weekNumber={week.weekNumber} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
});

const DayAccordionContent = memo(function DayAccordionContent({ day, onDayClick, weekNumber }: { day: PrepScheduleDay; onDayClick: (day: PrepScheduleDay, weekNumber: number) => void; weekNumber: number }) {
  if (day.isHoliday) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950/20">
        <StarIcon className="h-5 w-5 text-red-500 mx-auto" />
        <p className="mt-1 text-sm font-semibold text-red-700 dark:text-red-300">{day.holidayName}</p>
        <p className="text-xs text-red-600/70 dark:text-red-400/70">วันหยุด — ไม่มีการเรียนการสอน</p>
      </div>
    );
  }

  if (day.events.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-(--line-strong) p-5 text-center">
        <p className="text-xs text-(--muted)">ไม่มีกิจกรรมในวันนี้</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {day.events.map((event, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-4 ${event.variant === "info"
              ? "border border-(--accent) bg-white dark:bg-(--panel)"
              : "bg-white dark:bg-(--panel)"
            }`}
        >
          {event.time ? (
            <div className="mb-1 inline-block rounded-md bg-(--accent) px-2 py-0.5 text-[11px] font-semibold text-(--page)">
              {event.time}
            </div>
          ) : null}
          <p className="text-xs font-semibold">{event.title}</p>
          {event.instructor ? <p className="mt-0.5 text-[11px] text-(--muted)"><UserIcon className="inline h-3 w-3 align-text-bottom" /> {event.instructor}</p> : null}
          {event.room ? <p className="text-[11px] text-(--muted)"><MapPinIcon className="inline h-3 w-3 align-text-bottom text-red-600" /> ห้อง {event.room}</p> : null}
          {event.note ? <p className="mt-0.5 text-[11px] italic text-(--muted)">{event.note}</p> : null}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onDayClick(day, weekNumber)}
        className="w-full rounded-md border border-(--line) bg-(--panel) py-2 text-xs font-semibold text-(--muted) transition hover:bg-(--panel-soft) active:scale-[0.98]"
      >
        ดูรายละเอียดแบบเต็ม →
      </button>
    </div>
  );
});

const DayCellContent = memo(function DayCellContent({ day }: { day: PrepScheduleDay }) {
  if (day.isHoliday) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded bg-red-50 p-1 dark:bg-red-950/20">
        <StarIcon className="h-4 w-4 text-red-500" />
        <span className="text-center text-[12px] font-semibold leading-tight text-red-700 dark:text-red-300">
          {day.holidayName}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="mb-0.5 text-center text-[12px] font-semibold text-(--text)">
        {day.date}
      </div>

      {day.events.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-[9px] text-(--muted)">—</div>
      ) : (
        <div className="space-y-2">
          {day.events.map((event, idx) => (
            <div
              key={idx}
              className={`rounded px-3 py-2 ${event.variant === "info"
                  ? "border-noneOBE DAY (งดเรียน)  bg-(--accent-soft)"
                  : "bg-(--panel-soft)"
                }`}
            >
              {event.time ? (
                <div className="font-semibold text-(--accent)">{event.time}</div>
              ) : null}
              <div className="text-[15px]">{event.title}</div>
              {event.instructor ? (
                <div className="text-[13px]">{event.instructor}</div>
              ) : null}
              {event.room ? (
                <div className="text-[13px]"><MapPinIcon className="inline h-2.5 w-2.5 align-text-bottom text-red-600" /> {event.room}</div>
              ) : null}
              {event.note ? (
                <div className="italic text-[13px] text-gray-600">{event.note}</div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
});

function DayDetailModal({
  day,
  weekNumber,
  onClose,
}: {
  day: PrepScheduleDay | null;
  weekNumber: number;
  onClose: () => void;
}) {
  const titleId = "day-modal-title";
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!day) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [day]);

  return (
    <AnimatePresence>
      {day ? (
        <motion.div
          key={`${day.date}-${day.month}`}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={stateTransition(undefined, motionTiming.feedback)}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="h-dvh max-h-dvh w-full overflow-auto bg-(--panel) shadow-xl sm:h-auto sm:max-h-[88vh] sm:max-w-xl sm:rounded-lg sm:border sm:border-(--line)"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={stateTransition(undefined, motionTiming.reveal)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-(--line) bg-(--panel) p-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--muted)">
                  สัปดาห์ที่ {weekNumber}
                </p>
                <h2 id={titleId} className="mt-1 text-2xl font-semibold">
                  {day.dayNameTh}ที่ {day.date} {monthLabel[day.month] ?? day.month}
                </h2>
                <p className="mt-0.5 text-sm text-(--muted)">
                  {day.dayName} {day.date}-{day.month}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                autoFocus
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-(--line) bg-(--panel) transition hover:border-(--line-strong) active:scale-[0.96]"
                aria-label="ปิด"
                title="ปิด"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5 p-5">
              {day.isHoliday ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-center dark:border-red-900 dark:bg-red-950/20">
                  <StarIcon className="h-8 w-8 text-red-500 mx-auto" />
                  <h3 className="mt-3 text-xl font-semibold text-red-700 dark:text-red-300">
                    {day.holidayName}
                  </h3>
                  <p className="mt-1 text-sm text-red-600/70 dark:text-red-400/70">
                    วันหยุด — ไม่มีการเรียนการสอน
                  </p>
                </div>
              ) : null}

              {day.events.length === 0 && !day.isHoliday ? (
                <div className="rounded-lg border border-dashed border-(--line-strong) bg-(--panel-soft) p-8 text-center">
                  <p className="text-base text-(--muted)">ไม่มีกิจกรรมในวันนี้</p>
                </div>
              ) : (
                <div className="divide-y divide-(--line)">
                  {day.events.map((event, idx) => (
                    <EventCard key={idx} event={event} first={idx === 0} last={idx === day.events.length - 1} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const EventCard = memo(function EventCard({ event, first, last }: { event: PrepScheduleEvent; first?: boolean; last?: boolean }) {
  return (
    <div className={`${first ? "pb-5" : last ? "pt-5" : "py-5"} ${event.variant === "info" ? "flex gap-3" : ""}`}>
      {event.variant === "info" ? (
        <div className="w-1 shrink-0 rounded-full bg-(--accent)" />
      ) : null}
      <div className="min-w-0 flex-1">
        {event.time ? (
          <div className="mb-2 inline-block rounded-md bg-(--accent) px-2 py-1 text-sm font-semibold text-(--page)">
            {event.time}
          </div>
        ) : null}
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {event.instructor ? (
          <p className="mt-1.5 text-sm text-(--text)">
            <UserIcon className="inline h-4 w-4 align-text-bottom" /> {event.instructor}
          </p>
        ) : null}
        {event.room ? (
          <p className="mt-1 text-sm text-(--text)">
            <MapPinIcon className="inline h-4 w-4 align-text-bottom text-red-600" /> ห้อง {event.room}
          </p>
        ) : null}
        {event.note ? (
          <p className="mt-1 text-xs italic text-(--muted)">
            {event.note}
          </p>
        ) : null}
      </div>
    </div>
  );
});
