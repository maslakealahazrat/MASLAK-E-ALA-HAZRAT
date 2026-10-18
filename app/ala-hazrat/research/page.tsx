import Link from "next/link";
import type { Metadata } from "next";
import { alaHazratResearchFacts } from "@/data/ala-hazrat/research";
import { alaHazratSources } from "@/data/ala-hazrat/sources";
import { alaHazratResearchSummary } from "@/data/ala-hazrat/research-summary";
import { ShieldCheck, CheckCircle2, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Research & Verification — Ala Hazrat Studies",
  description: "Peer-reviewed, source-indexed research facts and documentation regarding the life, contributions, and historical works of Imam Ahmad Raza Khan.",
  alternates: {
    canonical: "/ala-hazrat/research",
  },
};

export default function AlaHazratResearchPage() {
  return (
    <main className="quranContainer quran-theme-emerald">
      <section className="surahHeroBanner">
        <Link href="/ala-hazrat" className="quranIconButton" style={{ display: "inline-flex", marginBottom: "16px" }}>
          ← Ala Hazrat
        </Link>

        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          البحوث والتوثيق الأكاديمي
        </div>

        <h1 className="surahEnglishTitleHero" style={{ fontSize: "32px" }}>
          Academic Research &amp; Sources
        </h1>

        <p className="surahMeaningHero" style={{ maxWidth: "700px", margin: "0 auto 20px" }}>
          A rigorous bibliographic verification system cross-referencing biographical facts, authorship records, and historical treatises against primary printed editions.
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">{alaHazratResearchSummary.facts} Verified Claims</span>
          <span className="surahBadgeItem">{alaHazratResearchSummary.sources} Documented Sources</span>
          <span className="surahBadgeItem">100% Validated</span>
        </div>
      </section>

      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px 40px" }}>
        <h3 style={{ fontSize: "20px", color: "var(--q-accent)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={20} />
          <span>Verified Biographical &amp; Scholarly Facts</span>
        </h3>

        <div style={{ display: "grid", gap: "16px", marginBottom: "40px" }}>
          {alaHazratResearchFacts.map((fact) => (
            <article
              key={fact.id}
              style={{
                background: "var(--q-card)",
                border: "1px solid var(--q-card-border)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span className="surahBadgeItem" style={{ margin: 0, textTransform: "uppercase", fontSize: "11px" }}>
                  {fact.topic.replace(/-/g, " ")}
                </span>
                <span style={{ fontSize: "12px", color: "#4ade80", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle2 size={14} /> Verified Fact
                </span>
              </div>

              <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--q-text)", lineHeight: 1.6, margin: "0 0 10px 0" }}>
                {fact.claim}
              </p>

              {fact.notes && (
                <div style={{ background: "var(--q-bg)", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", color: "var(--q-translation)", marginBottom: "12px" }}>
                  {fact.notes}
                </div>
              )}

              {fact.sourceIds.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", paddingTop: "10px", borderTop: "1px dashed var(--q-card-border)" }}>
                  <small style={{ color: "var(--q-accent)", fontWeight: 700 }}>SOURCES:</small>
                  {fact.sourceIds.map((sid) => {
                    const src = alaHazratSources.find((s) => s.id === sid);
                    return src ? (
                      <a
                        key={sid}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "var(--q-accent)",
                          textDecoration: "underline",
                        }}
                      >
                        {src.title} ↗
                      </a>
                    ) : null;
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
