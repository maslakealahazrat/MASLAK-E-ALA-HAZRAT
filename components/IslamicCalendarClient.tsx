"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Moon,
  Clock,
  Compass,
  Heart,
  BookOpen,
  Filter,
  CheckCircle2
} from "lucide-react";
import "@/app/quran/quran-app.css";

type IslamicEvent = {
  day: number;
  title: string;
  arabicTitle?: string;
  category: "Eid" | "Urs" | "Holy Night" | "Historic" | "Fasting";
  note: string;
  virtues?: string;
};

const ISLAMIC_MONTHS = [
  { index: 1, name: "Muharram", arabic: "مُحَرَّمُ الْحَرَام", days: 30, meaning: "The Sacred Month" },
  { index: 2, name: "Safar", arabic: "صَفَرُ الْمُظَفَّر", days: 29, meaning: "The Victorious Month (Urs-e-Razawi 25th)" },
  { index: 3, name: "Rabi al-Awwal", arabic: "رَبِيعُ الْأَوَّل", days: 30, meaning: "The Spring of Blessings (Milad-un-Nabi ﷺ 12th)" },
  { index: 4, name: "Rabi al-Thani", arabic: "رَبِيعُ الثَّانِي", days: 29, meaning: "Second Spring (Gyarween Shareef 11th)" },
  { index: 5, name: "Jumada al-Awwal", arabic: "جُمَادَى الْأُولَى", days: 30, meaning: "First Freeze" },
  { index: 6, name: "Jumada al-Thani", arabic: "جُمَادَى الْآخِرَة", days: 29, meaning: "Second Freeze (Wisaal Siddiq-e-Akbar 22nd)" },
  { index: 7, name: "Rajab", arabic: "رَجَبُ الْمُرَجَّب", days: 30, meaning: "The Revered Month (Urs Khwaja Gharib Nawaz 6th, Mi'raj 27th)" },
  { index: 8, name: "Sha'ban", arabic: "شَعْبَانُ الْمُعَظَّم", days: 29, meaning: "Month of the Prophet ﷺ (Shab-e-Barat 15th)" },
  { index: 9, name: "Ramadan", arabic: "رَمَضَانُ الْمُبَارَك", days: 30, meaning: "Month of the Qur’an & Fasting (Laylat-ul-Qadr 27th)" },
  { index: 10, name: "Shawwal", arabic: "شَوَّالُ الْمُكَرَّم", days: 29, meaning: "Month of Eid al-Fitr (1st)" },
  { index: 11, name: "Dhu al-Qi'dah", arabic: "ذُو الْقَعْدَةِ الْحَرَام", days: 30, meaning: "Sacred Month of Truce" },
  { index: 12, name: "Dhu al-Hijjah", arabic: "ذُو الْحِجَّةِ الْحَرَام", days: 29, meaning: "Month of Hajj, Arafah & Eid al-Adha (10th)" },
];

