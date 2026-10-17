"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Globe,
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ALL_SURAHS, type SurahMeta } from "@/data/quran/surahs-meta";
import "@/app/quran/quran-app.css";

const COMPARATIVE_ANALYSIS = [
  {
    verse: "Surah Ad-Duha (93:7)",
    arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
    literalFault: "Literal translations rendered this as 'And He found you lost (astray) and guided you', which erroneously implies deviation before prophethood.",
    kanzUlImanUrdu: "اور تمہیں اپنی محبت میں خود رفتہ پایا تو اپنی طرف راہ دی",
    kanzUlImanEn: "And He found you deeply absorbed in His love, so directed you towards Himself.",
    theology: "Protects the absolute infallibility (Ismah) of Sayyiduna Muhammad ﷺ from birth, rendering 'Dallan' as consumed in divine adoration.",
  },
  {
    verse: "Surah Al-Fath (48:2)",
    arabic: "لِيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِنْ ذَنْبِكَ وَمَا تَأَخَّرَ",
    literalFault: "Literal translations translate this as 'That Allah may forgive your past and future sins', implying sins were committed.",
    kanzUlImanUrdu: "تاکہ اللہ تمہارے سبب سے گناہ بخشے تمہارے اگلوں کے اور تمہارے پچھلوں کے",
    kanzUlImanEn: "So that Allah may forgive, on your account, the sins of your predecessors and successors.",
    theology: "Understands 'Zanb' in relation to the Ummah, establishing the Prophet ﷺ as the intercessor whose honor brings forgiveness to his followers.",
  },
  {
    verse: "Surah Al-Baqarah (2:143)",
    arabic: "وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ وَيَكُونَ الرَّسُولُ عَلَيْكُمْ شَهِيدًا",
    literalFault: "Generic translations simplify 'Shahid' as a passive witness without explaining its spiritual reality.",
    kanzUlImanUrdu: "اور اسی طرح ہم نے تمہیں سب امتوں میں افضل کیا تاکہ تم لوگوں پر گواہ ہو اور یہ رسول تمہارے نگہبان و گواہ",
    kanzUlImanEn: "And thus We have made you the most exalted of nations, so that you may bear witness over mankind, and this Messenger may be your guardian and witness.",
    theology: "Highlights the Prophet ﷺ as 'Nigehban' (watcher, guardian, and witness) through divine unveiling (Hazir & Nazir).",
  },
  {
    verse: "Surah An-Najm (53:3-4)",
    arabic: "وَمَا يَنْطِقُ عَنِ الْهَوَىٰ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ",
    literalFault: "Often treated as only applying to the Qur’an itself.",
    kanzUlImanUrdu: "اور وہ کوئی بات اپنی خواہش سے نہیں کہتے، وہ تو نہیں مگر وحی جو انہیں کی جاتی ہے",
    kanzUlImanEn: "And he does not speak from his own desire. It is nothing but divine revelation conveyed unto him.",
    theology: "Affirms that every single word, action, and pronouncement of the Holy Prophet ﷺ in religion is inspired by divine guidance.",
  },
];

