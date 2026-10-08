import type { ResearchVerificationStatus } from "./research";

export type AlaHazratStudentRelationship =
  | "student"
  | "disciple"
  | "deputy"
  | "student-and-disciple"
  | "student-and-deputy"
  | "disciple-and-deputy"
  | "student-disciple-and-deputy";

export type AlaHazratStudent = {
  id: string;
  name: string;
  relationship: AlaHazratStudentRelationship;
  description: string;
  verificationStatus: ResearchVerificationStatus;
  sourceIds: string[];
  notes?: string;
};

export const alaHazratStudents: AlaHazratStudent[] = [
  {
    id: "zafaruddin-bihari",
    name: "Mawlana Zafaruddin Bihari",
    relationship: "student",
    description:
      "Mawlana Zafaruddin Bihari is documented in the biographical record among the scholars associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
    notes:
      "His biographical and bibliographical connection with Ala Hazrat will be expanded after checking the relevant biographical sources and editions.",
  },

  {
    id: "hamid-raza-khan",
    name: "Hamid Raza Khan",
    relationship: "student-and-deputy",
    description:
      "Hamid Raza Khan is documented in the biographical record among the prominent scholars and deputies associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "mustafa-raza-khan",
    name: "Mustafa Raza Khan",
    relationship: "student-and-deputy",
    description:
      "Mustafa Raza Khan is documented in the biographical record among the prominent scholars and deputies associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "amjad-ali-azam",
    name: "Mawlana Amjad Ali Azmi",
    relationship: "student-and-deputy",
    description:
      "Mawlana Amjad Ali Azmi is documented among the prominent scholars associated with the scholarly legacy of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "abd-al-hamid-qadri-badayuni",
    name: "Mawlana Abd al-Hamid Qadri Badayuni",
    relationship: "student",
    description:
      "Mawlana Abd al-Hamid Qadri Badayuni is documented in the biographical record among scholars associated with Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },
];

export function getAlaHazratStudent(
  id: string
): AlaHazratStudent | undefined {
  return alaHazratStudents.find(
    (student) => student.id === id
  );
}

export function getAlaHazratStudentsByRelationship(
  relationship: AlaHazratStudentRelationship
): AlaHazratStudent[] {
  return alaHazratStudents.filter(
    (student) => student.relationship === relationship
  );
}
