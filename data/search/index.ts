import { quranSearchDocuments } from "./quran";
import { ilmKaSafarSearchDocuments } from "./ilm-ka-safar";
import { alaHazratSearchDocuments } from "./ala-hazrat";
import { sitePageSearchDocuments } from "./site-pages";

import type { SearchDocument } from "./types";

/**
 * Shared visitor-search index.
 * Homepage live search aur /search dono isi index ka use karte hain.
 */
const uniqueDocuments = new Map<string, SearchDocument>();

for (const document of [
  ...sitePageSearchDocuments,
  ...alaHazratSearchDocuments,
  ...ilmKaSafarSearchDocuments,
  ...quranSearchDocuments,
]) {
  if (!uniqueDocuments.has(document.id)) {
    uniqueDocuments.set(document.id, document);
  }
}

export const searchIndex: SearchDocument[] = Array.from(
  uniqueDocuments.values()
);
