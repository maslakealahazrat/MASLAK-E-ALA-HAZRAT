"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./FullQuran.module.css";

const PROGRESS_KEY = "maslak-quran-progress";

type Progress = {
  surahNumber: number;
  ayahNumber: number;
};

type Surah = {
  number: number;
  name: string;
  arabicName: string;
};

type Ayah = {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  surahName: string;
};

export default function FullQuranPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [message, setMessage] = useState("");
  const [quranSearch, setQuranSearch] = useState("");
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [ayahsList, setAyahsList] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase se data fetch karna on load
  useEffect(() => {
    async function fetchQuranData() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch Surahs
        const { data: surahData } = await supabase
          .from("quran_surahs")
          .select("surah_number, name_english, name_arabic")
          .order("surah_number", { ascending: true });

        if (surahData) {
          setSurahs(
            surahData.map((s) => ({
              number: s.surah_number,
              name: s.name_english,
              arabicName: s.name_arabic,
            }))
          );
        }

        // 2. Fetch Ayahs
        const { data: ayahData } = await supabase
          .from("quran_ayahs")
          .select("surah_number, ayah_number, arabic_text")
          .order("surah_number", { ascending: true })
          .order("ayah_number", { ascending: true });

        if (ayahData && surahData) {
          const surahNameMap = new Map(
            surahData.map((s) => [s.surah_number, s.name_english])
          );

          setAyahsList(
            ayahData.map((a) => ({
              id: `${a.surah_number}-${a.ayah_number}`,
              surahNumber: a.surah_number,
              ayahNumber: a.ayah_number,
              arabic: a.arabic_text,
              surahName: surahNameMap.get(a.surah_number) || `Surah ${a.surah_number}`,
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching full Quran from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuranData();
  }, []);

  const normalizedQuranSearch = quranSearch.trim().toLowerCase();

  const quranSearchResults = normalizedQuranSearch
    ? ayahsList
        .filter((ayah) => {
          const arabic = ayah.arabic.toLowerCase();
          const surahName = ayah.surahName.toLowerCase();
          const reference = ayah.surahNumber + ":" + ayah.ayahNumber;

          return (
            arabic.includes(normalizedQuranSearch) ||
            surahName.includes(normalizedQuranSearch) ||
            reference === normalizedQuranSearch
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

  const saveProgress = (surahNumber: number, ayahNumber: number) => {
    const newProgress = { surahNumber, ayahNumber };
    setProgress(newProgress);

    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      localStorage.setItem(
        "maslak-reading-progress",
        JSON.stringify({
          type: "quran",
          title: "Qur’an Majeed",
          subtitle: "Surah " + surahNumber + " · Ayah " + ayahNumber,
          url: "/quran/full#ayah-" + surahNumber + "-" + ayahNumber,
        })
      );
    } catch {
      // Ignore localStorage errors
    }
  };

  const shareSurah = async (surahName: string, surahNumber: number) => {
    const url =
      typeof window !== "undefined"
        ? window.location.origin + "/quran/full#surah-" + surahNumber
        : "";

    const text = "Read Surah " + surahName + " on Maslak-e-Ala Hazrat";

    try {
      if (navigator.share) {
        await navigator.share({ title: "Surah " + surahName, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Surah link copied");
        setTimeout(() => setMessage(""), 1800);
      }
    } catch {
      // User cancelled sharing
    }
  };

  const handleAyahScroll = () => {
    const ayahElements = document.querySelectorAll<HTMLElement>(
      "." + styles.fullQuranAyah
    );

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
  };

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
  }, []);

  return (
    <main className={styles.fullQuranPage}>
      {/* HERO */}
      <section className={styles.fullQuranHero}>
        <Link href="/quran" className={styles.quranBack}>
          ← All Surahs
        </Link>
        <div className={styles.fullQuranArabicTitle}>القرآن الكريم</div>
        <div className={styles.fullQuranEyebrow}>THE NOBLE QUR’AN</div>
        <h1>Read Full Qur’an</h1>
        <p>Poora Qur’an ek hi jagah par padhiye.</p>
      </section>

      {/* FIXED QURAN SEARCH */}
      <div className={styles.fullQuranFixedSearch}>
        <div className={styles.fullQuranSearchBox}>
          <span className={styles.fullQuranSearchIcon}>🔎</span>
          <input
            type="search"
            value={quranSearch}
            onChange={(event) => setQuranSearch(event.target.value)}
            placeholder="Search Qur’an..."
            aria-label="Search Qur’an"
          />
          {quranSearch && (
            <button
              type="button"
              className={styles.fullQuranSearchClear}
              onClick={() => setQuranSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {quranSearchResults.length > 0 && (
          <div className={styles.fullQuranSearchResults}>
            {quranSearchResults.map((ayah) => (
              <button
                key={ayah.id}
                type="button"
                className={styles.fullQuranSearchResult}
                onClick={() => {
                  const element = document.getElementById(
                    "ayah-" + ayah.surahNumber + "-" + ayah.ayahNumber
                  );
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                    saveProgress(ayah.surahNumber, ayah.ayahNumber);
                  }
                  setQuranSearch("");
                }}
              >
                <div className={styles.fullQuranSearchResultTop}>
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

      {/* TOAST */}
      {message && <div className={styles.quranToast}>{message}</div>}

      {/* FULL QURAN */}
      <section className={styles.fullQuranContent}>
        {loading ? (
          <p style={{ textAlign: "center", padding: "3rem" }}>
            Qur’an load ho raha hai...
          </p>
        ) : (
          surahs.map((surah) => {
            const ayahs = ayahsList.filter(
              (ayah) => ayah.surahNumber === surah.number
            );

            return (
              <section
                key={surah.number}
                id={"surah-" + surah.number}
                className={styles.fullQuranSurah}
              >
                {/* SURAH HEADING */}
                <header className={styles.fullQuranSurahHeader}>
                  <div className={styles.fullQuranSurahHeading}>
                    <div className={styles.fullQuranSurahArabic}>
                      {surah.arabicName}
                    </div>
                    <h2>{surah.name}</h2>
                    <span>Surah {surah.number}</span>
                  </div>
                </header>

                <div className={styles.fullQuranShareRow}>
                  <span className={styles.fullQuranShareLabel}>
                    Surah {surah.number} · {ayahs.length} Ayahs
                  </span>
                  <button
                    type="button"
                    className={styles.fullQuranSurahShare}
                    aria-label={"Share Surah " + surah.name}
                    title={"Share Surah " + surah.name}
                    onClick={() => shareSurah(surah.name, surah.number)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M12 16V3m0 0L7 8m5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
                    </svg>
                    <span>Share Surah</span>
                  </button>
                </div>

                {/* TANZIL SOURCE */}
                <div className={styles.fullQuranSourceLine}>
                  <span>Qur’an text:</span>
                  <a
                    href="https://tanzil.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tanzil Project
                  </a>
                </div>

                {/* CONTINUOUS MUSHAF TEXT */}
                <div className={styles.fullQuranAyahs} dir="rtl">
                  {ayahs.map((ayah) => (
                    <span
                      key={ayah.id}
                      id={"ayah-" + ayah.surahNumber + "-" + ayah.ayahNumber}
                      className={
                        styles.fullQuranAyah +
                        (progress?.surahNumber === ayah.surahNumber &&
                        progress?.ayahNumber === ayah.ayahNumber
                          ? " " + styles.currentReadingAyah
                          : "")
                      }
                      onClick={() => saveProgress(ayah.surahNumber, ayah.ayahNumber)}
                    >
                      <span className={styles.fullQuranAyahText}>
                        {ayah.arabic}
                      </span>
                      <span
                        className={styles.fullQuranAyahMarker}
                        aria-label={"Ayah " + ayah.ayahNumber}
                      >
                        ۝{ayah.ayahNumber}
                      </span>
                    </span>
                  ))}
                </div>

                {/* SMALL SURAH FOOTER */}
                <div className={styles.fullQuranSurahFooter}>
                  <span>
                    Surah {surah.number} · {ayahs.length} Ayahs
                  </span>
                </div>
              </section>
            );
          })
        )}
      </section>

      {/* SOURCE */}
      <section className={styles.quranSource}>
        <p>Arabic Qur’an text sourced from the Tanzil Project.</p>
        <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">
          Tanzil Project
        </a>
      </section>
    </main>
  );
}
