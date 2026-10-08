import { alaHazratSeeratSections } from "./seerat";
import { alaHazratSeeratResearchMap } from "./seerat-research-map";
import { alaHazratResearchFacts } from "./research";
import { alaHazratTeachers, alaHazratIjazahs } from "./teachers";
import { alaHazratFamily } from "./family";
import { alaHazratStudents } from "./students";
import { alaHazratResearchWorks } from "./works-research";

export type SeeratResearchValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateSeeratResearchMapping(): SeeratResearchValidationResult {
  const errors: string[] = [];

  const sectionIds = new Set(
    alaHazratSeeratSections.map(
      (section) => section.id
    )
  );

  const factIds = new Set(
    alaHazratResearchFacts.map(
      (fact) => fact.id
    )
  );

  const teacherIds = new Set(
    [
      ...alaHazratTeachers.map(
        (teacher) => teacher.id
      ),
      ...alaHazratIjazahs.map(
        (ijazah) => ijazah.scholarId
      ),
    ]
  );

  const familyIds = new Set(
    alaHazratFamily.map(
      (member) => member.id
    )
  );

  const studentIds = new Set(
    alaHazratStudents.map(
      (student) => student.id
    )
  );

  const workIds = new Set(
    alaHazratResearchWorks.map(
      (work) => work.id
    )
  );

  const mappedSectionIds = new Set<string>();

  for (const mapping of alaHazratSeeratResearchMap) {
    if (!sectionIds.has(mapping.sectionId)) {
      errors.push(
        `Unknown Seerat section: ${mapping.sectionId}`
      );
    }

    mappedSectionIds.add(mapping.sectionId);

    for (const factId of mapping.factIds) {
      if (!factIds.has(factId)) {
        errors.push(
          `Unknown research fact "${factId}" in section "${mapping.sectionId}".`
        );
      }
    }

    for (const teacherId of mapping.teacherIds ?? []) {
      if (!teacherIds.has(teacherId)) {
        errors.push(
          `Unknown teacher/scholar "${teacherId}" in section "${mapping.sectionId}".`
        );
      }
    }

    for (const familyId of mapping.familyIds ?? []) {
      if (!familyIds.has(familyId)) {
        errors.push(
          `Unknown family member "${familyId}" in section "${mapping.sectionId}".`
        );
      }
    }

    for (const studentId of mapping.studentIds ?? []) {
      if (!studentIds.has(studentId)) {
        errors.push(
          `Unknown student "${studentId}" in section "${mapping.sectionId}".`
        );
      }
    }

    for (const workId of mapping.workIds ?? []) {
      if (!workIds.has(workId)) {
        errors.push(
          `Unknown work "${workId}" in section "${mapping.sectionId}".`
        );
      }
    }
  }

  for (const section of alaHazratSeeratSections) {
    if (!mappedSectionIds.has(section.id)) {
      errors.push(
        `Seerat section is missing from research mapping: ${section.id}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
