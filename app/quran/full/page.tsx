import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./FullQuran.module.css";

export const revalidate = 86400;

type Surah = {
  number: number;
  name: string;
  arabicName: string;
};

type Ayah = {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  surahName: string;
};

export default async function FullQuranPage() {
  let surahs: Surah[] = [];
  let ayahsList: Ayah[] = [];

  if (supabase) {
    const [surahRes, ayahRes] = await Promise.all([
      supabase
        .from("quran_surahs")
        .select("surah_number, name_english, name_arabic")
        .order("surah_number", { ascending: true }),
      supabase
        .from("quran_ayahs")
        .select("surah_number, ayah_number, arabic_text")
        .order("surah_number", { ascending: true })
        .order("ayah_number", { ascending: true }),
    ]);

    if (surahRes.data) {
      surahs = surahRes.data.map((s) => ({
        number: s.surah_number,
        name: s.name_english,
        arabicName: s.name_arabic,
      }));
    }

    if (ayahRes.data && surahRes.data) {
      const surahNameMap = new Map(
        surahRes.data.map((s) => [s.surah_number, s.name_english])
      );

      ayahsList = ayahRes.data.map((a) => ({
        id: `${a.surah_number}-${a.ayah_number}`,
        surahNumber: Number(a.surah_number),
        ayahNumber: Number(a.ayah_number),
        arabic: a.arabic_text,
        surahName: surahNameMap.get(a.surah_number) || `Surah ${a.surah_number}`,
      }));
    }
  }

  return (
    <main className={styles.fullQuranPage}>
      <section className={styles.fullQuranHero}>
        <Link href="/quran" className={styles.quranBack}>← All Surahs</Link>
        <div className={styles.fullQuranArabicTitle}>القرآن الكريم</div>
        <div className={styles.fullQuranEyebrow}>THE NOBLE QUR’AN</div>
        <h1>Read Full Qur’an</h1>
        <p>Poora Qur’an ek hi jagah par padhiye.</p>
      </section>

      <section className={styles.fullQuranContent}>
        {surahs.map((surah) => {
          // Yahan exact matching ensure ki gayi hai taaki 0 Ayahs ki problem na aaye
          const ayahs = ayahsList.filter(
            (ayah) => ayah.surahNumber === Number(surah.number)
          );

          return (
            <section key={surah.number} id={"surah-" + surah.number} className={styles.fullQuranSurah}>
              <header className={styles.fullQuranSurahHeader}>
                <div className={styles.fullQuranSurahHeading}>
                  <div className={styles.fullQuranSurahArabic}>{surah.arabicName}</div>
                  <h2>{surah.name}</h2>
                  <span>Surah {surah.number}</span>
                </div>
              </header>

              <div className={styles.fullQuranShareRow}>
                <span className={styles.fullQuranShareLabel}>
                  Surah {surah.number} · {ayahs.length} Ayahs
                </span>
              </div>

              <div className={styles.fullQuranSourceLine}>
                <span>Qur’an text:</span>
                <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">Tanzil Project</a>
              </div>

              <div className={styles.fullQuranAyahs} dir="rtl">
                {ayahs.map((ayah) => (
                  <span key={ayah.id} id={"ayah-" + ayah.surahNumber + "-" + ayah.ayahNumber} className={styles.fullQuranAyah}>
                    <span className={styles.fullQuranAyahText}>{ayah.arabic}</span>
                    <span className={styles.fullQuranAyahMarker} aria-label={"Ayah " + ayah.ayahNumber}>
                      ۝{ayah.ayahNumber}
                    </span>
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="quranSource">
        <p>Arabic Qur’an text sourced from the Tanzil Project.</p>
        <a href="https://tanzil.net/" target="_blank" rel="noopener noreferrer">Tanzil Project</a>
      </section>
    </main>
  );
}
