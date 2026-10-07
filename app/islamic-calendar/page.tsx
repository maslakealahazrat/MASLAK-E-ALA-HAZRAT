"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const months = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

const monthsArabic = [
  "مُحَرَّم",
  "صَفَر",
  "رَبِيعُ الْأَوَّل",
  "رَبِيعُ الثَّانِي",
  "جُمَادَى الْأُولَى",
  "جُمَادَى الثَّانِيَة",
  "رَجَب",
  "شَعْبَان",
  "رَمَضَان",
  "شَوَّال",
  "ذُو الْقِعْدَة",
  "ذُو الْحِجَّة",
];

const monthDays = [
  30, 29, 30, 29, 30, 29,
  30, 29, 30, 29, 30, 29,
];

const events: Record<number, { day: number; title: string; note?: string }[]> = {
  1: [
    {
      day: 1,
      title: "Islamic New Year",
      note: "Muharram begins — date may vary by moon sighting.",
    },
    {
      day: 10,
      title: "Ashura",
      note: "10 Muharram — date may vary by moon sighting.",
    },
  ],

  3: [
    {
      day: 12,
      title: "Milad-un-Nabi ﷺ",
      note: "12 Rabi al-Awwal — date may vary by moon sighting.",
    },
  ],

  7: [
    {
      day: 27,
      title: "Shab-e-Mi'raj",
      note: "27 Rajab — date may vary by moon sighting.",
    },
  ],

  8: [
    {
      day: 15,
      title: "Shab-e-Barat",
      note: "15 Sha'ban — date may vary by moon sighting.",
    },
  ],

  9: [
    {
      day: 1,
      title: "Ramadan Begins",
      note: "1 Ramadan — date may vary by moon sighting.",
    },
    {
      day: 27,
      title: "Laylat al-Qadr",
      note: "27 Ramadan is commonly observed; exact night is traditionally sought in the last ten nights.",
    },
  ],

  10: [
    {
      day: 1,
      title: "Eid al-Fitr",
      note: "1 Shawwal — date may vary by moon sighting.",
    },
  ],

  12: [
    {
      day: 9,
      title: "Day of Arafah",
      note: "9 Dhu al-Hijjah — date may vary by moon sighting.",
    },
    {
      day: 10,
      title: "Eid al-Adha",
      note: "10 Dhu al-Hijjah — date may vary by moon sighting.",
    },
  ],
};

export default function IslamicCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(0);

  const days = useMemo(
    () =>
      Array.from(
        { length: monthDays[selectedMonth] },
        (_, index) => index + 1
      ),
    [selectedMonth]
  );

  const monthEvents = events[selectedMonth + 1] || [];

  return (
    <main className="islamicCalendarPage">

      {/* HEADER */}
      <section className="calendarPageHeader">

        <Link href="/" className="calendarBack">
          ← Home
        </Link>

        <div className="calendarPageEyebrow">
          ISLAMIC CALENDAR
        </div>

        <h1>
          Islamic Calendar
        </h1>

        <p className="calendarPageArabic">
          التقويم الهجري
        </p>

        <p className="calendarPageDescription">
          Hijri months, important Islamic dates and
          traditional occasions.
        </p>

      </section>


      {/* MONTH SELECTOR */}
      <section className="calendarMonthSelector">

        <div className="calendarSectionTitle">
          Select Month
        </div>

        <div className="calendarMonthGrid">

          {months.map((month, index) => (

            <button
              key={month}
              type="button"
              className={
                selectedMonth === index
                  ? "calendarMonthButton active"
                  : "calendarMonthButton"
              }
              onClick={() => setSelectedMonth(index)}
            >

              <span>
                {month}
              </span>

              <small>
                {monthsArabic[index]}
              </small>

            </button>

          ))}

        </div>

      </section>


      {/* SELECTED MONTH */}
      <section className="calendarMonthCard">

        <div className="calendarMonthHeading">

          <div>

            <span className="calendarMonthNumber">
              {selectedMonth + 1}
            </span>

            <div>
              <h2>
                {months[selectedMonth]}
              </h2>

              <p>
                {monthsArabic[selectedMonth]}
              </p>
            </div>

          </div>

          <span className="calendarDaysCount">
            {monthDays[selectedMonth]} Days
          </span>

        </div>


        {/* DATE GRID */}
        <div className="calendarWeekHeader">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span className="friday">Fri</span>
          <span>Sat</span>
        </div>


        <div className="calendarDateGrid">

          {days.map((day) => {

            const event = monthEvents.find(
              (item) => item.day === day
            );

            return (
              <div
                key={day}
                className={
                  event
                    ? "calendarDate eventDay"
                    : "calendarDate"
                }
              >

                <span>
                  {day}
                </span>

                {event && (
                  <i />
                )}

              </div>
            );

          })}

        </div>

      </section>


      {/* IMPORTANT EVENTS */}
      <section className="calendarEventsSection">

        <div className="calendarSectionTitle">
          Important Dates
        </div>

        {monthEvents.length > 0 ? (

          <div className="calendarEventsList">

            {monthEvents.map((event) => (

              <div
                key={`${event.day}-${event.title}`}
                className="calendarEventCard"
              >

                <div className="calendarEventDay">
                  {event.day}
                </div>

                <div className="calendarEventContent">

                  <strong>
                    {event.title}
                  </strong>

                  <span>
                    {event.note}
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="calendarNoEvents">
            No major marked event for this month.
          </div>

        )}

      </section>


      {/* NOTE */}
      <section className="calendarNote">

        <strong>
          Moon-sighting note
        </strong>

        <p>
          Islamic dates are based on the Hijri lunar
          calendar. Some dates may differ by one day
          depending on local moon sighting and
          religious authority.
        </p>

      </section>

    </main>
  );
}