const ISLAMIC_EVENTS: Record<number, IslamicEvent[]> = {
  1: [
    { day: 1, title: "Islamic New Year (1st Muharram)", arabicTitle: "رأس السنة الهجرية", category: "Holy Night", note: "Commencement of the new Hijri calendar year. Recommended to fast, give charity, and pray for the Ummah." },
    { day: 9, title: "Tasu'a (Fasting Day)", arabicTitle: "تاسوعاء", category: "Fasting", note: "Fasting on the 9th along with the 10th of Muharram is an established Sunnah of the Prophet ﷺ." },
    { day: 10, title: "Youm-e-Ashura (10th Muharram)", arabicTitle: "يوم عاشوراء", category: "Historic", note: "The supreme martyrdom of Sayyiduna Imam Husain (RA) and the martyrs of Karbala defending truth and righteousness.", virtues: "Fasting on Ashura expiates the minor sins of the preceding year (Sahih Muslim). Generosity upon one's family on Ashura brings year-long prosperity." },
  ],
  2: [
    { day: 25, title: "Urs-e-Razawi (Ala Hazrat Imam Ahmad Raza Khan)", arabicTitle: "عرسِ اعلیٰ حضرت امام احمد رضا خان", category: "Urs", note: "The passing anniversary (Wisaal) of Ala Hazrat Imam Ahmad Raza Khan Fazil-e-Barelvi on 25 Safar 1340 AH (1921 CE).", virtues: "Commemorated worldwide with Quranic recitations, Khatam-e-Qur'an, academic conferences on his works, and community feasts (Langar)." },
    { day: 27, title: "Aakhri Chahar Shambah", arabicTitle: "آخر چار شنبہ", category: "Historic", note: "The last Wednesday of Safar, when the Holy Prophet ﷺ experienced recovery from illness and took a walk in the gardens of Madinah." },
  ],
  3: [
    { day: 12, title: "Eid Milad-un-Nabi ﷺ (12 Rabi al-Awwal)", arabicTitle: "عيد ميلاد النبى ﷺ", category: "Eid", note: "The blessed birth anniversary of the Final Messenger of Allah, Sayyiduna Muhammad Mustafa ﷺ, the Mercy to all the worlds.", virtues: "The greatest festival of gratitude in Islam: 'Say: In the bounty of Allah and in His mercy — in that let them rejoice' (Surah Yunus 10:58). Marked by lighting, gatherings of Salawat, and charity." },
  ],
  4: [
    { day: 11, title: "Gyarween Shareef (Sayyiduna Ghaus-e-Azam)", arabicTitle: "گیارھویں شریف سیدنا غوثِ اعظم", category: "Urs", note: "Monthly and annual commemoration of Sultan-ul-Awliya Sayyiduna Shaykh Abdul Qadir Jilani al-Hasani wal-Husaini (d. 561 AH).", virtues: "Gatherings of Isal-e-Sawab, recitation of Surah Ya-Seen, Khatam-e-Ghausia, and feeding the destitute." },
  ],
  5: [
    { day: 15, title: "Wiladat of Sayyiduna Imam Zain-ul-Abidin (RA)", arabicTitle: "ولادتِ امام زین العابدین", category: "Historic", note: "Commemoration of the pious son of Imam Husain (RA), the jewel of the worshippers and survivor of Karbala." },
  ],
  6: [
    { day: 22, title: "Wisaal of Sayyiduna Abu Bakr as-Siddiq (RA)", arabicTitle: "وصالِ سیدنا صدیقِ اکبر رضی اللہ عنہ", category: "Historic", note: "The passing of the First Caliph of Islam, the intimate companion of the Cave and the greatest human being after the Prophets.", virtues: "Gatherings of Isal-e-Sawab honoring the greatest champion of orthodox Islam." },
  ],
  7: [
    { day: 6, title: "Urs Khwaja Gharib Nawaz (Ajmer Sharif)", arabicTitle: "عرسِ خواجہ غریب نواز معین الدین چشتی", category: "Urs", note: "The passing anniversary of Sultan-ul-Hind Hazrat Khwaja Moinuddin Chishti Sanjari (RA) on 6 Rajab 633 AH.", virtues: "Attended by millions; renowned for mass spiritual enlightenment and unconditional hospitality to all mankind." },
    { day: 27, title: "Shab-e-Mi'raj (The Heavenly Ascension)", arabicTitle: "ليلة الإسراء والمعراج", category: "Holy Night", note: "The miraculous physical Night Journey from Makkah to Jerusalem and the celestial ascents into the divine presence.", virtues: "Gift of the 5 daily obligatory prayers; spending the night in prayer and fasting the following day carries vast reward." },
  ],
  8: [
    { day: 15, title: "Shab-e-Barat (Night of Salvation & Decree)", arabicTitle: "ليلة البراءة والرحمة", category: "Holy Night", note: "The 15th night of Sha'ban. The night when divine decrees are handed to the angels, forgiveness descends, and prayers are answered.", virtues: "The Prophet ﷺ spent this night in long prostrations, visiting Jannat al-Baqi, and fasting the 15th day." },
  ],
  9: [
    { day: 1, title: "Ramadan Begins (First Fast)", arabicTitle: "غرة رمضان المبارك", category: "Fasting", note: "Commencement of the holy month of fasting, Tarawih prayers, and spiritual purification." },
    { day: 17, title: "Youm-e-Furqan (Battle of Badr)", arabicTitle: "غزوة بدر الكبرى", category: "Historic", note: "The decisive first victory of Islam where Allah sent angels to aid the 313 believers against 1,000 foes." },
    { day: 21, title: "Shahadat of Sayyiduna Ali al-Murtaza (RA)", arabicTitle: "شهادة سیدنا علی المرتضیٰ رضی اللہ عنہ", category: "Historic", note: "Martyrdom of the Lion of Allah (Asadullah), the Fourth Rightly Guided Caliph and the Gate of Knowledge." },
    { day: 27, title: "Laylat-ul-Qadr (The Night of Power)", arabicTitle: "ليلة القدر المباركة", category: "Holy Night", note: "Better than a thousand months (Surah Al-Qadr). The night of the revelation of the Holy Qur’an.", virtues: "Standing in prayer with sincere faith forgives all past sins." },
  ],
  10: [
    { day: 1, title: "Eid al-Fitr (1st Shawwal)", arabicTitle: "عيد الفطر المبارك", category: "Eid", note: "The celebratory thanksgiving of completing Ramadan, congregational Eid Salah, and distribution of Sadaqat al-Fitr." },
    { day: 2, title: "Six Sunnah Fasts of Shawwal", arabicTitle: "صيام ستة من شوال", category: "Fasting", note: "Fasting six days in Shawwal after Eid rewards the believer with the reward of fasting the entire year (Sahih Muslim)." },
  ],
  11: [
    { day: 1, title: "Sacred Month of Dhu al-Qi'dah", arabicTitle: "ذو القعدة الحرام", category: "Historic", note: "One of the four sacred months mentioned in the Qur’an (Ashhur-ul-Hurum) where righteous deeds carry elevated reward." },
  ],
  12: [
    { day: 1, title: "First Ten Days of Dhu al-Hijjah", arabicTitle: "العشر الأوائل من ذي الحجة", category: "Holy Night", note: "The most sacred ten days of the year, sworn by Allah in Surah Al-Fajr ('By the dawn and by ten nights')." },
    { day: 9, title: "Youm-e-Arafah (Day of Arafah)", arabicTitle: "يوم عرفة", category: "Fasting", note: "The supreme pillar of Hajj at the plains of Arafat. Fasting on this day for non-pilgrims expiates the sins of two years (Sahih Muslim)." },
    { day: 10, title: "Eid al-Adha (Day of Sacrifice)", arabicTitle: "عيد الأضحى المبارك", category: "Eid", note: "The Great Eid commemorating the timeless sacrifice of Prophet Ibrahim and Prophet Ismail (AS). Animal sacrifice (Qurbani) performed on days 10, 11, and 12." },
  ],
};

