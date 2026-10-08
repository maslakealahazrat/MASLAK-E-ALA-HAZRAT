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
 * Every book/work is kept as an independent work.
 *
 * Hadaiq-e-Bakhshish is an independent poetry book.
 * Its Naat, Manqabat, Salam and Hamd content will be handled
 * inside its own dedicated book page.
 *
 * Fatawa Razawiyya is a separate independent work.
 *
 * This registry does not claim to be a complete catalogue
 * of every work attributed to Ala Hazrat.
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

  {
    slug: "al-istimdad",
    title: "Al-Istimdad",
    href: "/ala-hazrat/books/al-istimdad",
    category: "book",
    status: "coming-soon",
    description: "Al-Istimdad",
  },

  {
    slug: "al-malfuz",
    title: "Al-Malfuz",
    href: "/ala-hazrat/books/al-malfuz",
    category: "book",
    status: "coming-soon",
    description: "Al-Malfuz",
  },

  {
    slug: "matlaa-al-qamarayn",
    title: "Matlaa al-Qamarayn",
    href: "/ala-hazrat/books/matlaa-al-qamarayn",
    category: "book",
    status: "coming-soon",
    description: "Matlaa al-Qamarayn",
  },

  {
    slug: "khutbat-e-razawiyyah",
    title: "Khutbat-e-Razawiyyah",
    href: "/ala-hazrat/books/khutbat-e-razawiyyah",
    category: "collection",
    status: "coming-soon",
    description: "Khutbat-e-Razawiyyah",
  },

  {
    slug: "al-wasaya",
    title: "Al-Wasaya",
    href: "/ala-hazrat/books/al-wasaya",
    category: "book",
    status: "coming-soon",
    description: "Al-Wasaya",
  },

  {
    slug: "al-wazifah-al-karimah",
    title: "Al-Wazifah al-Karimah",
    href: "/ala-hazrat/books/al-wazifah-al-karimah",
    category: "book",
    status: "coming-soon",
    description: "Al-Wazifah al-Karimah",
  },

  {
    slug: "fatawa-al-haramayn",
    title: "Fatawa al-Haramayn",
    href: "/ala-hazrat/books/fatawa-al-haramayn",
    category: "book",
    status: "coming-soon",
    description: "Fatawa al-Haramayn",
  },

  {
    slug: "al-ijazat-al-matinah",
    title: "Al-Ijazat al-Matinah",
    href: "/ala-hazrat/books/al-ijazat-al-matinah",
    category: "book",
    status: "coming-soon",
    description: "Al-Ijazat al-Matinah",
  },

  {
    slug: "al-mustanad-al-mutamad",
    title: "Al-Mustanad al-Mu'tamad",
    href: "/ala-hazrat/books/al-mustanad-al-mutamad",
    category: "book",
    status: "coming-soon",
    description: "Al-Mustanad al-Mu'tamad",
  },

  {
    slug: "jadd-al-mumtar",
    title: "Jadd al-Mumtar",
    href: "/ala-hazrat/books/jadd-al-mumtar",
    category: "book",
    status: "coming-soon",
    description: "Jadd al-Mumtar",
  },

  {
    slug: "anwar-al-intibah",
    title: "Anwar al-Intibah",
    href: "/ala-hazrat/books/anwar-al-intibah",
    category: "book",
    status: "coming-soon",
    description: "Anwar al-Intibah",
  },

  {
    slug: "azka-al-ihlal",
    title: "Azka al-Ihlal",
    href: "/ala-hazrat/books/azka-al-ihlal",
    category: "book",
    status: "coming-soon",
    description: "Azka al-Ihlal",
  },

  {
    slug: "bayat-o-khilafat",
    title: "Bayat-o-Khilafat",
    href: "/ala-hazrat/books/bayat-o-khilafat",
    category: "book",
    status: "coming-soon",
    description: "Bayat-o-Khilafat",
  },

  {
    slug: "al-fadl-al-mawhibi",
    title: "Al-Fadl al-Mawhobi",
    href: "/ala-hazrat/books/al-fadl-al-mawhibi",
    category: "book",
    status: "coming-soon",
    description: "Al-Fadl al-Mawhobi",
  },

  {
    slug: "ghayatu-t-tahqiq",
    title: "Ghayatu't-Tahqiq",
    href: "/ala-hazrat/books/ghayatu-t-tahqiq",
    category: "book",
    status: "coming-soon",
    description: "Ghayatu't-Tahqiq",
  },

  {
    slug: "jumal-al-nur",
    title: "Jumal al-Nur",
    href: "/ala-hazrat/books/jumal-al-nur",
    category: "book",
    status: "coming-soon",
    description: "Jumal al-Nur",
  },

  {
    slug: "khalisu-l-itiqad",
    title: "Khalisu'l-I'tiqad",
    href: "/ala-hazrat/books/khalisu-l-itiqad",
    category: "book",
    status: "coming-soon",
    description: "Khalisu'l-I'tiqad",
  },

  {
    slug: "munabbih-al-munya",
    title: "Munabbih al-Munya",
    href: "/ala-hazrat/books/munabbih-al-munya",
    category: "book",
    status: "coming-soon",
    description: "Munabbih al-Munya",
  },

  {
    slug: "munir-al-ayn",
    title: "Munir al-Ayn",
    href: "/ala-hazrat/books/munir-al-ayn",
    category: "book",
    status: "coming-soon",
    description: "Munir al-Ayn",
  },

  {
    slug: "qahru-d-dayyan",
    title: "Qahru'd-Dayyan",
    href: "/ala-hazrat/books/qahru-d-dayyan",
    category: "book",
    status: "coming-soon",
    description: "Qahru'd-Dayyan",
  },

  {
    slug: "ra-ad-al-qahati",
    title: "Ra'ad al-Qahati",
    href: "/ala-hazrat/books/ra-ad-al-qahati",
    category: "book",
    status: "coming-soon",
    description: "Ra'ad al-Qahati",
  },

  {
    slug: "zamzamah-al-qumriyyah",
    title: "Zamzamah al-Qumriyyah",
    href: "/ala-hazrat/books/zamzamah-al-qumriyyah",
    category: "book",
    status: "coming-soon",
    description: "Zamzamah al-Qumriyyah",
  },
];
