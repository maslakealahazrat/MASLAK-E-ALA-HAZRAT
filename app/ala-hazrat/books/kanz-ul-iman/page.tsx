/*
 * FILE: app/ala-hazrat/books/kanz-ul-iman/page.tsx
 *
 * KAAM:
 * Kanz-ul-Iman reader ke liye Arabic Qur'an aur tarjume ka data tayyar karna.
 *
 * ABHI KA SYSTEM:
 * 1. Arabic Qur'an pehle ki tarah display hoga.
 * 2. Urdu aur English tarjuma permission lock se control honge.
 * 3. Lock false hone par tarjume ki files padhi bhi nahi jayengi.
 * 4. Permission confirm hone ke baad sirf neeche diye gaye ek flag ko
 *    true karna hoga.
 *
 * ZAROORI:
 * Permission confirm hone se pehle flag ko true MAT karna.
 * Arabic Qur'an ki original file ko is code mein modify nahi kiya gaya.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

import AlaHazratBookPage from "@/components/AlaHazratBookPage";
import KanzUlImanReader from "@/components/kanz-ul-iman-reader";
import { quranAyahs } from "@/data/quran/ayahs";

/*
 * ============================================================
 * KANZ-UL-IMAN TRANSLATION PERMISSION LOCK
 * ============================================================
 *
 * false = Urdu aur English tarjuma reader ko nahi diya jayega.
 * true  = Permission aur uski shartein confirm hone ke baad
 *         tarjume ki files load karke reader ko di jayengi.
 *
 * ABHI ise false hi rehne do.
 *
 * Permission milne ke baad isi line mein false ko true karna hai.
 * Iske liye reader ya Arabic Qur'an ka code badalne ki zaroorat
 * nahi honi chahiye.
 */
const ENABLE_KANZ_TRANSLATIONS = false;

/*
 * Translation file ka format:
 *
 * surah-number|ayah-number|translation text
 *
 * Example format only:
 * 1|1|Yahan ek ayat ka tarjuma hoga
 *
 * Upar wala example asli tarjuma nahi hai.
 *
 * File paths:
 * data/translations/ur.kanzuliman.txt
 * data/translations/en.ahmedraza.txt
 *
 * Ye files sirf permission lock ON hone par padhi jayengi.
 */

type TranslationLanguage = "ur" | "en";

type ParsedTranslation = {
  surahNumber: number;
  ayahNumber: number;
  text: string;
};

/*
 * Ek translation file ko ayat-number ke hisaab se map karta hai.
 *
 * Har line mein pehla hissa Surah number,
 * doosra hissa Ayah number aur baaki hissa tarjuma hota hai.
 *
 * Tarjume ke text ko edit ya rewrite nahi kiya jata.
 */
async function loadTranslationFile(
  relativeFilePath: string
): Promise<Map<string, string>> {
  const absoluteFilePath = path.join(
    process.cwd(),
    relativeFilePath
  );

  const fileContent = await readFile(
    absoluteFilePath,
    "utf8"
  );

  const translations = new Map<string, string>();

  const lines = fileContent.split(/\r?\n/);

  for (const line of lines) {
    // Khali lines ko skip karein.
    if (!line.trim()) {
      continue;
    }

    /*
     * Sirf pehle do "|" separators par split karein.
     * Isse agar tarjume ke text mein "|" ho, to baaki text
     * ek saath preserve rahega.
     */
    const firstSeparator = line.indexOf("|");

    if (firstSeparator === -1) {
      throw new Error(
        `Translation file ka format galat hai: ${relativeFilePath}`
      );
    }

    const secondSeparator = line.indexOf(
      "|",
      firstSeparator + 1
    );

    if (secondSeparator === -1) {
      throw new Error(
        `Translation line mein Ayah number ya text missing hai: ${relativeFilePath}`
      );
    }

    const surahNumber = Number(
      line.slice(0, firstSeparator).trim()
    );

    const ayahNumber = Number(
      line.slice(
        firstSeparator + 1,
        secondSeparator
      ).trim()
    );

    const text = line.slice(secondSeparator + 1);

    // Invalid reference ya khaali tarjuma chupchaap accept na karein.
    if (
      !Number.isInteger(surahNumber) ||
      surahNumber < 1 ||
      !Number.isInteger(ayahNumber) ||
      ayahNumber < 1 ||
      !text.trim()
    ) {
      throw new Error(
        `Translation entry invalid hai: ${relativeFilePath}`
      );
    }

    const key = `${surahNumber}:${ayahNumber}`;

    // Duplicate ayat reference milne par build ko fail karein.
    if (translations.has(key)) {
      throw new Error(
        `Duplicate translation reference ${key}: ${relativeFilePath}`
      );
    }

    translations.set(key, text);
  }

  return translations;
}

/*
 * Reader ke liye data tayyar karta hai.
 *
 * Lock OFF:
 * - Koi translation file read nahi hoti.
 * - Reader ko sirf Arabic aur khaali translations milte hain.
 *
 * Lock ON:
 * - Urdu aur English files read hoti hain.
 * - Matching Surah/Ayah reference ke saath tarjuma joda jata hai.
 */
async function getReaderAyahs() {
  /*
   * Default data mein sirf original Arabic aur khaali translations.
   * Isliye permission lock OFF hone par tarjume ka text output mein
   * pass nahi hoga.
   */
  const readerAyahs = quranAyahs.map((ayah) => ({
    surahNumber: ayah.surahNumber,
    ayahNumber: ayah.ayahNumber,
    arabic: ayah.arabic,
    translations: {} as {
      ur?: string;
      en?: string;
    },
  }));

  /*
   * Sabse zaroori safety check:
   * Lock false hai to isi waqt return kar dein.
   * Neeche wali translation files read hi nahi hongi.
   */
  if (!ENABLE_KANZ_TRANSLATIONS) {
    return readerAyahs;
  }

  /*
   * Permission confirm hone ke baad hi ye code chalega.
   *
   * Agar files missing ya format galat ho, error ko chhupane ke
   * bajaye build fail hoga. Isse khaali ya galat data ko
   * sahi samajhkar publish karne ka risk kam hota hai.
   */
  const [urduTranslations, englishTranslations] =
    await Promise.all([
      loadTranslationFile(
        "data/translations/ur.kanzuliman.txt"
      ),
      loadTranslationFile(
        "data/translations/en.ahmedraza.txt"
      ),
    ]);

  /*
   * Arabic ayat ke reference ke mutabik tarjume jodein.
   * Arabic text ko yahan badla nahi jata.
   */
  return readerAyahs.map((ayah) => {
    const key = `${ayah.surahNumber}:${ayah.ayahNumber}`;

    return {
      ...ayah,
      translations: {
        ur: urduTranslations.get(key),
        en: englishTranslations.get(key),
      },
    };
  });
}

/*
 * Next.js App Router ka server page.
 *
 * Translation files server par hi read hoti hain.
 * Reader ko sirf uska zaroori data props ke roop mein milta hai.
 */
export default async function KanzUlImanPage() {
  const readerAyahs = await getReaderAyahs();

  return (
    <AlaHazratBookPage
      title="Kanz-ul-Iman"
      arabic="کنز الایمان"
      description="Kanz-ul-Iman, Imam Ahmad Raza Khan ki mashhoor Urdu Qur'an translation hai. Is section mein verified text, references aur source material ko carefully organize kiya jayega."
      status="available"
    >
      <KanzUlImanReader ayahs={readerAyahs} />
    </AlaHazratBookPage>
  );
}
