import {
  alaHazratSources,
  getAlaHazratSource,
} from "@/data/ala-hazrat";

export function resolveAlaHazratSources(
  sourceIds: string[]
) {
  return sourceIds
    .map((sourceId) => getAlaHazratSource(sourceId))
    .filter((source) => source !== undefined);
}

export function getAlaHazratSourceTitles(
  sourceIds: string[]
): string[] {
  return resolveAlaHazratSources(sourceIds).map(
    (source) => source.title
  );
}

export function getAlaHazratSourceOrganizations(
  sourceIds: string[]
): string[] {
  return resolveAlaHazratSources(sourceIds).map(
    (source) => source.organization
  );
}

export function isKnownAlaHazratSource(
  sourceId: string
): boolean {
  return alaHazratSources.some(
    (source) => source.id === sourceId
  );
}
