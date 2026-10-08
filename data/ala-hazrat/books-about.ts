import type { ResearchVerificationStatus } from "./research";

export type AlaHazratBookAboutCategory =
  | "biography"
  | "critical-study"
  | "poetry-study"
  | "kanz-ul-iman-study"
  | "defence"
  | "refutation"
  | "eulogy"
  | "research"
  | "other";

export type AlaHazratBookAbout = {
  id: string;
  title: string;
  author: string;
  category: AlaHazratBookAboutCategory;
  language?: "Urdu" | "Arabic" | "Persian" | "English" | "Multiple";
  description: string;
  verificationStatus: ResearchVerificationStatus;
  sourceIds: string[];
  notes?: string;
};

export const alaHazratBooksAbout: AlaHazratBookAbout[] = [
  {
    id: "hayat-e-ala-hazrat",
    title: "Hayat-e-Ala Hazrat",
    author: "Mawlana Zafaruddin Bihari",
    category: "biography",
    language: "Urdu",
    description:
      "A documented biographical work on the life of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
    notes:
      "Ridawi's catalogue lists multiple published editions of this biography.",
  },

  {
    id: "ikram-e-imam-ahmad-raza",
    title: "Ikram-e-Imam Ahmad Raza",
    author: "Mawlana Burhanul Haq Jabalpuri",
    category: "eulogy",
    language: "Urdu",
    description:
      "A documented work on Imam Ahmad Raza Khan listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "sawanih-e-alahazrat-maana-miyan",
    title: "Sawanih-e-Alahazrat",
    author: "Mawlana Maana Miyan Pilibhiti",
    category: "biography",
    language: "Urdu",
    description:
      "A biographical work on Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "sirat-e-mujaddid-e-aazam",
    title: "Sirat-e-Mujaddid-e-Aazam",
    author: "Mawlana Abdul Hakim Akhtar Shahjahanpuri",
    category: "biography",
    language: "Urdu",
    description:
      "A biographical work on Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "yad-e-alahazrat",
    title: "Yad-e-Alahazrat",
    author: "Mawlana Abdul Hakim Sharaf Qadri",
    category: "biography",
    language: "Urdu",
    description:
      "A documented work about Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "sawanih-e-alahazrat-badruddin",
    title: "Sawanih-e-Alahazrat",
    author: "Mawlana Badruddin Ahmad",
    category: "biography",
    language: "Urdu",
    description:
      "A biographical work on Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "sirat-e-imam-ahmad-raza",
    title: "Sirat-e-Imam Ahmad Raza",
    author: "Shaykh Abdul Hakim Akhtar Shahjahanpuri",
    category: "biography",
    language: "Urdu",
    description:
      "A biographical work on Imam Ahmad Raza Khan listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "mujaddid-e-islam",
    title: "Mujaddid-e-Islam",
    author: "Mawlana Sabir-ul Qadri Naseem Bastawi",
    category: "biography",
    language: "Urdu",
    description:
      "A documented biographical work on Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "zikr-e-raza",
    title: "Zikr-e-Raza",
    author: "Mawlana Mahmood Jan Qadri",
    category: "biography",
    language: "Urdu",
    description:
      "A documented biographical work on Ala Hazrat; Ridawi describes it as an early biography and a biography in verse.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "hayat-e-imam-e-ahl-e-sunnat",
    title: "Hayat-e-Imam-e-Ahl-e-Sunnat",
    author: "Prof. Dr. Muhammad Masud",
    category: "biography",
    language: "Urdu",
    description:
      "A biographical work on Imam Ahmad Raza Khan listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "muhaddis-bareylawi",
    title: "Muhaddis Bareylawi",
    author: "Mawlana Prof. Dr. Masud Ahmad",
    category: "biography",
    language: "Urdu",
    description:
      "A documented work about Imam Ahmad Raza Khan listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "hayat-e-imam-ahmad-raza",
    title: "Hayat-e-Imam Ahmad Raza",
    author: "Prof. Dr. Mohammad Masud Ahmad",
    category: "biography",
    language: "Urdu",
    description:
      "A biographical work on Imam Ahmad Raza Khan listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "tazkirah-e-alahazrat",
    title: "Tazkirah-e-Alahazrat",
    author: "Mawlana Abdul Mannan Azmi",
    category: "biography",
    language: "Urdu",
    description:
      "A documented biographical/tazkirah work on Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "fayzan-e-ala-hazrat",
    title: "Fayzan-e-A'ala Hazrat",
    author: "Hafiz Muhammad Rayhan Attari",
    category: "biography",
    language: "Urdu",
    description:
      "A documented work on Ala Hazrat listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "hayat-e-raza-ki-nayi-jihatein",
    title: "Hayat-e-Raza ki Nayi Jihatein",
    author: "Jabir Shams Misbahi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research-oriented work about Imam Ahmad Raza Khan listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },
  
  {
    id: "ala-hazrat-aur-unki-shayari",
    title: "Ala Hazrat aur Unki Shayari",
    author: "Mawlana Abdul Mannan Azmi",
    category: "poetry-study",
    language: "Urdu",
    description:
      "A documented study related to the poetry of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-hadith",
    title: "Alahazrat aur Ilm-e-Hadith",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and Hadith scholarship.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-fun-e-tafsir",
    title: "Alahazrat aur Fun-e-Tafsir",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and Tafsir.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-fiqh",
    title: "Alahazrat aur Ilm-e-Fiqh",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and Islamic jurisprudence.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-kalam",
    title: "Alahazrat aur Ilm-e-Kalam",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and Ilm al-Kalam.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-tibb",
    title: "Alahazrat aur Ilm-e-Tibb",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and the field of traditional medicine.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-riyazi",
    title: "Alahazrat aur Ilm-e-Riyazi",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and mathematics.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-falakiyat",
    title: "Alahazrat aur Ilm-e-Falakiyat",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and astronomy.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-jafr",
    title: "Alahazrat aur Ilm-e-Jafr",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and the study of Jafr.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-tasawwuf",
    title: "Alahazrat aur Ilm-e-Tasawwuf",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and Tasawwuf.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-adab",
    title: "Alahazrat aur Ilm-e-Adab",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and literary scholarship.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "alahazrat-aur-ilm-e-lughat",
    title: "Alahazrat aur Ilm-e-Lughat",
    author: "Mawlana Abdul Mannan Azmi",
    category: "research",
    language: "Urdu",
    description:
      "A documented research work concerning Imam Ahmad Raza Khan and linguistic scholarship.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "kanz-ul-iman-aur-uski-khususiyat",
    title: "Kanz-ul-Iman aur Uski Khususiyat",
    author: "Mawlana Abdul Mannan Azmi",
    category: "kanz-ul-iman-study",
    language: "Urdu",
    description:
      "A documented study concerning Kanz-ul-Iman and its characteristics.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "tarjuma-e-kanz-ul-iman",
    title: "Tarjuma-e-Kanz-ul-Iman",
    author: "Research work listed in Ridawi's catalogue",
    category: "kanz-ul-iman-study",
    language: "Urdu",
    description:
      "A documented work concerning the study of Kanz-ul-Iman listed in Ridawi's catalogue.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "imam-ahmad-raza-aur-tahqiq",
    title: "Imam Ahmad Raza aur Tahqiq",
    author: "Research work listed in Ridawi's catalogue",
    category: "research",
    language: "Urdu",
    description:
      "A documented research-oriented work concerning Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },

  {
    id: "ala-hazrat-fikr-o-fan",
    title: "Ala Hazrat: Fikr-o-Fan",
    author: "Research work listed in Ridawi's catalogue",
    category: "critical-study",
    language: "Urdu",
    description:
      "A documented critical and scholarly study concerning Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
  },
];

export function getAlaHazratBookAbout(
  id: string
): AlaHazratBookAbout | undefined {
  return alaHazratBooksAbout.find(
    (book) => book.id === id
  );
}

export function getAlaHazratBooksAboutByCategory(
  category: AlaHazratBookAboutCategory
): AlaHazratBookAbout[] {
  return alaHazratBooksAbout.filter(
    (book) => book.category === category
  );
}

export function getAlaHazratBooksAboutByLanguage(
  language: AlaHazratBookAbout["language"]
): AlaHazratBookAbout[] {
  return alaHazratBooksAbout.filter(
    (book) => book.language === language
  );
}