export default function KanzUlImanClient() {
  const [searchSurah, setSearchSurah] = useState("");

  const filteredSurahs = ALL_SURAHS.filter(
    (s) =>
      !searchSurah ||
      String(s.number).includes(searchSurah) ||
      s.nameEnglish.toLowerCase().includes(searchSurah.toLowerCase()) ||
      s.nameArabic.includes(searchSurah) ||
      s.nameUrdu.includes(searchSurah)
  );

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 16px 80px" }}>
      {/* MONUMENTAL FEATURE BOX */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--q-card) 0%, rgba(18,40,37,0.95) 100%)",
          border: "1.5px solid var(--q-card-border)",
          borderRadius: "24px",
          padding: "36px",
          marginBottom: "40px",
          boxShadow: "0 16px 45px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="dailyAyahTag" style={{ background: "rgba(212,175,55,0.15)", color: "var(--q-accent)" }}>
              HISTORICAL &amp; THEOLOGICAL MASTERPIECE &bull; 1330 AH (1911 CE)
            </span>
            <h2 style={{ fontSize: "28px", margin: "10px 0 12px 0", color: "var(--q-text)" }}>
              The Treasure of Faith: Kanz-ul-Iman
            </h2>
            <p style={{ maxWidth: "780px", fontSize: "15px", lineHeight: 1.8, color: "var(--q-translation)", margin: 0 }}>
              Rendered extemporaneously by Ala Hazrat Imam Ahmad Raza Khan in Bareilly Sharif, dictated orally to his foremost student Sadr-ush-Shari&apos;ah Allama Amjad Ali Azmi (author of <em>Bahar-e-Shari&apos;at</em>) without opening books of reference. It stands undisputed as the supreme Urdu translation of the Holy Qur’an, celebrated for maintaining the highest reverence for the majesty of Allah and the exalted rank of the Holy Prophet Muhammad ﷺ.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              href="/quran"
              className="quranIconButton active"
              style={{ padding: "12px 24px", fontSize: "14px", justifyContent: "center" }}
            >
              <BookOpen size={16} />
              <span>Launch Kanz-ul-Iman Quran App</span>
            </Link>
            <Link
              href="/quran/full"
              className="quranIconButton"
              style={{ padding: "10px 20px", fontSize: "13px", justifyContent: "center" }}
            >
              <span>Read Full Mushaf Mode</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 3 CORE PILLARS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "30px" }}>
          <div style={{ background: "var(--q-bg)", padding: "18px", borderRadius: "14px", border: "1px solid var(--q-card-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <ShieldCheck size={20} color="var(--q-accent)" />
              <strong style={{ color: "var(--q-text)", fontSize: "15px" }}>Theological Infallibility</strong>
            </div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "var(--q-translation)" }}>
              Meticulously structured so that no ambiguity or disrespectful connotation can ever be attributed to the prophets or divine essence.
            </p>
          </div>

          <div style={{ background: "var(--q-bg)", padding: "18px", borderRadius: "14px", border: "1px solid var(--q-card-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Award size={20} color="var(--q-accent)" />
              <strong style={{ color: "var(--q-text)", fontSize: "15px" }}>Grounded in Classical Tafsir</strong>
            </div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "var(--q-translation)" }}>
              Directly reflects the authoritative conclusions of Imam Fakhr al-Din al-Razi, Tabari, Baydawi, and Tafsir al-Khazin.
            </p>
          </div>

          <div style={{ background: "var(--q-bg)", padding: "18px", borderRadius: "14px", border: "1px solid var(--q-card-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Globe size={20} color="var(--q-accent)" />
              <strong style={{ color: "var(--q-text)", fontSize: "15px" }}>Global Languages</strong>
            </div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "var(--q-translation)" }}>
              Translated from Ala Hazrat&apos;s Urdu into English, Dutch, Turkish, Sindhi, Hindi, Gujarati, and Bengali.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARATIVE THEOLOGICAL ANALYSIS */}
      <section style={{ marginBottom: "50px" }}>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--q-accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
            ACADEMIC DISTINCTION
          </span>
          <h3 style={{ fontSize: "24px", margin: "4px 0 8px 0", color: "var(--q-text)" }}>
            Why Scholars Revere Kanz-ul-Iman: Comparative Theological Nuances
          </h3>
          <p style={{ fontSize: "14px", color: "var(--q-translation)", maxWidth: "800px", margin: 0 }}>
            Examining verses where literal translations stumble into severe theological pitfalls, whereas Ala Hazrat&apos;s linguistic mastery preserves the orthodox Sunni creed.
          </p>
        </div>

        <div style={{ display: "grid", gap: "20px" }}>
          {COMPARATIVE_ANALYSIS.map((c, i) => (
            <div
              key={i}
              style={{
                background: "var(--q-card)",
                border: "1px solid var(--q-card-border)",
                borderRadius: "18px",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                <span className="ayahNumberBadge" style={{ width: "auto", padding: "4px 12px", fontSize: "12px" }}>
                  {c.verse}
                </span>
                <span style={{ fontSize: "12px", color: "var(--q-accent)", fontWeight: 700 }}>
                  Theological Guardian
                </span>
              </div>

              {/* ARABIC */}
              <p
                style={{
                  fontFamily: "var(--font-arabic-uthmani)",
                  fontSize: "24px",
                  lineHeight: 2,
                  textAlign: "right",
                  direction: "rtl",
                  color: "var(--q-arabic)",
                  margin: "0 0 16px 0",
                }}
              >
                {c.arabic}
              </p>

              {/* KANZ UL IMAN ACCURATE RENDERING */}
              <div style={{ background: "rgba(212,175,55,0.08)", borderLeft: "4px solid var(--q-accent)", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--q-accent)", marginBottom: "4px" }}>
                  کنز الایمان — امام احمد رضا خان
                </div>
                <p style={{ fontFamily: "var(--font-urdu)", direction: "rtl", textAlign: "right", fontSize: "19px", lineHeight: 2, color: "var(--q-text)", margin: "0 0 8px 0" }}>
                  {c.kanzUlImanUrdu}
                </p>
                <p style={{ fontSize: "13px", color: "var(--q-translation)", margin: 0, fontStyle: "italic" }}>
                  &ldquo;{c.kanzUlImanEn}&rdquo;
                </p>
              </div>

              {/* THEOLOGICAL EXPLANATION */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "rgba(239, 68, 68, 0.08)", padding: "12px 14px", borderRadius: "10px", borderLeft: "3px solid #ef4444" }}>
                  <strong style={{ fontSize: "12px", color: "#f87171", display: "block", marginBottom: "4px" }}>Common Literal Pitfall:</strong>
                  <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.5, color: "var(--q-translation)" }}>
                    {c.literalFault}
                  </p>
                </div>

                <div style={{ background: "rgba(16, 185, 129, 0.08)", padding: "12px 14px", borderRadius: "10px", borderLeft: "3px solid #10b981" }}>
                  <strong style={{ fontSize: "12px", color: "#34d399", display: "block", marginBottom: "4px" }}>Ala Hazrat&apos;s Solution:</strong>
                  <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.5, color: "var(--q-translation)" }}>
                    {c.theology}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SURAH BROWSER: READ ANY SURAH WITH KANZ-UL-IMAN */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h3 style={{ fontSize: "22px", margin: "0 0 4px 0", color: "var(--q-text)" }}>
              Read Any Surah in Kanz-ul-Iman
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--q-translation)" }}>
              Click any of the 114 Surahs to launch the verified Kanz-ul-Iman text with multi-reciter audio recitation.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--q-card)", padding: "8px 14px", borderRadius: "10px", border: "1px solid var(--q-card-border)" }}>
            <Search size={16} color="var(--q-accent)" />
            <input
              type="text"
              placeholder="Search surah..."
              value={searchSurah}
              onChange={(e) => setSearchSurah(e.target.value)}
              style={{ background: "none", border: "none", outline: "none", color: "var(--q-text)", fontSize: "13px", width: "140px" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
              className="surahCardModern"
              style={{ padding: "14px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="surahNumberCircle" style={{ width: "38px", height: "38px", fontSize: "13px" }}>
                  {surah.number}
                </div>
                <div>
                  <strong style={{ fontSize: "14px", color: "var(--q-text)" }}>{surah.nameEnglish}</strong>
                  <div style={{ fontSize: "12px", color: "var(--q-translation)" }}>
                    {surah.nameUrdu} &bull; {surah.ayahCount} Ayahs
                  </div>
                </div>
              </div>

              <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "20px", color: "var(--q-accent)" }} dir="rtl" lang="ar">
                {surah.nameArabic}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
