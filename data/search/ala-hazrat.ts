import { alaHazratBiography } from "@/data/ala-hazrat/biography";
import { alaHazratSeeratSections } from "@/data/ala-hazrat/seerat";
import { alaHazratSeeratContent } from "@/data/ala-hazrat/seerat-content";

import {
  alaHazratFamily,
  alaHazratStudents,
  alaHazratTeachers,
  alaHazratResearchFacts,
  alaHazratResearchWorks,
  alaHazratBooksAbout,
} from "@/data/ala-hazrat";

import { alaHazratWorks } from "@/data/ala-hazrat/works";

import type { SearchDocument } from "./types";

/**
 * Maslak-e-Ala Hazrat — Ala Hazrat Search Documents
 *
 * Ye file visitor search ke liye Ala Hazrat se related
 * tamam available structured content ko search documents
 * mein convert karti hai.
 *
 * FUTURE:
 * Naya content data/ala-hazrat/ mein add hone ke baad
 * uska search document yahan add kar sakte hain.
 */

const commonKeywords = [
  // English
  "Ala Hazrat",
  "Aala Hazrat",
  "Alaa Hazrat",
  "Alahazrat",
  "Imam Ahmad Raza Khan",
  "Imam Ahmed Raza Khan",
  "Ahmad Raza",
  "Ahmed Raza",
  "Ahmad Rida Khan",
  "Ahmad Ridha Khan",

  // Roman Urdu
  "Ala Hazrat ki zindagi",
  "Ala Hazrat ki seerat",
  "Ala Hazrat ki kitabain",
  "Ala Hazrat ke ustad",
  "Ala Hazrat ke shagird",
  "Ala Hazrat ka khandan",
  "Ala Hazrat ki tasaneef",

  // Urdu
  "اعلی حضرت",
  "اعلیٰ حضرت",
  "امام احمد رضا خان",
  "احمد رضا خان",
  "سیرت اعلی حضرت",
  "اعلی حضرت کی کتابیں",
  "فتاویٰ رضویہ",
  "کنز الایمان",
  "حدائق بخشش",

  // Hindi
  "आला हज़रत",
  "आला हजरत",
  "इमाम अहमद रज़ा खान",
  "अहमद रज़ा खान",
  "आला हज़रत की जीवनी",
  "आला हज़रत की किताबें",
  "फतावा रज़विया",
  "कंज़ुल ईमान",
  "हदाइक़े बख्शिश",
];

