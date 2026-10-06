import Link from "next/link";
import { quranAyahs } from "@/data/quran/ayahs";

export default function QuranPage() {
  return (
    <main className="quranPage">

      {/* PAGE HEADER */}
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

      {/* QURAN CONTENT */}
      <section className="quranContent">

        <div className="surahHeader">
          <div>
            <span>Surah {quranAyahs[0].surahNumber}</span>
            <h2>{quranAyahs[0].surahName}</h2>
          </div>

          <div className="surahArabic">
            {quranAyahs[0].surahNameArabic}
          </div>
        </div>

        <div className="ayahList">

          {quranAyahs.map((ayah) => (
            <article
              key={ayah.id}
              className="ayahCard"
              id={`ayah-${ayah.id}`}
            >

              <div className="ayahNumber">
                {ayah.ayahNumber}
              </div>

              <div className="ayahText">
                {ayah.arabic}
              </div>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}
