import Link from "next/link";
import type { Metadata } from "next";
import AlaHazratWorks from "@/components/AlaHazratWorks";
import { alaHazratBiography } from "@/data/ala-hazrat/biography";

export const metadata: Metadata = {
  title: "Ala Hazrat — Imam Ahmad Raza Khan",
  description:
    "Explore the verified biography, books, literary works and devotional poetry associated with Imam Ahmad Raza Khan, known as Ala Hazrat.",
  alternates: {
    canonical: "/ala-hazrat",
  },
  openGraph: {
    title: "Ala Hazrat — Imam Ahmad Raza Khan",
    description:
      "Verified biography, books and literary works of Imam Ahmad Raza Khan.",
    url: "/ala-hazrat",
    siteName: "Maslak-e-Ala Hazrat",
    type: "profile",
  },
};

export default function AlaHazratPage() {
  return (
    <main className="alaHazratPage">
      <section className="alaHazratHero">
        <div className="alaHazratHeroInner">
          <Link href="/" className="alaHazratBackLink">
            ← Home
          </Link>

          <p className="alaHazratEyebrow">
            IMAM AHMAD RAZA KHAN
          </p>

          <h1>{alaHazratBiography.title}</h1>

          <p className="alaHazratArabicName">
            امام احمد رضا خان
          </p>

          <p className="alaHazratHeroDescription">
            Scholar · Jurist · Author · Devotional Poet
          </p>
        </div>
      </section>

      <section className="alaHazratBiographySection">
        <div className="alaHazratSectionHeader">
          <p className="alaHazratSectionEyebrow">
            BIOGRAPHY
          </p>

          <h2>{alaHazratBiography.name}</h2>

          <p>
            A documented introduction to the life, scholarship
            and literary legacy of Ala Hazrat.
          </p>
        </div>

        <div className="alaHazratFacts">
          {alaHazratBiography.facts.map((fact) => (
            <div
              key={fact.label}
              className="alaHazratFactCard"
            >
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>

        <div className="alaHazratBiographyContent">
          {alaHazratBiography.sections.map((section) => (
            <article
              key={section.id}
              className="alaHazratBiographyBlock"
            >
              <h2>{section.title}</h2>

              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="alaHazratWorksSection">
        <div className="alaHazratSectionHeader">
          <p className="alaHazratSectionEyebrow">
            BOOKS &amp; WORKS
          </p>

          <h2>Books &amp; Literary Works</h2>

          <p>
            Each book and work is kept as an independent
            collection.
          </p>
        </div>

        <AlaHazratWorks />

        <div className="alaHazratAllBooks">
          <Link
            href="/ala-hazrat/books"
            className="alaHazratAllBooksLink"
          >
            View All Books &amp; Works
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="alaHazratPoetrySection">
        <div className="alaHazratSectionHeader">
          <p className="alaHazratSectionEyebrow">
            DEVOTIONAL POETRY
          </p>

          <h2>Poetry &amp; Devotional Collections</h2>

          <p>
            Poetry categories are kept separate from the
            independent books.
          </p>
        </div>

        <div className="alaHazratPoetryGrid">
          <Link
            href="/naat-manqabat"
            className="alaHazratPoetryCard"
          >
            <span>ﷺ</span>
            <strong>Naat</strong>
            <small>Devotional poetry</small>
          </Link>

          <Link
            href="/naat-manqabat"
            className="alaHazratPoetryCard"
          >
            <span>☾</span>
            <strong>Manqabat</strong>
            <small>Praise and devotional poetry</small>
          </Link>

          <Link
            href="/naat-manqabat"
            className="alaHazratPoetryCard"
          >
            <span>۞</span>
            <strong>Salam</strong>
            <small>Devotional salutations</small>
          </Link>

          <Link
            href="/naat-manqabat"
            className="alaHazratPoetryCard"
          >
            <span>✦</span>
            <strong>Hamd</strong>
            <small>Praise of Allah</small>
          </Link>
        </div>
      </section>

      <section className="alaHazratReferencesSection">
        <div className="alaHazratSectionHeader">
          <p className="alaHazratSectionEyebrow">
            REFERENCES
          </p>

          <h2>Sources &amp; Documentation</h2>
        </div>

        <div className="alaHazratReferencesList">
          {alaHazratBiography.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="alaHazratReferenceCard"
            >
              <span>{source.title}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
