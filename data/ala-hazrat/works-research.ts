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
      "Different published editions exist with different volume configurations.",
  },

  {
    id: "kanz-ul-iman",
    title: "Kanz-ul-Iman",
    type: "translation",
    category: "translation",
    language: "Urdu",
    description:
      "The well-known Urdu explanatory translation of the Qur'an associated with Imam Ahmad Raza Khan.",
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
      "Maintained separately from Ala Hazrat's legal and scholarly books.",
  },

  {
    id: "husam-ul-haramain",
    title: "Husam-ul-Haramain",
    alternateTitle:
      "Husam al-Haramayn ala Man'har al-Kufri wa'l Mayn",
    type: "book",
    category: "major-work",
    language: "Arabic",
    description:
      "A documented Arabic work associated with Imam Ahmad Raza Khan.",
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
    category: "major-work",
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

  {
    id: "al-istimdad",
    title: "Al-Istimdad",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
    notes:
      "Ridawi's published-works catalogue lists an edition with an appendix (Takmilat) by Mufti Azam Hind.",
  },

  {
    id: "al-malfuz",
    title: "Al-Malfuz",
    alternateTitle: "Malfuzat-e-Alahazrat",
    type: "collection",
    category: "collection",
    language: "Urdu",
    description:
      "A published collection of the sayings and dictated material associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
    notes:
      "Ridawi lists a four-volume published edition and also records an older first edition.",
  },

  {
    id: "matlaa-al-qamarayn",
    title: "Matla'a al-Qamarayn fi Ibanati Sabaqati'l Umarayn",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented work concerning the precedence of Sayyiduna Abu Bakr and Sayyiduna Umar.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "khutbat-e-razawiyyah",
    title: "Khutbat-e-Razawiyyah",
    alternateTitle: "Khutbat Ridawiyyah",
    type: "collection",
    category: "collection",
    language: "Arabic",
    description:
      "A published collection of Arabic khutbahs associated with Imam Ahmad Raza Khan for Jumu'ah and Eid.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "al-wasaya",
    title: "Al-Wasaya",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented work recording the will of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
    notes:
      "Ridawi describes it as the will dictated shortly before his passing.",
  },

  {
    id: "al-wazifah-al-karimah",
    title: "Al-Wazifah al-Karimah",
    type: "collection",
    category: "collection",
    language: "Urdu",
    description:
      "A documented compilation of prayers and everyday litanies associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },
    {
    id: "fatawa-al-haramayn",
    title: "Fatawa al-Haramayn",
    type: "book",
    category: "major-work",
    language: "Arabic",
    description:
      "A documented Arabic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "al-ijazat-al-matinah",
    title: "Al-Ijazat al-Matinah",
    alternateTitle:
      "Ijazatu'l Matinah li Ulama'i Bakkah wa'l Madinah",
    type: "book",
    category: "book",
    language: "Arabic",
    description:
      "A documented Arabic work associated with Imam Ahmad Raza Khan's scholarly ijazah-related writings.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "al-mustanad-al-mutamad",
    title: "Al-Mustanad al-Mu'tamad",
    alternateTitle:
      "Al-Mustanad al-Mu'tamad in the annotation of Al-Mutaqad al-Muntaqad",
    type: "commentary",
    category: "commentary",
    language: "Arabic",
    description:
      "An Arabic scholarly work by Imam Ahmad Raza Khan associated with his annotations on Al-Mutaqad al-Muntaqad.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-biography",
      "ridawi-published-works",
    ],
    notes:
      "The underlying Al-Mutaqad al-Muntaqad is attributed to Imam Fadl al-Rasul al-Badauni; this record represents Al-Mustanad al-Mu'tamad, not the underlying work.",
  },

  {
    id: "jadd-al-mumtar",
    title: "Jadd al-Mumtar",
    alternateTitle:
      "Annotations on Radd al-Muhtar",
    type: "annotation",
    category: "annotation",
    language: "Arabic",
    description:
      "A documented set of annotations by Imam Ahmad Raza Khan on Imam Ibn Abidin's Radd al-Muhtar.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
    notes:
      "Ridawi lists a seven-volume edition of Jadd al-Mumtar.",
  },

  {
    id: "anwar-al-intibah",
    title: "Anwar al-Intibah",
    alternateTitle:
      "Anwar al-Intibah fi Hilli Nida'i Ya RasulAllah",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "azka-al-ihlal",
    title: "Azka al-Ihlal",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "bayat-o-khilafat",
    title: "Bay'at o Khilafat",
    alternateTitle:
      "Naqa al-Sulafah fi Ahkami'l Bay'ati wa'l Khilafah",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "al-fadl-al-mawhibi",
    title: "Al-Fadl al-Mawhibi fi Ma'ana idha Sahha'l Hadithu Fa Huwa Madh'habi",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
    notes:
      "Ridawi records a 1319 AH / 1901 CE edition printed during Imam Ahmad Raza Khan's lifetime.",
  },

  {
    id: "ghayatu-t-tahqiq",
    title: "Ghayatu't Tahqiq fi Imamati'l Aliyy wa's Siddiq",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan concerning the Khilafah of Sayyiduna Abu Bakr and Sayyiduna Ali.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "jumal-al-nur",
    title: "Jumal al-Nur fi Nahyi'n Nisaa an Ziyarat al-Qubur",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "khalisu-l-itiqad",
    title: "Khalisu'l I'tiqad",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "munabbih-al-munya",
    title: "Munabbih al-Munya",
    alternateTitle:
      "Munabbih al-Munyah bi Wusul al-Habibi al-Arsh wa'l Ru'yaa",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "munir-al-ayn",
    title: "Munir al-Ayn fi Hukmi Taqbil al-Ibhamayn",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented monographic work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "qahru-d-dayyan",
    title: "Qahru'd Dayyan ala Murtadd bi Qadiyan",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "ra-ad-al-qahati",
    title: "Ra'd al-Qahati wa'l Wabaa",
    alternateTitle: "Raad al-Qahati wa'l Wabaa",
    type: "monograph",
    category: "monograph",
    language: "Arabic",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
  },

  {
    id: "zamzamah-al-qumriyyah",
    title: "Zamzamah al-Qumriyyah",
    type: "monograph",
    category: "monograph",
    language: "Urdu",
    description:
      "A documented work associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: [
      "ridawi-published-works",
    ],
    notes:
      "Ridawi describes it as defending the Qasidah of Ghawth al-Azam.",
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
