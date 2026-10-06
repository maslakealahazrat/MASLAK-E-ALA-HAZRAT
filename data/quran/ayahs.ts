export type QuranAyah = {
  id: string;
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  ayahNumber: number;
  arabic: string;
};

export const quranAyahs: QuranAyah[] = [
  {
    id: "1-1",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    surahNameArabic: "الفاتحة",
    ayahNumber: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  },

  {
    id: "1-2",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    surahNameArabic: "الفاتحة",
    ayahNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  },
];