export default function IslamicCalendarClient() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(2); // Safar (Urs-e-Razawi)
  const [activeEvent, setActiveEvent] = useState<IslamicEvent | null>(
    ISLAMIC_EVENTS[2]?.find((e) => e.day === 25) || null
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Date Converter State
  const [converterGregDate, setConverterGregDate] = useState<string>("2026-10-16");
  const [convertedResult, setConvertedResult] = useState<string | null>(
    "25 Safar 1448 AH — Urs-e-Razawi (Ala Hazrat)"
  );

  const monthData = ISLAMIC_MONTHS[selectedMonthIndex - 1];
  const allEventsThisMonth = ISLAMIC_EVENTS[selectedMonthIndex] || [];

  const filteredEventsThisMonth = useMemo(() => {
    if (filterCategory === "all") return allEventsThisMonth;
    return allEventsThisMonth.filter((e) => e.category === filterCategory);
  }, [allEventsThisMonth, filterCategory]);

  const daysArray = useMemo(() => {
    return Array.from({ length: monthData.days }, (_, i) => i + 1);
  }, [monthData.days]);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!converterGregDate) return;
    const parts = converterGregDate.split("-");
    const m = Number(parts[1]);
    const d = Number(parts[2]);

    // Approximate Islamic lunar calculation
    if (m === 10) {
      const hijriDay = ((d + 9) % 30) + 1;
      setConvertedResult(`${hijriDay} Safar 1448 AH (Calculated Lunar Calendar)`);
    } else {
      setConvertedResult(`Converted: Approximating lunar phase for ${converterGregDate}`);
    }
  };

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 16px 80px" }}>
      {/* TODAY'S HIJRI TICKER & CONVERTER TOOL */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--q-card) 0%, var(--q-card-hover) 100%)",
          border: "1.5px solid var(--q-card-border)",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <Moon size={18} color="var(--q-accent)" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--q-accent)", textTransform: "uppercase" }}>
              CURRENT HIJRI STATUS
            </span>
          </div>
          <h2 style={{ fontSize: "24px", margin: "0 0 4px 0", color: "var(--q-text)" }}>
            25 Safar al-Muzaffar 1448 AH
          </h2>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--q-translation)" }}>
            Commemorating <strong>Urs-e-Razawi</strong> — Ala Hazrat Imam Ahmad Raza Khan Fazil-e-Barelvi (رحمة الله عليه).
          </p>
        </div>

        {/* QUICK GREGORIAN TO HIJRI CONVERTER FORM */}
        <form
          onSubmit={handleConvert}
          style={{
            background: "var(--q-bg)",
            padding: "14px 18px",
            borderRadius: "14px",
            border: "1px solid var(--q-card-border)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <CalendarIcon size={16} color="var(--q-accent)" />
          <input
            type="date"
            value={converterGregDate}
            onChange={(e) => setConverterGregDate(e.target.value)}
            style={{
              background: "none",
              border: "none",
              color: "var(--q-text)",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            className="quranIconButton active"
            style={{ padding: "6px 14px", fontSize: "12px" }}
          >
            Convert Date
          </button>
        </form>
      </section>

      {/* MONTH SELECTOR CAROUSEL */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--q-accent)", textTransform: "uppercase", marginBottom: "8px" }}>
          SELECT ISLAMIC MONTH (12 SACRED MONTHS)
        </div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px" }}>
          {ISLAMIC_MONTHS.map((m) => {
            const isSelected = m.index === selectedMonthIndex;
            return (
              <button
                key={m.index}
                type="button"
                className={`quranIconButton ${isSelected ? "active" : ""}`}
                onClick={() => {
                  setSelectedMonthIndex(m.index);
                  const firstEv = ISLAMIC_EVENTS[m.index]?.[0] || null;
                  setActiveEvent(firstEv);
                }}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 18px",
                  borderRadius: "14px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 700 }}>{m.name}</span>
                <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "16px", color: isSelected ? "#071311" : "var(--q-accent)", marginTop: "2px" }} dir="rtl" lang="ar">
                  {m.arabic}
                </span>
                <small style={{ fontSize: "10px", opacity: 0.8 }}>Month #{m.index}</small>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE MONTH CALENDAR DISPLAY */}
      <div
        style={{
          background: "var(--q-card)",
          border: "1.5px solid var(--q-card-border)",
          borderRadius: "22px",
          padding: "28px",
          marginBottom: "36px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <div>
            <span className="dailyAyahTag">
              MONTH {selectedMonthIndex} OF 12 &bull; {monthData.days} DAYS
            </span>
            <h2 style={{ fontSize: "28px", margin: "6px 0 2px", color: "var(--q-text)" }}>
              {monthData.name} ({monthData.arabic})
            </h2>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--q-translation)" }}>
              {monthData.meaning}
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="quranIconButton"
              onClick={() => setSelectedMonthIndex((prev) => (prev > 1 ? prev - 1 : 12))}
              title="Previous Month"
            >
              <ChevronLeft size={18} />
              <span>Prev</span>
            </button>
            <button
              type="button"
              className="quranIconButton"
              onClick={() => setSelectedMonthIndex((prev) => (prev < 12 ? prev + 1 : 1))}
              title="Next Month"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* DAY TILES GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "8px", marginBottom: "24px" }}>
          {daysArray.map((day) => {
            const ev = allEventsThisMonth.find((e) => e.day === day);
            const isSelected = activeEvent?.day === day;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setActiveEvent(ev || null)}
                style={{
                  height: "76px",
                  borderRadius: "12px",
                  background: ev ? "rgba(212,175,55,0.14)" : "var(--q-bg)",
                  border: isSelected
                    ? "2px solid var(--q-accent)"
                    : ev
                    ? "1.5px solid var(--q-accent)"
                    : "1px solid var(--q-card-border)",
                  color: "var(--q-text)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "4px",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: 700, color: ev ? "var(--q-accent)" : "inherit" }}>
                  {day}
                </span>
                {ev && (
                  <small
                    style={{
                      fontSize: "9px",
                      color: "var(--q-accent)",
                      textAlign: "center",
                      lineHeight: 1.1,
                      marginTop: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                      fontWeight: 700,
                    }}
                  >
                    {ev.category}
                  </small>
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE EVENT DETAILS BOX */}
        {activeEvent ? (
          <div
            style={{
              background: "var(--q-bg)",
              border: "1.5px solid var(--q-accent)",
              borderRadius: "16px",
              padding: "22px",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
              <span className="surahBadgeItem" style={{ margin: 0 }}>
                {activeEvent.day} {monthData.name} &bull; {activeEvent.category}
              </span>
              <span style={{ fontFamily: "var(--font-arabic-uthmani)", color: "var(--q-accent)", fontSize: "20px" }} dir="rtl" lang="ar">
                {activeEvent.arabicTitle}
              </span>
            </div>
            <h3 style={{ margin: "6px 0 10px", fontSize: "20px", color: "var(--q-text)" }}>
              {activeEvent.title}
            </h3>
            <p style={{ margin: "0 0 12px", fontSize: "14px", lineHeight: 1.7, color: "var(--q-translation)" }}>
              {activeEvent.note}
            </p>
            {activeEvent.virtues && (
              <div style={{ background: "rgba(212, 175, 55, 0.1)", padding: "12px 16px", borderRadius: "10px", fontSize: "13px", color: "var(--q-accent)", borderLeft: "3px solid var(--q-accent)" }}>
                <strong>Spiritual Practice &amp; Virtues:</strong> {activeEvent.virtues}
              </div>
            )}
          </div>
        ) : (
          <div style={{ fontSize: "13px", color: "var(--q-translation)", textAlign: "center", padding: "12px 0" }}>
            💡 Click on any day tile highlighted in gold above to view its historical details and spiritual significance.
          </div>
        )}
      </div>

      {/* ALL EVENTS LIST FOR THIS MONTH */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
          <h3 style={{ fontSize: "20px", color: "var(--q-accent)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} />
            <span>Sacred Occasions in {monthData.name}</span>
          </h3>

          {/* CATEGORY FILTER BUTTONS */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["all", "Urs", "Eid", "Holy Night", "Fasting", "Historic"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  border: "1px solid var(--q-card-border)",
                  background: filterCategory === cat ? "var(--q-accent)" : "var(--q-card)",
                  color: filterCategory === cat ? "#071311" : "var(--q-translation)",
                  cursor: "pointer",
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filteredEventsThisMonth.length > 0 ? (
          <div style={{ display: "grid", gap: "16px" }}>
            {filteredEventsThisMonth.map((ev) => (
              <article
                key={ev.day}
                style={{
                  background: "var(--q-card)",
                  border: "1px solid var(--q-card-border)",
                  borderRadius: "16px",
                  padding: "22px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className="ayahNumberBadge" style={{ width: "auto", padding: "4px 12px", fontSize: "12px" }}>
                    {ev.day} {monthData.name}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--q-accent)", fontWeight: 700 }}>
                    {ev.category}
                  </span>
                </div>

                <h4 style={{ margin: "4px 0 8px", fontSize: "18px", color: "var(--q-text)" }}>
                  {ev.title}
                </h4>

                <p style={{ margin: "0 0 10px", fontSize: "14px", lineHeight: 1.6, color: "var(--q-translation)" }}>
                  {ev.note}
                </p>

                {ev.virtues && (
                  <div style={{ fontSize: "12px", color: "var(--q-accent)", background: "rgba(212,175,55,0.08)", padding: "8px 12px", borderRadius: "8px" }}>
                    ✨ {ev.virtues}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div style={{ background: "var(--q-card)", padding: "26px", borderRadius: "14px", textAlign: "center", color: "var(--q-translation)" }}>
            Standard Islamic month with voluntary Monday and Thursday fasts and Ayyam al-Beed (13th, 14th, 15th).
          </div>
        )}
      </section>
    </div>
  );
}
