import Link from "next/link";
import type { Metadata } from "next";
import { alaHazratTeachers } from "@/data/ala-hazrat/teachers";
import { alaHazratSources } from "@/data/ala-hazrat/sources";

export const metadata: Metadata = {
  title: "Teachers of Ala Hazrat — Asatizah & Scholars",
  description: "Documented biographical records and references regarding the esteemed teachers, spiritual guides, and ijazah scholars of Imam Ahmad Raza Khan.",
  alternates: {
    canonical: "/ala-hazrat/teachers",
  },
};

export default function AlaHazratTeachersPage() {
  return (
    <main className="quranContainer quran-theme-emerald">
      <section className="surahHeroBanner">
        <Link href="/ala-hazrat" className="quranIconButton" style={{ display: "inline-flex", marginBottom: "16px" }}>
          ← Ala Hazrat
        </Link>

        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          أساتذة الإمام أحمد رضا خان
        </div>

        <h1 className="surahEnglishTitleHero" style={{ fontSize: "32px" }}>
          Teachers &amp; Asatizah of Ala Hazrat
        </h1>

        <p className="surahMeaningHero" style={{ maxWidth: "700px", margin: "0 auto 20px" }}>
          Documented and verified historical records of the prominent scholars, traditional masters, and spiritual guides from whom Imam Ahmad Raza Khan studied.
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">{alaHazratTeachers.length} Documented Teachers</span>
          <span className="surahBadgeItem">Ijazat in Hadith</span>
          <span className="surahBadgeItem">Qadiri Spiritual Lineage</span>
        </div>
      </section>

      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px 40px" }}>
        <div style={{ display: "grid", gap: "16px" }}>
          {alaHazratTeachers.map((teacher) => (
            <article
              key={teacher.id}
              style={{
                background: "var(--q-card)",
                border: "1px solid var(--q-card-border)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span className="surahBadgeItem" style={{ margin: 0, textTransform: "capitalize" }}>
                  {teacher.relationship.replace(/-/g, " ")}
                </span>
                <span style={{ fontSize: "12px", color: "var(--q-accent)", fontWeight: 700 }}>
                  Verified Record
                </span>
              </div>

              <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", color: "var(--q-text)" }}>
                {teacher.name}
              </h3>

              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--q-translation)", margin: "0 0 14px 0" }}>
                {teacher.description}
              </p>

              {teacher.notes && (
                <div style={{ background: "var(--q-bg)", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", color: "var(--q-translation)", marginBottom: "12px" }}>
                  <strong>Note:</strong> {teacher.notes}
                </div>
              )}

              {teacher.sourceIds.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", paddingTop: "10px", borderTop: "1px dashed var(--q-card-border)" }}>
                  <small style={{ color: "var(--q-accent)", fontWeight: 700, marginRight: "4px" }}>SOURCES:</small>
                  {teacher.sourceIds.map((sid) => {
                    const src = alaHazratSources.find((s) => s.id === sid);
                    return (
                      <span key={sid} style={{ fontSize: "11px", color: "var(--q-translation)", background: "rgba(0,0,0,0.15)", padding: "2px 8px", borderRadius: "4px" }}>
                        {src ? src.title : sid}
                      </span>
                    );
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
