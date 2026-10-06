"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { quranAyahs } from "@/data/quran/ayahs";

function findExactAyah(query: string) {
  const cleaned = query
    .trim()
    .toLowerCase()
    .replace(/^surah\s+/i, "")
    .replace(/\s+/g, "");

  const match = cleaned.match(/^(\d{1,3})[:/](\d{1,3})$/);

  if (!match) {
    return null;
  }

  const surahNumber = Number(match[1]);
  const ayahNumber = Number(match[2]);

  return (
    quranAyahs.find(
      (ayah) =>
        ayah.surahNumber === surahNumber &&
        ayah.ayahNumber === ayahNumber
    ) || null
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const exactAyah = query
    ? findExactAyah(query)
    : null;

  const normalizedQuery = query.toLowerCase();

  const quranResults =
    query && !exactAyah
      ? quranAyahs
          .filter((ayah) => {
            const arabic =
              ayah.arabic.toLowerCase();

            const surahName =
              ayah.surahName.toLowerCase();

            const surahArabic =
              ayah.surahNameArabic.toLowerCase();

            return (
              arabic.includes(normalizedQuery) ||
              surahName.includes(normalizedQuery) ||
              surahArabic.includes(normalizedQuery) ||
              String(ayah.surahNumber) ===
                normalizedQuery ||
              String(ayah.ayahNumber) ===
                normalizedQuery
            );
          })
          .slice(0, 50)
      : [];

  return (
    <main className="searchPage">

      {/* HERO */}
      <section className="searchHero">

        <Link href="/" className="quranBack">
          ← Home
        </Link>

        <div className="searchHeroArabic">
          البحث
        </div>

        <div className="searchHeroEyebrow">
          ISLAMIC KNOWLEDGE SEARCH
        </div>

        <h1>Search</h1>

        <p>
          Qur’an aur Islamic knowledge mein
          search karein.
        </p>

      </section>


      {/* RESULTS */}
      <section className="searchResults">

        {/* SEARCH HEADING */}
        {query && (
          <div className="searchResultHeading">

            <span>SEARCH RESULTS</span>

            <h2>
              Results for “{query}”
            </h2>

          </div>
        )}


        {/* EMPTY SEARCH */}
        {!query && (
          <div className="searchEmpty">

            <div className="searchEmptyIcon">
              ﷽
            </div>

            <div className="searchEmptyLabel">
              ISLAMIC KNOWLEDGE
            </div>

            <h2>
              Search Islamic Knowledge
            </h2>

            <p>
              Home page ke search box mein
              Qur’an ya Islamic knowledge
              search karein.
            </p>

            <Link
              href="/"
              className="searchEmptyButton"
            >
              ← Back to Home
            </Link>

          </div>
        )}


        {/* EXACT AYAH */}
        {query && exactAyah && (
          <div className="searchSection">

            <div className="searchSectionTitle">

              <span>QUR’AN</span>

              <h2>
                Exact Ayah
              </h2>

            </div>

            <Link
              href={
                "/quran/" +
                exactAyah.surahNumber +
                "#ayah-" +
                exactAyah.ayahNumber
              }
              className="searchResultCard exactResult"
            >

              <div className="searchResultTop">

                <span className="searchResultNumber">
                  {exactAyah.ayahNumber}
                </span>

                <span className="searchResultSurah">
                  {exactAyah.surahName}
                </span>

                <span className="searchResultArrow">
                  →
                </span>

              </div>

              <div className="searchResultArabic">
                {exactAyah.arabic}
              </div>

            </Link>

          </div>
        )}


        {/* NORMAL QURAN RESULTS */}
        {query &&
          !exactAyah &&
          quranResults.length > 0 && (
            <div className="searchSection">

              <div className="searchSectionTitle">

                <span>QUR’AN</span>

                <h2>
                  Qur’an Results
                </h2>

              </div>

              <div className="searchResultList">

                {quranResults.map((ayah) => (

                  <Link
                    key={ayah.id}
                    href={
                      "/quran/" +
                      ayah.surahNumber +
                      "#ayah-" +
                      ayah.ayahNumber
                    }
                    className="searchResultCard"
                  >

                    <div className="searchResultTop">

                      <span className="searchResultNumber">
                        {ayah.ayahNumber}
                      </span>

                      <span className="searchResultSurah">
                        {ayah.surahName}
                      </span>

                      <span className="searchResultArrow">
                        →
                      </span>

                    </div>

                    <div className="searchResultArabic">
                      {ayah.arabic}
                    </div>

                  </Link>

                ))}

              </div>

            </div>
          )}


        {/* NO RESULTS */}
        {query &&
          !exactAyah &&
          quranResults.length === 0 && (

            <div className="searchEmpty noResults">

              <div className="searchEmptyIcon">
                🔎
              </div>

              <div className="searchEmptyLabel">
                SEARCH
              </div>

              <h2>
                No Results Found
              </h2>

              <p>
                “{query}” ke liye abhi koi
                Qur’an result nahi mila.
              </p>

              <div className="noResultsHint">
                <span>Try searching for</span>

                <strong>
                  Fatiha
                </strong>

                <strong>
                  Al-Baqarah
                </strong>

                <strong>
                  1:2
                </strong>
              </div>

              <Link
                href="/"
                className="searchEmptyButton"
              >
                ← Search Again
              </Link>

            </div>
          )}

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

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  );
}
