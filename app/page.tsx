"use client";

import { useEffect, useState } from "react";
import { quranAyahs } from "@/data/quran/ayahs";

const navItems = [
  ["Home", "/"],
  ["Ala Hazrat", "/ala-hazrat"],
  ["Naat / Manqabat", "/naat-manqabat"],
  ["Hadaiq-e-Bakhshish", "/hadaiq-e-bakhshish"],
  ["Fatawa Razawiyya", "/fatawa-razawiyya"],
  ["Kanz-ul-Iman", "/kanz-ul-iman"],
  ["Seerat-un-Nabi ﷺ", "/seerat-un-nabi"],
  ["Hadith", "/hadith"],

  ["Ilm Ka Safar", "/ilm-ka-safar"],
  ["Islamic Books", "/islamic-books"],
  ["Gulzar-e-Millat", "/gulzar-e-millat"],
  ["Qur’an Samajhne Ka Safar", "/quran-samajhne-ka-safar"],
  ["Artist Biography", "/artist-biography"],

  ["About", "/about"],
  ["Contact", "/contact"],
  ["Disclaimer", "/disclaimer"],
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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const [language, setLanguage] = useState("auto");
  const [theme, setTheme] = useState("auto");

  const [date, setDate] = useState({
    gregorian: "",
    hijri: "",
  });

const [searchQuery, setSearchQuery] = useState("");

function handleSearch() {
  const query = searchQuery.trim();

  if (!query) {
    return;
  }

  window.location.href =
    "/search?q=" + encodeURIComponent(query);
}
const liveSearchResults = searchQuery.trim()
  ? quranAyahs
      .filter((ayah) => {
        const query =
          searchQuery.trim().toLowerCase();

        return (
          ayah.arabic
            .toLowerCase()
            .includes(query) ||
          ayah.surahName
            .toLowerCase()
            .includes(query) ||
          ayah.surahNameArabic
            .toLowerCase()
            .includes(query)
        );
      })
      .slice(0, 6)
  : [];

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
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
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
        liveSearchResults.map((ayah) => (
          <a
            key={ayah.id}
            href={
              "/quran/" +
              ayah.surahNumber +
              "#ayah-" +
              ayah.ayahNumber
            }
            className="liveSearchItem"
          >

            <div className="liveSearchInfo">

              <strong>
                {ayah.surahName}
              </strong>

              <span>
                Ayat {ayah.ayahNumber}
              </span>

            </div>

            <div className="liveSearchArabic">
              {ayah.arabic}
            </div>

          </a>
        ))
      ) : (
        <div className="liveSearchEmpty">
          No Qur’an result found
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
          
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
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
            

        </div>
      </section>


      {/* URDU CALENDAR */}
      <section className="calendarSection">
        <div className="calendarCard">

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

          <div className="calendarArabic">
            اسلامی کیلنڈر
          </div>

        </div>
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
