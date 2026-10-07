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
    <main className="fullQuranPage">

      {/* HERO */}

      <section className="fullQuranHero">

        <Link
          href="/quran"
          className="quranBack"
        >
          ← All Surahs
        </Link>

        <div className="fullQuranArabicTitle">
          القرآن الكريم
        </div>

        <div className="fullQuranEyebrow">
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


      {/* FIXED QURAN SEARCH */}

      <div className="fullQuranFixedSearch">

        <div className="fullQuranSearchBox">

          <span className="fullQuranSearchIcon">
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
              className="fullQuranSearchClear"
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

          <div className="fullQuranSearchResults">

            {quranSearchResults.map(
              (ayah) => (

                <button
                  key={ayah.id}
                  type="button"
                  className="fullQuranSearchResult"
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

                  <div className="fullQuranSearchResultTop">

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


      {/* TOAST */}

      {message && (
        <div className="quranToast">
          {message}
        </div>
      )}


      {/* FULL QURAN */}

      <section className="fullQuranContent">

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
                className="fullQuranSurah"
              >

                {/* SURAH HEADING */}

                <header className="fullQuranSurahHeader">

                  <div className="fullQuranSurahHeading">

                    <div className="fullQuranSurahArabic">
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
                    className="fullQuranSurahShare"
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
                    ↗
                  </button>

                </header>


                {/* TANZIL SOURCE */}

                <div className="fullQuranSourceLine">

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
                  className="fullQuranAyahs"
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
                        className={
                          "fullQuranAyah" +
                          (
                            progress?.surahNumber ===
                              ayah.surahNumber &&
                            progress?.ayahNumber ===
                              ayah.ayahNumber
                              ? " currentReadingAyah"
                              : ""
                          )
                        }
                        onClick={() =>
                          saveProgress(
                            ayah.surahNumber,
                            ayah.ayahNumber
                          )
                        }
                      >

                        <span className="fullQuranAyahText">
                          {
                            ayah.arabic
                          }
                        </span>

                        <span
                          className="fullQuranAyahMarker"
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

                <div className="fullQuranSurahFooter">

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

                  <button
                    type="button"
                    onClick={() =>
                      shareSurah(
                        surah.name,
                        surah.number
                      )
                    }
                    aria-label={
                      "Share Surah " +
                      surah.name
                    }
                    title="Share"
                  >
                    ↗
                  </button>

                </div>

              </section>
            );
          }
        )}

      </section>


      {/* SOURCE */}

      <section className="quranSource">

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
