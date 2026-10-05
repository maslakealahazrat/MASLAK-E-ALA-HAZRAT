"use client";

import { useState } from "react";

const navItems = [
  ["Home", "/"],
  ["Ala Hazrat", "/ala-hazrat"],
  ["Naat / Manqabat", "/naat-manqabat"],
  ["Hadaiq-e-Bakhshish", "/hadaiq-e-bakhshish"],
  ["Fatawa Razawiyya", "/fatawa-razawiyya"],
  ["Kanz-ul-Iman", "/kanz-ul-iman"],
  ["Seerat-un-Nabi ﷺ", "/seerat-un-nabi"],
  ["Hadith", "/hadith"],
  ["Islamic Books", "/islamic-books"],
  ["Artists", "/artists"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const featured = [
  {
    icon: "﷽",
    title: "Quran",
    text: "Read the Holy Quran with translations and a peaceful reading experience.",
    href: "/quran",
  },
  {
    icon: "ﷺ",
    title: "Al-Hadith",
    text: "Explore Hadith collections and valuable Islamic knowledge.",
    href: "/hadith",
  },
  {
    icon: "☾",
    title: "Naat & Manqabat",
    text: "Beautiful collection of Naat, Manqabat and Islamic poetry.",
    href: "/naat-manqabat",
  },
  {
    icon: "✦",
    title: "Islamic Books",
    text: "Discover classical Islamic books and valuable writings.",
    href: "/islamic-books",
  },
  {
    icon: "ﷺ",
    title: "Seerat-un-Nabi ﷺ",
    text: "Learn about the blessed life and teachings of the Prophet ﷺ.",
    href: "/seerat-un-nabi",
  },
  {
    icon: "✧",
    title: "Ala Hazrat",
    text: "Explore the life, works and teachings of Ala Hazrat.",
    href: "/ala-hazrat",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Light");

  const toggleTheme = (value: string) => {
    setTheme(value);

    if (value === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <main>
      {/* HEADER */}
      <header className="siteHeader">
        <div className="headerInner">

          {/* STYLISH LOGO */}
          <a href="/" className="logo">
            <span className="logoMark">م</span>

            <span className="logoText">
              <strong>MASLAK-E-ALA-HAZRAT</strong>
              <small>اسلامی علم و ادب</small>
            </span>
          </a>

          {/* HEADER CONTROLS */}
          <div className="headerControls">

            {/* LANGUAGE */}
            <div className="controlGroup">
              <span className="controlIcon">文</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Language"
              >
                <option>English</option>
                <option>हिन्दी</option>
                <option>اردو</option>
              </select>
            </div>

            {/* THEME */}
            <div className="controlGroup">
              <span className="controlIcon">
                {theme === "Dark" ? "☾" : "☀"}
              </span>

              <select
                value={theme}
                onChange={(e) => toggleTheme(e.target.value)}
                aria-label="Theme"
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            {/* MENU */}
            <button
              className="menuButton"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className={menuOpen ? "mainNav open" : "mainNav"}>
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">

          <div className="bismillah">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <div className="heroLine"></div>

          <h1>Welcome to MASLAK-E-ALA-HAZRAT</h1>

          <p className="heroText">
            A peaceful place for Quran, Hadith, Naat, Manqabat,
            Islamic books and the teachings of Ahl-e-Sunnat.
          </p>

          {/* SEARCH DIRECTLY BELOW WELCOME */}
          <div className="searchBox">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search Quran, Hadith, Naat, Books..."
            />

            <button>Search</button>
          </div>
        </div>
      </section>

      {/* ISLAMIC KNOWLEDGE */}
      <section className="contentSection">

        <div className="sectionHeading">
          <p>EXPLORE</p>

          <h2>Islamic Knowledge</h2>

          <span>
            Explore our growing collection of Islamic knowledge
            and literature.
          </span>
        </div>

        <div className="cardGrid">
          {featured.map((item) => (
            <a
              href={item.href}
              className="knowledgeCard"
              key={item.title}
            >
              <div className="cardIcon">{item.icon}</div>

              <div className="cardContent">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="aboutSection">
        <div className="aboutBox">
          <p className="smallTitle">
            MASLAK-E-ALA-HAZRAT
          </p>

          <h2>
            Read. Learn.
            <br />
            <span>Reflect.</span>
          </h2>

          <p>
            Our goal is to provide Islamic knowledge in a clean,
            accessible and peaceful digital environment.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footerInner">

          <div className="footerArabic">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
          </div>

          <p>Maslak-e-Ala-Hazrat</p>

          <span>
            Islamic Knowledge • Naat • Books • Hadith
          </span>

          <div className="footerBottom">
            © {new Date().getFullYear()} Maslak-e-Ala-Hazrat
          </div>

        </div>
      </footer>
    </main>
  );
}
