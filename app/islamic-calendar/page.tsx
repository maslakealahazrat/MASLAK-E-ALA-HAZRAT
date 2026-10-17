import type { Metadata } from "next";
import Link from "next/link";
import IslamicCalendarClient from "@/components/IslamicCalendarClient";
import "@/app/quran/quran-app.css";

export const metadata: Metadata = {
  title: "Islamic Hijri Calendar — 12 Sacred Months, Urs & Holy Occasions",
  description:
    "Explore the complete Islamic Hijri lunar calendar, Urs-e-Razawi, Gyarween Shareef, Eid Milad-un-Nabi ﷺ, Ramadan, Shab-e-Barat, and interactive Gregorian to Hijri date converter.",
  alternates: {
    canonical: "/islamic-calendar",
  },
};

export default function IslamicCalendarPage() {
  return (
    <main className="quranContainer quran-theme-emerald">
      <section className="surahHeroBanner">
        <Link href="/" className="quranIconButton" style={{ display: "inline-flex", marginBottom: "16px" }}>
          ← Home
        </Link>

        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          التقويم الهجري الإسلامي
        </div>

        <h1 className="surahEnglishTitleHero" style={{ fontSize: "32px" }}>
          Islamic Hijri Calendar
        </h1>

        <p className="surahMeaningHero" style={{ maxWidth: "700px", margin: "0 auto 20px" }}>
          Authentic Hijri months, sanctified Islamic dates, traditional festivals, Urs of Awliya, and sacred fasting occasions based on the lunar calendar.
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">Lunar Year System</span>
          <span className="surahBadgeItem">12 Sacred Months</span>
          <span className="surahBadgeItem">Urs-e-Razawi &amp; Awliya</span>
          <span className="surahBadgeItem">Interactive Date Converter</span>
        </div>
      </section>

      <IslamicCalendarClient />
    </main>
  );
}
