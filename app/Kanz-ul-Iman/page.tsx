import type { Metadata } from "next";
import Link from "next/link";
import KanzUlImanClient from "@/components/KanzUlImanClient";
import "@/app/quran/quran-app.css";

export const metadata: Metadata = {
  title: "Kanz-ul-Iman — Master Holy Qur’an Translation by Ala Hazrat",
  description:
    "Explore Kanz-ul-Iman fi Tarjamat al-Qur’an (کنز الایمان فی ترجمة القرآن), the renowned Urdu Quran translation by Imam Ahmad Raza Khan with theological analysis, Surah index, and audio recitation.",
  alternates: {
    canonical: "/kanz-ul-iman",
  },
};

export default function KanzUlImanPage() {
  return (
    <main className="quranContainer quran-theme-emerald">
      <section className="surahHeroBanner">
        <Link href="/" className="quranIconButton" style={{ display: "inline-flex", marginBottom: "16px" }}>
          ← Home
        </Link>

        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          کنز الایمان فی ترجمۃ القرآن
        </div>

        <h1 className="surahEnglishTitleHero" style={{ fontSize: "32px" }}>
          Kanz-ul-Iman
        </h1>

        <p className="surahMeaningHero" style={{ maxWidth: "720px", margin: "0 auto 20px" }}>
          The Treasure of Faith — the legendary Urdu translation of the Holy Qur’an rendered extemporaneously by Ala Hazrat Imam Ahmad Raza Khan in 1330 AH (1911 CE).
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">Completed in 1330 AH / 1911 CE</span>
          <span className="surahBadgeItem">Theological Guardian</span>
          <span className="surahBadgeItem">Dictated Extemporaneously</span>
          <span className="surahBadgeItem">Available with Audio Reciters</span>
        </div>
      </section>

      <KanzUlImanClient />
    </main>
  );
}
