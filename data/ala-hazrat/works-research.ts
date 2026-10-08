import type { ResearchVerificationStatus } from "./research";
import type { AlaHazratWorkCategoryId } from "./work-categories";

export type AlaHazratWorkType =
  | "book"
  | "risala"
  | "translation"
  | "commentary"
  | "annotation"
  | "collection"
  | "poetry-collection"
  | "monograph"
  | "other";

export type AlaHazratWork = {
  id: string;
  title: string;
  alternateTitle?: string;

  /**
   * Primary bibliographical type of the work.
   */
  type: AlaHazratWorkType;

  /**
   * Central category from work-categories.ts.
   * This keeps the works registry connected to the
   * site's common work taxonomy.
   */
  category: AlaHazratWorkCategoryId;

  language?: "Arabic" | "Persian" | "Urdu" | "Multiple";

  description: string;

  verificationStatus: ResearchVerificationStatus;

  sourceIds: string[];

  notes?: string;
};

export const alaHazratResearchWorks: AlaHazratWork[] = [
  {
    id: "fatawa-razawiyya",
    title: "Fatawa Razawiyya",
    type: "collection",
    category: "collection",
    language: "Urdu",
    description:
      "A major collection of legal writings and fatwas associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-biography",
      "ridawi-published-works",
    ],
    notes:
      "Different published editions exist with different volume configurations. Edition-specific references will be recorded separately.",
  },

  {
    id: "kanz-ul-iman",
    title: "Kanz-ul-Iman",
    type: "translation",
    category: "translation",
    language: "Urdu",
    description:
      "The well-known Urdu translation of the Qur'an associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-biography",
      "ridawi-published-works",
    ],
  },

  {
    id: "hadaiq-e-bakhshish",
    title: "Hadaiq-e-Bakhshish",
    type: "poetry-collection",
    category: "poetry-collection",
    language: "Urdu",
    description:
      "A collection of devotional poetry associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-biography",
      "ridawi-published-works",
    ],
    notes:
      "The collection includes devotional poetic material and is maintained separately from Ala Hazrat's legal and scholarly books.",
  },

  {
    id: "husam-ul-haramain",
    title: "Husam-ul-Haramain",
    type: "book",
    category: "book",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan and his scholarly writings.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "al-daulah-al-makkiyyah",
    title: "Al-Daulah al-Makkiyyah",
    alternateTitle:
      "Al-Dawlat al-Makkiyyah bil-Maddat al-Ghaybiyyah",
    type: "book",
    category: "book",
    language: "Arabic",
    description:
      "A documented Arabic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "al-amn-wa-al-ula",
    title: "Al-Amn wa al-Ula",
    type: "book",
    category: "book",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "tamheed-e-iman",
    title: "Tamheed-e-Iman",
    type: "book",
    category: "book",
    language: "Urdu",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "kifl-ul-faqih-al-fahim",
    title: "Kifl-ul-Faqih al-Fahim",
    type: "book",
    category: "book",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan's scholarly writings.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "ahkam-e-shariat",
    title: "Ahkam-e-Shariat",
    type: "collection",
    category: "collection",
    language: "Urdu",
    description:
      "A documented collection associated with the legal writings and fatwas of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "subhan-us-subuh",
    title: "Subhan-us-Subuh",
    type: "book",
    category: "book",
    language: "Urdu",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "az-zubdat-uz-zakiyyah",
    title: "Az-Zubdat-uz-Zakiyyah",
    type: "book",
    category: "book",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },
];

export function getAlaHazratWork(
  id: string
): AlaHazratWork | undefined {
  return alaHazratResearchWorks.find(
    (work) => work.id === id
  );
}

export function getAlaHazratWorksByType(
  type: AlaHazratWorkType
): AlaHazratWork[] {
  return alaHazratResearchWorks.filter(
    (work) => work.type === type
  );
}

export function getAlaHazratWorksByCategory(
  category: AlaHazratWorkCategoryId
): AlaHazratWork[] {
  return alaHazratResearchWorks.filter(
    (work) => work.category === category
  );
}

export function getAlaHazratWorksByLanguage(
  language: AlaHazratWork["language"]
): AlaHazratWork[] {
  return alaHazratResearchWorks.filter(
    (work) => work.language === language
  );
}
