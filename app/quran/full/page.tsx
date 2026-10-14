"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quranAyahs } from "@/data/quran/ayahs";
import styles from "./FullQuran.module.css";

const PROGRESS_KEY = "maslak-quran-progress";

type Progress = {
  surahNumber: number;
  ayahNumber: number;
};

export default function FullQuranPage() {
  const [progress, setProgress] =
    useState<Progress | null>(null);

  const [message, setMessage] =
    useState("");

  const [quranSearch, setQuranSearch] =
    useState("");

  const normalizedQuranSearch =
    quranSearch.trim().toLowerCase();

  const quranSearchResults =
    normalizedQuranSearch
      ? quranAyahs
          .filter((ayah) => {
            const arabic =
              ayah.arabic.toLowerCase();

            const surahName =
              ayah.surahName.toLowerCase();

            const reference =
              ayah.surahNumber +
              ":" +
              ayah.ayahNumber;

            return (
              arabic.includes(
                normalizedQuranSearch
              ) ||
              surahName.includes(
                normalizedQuranSearch
              ) ||
              reference ===
                normalizedQuranSearch
            );
          })
          .slice(0, 10)
      : [];

  const surahs = Array.from(
    new Map(
      quranAyahs.map((ayah) => [
        ayah.surahNumber,
        {
          number: ayah.surahNumber,
          name: ayah.surahName,
          arabicName:
            ayah.surahNameArabic,
        },
      ])
    ).values()
  );

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          PROGRESS_KEY
        );

      if (saved) {
        setProgress(
          JSON.parse(saved)
        );
      }
    } catch {
      setProgress(null);
    }
  }, []);

  const saveProgress = (
  surahNumber: number,
  ayahNumber: number
) => {
  const newProgress = {
    surahNumber,
    ayahNumber,
  };

  setProgress(newProgress);

  try {
    // Existing Qur'an progress
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify(
        newProgress
      )
    );

    // Generic Continue Reading
    localStorage.setItem(
      "maslak-reading-progress",
      JSON.stringify({
        type: "quran",
        title: "Qur’an Majeed",
        subtitle:
          "Surah " +
          surahNumber +
          " · Ayah " +
          ayahNumber,
        url:
          "/quran/full#ayah-" +
          surahNumber +
          "-" +
          ayahNumber,
      })
    );
  } catch {
    // Ignore localStorage errors.
  }
};

  const getAyahUrl = (
    surahNumber: number,
    ayahNumber: number
  ) => {
    if (
      typeof window ===
      "undefined"
    ) {
      return "";
    }

    return (
      window.location.origin +
      "/quran/full#ayah-" +
      surahNumber +
      "-" +
      ayahNumber
    );
  };

  const shareSurah = async (
    surahName: string,
    surahNumber: number
  ) => {
    const url =
      typeof window !==
      "undefined"
        ? window.location.origin +
          "/quran/full#surah-" +
          surahNumber
        : "";

    const text =
      "Read Surah " +
      surahName +
      " on Maslak-e-Ala Hazrat";

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Surah " +
            surahName,
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(
          url
        );

        setMessage(
          "Surah link copied"
        );

        setTimeout(() => {
          setMessage("");
        }, 1800);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  const handleAyahScroll = () => {
    const ayahElements =
      document.querySelectorAll<HTMLElement>(
        ".fullQuranAyah"
      );

    if (!ayahElements.length) {
      return;
    }

    const viewportCenter =
      window.innerHeight / 2;

    let closestAyah:
      HTMLElement | null = null;

    let closestDistance =
      Infinity;

    ayahElements.forEach(
      (element) => {
        const rect =
          element.getBoundingClientRect();

        const elementCenter =
          rect.top +
          rect.height / 2;

        const distance =
          Math.abs(
            elementCenter -
              viewportCenter
          );

        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance;

          closestAyah =
            element;
        }
      }
    );

    if (!closestAyah) {
      return;
    }

    const id =
      (closestAyah as HTMLElement).id;

    const parts =
      id.split("-");

    if (parts.length !== 3) {
      return;
    }

    const surahNumber =
      Number(parts[1]);

    const ayahNumber =
      Number(parts[2]);

    if (
      !Number.isInteger(
        surahNumber
      ) ||
      !Number.isInteger(
        ayahNumber
      )
    ) {
      return;
    }

    saveProgress(
      surahNumber,
      ayahNumber
    );
  };

  useEffect(() => {
    let timeout:
      ReturnType<
        typeof setTimeout
      > | null = null;

    const onScroll = () => {
      if (timeout) {
        return;
      }

      timeout =
        setTimeout(() => {
          handleAyahScroll();
          timeout = null;
        }, 250);
    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <main className={styles.page}>

      {/* HERO */}

      <section className={styles.hero}>

        <Link
          href="/quran"
          className={styles.back}
        >
          ← All Surahs
        </Link>

        <div className={styles.arabicTitle}>
          القرآن الكريم
        </div>

        <div className={styles.eyebrow}>
          THE NOBLE QUR’AN
        </div>

        <h1>
          Read Full Qur’an
        </h1>

        <p>
          Poora Qur’an ek hi jagah
          par padhiye.
        </p>

      </section>


      {/* TOAST */}

      {message && (
        <div className={styles.toast}>
          {message}
        </div>
      )}


      {/* FULL QURAN */}

      <section className={styles.content}>

        {surahs.map(
          (surah) => {

            const ayahs =
              quranAyahs.filter(
                (ayah) =>
                  ayah.surahNumber ===
                  surah.number
              );

            return (
              <section
                key={
                  surah.number
                }
                id={
                  "surah-" +
                  surah.number
                }
                className={styles.surah}
              >

                {/* SURAH HEADING */}

                <header className={styles.surahHeader}>

                  <div className={styles.surahHeading}>

                    <div className={styles.surahArabic}>
                      {
                        surah.arabicName
                      }
                    </div>

                    <h2>
                      {
                        surah.name
                      }
                    </h2>

                    <span>
                      Surah{" "}
                      {
                        surah.number
                      }
                    </span>

                  </div>

                  <button
                    type="button"
                    className={styles.shareButton}
                    aria-label={
                      "Share Surah " +
                      surah.name
                    }
                    title="Share"
                    onClick={() =>
                      shareSurah(
                        surah.name,
                        surah.number
                      )
                    }
                  >
                    ↗ <span>Share Surah</span>
                  </button>

                </header>


                {/* TANZIL SOURCE */}

                <div className={styles.sourceLine}>

                  <span>
                    Qur’an text:
                  </span>

                  <a
                    href="https://tanzil.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tanzil Project
                  </a>

                </div>


                {/* CONTINUOUS MUSHAF TEXT */}

                <div
                  className={styles.ayahs}
                  dir="rtl"
                >

                  {ayahs.map(
                    (ayah) => (

                      <span
                        key={
                          ayah.id
                        }
                        id={
                          "ayah-" +
                          ayah.surahNumber +
                          "-" +
                          ayah.ayahNumber
                        }
                        className={`${styles.ayah} ${progress?.surahNumber === ayah.surahNumber && progress?.ayahNumber === ayah.ayahNumber ? styles.currentReadingAyah : ""}`}
                        onClick={() =>
                          saveProgress(
                            ayah.surahNumber,
                            ayah.ayahNumber
                          )
                        }
                      >

                        <span className={styles.ayahText}>
                          {
                            ayah.arabic
                          }
                        </span>

                        <span
                          className={styles.ayahMarker}
                          aria-label={
                            "Ayah " +
                            ayah.ayahNumber
                          }
                        >
                          ۝
                          {
                            ayah.ayahNumber
                          }
                        </span>

                      </span>

                    )
                  )}

                </div>


                {/* SMALL SURAH FOOTER */}

                <div className={styles.surahFooter}>

                  <span>
                    Surah{" "}
                    {
                      surah.number
                    }
                    {" · "}
                    {
                      ayahs.length
                    }{" "}
                    Ayahs
                  </span>



                </div>

              </section>
            );
          }
        )}

      </section>


      {/* SEARCH — placed after Surah content, not fixed */}

      <div className={styles.searchArea}>

        <div className={styles.searchBox}>

          <span className={styles.searchIcon}>
            🔎
          </span>

          <input
            type="search"
            value={quranSearch}
            onChange={(event) =>
              setQuranSearch(
                event.target.value
              )
            }
            placeholder="Search Qur’an..."
            aria-label="Search Qur’an"
          />

          {quranSearch && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() =>
                setQuranSearch("")
              }
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

        {quranSearchResults.length >
          0 && (

          <div className={styles.searchResults}>

            {quranSearchResults.map(
              (ayah) => (

                <button
                  key={ayah.id}
                  type="button"
                  className={styles.searchResult}
                  onClick={() => {

                    const element =
                      document.getElementById(
                        "ayah-" +
                          ayah.surahNumber +
                          "-" +
                          ayah.ayahNumber
                      );

                    if (element) {
                      element.scrollIntoView(
                        {
                          behavior:
                            "smooth",
                          block:
                            "center",
                        }
                      );

                      saveProgress(
                        ayah.surahNumber,
                        ayah.ayahNumber
                      );
                    }

                    setQuranSearch("");
                  }}
                >

                  <div className={styles.searchResultTop}>

                    <strong>
                      {ayah.surahName}
                    </strong>

                    <span>
                      {ayah.surahNumber}:
                      {ayah.ayahNumber}
                    </span>

                  </div>

                  <p>
                    {ayah.arabic}
                  </p>

                </button>

              )
            )}

          </div>

        )}

      </div>




      {/* SOURCE */}

      <section className={styles.source}>

        <p>
          Arabic Qur’an text sourced
          from the Tanzil Project.
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
