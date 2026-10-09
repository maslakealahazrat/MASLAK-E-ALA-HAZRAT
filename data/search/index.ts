import { quranSearchDocuments } from "./quran";
import { ilmKaSafarSearchDocuments } from "./ilm-ka-safar";
import { alaHazratSearchDocuments } from "./ala-hazrat";

import type { SearchDocument } from "./types";

/**
 * MASLAK-E-ALA-HAZRAT — SHARED SEARCH INDEX
 *
 * Homepage live search aur /search page isi index ka use karte hain.
 *
 * Naya content add karne ke liye:
 * 1. Pehle us content ki search file banao.
 * 2. Us file se search documents import karo.
 * 3. Neeche searchIndex mein spread operator (...) se add karo.
 */

export const searchIndex: SearchDocument[] = [
  // ─── ALA HAZRAT ──────────────────────────
  ...alaHazratSearchDocuments,

  // ─── ILM KA SAFAR ────────────────────────
  ...ilmKaSafarSearchDocuments,

  // ─── QUR'AN ──────────────────────────────
  ...quranSearchDocuments,

  // ─── FUTURE CONTENT: EXAMPLES ────────────
  //
  // Hadith:
  // import { hadithSearchDocuments } from "./hadith";
  // ...hadithSearchDocuments,
  //
  // Naat:
  // import { naatSearchDocuments } from "./naat";
  // ...naatSearchDocuments,
  //
  // Manqabat:
  // import { manqabatSearchDocuments } from "./manqabat";
  // ...manqabatSearchDocuments,
  //
  // Kanz-ul-Iman:
  // import { kanzUlImanSearchDocuments } from "./kanz-ul-iman";
  // ...kanzUlImanSearchDocuments,
  //
  // Fatawa Razawiyya:
  // import { fatawaSearchDocuments } from "./fatawa";
  // ...fatawaSearchDocuments,
  //
  // Islamic Books:
  // import { bookSearchDocuments } from "./books";
  // ...bookSearchDocuments,
];

/**
 * IMPORTANT:
 * Upar diye gaye future imports sirf examples hain.
 * Jab tak unki files nahi banti, unhe uncomment mat karna.
 */
