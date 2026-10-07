import Link from "next/link";
import { quranAyahs } from "@/data/quran/ayahs";

export default function QuranPage() {
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
    <main className="quranPage">

      {/* HERO */}
      <section className="quranHero">

        <Link
          href="/"
          className="quranBack"
        >
          ← Home
        </Link>

        <div className="quranArabicTitle">
          القرآن الكريم
        </div>

        <div className="quranEyebrow">
          THE NOBLE QUR’AN
        </div>

        <h1>
          Qur’an Majeed
        </h1>

        <p>
          Qur’an ki tamam Surahs aur Ayat
          Arabic text mein padhiye.
        </p>

        <div className="quranHeroActions">

          <Link
            href="/quran/full"
            className="quranFullButton"
          >
            Read Full Qur’an
          </Link>

        </div>

      </section>


      {/* SURAH LIST */}
      <section className="quranContent">

        <div className="quranIntro">

          <div className="quranIntroTop">
            <span>
              114 SURahs
            </span>

            <span>
              Tanzil Arabic Text
            </span>
          </div>

          <h2>
            All Surahs
          </h2>

          <p>
            Qur’an Majeed ki tamam 114
            Surahs yahan se padhiye.
          </p>

        </div>


        <div className="surahGrid">

          {surahs.map((surah) => (

            <Link
              key={surah.number}
              href={"/quran/" + surah.number}
              className="surahCard"
            >

              <div className="surahNumber">
                {surah.number}
              </div>


              <div className="surahInfo">

                <strong>
                  {surah.name}
                </strong>

                <span>
                  Surah {surah.number}
                </span>

              </div>


              <div className="surahArabic">
                {surah.arabicName}
              </div>


              <div className="surahOpen">
                →
              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* SOURCE */}
      <section className="quranSource">

        <p>
          Arabic Qur’an text sourced from
          the Tanzil Project.
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
