"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Share2,
  Sparkles,
  ChevronRight,
  Bookmark,
  Layers,
  ArrowRight,
  Filter
} from "lucide-react";
import { HADITH_COLLECTIONS, AHADITH_DATABASE, type HadithItem, type HadithCollection, type HadithBook } from "@/data/hadith/books";
import "@/app/quran/quran-app.css";

export default function HadithBrowserClient() {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("bukhari");
  const [selectedBookId, setSelectedBookId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"browse" | "collections" | "search">("browse");

  const currentCollection = useMemo(() => {
    return HADITH_COLLECTIONS.find((c) => c.id === selectedCollectionId) || HADITH_COLLECTIONS[0];
  }, [selectedCollectionId]);

  const currentBook = useMemo(() => {
    if (selectedBookId === "all") return null;
    return currentCollection.books.find((b) => b.id === selectedBookId) || null;
  }, [currentCollection, selectedBookId]);

  // Filtered Ahadith
  const displayedAhadith = useMemo(() => {
    let list = AHADITH_DATABASE;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (h) =>
          h.english.toLowerCase().includes(q) ||
          h.urdu.includes(q) ||
          h.arabic.includes(q) ||
          h.narrator.toLowerCase().includes(q) ||
          h.reference.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Collection
    list = list.filter((h) => h.collectionId === selectedCollectionId);

    // Filter by Book if specified
    if (selectedBookId !== "all") {
      list = list.filter((h) => h.bookId === selectedBookId);
    }

    return list;
  }, [selectedCollectionId, selectedBookId, searchQuery]);

  const copyHadith = async (hadith: HadithItem) => {
    const textToCopy = `${hadith.arabic}\n\nUrdu:\n${hadith.urdu}\n\nEnglish:\n"${hadith.english}"\n\n— [${hadith.reference} | ${hadith.narrator} | ${hadith.grade}]`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(hadith.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 16px 60px" }}>
      {/* SEARCH BAR */}
      <div
        style={{
          background: "var(--q-card, #122825)",
          border: "1.5px solid var(--q-card-border, rgba(212,175,55,0.25))",
          borderRadius: "16px",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <Search size={20} color="var(--q-accent, #d4af37)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Hadith by keyword (e.g. intentions, prayer, mother, ilm, Bukhari, عمر)..."
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--q-text, #f0f7f5)",
            fontSize: "15px",
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            style={{
              background: "none",
              border: "none",
              color: "var(--q-translation, #8ea39e)",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* COLLECTION TABS */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--q-accent, #d4af37)", marginBottom: "8px", letterSpacing: "1px" }}>
          STEP 1: SELECT HADITH COLLECTION (کتبِ حدیث)
        </div>
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px" }}>
          {HADITH_COLLECTIONS.map((c) => {
            const isSelected = c.id === selectedCollectionId && !searchQuery;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCollectionId(c.id);
                  setSelectedBookId("all");
                  setSearchQuery("");
                }}
                className={`quranIconButton ${isSelected ? "active" : ""}`}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "10px 18px",
                  borderRadius: "14px",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
                  <strong style={{ fontSize: "14px" }}>{c.nameEnglish}</strong>
                  <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "16px", color: isSelected ? "#071311" : "var(--q-accent)" }} dir="rtl" lang="ar">
                    {c.nameArabic}
                  </span>
                </div>
                <small style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>
                  {c.totalHadith} &bull; {c.books.length} Books
                </small>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOOKS (KUTUB) INSIDE SELECTED COLLECTION */}
      {!searchQuery && (
        <div style={{ marginBottom: "32px", background: "var(--q-card, #122825)", borderRadius: "18px", border: "1px solid var(--q-card-border, rgba(212,175,55,0.2))", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--q-accent, #d4af37)", textTransform: "uppercase" }}>
                STEP 2: SELECT BOOK (کتاب) INSIDE {currentCollection.nameEnglish.toUpperCase()}
              </span>
              <h3 style={{ margin: "4px 0 0", fontSize: "18px", color: "var(--q-text, #f0f7f5)" }}>
                {currentCollection.nameEnglish} ({currentCollection.nameUrdu})
              </h3>
            </div>
            <span style={{ fontSize: "12px", color: "var(--q-translation, #8ea39e)" }}>
              Compiler: {currentCollection.compiler} (d. {currentCollection.deathYearAH} AH)
            </span>
          </div>

          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--q-translation, #8ea39e)", margin: "0 0 16px 0" }}>
            {currentCollection.description}
          </p>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setSelectedBookId("all")}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid var(--q-card-border, rgba(212,175,55,0.2))",
                background: selectedBookId === "all" ? "var(--q-accent, #d4af37)" : "var(--q-bg, #0b1a18)",
                color: selectedBookId === "all" ? "#071311" : "var(--q-text, #f0f7f5)",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              All Books ({currentCollection.books.length})
            </button>

            {currentCollection.books.map((b) => {
              const isBookActive = b.id === selectedBookId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBookId(b.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: isBookActive ? "1.5px solid var(--q-accent, #d4af37)" : "1px solid var(--q-card-border, rgba(212,175,55,0.2))",
                    background: isBookActive ? "rgba(212,175,55,0.18)" : "var(--q-bg, #0b1a18)",
                    color: isBookActive ? "var(--q-accent, #d4af37)" : "var(--q-text, #f0f7f5)",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>Book {b.bookNumber}: {b.titleEnglish}</span>
                  <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "14px", color: "var(--q-accent)" }} dir="rtl" lang="ar">
                    {b.titleArabic}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AHADITH LIST */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "18px", margin: 0, color: "var(--q-text, #f0f7f5)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={18} color="var(--q-accent, #d4af37)" />
            <span>
              {searchQuery
                ? `Search Results (${displayedAhadith.length})`
                : currentBook
                ? `${currentBook.titleEnglish} — Ahadith (${displayedAhadith.length})`
                : `${currentCollection.nameEnglish} — All Books (${displayedAhadith.length})`}
            </span>
          </h3>

          <span style={{ fontSize: "12px", color: "var(--q-translation, #8ea39e)" }}>
            Showing authentic verified texts
          </span>
        </div>

        {displayedAhadith.length > 0 ? (
          <div style={{ display: "grid", gap: "22px" }}>
            {displayedAhadith.map((hadith) => (
              <article
                key={hadith.id}
                style={{
                  background: "var(--q-card, #122825)",
                  border: "1px solid var(--q-card-border, rgba(212,175,55,0.22))",
                  borderRadius: "18px",
                  padding: "24px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                {/* HADITH TOP META ROW */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span className="ayahNumberBadge" style={{ width: "auto", padding: "4px 10px", fontSize: "12px" }}>
                      {hadith.reference}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--q-accent, #d4af37)", background: "rgba(212,175,55,0.12)", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                      {hadith.bookTitleEnglish}
                    </span>
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                      {hadith.grade}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => copyHadith(hadith)}
                      className="quranIconButton"
                      style={{ padding: "6px 12px", fontSize: "12px", display: "inline-flex", gap: "6px" }}
                      title="Copy Arabic, Urdu and English translation"
                    >
                      {copiedId === hadith.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      <span>{copiedId === hadith.id ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* CHAPTER TITLE */}
                <div style={{ background: "rgba(212,175,55,0.06)", borderLeft: "3px solid var(--q-accent, #d4af37)", padding: "8px 14px", borderRadius: "8px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--q-accent, #d4af37)" }}>
                    {hadith.chapterTitleEnglish}
                  </div>
                  <div style={{ fontFamily: "var(--font-urdu, 'Noto Nastaliq Urdu', serif)", direction: "rtl", textAlign: "right", fontSize: "14px", color: "var(--q-translation, #8ea39e)", marginTop: "2px" }}>
                    {hadith.chapterTitleUrdu}
                  </div>
                </div>

                {/* ARABIC MATN */}
                <p
                  style={{
                    fontFamily: "var(--font-arabic-uthmani, 'Amiri Quran', serif)",
                    fontSize: "26px",
                    lineHeight: 2.1,
                    textAlign: "right",
                    direction: "rtl",
                    color: "var(--q-arabic, #d4af37)",
                    margin: "0 0 18px 0",
                  }}
                  lang="ar"
                >
                  {hadith.arabic}
                </p>

                {/* URDU TRANSLATION */}
                <div
                  style={{
                    background: "var(--q-bg, #0b1a18)",
                    padding: "16px",
                    borderRadius: "12px",
                    borderLeft: "3px solid var(--q-accent, #d4af37)",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--q-accent, #d4af37)", marginBottom: "4px" }}>
                    URDU TRANSLATION (اردو ترجمہ)
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-urdu, 'Noto Nastaliq Urdu', serif)",
                      direction: "rtl",
                      textAlign: "right",
                      fontSize: "18px",
                      lineHeight: 2,
                      color: "var(--q-translation, #d6e2de)",
                      margin: 0,
                    }}
                  >
                    {hadith.urdu}
                  </p>
                </div>

                {/* ENGLISH TRANSLATION */}
                <div
                  style={{
                    background: "var(--q-bg, #0b1a18)",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    borderLeft: "3px solid var(--q-card-border, rgba(212,175,55,0.2))",
                    marginBottom: "14px",
                  }}
                >
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--q-accent, #d4af37)", marginBottom: "4px" }}>
                    ENGLISH TRANSLATION
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--q-translation, #8ea39e)", margin: 0 }}>
                    &ldquo;{hadith.english}&rdquo;
                  </p>
                </div>

                {/* NARRATOR & TAGS */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", fontSize: "12px", color: "var(--q-translation, #8ea39e)", paddingTop: "10px", borderTop: "1px dashed var(--q-card-border, rgba(212,175,55,0.2))" }}>
                  <div>
                    Narrated by: <strong style={{ color: "var(--q-text, #f0f7f5)" }}>{hadith.narrator}</strong>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {hadith.tags.map((tag) => (
                      <span key={tag} style={{ background: "rgba(0,0,0,0.2)", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ background: "var(--q-card, #122825)", borderRadius: "16px", padding: "40px 20px", textAlign: "center", color: "var(--q-translation, #8ea39e)" }}>
            <BookOpen size={36} color="var(--q-accent, #d4af37)" style={{ margin: "0 auto 12px" }} />
            <h4 style={{ margin: "0 0 6px 0", color: "var(--q-text, #f0f7f5)" }}>No Ahadith Found</h4>
            <p style={{ margin: 0, fontSize: "14px" }}>Try searching with another keyword or select another book/collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
