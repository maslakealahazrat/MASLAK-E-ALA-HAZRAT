import { alaHazratSources } from "@/data/ala-hazrat";

type SourceIdRecord = {
  id: string;
  sourceIds: string[];
  verificationStatus: string;
};

export type ResearchValidationResult = {
  id: string;
  valid: boolean;
  errors: string[];
};

export function validateResearchRecord(
  record: SourceIdRecord
): ResearchValidationResult {
  const errors: string[] = [];

  if (record.sourceIds.length === 0) {
    errors.push("No source is attached to this record.");
  }

  const unknownSourceIds = record.sourceIds.filter(
    (sourceId) =>
      !alaHazratSources.some(
        (source) => source.id === sourceId
      )
  );

  if (unknownSourceIds.length > 0) {
    errors.push(
      `Unknown source ID(s): ${unknownSourceIds.join(", ")}`
    );
  }

  if (
    record.verificationStatus === "verified" &&
    record.sourceIds.length === 0
  ) {
    errors.push(
      "A verified record must have at least one source."
    );
  }

  return {
    id: record.id,
    valid: errors.length === 0,
    errors,
  };
}
