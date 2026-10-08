import {
  alaHazratResearchFacts,
  alaHazratTeachers,
  alaHazratFamily,
  alaHazratStudents,
  alaHazratResearchWorks,
  alaHazratBooksAbout,
} from "@/data/ala-hazrat";

import { validateResearchRecord } from "./research-validation";

export type AlaHazratValidationReport = {
  collection: string;
  total: number;
  valid: number;
  invalid: number;
  errors: {
    id: string;
    errors: string[];
  }[];
};

function validateCollection(
  collection: string,
  records: {
    id: string;
    sourceIds: string[];
    verificationStatus: string;
  }[]
): AlaHazratValidationReport {
  const results = records.map(validateResearchRecord);

  const invalidResults = results.filter(
    (result) => !result.valid
  );

  return {
    collection,
    total: results.length,
    valid: results.filter((result) => result.valid).length,
    invalid: invalidResults.length,
    errors: invalidResults.map((result) => ({
      id: result.id,
      errors: result.errors,
    })),
  };
}

export function validateAlaHazratResearch(): AlaHazratValidationReport[] {
  return [
    validateCollection(
      "Research Facts",
      alaHazratResearchFacts
    ),

    validateCollection(
      "Teachers",
      alaHazratTeachers
    ),

    validateCollection(
      "Family",
      alaHazratFamily
    ),

    validateCollection(
      "Students",
      alaHazratStudents
    ),

    validateCollection(
      "Works",
      alaHazratResearchWorks
    ),

    validateCollection(
      "Books About Ala Hazrat",
      alaHazratBooksAbout
    ),
  ];
}
