const fs = require("fs");
const path = require("path");

const quranPath = path.join(
  __dirname,
  "..",
  "data",
  "quran",
  "quran-uthmani.txt"
);

const metadataPath = path.join(
  __dirname,
  "..",
  "data",
  "quran",
  "quran-data.xml"
);

const outputPath = path.join(
  __dirname,
  "..",
  "data",
  "quran",
  "ayahs.ts"
);

const quranText = fs.readFileSync(quranPath, "utf8");
const metadataText = fs.readFileSync(metadataPath, "utf8");

/*
 * Read Tanzil quran-data.xml
 *
 * Tanzil metadata uses SURA elements with attributes such as:
 * INDEX, NAME, TNAME, ENAME, AYAS, etc.
 */

const surahMap = new Map();

const surahMatches = metadataText.match(/<SURA\b[^>]*>/gi) || [];

for (const tag of surahMatches) {
  const getAttribute = (name) => {
    const match = tag.match(
      new RegExp(name + '="([^"]*)"', "i")
    );

    return match ? match[1] : "";
  };

  const index = Number(getAttribute("INDEX"));
  const name = getAttribute("NAME");
  const tname = getAttribute("TNAME");
  const ename = getAttribute("ENAME");

  if (
    !Number.isInteger(index) ||
    index < 1 ||
    index > 114 ||
    !name ||
    !tname ||
    !ename
  ) {
    throw new Error(
      "Invalid Tanzil metadata found for Surah: " + index
    );
  }

  if (surahMap.has(index)) {
    throw new Error(
      "Duplicate Tanzil metadata for Surah: " + index
    );
  }

  surahMap.set(index, {
    arabicName: name,
    transliterationName: tname,
    englishName: ename
  });
}

/*
 * Safety check:
 * All 114 Surahs must exist.
 */

if (surahMap.size !== 114) {
  throw new Error(
    "Tanzil metadata validation failed. Expected 114 Surahs, found " +
      surahMap.size +
      ". ayahs.ts was NOT generated."
  );
}

for (let i = 1; i <= 114; i++) {
  if (!surahMap.has(i)) {
    throw new Error(
      "Tanzil metadata missing Surah " +
        i +
        ". ayahs.ts was NOT generated."
    );
  }
}

/*
 * Read Tanzil Quran Arabic text.
 * IMPORTANT:
 * The Arabic text is copied exactly as supplied.
 */

const lines = quranText.split(/\r?\n/);

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

  if (surahNumber < 1 || surahNumber > 114) {
    throw new Error(
      "Invalid Surah number in Quran text: " +
        surahNumber
    );
  }

  const surah = surahMap.get(surahNumber);

  if (!surah) {
    throw new Error(
      "No Tanzil metadata found for Surah " +
        surahNumber
    );
  }

  ayahs.push({
    id: String(surahNumber) + "-" + String(ayahNumber),
    surahNumber: surahNumber,
    ayahNumber: ayahNumber,
    arabic: arabic,
    surahName: surah.transliterationName,
    surahNameArabic: surah.arabicName
  });
}

/*
 * Final safety checks.
 */

if (ayahs.length === 0) {
  throw new Error(
    "No Ayahs were found. ayahs.ts was NOT generated."
  );
}

const surahsFound = new Set(
  ayahs.map((ayah) => ayah.surahNumber)
);

if (surahsFound.size !== 114) {
  throw new Error(
    "Quran text validation failed. Expected 114 Surahs, found " +
      surahsFound.size +
      ". ayahs.ts was NOT generated."
  );
}

/*
 * Generate TypeScript file.
 */

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
  ";\n";

fs.writeFileSync(
  outputPath,
  header + data,
  "utf8"
);

console.log(
  "Success! Generated " +
    ayahs.length +
    " Ayahs with verified Tanzil Surah metadata."
);

console.log(
  "Verified 114 Surah names from quran-data.xml."
);
