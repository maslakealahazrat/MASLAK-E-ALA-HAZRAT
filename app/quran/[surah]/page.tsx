import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quranAyahs } from "@/data/quran/ayahs";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{ surah: string }>;
};

type AyahRow = {
  surah_number: number;
  ayah_number: number;
  arabic_text: string;
};

type TranslationRow = {
  surah_number: number;
  ayah_number: number;
  edition_id: string;
  translation_text: string;
};

type EditionRow = {
  id: string;
  edition_slug: string;
  language_code: string;
  title: string;
  is_enabled: boolean;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { surah } = await params;
  const number = Number(surah);

  const firstAyah = quranAyahs.find(
    (ayah) => ayah.surahNumber === number
  );

  if (
    !Number.isInteger(number) ||
    number < 1 ||
    number > 114 ||
    !firstAyah
  ) {
    return {
      title: "Surah Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Surah ${firstAyah.surahName}`,
    description:
      `Read Surah ${firstAyah.surahName} with Arabic text and translations.`,
    alternates: {
      canonical: `/quran/${number}`,
    },
    openGraph: {
      type: "website",
      title: `Surah ${firstAyah.surahName} | Qur’an Majeed`,
      description:
        `Read Surah ${firstAyah.surahName} in Qur’an Majeed.`,
      url: `/quran/${number}`,
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

  const localAyahs = quranAyahs.filter(
    (ayah) => ayah.surahNumber === surahNumber
  );

  if (!localAyahs.length) {
    notFound();
  }

  let ayahs: AyahRow[] = localAyahs.map((ayah) => ({
    surah_number: ayah.surahNumber,
    ayah_number: ayah.ayahNumber,
    arabic_text: ayah.arabic,
  }));

  let urduTranslations = new Map<number, string>();
  let englishTranslations = new Map<number, string>();

  let databaseConnected = false;

  if (supabase) {
    try {
      const { data: arabicData, error: arabicError } =
        await supabase
          .from("quran_ayahs")
          .select("surah_number, ayah_number, arabic_text")
          .eq("surah_number", surahNumber)
          .order("ayah_number", { ascending: true });

      if (
        !arabicError &&
        arabicData &&
        arabicData.length > 0
      ) {
        ayahs = arabicData as AyahRow[];
        databaseConnected = true;

        const { data: editionData, error: editionError } =
          await supabase
            .from("quran_translation_editions")
            .select(
              "id, edition_slug, language_code, title, is_enabled"
            )
            .eq("is_enabled", true);

        if (!editionError && editionData?.length) {
          const editions = editionData as EditionRow[];

          const urduEdition = editions.find(
            (edition) =>
              edition.edition_slug === "ur-kanzul-iman"
          );

          const englishEdition = editions.find(
            (edition) =>
              edition.edition_slug === "en-ahmed-raza"
          );

          const editionIds = [
            urduEdition?.id,
            englishEdition?.id,
          ].filter((id): id is string => Boolean(id));

          if (editionIds.length) {
            const { data: translationData, error: translationError } =
              await supabase
                .from("quran_translations")
                .select(
                  "surah_number, ayah_number, edition_id, translation_text"
                )
                .eq("surah_number", surahNumber)
                .in("edition_id", editionIds)
                .order("ayah_number", { ascending: true });

            if (!translationError && translationData) {
              const translations =
                translationData as TranslationRow[];

              for (const translation of translations) {
                if (urduEdition?.id === translation.edition_id) {
                  urduTranslations.set(
                    translation.ayah_number,
                    translation.translation_text
                  );
                }

                if (
                  englishEdition?.id === translation.edition_id
                ) {
                  englishTranslations.set(
                    translation.ayah_number,
                    translation.translation_text
                  );
                }
              }
            }
          }
        }
      }
    } catch {
      // Database unavailable: local Arabic data will be used.
    }
  }

  const firstAyah = localAyahs[0];

  const previousSurah =
    surahNumber > 1 ? surahNumber - 1 : null;

  const nextSurah =
    surahNumber < 114 ? surahNumber + 1 : null;

  return (
    <main className="quranSurahPage">
      <section className="quranSurahHero">
        <Link href="/quran" className="quranBack">
          ← All Surahs
        </Link>

        <div className="quranSurahArabic">
          {firstAyah.surahNameArabic}
        </div>

        <h1>{firstAyah.surahName}</h1>

        <p>Surah {surahNumber}</p>

        <p>
          {databaseConnected
            ? "Arabic Quran with available translations"
            : "Arabic Quran"}
        </p>
      </section>

      <nav
        className="quranSurahNavigation"
        aria-label="Surah navigation"
      >
        <div className="quranSurahNavSide">
          {previousSurah ? (
            <Link
              href={`/quran/${previousSurah}`}
              className="quranSurahNavButton"
            >
              ← Previous
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">
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
              href={`/quran/${nextSurah}`}
              className="quranSurahNavButton"
            >
              Next →
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">
              Next →
            </span>
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
              Ayah {ayah.ayah_number}
            </div>

            <div
              className="quranInlineArabic"
              dir="rtl"
              lang="ar"
            >
              {ayah.arabic_text}
              {" "}
              <span className="quranInlineNumber">
                ﴿{ayah.ayah_number}﴾
              </span>
            </div>

            {urduTranslations.has(ayah.ayah_number) && (
              <p
                className="quranUrduTranslation"
                dir="rtl"
                lang="ur"
              >
                {urduTranslations.get(ayah.ayah_number)}
              </p>
            )}

            {englishTranslations.has(ayah.ayah_number) && (
              <p
                className="quranEnglishTranslation"
                dir="ltr"
                lang="en"
              >
                {englishTranslations.get(ayah.ayah_number)}
              </p>
            )}
          </article>
        ))}
      </section>

      <nav
        className="quranSurahNavigation quranSurahNavigationBottom"
        aria-label="Surah navigation"
      >
        <div className="quranSurahNavSide">
          {previousSurah ? (
            <Link
              href={`/quran/${previousSurah}`}
              className="quranSurahNavButton"
            >
              ← Previous
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">
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
              href={`/quran/${nextSurah}`}
              className="quranSurahNavButton"
            >
              Next →
            </Link>
          ) : (
            <span className="quranSurahNavButton disabled">
              Next →
            </span>
          )}
        </div>
      </nav>

      <section className="quranSource">
        <p>
          Arabic Qur’an text sourced from the Tanzil Project.
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