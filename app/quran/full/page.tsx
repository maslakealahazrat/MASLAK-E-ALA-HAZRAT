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
    const newProgress = {
      surahNumber,
      ayahNumber,
    };

    setProgress(newProgress);

    try {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(newProgress)
      );
    } catch {
      // Ignore localStorage errors.
    }
  };

  const getAyahUrl = (
    surahNumber: number,
    ayahNumber: number
  ) => {
    if (typeof window === "undefined") {
      return "";
    }

    return (
      window.location.origin +
      "/quran/" +
      surahNumber +
      "#ayah-" +
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
      await navigator.clipboard.writeText(text);

      setMessage("Ayat copied");

      setTimeout(() => {
        setMessage("");
      }, 1800);
    } catch {
      setMessage("Copy failed");

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
    const url = getAyahUrl(
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

        setMessage("Ayat link copied");

        setTimeout(() => {
          setMessage("");
        }, 1800);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  const continueReading = () => {
    if (!progress) {
      return;
    }

    const element = document.getElementById(
      "ayah-" +
        progress.surahNumber +
        "-" +
        progress.ayahNumber
    );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <main className="fullQuranPage">

      {/* HEADER */}

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

        <h1>Read Full Qur’an</h1>

        <p>
          Poora Qur’an ek hi jagah par padhiye.
        </p>

      </section>


      {/* CONTINUE READING */}

      {progress && (
        <section className="continueReadingBox">

          <div className="continueReadingIcon">
            📖
          </div>

          <div className="continueReadingInfo">

            <span>
              CONTINUE READING
            </span>

            <h2>
              Surah{" "}
              {
                quranAyahs.find(
                  (ayah) =>
                    ayah.surahNumber ===
                    progress.surahNumber
                )?.surahName
              }
            </h2>

            <p>
              Ayat {progress.ayahNumber}
            </p>

            <button
              type="button"
              className="continueReadingButton"
              onClick={continueReading}
            >
              Continue Reading →
            </button>

          </div>

        </section>
      )}


      {/* COPY / SHARE MESSAGE */}

      {message && (
        <div className="quranToast">
          {message}
        </div>
      )}


      {/* FULL QURAN */}

      <section className="fullQuranContent">

        {surahs.map((surah) => {

          const ayahs =
            quranAyahs.filter(
              (ayah) =>
                ayah.surahNumber ===
                surah.number
            );

          return (
            <section
              key={surah.number}
              className="fullQuranSurah"
            >

              {/* SURAH HEADER */}

              <header className="fullQuranSurahHeader">

                <div className="fullQuranSurahArabic">
                  {surah.arabicName}
                </div>

                <h2>
                  {surah.name}
                </h2>

                <span>
                  Surah {surah.number}
                </span>

              </header>


              {/* AYAT */}

              <div className="fullQuranAyahs">

                {ayahs.map((ayah) => (

                  <article
                    key={ayah.id}
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

                    <div className="fullQuranAyahTop">

                      <div className="fullQuranAyahNumber">
                        {ayah.ayahNumber}
                      </div>

                      <div className="fullQuranAyahActions">

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            copyAyah(
                              ayah.surahName,
                              ayah.surahNumber,
                              ayah.ayahNumber,
                              ayah.arabic
                            );
                          }}
                        >
                          📋 Copy
                        </button>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            shareAyah(
                              ayah.surahName,
                              ayah.surahNumber,
                              ayah.ayahNumber,
                              ayah.arabic
                            );
                          }}
                        >
                          ↗ Share
                        </button>

                      </div>

                    </div>


                    <div className="fullQuranAyahArabic">
                      {ayah.arabic}
                    </div>

                  </article>

                ))}

              </div>

            </section>
          );

        })}

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
