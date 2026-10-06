export type SearchContentType =
  | "quran"
  | "hadith"
  | "naat"
  | "manqabat"
  | "fatawa"
  | "ala-hazrat"
  | "seerat"
  | "book"
  | "article";

export type SearchItem = {
  id: string;
  type: SearchContentType;

  title: string;
  description?: string;

  href: string;

  /**
   * Search ke liye extra words.
   * Example:
   * Hindi, Urdu, Roman, English,
   * alternate spellings, keywords etc.
   */
  keywords?: string[];
};

export const siteSearchIndex: SearchItem[] = [
  {
    id: "ala-hazrat",
    type: "ala-hazrat",
    title: "Ala Hazrat",
    description:
      "Imam Ahmad Raza Khan, Ala Hazrat ki zindagi, ilm aur Islamic teachings.",
    href: "/ala-hazrat",
    keywords: [
      "Ala Hazrat",
      "Imam Ahmad Raza Khan",
      "Ahmad Raza Khan",
      "Ahmed Raza Khan",
      "Ahmad Raza",
      "Ala Hazrat Bareilly",
      "اعلی حضرت",
      "احمد رضا خان",
    ],
  },

  {
    id: "naat-manqabat",
    type: "naat",
    title: "Naat / Manqabat",
    description:
      "Naat, Manqabat aur Islamic kalaam.",
    href: "/naat-manqabat",
    keywords: [
      "Naat",
      "Manqabat",
      "Naat Sharif",
      "Manqabat Sharif",
      "नात",
      "मनक़बत",
      "نعت",
      "منقبت",
    ],
  },

  {
    id: "hadaiq-e-bakhshish",
    type: "book",
    title: "Hadaiq-e-Bakhshish",
    description:
      "Hadaiq-e-Bakhshish aur Ala Hazrat ka mashhoor kalaam.",
    href: "/hadaiq-e-bakhshish",
    keywords: [
      "Hadaiq e Bakhshish",
      "Hadaiq-e-Bakhshish",
      "Hadaiq",
      "Bakhshish",
      "حدائق بخشش",
    ],
  },

  {
    id: "fatawa-razawiyya",
    type: "fatawa",
    title: "Fatawa Razawiyya",
    description:
      "Fatawa Razawiyya aur Islamic masail.",
    href: "/fatawa-razawiyya",
    keywords: [
      "Fatawa Razawiyya",
      "Fatawa Razvia",
      "Fatawa",
      "Islamic Fatawa",
      "فتاوی رضویہ",
      "فتاویٰ رضویہ",
    ],
  },

  {
    id: "kanz-ul-iman",
    type: "book",
    title: "Kanz-ul-Iman",
    description:
      "Kanz-ul-Iman aur Quran translation.",
    href: "/kanz-ul-iman",
    keywords: [
      "Kanz ul Iman",
      "Kanz-ul-Iman",
      "Kanzul Iman",
      "Quran Translation",
      "کنز الایمان",
      "کنزالایمان",
    ],
  },

  {
    id: "seerat-un-nabi",
    type: "seerat",
    title: "Seerat-un-Nabi ﷺ",
    description:
      "Rasool Allah ﷺ ki Seerat aur Islamic knowledge.",
    href: "/seerat-un-nabi",
    keywords: [
      "Seerat",
      "Seerat un Nabi",
      "Seerat-un-Nabi",
      "Prophet Muhammad",
      "Muhammad ﷺ",
      "سیرت النبی",
      "سیرت",
    ],
  },

  {
    id: "hadith",
    type: "hadith",
    title: "Hadith",
    description:
      "Ahadith aur Hadith se related Islamic knowledge.",
    href: "/hadith",
    keywords: [
      "Hadith",
      "Hadees",
      "Ahadith",
      "Hadis",
      "حدیث",
      "احادیث",
    ],
  },

  {
    id: "ilm-ka-safar",
    type: "article",
    title: "Ilm Ka Safar",
    description:
      "Islamic knowledge aur ilm ka safar.",
    href: "/ilm-ka-safar",
    keywords: [
      "Ilm Ka Safar",
      "Islamic Knowledge",
      "Ilm",
      "Knowledge",
      "علم",
      "اسلامی علم",
    ],
  },

  {
    id: "islamic-books",
    type: "book",
    title: "Islamic Books",
    description:
      "Islamic books aur kutub.",
    href: "/islamic-books",
    keywords: [
      "Islamic Books",
      "Books",
      "Kutub",
      "Islamic Literature",
      "اسلامی کتابیں",
      "کتب",
    ],
  },

  {
    id: "gulzar-e-millat",
    type: "article",
    title: "Gulzar-e-Millat",
    description:
      "Gulzar-e-Millat se related Islamic content.",
    href: "/gulzar-e-millat",
    keywords: [
      "Gulzar e Millat",
      "Gulzar-e-Millat",
      "گلزار ملت",
    ],
  },

  {
    id: "quran-samajhne-ka-safar",
    type: "article",
    title: "Qur’an Samajhne Ka Safar",
    description:
      "Qur’an ko samajhne aur seekhne ka safar.",
    href: "/quran-samajhne-ka-safar",
    keywords: [
      "Quran Samajhne Ka Safar",
      "Quran Samajhna",
      "Quran Learning",
      "Quran",
      "قرآن",
      "قرآن سمجھنے",
    ],
  },

  {
    id: "artist-biography",
    type: "article",
    title: "Artist Biography",
    description:
      "Islamic artists aur unki biographies.",
    href: "/artist-biography",
    keywords: [
      "Artist Biography",
      "Islamic Artist",
      "Biography",
      "Artists",
      "فنکار",
      "سوانح",
    ],
  },

  {
    id: "about",
    type: "article",
    title: "About",
    description:
      "Maslak-e-Ala Hazrat website ke baare mein.",
    href: "/about",
    keywords: [
      "About",
      "About Us",
      "Maslak-e-Ala Hazrat",
    ],
  },

  {
    id: "contact",
    type: "article",
    title: "Contact",
    description:
      "Maslak-e-Ala Hazrat se contact karein.",
    href: "/contact",
    keywords: [
      "Contact",
      "Contact Us",
      "Rabita",
      "رابطہ",
    ],
  },

  {
    id: "disclaimer",
    type: "article",
    title: "Disclaimer",
    description:
      "Website disclaimer aur important information.",
    href: "/disclaimer",
    keywords: [
      "Disclaimer",
      "Important Information",
    ],
  },
];
