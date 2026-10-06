const fs = require("fs");
const path = require("path");

const inputPath = path.join(
  __dirname,
  "..",
  "data",
  "quran",
  "quran-uthmani.txt"
);

const outputPath = path.join(
  __dirname,
  "..",
  "data",
  "quran",
  "ayahs.ts"
);

const text = fs.readFileSync(inputPath, "utf8");

const lines = text.split(/\r?\n/);

const ayahs = [];

for (const line of lines) {
  const trimmed = line.trim();

  // Ignore empty lines and page-number lines
  if (!trimmed || /^Page number\s+\d+$/i.test(trimmed)) {
    continue;
  }

  const parts = trimmed.split("|");

  // Expected format:
  // Surah|Ayah|Arabic text
  if (parts.length < 3) {
    continue;
  }

  const surahNumber = Number(parts[0]);
  const ayahNumber = Number(parts[1]);
  const arabic = parts.slice(2).join("|");

  if (
    !Number.isInteger(surahNumber) ||
    !Number.isInteger(ayahNumber) ||
    !arabic
  ) {
    continue;
  }

  ayahs.push({
    id: `${surahNumber}-${ayahNumber}`,
    surahNumber,
    ayahNumber,
    arabic,
  });
}

const output = `// Qur'an Arabic text source: Tanzil Project
// Source: https://tanzil.net/
// IMPORTANT: Preserve the original Tanzil Arabic text unchanged.

export type QuranAyah = {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  surahName: string;
  surahNameArabic: string;
};

const surahNames = ${JSON.stringify(
  [
    "Al-Fatihah",
    "Al-Baqarah",
    "Aal-E-Imran",
    "An-Nisa",
    "Al-Ma'idah",
    "Al-An'am",
    "Al-A'raf",
    "Al-Anfal",
    "At-Tawbah",
    "Yunus",
    "Hud",
    "Yusuf",
    "Ar-Ra'd",
    "Ibrahim",
    "Al-Hijr",
    "An-Nahl",
    "Al-Isra",
    "Al-Kahf",
    "Maryam",
    "Ta-Ha",
    "Al-Anbiya",
    "Al-Hajj",
    "Al-Mu'minun",
    "An-Nur",
    "Al-Furqan",
    "Ash-Shu'ara",
    "An-Naml",
    "Al-Qasas",
    "Al-Ankabut",
    "Ar-Rum",
    "Luqman",
    "As-Sajdah",
    "Al-Ahzab",
    "Saba",
    "Fatir",
    "Ya-Sin",
    "As-Saffat",
    "Sad",
    "Az-Zumar",
    "Ghafir",
    "Fussilat",
    "Ash-Shura",
    "Az-Zukhruf",
    "Ad-Dukhan",
    "Al-Jathiyah",
    "Al-Ahqaf",
    "Muhammad",
    "Al-Fath",
    "Al-Hujurat",
    "Qaf",
    "Adh-Dhariyat",
    "At-Tur",
    "An-Najm",
    "Al-Qamar",
    "Ar-Rahman",
    "Al-Waqi'ah",
    "Al-Hadid",
    "Al-Mujadilah",
    "Al-Hashr",
    "Al-Mumtahanah",
    "As-Saff",
    "Al-Jumu'ah",
    "Al-Munafiqun",
    "At-Taghabun",
    "At-Talaq",
    "At-Tahrim",
    "Al-Mulk",
    "Al-Qalam",
    "Al-Haqqah",
    "Al-Ma'arij",
    "Nuh",
    "Al-Jinn",
    "Al-Muzzammil",
    "Al-Muddaththir",
    "Al-Qiyamah",
    "Al-Insan",
    "Al-Mursalat",
    "An-Naba",
    "An-Nazi'at",
    "Abasa",
    "At-Takwir",
    "Al-Infitar",
    "Al-Mutaffifin",
    "Al-Inshiqaq",
    "Al-Buruj",
    "At-Tariq",
    "Al-A'la",
    "Al-Ghashiyah",
    "Al-Fajr",
    "Al-Balad",
    "Ash-Shams",
    "Al-Layl",
    "Ad-Duha",
    "Ash-Sharh",
    "At-Tin",
    "Al-Alaq",
    "Al-Qadr",
    "Al-Bayyinah",
    "Az-Zalzalah",
    "Al-Adiyat",
    "Al-Qari'ah",
    "At-Takathur",
    "Al-Asr",
    "Al-Humazah",
    "Al-Fil",
    "Quraysh",
    "Al-Ma'un",
    "Al-Kawthar",
    "Al-Kafirun",
    "An-Nasr",
    "Al-Masad",
    "Al-Ikhlas",
    "Al-Falaq",
    "An-Nas"
  ],
  null,
  2
)};

const surahArabicNames = ${JSON.stringify(
  [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
    "الأنعام",
    "الأ
    
