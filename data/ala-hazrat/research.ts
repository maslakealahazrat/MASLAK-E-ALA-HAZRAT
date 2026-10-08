import type { AlaHazratSource } from "./sources";

export type ResearchVerificationStatus =
  | "verified"
  | "needs-cross-check"
  | "disputed"
  | "not-yet-verified";

export type AlaHazratResearchFact = {
  id: string;
  topic:
    | "birth"
    | "family"
    | "education"
    | "teachers"
    | "ijazah"
    | "fiqh"
    | "quran"
    | "hadith"
    | "poetry"
    | "spiritual-life"
    | "students"
    | "works"
    | "timeline"
    | "wisal"
    | "legacy";

  claim: string;

  status: ResearchVerificationStatus;

  sourceIds: string[];

  notes?: string;
};

export const alaHazratResearchFacts: AlaHazratResearchFact[] = [
  {
    id: "birth-year",
    topic: "birth",
    claim:
      "Imam Ahmad Raza Khan was born in 1272 AH (1856 CE) in Bareilly.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
    notes:
      "The exact Gregorian day should only be added after checking a sufficiently reliable biographical edition.",
  },

  {
    id: "father-naqi-ali-khan",
    topic: "family",
    claim:
      "Mawlana Naqi Ali Khan was the father of Imam Ahmad Raza Khan.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
  },

  {
    id: "grandfather-rida-ali-khan",
    topic: "family",
    claim:
      "Rida Ali Khan was the grandfather of Imam Ahmad Raza Khan.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
  },

  {
    id: "hanafi-maturidi",
    topic: "fiqh",
    claim:
      "Imam Ahmad Raza Khan is identified in the biographical record as a Sunni Hanafi-Maturidi scholar.",
    status: "verified",
    sourceIds: ["ridawi-faq", "ridawi-biography"],
  },

  {
    id: "first-teacher-grandfather",
    topic: "teachers",
    claim:
      "Rida Ali Khan is recorded as Imam Ahmad Raza Khan's first teacher.",
    status: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "father-major-teacher",
    topic: "education",
    claim:
      "Mawlana Naqi Ali Khan taught a substantial portion of Imam Ahmad Raza Khan's traditional curriculum.",
    status: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "early-teachers",
    topic: "teachers",
    claim:
      "The biographical record associates Imam Ahmad Raza Khan's early education with Mawlana Ghulam Qadir Beyg and Mawlana Abd al-Ali Rampuri.",
    status: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "mufti-young-age",
    topic: "fiqh",
    claim:
      "The biographical record states that Imam Ahmad Raza Khan was authorised by his father to issue fatwas during his fourteenth year.",
    status: "verified",
    sourceIds: ["ridawi-biography"],
    notes:
      "The wording is preserved as a documented biographical account rather than independently reconstructing the event.",
  },

  {
    id: "ijazah-abd-al-rahman-siraj",
    topic: "ijazah",
    claim:
      "Shaykh Abd al-Rahman al-Siraj, identified as the Mufti of Makkah, is recorded among the scholars associated with Imam Ahmad Raza Khan's ijazah record.",
    status: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "qadiri-initiation",
    topic: "spiritual-life",
    claim:
      "The biographical record states that Imam Ahmad Raza Khan was initiated into the Qadiri spiritual path by Sayyid Aal-e-Rasul al-Ahmadi of Marehra in 1294 AH.",
    status: "verified",
    sourceIds: ["ridawi-biography"],
  },

  {
    id: "quran-kanz-ul-iman",
    topic: "quran",
    claim:
      "Kanz-ul-Iman is the well-known Urdu Qur'an translation associated with Imam Ahmad Raza Khan.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-published-works"],
  },

  {
    id: "hadaiq-poetry",
    topic: "poetry",
    claim:
      "Hadaiq-e-Bakhshish is a collection of devotional poetry associated with Imam Ahmad Raza Khan.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-published-works"],
  },

  {
    id: "works-recorded",
    topic: "works",
    claim:
      "Ridawi records hundreds of titles associated with Imam Ahmad Raza Khan and explains that the record includes original works, commentaries, annotations and translations.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-bibliography"],
    notes:
      "The recorded number of titles must not be treated as the number of independent books.",
  },

  {
    id: "fatawa-razawiyya",
    topic: "works",
    claim:
      "Fatawa Razawiyya is a major collection of the legal writings and fatwas associated with Imam Ahmad Raza Khan.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-published-works"],
  },

  {
    id: "death-year",
    topic: "wisal",
    claim:
      "Imam Ahmad Raza Khan passed away in 1340 AH (1921 CE), with Bareilly identified as the place of his passing.",
    status: "verified",
    sourceIds: ["ridawi-biography", "ridawi-faq"],
    notes:
      "The exact day should be added only after edition-level verification.",
  },
];

export function getResearchFactsByTopic(
  topic: AlaHazratResearchFact["topic"]
): AlaHazratResearchFact[] {
  return alaHazratResearchFacts.filter(
    (fact) => fact.topic === topic
  );
}

export function getResearchFact(
  id: string
): AlaHazratResearchFact | undefined {
  return alaHazratResearchFacts.find(
    (fact) => fact.id === id
  );
}

export function getResearchSources(
  fact: AlaHazratResearchFact,
  sources: AlaHazratSource[]
): AlaHazratSource[] {
  return fact.sourceIds
    .map((sourceId) =>
      sources.find((source) => source.id === sourceId)
    )
    .filter(
      (source): source is AlaHazratSource =>
        source !== undefined
    );
}
