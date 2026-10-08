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

for (const sectionId of uniqueMappedSectionIds) {
  const occurrences = mappedSectionIds.filter(
    (id) => id === sectionId
  ).length;

  if (occurrences > 1) {
    seeratMappingErrors++;

    console.log(
      `❌ Duplicate Seerat research mapping: ${sectionId} (${occurrences} entries)`
    );
  }
}

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

const seeratResearchMapContent =
  await readFile(
    "data/ala-hazrat/seerat-research-map.ts",
    "utf8"
  );

const researchFactIds = new Set(
  [
    ...(
      await readFile(
        "data/ala-hazrat/research.ts",
        "utf8"
      )
    ).matchAll(
      /id:\s*"([^"]+)"/g
    ),
  ].map((match) => match[1])
);

const workResearchIds = new Set(
  [
    ...(
      await readFile(
        "data/ala-hazrat/works-research.ts",
        "utf8"
      )
    ).matchAll(
      /id:\s*"([^"]+)"/g
    ),
  ].map((match) => match[1])
);

const teacherIds = new Set(
  [
    ...(
      await readFile(
        "data/ala-hazrat/teachers.ts",
        "utf8"
      )
    ).matchAll(
      /id:\s*"([^"]+)"/g
    ),
  ].map((match) => match[1])
);

const familyIds = new Set(
  [
    ...(
      await readFile(
        "data/ala-hazrat/family.ts",
        "utf8"
      )
    ).matchAll(
      /id:\s*"([^"]+)"/g
    ),
  ].map((match) => match[1])
);

const studentIds = new Set(
  [
    ...(
      await readFile(
        "data/ala-hazrat/students.ts",
        "utf8"
      )
    ).matchAll(
      /id:\s*"([^"]+)"/g
    ),
  ].map((match) => match[1])
);

const mappedFactIds = [
  ...seeratResearchMapContent.matchAll(
    /factIds:\s*\[([\s\S]*?)\]/g
  ),
].flatMap((match) =>
  [...match[1].matchAll(/"([^"]+)"/g)].map(
    (item) => item[1]
  )
);

const mappedWorkIds = [
  ...seeratResearchMapContent.matchAll(
    /workIds:\s*\[([\s\S]*?)\]/g
  ),
].flatMap((match) =>
  [...match[1].matchAll(/"([^"]+)"/g)].map(
    (item) => item[1]
  )
);

const mappedTeacherIds = [
  ...seeratResearchMapContent.matchAll(
    /teacherIds:\s*\[([\s\S]*?)\]/g
  ),
].flatMap((match) =>
  [...match[1].matchAll(/"([^"]+)"/g)].map(
    (item) => item[1]
  )
);

const mappedFamilyIds = [
  ...seeratResearchMapContent.matchAll(
    /familyIds:\s*\[([\s\S]*?)\]/g
  ),
].flatMap((match) =>
  [...match[1].matchAll(/"([^"]+)"/g)].map(
    (item) => item[1]
  )
);

const mappedStudentIds = [
  ...seeratResearchMapContent.matchAll(
    /studentIds:\s*\[([\s\S]*?)\]/g
  ),
].flatMap((match) =>
  [...match[1].matchAll(/"([^"]+)"/g)].map(
    (item) => item[1]
  )
);

const mappingIdErrors = [
  ...mappedFactIds
    .filter((id) => !researchFactIds.has(id))
    .map(
      (id) =>
        `Unknown research fact ID: ${id}`
    ),

  ...mappedWorkIds
    .filter((id) => !workResearchIds.has(id))
    .map(
      (id) =>
        `Unknown research work ID: ${id}`
    ),

  ...mappedTeacherIds
    .filter((id) => !teacherIds.has(id))
    .map(
      (id) =>
        `Unknown teacher ID: ${id}`
    ),

  ...mappedFamilyIds
    .filter((id) => !familyIds.has(id))
    .map(
      (id) =>
        `Unknown family ID: ${id}`
    ),

  ...mappedStudentIds
    .filter((id) => !studentIds.has(id))
    .map(
      (id) =>
        `Unknown student ID: ${id}`
    ),
];

if (mappingIdErrors.length > 0) {
  console.log("");

  for (const error of mappingIdErrors) {
    console.log(`❌ ${error}`);
  }

  console.error("");
  console.error(
    "❌ Seerat research ID validation failed."
  );

  process.exit(1);
}

console.log(
  "✓ Seerat research IDs passed validation."
);

console.log("");
console.log(
  "✓ All research records passed validation."
);
console.log("");
