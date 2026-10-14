"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchIndex } from "@/data/search";
import { searchContent } from "@/data/search/engine";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

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

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3C9.8 5.4 8.7 8.4 8.7 12s1.1 6.6 3.3 9" />
    </svg>
  );
}

function SunMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("Home");
  const [selectedMenuSubcategory, setSelectedMenuSubcategory] =
    useState<MenuItem | null>(null);
  const [menuSearchQuery, setMenuSearchQuery] = useState("");

  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [language, setLanguage] = useState("auto");
  const [theme, setTheme] = useState("auto");

  const [date, setDate] = useState({ gregorian: "", hijri: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

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

  function handleSearch() {
    const query = searchQuery.trim();
    if (!query) return;
    window.location.href = "/search?q=" + encodeURIComponent(query);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

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

  function closeMenu() {
    setMenuOpen(false);
    setSelectedMenuSubcategory(null);
    setMenuSearchQuery("");
  }

  return (
    <main className="site">
      <header className="siteHeader">
        <div className="headerInner">
          <Link href="/" className="brand" onClick={closeMenu}>
            <span className="brandMark">م</span>
            <span>Maslak-e-Ala Hazrat</span>
          </Link>

          <div className="headerActions">
            <div className="control">
              <button
                type="button"
                className="iconButton"
                aria-label="Language"
                aria-expanded={languageOpen}
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setThemeOpen(false);
                  setMenuOpen(false);
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

            <div className="control">
              <button
                type="button"
                className="iconButton"
                aria-label="Theme"
                aria-expanded={themeOpen}
                onClick={() => {
                  setThemeOpen(!themeOpen);
                  setLanguageOpen(false);
                  setMenuOpen(false);
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

            {/* Quran.com-style three-dot menu button */}
            <button
              type="button"
              className="menuButton"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
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

        {/* Side drawer and background overlay */}
        {menuOpen && (
          <>
            <button
              type="button"
              className="menuOverlay"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            />

            <aside
              id="site-navigation"
              className="mobileMenu"
              aria-label="Main navigation"
            >
              <div className="drawerHeader">
                <Link href="/" className="drawerBrand" onClick={closeMenu}>
                  <span className="brandMark">م</span>
                  <span>Maslak-e-Ala Hazrat</span>
                </Link>

                <button
                  type="button"
                  className="drawerClose"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  ✕
                </button>
              </div>

              <div className="drawerSearch">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Search menu..."
                  value={menuSearchQuery}
                  onChange={(event) => {
                    setMenuSearchQuery(event.target.value);
                    setSelectedMenuSubcategory(null);
                  }}
                  aria-label="Search menu"
                />
              </div>

              {menuSearchQuery.trim() ? (
                <div className="drawerSearchResults">
                  {menuSearchResults.length > 0 ? (
                    menuSearchResults.map(({ item, path }) => (
                      <button
                        type="button"
                        className="drawerSearchResult"
                        key={`${path.join("/")}-${item.href}`}
                        onClick={() => {
                          if (item.children?.length) {
                            setSelectedMenuCategory(path[0]);
                            setSelectedMenuSubcategory(item);
                            setMenuSearchQuery("");
                          } else {
                            window.location.href = item.href;
                          }
                        }}
                      >
                        <span>{item.label}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    ))
                  ) : (
                    <p className="drawerEmpty">No menu options found.</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="drawerSectionLabel">EXPLORE</div>

                  <nav className="drawerCategories">
                    {navItems.map((item) => (
                      <button
                        type="button"
                        key={item.label}
                        className={
                          selectedMenuCategory === item.label &&
                          !selectedMenuSubcategory
                            ? "drawerCategory active"
                            : "drawerCategory"
                        }
                        onClick={() => {
                          setSelectedMenuCategory(item.label);
                          setSelectedMenuSubcategory(null);
                        }}
                      >
                        <span>{item.label}</span>
                        <span className="drawerChevron" aria-hidden="true">
                          {item.children?.length ? "›" : "→"}
                        </span>
                      </button>
                    ))}
                  </nav>

                  <div className="drawerSubcategories">
                    {selectedMenuSubcategory && (
                      <button
                        type="button"
                        className="drawerBack"
                        onClick={() => setSelectedMenuSubcategory(null)}
                      >
                        <span aria-hidden="true">←</span>
                        {selectedMenuCategory}
                      </button>
                    )}

                    {(selectedMenuSubcategory
                      ? selectedMenuSubcategory.children ?? []
                      : navItems.find(
                          (item) => item.label === selectedMenuCategory
                        )?.children ?? []
                    ).map((item) =>
                      item.children?.length ? (
                        <button
                          type="button"
                          key={`${item.label}-${item.href}`}
                          className="drawerSubcategory"
                          onClick={() => setSelectedMenuSubcategory(item)}
                        >
                          <span>{item.label}</span>
                          <span aria-hidden="true">›</span>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          key={`${item.label}-${item.href}`}
                          className="drawerSubcategory"
                          onClick={closeMenu}
                        >
                          <span>{item.label}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      )
                    )}

                    {!selectedMenuSubcategory &&
                      !navItems.find(
                        (item) => item.label === selectedMenuCategory
                      )?.children?.length && (
                        <Link
                          href={
                            navItems.find(
                              (item) => item.label === selectedMenuCategory
                            )?.href ?? "/"
                          }
                          className="drawerSubcategory"
                          onClick={closeMenu}
                        >
                          <span>
                            Open {selectedMenuCategory}
                          </span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}
                  </div>
                </>
              )}

              <div className="drawerFooter">
                <span className="brandMark">م</span>
                <div>
                  <strong>Maslak-e-Ala Hazrat</strong>
                  <small>Islamic Knowledge • Adab • Tradition</small>
                </div>
              </div>
            </aside>
          </>
        )}
      </header>

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

      <section className="knowledgeSection">
        <div className="sectionHeading">
          <span>EXPLORE</span>
          <h2>Islamic Knowledge</h2>
          <p>
            Explore authentic Islamic knowledge, literature, Hadith,
            Naat and works of our scholars.
          </p>
        </div>

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

      {/* Drawer styling: included here so this file is self-contained. */}
      <style jsx global>{`
        .menuButton {
          position: relative;
          z-index: 1203;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 42px;
          height: 42px;
          padding: 10px;
          border: 1px solid var(--border-color, #e2e8e5);
          border-radius: 12px;
          background: var(--card-bg, #fff);
          color: var(--text-color, #173c30);
          cursor: pointer;
          flex-shrink: 0;
        }

        .menuButton span {
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: currentColor;
        }

        .menuOverlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          width: 100%;
          height: 100%;
          border: 0;
          background: rgba(9, 22, 17, 0.5);
          backdrop-filter: blur(2px);
          animation: drawerFadeIn 0.2s ease;
        }

        .mobileMenu {
          position: fixed;
          z-index: 1202;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          width: min(390px, 90vw);
          height: 100dvh;
          padding: 0;
          overflow: hidden;
          overflow-y: auto;
          background: var(--background, #fff);
          color: var(--foreground, #183b30);
          border-left: 1px solid rgba(30, 70, 52, 0.12);
          box-shadow: -12px 0 40px rgba(0, 0, 0, 0.16);
          animation: drawerSlideIn 0.25s ease;
        }

        .drawerHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 18px;
          border-bottom: 1px solid var(--border-color, #e5ebe7);
        }

        .drawerBrand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: inherit;
          text-decoration: none;
          font-size: 15px;
          font-weight: 750;
        }

        .drawerBrand .brandMark {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #176849;
          color: white;
          font-size: 23px;
        }

        .drawerClose {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border: 1px solid var(--border-color, #e2e8e5);
          border-radius: 11px;
          background: var(--card-bg, #fff);
          color: inherit;
          font-size: 17px;
          cursor: pointer;
        }

        .drawerSearch {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 16px 16px 12px;
          padding: 0 13px;
          min-height: 46px;
          border: 1px solid var(--border-color, #dfe8e2);
          border-radius: 12px;
          background: var(--card-bg, #fff);
          color: inherit;
        }

        .drawerSearch > span {
          font-size: 24px;
          line-height: 1;
          opacity: 0.7;
        }

        .drawerSearch input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          font-size: 14px;
        }

        .drawerSectionLabel {
          padding: 12px 20px 8px;
          color: #74877c;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .drawerCategories {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 12px 12px;
        }

        .drawerCategory,
        .drawerSubcategory,
        .drawerSearchResult {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 45px;
          padding: 11px 14px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: inherit;
          text-align: left;
          text-decoration: none;
          font: inherit;
          font-size: 14px;
          cursor: pointer;
        }

        .drawerCategory.active {
          background: rgba(23, 104, 73, 0.11);
          color: #176849;
          font-weight: 750;
        }

        .drawerChevron {
          font-size: 23px;
          opacity: 0.65;
        }

        .drawerSubcategories {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin: 0 16px 16px;
          padding: 10px;
          border: 1px solid var(--border-color, #e5ebe7);
          border-radius: 13px;
          background: var(--card-bg, #fff);
        }

        .drawerSubcategory {
          min-height: 41px;
          padding: 9px 10px;
          font-size: 13px;
        }

        .drawerSubcategory:hover,
        .drawerSearchResult:hover {
          background: rgba(23, 104, 73, 0.08);
        }

        .drawerBack {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 10px 12px;
          margin-bottom: 5px;
          border: 0;
          border-bottom: 1px solid var(--border-color, #e5ebe7);
          background: transparent;
          color: #176849;
          text-align: left;
          font: inherit;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
        }

        .drawerSearchResults {
          padding: 0 12px 16px;
        }

        .drawerSearchResult {
          min-height: 44px;
          border-bottom: 1px solid var(--border-color, #e5ebe7);
          border-radius: 0;
        }

        .drawerEmpty {
          padding: 12px;
          color: #74877c;
          font-size: 13px;
        }

        .drawerFooter {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding: 18px;
          border-top: 1px solid var(--border-color, #e5ebe7);
          background: var(--card-bg, #fff);
        }

        .drawerFooter .brandMark {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #176849;
          color: #fff;
          font-size: 23px;
        }

        .drawerFooter div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .drawerFooter strong {
          font-size: 12px;
        }

        .drawerFooter small {
          color: #74877c;
          font-size: 10px;
        }

        @keyframes drawerSlideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes drawerFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobileMenu,
          .menuOverlay {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
                }
