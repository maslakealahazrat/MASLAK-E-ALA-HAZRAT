import {
  alaHazratResearchFacts,
  alaHazratTeachers,
  alaHazratFamily,
  alaHazratStudents,
  alaHazratResearchWorks,
  alaHazratBooksAbout,
  alaHazratSources,
  alaHazratWorkCategories,
} from "@/data/ala-hazrat";

export const alaHazratResearchSummary = {
  facts: alaHazratResearchFacts.length,

  verifiedFacts: alaHazratResearchFacts.filter(
    (fact) => fact.status === "verified"
  ).length,

  teachers: alaHazratTeachers.length,

  familyMembers: alaHazratFamily.length,

  students: alaHazratStudents.length,

  works: alaHazratResearchWorks.length,

  verifiedWorks: alaHazratResearchWorks.filter(
    (work) => work.verificationStatus === "verified"
  ).length,

  booksAboutAlaHazrat: alaHazratBooksAbout.length,

  sources: alaHazratSources.length,

  workCategories: alaHazratWorkCategories.length,
} as const;
