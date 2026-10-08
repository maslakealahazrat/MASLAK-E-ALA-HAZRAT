import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quranAyahs } from "@/data/quran/ayahs";

type PageProps = {
  params: Promise<{
    surah: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { surah } = await params;

  const surahNumber = Number(surah);

  const ayahs = quranAyahs.filter(
    (ayah) =>
      ayah.surahNumber === surahNumber
  );

  if (
    !Number.isInteger(surahNumber) ||
    surahNumber < 1 ||
    surahNumber > 114 ||
    ayahs.length === 0
  ) {
    return {
      title: "Surah Not Found",
      description:
        "The requested Qur’an Surah could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const firstAyah = ayahs[0];

  return {
    title: `Surah ${firstAyah.surahName}`,

    description:
      `Read Surah ${firstAyah.surahName} (${surahNumber}) in original Arabic Qur’an text sourced from the Tanzil Project.`,

    alternates: {
      canonical: `/quran/${surahNumber}`,
    },

    openGraph: {
      type: "website",
      title:
        `Surah ${firstAyah.surahName} | Qur’an Majeed`,
      description:
        `Read Surah ${firstAyah.surahName} (${surahNumber}) in original Arabic Qur’an text.`,
      url: `/quran/${surahNumber}`,
      siteName: "Maslak-e-Ala Hazrat",
    },
  };
}

export default async function SurahPage({
  params,
}: PageProps) {
  const { surah } = await params;

  const surahNumber = Number(surah);

  if (
    !Number.isInteger(surahNumber) ||
    surahNumber < 1 ||
    surahNumber > 114
  ) {
    notFound();
  }

  const ayahs = quranAyahs.filter(
    (ayah) =>
      ayah.surahNumber === surahNumber
  );

  if (ayahs.length === 0) {
    notFound();
  }

  const firstAyah = ayahs[0];

  const previousSurah =
    surahNumber > 1
      ? surahNumber - 1
      : null;

  const nextSurah =
    surahNumber < 114
      ? surahNumber + 1
      : null;

  return (
    <main className="quranSurahPage">

      {/* HERO */}

      <section className="quranSurahHero">

        <Link
          href="/quran"
          className="quranBack"
        >
          ← All Surahs
        </Link>

        <div className="quranSurahArabic">
          {firstAyah.surahNameArabic}
        </div>

        <h1>
          {firstAyah.surahName}
        </h1>

        <p>
          Surah {surahNumber}
        </p>

      </section>


      {/* SURAH NAVIGATION */}

      <nav
        className="quranSurahNavigation"
        aria-label="Surah navigation"
      >

        <div className="quranSurahNavSide">

          {previousSurah ? (
            <Link
              href={
                "/quran/" +
                previousSurah
              }
              className="quranSurahNavButton"
            >
              ← Previous
            </Link>
          ) : (
            <span
              className="quranSurahNavButton disabled"
            >
              ← Previous
            </span>
          )}

        </div>


        <div className="quranSurahNavCenter">

          <Link
            href="/quran"
            className="quranSurahListButton"
          >
            Surah List
          </Link>

        </div>


        <div className="quranSurahNavSide quranSurahNavRight">

          {nextSurah ? (
            <Link
              href={
                "/quran/" +
                nextSurah
              }
              className="quranSurahNavButton"
            >
              Next →
            </Link>
          ) : (
            <span
              className="quranSurahNavButton disabled"
            >
              Next →
            </span>
          )}

        </div>

      </nav>


      {/* TANZIL SOURCE */}

      <div className="quranSurahSource">

        <span>
          Qur’an text:
        </span>

        <a
          href="https://tanzil.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanzil Project
        </a>

      </div>


      {/* CONTINUOUS AYAT */}

      <section
        className="ayahPageContent"
        dir="rtl"
      >

        <div className="quranContinuousText">

          {ayahs.map((ayah) => (

            <span
              key={ayah.id}
              id={
                "ayah-" +
                ayah.ayahNumber
              }
              className="quranInlineAyah"
            >

              <span className="quranInlineArabic">
                {ayah.arabic}
              </span>

              <span
                className="quranInlineNumber"
                aria-label={
                  "Ayah " +
                  ayah.ayahNumber
                }
              >
                ‎﴿
                {ayah.ayahNumber}
                ﴾‏
              </span>

            </span>

          ))}

        </div>

      </section>


      {/* BOTTOM NAVIGATION */}

      <nav
        className="quranSurahNavigation quranSurahNavigationBottom"
        aria-label="Surah navigation"
      >

        <div className="quranSurahNavSide">

          {previousSurah ? (
            <Link
              href={
                "/quran/" +
                previousSurah
              }
              className="quranSurahNavButton"
            >
              ← Previous
            </Link>
          ) : (
            <span
              className="quranSurahNavButton disabled"
            >
              ← Previous
            </span>
          )}

        </div>


        <div className="quranSurahNavCenter">

          <Link
            href="/quran"
            className="quranSurahListButton"
          >
            Surah List
          </Link>

        </div>


        <div className="quranSurahNavSide quranSurahNavRight">

          {nextSurah ? (
            <Link
              href={
                "/quran/" +
                nextSurah
              }
              className="quranSurahNavButton"
            >
              Next →
            </Link>
          ) : (
            <span
              className="quranSurahNavButton disabled"
            >
              Next →
            </span>
          )}

        </div>

      </nav>


      {/* SOURCE */}

      <section className="quranSource">

        <p>
          Arabic Qur’an text sourced
          from the Tanzil Project.
        </p>

        <a
          href="https://tanzil.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanzil Project
        </a>

      </section>

    </main>
  );
}
