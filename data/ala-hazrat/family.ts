import type { ResearchVerificationStatus } from "./research";

export type AlaHazratFamilyRelationship =
  | "father"
  | "grandfather"
  | "mother"
  | "wife"
  | "son"
  | "daughter"
  | "grandson"
  | "granddaughter"
  | "other";

export type AlaHazratFamilyMember = {
  id: string;
  name: string;
  relationship: AlaHazratFamilyRelationship;
  description: string;
  verificationStatus: ResearchVerificationStatus;
  sourceIds: string[];
  notes?: string;
};

export const alaHazratFamily: AlaHazratFamilyMember[] = [
  {
    id: "naqi-ali-khan",
    name: "Mawlana Naqi Ali Khan",
    relationship: "father",
    description:
      "Mawlana Naqi Ali Khan is documented as the father of Imam Ahmad Raza Khan and as an important scholar and teacher in his early education.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
  },

  {
    id: "rida-ali-khan",
    name: "Rida Ali Khan",
    relationship: "grandfather",
    description:
      "Rida Ali Khan is documented as the grandfather of Imam Ahmad Raza Khan and is also recorded as his first teacher.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
  },
];

export function getAlaHazratFamilyMember(
  id: string
): AlaHazratFamilyMember | undefined {
  return alaHazratFamily.find(
    (member) => member.id === id
  );
}

export function getAlaHazratFamilyByRelationship(
  relationship: AlaHazratFamilyRelationship
): AlaHazratFamilyMember[] {
  return alaHazratFamily.filter(
    (member) => member.relationship === relationship
  );
}
