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
    const [quranSearch, setQuranSearch] = useState("");

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

            return (
              arabic.includes(
                normalizedQuranSearch
              ) ||
              surahName.includes(
                normalizedQuranSearch
              ) ||
              ayahNumber ===
                normalizedQuranSearch
            );
          })
          .slice(0, 10)
      : [];
  
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

useEffect(() => {
  const onScroll = () => {
    handleAyahScroll();
  };

  window.addEventListener("scroll", onScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
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

  let closestAyah: HTMLElement | null = null;
  let closestDistance = Infinity;

  ayahElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (
      rect.top <= viewportCenter &&
      rect.bottom >= viewportCenter
    ) {
      const distance = Math.abs(
        rect.top +
          rect.height / 2 -
          viewportCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestAyah = element;
      }
    }
  });

  if (!closestAyah) {
    return;
  }

  const id = closestAyah.id;
  const parts = id.split("-");

  if (parts.length !== 3) {
    return;
  }

  const surahNumber = Number(parts[1]);
  const ayahNumber = Number(parts[2]);

  if (
    !Number.isInteger(surahNumber) ||
    !Number.isInteger(ayahNumber)
  ) {
    return;
  }

  saveProgress(
    surahNumber,
    ayahNumber
  );
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
    setQuranSearch(event.target.value)
  }
  placeholder="Search Qur’an..."
  aria-label="Search Qur’an"
/>

  </div>
{quranSearchResults.length > 0 && (
  <div className="fullQuranSearchResults">

    {quranSearchResults.map((ayah) => (
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
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }}
      >
        <strong>
          Surah {ayah.surahName}
        </strong>

        <span>
          Ayat {ayah.ayahNumber}
        </span>

        <p>
          {ayah.arabic}
        </p>
      </button>
    ))}

  </div>
)}

  
</section>
      
      

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
