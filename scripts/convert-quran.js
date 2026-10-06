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

  if (!trimmed) {
    continue;
  }

  if (/^Page number\s+\d+$/i.test(trimmed)) {
    continue;
  }

  const parts = trimmed.split("|");

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
    id: String(surahNumber) + "-" + String(ayahNumber),
    surahNumber: surahNumber,
    ayahNumber: ayahNumber,
    arabic: arabic
  });
}

const header =
  "// Quran Arabic text source: Tanzil Project\n" +
  "// Source: https://tanzil.net/\n" +
  "// IMPORTANT: Preserve the original Tanzil Arabic text unchanged.\n\n" +
  "export type QuranAyah = {\n" +
  "  id: string;\n" +
  "  surahNumber: number;\n" +
  "  ayahNumber: number;\n" +
  "  arabic: string;\n" +
  "  surahName: string;\n" +
  "  surahNameArabic: string;\n" +
  "};\n\n";

const data =
  "export const quranAyahs: QuranAyah[] = " +
  JSON.stringify(ayahs, null, 2) +
  ".map((ayah) => ({\n" +
  "  ...ayah,\n" +
  "  surahName: \"Surah \" + ayah.surahNumber,\n" +
  "  surahNameArabic: \"سورة \" + ayah.surahNumber\n" +
  "}));\n";

fs.writeFileSync(outputPath, header + data, "utf8");

console.log(
  "Done! Generated " +
  ayahs.length +
  " ayahs in data/quran/ayahs.ts"
);
