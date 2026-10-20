import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Fatawa Razawiyya | Ala Hazrat — Maslak-e-Ala-Hazrat",
  description:
    "Explore Fatawa Razawiyya, the monumental work of Ala Hazrat Imam Ahmad Raza Khan, with an overview of its volumes and subjects.",
  alternates: {
    canonical: "/ala-hazrat/books/fatawa-razawiyya",
  },
};

const VOLUMES_OVERVIEW = [
  {
    vol: "1–4",
    title: "Kitab at-Taharah (کتاب الطہارت)",
    desc: "Purity, wudu, ghusl, water rules, Tayammum and spiritual cleanliness.",
  },
  {
    vol: "5–10",
    title: "Kitab as-Salah (کتاب الصلاۃ)",
    desc: "Prayer conditions, times, congregational Salah, Jumu'ah, Eid, and Qada.",
  },
  {
    vol: "11–12",
    title: "Kitab az-Zakah & as-Sawm (کتاب الزکوٰۃ والصوم)",
    desc: "Obligatory charity, calculation on gold, silver and merchandise, and Ramadan fasting.",
  },
  {
    vol: "13–14",
    title: "Kitab an-Nikah (کتاب النکاح)",
    desc: "Islamic marriage, rights of spouses, mahr, custody, and familial obligations.",
  },
  {
    vol: "15–18",
    title: "Kitab al-Buyu & Muamalat (کتاب البیوع والمعاملات)",
    desc: "Islamic commerce, trade ethics, contracts, interest prohibition (Riba), and partnerships.",
  },
  {
    vol: "19–22",
    title: "Kitab al-Aqaid & Kalam (کتاب العقائد والکلام)",
    desc: "Sunni theology, love of the Prophet ﷺ, and discussions on Islamic beliefs.",
  },
  {
    vol: "23–26",
    title: "Kitab al-Hazr wal-Ibahah (کتاب الحظر والإباحۃ)",
    desc: "Halal and Haram in daily life, clothing, food, social conduct, and adab.",
  },
  {
    vol: "27–30",
    title: "Fatawa Mutafarriqah & Indexes (فتاویٰ متفرقہ)",
    desc: "Miscellaneous fatawa, scientific questions, currency, astronomical rulings, and indexes.",
  },
];

export default function FatawaRazawiyyaPage() {
  return (
    <main className="quranContainer">
      <section className="surahHeroBanner">
        <Link
          href="/"
          className="quranIconButton"
          style={{
            display: "inline-flex",
            marginBottom: "16px",
          }}
        >
          ← Home
        </Link>

        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          العطايا النبوية في الفتاوى الرضوية
        </div>

        <h1
          className="surahEnglishTitleHero"
          style={{
            fontSize: "32px",
          }}
        >
          Fatawa Razawiyya
        </h1>

        <p
          className="surahMeaningHero"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
          }}
        >
          Explore the monumental jurisprudential work of Ala Hazrat Imam Ahmad
          Raza Khan Fazil-e-Barelvi, covering a wide range of Islamic legal
          questions and scholarly discussions.
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">30 Grand Volumes</span>
          <span className="surahBadgeItem">Hanafi Jurisprudence</span>
          <span className="surahBadgeItem">Scholarly Reference</span>
          <span className="surahBadgeItem">Islamic Research</span>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "var(--q-card)",
            border: "1px solid var(--q-card-border)",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "32px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              color: "var(--q-accent)",
              fontSize: "22px",
              margin: "0 0 12px",
            }}
          >
            The Encyclopedia of Fiqh &amp; Research
          </h2>

          <p
            style={{
              lineHeight: 1.8,
              color: "var(--q-translation)",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Fatawa Razawiyya is an extensive collection of Islamic legal
            rulings and scholarly discussions by Ala Hazrat Imam Ahmad Raza
            Khan. Its subjects span worship, transactions, family matters,
            Islamic beliefs, and other questions of religious practice.
          </p>
        </div>

        <h3
          style={{
            fontSize: "20px",
            color: "var(--q-accent)",
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <BookOpen size={20} aria-hidden="true" />
          <span>Volumes &amp; Subject Index</span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {VOLUMES_OVERVIEW.map((item) => (
            <article
              key={item.vol}
              style={{
                background: "var(--q-card)",
                border: "1px solid var(--q-card-border)",
                borderRadius: "14px",
                padding: "20px",
                minWidth: 0,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                }}
              >
                <span
                  className="ayahNumberBadge"
                  style={{
                    width: "auto",
                    padding: "4px 10px",
                    fontSize: "12px",
                  }}
                >
                  Vol. {item.vol}
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--q-accent)",
                    fontWeight: 600,
                  }}
                >
                  Hanafi Fiqh
                </span>
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  marginBottom: "6px",
                  color: "var(--q-text)",
                }}
              >
                {item.title}
              </strong>

              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "var(--q-translation)",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "30px 20px",
            background: "var(--q-card)",
            borderRadius: "18px",
            border: "1px solid var(--q-accent)",
            marginBottom: "24px",
            boxSizing: "border-box",
          }}
        >
          <h3
            style={{
              color: "var(--q-accent)",
              margin: "0 0 10px",
            }}
          >
            Explore More Works of Ala Hazrat
          </h3>

          <p
            style={{
              color: "var(--q-translation)",
              fontSize: "14px",
              lineHeight: 1.7,
              margin: "0 0 20px",
            }}
          >
            Discover Kanz-ul-Iman, Hadaiq-e-Bakhshish, and other Islamic
            books and scholarly works.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/quran"
              className="quranIconButton active"
              style={{
                padding: "10px 22px",
                maxWidth: "100%",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              Read Holy Qur’an (Kanz-ul-Iman)
            </Link>

            <Link
              href="/ala-hazrat/books"
              className="quranIconButton"
              style={{
                padding: "10px 22px",
                maxWidth: "100%",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              View All Books &amp; Treatises
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
