"use client";

import "./home.css";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchIndex } from "@/data/search";
import {
  searchContent,
  findExactAyahReference,
} from "@/data/search/engine";

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
          { label: "Introduction", href: "/ala-hazrat/seerat/introduction" },
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
      { label: "Qur’an Samajhne Ka Safar", href: "/quran-samajhne-ka-safar" },
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
    title: "Islamic Books",
    href: "/islamic-books",
    arabic: "اسلامی کتب",
    text: "Islamic books, literature and valuable works.",
    icon: "▤",
  },
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
  }
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

  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [drawerLanguageOpen, setDrawerLanguageOpen] = useState(false);
  const [drawerThemeOpen, setDrawerThemeOpen] = useState(false);

  const [language, setLanguage] = useState("auto");
  const [theme, setTheme] = useState("auto");

  const [date, setDate] = useState({ gregorian: "", hijri: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [readingProgress, setReadingProgress] = useState<{
    type: string;
    title: string;
    subtitle: string;
    url: string;
  } | null>(null);

  const [searchMode, setSearchMode] = useState<"top" | "bottom" | "hidden">("top");
  const [headerHidden, setHeaderHidden] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  function handleSearch() {
    const query = searchQuery.trim();
    if (!query) return;
    window.location.href = "/search?q=" + encodeURIComponent(query);
  }

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const query = searchQuery.trim();
    const timer = setTimeout(() => setDebouncedSearchQuery(query), 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const liveSearchResults = useMemo(() => {
    const query = debouncedSearchQuery;
    if (!query) return [];

    const results = searchContent(searchIndex, query);
    const uniqueResults: typeof results = [];
    const seen = new Set<string>();

    for (const result of results) {
      const document = result.document;
      const key =
        document.type === "quran"
          ? `quran-surah:${document.surahNumber ?? document.title}`
          : `${document.type}:${document.href
              .split("#")[0]
              .split("?")[0]
              .replace(/\/+$/, "")}`;

      if (seen.has(key)) continue;
      seen.add(key);
      uniqueResults.push(result);
      if (uniqueResults.length === 6) break;
    }

    return uniqueResults;
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") || "auto";
    const savedReadingProgress = localStorage.getItem("maslak-reading-progress");

    if (savedReadingProgress) {
      try {
        setReadingProgress(JSON.parse(savedReadingProgress));
      } catch {
        setReadingProgress(null);
      }
    }

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

  useEffect(() => {
    if (!menuOpen) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentY = window.scrollY;
      const difference = currentY - lastScrollY;

      if (searchFocused) {
        setSearchMode("bottom");
        setHeaderHidden(true);
      } else if (currentY < 100) {
        setSearchMode("top");
        setHeaderHidden(false);
      } else if (difference > 5) {
        setSearchMode("bottom");
        setHeaderHidden(true);
      } else if (difference < -5) {
        setSearchMode("hidden");
        setHeaderHidden(false);
      }

      lastScrollY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [searchFocused]);

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
      <header className={`siteHeader ${headerHidden ? "headerHidden" : ""}`}>
        <div className="headerInner">
          <a href="/" className="brand brandCentered">
            <span>Maslak-e-Ala Hazrat</span>
          </a>

          <div className="headerActions">
            <div className="control">
              <button
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

            <button
              className="menuButton"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              aria-haspopup="true"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <>
            <button
              type="button"
              className="menuBackdrop"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            />
            <aside
              className="mobileMenu"
              id="site-navigation"
              aria-label="Main navigation"
            >
              <div className="drawerHeader">
                <div className="drawerBrand">
                  <span className="brandMark">م</span>
                  <strong>Maslak-e-Ala Hazrat</strong>
                </div>
                <button
                  type="button"
                  className="drawerClose"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  ×
                </button>
              </div>

              <nav className="drawerNavigation" aria-label="Website sections">
                {navItems.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const expanded = selectedMenuCategory === item.label;
                  const icon =
                    item.label === "Home"
                      ? "⌂"
                      : item.label.includes("Qur")
                        ? "▤"
                        : item.label.includes("Hadith")
                          ? "▣"
                          : item.label.includes("Books")
                            ? "▤"
                            : item.label.includes("Ala Hazrat")
                              ? "✦"
                              : "◈";

                  return (
                    <div className="drawerNavGroup" key={item.href + item.label}>
                      <div className="drawerNavRow">
                        <span className="drawerNavIcon" aria-hidden="true">
                          {icon}
                        </span>
                        <Link
                          href={item.href}
                          className="drawerNavLink"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            className={`drawerExpand ${expanded ? "expanded" : ""}`}
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                            aria-expanded={expanded}
                            onClick={() =>
                              setSelectedMenuCategory(expanded ? "" : item.label)
                            }
                          >
                            <span />
                          </button>
                        )}
                      </div>

                      {hasChildren && expanded && (
                        <div className="drawerSubmenu">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href + child.label}
                              href={child.href}
                              className="drawerSubmenuLink"
                              onClick={() => setMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="drawerBottom">
                <button
                  type="button"
                  className="drawerPill"
                  onClick={() => {
                    setDrawerLanguageOpen((open) => !open);
                    setDrawerThemeOpen(false);
                  }}
                >
                  <GlobeIcon /> Language
                </button>
                <button
                  type="button"
                  className="drawerPill"
                  onClick={() => {
                    setDrawerThemeOpen((open) => !open);
                    setDrawerLanguageOpen(false);
                  }}
                >
                  <SunMoonIcon /> Change Theme
                </button>

                {drawerLanguageOpen && (
                  <div className="drawerOptions" aria-label="Choose language">
                    {[
                      ["auto", "Auto"],
                      ["en", "English"],
                      ["hi", "हिन्दी"],
                      ["ur", "اردو"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={language === value ? "activeOption" : ""}
                        onClick={() => {
                          changeLanguage(value);
                          setDrawerLanguageOpen(false);
                        }}
                      >
                        <span>{label}</span>
                        {language === value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}

                {drawerThemeOpen && (
                  <div className="drawerOptions" aria-label="Choose theme">
                    {[
                      ["auto", "Auto"],
                      ["light", "Light"],
                      ["dark", "Dark"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={theme === value ? "activeOption" : ""}
                        onClick={() => {
                          changeTheme(value);
                          setDrawerThemeOpen(false);
                        }}
                      >
                        <span>{label}</span>
                        {theme === value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}

                <Link
                  href="/contact"
                  className="drawerDonate"
                  onClick={() => setMenuOpen(false)}
                >
                  ✦ Support Our Work
                </Link>
              </div>
            </aside>
          </>
        )}
      </header>

      <section className="hero">
        <div className="heroInner">
          <div className="heroCalligraphy" aria-label="لا إله إلا الله محمد رسول الله">
            لا إله إلا الله محمد رسول الله
          </div>
          <div className="heroBrandTitle">Maslak-e-Ala Hazrat</div>
          <p className="heroTagline">Islamic Knowledge • Naat • Books • Hadith</p>

          <div className={`searchArea searchMode-${searchMode}`}>
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
                onFocus={() => {
                  setSearchFocused(true);
                  setSearchMode("bottom");
                  setHeaderHidden(true);
                }}
                onBlur={() => setSearchFocused(false)}
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



      <section className="knowledgeSection">
        <div className="sectionHeading">
          <span>EXPLORE</span>
          <h2>Islamic Knowledge</h2>
          <p>
            Explore authentic Islamic knowledge, literature, Hadith, Naat and
            works of our scholars.
          </p>
        </div>

        <div className="quranWrap">
          <Link href="/quran" className="knowledgeCard quranCard">
            <div className="cardIcon quranIcon" aria-hidden="true">▤</div>
            <div className="knowledgeCardContent">
              <span className="arabicTitle">القرآن الكريم</span>
              <h3>Quran</h3>
              <p>Read and explore the Holy Quran with ease.</p>
            </div>
            <span className="cardArrow">→</span>
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
              <div className="knowledgeCardContent">
                <span className="arabicTitle">{card.arabic}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
              <span className="cardArrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="aboutSection">
        <div className="aboutBox">
          <span>ABOUT THE WEBSITE</span>
          <h2>Knowledge • Adab • Tradition</h2>
          <p>
            Maslak-e-Ala Hazrat is being developed as a peaceful and organized
            platform for Islamic knowledge, books, Hadith, Naat, Manqabat and
            biographies of Islamic personalities.
          </p>
        </div>
      </section>

      <section className="calendarSection">
        <Link href="/islamic-calendar" className="calendarCard">
          <div className="calendarIcon">☪</div>
          <div className="calendarContent">
            <span className="calendarLabel">آج کی تاریخ</span>
            <strong className="hijriDate">{date.hijri || "اسلامی تاریخ"}</strong>
            <span className="gregorianDate">{date.gregorian || "Loading..."}</span>
          </div>
          <div className="calendarArabic">اسلامی کیلنڈر</div>
        </Link>
      </section>

      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">Maslak-e-Ala Hazrat</div>
          <p>Islamic Knowledge • Naat • Books • Hadith</p>
          <div className="footerLine" />
          <small>
            © {new Date().getFullYear()} Maslak-e-Ala Hazrat. All rights
            reserved.
          </small>
        </div>
      </footer>
    </main>
  );
}
