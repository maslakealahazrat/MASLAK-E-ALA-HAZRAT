export type AlaHazratWorkCategoryId =
  | "book"
  | "risala"
  | "translation"
  | "commentary"
  | "annotation"
  | "collection"
  | "poetry-collection"
  | "monograph"
  | "major-work"
  | "marginalia"
  | "old-print"
  | "manuscript"
  | "other";

export type AlaHazratWorkCategory = {
  id: AlaHazratWorkCategoryId;
  title: string;
  description: string;
};

export const alaHazratWorkCategories: AlaHazratWorkCategory[] = [
  {
    id: "book",
    title: "Books",
    description:
      "Individually documented books and substantial works associated with Imam Ahmad Raza Khan.",
  },
  {
    id: "risala",
    title: "Rasail",
    description:
      "Individual treatises and shorter scholarly writings associated with Imam Ahmad Raza Khan.",
  },
  {
    id: "translation",
    title: "Translations",
    description:
      "Translations associated with Imam Ahmad Raza Khan. A translation is not automatically treated as an original work.",
  },
  {
    id: "commentary",
    title: "Commentaries",
    description:
      "Commentarial works in which Imam Ahmad Raza Khan explains or discusses another scholarly text.",
  },
  {
    id: "annotation",
    title: "Annotations",
    description:
      "Annotations and explanatory notes written on earlier scholarly works.",
  },
  {
    id: "collection",
    title: "Collections",
    description:
      "Collected material such as Fatawa Razawiyya and other documented compilations.",
  },
  {
    id: "poetry-collection",
    title: "Poetry Collections",
    description:
      "Collections of devotional poetry, including Hadaiq-e-Bakhshish.",
  },
  {
    id: "monograph",
    title: "Monographs",
    description:
      "Detailed individual scholarly treatises, many of which were later included in Fatawa Razawiyya editions.",
  },
  {
    id: "major-work",
    title: "Major Works",
    description:
      "Prominent works separately identified in bibliographical catalogues.",
  },
  {
    id: "marginalia",
    title: "Marginalia",
    description:
      "Scholarly marginal notes and annotations on established works.",
  },
  {
    id: "old-print",
    title: "Old & Individual Prints",
    description:
      "Earlier or separately printed editions of works, preserved as bibliographical records.",
  },
  {
    id: "manuscript",
    title: "Manuscripts",
    description:
      "Manuscript witnesses of works, including manuscripts in Ala Hazrat's own hand or copied manuscripts.",
  },
  {
    id: "other",
    title: "Other",
    description:
      "Verified material that does not fit the primary categories above.",
  },
];

export function getAlaHazratWorkCategory(
  id: AlaHazratWorkCategoryId
): AlaHazratWorkCategory | undefined {
  return alaHazratWorkCategories.find(
    (category) => category.id === id
  );
}
