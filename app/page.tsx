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
      { label: "Seerat", href: "/ala-hazrat/seerat" },
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
    children: [
      { label: "Biography", href: "/gulzar-e-millat" },
    ],
  },
  {
    label: "Hadith",
    href: "/hadith",
    children: [],
  },
  {
    label: "Seerat-un-Nabi ﷺ",
    href: "/seerat-un-nabi",
    children: [],
  },
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
  {
    label: "Ilm Ka Safar",
    href: "/ilm-ka-safar",
    children: [],
  },
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
    arabic: "الحديث",
    text: "Authentic Ahadith and Islamic teachings.",
    icon: "ﷺ",
  },
  {
    title: "Naat & Manqabat",
    arabic: "نعت و منقبت",
    text: "Beautiful Naat, Manqabat and Islamic poetry.",
    icon: "♡",
  },
  {
    title: "Islamic Books",
    arabic: "اسلامی کتب",
    text: "Islamic books, literature and valuable works.",
    icon: "▤",
  },
  {
    title: "Seerat-un-Nabi ﷺ",
    arabic: "سیرت النبی ﷺ",
    text: "Life and teachings of the Beloved Prophet ﷺ.",
    icon: "ﷴ",
  },
  {
    title: "Ala Hazrat",
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

const [selectedMenuCategory, setSelectedMenuCategory] =
  useState("Home");

const [selectedMenuSubcategory, setSelectedMenuSubcategory] =
  useState<MenuItem | null>(null);

const [menuSearchQuery, setMenuSearchQuery] = useState("");

  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const [language, setLanguage] = useState("auto");
  const [theme, setTheme] = useState("auto");

  const [date, setDate] = useState({
    gregorian: "",
    hijri: "",
  });

const [searchQuery, setSearchQuery] = useState("");
const [readingProgress, setReadingProgress] = useState<{
  type: string;
  title: string;
  subtitle: string;
  url: string;
} | null>(null);
  
function handleSearch() {
  const query = searchQuery.trim();

  if (!query) {
    return;
  }

  window.location.href =
    "/search?q=" + encodeURIComponent(query);
}
const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

useEffect(() => {
  const query = searchQuery.trim();

  const timer = setTimeout(() => {
    setDebouncedSearchQuery(query);
  }, 250);

  return () => clearTimeout(timer);
}, [searchQuery]);

const liveSearchResults = useMemo(() => {
  const query = debouncedSearchQuery;

  if (!query) return [];

  const results = searchContent(searchIndex, query);

  // Live suggestions mein ek hi Surah ki baar-baar aane wali
  // ayaton ki jagah us Surah ka sirf ek result dikhao.
  const uniqueResults = [];
  const seen = new Set<string>();

  for (const result of results) {
    const document = result.document;

    const key =
      document.type === "quran"
        ? `quran-surah:${document.surahNumber ?? document.title}`
        : `${document.type}:${document.href.split("#")[0].split("?")[0].replace(/\/+$/, "")}`;

    if (seen.has(key)) continue;

    seen.add(key);
    uniqueResults.push(result);

    if (uniqueResults.length === 6) break;
  }

  return uniqueResults;
}, [debouncedSearchQuery]);

  useEffect(() => {
    
    const savedLanguage = localStorage.getItem("site-language") || "auto";

    const savedReadingProgress =
  localStorage.getItem("maslak-reading-progress");

if (savedReadingProgress) {
  try {
    setReadingProgress(
      JSON.parse(savedReadingProgress)
    );
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

    setDate({
      gregorian,
      hijri,
    });
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

  return (
    <main className="site">

      {/* HEADER */}
      <header className="siteHeader">
        <div className="headerInner">

          <a href="/" className="brand">
            <span className="brandMark">م</span>
            <span>Maslak-e-Ala Hazrat</span>
          </a>

          <div className="headerActions">

            {/* LANGUAGE */}
            <div className="control">
              <button
                className="iconButton"
                aria-label="Language"
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

            {/* THEME */}
            <div className="control">
              <button
                className="iconButton"
                aria-label="Theme"
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

            {/* MENU */}
            <button
              className="menuButton"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>

        {menuOpen && (
  <div className="mobileMenu">
    <div className="menuInner">
      <input
        type="search"
        className="menuSearchInput"
        placeholder="Search books, Qur’an, Ala Hazrat..."
        value={menuSearchQuery}
        onChange={(e) => setMenuSearchQuery(e.target.value)}
        aria-label="Search website"
      />

      <div className="menuCategoryRow">
        {navItems.map((item) => (
          <button
            key={item.href}
            type="button"
            className={
              selectedMenuCategory === item.label
                ? "menuCategory active"
                : "menuCategory"
            }
            onClick={() => {
              setSelectedMenuCategory(item.label);
              setSelectedMenuSubcategory(null);
              setMenuSearchQuery("");
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {(() => {
        const selectedCategory = navItems.find(
          (item) => item.label === selectedMenuCategory
        );

        const selectedSubcategory =
          selectedCategory?.children?.find(
        (item) => item.label === selectedMenuSubcategory?.label
          );

        const visibleItems =
          selectedSubcategory?.children?.length
            ? selectedSubcategory.children
            : selectedCategory?.children ?? [];

        return visibleItems.length > 0 ? (
          <div className="menuSubcategoryRow">
            {visibleItems.map((item) => (
              <button
                key={item.href + item.label}
                type="button"
                className="menuSubcategory"
                onClick={() => {
                  if (item.children?.length) {
                    setSelectedMenuSubcategory(item.label);
                  } else {
                    window.location.href = item.href;
                    setMenuOpen(false);
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null;
      })()}
    </div>
  </div>
)}
        
      </header>


      {/* HERO */}
      <section className="hero">
        <div className="heroInner">

          <div className="bismillah">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <div className="searchArea">

  <div className="searchBox">
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
      />

      <path d="m16.5 16.5 4 4" />
    </svg>

    <input
      type="search"
      value={searchQuery}
      onChange={(event) =>
        setSearchQuery(event.target.value)
      }
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleSearch();
        }
      }}
      placeholder="Search Islamic knowledge..."
      aria-label="Search Islamic knowledge"
    />

    <button
      type="button"
      onClick={handleSearch}
    >
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
        <div className="liveSearchEmpty">
              No results found
        </div>
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

{/* CONTINUE READING */}

{readingProgress && (
  <section className="continueReadingSection">

    <Link
      href={readingProgress.url}
      className="continueReadingCircle"
      aria-label={`Continue reading ${readingProgress.title}`}
    >

      <div className="continueReadingCircleInner">

        <span className="continueReadingLabel">
          CONTINUE
        </span>

        <strong>
          {readingProgress.title}
        </strong>

        <span>
          {readingProgress.subtitle}
        </span>

      </div>

    </Link>

  </section>
)}

{/* ISLAMIC CALENDAR */}

<section className="calendarSection">
  <Link href="/islamic-calendar" className="calendarCard">

    <div className="calendarIcon">
      ☪
    </div>

    <div className="calendarContent">

      <span className="calendarLabel">
        آج کی تاریخ
      </span>

      <strong className="hijriDate">
        {date.hijri || "اسلامی تاریخ"}
      </strong>

      <span className="gregorianDate">
        {date.gregorian || "Loading..."}
      </span>

    </div>

    <div className="calendarArabic">
      اسلامی کیلنڈر
    </div>

  </Link>
</section>
      

      {/* ISLAMIC KNOWLEDGE */}
      <section className="knowledgeSection">

        <div className="sectionHeading">
          <span>EXPLORE</span>
          <h2>Islamic Knowledge</h2>
          <p>
            Explore authentic Islamic knowledge, literature,
            Hadith, Naat and works of our scholars.
          </p>
        </div>


        {/* QURAN CARD — stays separate */}
        <div className="quranWrap">
          <a href="/quran" className="knowledgeCard quranCard">

            <div className="cardIcon">﷽</div>

            <div>
              <span className="arabicTitle">القرآن الكريم</span>
              <h3>Quran</h3>
              <p>
                Read and explore the Holy Quran with ease.
              </p>
            </div>

            <span className="cardArrow">→</span>

          </a>
        </div>


        {/* HORIZONTAL SCROLL */}
        <div className="horizontalCards">
          {knowledgeCards.map((card) => (
            <a
              href="#"
              className="knowledgeCard smallCard"
              key={card.title}
            >
              <div className="cardIcon">{card.icon}</div>

              <div>
                <span className="arabicTitle">
                  {card.arabic}
                </span>

                <h3>{card.title}</h3>

                <p>{card.text}</p>
              </div>

              <span className="cardArrow">→</span>
            </a>
          ))}
        </div>

      </section>


      {/* ABOUT */}
      <section className="aboutSection">
        <div className="aboutBox">
          <span>ABOUT THE WEBSITE</span>

          <h2>Knowledge • Adab • Tradition</h2>

          <p>
            Maslak-e-Ala Hazrat is being developed as a
            peaceful and organized platform for Islamic
            knowledge, books, Hadith, Naat, Manqabat and
            biographies of Islamic personalities.
          </p>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="footer">
        <div className="footerInner">

          <div className="footerBrand">
            Maslak-e-Ala Hazrat
          </div>

          <p>
            Islamic Knowledge • Naat • Books • Hadith
          </p>

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
