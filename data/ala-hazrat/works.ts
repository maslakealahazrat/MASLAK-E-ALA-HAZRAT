// data/ala-hazrat/works.ts

export type AlaHazratWorkCategory =
  | "book"
  | "poetry-book";

export type AlaHazratWorkStatus =
  | "available"
  | "coming-soon";

export type AlaHazratWork = {
  slug: string;
  title: string;
  href: string;
  category: AlaHazratWorkCategory;
  status: AlaHazratWorkStatus;
  description?: string;
};

/**
 * Central registry of Ala Hazrat's verified books and works.
 *
 * IMPORTANT:
 * Every book is an independent work.
 *
 * Hadaiq-e-Bakhshish is also an independent book.
 * Its Naat, Manqabat, Salam and Hamd content will be handled
 * inside its own book page.
 *
 * No book is placed inside another book.
 */

export const alaHazratWorks: AlaHazratWork[] = [
  {
    slug: "kanz-ul-iman",
    title: "Kanz-ul-Iman",
    href: "/kanz-ul-iman",
    category: "book",
    status: "available",
    description: "Kanz-ul-Iman",
  },

  {
    slug: "fatawa-razawiyya",
    title: "Fatawa Razawiyya",
    href: "/fatawa-razawiyya",
    category: "book",
    status: "available",
    description: "Fatawa Razawiyya",
  },

  {
    slug: "hadaiq-e-bakhshish",
    title: "Hadaiq-e-Bakhshish",
    href: "/hadaiq-e-bakhshish",
    category: "poetry-book",
    status: "available",
    description:
      "A separate poetry book containing devotional poetry such as Naat, Manqabat, Salam and Hamd.",
  },

  {
    slug: "husam-ul-haramain",
    title: "Husam-ul-Haramain",
    href: "/ala-hazrat/books/husam-ul-haramain",
    category: "book",
    status: "coming-soon",
    description: "Husam-ul-Haramain",
  },

  {
    slug: "al-daulah-al-makkiyyah",
    title: "Al-Daulah al-Makkiyyah",
    href: "/ala-hazrat/books/al-daulah-al-makkiyyah",
    category: "book",
    status: "coming-soon",
    description: "Al-Daulah al-Makkiyyah",
  },

  {
    slug: "al-amn-wa-al-ula",
    title: "Al-Amn wa al-Ula",
    href: "/ala-hazrat/books/al-amn-wa-al-ula",
    category: "book",
    status: "coming-soon",
    description: "Al-Amn wa al-Ula",
  },

  {
    slug: "tamheed-e-iman",
    title: "Tamheed-e-Iman",
    href: "/ala-hazrat/books/tamheed-e-iman",
    category: "book",
    status: "coming-soon",
    description: "Tamheed-e-Iman",
  },

  {
    slug: "kifl-ul-faqih-al-fahim",
    title: "Kifl-ul-Faqih al-Fahim",
    href: "/ala-hazrat/books/kifl-ul-faqih-al-fahim",
    category: "book",
    status: "coming-soon",
    description: "Kifl-ul-Faqih al-Fahim",
  },

  {
    slug: "ahkam-e-shariat",
    title: "Ahkam-e-Shariat",
    href: "/ala-hazrat/books/ahkam-e-shariat",
    category: "book",
    status: "coming-soon",
    description: "Ahkam-e-Shariat",
  },

  {
    slug: "subhan-us-subuh",
    title: "Subhan-us-Subuh",
    href: "/ala-hazrat/books/subhan-us-subuh",
    category: "book",
    status: "coming-soon",
    description: "Subhan-us-Subuh",
  },

  {
    slug: "az-zubdat-uz-zakiyyah",
    title: "Az-Zubdat-uz-Zakiyyah",
    href: "/ala-hazrat/books/az-zubdat-uz-zakiyyah",
    category: "book",
    status: "coming-soon",
    description: "Az-Zubdat-uz-Zakiyyah",
  },
];
