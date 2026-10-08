import { readFile } from "node:fs/promises";

const files = [
  "data/ala-hazrat/research.ts",
  "data/ala-hazrat/teachers.ts",
  "data/ala-hazrat/family.ts",
  "data/ala-hazrat/students.ts",
  "data/ala-hazrat/works-research.ts",
  "data/ala-hazrat/books-about.ts",
];

const sourceFile = await readFile(
  "data/ala-hazrat/sources.ts",
  "utf8"
);

const knownSourceIds = new Set(
  [...sourceFile.matchAll(/id:\s*"([^"]+)"/g)].map(
    (match) => match[1]
  )
);

const sourceIdPattern =
  /sourceIds:\s*\[([\s\S]*?)\]/g;

let totalRecords = 0;
let validRecords = 0;
let invalidRecords = 0;

console.log("");
console.log("======================================");
console.log("  ALA HAZRAT RESEARCH VALIDATION");
console.log("======================================");
console.log("");

for (const file of files) {
  const content = await readFile(file, "utf8");

  const records = [
    ...content.matchAll(
      /id:\s*"([^"]+)"[\s\S]*?sourceIds:\s*\[([\s\S]*?)\]/g
    ),
  ];

  let fileValid = 0;
  let fileInvalid = 0;

  for (const record of records) {
    const recordId = record[1];
    const sourceBlock = record[2];

    const sourceIds = [
      ...sourceBlock.matchAll(/"([^"]+)"/g),
    ].map((match) => match[1]);

    totalRecords++;

    const unknownSources = sourceIds.filter(
      (sourceId) => !knownSourceIds.has(sourceId)
    );

    if (sourceIds.length === 0) {
      invalidRecords++;
      fileInvalid++;

      console.log(
        `❌ ${recordId}: No source attached`
      );

      continue;
    }

    if (unknownSources.length > 0) {
      invalidRecords++;
      fileInvalid++;

      console.log(
        `❌ ${recordId}: Unknown source ID(s): ${unknownSources.join(
          ", "
        )}`
      );

      continue;
    }

    validRecords++;
    fileValid++;
  }

  console.log(
    `${file}: ${fileValid} valid, ${fileInvalid} invalid`
  );
}

console.log("");
console.log("--------------------------------------");
console.log(`Total Records: ${totalRecords}`);
console.log(`Valid:         ${validRecords}`);
console.log(`Invalid:       ${invalidRecords}`);
console.log("--------------------------------------");

if (invalidRecords > 0) {
  console.error("");
  console.error(
    "❌ Research validation failed."
  );
  console.error(
    "Fix the records listed above before deployment."
  );

  process.exit(1);
}

console.log("");
console.log(
  "======================================"
);
console.log(
  "  SEERAT RESEARCH MAPPING VALIDATION"
);
console.log(
  "======================================"
);
console.log("");

const seeratMapFile = await readFile(
  "data/ala-hazrat/seerat-research-map.ts",
  "utf8"
);

const seeratSectionFile = await readFile(
  "data/ala-hazrat/seerat.ts",
  "utf8"
);

const seeratSectionIds = new Set(
  [
    ...seeratSectionFile.matchAll(
      /id:\s*"([^"]+)"/g
    ),
  ].map((match) => match[1])
);

const mappedSectionIds = [
  ...seeratMapFile.matchAll(
    /sectionId:\s*"([^"]+)"/g
  ),
].map((match) => match[1]);

const uniqueMappedSectionIds = new Set(
  mappedSectionIds
);

let seeratMappingErrors = 0;

for (const sectionId of mappedSectionIds) {
  if (!seeratSectionIds.has(sectionId)) {
    seeratMappingErrors++;

    console.log(
      `❌ Unknown Seerat section in mapping: ${sectionId}`
    );
  }
}

for (const sectionId of seeratSectionIds) {
  if (!uniqueMappedSectionIds.has(sectionId)) {
    seeratMappingErrors++;

    console.log(
      `❌ Missing research mapping for Seerat section: ${sectionId}`
    );
  }
}

console.log(
  `Seerat Sections: ${seeratSectionIds.size}`
);

console.log(
  `Mapped Sections: ${uniqueMappedSectionIds.size}`
);

console.log(
  `Mapping Errors:  ${seeratMappingErrors}`
);

if (seeratMappingErrors > 0) {
  console.error("");
  console.error(
    "❌ Seerat research mapping validation failed."
  );

  process.exit(1);
}

console.log(
  "✓ Seerat research mapping passed validation."
);

console.log("");
console.log(
  "✓ All research records passed validation."
);
console.log("");
