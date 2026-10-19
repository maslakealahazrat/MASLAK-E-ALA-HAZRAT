import type { Metadata } from "next";
import Link from "next/link";
import HadithBrowserClient from "@/components/HadithBrowserClient";
import "./hadith.css";

export const metadata: Metadata = {
  title: "Al-Hadith Gateway — Authentic Prophetic Traditions & Canonical Books",
  description:
    "Explore Sahih al-Bukhari, Sahih Muslim, Jami` at-Tirmidhi, and 40 Hadith an-Nawawi structured by Books (Kutub) and Chapters with Arabic, Urdu, and English.",
  alternates: {
    canonical: "/hadith",
  },
};

export default function HadithPage() {
  return (
    <main className="hadithPage">
      <section className="hadithHero">
        <Link href="/" className="hadithHomeButton">
          <span aria-hidden="true">←</span> Home
        </Link>

        <div className="hadithHeroArabic" dir="rtl" lang="ar">
          الحديث النبوي الشريف — كتب وسنن
        </div>

        <h1 className="hadithHeroTitle">Al-Hadith Gateway</h1>

        <p className="hadithHeroDescription">
          The words, actions, approvals, and sublime character of the
          Beloved Messenger of Allah, Prophet Muhammad ﷺ, categorized
          by authentic Canonical Collections and Books (Kutub).
        </p>

        <div className="hadithHeroBadges">
          <span>Sahih al-Bukhari</span>
          <span>Sahih Muslim</span>
          <span>Jami` at-Tirmidhi</span>
          <span>40 Hadith Nawawi</span>
          <span>Book &amp; Chapter Structure</span>
        </div>
      </section>

      <HadithBrowserClient />
    </main>
  );
}
