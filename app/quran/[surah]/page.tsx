import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const revalidate = 86400; // 24 hours caching

type PageProps = {
  params: Promise<{ surah: string }>;
};

type AyahRow = {
  surah_number: number;
  ayah_number: number;
  arabic_text: string;
};

type SurahInfo = {
  surah_number: number;
  name_english: string;
  name_arabic: string;
  ayah_count: number;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { surah } = await params;
  const number = Number(surah);

  if (!Number.isInteger(number) || number < 1 || number > 114) {
    return {
      title: "Surah Not Found",
      robots: { index: false, follow: false },
    };
  }

  let surahName = `Surah ${number}`;
  let surahArabic = `سورة ${number}`;

  if (supabase) {
    const { data } = await supabase
      .from("quran_surahs")
      .select("name_english, name_arabic")
      .eq("surah_number", number)
      .single();

    if (data) {
      surahName = data.name_english;
      surahArabic = data.name_arabic;
    }
  }

  return {
    title: `${surahArabic} (${surahName}) | Qur’an Majeed`,
    description: `Read ${surahArabic} (${surahName}) in original Arabic text.`,
    alternates: {
      canonical: `/quran/${number}`,
    },
    openGraph: {
      type: "website",
      title: `${surahArabic} | Qur’an Majeed`,
      description: `Read ${surahArabic} in original Arabic text.`,
      url: `/quran/${number}`,
      siteName: "Maslak-e-Ala Hazrat",
    },
  };
}

export default async function SurahPage({ params }: PageProps) {
  const { surah } = await params;
  const surahNumber = Number(surah);

  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  if (!supabase) {
    notFound();
  }

  // Fetch Surah Details and Ayahs concurrently from Supabase
  const [surahRes, ayahsRes] = await Promise.all([
    supabase
      .from("quran_surahs")
      .select("surah_number, name_english, name_arabic, ayah_count")
      .eq("surah_number", surahNumber)
      .single(),
    supabase
      .from("quran_ayahs")
      .select("surah_number, ayah_number, arabic_text")
      .eq("surah_number", surahNumber)
      .order("ayah_number", { ascending: true }),
  ]);

  const surahInfo = surahRes.data as SurahInfo | null;
  const ayahs = (ayahsRes.data as AyahRow[]) || [];

  if (!surahInfo || ayahs.length === 0) {
    notFound();
  }

  const previousSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  return (
    <main className="quranSurahPage">
      <section className="quranSurahHero">
        <Link href="/quran" className="quranBack">
          ← All Surahs
        </Link>

        <div className="quranSurahArabic" dir="rtl" lang="ar">
          {surahInfo.name_arabic}
        </div>

        <h1>{surahInfo.name_english}</h1>

        <p>Surah {surahInfo.surah_number} • {surahInfo.ayah_count} Ayahs</p>
      </section>

      <nav className="quranSurahNavigation" aria-label="Surah navigation">
        <div className="quranSurahNavSide">
          {previousSurah ? (
            <Link href={`/quran/${previousSurah}`} className="quranSurahNavButton">
              ← Previous
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">← Previous</span>
          )}
        </div>

        <div className="quranSurahNavCenter">
          <Link href="/quran" className="quranSurahListButton">
            Surah List
          </Link>
        </div>

        <div className="quranSurahNavSide quranSurahNavRight">
          {nextSurah ? (
            <Link href={`/quran/${nextSurah}`} className="quranSurahNavButton">
              Next →
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">Next →</span>
          )}
        </div>
      </nav>

      <section className="ayahPageContent">
        {ayahs.map((ayah) => (
          <article
            key={ayah.ayah_number}
            id={`ayah-${ayah.ayah_number}`}
            className="quranAyahCard"
          >
            <div className="quranAyahCardNumber">
              آية {ayah.ayah_number}
            </div>

            <div className="quranInlineArabic" dir="rtl" lang="ar">
              {ayah.arabic_text}{" "}
              <span className="quranInlineNumber">
                ﴿{ayah.ayah_number}﴾
              </span>
            </div>
          </article>
        ))}
      </section>

      <nav className="quranSurahNavigation quranSurahNavigationBottom" aria-label="Surah navigation">
        <div className="quranSurahNavSide">
          {previousSurah ? (
            <Link href={`/quran/${previousSurah}`} className="quranSurahNavButton">
              ← Previous
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">← Previous</span>
          )}
        </div>

        <div className="quranSurahNavCenter">
          <Link href="/quran" className="quranSurahListButton">
            Surah List
          </Link>
        </div>

        <div className="quranSurahNavSide quranSurahNavRight">
          {nextSurah ? (
            <Link href={`/quran/${nextSurah}`} className="quranSurahNavButton">
              Next →
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">Next →</span>
          )}
        </div>
      </nav>

      <section className="quranSource">
        <p>Arabic Qur’an text sourced from the Tanzil Project.</p>
        <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">
          Tanzil Project
        </a>
      </section>
    </main>
  );
}
