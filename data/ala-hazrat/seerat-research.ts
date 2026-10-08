import {
  getSeeratResearchMap,
  getSeeratResearchFactIds,
  getSeeratResearchTeacherIds,
  getSeeratResearchFamilyIds,
  getSeeratResearchStudentIds,
  getSeeratResearchWorkIds,
} from "./seerat-research-map";

import {
  getResearchFactById,
  type AlaHazratResearchFactWithSources,
} from "./research-facts";

import { getAlaHazratTeacher } from "./teachers";
import { getAlaHazratFamilyMember } from "./family";
import { getAlaHazratStudent } from "./students";
import { getAlaHazratWork } from "./works-research";

export function getSeeratResearchFacts(
  sectionId: string
): AlaHazratResearchFactWithSources[] {
  return getSeeratResearchFactIds(sectionId)
    .map((factId) => getResearchFactById(factId))
    .filter(
      (
        fact
      ): fact is AlaHazratResearchFactWithSources =>
        fact !== undefined
    );
}

export function getSeeratResearchTeachers(
  sectionId: string
) {
  return getSeeratResearchTeacherIds(sectionId)
    .map((teacherId) => getAlaHazratTeacher(teacherId))
    .filter((teacher) => teacher !== undefined);
}

export function getSeeratResearchFamily(
  sectionId: string
) {
  return getSeeratResearchFamilyIds(sectionId)
    .map((familyId) => getAlaHazratFamilyMember(familyId))
    .filter((member) => member !== undefined);
}

export function getSeeratResearchStudents(
  sectionId: string
) {
  return getSeeratResearchStudentIds(sectionId)
    .map((studentId) => getAlaHazratStudent(studentId))
    .filter((student) => student !== undefined);
}

export function getSeeratResearchWorks(
  sectionId: string
) {
  return getSeeratResearchWorkIds(sectionId)
    .map((workId) => getAlaHazratWork(workId))
    .filter((work) => work !== undefined);
}

export function getSeeratResearchSummary(
  sectionId: string
) {
  const map = getSeeratResearchMap(sectionId);

  if (!map) {
    return {
      sectionId,
      facts: 0,
      teachers: 0,
      family: 0,
      students: 0,
      works: 0,
    };
  }

  return {
    sectionId,
    facts: getSeeratResearchFacts(sectionId).length,
    teachers: getSeeratResearchTeachers(sectionId).length,
    family: getSeeratResearchFamily(sectionId).length,
    students: getSeeratResearchStudents(sectionId).length,
    works: getSeeratResearchWorks(sectionId).length,
  };
}
