"use client";

// Homepage: navigation, live search, theme, language,
// Islamic calendar aur Islamic knowledge cards.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchIndex } from "@/data/search";
import { searchContent } from "@/data/search/engine";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

// Main menu categories aur unki subcategories.
const navItems: MenuItem[] = [
  { label: "Home", href: "/", children: [] },
  {
    label: "Ala Hazrat",
    href: "/ala-hazrat",
    children: [
      {
        label: "Seerat",
        href: "/ala-hazrat/seerat",
        children: [
          { label: "Birth & Family", href: "/seerat/birth-and-family" },
          { label: "Seerat", href: "/ala-hazrat/seerat" },
          {
            label: "Introduction",
            href: "/ala-hazrat/seerat/introduction",
          },
        ],
      },
      { label: "Books", href: "/islamic-books" },
      { label: "Fatawa Razawiyya", href: "/fatawa-razawiyya" },
      { label: "Hadaiq-e-Bakhshish", href: "/hadaiq-e-bakhshish" },
      { label: "Kanz-ul-Iman", href: "/kanz-ul-iman" },
      { label: "Teachers", href: "/ala-hazrat/teachers" },
      { label: "Students", href: "/ala-hazrat/students" },
      { label: "Family", href: "/ala-hazrat/family" },
      { label: "Research", href: "/ala-hazrat/research" },
    ],
  },
  {
    label: "Qur’an",
    href: "/quran",
    children: [
      { label: "Read Qur’an", href: "/quran" },
      {
        label: "Qur’an Samajhne Ka Safar",
        href: "/quran-samajhne-ka-safar",
      },
    ],
  },
  {
    label: "Gulzar-e-Millat",
    href: "/gulzar-e-millat",
    children: [{ label: "Biography", href: "/gulzar-e-millat" }],
  },
  { label: "Hadith", href: "/hadith", children: [] },
  { label: "Seerat-un-Nabi ﷺ", href: "/seerat-un-nabi", children: [] },
  {
    label: "Poet",
    href: "/artist-biography",
    children: [
      { label: "Artist Biography", href: "/artist-biography" },
      { label: "Naat / Manqabat", href: "/naat-manqabat" },
    ],
  },
  {
    label: "Books",
    href: "/islamic-books",
    children: [
      { label: "Islamic Books", href: "/islamic-books" },
      { label: "Fatawa Razawiyya", href: "/fatawa-razawiyya" },
      { label: "Hadaiq-e-Bakhshish", href: "/hadaiq-e-bakhshish" },
      { label: "Kanz-ul-Iman", href: "/kanz-ul-iman" },
    ],
  },
  { label: "Ilm Ka Safar", href: "/ilm-ka-safar", children: [] },
  {
    label: "More",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

// Homepage cards: har card ka destination define hai.
const knowledgeCards = [
  {
    title: "Al-Hadith",
    href: "/hadith",
    arabic: "الحديث",
    text: "Authentic Ahadith and Islamic teachings.",
    icon: "ﷺ",
  },
  {
    title: "Naat & Manqabat",
    href: "/naat-manqabat",
    arabic: "نعت و منقبت",
    text: "Beautiful Naat, Manqabat and Islamic poetry.",
    icon: "♡",
  },
  {
    title: "Islamic Books",
    href: "/islamic-books",
    arabic: "اسلامی کتب",
    text: "Islamic books, literature and valuable works.",
    icon: "▤",
  },
  {
    title: "Seerat-un-Nabi ﷺ",
    href: "/seerat-un-nabi",
    arabic: "سیرت النبی ﷺ",
    text: "Life and teachings of the Beloved Prophet ﷺ.",
    icon: "ﷴ",
  },
  {
    title: "Ala Hazrat",
    href: "/ala-hazrat",
    arabic: "اعلیٰ حضرت",
    text: "Knowledge, writings and works of Ala Hazrat.",
    icon: "✦",
  },
];

// Header language icon.
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3C9.8 5.4 8.7 8.4 8.7 12s1.1 6.6 3.3 9" />
    </svg>
  );
}

// Header theme icon.
function SunMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
    </svg>
  );
}

