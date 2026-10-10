const fs = require("fs");
const path = require("path");

const root = process.cwd();

const arabicFile = path.join(
  root,
  "data/quran/quran-uthmani.txt"
);

const translationFiles = [
  {
    name: "Urdu — Kanz-ul-Iman",
    file: path.join(
      root,
      "data/translations/ur.kanzuliman.txt"
    ),
  },
  {
    name: "English — Ahmed Raza Khan",
    file: path.join(
      root,
      "data/translations/en.ahmedraza.txt"
    ),
  },
];

function readReferences(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`File nahi mili: ${file}`);
  }

  const content = fs
    .readFileSync(file, "utf8")
    .replace(/^\uFEFF/, "");

  const references = new Map();
  const errors = [];
  let validLines = 0;

  for (const [index, rawLine] of content.split(/\r?\n/).entries()) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const first = line.indexOf("|");
    const second = line.indexOf("|", first + 1);

    if (first < 1 || second < 0) {
      errors.push(`Line ${index + 1}: format galat hai`);
      continue;
    }

    const surahText = line.slice(0, first);
    const ayahText = line.slice(first + 1, second);
    const text = line.slice(second + 1);

    if (
      !/^\d+$/.test(surahText) ||
      !/^\d+$/.test(ayahText) ||
      !text.trim()
    ) {
      errors.push(`Line ${index + 1}: reference ya text galat hai`);
      continue;
    }

    const surah = Number(surahText);
    const ayah = Number(ayahText);
    const key = `${surah}|${ayah}`;

    if (surah < 1 || surah > 114 || ayah < 1) {
      errors.push(`Line ${index + 1}: reference range se bahar hai`);
      continue;
    }

    if (references.has(key)) {
      errors.push(`Line ${index + 1}: duplicate reference ${key}`);
      continue;
    }

    references.set(key, true);
    validLines++;
  }

  return { references, errors, validLines };
}

function main() {
  console.log("\nQuran translation reference validation\n");

  const arabic = readReferences(arabicFile);
  let failed = arabic.errors.length > 0;

  console.log(`Arabic reference count: ${arabic.validLines}`);

  if (arabic.errors.length > 0) {
    console.log("Arabic file mein errors:");
    arabic.errors.slice(0, 20).forEach((error) =>
      console.log(`- ${error}`)
    );
  }

  for (const item of translationFiles) {
    console.log(`\nChecking: ${item.name}`);

    if (!fs.existsSync(item.file)) {
  console.log("File nahi mili; validation adhuri hai.");
  console.log(`Expected location: ${path.relative(root, item.file)}`);
  failed = true;
  continue;
}

    const translation = readReferences(item.file);
    const errors = [...translation.errors];
    const missing = [];
    const extra = [];

    for (const key of arabic.references.keys()) {
      if (!translation.references.has(key)) {
        missing.push(key);
      }
    }

    for (const key of translation.references.keys()) {
      if (!arabic.references.has(key)) {
        extra.push(key);
      }
    }

    console.log(`Valid entries: ${translation.validLines}`);
    console.log(`Missing references: ${missing.length}`);
    console.log(`Unexpected references: ${extra.length}`);
    console.log(`Format/duplicate errors: ${errors.length}`);

    if (missing.length > 0) {
      console.log("Missing examples:", missing.slice(0, 10).join(", "));
    }

    if (extra.length > 0) {
      console.log("Unexpected examples:", extra.slice(0, 10).join(", "));
    }

    if (errors.length > 0) {
      errors.slice(0, 10).forEach((error) =>
        console.log(`- ${error}`)
      );
    }

    if (missing.length || extra.length || errors.length) {
      failed = true;
    }
  }

  console.log("\nValidation finished.");
  console.log(
    failed
      ? "Kuch checks fail hue hain; results dobara dekho."
      : "Available files ke reference checks pass hue."
  );
}

try {
  main();
} catch (error) {
  console.error(`Validation nahi ho saki: ${error.message}`);
  process.exitCode = 1;
}
