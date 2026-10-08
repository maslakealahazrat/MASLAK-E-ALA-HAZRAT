import { validateAlaHazratResearch } from "./validate";

export type AlaHazratVerificationReport = {
  generatedAt: string;
  totalCollections: number;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  collections: ReturnType<
    typeof validateAlaHazratResearch
  >;
};

export function getAlaHazratVerificationReport(): AlaHazratVerificationReport {
  const collections = validateAlaHazratResearch();

  const totalRecords = collections.reduce(
    (total, collection) => total + collection.total,
    0
  );

  const validRecords = collections.reduce(
    (total, collection) => total + collection.valid,
    0
  );

  const invalidRecords = collections.reduce(
    (total, collection) => total + collection.invalid,
    0
  );

  return {
    generatedAt: new Date().toISOString(),
    totalCollections: collections.length,
    totalRecords,
    validRecords,
    invalidRecords,
    collections,
  };
}
