import { quranAyahs } from "@/data/quran/ayahs";
import type { SearchDocument } from "./types";

export const quranSearchDocuments: SearchDocument[] =
  quranAyahs.map((ayah) => ({
    id: `quran-${ayah.surahNumber}-${ayah.ayahNumber}`,

    type: "quran",

    title: `${ayah.surahName} ${ayah.surahNumber}:${ayah.ayahNumber}`,

    text: [
      ayah.arabic,
      ayah.surahName,
      ayah.surahNameArabic,
      String(ayah.surahNumber),
      String(ayah.ayahNumber),
    ].join(" "),

    href: `/quran/${ayah.surahNumber}#ayah-${ayah.ayahNumber}`,

    arabic: ayah.arabic,

    surahNumber: ayah.surahNumber,

    ayahNumber: ayah.ayahNumber,
  }));
