"use client";

import Link from "next/link";
import { quranAyahs } from "@/data/quran/ayahs";

export default function FullQuranPage() {
  const surahs = Array.from(
    new Map(
      quranAyahs.map((ayah) => [
        ayah.surahNumber,
        {
          number: ayah.surahNumber,
          name: ayah.surahName,
          arabicName: ayah.surahNameArabic,
        },
      ])
    ).values()
  );

  return (
    <main className="fullQuranPage">

      {/* HEADER */}

      <section className="fullQuranHero">

        <Link href="/quran" className="quranBack">
          ← All Surahs
        </Link>

        <div className="fullQuranArabicTitle">
          القرآن الكريم
        </div>

        <div className="fullQuranEyebrow">
          THE NOBLE QUR’AN
        </div>

        <h1>Read Full Qur’an</h1>

        <p>
          Poora Qur’an ek hi jagah par padhiye.
        </p>

      </section>


      {/* CONTINUE READING */}

      <section className="continueReadingBox">

        <div className="continueReadingIcon">
          📖
        </div>

        <div>
          <span>
            CONTINUE READING
          </span>

          <h2>
            Your reading progress
          </h2>

          <p>
            Aapki last reading position yahan automatically save hogi.
          </p>
        </div>

      </section>


      {/* FULL QURAN */}

      <section className="fullQuranContent">

        {surahs.map((surah) => {

          const ayahs = quranAyahs.filter(
            (ayah) =>
              ayah.surahNumber === surah.number
          );

          return (
            <section
              key={surah.number}
              className="fullQuranSurah"
            >

              {/* SURAH HEADER */}

              <header className="fullQuranSurahHeader">

                <div className="fullQuranSurahArabic">
                  {surah.arabicName}
                </div>

                <h2>
                  {surah.name}
                </h2>

                <span>
                  Surah {surah.number}
                </span>

              </header>


              {/* AYAT */}

              <div className="fullQuranAyahs">

                {ayahs.map((ayah) => (

                  <article
                    key={ayah.id}
                    id={
                      "ayah-" +
                      ayah.surahNumber +
                      "-" +
                      ayah.ayahNumber
                    }
                    className="fullQuranAyah"
                  >

                    <div className="fullQuranAyahNumber">
                      {ayah.ayahNumber}
                    </div>

                    <div className="fullQuranAyahArabic">
                      {ayah.arabic}
                    </div>

                  </article>

                ))}

              </div>

            </section>
          );

        })}

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
