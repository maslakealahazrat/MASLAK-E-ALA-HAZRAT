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
    text: "Read the Holy Quran with translations and beautiful reading experience.",
    href: "/quran",
  },
  {
    icon: "ﷺ",
    title: "Al-Hadith",
    text: "Explore authentic Hadith and Islamic knowledge.",
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
    text: "Discover Islamic books, classical works and valuable writings.",
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
    text: "Explore the life, works and teachings of Imam Ahmad Raza Khan.",
    href: "/ala-hazrat",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      {/* HEADER */}
      <header className="siteHeader">
        <div className="headerInner">
          <a href="/" className="brand">
            <span className="brandArabic">مَسْلَکِ اَعْلٰی حَضْرَت</span>
            <span className="brandEnglish">MASLAK-E-ALA-HAZRAT</span>
          </a>

          <button
            className="menuButton"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={menuOpen ? "mainNav open" : "mainNav"}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
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

          <p className="eyebrow">
            Islamic Knowledge • Read • Learn • Reflect
          </p>

          <h1>
            Welcome to
            <span> Maslak-e-Ala-Hazrat</span>
          </h1>

          <p className="heroText">
            A peaceful place for Quran, Hadith, Naat, Manqabat, Islamic
            books and the teachings of Ahl-e-Sunnat.
          </p>

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

      {/* FEATURED */}
      <section className="contentSection">
        <div className="sectionHeading">
          <p>EXPLORE</p>
          <h2>Islamic Knowledge</h2>
          <span>
            Explore our growing collection of Islamic knowledge and
            literature.
          </span>
        </div>

        <div className="cardGrid">
          {featured.map((item) => (
            <a href={item.href} className="knowledgeCard" key={item.title}>
              <div className="cardIcon">{item.icon}</div>

              <div>
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
          <p className="smallTitle">MASLAK-E-ALA-HAZRAT</p>

          <h2>
            Read. Learn.
            <br />
            <span>Reflect.</span>
          </h2>

          <p>
            Our goal is to provide Islamic knowledge in a clean, accessible
            and peaceful digital environment.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
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
      </footer>
    </main>
  );
}
