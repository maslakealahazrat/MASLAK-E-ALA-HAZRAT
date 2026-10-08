import type { ResearchVerificationStatus } from "./research";

export type AlaHazratTeacher = {
  id: string;
  name: string;
  relationship:
    | "teacher"
    | "spiritual-guide"
    | "ijazah-scholar"
    | "teacher-and-ijazah-scholar";
  description: string;
  verificationStatus: ResearchVerificationStatus;
  sourceIds: string[];
  notes?: string;
};

export const alaHazratTeachers: AlaHazratTeacher[] = [
  {
    id: "rida-ali-khan",
    name: "Rida Ali Khan",
    relationship: "teacher",
    description:
      "Rida Ali Khan is recorded in the biographical record as the first teacher of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "naqi-ali-khan",
    name: "Mawlana Naqi Ali Khan",
    relationship: "teacher",
    description:
      "Mawlana Naqi Ali Khan, the father of Imam Ahmad Raza Khan, taught a substantial portion of his traditional curriculum and was one of his principal scholarly influences.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
  },

  {
    id: "ghulam-qadir-beyg",
    name: "Mawlana Ghulam Qadir Beyg",
    relationship: "teacher",
    description:
      "The biographical record associates Mawlana Ghulam Qadir Beyg with Imam Ahmad Raza Khan's early education.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "abd-al-ali-rampuri",
    name: "Mawlana Abd al-Ali Rampuri",
    relationship: "teacher",
    description:
      "The biographical record associates Mawlana Abd al-Ali Rampuri with Imam Ahmad Raza Khan's early scholarly education.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "abd-al-rahman-al-siraj",
    name: "Shaykh Abd al-Rahman al-Siraj",
    relationship: "ijazah-scholar",
    description:
      "Shaykh Abd al-Rahman al-Siraj is identified in the biographical record as the Mufti of Makkah and as one of the scholars associated with Imam Ahmad Raza Khan's ijazah record.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "sayyid-ahmad-zayni-dahlan",
    name: "Sayyid Ahmad Zayni Dahlan",
    relationship: "ijazah-scholar",
    description:
      "The biographical record associates Sayyid Ahmad Zayni Dahlan with Imam Ahmad Raza Khan's Hadith authorisation.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "sayyid-aal-e-rasul-al-ahmadi",
    name: "Sayyid Aal-e-Rasul al-Ahmadi",
    relationship: "spiritual-guide",
    description:
      "The biographical record states that Imam Ahmad Raza Khan was initiated into the Qadiri spiritual path by Sayyid Aal-e-Rasul al-Ahmadi of Marehra in 1294 AH.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
  },
];

export type AlaHazratIjazah = {
  id: string;
  scholarId: string;
  scholarName: string;
  field: "hadith" | "fiqh" | "tasawwuf" | "multiple" | "not-yet-specified";
  description: string;
  verificationStatus: ResearchVerificationStatus;
  sourceIds: string[];
  notes?: string;
};

export const alaHazratIjazahs: AlaHazratIjazah[] = [
  {
    id: "abd-al-rahman-al-siraj-ijazah",
    scholarId: "abd-al-rahman-al-siraj",
    scholarName: "Shaykh Abd al-Rahman al-Siraj",
    field: "fiqh",
    description:
      "A scholarly authorisation associated with Shaykh Abd al-Rahman al-Siraj, identified in the biographical record as the Mufti of Makkah.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
    notes:
      "The detailed wording, subject scope and date of the ijazah should be added only after checking the relevant source edition.",
  },

  {
    id: "sayyid-ahmad-zayni-dahlan-hadith",
    scholarId: "sayyid-ahmad-zayni-dahlan",
    scholarName: "Sayyid Ahmad Zayni Dahlan",
    field: "hadith",
    description:
      "A Hadith authorisation associated with Sayyid Ahmad Zayni Dahlan is recorded in the biographical material.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-biography"],
    notes:
      "Detailed wording and transmission-chain information will be added after source-level verification.",
  },
];

export function getAlaHazratTeacher(
  id: string
): AlaHazratTeacher | undefined {
  return alaHazratTeachers.find(
    (teacher) => teacher.id === id
  );
}

export function getAlaHazratIjazah(
  id: string
): AlaHazratIjazah | undefined {
  return alaHazratIjazahs.find(
    (ijazah) => ijazah.id === id
  );
}
