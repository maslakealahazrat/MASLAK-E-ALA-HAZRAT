import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Sparkles, Heart } from "lucide-react";
import HadithBrowserClient from "@/components/HadithBrowserClient";
import "@/app/quran/quran-app.css";

export const metadata: Metadata = {
  title: "Al-Hadith Gateway — Authentic Prophetic Traditions & Canonical Books",
  description: "Explore Sahih al-Bukhari, Sahih Muslim, Jami` at-Tirmidhi, and 40 Hadith an-Nawawi structured by Books (Kutub) and Chapters with Arabic, Urdu, and English.",
  alternates: {
    canonical: "/hadith",
  },
};

export default function HadithPage() {
  return (
    <main className="quranContainer quran-theme-emerald">
      {/* HERO BANNER */}
      <section className="surahHeroBanner">
        <Link href="/" className="quranIconButton" style={{ display: "inline-flex", marginBottom: "16px" }}>
          ← Home
        </Link>

        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          الحديث النبوي الشريف — كتب وسنن
        </div>

        <h1 className="surahEnglishTitleHero" style={{ fontSize: "32px" }}>
          Al-Hadith Gateway
        </h1>

        <p className="surahMeaningHero" style={{ maxWidth: "720px", margin: "0 auto 20px" }}>
          The words, actions, approvals, and sublime character of the Beloved Messenger of Allah, Prophet Muhammad ﷺ, categorized by authentic Canonical Collections and Books (Kutub).
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">Sahih al-Bukhari</span>
          <span className="surahBadgeItem">Sahih Muslim</span>
          <span className="surahBadgeItem">Jami` at-Tirmidhi</span>
          <span className="surahBadgeItem">40 Hadith Nawawi</span>
          <span className="surahBadgeItem">Book &amp; Chapter Structure</span>
        </div>
      </section>

      {/* INTERACTIVE BROWSER CLIENT */}
      <HadithBrowserClient />
    </main>
  );
}
