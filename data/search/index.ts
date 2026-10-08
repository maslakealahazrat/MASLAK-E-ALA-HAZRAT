import { quranSearchDocuments } from "./quran";
import { ilmKaSafarSearchDocuments } from "./ilm-ka-safar";

import type { SearchDocument } from "./types";

export const searchIndex: SearchDocument[] = [
  ...quranSearchDocuments,
  ...ilmKaSafarSearchDocuments,

  // Future content:
  // ...hadithSearchDocuments,
  // ...naatSearchDocuments,
  // ...manqabatSearchDocuments,
  // ...kanzUlImanSearchDocuments,
  // ...fatawaSearchDocuments,
  // ...bookSearchDocuments,
];