const searchDocuments: SearchDocument[] = [
  // ────────────────────────────────────────
  // 1. BIOGRAPHY
  // ────────────────────────────────────────

  {
    id: "ala-hazrat-biography",
    type: "page",
    title: "Ala Hazrat — Imam Ahmad Raza Khan",
    href: "/ala-hazrat",

    text: [
      ...commonKeywords,
      alaHazratBiography.name,
      alaHazratBiography.title,

      ...alaHazratBiography.facts.flatMap((fact) => [
        fact.label,
        fact.value,
      ]),

      ...alaHazratBiography.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
      ]),
    ].join(" "),

    english:
      "Biography, life, education, family, scholarship and legacy of Imam Ahmad Raza Khan.",

    roman:
      "Ala Hazrat Imam Ahmad Raza Khan ki zindagi, taleem, khandan, ilm aur tasaneef.",

    urdu:
      "اعلیٰ حضرت امام احمد رضا خان کی سوانح، تعلیم، خاندان، علمی خدمات اور تصانیف",

    hindi:
      "आला हज़रत इमाम अहमद रज़ा ख़ान की जीवनी, शिक्षा, परिवार और विद्वत्तापूर्ण सेवाएँ",

    keywords: commonKeywords,
  },

  // ────────────────────────────────────────
  // 2. SEERAT
  // ────────────────────────────────────────

  {
    id: "ala-hazrat-seerat",
    type: "page",
    title: "Seerat-e-Ala Hazrat",
    href: "/ala-hazrat/seerat",

    text: [
      ...commonKeywords,
      "Seerat",
      "Sirat",
      "Biography",
      "Life",
      "History",
      "Hayat",
      "Sawanih",
      ...alaHazratSeeratContent.flatMap((section) => [
        section.title,
        ...section.paragraphs,
      ]),
    ].join(" "),

    english:
      "Life, history, scholarly journey and legacy of Ala Hazrat.",

    roman:
      "Seerat e Ala Hazrat, hayat, sawanih aur tareekhi maloomat.",

    urdu: "سیرت اعلیٰ حضرت اور حالات زندگی",

    hindi: "आला हज़रत की सीरत और जीवन",

    keywords: commonKeywords,
  },

  // ────────────────────────────────────────
  // 3. SEERAT SECTIONS
  // ────────────────────────────────────────

  ...alaHazratSeeratContent.map((section) => {
    const sectionInfo = alaHazratSeeratSections.find(
      (item) => item.id === section.id
    );

    return {
      id: `ala-hazrat-seerat-${section.id}`,
      type: "page" as const,

      title: `Seerat-e-Ala Hazrat — ${section.title}`,

      href: `/ala-hazrat/seerat/${section.id}`,

      text: [
        ...commonKeywords,
        "Seerat-e-Ala Hazrat",
        section.title,
        sectionInfo?.description || "",
        ...section.paragraphs,
      ].join(" "),

      english: [
        section.title,
        ...section.paragraphs,
      ].join(" "),

      roman: `Ala Hazrat seerat ${section.title}`,

      keywords: commonKeywords,
    };
  }),

  // ────────────────────────────────────────
  // 4. BOOKS AND WORKS
  // ────────────────────────────────────────

  {
    id: "ala-hazrat-all-books",
    type: "page",
    title: "Ala Hazrat — Books and Works",
    href: "/ala-hazrat/books",

    text: [
      ...commonKeywords,
      "Books",
      "Works",
      "Tasaneef",
      "Kutub",
      "Kitab",
      "Kitaab",
      "کتابیں",
      "تصانیف",
      "किताबें",
      "रचनाएँ",

      ...alaHazratWorks.flatMap((work) => [
        work.title,
        work.slug,
        work.description || "",
        work.category,
      ]),
    ].join(" "),

    english: "Books and written works associated with Ala Hazrat.",

    roman: "Ala Hazrat ki kitabain, kutub aur tasaneef.",

    urdu: "اعلیٰ حضرت کی کتابیں اور تصانیف",

    hindi: "आला हज़रत की किताबें और रचनाएँ",

    keywords: commonKeywords,
  },

  ...alaHazratWorks.map((work) => ({
    id: `ala-hazrat-work-${work.slug}`,
    type: "book" as const,

    title: work.title,

    href: work.href,

    text: [
      ...commonKeywords,
      work.title,
      work.slug.replace(/-/g, " "),
      work.description || "",
      work.category,
      work.status,
      "book kitab kitaab work tasneef",
    ].join(" "),

    english: work.description || work.title,

    roman: `${work.title} ${work.slug.replace(/-/g, " ")}`,

    keywords: commonKeywords,
  })),

  // ────────────────────────────────────────
  // 5. RESEARCH FACTS
  // ────────────────────────────────────────

  ...alaHazratResearchFacts.map((fact) => ({
    id: `ala-hazrat-research-${fact.id}`,
    type: "page" as const,

    title: `Ala Hazrat — ${fact.topic.replace(/-/g, " ")}`,

    href: "/ala-hazrat/seerat",

    text: [
      ...commonKeywords,
      fact.topic,
      fact.claim,
      fact.notes || "",
      fact.status,
    ].join(" "),

    english: fact.claim,

    roman: `${fact.topic} ${fact.claim}`,

    keywords: commonKeywords,
  })),

  // ────────────────────────────────────────
  // 6. TEACHERS AND SHAYKHS
  // ────────────────────────────────────────

  ...alaHazratTeachers.map((person) => ({
    id: `ala-hazrat-teacher-${person.id}`,
    type: "page" as const,

    title: `${person.name} — Teacher of Ala Hazrat`,

    href: "/ala-hazrat/seerat/teachers",

    text: [
      ...commonKeywords,
      person.name,
      person.relationship,
      person.description,
      person.notes || "",
      "teacher ustad shaykh",
      "استاد شیخ",
      "उस्ताद शिक्षक",
    ].join(" "),

    english: person.description,

    roman: `${person.name} teacher ustad shaykh`,

    keywords: commonKeywords,
  })),

  // ────────────────────────────────────────
  // 7. FAMILY
  // ────────────────────────────────────────

  ...alaHazratFamily.map((person) => ({
    id: `ala-hazrat-family-${person.id}`,
    type: "page" as const,

    title: `${person.name} — Ala Hazrat Family`,

    href: "/ala-hazrat/seerat/birth-and-family",

    text: [
      ...commonKeywords,
      person.name,
      person.relationship,
      person.description,
      person.notes || "",
      "family walid father grandfather",
      "خاندان والد",
      "परिवार पिता दादा",
    ].join(" "),

    english: person.description,

    roman: `${person.name} family ${person.relationship}`,

    keywords: commonKeywords,
  })),

  // ────────────────────────────────────────
  // 8. STUDENTS AND ASSOCIATES
  // ────────────────────────────────────────

  ...alaHazratStudents.map((person) => ({
    id: `ala-hazrat-student-${person.id}`,
    type: "page" as const,

    title: `${person.name} — Student / Associate of Ala Hazrat`,

    href: "/ala-hazrat/seerat/students",

    text: [
      ...commonKeywords,
      person.name,
      person.relationship,
      person.description,
      person.notes || "",
      "student shagird disciple deputy",
      "شاگرد",
      "शागिर्द विद्यार्थी",
    ].join(" "),

    english: person.description,

    roman: `${person.name} student shagird disciple`,

    keywords: commonKeywords,
  })),

  // ────────────────────────────────────────
  // 9. RESEARCH WORKS
  // ────────────────────────────────────────

  ...alaHazratResearchWorks.map((work) => ({
    id: `ala-hazrat-research-work-${work.id}`,
    type: "book" as const,

    title: work.title,

    href:
      work.id === "fatawa-razawiyya"
        ? "/ala-hazrat/books/fatawa-razawiyya"
        : work.id === "kanz-ul-iman"
          ? "/ala-hazrat/books/kanz-ul-iman"
          : work.id === "hadaiq-e-bakhshish"
            ? "/ala-hazrat/books/hadaiq-e-bakhshish"
            : "/ala-hazrat/books",

    text: [
      ...commonKeywords,
      work.title,
      work.description,
      work.type,
      work.category,
      work.language || "",
      work.notes || "",
      "book work tasneef research",
    ].join(" "),

    english: work.description,

    roman: `${work.title} Ala Hazrat work`,

    keywords: commonKeywords,
  })),

  // ────────────────────────────────────────
  // 10. BOOKS ABOUT ALA HAZRAT
  // ────────────────────────────────────────

  ...alaHazratBooksAbout.map((book) => ({
    id: `ala-hazrat-book-about-${book.id}`,
    type: "book" as const,

    title: `${book.title} — ${book.author}`,

    href: "/ala-hazrat/seerat",

    text: [
      ...commonKeywords,
      book.title,
      book.author,
      book.category,
      book.language || "",
      book.description,
      book.notes || "",
      "book about Ala Hazrat biography research",
    ].join(" "),

    english: book.description,

    roman: `${book.title} ${book.author} book about Ala Hazrat`,

    keywords: commonKeywords,
  })),
];

/**
 * Future content example:
 *
 * Jab Ala Hazrat ke kisi naye section ka data banega:
 *
 * 1. Uska data source import karo.
 * 2. Neeche searchDocuments array mein uske liye
 *    ek document ya map() block add karo.
 * 3. Har document ko unique id aur sahi href do.
 *
 * Example structure:
 *
 * {
 *   id: "ala-hazrat-new-section",
 *   type: "page",
 *   title: "New Ala Hazrat Section",
 *   text: "Search ke liye English Roman Urdu Hindi Urdu keywords",
 *   href: "/ala-hazrat/new-section",
 *   keywords: commonKeywords,
 * }
 */

export const alaHazratSearchDocuments: SearchDocument[] =
  searchDocuments;
