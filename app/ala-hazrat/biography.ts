// data/ala-hazrat/biography.ts

export type BiographyFact = {
  label: string;
  value: string;
};

export type BiographySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const alaHazratBiography = {
  name: "Imam Ahmad Raza Khan",
  title: "Ala Hazrat",
  penName: "Raza",

  facts: [
    {
      label: "Born",
      value: "14 June 1856",
    },
    {
      label: "Birthplace",
      value: "Bareilly, India",
    },
    {
      label: "Died",
      value: "28 October 1921",
    },
    {
      label: "Place of Death",
      value: "Bareilly, India",
    },
    {
      label: "Father",
      value: "Maulana Naqi Ali Khan",
    },
    {
      label: "Jurisprudence",
      value: "Hanafi",
    },
  ] satisfies BiographyFact[],

  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        "Imam Ahmad Raza Khan, widely known as Ala Hazrat, was an Islamic scholar, jurist and devotional poet associated with Bareilly, India.",
        "He is particularly known for his scholarship in Hanafi Islamic law, his legal writings, his Urdu Qur'an translation Kanz-ul-Iman, and his devotional poetry.",
      ],
    },

    {
      id: "early-life",
      title: "Early Life and Education",
      paragraphs: [
        "Imam Ahmad Raza Khan was born on 14 June 1856 in Bareilly, India.",
        "His father, Maulana Naqi Ali Khan, played an important role in his early and advanced religious education.",
      ],
    },

    {
      id: "scholarship",
      title: "Scholarship and Literary Work",
      paragraphs: [
        "He became known for his scholarship in Hanafi Islamic jurisprudence and for his extensive writing across religious and literary subjects.",
        "His legal rulings are associated with Fatawa Razawiyya, while Kanz-ul-Iman is his well-known Urdu translation of the Qur'an.",
      ],
    },

    {
      id: "poetry",
      title: "Devotional Poetry",
      paragraphs: [
        "His devotional poetry is prominently associated with Hadaiq-e-Bakhshish, a separate poetry collection.",
        "The collection is associated with devotional forms including Naat, Manqabat, Salam and Hamd.",
      ],
    },

    {
      id: "legacy",
      title: "Legacy",
      paragraphs: [
        "Imam Ahmad Raza Khan left a substantial body of religious and literary writings.",
        "His published works include legal writings, Qur'anic translation, devotional poetry and other religious treatises.",
      ],
    },
  ] satisfies BiographySection[],

  sources: [
    {
      title: "Rekhta — Ahamd Raza Khan Barelvi Profile",
      url: "https://www.rekhta.org/poets/ahamd-raza-khan-barelvi/profile",
    },
    {
      title: "Ridawi — Imam Ahmad Rida Khan",
      url: "https://www.ridawi.org/alahazrat/",
    },
    {
      title: "Ridawi — Published Works",
      url: "https://www.ridawi.org/alahazrat-books-download/",
    },
  ],
} as const;
