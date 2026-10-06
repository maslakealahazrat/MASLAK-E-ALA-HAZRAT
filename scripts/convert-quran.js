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

  // Expected format: Surah|Ayah|Arabic
  if (parts.length < 3) {
    continue;
  }

  const surahNumber = Number(parts[0]);
  const ayahNumber = Number(parts[1]);
  const arabic = parts.slice(2).join("|");

  if (
    !Number.isInteger(surahNumber) ||
    !Number.isInteger(ayahNumber) ||
    arabic.length === 0
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

const output = `// Quran Arabic text source: Tanzil Project
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

export const quranAyahs: QuranAyah[] = ${JSON.stringify(
  ayahs,
  null,
  2
)}.map((ayah) => ({
  ...ayah,
  surahName: \`Surah \${ayah.surahNumber}\`,
  surahNameArabic: \`سورة \${ayah.surahNumber}\`,
}));
`;

fs.writeFileSync(outputPath, output, "utf8");

console.log(
  \`Done! Generated \${ayahs.length} ayahs in data/quran/ayahs.ts\`
);
