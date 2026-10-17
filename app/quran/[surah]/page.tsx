import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { quranAyahs } from "@/data/quran/ayahs";
import { ALL_SURAHS } from "@/data/quran/surahs-meta";
import { getTranslationsForSurah } from "@/lib/translations-loader";
import QuranSurahReader from "@/components/QuranSurahReader";

type PageProps = {
  params: Promise<{ surah: string }>;
};

export async function generateStaticParams() {
  return ALL_SURAHS.map((s) => ({
    surah: String(s.number),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { surah } = await params;
  const number = Number(surah);

  const surahMeta = ALL_SURAHS.find((s) => s.number === number);

  if (!Number.isInteger(number) || number < 1 || number > 114 || !surahMeta) {
    return {
      title: "Surah Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `Surah ${surahMeta.nameEnglish} (${surahMeta.nameArabic}) — Read & Listen with Kanz-ul-Iman`;
  const description = `Read and listen to Surah ${surahMeta.nameEnglish} (${surahMeta.meaningEnglish}) with audio recitations by Mishary Alafasy, Abdul Basit, and Urdu Kanz-ul-Iman translation by Ala Hazrat.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/quran/${number}`,
    },
    openGraph: {
      type: "article",
      title: `${surahMeta.nameArabic} - Surah ${surahMeta.nameEnglish} | Qur’an Majeed`,
      description,
      url: `/quran/${number}`,
      siteName: "Maslak-e-Ala Hazrat",
    },
  };
}

export default async function SurahPage({ params }: PageProps) {
  const { surah } = await params;
  const surahNumber = Number(surah);

  if (
    !Number.isInteger(surahNumber) ||
    surahNumber < 1 ||
    surahNumber > 114
  ) {
    notFound();
  }

  const surahMeta = ALL_SURAHS.find((s) => s.number === surahNumber);
  if (!surahMeta) {
    notFound();
  }

  const localAyahs = quranAyahs.filter(
    (ayah) => ayah.surahNumber === surahNumber
  );

  if (localAyahs.length === 0) {
    notFound();
  }

  // Load verified Urdu (Kanz-ul-Iman) and English translations
  const { urdu, english } = await getTranslationsForSurah(surahNumber);

  return (
    <main>
      <QuranSurahReader
        surah={surahMeta}
        ayahs={localAyahs}
        urduTranslations={urdu}
        englishTranslations={english}
        allSurahs={ALL_SURAHS}
      />
    </main>
  );
}
