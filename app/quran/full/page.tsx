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
    quranSearch
      .trim()
      .toLowerCase();

  const quranSearchResults =
    normalizedQuranSearch
      ? quranAyahs
          .filter((ayah) => {
            const arabic =
              ayah.arabic.toLowerCase();

            const surahName =
              ayah.surahName.toLowerCase();

            const ayahNumber =
              String(ayah.ayahNumber);

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
              ayahNumber ===
                normalizedQuranSearch ||
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
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(
          newProgress
        )
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

  const copyAyah = async (
    surahName: string,
    surahNumber: number,
    ayahNumber: number,
    arabic: string
  ) => {
    const text =
      "Surah " +
      surahName +
      " — Ayat " +
      ayahNumber +
      "\n\n" +
      arabic +
      "\n\n" +
      "Maslak-e-Ala Hazrat";

    try {
      await navigator.clipboard.writeText(
        text
      );

      setMessage(
        "Ayat copied"
      );

      setTimeout(() => {
        setMessage("");
      }, 1800);
    } catch {
      setMessage(
        "Copy failed"
      );

      setTimeout(() => {
        setMessage("");
      }, 1800);
    }
  };

  const shareAyah = async (
    surahName: string,
    surahNumber: number,
    ayahNumber: number,
    arabic: string
  ) => {
    const url =
      getAyahUrl(
        surahNumber,
        ayahNumber
      );

    const text =
      "Surah " +
      surahName +
      " — Ayat " +
      ayahNumber +
      "\n\n" +
      arabic;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Surah " +
            surahName +
            " — Ayat " +
            ayahNumber,
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(
          url
        );

        setMessage(
          "Ayat link copied"
        );

        setTimeout(() => {
          setMessage("");
        }, 1800);
      }
    } catch {
      // User cancelled sharing.
    }
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
      closestAyah.id;

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


      {/* QURAN SEARCH */}

      <section className="fullQuranSearch">

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
                      Surah{" "}
                      {
                        ayah.surahName
                      }
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

      </section>


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

                {/* SURAH HEADER */}

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
                    title={
                      "Share Surah " +
                      surah.name
                    }
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


                {/* SOURCE */}

                <div className="fullQuranSurahSource">

                  <div>

                    <span>
                      Qur’an Text Source
                    </span>

                    <a
                      href="https://tanzil.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tanzil Project
                    </a>

                  </div>

                  <button
                    type="button"
                    className="fullQuranSourceShare"
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

                </div>


                {/* CONTINUOUS AYAH TEXT */}

                <div className="fullQuranAyahs">

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
                        className="fullQuranAyah"
                        onClick={() =>
                          saveProgress(
                            ayah.surahNumber,
                            ayah.ayahNumber
                          )
                        }
                      >

                        <span className="fullQuranAyahNumber">
                          {
                            ayah.ayahNumber
                          }
                        </span>

                        <span className="fullQuranAyahText">
                          {
                            ayah.arabic
                          }
                        </span>

                      </span>

                    )
                  )}

                </div>


                {/* SURAH ACTIONS */}

                <div className="fullQuranSurahActions">

                  <button
                    type="button"
                    onClick={() => {

                      const firstAyah =
                        ayahs[0];

                      if (
                        firstAyah
                      ) {
                        copyAyah(
                          firstAyah.surahName,
                          firstAyah.surahNumber,
                          firstAyah.ayahNumber,
                          firstAyah.arabic
                        );
                      }

                    }}
                  >
                    📋 Copy
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      shareSurah(
                        surah.name,
                        surah.number
                      )
                    }
                  >
                    ↗ Share Surah
                  </button>

                </div>

              </section>
            );
          }
        )}

      </section>


      {/* FINAL SOURCE */}

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
