export type AlaHazratSeeratResearchMap = {
  sectionId: string;
  factIds: string[];
  teacherIds?: string[];
  familyIds?: string[];
  studentIds?: string[];
  workIds?: string[];
};

export const alaHazratSeeratResearchMap: AlaHazratSeeratResearchMap[] = [
  {
    sectionId: "introduction",
    factIds: [
      "birth-year",
      "hanafi-maturidi",
      "works-recorded",
    ],
  },

  {
    sectionId: "birth-and-family",
    factIds: [
      "birth-year",
      "father-naqi-ali-khan",
      "grandfather-rida-ali-khan",
    ],
    familyIds: [
      "naqi-ali-khan",
      "rida-ali-khan",
    ],
  },

  {
    sectionId: "childhood",
    factIds: [
      "birth-year",
      "first-teacher-grandfather",
      "father-major-teacher",
    ],
    teacherIds: [
      "rida-ali-khan",
      "naqi-ali-khan",
    ],
  },

  {
    sectionId: "education",
    factIds: [
      "father-major-teacher",
      "early-teachers",
    ],
    teacherIds: [
      "naqi-ali-khan",
      "ghulam-qadir-beyg",
      "abd-al-ali-rampuri",
    ],
  },

  {
    sectionId: "teachers",
    factIds: [
      "first-teacher-grandfather",
      "father-major-teacher",
      "early-teachers",
    ],
    teacherIds: [
      "rida-ali-khan",
      "naqi-ali-khan",
      "ghulam-qadir-beyg",
      "abd-al-ali-rampuri",
    ],
  },

  {
    sectionId: "ijazah",
    factIds: [
      "ijazah-abd-al-rahman-siraj",
    ],
    teacherIds: [
      "abd-al-rahman-al-siraj",
      "sayyid-ahmad-zayni-dahlan",
    ],
  },

  {
    sectionId: "fiqh",
    factIds: [
      "hanafi-maturidi",
      "mufti-young-age",
      "fatawa-razawiyya",
    ],
    workIds: [
      "fatawa-razawiyya",
    ],
  },

  {
    sectionId: "quran",
    factIds: [
      "quran-kanz-ul-iman",
    ],
    workIds: [
      "kanz-ul-iman",
    ],
  },

  {
    sectionId: "hadith",
    factIds: [
      "ijazah-abd-al-rahman-siraj",
    ],
    teacherIds: [
      "sayyid-ahmad-zayni-dahlan",
    ],
  },

  {
    sectionId: "tafsir",
    factIds: [
      "quran-kanz-ul-iman",
    ],
    workIds: [
      "kanz-ul-iman",
    ],
  },

  {
    sectionId: "arabic",
    factIds: [
      "works-recorded",
    ],
  },

  {
    sectionId: "persian",
    factIds: [
      "works-recorded",
    ],
  },

  {
    sectionId: "urdu",
    factIds: [
      "quran-kanz-ul-iman",
      "works-recorded",
    ],
    workIds: [
      "kanz-ul-iman",
    ],
  },

  {
    sectionId: "naat",
    factIds: [
      "hadaiq-poetry",
    ],
    workIds: [
      "hadaiq-e-bakhshish",
    ],
  },

  {
    sectionId: "hadaiq",
    factIds: [
      "hadaiq-poetry",
    ],
    workIds: [
      "hadaiq-e-bakhshish",
    ],
  },

  {
    sectionId: "major-works",
    factIds: [
      "works-recorded",
      "fatawa-razawiyya",
      "quran-kanz-ul-iman",
      "hadaiq-poetry",
    ],
    workIds: [
      "fatawa-razawiyya",
      "kanz-ul-iman",
      "hadaiq-e-bakhshish",
      "husam-ul-haramain",
      "al-daulah-al-makkiyyah",
      "al-amn-wa-al-ula",
      "tamheed-e-iman",
      "kifl-ul-faqih-al-fahim",
      "ahkam-e-shariat",
      "subhan-us-subuh",
      "az-zubdat-uz-zakiyyah",
    ],
  },

  {
    sectionId: "students",
    factIds: [],
    studentIds: [
      "zafaruddin-bihari",
      "hamid-raza-khan",
      "mustafa-raza-khan",
      "amjad-ali-azam",
      "abd-al-hamid-qadri-badayuni",
    ],
  },

  {
    sectionId: "spiritual-life",
    factIds: [
      "qadiri-initiation",
    ],
    teacherIds: [
      "sayyid-aal-e-rasul-al-ahmadi",
    ],
  },

  {
    sectionId: "family",
    factIds: [
      "father-naqi-ali-khan",
      "grandfather-rida-ali-khan",
    ],
    familyIds: [
      "naqi-ali-khan",
      "rida-ali-khan",
    ],
  },

  {
    sectionId: "scholarly-life",
    factIds: [
      "works-recorded",
      "hanafi-maturidi",
      "mufti-young-age",
    ],
  },

  {
    sectionId: "important-events",
    factIds: [
      "birth-year",
      "qadiri-initiation",
      "mufti-young-age",
      "death-year",
    ],
  },

  {
    sectionId: "final-days",
    factIds: [
      "death-year",
    ],
  },

  {
    sectionId: "wisal",
    factIds: [
      "death-year",
    ],
  },

  {
    sectionId: "legacy",
    factIds: [
      "works-recorded",
      "quran-kanz-ul-iman",
      "hadaiq-poetry",
      "fatawa-razawiyya",
    ],
    workIds: [
      "fatawa-razawiyya",
      "kanz-ul-iman",
      "hadaiq-e-bakhshish",
    ],
  },

  {
    sectionId: "seerat-books",
    factIds: [],
  },

  {
    sectionId: "references",
    factIds: [],
  },
];

export function getSeeratResearchMap(
  sectionId: string
): AlaHazratSeeratResearchMap | undefined {
  return alaHazratSeeratResearchMap.find(
    (item) => item.sectionId === sectionId
  );
}

export function getSeeratResearchFactIds(
  sectionId: string
): string[] {
  return getSeeratResearchMap(sectionId)?.factIds ?? [];
}

export function getSeeratResearchTeacherIds(
  sectionId: string
): string[] {
  return getSeeratResearchMap(sectionId)?.teacherIds ?? [];
}

export function getSeeratResearchFamilyIds(
  sectionId: string
): string[] {
  return getSeeratResearchMap(sectionId)?.familyIds ?? [];
}

export function getSeeratResearchStudentIds(
  sectionId: string
): string[] {
  return getSeeratResearchMap(sectionId)?.studentIds ?? [];
}

export function getSeeratResearchWorkIds(
  sectionId: string
): string[] {
  return getSeeratResearchMap(sectionId)?.workIds ?? [];
  }
