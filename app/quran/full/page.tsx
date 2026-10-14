"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quranAyahs } from "@/data/quran/ayahs";

const PROGRESS_KEY = "maslak-quran-progress";

type Progress = {
  surahNumber: number;
  ayahNumber: number;
};

export default function FullQuranPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [message, setMessage] = useState("");
  const [quranSearch, setQuranSearch] = useState("");

  const normalizedSearch = quranSearch.trim().toLowerCase();

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

  const searchResults = normalizedSearch
    ? quranAyahs
        .filter((ayah) => {
          const reference =
            `${ayah.surahNumber}:${ayah.ayahNumber}`;

          return (
            ayah.arabic.includes(quranSearch.trim()) ||
            ayah.surahName.toLowerCase().includes(normalizedSearch) ||
            ayah.surahNameArabic.includes(quranSearch.trim()) ||
            reference === normalizedSearch
          );
        })
        .slice(0, 10)
    : [];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);

      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch {
      setProgress(null);
    }
  }, []);

  const saveProgress = (
    surahNumber: number,
    ayahNumber: number
  ) => {
    const nextProgress = { surahNumber, ayahNumber };

    setProgress(nextProgress);

    try {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(nextProgress)
      );

      localStorage.setItem(
        "maslak-reading-progress",
        JSON.stringify({
          type: "quran",
          title: "Qur’an Majeed",
          subtitle: `Surah ${surahNumber} · Ayah ${ayahNumber}`,
          url: `/quran/full#ayah-${surahNumber}-${ayahNumber}`,
        })
      );
    } catch {
      // Ignore local storage errors.
    }
  };

  const shareSurah = async (
    surahName: string,
    surahNumber: number
  ) => {
    const url =
      `${window.location.origin}/quran/full#surah-${surahNumber}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: surahName,
          text: "Read Qur’an Majeed on Maslak-e-Ala Hazrat",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Surah link copied");

        window.setTimeout(() => setMessage(""), 1800);
      }
    } catch {
      // Sharing was cancelled.
    }
  };

  const jumpToAyah = (
    surahNumber: number,
    ayahNumber: number
  ) => {
    const element = document.getElementById(
      `ayah-${surahNumber}-${ayahNumber}`
    );

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    saveProgress(surahNumber, ayahNumber);
    setQuranSearch("");
  };

  return (
    <main className="fullQuranPage fullQuranMushaf">
      <section className="fullQuranHero">
        <Link href="/quran" className="quranBack">
          ← All Surahs
        </Link>

        <div className="fullQuranArabicTitle" lang="ar" dir="rtl">
          القرآن الكريم
        </div>

        <div className="fullQuranEyebrow">
          THE NOBLE QUR’AN
        </div>

        <h1>الْمُصْحَفُ الشَّرِيف</h1>

        <p>Qur’an Majeed — Arabic text only</p>

        {progress && (
          <Link
            className="fullQuranContinue"
            href={`/quran/full#ayah-${progress.surahNumber}-${progress.ayahNumber}`}
          >
            Continue Reading · Surah {progress.surahNumber}, Ayah{" "}
            {progress.ayahNumber}
          </Link>
        )}
      </section>

      <div className="fullQuranFixedSearch">
        <div className="fullQuranSearchBox">
          <span className="fullQuranSearchIcon" aria-hidden="true">
            🔎
          </span>

          <input
            type="search"
            value={quranSearch}
            onChange={(event) => setQuranSearch(event.target.value)}
            placeholder="Search Surah, Arabic ayat or 1:1..."
            aria-label="Search Qur’an"
          />

          {quranSearch && (
            <button
              type="button"
              className="fullQuranSearchClear"
              onClick={() => setQuranSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="fullQuranSearchResults">
            {searchResults.map((ayah) => (
              <button
                key={ayah.id}
                type="button"
                className="fullQuranSearchResult"
                onClick={() =>
                  jumpToAyah(ayah.surahNumber, ayah.ayahNumber)
                }
              >
                <div className="fullQuranSearchResultTop">
                  <strong>{ayah.surahNameArabic}</strong>
                  <span>
                    {ayah.surahNumber}:{ayah.ayahNumber}
                  </span>
                </div>

                <p dir="rtl" lang="ar">{ayah.arabic}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {message && (
        <div className="quranToast" role="status">
          {message}
        </div>
      )}

      <section className="fullQuranContent">
        {surahs.map((surah) => {
          const ayahs = quranAyahs.filter(
            (ayah) => ayah.surahNumber === surah.number
          );

          return (
            <section
              key={surah.number}
              id={`surah-${surah.number}`}
              className="fullQuranSurah"
            >
              <header className="fullQuranSurahHeader">
                <div className="fullQuranSurahHeading">
                  <div
                    className="fullQuranSurahArabic"
                    lang="ar"
                    dir="rtl"
                  >
                    {surah.arabicName}
                  </div>

                  <h2>{surah.arabicName}</h2>

                  <span>
                    سورة {surah.number} · {ayahs.length} آيات
                  </span>
                </div>

                <button
                  type="button"
                  className="fullQuranSurahShare"
                  aria-label={`Share ${surah.arabicName}`}
                  onClick={() =>
                    shareSurah(surah.arabicName, surah.number)
                  }
                >
                  ↗
                </button>
              </header>

              {surah.number !== 1 && surah.number !== 9 && (
                <div className="fullQuranBismillah" dir="rtl" lang="ar">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              )}

              <div className="fullQuranMushafFrame">
                <div
                  className="fullQuranAyahs"
                  dir="rtl"
                  lang="ar"
                >
                  {ayahs.map((ayah) => {
                    const isCurrent =
                      progress?.surahNumber === ayah.surahNumber &&
                      progress?.ayahNumber === ayah.ayahNumber;

                    return (
                      <span
                        key={ayah.id}
                        id={`ayah-${ayah.surahNumber}-${ayah.ayahNumber}`}
                        className={
                          "fullQuranAyah" +
                          (isCurrent ? " currentReadingAyah" : "")
                        }
                        onClick={() =>
                          saveProgress(
                            ayah.surahNumber,
                            ayah.ayahNumber
                          )
                        }
                      >
                        <span className="fullQuranAyahText">
                          {ayah.arabic}
                        </span>{" "}

                        <span
                          className="fullQuranAyahMarker"
                          aria-label={`Ayah ${ayah.ayahNumber}`}
                        >
                          ۝{ayah.ayahNumber}
                        </span>{" "}
                      </span>
                    );
                  })}
                </div>
              </div>

              <footer className="fullQuranSurahFooter">
                <span>
                  {surah.arabicName} · {ayahs.length} آيات
                </span>

                <button
                  type="button"
                  onClick={() =>
                    shareSurah(surah.arabicName, surah.number)
                  }
                  aria-label={`Share ${surah.arabicName}`}
                >
                  Share ↗
                </button>
              </footer>
            </section>
          );
        })}
      </section>

      <section className="quranSource">
        <p>Arabic Qur’an text sourced from the Tanzil Project.</p>

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