export default function Home() {
  // Menu navigation state.
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState("Home");
  const [selectedMenuSubcategory, setSelectedMenuSubcategory] =
    useState<MenuItem | null>(null);
  const [menuSearchQuery, setMenuSearchQuery] = useState("");

  // Search menu categories and nested subcategories.
  const menuSearchResults = useMemo(() => {
    const query = menuSearchQuery.trim().toLowerCase();
    if (!query) return [];

    const results: { item: MenuItem; path: string[] }[] = [];

    function searchItems(items: MenuItem[], parentPath: string[] = []) {
      for (const item of items) {
        const currentPath = [...parentPath, item.label];

        if (item.label.toLowerCase().includes(query)) {
          results.push({ item, path: currentPath });
        }

        if (item.children?.length) {
          searchItems(item.children, currentPath);
        }
      }
    }

    searchItems(navItems);
    return results;
  }, [menuSearchQuery]);

  // Language and theme controls.
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [language, setLanguage] = useState("auto");
  const [theme, setTheme] = useState("auto");

  // Islamic calendar dates.
  const [date, setDate] = useState({
    gregorian: "",
    hijri: "",
  });

  // Main homepage search.
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  function handleSearch() {
    const query = searchQuery.trim();
    if (!query) return;

    window.location.href = "/search?q=" + encodeURIComponent(query);
  }

  // Delay live search slightly to avoid running it on every keystroke.
  useEffect(() => {
    const query = searchQuery.trim();
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(query);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  // Generate compact live suggestions, avoiding repeated Quran ayahs
  // from the same Surah in the homepage suggestion list.
  const liveSearchResults = useMemo(() => {
    const query = debouncedSearchQuery;
    if (!query) return [];

    const results = searchContent(searchIndex, query);
    const uniqueResults: typeof results = [];
    const seen = new Set<string>();

    for (const result of results) {
      const document = result.document;

      const normalizedHref = document.href
        .split("#")[0]
        .split("?")[0]
        .replace(/\/+$/, "");

      const key =
        document.type === "quran"
          ? `quran-surah:${document.surahNumber ?? document.title}`
          : `${document.type}:${normalizedHref}`;

      if (seen.has(key)) continue;

      seen.add(key);
      uniqueResults.push(result);

      if (uniqueResults.length === 6) break;
    }

    return uniqueResults;
  }, [debouncedSearchQuery]);

  // Restore saved preferences and calculate today's dates.
  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") || "auto";
    const savedTheme = localStorage.getItem("site-theme") || "auto";

    setLanguage(savedLanguage);
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const today = new Date();

    const gregorian = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);

    let hijri = "";

    try {
      hijri = new Intl.DateTimeFormat("ur-SA-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(today);
    } catch {
      hijri = new Intl.DateTimeFormat("en-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(today);
    }

    setDate({ gregorian, hijri });
  }, []);

  // Apply selected theme while preserving the existing CSS theme classes.
  function applyTheme(value: string) {
    const root = document.documentElement;

    if (value === "dark") {
      root.classList.add("dark");
    } else if (value === "light") {
      root.classList.remove("dark");
    } else {
      const dark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      root.classList.toggle("dark", dark);
    }
  }

  function changeTheme(value: string) {
    setTheme(value);
    localStorage.setItem("site-theme", value);
    applyTheme(value);
    setThemeOpen(false);
  }

  function changeLanguage(value: string) {
    setLanguage(value);
    localStorage.setItem("site-language", value);
    setLanguageOpen(false);
  }

  return (
    <main className="site">
      {/* HEADER: brand, preferences and responsive navigation. */}
      <header className="siteHeader">
        <div className="headerInner">
          <Link href="/" className="brand">
            <span className="brandMark">م</span>
            <span>Maslak-e-Ala Hazrat</span>
          </Link>

          <div className="headerActions">
            {/* Language selector. */}
            <div className="control">
              <button
                type="button"
                className="iconButton"
                aria-label="Language"
                aria-expanded={languageOpen}
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setThemeOpen(false);
                }}
              >
                <GlobeIcon />
              </button>

              {languageOpen && (
                <div className="popup languagePopup">
                  <div className="popupTitle">Language</div>

                  {[
                    ["auto", "Auto"],
                    ["en", "English"],
                    ["hi", "हिन्दी"],
                    ["ur", "اردو"],
                  ].map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={language === value ? "activeOption" : ""}
                      onClick={() => changeLanguage(value)}
                    >
                      <span>{label}</span>
                      {language === value && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Light, dark and system theme selector. */}
            <div className="control">
              <button
                type="button"
                className="iconButton"
                aria-label="Theme"
                aria-expanded={themeOpen}
                onClick={() => {
                  setThemeOpen(!themeOpen);
                  setLanguageOpen(false);
                }}
              >
                <SunMoonIcon />
              </button>

              {themeOpen && (
                <div className="popup themePopup">
                  <div className="popupTitle">Theme</div>

                  {[
                    ["auto", "Auto"],
                    ["light", "Light"],
                    ["dark", "Dark"],
                  ].map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={theme === value ? "activeOption" : ""}
                      onClick={() => changeTheme(value)}
                    >
                      <span>{label}</span>
                      {theme === value && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Three-line menu button. */}
            <button
              type="button"
              className="menuButton"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setLanguageOpen(false);
                setThemeOpen(false);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Expandable category menu with menu-specific search. */}
        {menuOpen && (
          <div className="mobileMenu">
            <div className="menuInner">
              <input
                type="search"
                className="menuSearchInput"
                placeholder="Search books, Qur’an, Ala Hazrat..."
                value={menuSearchQuery}
                onChange={(event) => setMenuSearchQuery(event.target.value)}
                aria-label="Search website menu"
              />

              {menuSearchQuery.trim() !== "" && (
                <div className="menuSearchResults">
                  {menuSearchResults.length > 0 ? (
                    menuSearchResults.map(({ item, path }) => (
                      <button
                        type="button"
                        key={`${path.join("/")}-${item.href}`}
                        className="menuSearchResult"
                        onClick={() => {
                          if (item.children?.length) {
                            const topCategory = navItems.find(
                              (category) => category.label === path[0]
                            );

                            if (topCategory) {
                              setSelectedMenuCategory(topCategory.label);
                            }

                            setSelectedMenuSubcategory(item);
                            setMenuSearchQuery("");
                          } else {
                            window.location.href = item.href;
                            setMenuOpen(false);
                            setMenuSearchQuery("");
                          }
                        }}
                      >
                        <span>{item.label}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    ))
                  ) : (
                    <div className="menuSearchEmpty">
                      No menu options found
                    </div>
                  )}
                </div>
              )}

              {!menuSearchQuery.trim() && (
                <div className="menuCategoryRow">
                  {navItems.map((item) => (
                    <button
                      type="button"
                      key={item.label}
                      className={
                        selectedMenuCategory === item.label
                          ? "menuCategory active"
                          : "menuCategory"
                      }
                      onClick={() => {
                        setSelectedMenuCategory(item.label);
                        setSelectedMenuSubcategory(null);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {!menuSearchQuery.trim() &&
                (() => {
                  const selectedCategory = navItems.find(
                    (item) => item.label === selectedMenuCategory
                  );

                  const visibleItems: MenuItem[] = selectedMenuSubcategory
                    ? selectedMenuSubcategory.children ?? []
                    : selectedCategory?.children ?? [];

                  return visibleItems.length > 0 ? (
                    <div className="menuSubcategoryRow">
                      {visibleItems.map((item) =>
                        item.children?.length ? (
                          <button
                            type="button"
                            key={`${item.label}-${item.href}`}
                            className="menuSubcategory"
                            onClick={() => setSelectedMenuSubcategory(item)}
                          >
                            {item.label} <span aria-hidden="true">→</span>
                          </button>
                        ) : (
                          <Link
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            className="menuSubcategory"
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  ) : selectedCategory ? (
                    <div className="menuSubcategoryRow">
                      <Link
                        href={selectedCategory.href}
                        className="menuSubcategory"
                        onClick={() => setMenuOpen(false)}
                      >
                        Open {selectedCategory.label} →
                      </Link>
                    </div>
                  ) : null;
                })()}
            </div>
          </div>
        )}
      </header>

      {/* HERO: Bismillah and the main Islamic knowledge search. */}
      <section className="hero">
        <div className="heroInner">
          <div className="bismillah">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <div className="searchArea">
            <div className="searchBox">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
                placeholder="Search Islamic knowledge..."
                aria-label="Search Islamic knowledge"
              />

              <button type="button" onClick={handleSearch}>
                Search
              </button>
            </div>

            {/* Live suggestions from the existing search engine. */}
            {searchQuery.trim() && (
              <div className="liveSearchResults">
                {liveSearchResults.length > 0 ? (
                  liveSearchResults.map(({ document }) => (
                    <Link
                      key={document.id}
                      href={document.href}
                      className="liveSearchItem"
                    >
                      <div className="liveSearchInfo">
                        <strong>{document.title}</strong>
                        <span>
                          {document.type === "quran"
                            ? "Qur’an"
                            : document.type === "ilm-ka-safar"
                              ? "Ilm Ka Safar"
                              : "Islamic Knowledge"}
                        </span>
                      </div>

                      <div className="liveSearchArabic">
                        {document.arabic ||
                          document.urdu ||
                          document.hindi ||
                          document.text}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="liveSearchEmpty">No results found</div>
                )}

                {liveSearchResults.length > 0 && (
                  <button
                    type="button"
                    className="viewAllSearch"
                    onClick={handleSearch}
                  >
                    View all results →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ISLAMIC CALENDAR: today's Hijri and Gregorian dates. */}
      <section className="calendarSection">
        <Link href="/islamic-calendar" className="calendarCard">
          <div className="calendarIcon">☪</div>

          <div className="calendarContent">
            <span className="calendarLabel">آج کی تاریخ</span>
            <strong className="hijriDate">
              {date.hijri || "اسلامی تاریخ"}
            </strong>
            <span className="gregorianDate">
              {date.gregorian || "Loading..."}
            </span>
          </div>

          <div className="calendarArabic">اسلامی کیلنڈر</div>
        </Link>
      </section>

      {/* KNOWLEDGE: Quran feature card and category cards. */}
      <section className="knowledgeSection">
        <div className="sectionHeading">
          <span>EXPLORE</span>
          <h2>Islamic Knowledge</h2>
          <p>
            Explore authentic Islamic knowledge, literature, Hadith,
            Naat and works of our scholars.
          </p>
        </div>

        {/* Dedicated Quran card. */}
        <div className="quranWrap">
          <Link href="/quran" className="knowledgeCard quranCard">
            <div className="cardIcon">﷽</div>

            <div>
              <span className="arabicTitle">القرآن الكريم</span>
              <h3>Quran</h3>
              <p>Read and explore the Holy Quran with ease.</p>
            </div>

            <span className="cardArrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Category cards use their own destination paths instead of "#". */}
        <div className="horizontalCards">
          {knowledgeCards.map((card) => (
            <Link
              href={card.href}
              className="knowledgeCard smallCard"
              key={card.title}
            >
              <div className="cardIcon">{card.icon}</div>

              <div>
                <span className="arabicTitle">{card.arabic}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>

              <span className="cardArrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT: short introduction to the website. */}
      <section className="aboutSection">
        <div className="aboutBox">
          <span>ABOUT THE WEBSITE</span>
          <h2>Knowledge • Adab • Tradition</h2>
          <p>
            Maslak-e-Ala Hazrat is being developed as a peaceful and
            organized platform for Islamic knowledge, books, Hadith,
            Naat, Manqabat and biographies of Islamic personalities.
          </p>
        </div>
      </section>

      {/* FOOTER: website identity and copyright. */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">Maslak-e-Ala Hazrat</div>
          <p>Islamic Knowledge • Naat • Books • Hadith</p>
          <div className="footerLine" />
          <small>
            © {new Date().getFullYear()} Maslak-e-Ala Hazrat.
            All rights reserved.
          </small>
        </div>
      </footer>
    </main>
  );
                          }
