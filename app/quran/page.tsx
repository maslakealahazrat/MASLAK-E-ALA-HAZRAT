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

      {/* HEADER */}
      <section className="quranHero">

        <Link href="/" className="quranBack">
          ← Home
        </Link>

        <div className="quranArabicTitle">
          القرآن الكريم
        </div>

        <h1>Qur’an</h1>

        <p>
          The Noble Qur’an
        </p>

      </section>


      {/* SURAH LIST */}
      <section className="quranContent">

        <div className="quranIntro">
          <span>THE NOBLE QUR’AN</span>

          <h2>
            Qur’an Majeed
          </h2>

          <p>
            Qur’an ki tamam Surahs aur Ayat Arabic text mein.
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

            </Link>

          ))}

        </div>

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
