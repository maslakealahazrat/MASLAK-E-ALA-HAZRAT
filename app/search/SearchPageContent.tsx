"use client";
 
import Link from "next/link";
import { quranAyahs } from "@/data/quran/ayahs";
import { searchSiteContent } from "@/data/site/search-utils";
import { siteSearchIndex } from "@/data/site/search-index";

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

type SearchPageContentProps = {
  query: string;
};

export default function SearchPageContent({
  query,
}: SearchPageContentProps) {
  const trimmedQuery = query.trim();

  const exactAyah = trimmedQuery
  ? findExactAyah(trimmedQuery)
  : null;

const siteResults =
  trimmedQuery
    ? searchSiteContent(
        siteSearchIndex,
        trimmedQuery
      )
    : [];
 
const normalizedQuery =
  trimmedQuery.toLowerCase();

const quranResults =
  trimmedQuery && !exactAyah
  
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

      <section className="searchResults">

        {query && (
          <div className="searchResultHeading">

            <span>SEARCH RESULTS</span>

            <h2>
              Results for “{query}”
            </h2>

          </div>
        )}

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

{query &&
  !exactAyah &&
  siteResults.length > 0 && (
    <div className="searchSection">

      <div className="searchSectionTitle">

        <span>ISLAMIC KNOWLEDGE</span>

        <h2>
          Website Results
        </h2>

      </div>

      <div className="searchResultList">

        {siteResults.map((item) => (

          <Link
            key={item.id}
            href={item.href}
            className="searchResultCard"
          >

            <div className="searchResultTop">

              <span className="searchResultNumber">
                •
              </span>

              <span className="searchResultSurah">
                {item.title}
              </span>

              <span className="searchResultArrow">
                →
              </span>

            </div>

            {item.description && (
              <div className="searchResultArabic">
                {item.description}
              </div>
            )}

          </Link>

        ))}

      </div>

    </div>
  )}
       
        {query &&
  !exactAyah &&
  quranResults.length === 0 &&
  siteResults.length === 0 && (

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
        Qur’an ya Islamic knowledge
        result nahi mila.
      </p>

      <div className="noResultsHint">

        <span>
          Try searching for
        </span>

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
