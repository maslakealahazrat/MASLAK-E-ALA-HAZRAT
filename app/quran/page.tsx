import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Qur’an Majeed",
  description: "Read the complete Qur’an Majeed with all 114 Surahs in original Arabic text.",
  alternates: { canonical: "/quran" },
};

export default async function QuranPage() {
  let surahs: Array<{
    number: number;
    name: string;
    arabicName: string;
    ayahCount: number;
  }> = [];

  if (supabase) {
    const { data } = await supabase
      .from("quran_surahs")
      .select("surah_number, name_english, name_arabic, ayah_count")
      .order("surah_number", { ascending: true });

    if (data) {
      surahs = data.map((surah) => ({
        number: surah.surah_number,
        name: surah.name_english,
        arabicName: surah.name_arabic,
        ayahCount: surah.ayah_count,
      }));
    }
  }

  return (
    <main className="quranPage">
      <section className="quranHero">
        <Link href="/" className="quranBack">← Home</Link>
        <div className="quranArabicTitle">القرآن الكريم</div>
        <div className="quranEyebrow">THE NOBLE QUR’AN</div>
        <h1>Qur’an Majeed</h1>
        <p>Qur’an ki tamam Surahs aur Ayat Arabic text mein padhiye.</p>
        <div className="quranHeroActions">
          <Link href="/quran/full" className="quranFullButton">Read Full Qur’an</Link>
        </div>
      </section>

      <section className="quranContent">
        <div className="quranIntro">
          <div className="quranIntroTop">
            <span>{surahs.length} SURAHS</span>
            <span>Qur’an Majeed</span>
          </div>
          <h2>All Surahs</h2>
          <p>Qur’an Majeed ki tamam 114 Surahs yahan se padhiye.</p>
        </div>

        <div className="surahGrid">
          {surahs.map((surah) => (
            <Link key={surah.number} href={`/quran/${surah.number}`} className="surahCard">
              <div className="surahNumber">{surah.number}</div>
              <div className="surahInfo">
                <strong>{surah.arabicName}</strong>
                <span>{surah.name} · {surah.ayahCount} Ayat</span>
              </div>
              <div className="surahOpen">→</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="quranSource">
        <p>Arabic Qur’an text sourced from the Tanzil Project.</p>
        <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">Tanzil Project</a>
      </section>
    </main>
  );
}
