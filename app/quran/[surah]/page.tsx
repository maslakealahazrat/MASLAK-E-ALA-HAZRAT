import Link from "next/link";
import { notFound } from "next/navigation";
import { quranAyahs } from "@/data/quran/ayahs";

type PageProps = {
  params: Promise<{
    surah: string;
  }>;
};

export default async function SurahPage({ params }: PageProps) {
  const { surah } = await params;

  const surahNumber = Number(surah);

  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  const ayahs = quranAyahs.filter(
    (ayah) => ayah.surahNumber === surahNumber
  );

  if (ayahs.length === 0) {
    notFound();
  }

  const firstAyah = ayahs[0];

  return (
    <main className="quranSurahPage">

      {/* HEADER */}

      <section className="quranSurahHero">

        <Link href="/quran" className="quranBack">
          ← All Surahs
        </Link>

        <div className="quranSurahArabic">
          {firstAyah.surahNameArabic}
        </div>

        <h1>{firstAyah.name}</h1>

        <p>
          Surah {surahNumber}
        </p>

      </section>


      {/* AYAT */}

      <section className="ayahPageContent">

        {ayahs.map((ayah) => (

          <article
            key={ayah.id}
            id={"ayah-" + ayah.ayahNumber}
            className="quranAyah"
          >

            <div className="quranAyahTop">

              <span className="quranAyahNumber">
                {ayah.ayahNumber}
              </span>

              <a
                href={"#ayah-" + ayah.ayahNumber}
                className="quranAyahLink"
                aria-label={"Ayah " + ayah.ayahNumber + " link"}
              >
                #
              </a>

            </div>


            <div className="quranAyahArabic">
              {ayah.arabic}
            </div>

          </article>

        ))}

      </section>


      {/* SOURCE */}

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
