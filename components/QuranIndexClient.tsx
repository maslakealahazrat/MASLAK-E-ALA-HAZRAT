"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Bookmark,
  Sparkles,
  Layers,
  Compass,
  ArrowRight,
  Clock,
  Heart,
  SlidersHorizontal,
  Flame
} from "lucide-react";
import { ALL_SURAHS, JUZ_LIST, type SurahMeta, type JuzMeta } from "@/data/quran/surahs-meta";
import "@/app/quran/quran-app.css";

const POPULAR_SURAHS = [
  { number: 36, name: "Ya-Seen", arabic: "يس", title: "Heart of Quran" },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", title: "The Beneficent" },
  { number: 67, name: "Al-Mulk", arabic: "الملك", title: "Protection in Grave" },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", title: "Friday Light" },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", title: "Sustenance & Wealth" },
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", title: "The Opening" },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", title: "1/3 of Quran" },
];

export default function QuranIndexClient() {
  const [activeTab, setActiveTab] = useState<"surah" | "juz">("surah");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Meccan" | "Medinan">("all");
  const [lastRead, setLastRead] = useState<{ surahNumber: number; ayahNumber?: number; title?: string } | null>(null);
  const [bookmarksCount, setBookmarksCount] = useState<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("maslak-reading-progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.type === "quran") {
          const match = parsed.url?.match(/\/quran\/(\d+)/);
          if (match) {
            setLastRead({
              surahNumber: Number(match[1]),
              title: parsed.subtitle || "Continue Reading",
            });
          }
        }
      }

      const bookmarksRaw = localStorage.getItem("maslak-quran-bookmarks");
      if (bookmarksRaw) {
        const list = JSON.parse(bookmarksRaw);
        setBookmarksCount(list.length);
      }
    } catch {}
  }, []);

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_SURAHS.filter((surah) => {
      // Type filter
      if (filterType !== "all" && surah.type !== filterType) {
        return false;
      }
      // Query filter
      if (!q) return true;
      const numMatch = String(surah.number) === q;
      const enMatch = surah.nameEnglish.toLowerCase().includes(q);
      const arMatch = surah.nameArabic.includes(q);
      const urMatch = surah.nameUrdu.includes(q);
      const meaningMatch = surah.meaningEnglish.toLowerCase().includes(q);
      return numMatch || enMatch || arMatch || urMatch || meaningMatch;
    });
  }, [searchQuery, filterType]);

  const filteredJuz = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return JUZ_LIST;
    return JUZ_LIST.filter((juz) => {
      const numMatch = String(juz.juzNumber) === q;
      const enMatch = juz.nameEnglish.toLowerCase().includes(q);
      const arMatch = juz.nameArabic.includes(q);
      const urMatch = juz.nameUrdu.includes(q);
      return numMatch || enMatch || arMatch || urMatch;
    });
  }, [searchQuery]);

  return (
    <div className="quranContainer">
      {/* HEADER / HERO */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 16px 20px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "999px", background: "var(--q-badge-bg)", color: "var(--q-badge-text)", fontSize: "12px", fontWeight: 700, letterSpacing: "1px", marginBottom: "16px" }}>
          <Sparkles size={14} />
          <span>AL-QUR’AN AL-KAREEM</span>
        </div>

        <h1 style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "clamp(42px, 7vw, 68px)", margin: "0 0 10px", color: "var(--q-arabic)", lineHeight: 1.2 }}>
          القرآن الكريم
        </h1>

        <p style={{ fontSize: "18px", color: "var(--q-translation)", maxWidth: "640px", margin: "0 auto 24px" }}>
          Read, listen to and contemplate the Holy Qur’an with authentic Arabic scripts, multi-reciter audio, and Urdu Kanz-ul-Iman translation by Ala Hazrat.
        </p>

        {/* QUICK STATS & RESUME BAR */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
          {lastRead && (
            <Link
              href={`/quran/${lastRead.surahNumber}`}
              className="quranIconButton active"
              style={{ padding: "8px 16px" }}
            >
              <Clock size={16} />
              <span>Resume Surah {lastRead.surahNumber}</span>
            </Link>
          )}

          <Link href="/quran/full" className="quranIconButton" style={{ padding: "8px 16px" }}>
            <BookOpen size={16} />
            <span>Read Full Continuous Mushaf</span>
          </Link>

          <div className="quranIconButton" style={{ cursor: "default", opacity: 0.9 }}>
            <span>114 Surahs &bull; 30 Juz &bull; 6,236 Ayahs</span>
          </div>
        </div>

        {/* POPULAR SURAHS QUICK CHIPS */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", maxWidth: "900px", margin: "0 auto 36px" }}>
          {POPULAR_SURAHS.map((s) => (
            <Link
              key={s.number}
              href={`/quran/${s.number}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "10px",
                background: "var(--q-card)",
                border: "1px solid var(--q-card-border)",
                color: "var(--q-text)",
                fontSize: "13px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontFamily: "var(--font-arabic-uthmani)", color: "var(--q-accent)", fontSize: "16px" }}>{s.arabic}</span>
              <span style={{ fontWeight: 600 }}>{s.name}</span>
              <small style={{ color: "var(--q-translation)", fontSize: "11px" }}>{s.title}</small>
            </Link>
          ))}
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <Search
              size={20}
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--q-accent)" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Surah name (e.g. Yaseen, Rahman, 55, الفاتحة, Para 30)..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                borderRadius: "14px",
                border: "1px solid var(--q-card-border)",
                background: "var(--q-card)",
                color: "var(--q-text)",
                fontSize: "15px",
                outline: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--q-translation)",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* TAB & CLASSIFICATION SELECTORS */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
            <div className="quranViewSelector" style={{ display: "inline-flex" }}>
              <button
                type="button"
                className={`quranViewBtn ${activeTab === "surah" ? "active" : ""}`}
                onClick={() => setActiveTab("surah")}
              >
                114 Surahs
              </button>
              <button
                type="button"
                className={`quranViewBtn ${activeTab === "juz" ? "active" : ""}`}
                onClick={() => setActiveTab("juz")}
              >
                30 Juz (Paras)
              </button>
            </div>

            {activeTab === "surah" && (
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className={`quranIconButton ${filterType === "all" ? "active" : ""}`}
                  onClick={() => setFilterType("all")}
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                >
                  All ({ALL_SURAHS.length})
                </button>
                <button
                  type="button"
                  className={`quranIconButton ${filterType === "Meccan" ? "active" : ""}`}
                  onClick={() => setFilterType("Meccan")}
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                >
                  Makki
                </button>
                <button
                  type="button"
                  className={`quranIconButton ${filterType === "Medinan" ? "active" : ""}`}
                  onClick={() => setFilterType("Medinan")}
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                >
                  Madani
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SURAH GRID */}
      {activeTab === "surah" && (
        <section className="surahIndexGrid">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
              className="surahIndexCard"
            >
              <div className="surahIndexLeft">
                <div className="surahIndexNumber">
                  {surah.number}
                </div>
                <div className="surahIndexTitles">
                  <strong>{surah.nameEnglish}</strong>
                  <span>{surah.meaningEnglish}</span>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "11px", color: "var(--q-accent)", background: "var(--q-accent-soft)", padding: "2px 6px", borderRadius: "4px" }}>
                      {surah.type}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--q-translation)", background: "rgba(0,0,0,0.15)", padding: "2px 6px", borderRadius: "4px" }}>
                      {surah.ayahCount} Ayahs
                    </span>
                  </div>
                </div>
              </div>

              <div className="surahIndexRight">
                <span className="surahIndexArabic" dir="rtl" lang="ar">
                  {surah.nameArabic}
                </span>
                <span className="surahIndexMeta">
                  Juz {surah.juzStart}
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* JUZ / PARA GRID */}
      {activeTab === "juz" && (
        <section className="juzIndexGrid">
          {filteredJuz.map((juz) => (
            <Link
              key={juz.juzNumber}
              href={`/quran/full?mode=juz&juz=${juz.juzNumber}`}
              className="juzIndexCard"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="ayahNumberBadge" style={{ width: "42px", height: "42px" }}>
                  {juz.juzNumber}
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "15px" }}>Juz {juz.juzNumber}</strong>
                  <span style={{ fontSize: "12px", color: "var(--q-translation)" }}>
                    {juz.nameEnglish}
                  </span>
                  <div style={{ fontSize: "11px", color: "var(--q-accent)", marginTop: "2px" }}>
                    Surah {juz.startSurah}:{juz.startAyah} → {juz.endSurah}:{juz.endAyah}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "24px", color: "var(--q-arabic)" }} dir="rtl" lang="ar">
                  {juz.nameArabic}
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
