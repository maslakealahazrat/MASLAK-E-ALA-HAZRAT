import {
  alaHazratResearchFacts,
  type AlaHazratResearchFact,
} from "@/data/ala-hazrat";

export type AlaHazratResearchFactWithSources =
  AlaHazratResearchFact & {
    sourceCount: number;
  };

export const alaHazratResearchFactsWithSources: AlaHazratResearchFactWithSources[] =
  alaHazratResearchFacts.map((fact) => ({
    ...fact,
    sourceCount: fact.sourceIds.length,
  }));

export function getResearchFactsLayerByTopic(
  topic: AlaHazratResearchFact["topic"]
): AlaHazratResearchFactWithSources[] {
  return alaHazratResearchFactsWithSources.filter(
    (fact) => fact.topic === topic
  );
}

export function getVerifiedResearchFacts(): AlaHazratResearchFactWithSources[] {
  return alaHazratResearchFactsWithSources.filter(
    (fact) => fact.status === "verified"
  );
}

export function getResearchFactsByStatus(
  status: AlaHazratResearchFact["status"]
): AlaHazratResearchFactWithSources[] {
  return alaHazratResearchFactsWithSources.filter(
    (fact) => fact.status === status
  );
}

export function getResearchFactById(
  id: string
): AlaHazratResearchFactWithSources | undefined {
  return alaHazratResearchFactsWithSources.find(
    (fact) => fact.id === id
  );
}
