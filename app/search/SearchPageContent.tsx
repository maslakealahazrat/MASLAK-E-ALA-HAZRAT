"use client";

import Link from "next/link";
import { useMemo } from "react";

import { quranAyahs } from "@/data/quran/ayahs";
import { searchIndex } from "@/data/search";
import { searchContent } from "@/data/search/engine";

type SearchPageContentProps = {
  query: string;
};

function findExactAyah(query: string) {
  const cleaned = query
    .trim()
    .toLowerCase()
    .replace(/^surah\s+/i, "")
    .replace(/\s+/g, "");

  const match = cleaned.match(
    /^(\d{1,3})[:/](\d{1,3})$/
  );

  if (!match) {
    return null;
  }

  const surahNumber = Number(match[1]);
  const ayahNumber = Number(match[2]);

  return (
    quranAyahs.find(
      (ayah) =>
        ayah.surahNumber ===
          surahNumber &&
        ayah.ayahNumber ===
          ayahNumber
    ) || null
  );
}

export default function SearchPageContent({
  query,
}: SearchPageContentProps) {
  const trimmedQuery = query.trim();

  const exactAyah = trimmedQuery
    ? findExactAyah(trimmedQuery)
    : null;

    const searchResults = useMemo(() => {
    if (!trimmedQuery) return [];

    const results = searchContent(searchIndex, trimmedQuery);

    const uniqueResults = [];
    const seen = new Set<string>();

    for (const result of results) {
      const item = result.document;

      // Ek Surah ki kai ayaton ko ek hi search result rakho.
      const key =
        item.type === "quran"
          ? `quran-surah:${item.surahNumber ?? item.title}`
          : `${item.type}:${item.href
              .split("#")[0]
              .split("?")[0]
              .replace(/\/+$/, "")}`;

      if (seen.has(key)) continue;

      seen.add(key);
      uniqueResults.push(result);
    }

    return uniqueResults;
  }, [trimmedQuery]);

  const exactResults =
    searchResults.filter(
      (result) =>
        result.matchType === "exact"
    );

  const strongResults =
    searchResults.filter(
      (result) =>
        result.matchType === "strong"
    );

  const similarResults =
    searchResults.filter(
      (result) =>
        result.matchType === "similar"
    );

  const showNoResults =
    Boolean(trimmedQuery) &&
    !exactAyah &&
    searchResults.length === 0;

  return (
    <main className="searchPage">

      {/* HERO */}

      <section className="searchHero">

        <Link
          href="/"
          className="quranBack"
        >
          ← Home
        </Link>

        <div className="searchHeroArabic">
          البحث
        </div>

        <div className="searchHeroEyebrow">
          ISLAMIC KNOWLEDGE SEARCH
        </div>

        <h1>
          Search
        </h1>

        <p>
          Qur’an aur Islamic knowledge
          mein search karein.
        </p>

      </section>

      {/* RESULTS */}

      <section className="searchResults">

        {!trimmedQuery ? (
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
        ) : (
          <>
            <div className="searchResultHeading">

              <span>
                SEARCH RESULTS
              </span>

              <h2>
                Results for “{query}”
              </h2>

            </div>

            {/* EXACT REFERENCE */}

            {exactAyah ? (
              <div className="searchSection">

                <div className="searchSectionTitle">

                  <span>
                    QUR’AN
                  </span>

                  <h2>
                    Exact Ayah
                  </h2>

                </div>

                <Link
                  href={
                    `/quran/${exactAyah.surahNumber}` +
                    `#ayah-${exactAyah.ayahNumber}`
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
            ) : null}

            {/* EXACT CONTENT */}

            {!exactAyah &&
            exactResults.length > 0 ? (
              <SearchResultSection
                title="Exact Matches"
                label="EXACT"
                results={exactResults}
              />
            ) : null}

            {/* STRONG CONTENT */}

            {strongResults.length > 0 ? (
              <SearchResultSection
                title="Strong Matches"
                label="MATCHING CONTENT"
                results={strongResults}
              />
            ) : null}

            {/* SIMILAR CONTENT */}

            {similarResults.length > 0 ? (
              <SearchResultSection
                title="Similar Matches"
                label="SIMILAR"
                results={similarResults}
              />
            ) : null}

            {/* NO RESULTS */}

            {showNoResults ? (
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
                  “{query}” ke liye abhi
                  koi result nahi mila.
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
            ) : null}
          </>
        )}

      </section>

    </main>
  );
}

function SearchResultSection({
  title,
  label,
  results,
}: {
  title: string;
  label: string;
  results: ReturnType<
    typeof searchContent
  >;
}) {
  return (
    <div className="searchSection">

      <div className="searchSectionTitle">

        <span>
          {label}
        </span>

        <h2>
          {title}
        </h2>

      </div>

      <div className="searchResultList">

        {results.map((result) => {
          const item =
            result.document;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="searchResultCard"
            >

              <div className="searchResultTop">

                <span className="searchResultNumber">
                  {getTypeLabel(item.type)}
                </span>

                <span className="searchResultSurah">
                  {item.title}
                </span>

                <span className="searchResultArrow">
                  →
                </span>

              </div>

              <div className="searchResultArabic">
                {getPreview(item)}
              </div>

            </Link>
          );
        })}

      </div>
    </div>
  );
}

function getTypeLabel(
  type: string
): string {
  switch (type) {
    case "quran":
      return "QUR’AN";

    case "ilm-ka-safar":
      return "ILM";

    case "hadith":
      return "HADITH";

    case "naat":
      return "NAAT";

    case "manqabat":
      return "MANQABAT";

    case "kanz-ul-iman":
      return "KANZ";

    case "fatawa":
      return "FATAWA";

    case "book":
      return "BOOK";

    default:
      return "ISLAMIC";
  }
}

function getPreview(
  item: {
    arabic?: string;
    urdu?: string;
    hindi?: string;
    english?: string;
    text: string;
  }
): string {
  return (
    item.arabic ||
    item.urdu ||
    item.hindi ||
    item.english ||
    item.text
  );
}
