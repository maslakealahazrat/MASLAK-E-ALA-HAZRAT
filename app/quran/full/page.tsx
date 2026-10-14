"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  const normalizedQuranSearch = quranSearch.trim().toLowerCase();

  const quranSearchResults = useMemo(
    () =>
      normalizedQuranSearch
        ? quranAyahs
            .filter((ayah) => {
              const arabic = ayah.arabic.toLowerCase();
              const surahName = ayah.surahName.toLowerCase();
              const reference = `${ayah.surahNumber}:${ayah.ayahNumber}`;

              return (
                arabic.includes(normalizedQuranSearch) ||
                surahName.includes(normalizedQuranSearch) ||
                reference === normalizedQuranSearch
              );
            })
            .slice(0, 10)
        : [],
    [normalizedQuranSearch]
  );

  const surahs = useMemo(
    () =>
      Array.from(
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
      ),
    []
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Progress;
        if (
          Number.isInteger(parsed?.surahNumber) &&
          Number.isInteger(parsed?.ayahNumber)
        ) {
          setProgress(parsed);
        }
      }
    } catch {
      setProgress(null);
    }
  }, []);

  const saveProgress = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      const newProgress = { surahNumber, ayahNumber };
      setProgress(newProgress);

      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
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
        // Ignore localStorage errors.
      }
    },
    []
  );

  const shareSurah = async (surahName: string, surahNumber: number) => {
    const url =
      window.location.origin + "/quran/full#surah-" + surahNumber;
    const text = "Read Surah " + surahName + " on Maslak-e-Ala Hazrat";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Surah " + surahName,
          text,
          url,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setMessage("Surah link copied");
        window.setTimeout(() => setMessage(""), 1800);
      } else {
        setMessage("Unable to share link on this browser");
        window.setTimeout(() => setMessage(""), 2200);
      }
    } catch {
      // Sharing was cancelled or clipboard access was denied.
    }
  };

  const handleAyahScroll = useCallback(() => {
    const ayahElements = document.querySelectorAll<HTMLElement>(".fullQuranAyah");
    if (!ayahElements.length) return;

    const viewportCenter = window.innerHeight / 2;
    let closestAyah: HTMLElement | null = null;
    let closestDistance = Infinity;

    ayahElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestAyah = element;
      }
    });

    if (!closestAyah) return;

    const id = (closestAyah as HTMLElement).id;
    const parts = id.split("-");
    if (parts.length !== 3) return;

    const surahNumber = Number(parts[1]);
    const ayahNumber = Number(parts[2]);

    if (!Number.isInteger(surahNumber) || !Number.isInteger(ayahNumber)) return;
    saveProgress(surahNumber, ayahNumber);
  }, [saveProgress]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        handleAyahScroll();
        timeout = null;
      }, 250);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [handleAyahScroll]);

  return (
    <main className="fullQuranPage">
      <section className="fullQuranHero">
        <Link href="/quran" className="quranBack">
          ← All Surahs
        </Link>

        <div className="fullQuranArabicTitle">القرآن الكريم</div>
        <div className="fullQuranEyebrow">THE NOBLE QUR’AN</div>

        <h1>Read Full Qur’an</h1>
        <p>Poora Qur’an ek hi jagah par padhiye.</p>
      </section>

      {/* Search stays fixed to the viewport bottom; result list opens above it. */}
      <div className="fullQuranFixedSearch">
        <div className="fullQuranSearchBox">
          <span className="fullQuranSearchIcon" aria-hidden="true">
            🔎
          </span>

          <input
            type="search"
            value={quranSearch}
            onChange={(event) => setQuranSearch(event.target.value)}
            placeholder="Search Qur’an..."
            aria-label="Search Qur’an"
            autoComplete="off"
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

        {quranSearchResults.length > 0 && (
          <div className="fullQuranSearchResults" role="listbox" aria-label="Qur’an search results">
            {quranSearchResults.map((ayah) => (
              <button
                key={ayah.id}
                type="button"
                className="fullQuranSearchResult"
                role="option"
                aria-selected={false}
                onClick={() => {
                  const element = document.getElementById(
                    `ayah-${ayah.surahNumber}-${ayah.ayahNumber}`
                  );

                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                    saveProgress(ayah.surahNumber, ayah.ayahNumber);
                  }

                  setQuranSearch("");
                }}
              >
                <div className="fullQuranSearchResultTop">
                  <strong>{ayah.surahName}</strong>
                  <span>
                    {ayah.surahNumber}:{ayah.ayahNumber}
                  </span>
                </div>
                <p>{ayah.arabic}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {message && (
        <div className="quranToast" role="status" aria-live="polite">
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
                  <div className="fullQuranSurahArabic">{surah.arabicName}</div>
                  <h2>{surah.name}</h2>
                  <span>Surah {surah.number}</span>
                </div>

                <button
                  type="button"
                  className="fullQuranSurahShare"
                  aria-label={`Share Surah ${surah.name}`}
                  title="Share Surah"
                  onClick={() => shareSurah(surah.name, surah.number)}
                >
                  ↗
                </button>
              </header>

              <div className="fullQuranSourceLine">
                <span>Qur’an text:</span>
                <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">
                  Tanzil Project
                </a>
              </div>

              <div className="fullQuranAyahs" dir="rtl">
                {ayahs.map((ayah) => (
                  <span
                    key={ayah.id}
                    id={`ayah-${ayah.surahNumber}-${ayah.ayahNumber}`}
                    className={
                      "fullQuranAyah" +
                      (progress?.surahNumber === ayah.surahNumber &&
                      progress?.ayahNumber === ayah.ayahNumber
                        ? " currentReadingAyah"
                        : "")
                    }
                    onClick={() => saveProgress(ayah.surahNumber, ayah.ayahNumber)}
                  >
                    <span className="fullQuranAyahText">{ayah.arabic}</span>
                    <span
                      className="fullQuranAyahMarker"
                      aria-label={`Ayah ${ayah.ayahNumber}`}
                    >
                      ۝{ayah.ayahNumber}
                    </span>
                  </span>
                ))}
              </div>

              <div className="fullQuranSurahFooter">
                <span>
                  Surah {surah.number} · {ayahs.length} Ayahs
                </span>
                <button
                  type="button"
                  onClick={() => shareSurah(surah.name, surah.number)}
                  aria-label={`Share Surah ${surah.name}`}
                  title="Share Surah"
                >
                  ↗
                </button>
              </div>
            </section>
          );
        })}
      </section>

      <section className="quranSource">
        <p>Arabic Qur’an text sourced from the Tanzil Project.</p>
        <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">
          Tanzil Project
        </a>
      </section>
    </main>
  );
}
