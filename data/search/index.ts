import { quranSearchDocuments } from "./quran";
import { ilmKaSafarSearchDocuments } from "./ilm-ka-safar";
import { alaHazratSearchDocuments } from "./ala-hazrat";

import type { SearchDocument } from "./types";

/**
 * Maslak-e-Ala Hazrat
 * Central Search Registry
 *
 * Homepage live search aur /search page
 * isi shared index ka use karte hain.
 */

export type SearchSource = {
  id: string;
  label: string;
  documents: SearchDocument[];
};

/**
 * Saare registered search sources ek jagah.
 * Naya source tabhi add karein jab uski data file ready ho.
 */
export const searchSources: SearchSource[] = [
  {
    id: "ala-hazrat",
    label: "Ala Hazrat",
    documents: alaHazratSearchDocuments,
  },
  {
    id: "ilm-ka-safar",
    label: "Ilm Ka Safar",
    documents: ilmKaSafarSearchDocuments,
  },
  {
    id: "quran",
    label: "Qur'an",
    documents: quranSearchDocuments,
  },
];

/**
 * Maujooda search engine ke liye combined index.
 * Isse existing searchIndex import karne wale components
 * apna kaam pehle ki tarah kar sakte hain.
 */
export const searchIndex: SearchDocument[] =
  searchSources.flatMap((source) => source.documents);

/**
 * Har source mein kitne search documents hain,
 * iska summary deta hai.
 */
export function getSearchSourceSummary() {
  return searchSources.map((source) => ({
    id: source.id,
    label: source.label,
    count: source.documents.length,
  }));
}
