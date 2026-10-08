export type AlaHazratSourceType =
  | "biography"
  | "bibliography"
  | "published-works"
  | "books-about"
  | "academic"
  | "reference";

export type AlaHazratSource = {
  id: string;
  title: string;
  organization: string;
  type: AlaHazratSourceType;
  url: string;
  reliabilityNote: string;
};

export const alaHazratSources: AlaHazratSource[] = [
  {
    id: "ridawi-biography",
    title: "Imam Ahmad Rida Khan",
    organization: "Ridawi",
    type: "biography",
    url: "https://www.ridawi.org/alahazrat/",
    reliabilityNote:
      "Biographical and bibliographical reference covering the life, teachers, students, spiritual connections and works of Imam Ahmad Rida Khan.",
  },

  {
    id: "ridawi-faq",
    title: "Frequently Asked Questions",
    organization: "Ridawi",
    type: "reference",
    url: "https://www.ridawi.org/faq/",
    reliabilityNote:
      "Reference material for established biographical identifiers and basic historical information.",
  },

  {
    id: "ridawi-published-works",
    title: "Published Works of Imam Ahmad Rida Khan",
    organization: "Ridawi",
    type: "published-works",
    url: "https://www.ridawi.org/alahazrat-books-download/",
    reliabilityNote:
      "Bibliographical information about published works, editions, monographs, annotations and related writings.",
  },

  {
    id: "ridawi-bibliography",
    title: "Bibliography",
    organization: "Ridawi",
    type: "bibliography",
    url: "https://www.ridawi.org/bibliography/",
    reliabilityNote:
      "Bibliographical history and records concerning the writings attributed to Imam Ahmad Rida Khan.",
  },

  {
    id: "ridawi-books-about",
    title: "Books on Alahazrat",
    organization: "Ridawi",
    type: "books-about",
    url: "https://www.ridawi.org/download-books-on-alahazrat/",
    reliabilityNote:
      "Catalogue of biographies, critical studies, works on poetry and other books written about Ala Hazrat.",
  },

  {
    id: "iiu-descriptive-bibliography",
    title: "Descriptive Bibliography of the Works of Imam Ahmad Raza Khan",
    organization: "International Islamic University",
    type: "academic",
    url: "https://journals.iiu.edu.pk/index.php/islamicstudies/article/view/2786",
    reliabilityNote:
      "Academic bibliographical research used to cross-check the documented published oeuvre and classification of writings.",
  },
];

export function getAlaHazratSource(
  id: string
): AlaHazratSource | undefined {
  return alaHazratSources.find((source) => source.id === id);
}
