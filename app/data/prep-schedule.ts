export interface PrepScheduleEvent {
  time: string
  title: string
  instructor?: string
  room?: string
  note?: string
  variant?: "info"
}

export interface PrepScheduleDay {
  date: number
  month: string
  dayName: string
  dayNameTh: string
  events: PrepScheduleEvent[]
  isHoliday?: boolean
  holidayName?: string
}

export interface PrepScheduleWeek {
  weekNumber: number
  dateRange: string
  dateRangeTh: string
  days: PrepScheduleDay[]
}

const dayNamesTh: Record<string, string> = {
  Sun: "อาทิตย์",
  Mon: "จันทร์",
  Tue: "อังคาร",
  Wed: "พุธ",
  Thu: "พฤหัสบดี",
  Fri: "ศุกร์",
  Sat: "เสาร์",
};

export const prepSchedule: PrepScheduleWeek[] = [
  {
    weekNumber: 1,
    dateRange: "21 – 27 Jun",
    dateRangeTh: "21 – 27 มิ.ย.",
    days: [
      { date: 21, month: "Jun", dayName: "Sun", dayNameTh: dayNamesTh.Sun, events: [] },
      { date: 22, month: "Jun", dayName: "Mon", dayNameTh: dayNamesTh.Mon, events: [] },
      { date: 23, month: "Jun", dayName: "Tue", dayNameTh: dayNamesTh.Tue, events: [] },
      { date: 24, month: "Jun", dayName: "Wed", dayNameTh: dayNamesTh.Wed, events: [] },
      {
        date: 25, month: "Jun", dayName: "Thu", dayNameTh: dayNamesTh.Thu,
        events: [
          {
            time: "14:00 - 15:00",
            title: "MUDST 'Toefl ITP Explanation (Online)",
            note: "Webex: 2641 685 0228 / Password: dst2026",
          },
        ],
      },
      { date: 26, month: "Jun", dayName: "Fri", dayNameTh: dayNamesTh.Fri, events: [] },
      { date: 27, month: "Jun", dayName: "Sat", dayNameTh: dayNamesTh.Sat, events: [] },
    ],
  },
  {
    weekNumber: 2,
    dateRange: "28 Jun – 4 Jul",
    dateRangeTh: "28 มิ.ย. – 4 ก.ค.",
    days: [
      { date: 28, month: "Jun", dayName: "Sun", dayNameTh: dayNamesTh.Sun, events: [] },
      {
        date: 29, month: "Jun", dayName: "Mon", dayNameTh: dayNamesTh.Mon,
        events: [
          {
            time: "9:00 - 11:00",
            title: "DST' Problem Solving (2Hr)",
            instructor: "ICT Instructor Team",
            room: "Grand Auditorium (4th Floors)",
          },
        ],
      },
      {
        date: 30, month: "Jun", dayName: "Tue", dayNameTh: dayNamesTh.Tue,
        events: [
          {
            time: "9:00 - 12:00",
            title: "DST - TOEFL-ITP (Round 1)",
            room: "TBA",
          },
          {
            time: "13:00 - 16:00",
            title: "DST - TOEFL-ITP (Round 2)",
            room: "TBA",
          },
        ],
      },
      {
        date: 1, month: "Jul", dayName: "Wed", dayNameTh: dayNamesTh.Wed,
        events: [
          {
            time: "9:00 - 11:00",
            title: "DST' Problem Solving (2Hr)",
            instructor: "ICT Instructor Team",
            room: "210",
          },
        ],
      },
      {
        date: 2, month: "Jul", dayName: "Thu", dayNameTh: dayNamesTh.Thu,
        events: [
          {
            time: "9:00 - 11:00",
            title: "DST' Problem Solving (2Hr)",
            instructor: "ICT Instructor Team",
            room: "210",
          },
        ],
      },
      {
        date: 3, month: "Jul", dayName: "Fri", dayNameTh: dayNamesTh.Fri,
        events: [
          {
            time: "",
            title: "OBE DAY (วันหยุด)",
          },
        ],
      },
      { date: 4, month: "Jul", dayName: "Sat", dayNameTh: dayNamesTh.Sat, events: [] },
    ],
  },
  {
    weekNumber: 3,
    dateRange: "5 – 11 Jul",
    dateRangeTh: "5 – 11 ก.ค.",
    days: [
      { date: 5, month: "Jul", dayName: "Sun", dayNameTh: dayNamesTh.Sun, events: [] },
      {
        date: 6, month: "Jul", dayName: "Mon", dayNameTh: dayNamesTh.Mon,
        events: [
          {
            time: "9:00 - 11:00",
            title: "DST' Problem Solving (2Hr)",
            instructor: "ICT Instructor Team",
            room: "210",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 7, month: "Jul", dayName: "Tue", dayNameTh: dayNamesTh.Tue,
        events: [
          {
            time: "9:00 - 11:00",
            title: "DST' Problem Solving (2Hr)",
            instructor: "ICT Instructor Team",
            room: "LAB103, 104, 105",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 8, month: "Jul", dayName: "Wed", dayNameTh: dayNamesTh.Wed,
        events: [
          {
            time: "9:00 - 12:00",
            title: "DST Math. (3Hr.)",
            instructor: "Aj.Thitivatr",
            room: "204",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 9, month: "Jul", dayName: "Thu", dayNameTh: dayNamesTh.Thu,
        events: [
          {
            time: "9:00 - 12:00",
            title: "DST Math. (3Hr.)",
            instructor: "Aj.Thitivatr",
            room: "204",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 10, month: "Jul", dayName: "Fri", dayNameTh: dayNamesTh.Fri,
        events: [
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      { date: 11, month: "Jul", dayName: "Sat", dayNameTh: dayNamesTh.Sat, events: [] },
    ],
  },
  {
    weekNumber: 4,
    dateRange: "12 – 18 Jul",
    dateRangeTh: "12 – 18 ก.ค.",
    days: [
      { date: 12, month: "Jul", dayName: "Sun", dayNameTh: dayNamesTh.Sun, events: [] },
      {
        date: 13, month: "Jul", dayName: "Mon", dayNameTh: dayNamesTh.Mon,
        events: [
          {
            time: "9:00 - 12:00",
            title: "DST Math. (3Hr.)",
            instructor: "Aj.Thitivatr",
            room: "204",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 14, month: "Jul", dayName: "Tue", dayNameTh: dayNamesTh.Tue,
        events: [
          {
            time: "9:00 - 12:00",
            title: "DST Math. (3Hr.)",
            instructor: "Aj.Thitivatr",
            room: "204",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 15, month: "Jul", dayName: "Wed", dayNameTh: dayNamesTh.Wed,
        events: [
          {
            time: "9:00 - 12:00",
            title: "DST Math. (3Hr.)",
            instructor: "Aj.Thitivatr",
            room: "204",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 16, month: "Jul", dayName: "Thu", dayNameTh: dayNamesTh.Thu,
        events: [
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 17, month: "Jul", dayName: "Fri", dayNameTh: dayNamesTh.Fri,
        events: [
          {
            time: "9:00 - 17:00",
            title: "Training Program for Fire Prevention and Control",
            note: 'For "DST ID69" students at ICT Faculty Building',
          },
        ],
      },
      { date: 18, month: "Jul", dayName: "Sat", dayNameTh: dayNamesTh.Sat, events: [] },
    ],
  },
  {
    weekNumber: 5,
    dateRange: "19 – 25 Jul",
    dateRangeTh: "19 – 25 ก.ค.",
    days: [
      { date: 19, month: "Jul", dayName: "Sun", dayNameTh: dayNamesTh.Sun, events: [] },
      {
        date: 20, month: "Jul", dayName: "Mon", dayNameTh: dayNamesTh.Mon,
        events: [
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.A",
            instructor: "Aj.Zeenat (2Hr)",
            room: "310",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.B",
            instructor: "Aj.Prima (2Hr)",
            room: "311",
          },
          {
            time: "13:00 - 15:00",
            title: "DST English Gr.C",
            instructor: "Aj.Om (2Hr)",
            room: "312",
          },
        ],
      },
      {
        date: 21, month: "Jul", dayName: "Tue", dayNameTh: dayNamesTh.Tue,
        events: [
          {
            time: "17:00 - 18:00",
            title: "'Rub Nong Khao Baan Activity",
            note: "(*Optional)",
          },
        ],
      },
      {
        date: 22, month: "Jul", dayName: "Wed", dayNameTh: dayNamesTh.Wed,
        events: [
          {
            time: "9:00 - 12:00",
            title: "'DST - Ethics: Information Session",
            room: "103, 104, 105",
          },
        ],
      },
      {
        date: 23, month: "Jul", dayName: "Thu", dayNameTh: dayNamesTh.Thu,
        events: [
          {
            time: "",
            title: "'ICT & DST New Undergraduate Student Orientation",
          },
        ],
      },
      {
        date: 24, month: "Jul", dayName: "Fri", dayNameTh: dayNamesTh.Fri, events: [
          {
            time: "",
            title: 'Freshman Welcome Activity "Rak Nong" (*Optional)',
            variant: "info",
          },
        ]
      },
      {
        date: 25, month: "Jul", dayName: "Sat", dayNameTh: dayNamesTh.Sat,
        events: [
          {
            time: "",
            title: 'Freshman Welcome Activity "Rak Nong" (*Optional)',
            variant: "info",
          },
        ],
      },
    ],
  },
  {
    weekNumber: 6,
    dateRange: "26 Jul – 1 Aug",
    dateRangeTh: "26 ก.ค. – 1 ส.ค.",
    days: [
      {
        date: 26, month: "Jul", dayName: "Sun", dayNameTh: dayNamesTh.Sun,
        events: [
          {
            time: "",
            title: 'Freshman Welcome Activity "Rak Nong" (*Optional)',
            variant: "info",
          },
        ],
      },
      { date: 27, month: "Jul", dayName: "Mon", dayNameTh: dayNamesTh.Mon, events: [] },
      {
        date: 28, month: "Jul", dayName: "Tue", dayNameTh: dayNamesTh.Tue,
        events: [],
        isHoliday: true,
        holidayName: "H.M. King Maha Vajiralongkorn Phra Vajiraklaochaoyuhua's Birthday",
      },
      {
        date: 29, month: "Jul", dayName: "Wed", dayNameTh: dayNamesTh.Wed,
        events: [],
        isHoliday: true,
        holidayName: "'Asalha Bucha Day",
      },
      {
        date: 30, month: "Jul", dayName: "Thu", dayNameTh: dayNamesTh.Thu,
        events: [],
        isHoliday: true,
        holidayName: "'Buddhist Lent Day",
      },
      {
        date: 31, month: "Jul", dayName: "Fri", dayNameTh: dayNamesTh.Fri,
        events: [
          {
            time: "",
            title: "Mahidol University New Undergraduate Student Orientation",
          },
        ],
      },
      { date: 1, month: "Aug", dayName: "Sat", dayNameTh: dayNamesTh.Sat, events: [] },
    ],
  },
];
