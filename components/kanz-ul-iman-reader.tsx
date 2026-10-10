"use client";

/*
 * ============================================================
 * MASLAK-E-ALA HAZRAT — KANZ-UL-IMAN READER
 * ============================================================
 *
 * IS FILE KA KAAM:
 * 1. Qur'an ki Arabic ayatein dikhana.
 * 2. Har ayat ke neeche available tarjuma dikhana.
 * 3. Auto Mode aur Manual Language Mode dena.
 * 4. Mobile screen par reader ko aasaan banana.
 *
 * ZAROORI BAAT:
 * - Arabic Qur'an text ko modify nahi karna.
 * - Bina permission confirm kiye kisi translation ko publish
 *   ya enable nahi karna.
 * - Hindi aur Roman Urdu translation available na ho to
 *   unka tarjuma khud se bana kar nahi dikhana.
 *
 * LANGUAGE DATA KA EXAMPLE:
 *
 * {
 *   en: "Example English translation",
 *   ur: "Tarjume ka Urdu text"
 * }
 *
 * Upar diya gaya text sirf example hai, Qur'an ka asli tarjuma
 * nahi. Is tarah ka example website ke actual data mein mat daalna.
 * ============================================================
 */

import { useEffect, useState } from "react";

/*
 * ============================================================
 * SECTION 1: TYPES
 * ============================================================
 *
 * Type ka kaam:
 * TypeScript ko batana ki data kis tarah ka hoga.
 *
 * KanzLanguage:
 * Translation ki supported language ka naam.
 *
 * KanzTranslations:
 * Ek ayat ke available translations.
 *
 * KanzReaderAyah:
 * Ek ayat ka number, Arabic text aur translations.
 *
 * Example:
 * {
 *   surahNumber: 1,
 *   ayahNumber: 1,
 *   arabic: "...",
 *   translations: { en: "..." }
 * }
 *
 * Ye sirf data ka structure samjhane ke liye example hai.
 */

export type KanzLanguage = "en" | "hi" | "ur" | "roman";

export type KanzTranslations = Partial<
  Record<KanzLanguage, string>
>;

export type KanzReaderAyah = {
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  translations: KanzTranslations;
};

/*
 * Props ka matlab:
 * Is component ko parent page se kaunsa data milega.
 *
 * Is reader ko "ayahs" naam ki ayaton ki list milti hai.
 */
type Props = {
  ayahs: KanzReaderAyah[];
};

/*
 * ============================================================
 * SECTION 2: LANGUAGE SETTINGS
 * ============================================================
 *
 * LANGUAGE_ORDER:
 * Auto Mode mein language badalne ka order.
 *
 * Example:
 * Agar kisi ayat mein English aur Urdu dono available hon,
 * to button dabane par English se Urdu aur phir English
 * par wapas ja sakte hain.
 *
 * Hindi ya Roman Urdu tabhi select honge jab unka asli
 * translation data available hoga.
 */
const LANGUAGE_ORDER: KanzLanguage[] = [
  "en",
  "hi",
  "ur",
  "roman",
];

/*
 * LANGUAGE_LABELS:
 * Internal language code ko user-friendly naam mein badalta hai.
 *
 * Example:
 * "en"    -> "English"
 * "hi"    -> "हिन्दी"
 * "ur"    -> "اردو"
 * "roman" -> "Roman Urdu"
 */
const LANGUAGE_LABELS: Record<KanzLanguage, string> = {
  en: "English",
  hi: "हिन्दी",
  ur: "اردو",
  roman: "Roman Urdu",
};

/*
 * ============================================================
 * SECTION 3: AVAILABLE TRANSLATIONS CHECK KARNA
 * ============================================================
 *
 * FUNCTION: getAvailableLanguages
 *
 * Kaam:
 * Check karna ki kisi ayat ke liye kaun-kaun se translations
 * sach mein available hain.
 *
 * Example:
 * Input:
 * { en: "Example English text", ur: "مثال" }
 *
 * Output:
 * ["en", "ur"]
 *
 * Agar translation khaali hai ya missing hai, to us language
 * ko available list mein nahi rakhenge.
 */
function getAvailableLanguages(
  translations: KanzTranslations
): KanzLanguage[] {
  return LANGUAGE_ORDER.filter((language) =>
    Boolean(translations[language]?.trim())
  );
}

/*
 * FUNCTION: getNextAvailableLanguage
 *
 * Kaam:
 * Current language ke baad agli available language chunna.
 *
 * Example:
 * Available languages: ["en", "ur"]
 *
 * Current "en"  -> Next "ur"
 * Current "ur"  -> Next "en"
 *
 * Agar sirf English available hai, to English hi milegi.
 * Agar koi translation available nahi hai, to null milega.
 */
function getNextAvailableLanguage(
  currentLanguage: KanzLanguage | null,
  translations: KanzTranslations
): KanzLanguage | null {
  const available = getAvailableLanguages(translations);

  /*
   * Koi translation nahi mila.
   * null ka matlab: filhaal dikhane ke liye tarjuma nahi hai.
   */
  if (available.length === 0) {
    return null;
  }

  /*
   * Abhi language select nahi hai, isliye pehli available
   * language se shuru karenge.
   */
  if (!currentLanguage) {
    return available[0];
  }

  const currentIndex = available.indexOf(currentLanguage);

  /*
   * Current language available list mein nahi hai.
   * Aise mein pehli available language se shuru karein.
   */
  if (currentIndex === -1) {
    return available[0];
  }

  /*
   * % ka istemal list ke aakhri item ke baad dobara pehle
   * item par aane ke liye hota hai.
   *
   * Example:
   * ["en", "ur"] mein "ur" ke baad phir "en".
   */
  return available[(currentIndex + 1) % available.length];
}

/*
 * ============================================================
 * SECTION 4: WEBSITE KI SAVED LANGUAGE PADHNA
 * ============================================================
 *
 * FUNCTION: readSiteLanguage
 *
 * Kaam:
 * Browser ki localStorage se website ki saved language padhna.
 *
 * Website mein "site-language" naam ki setting use hoti hai.
 *
 * Example:
 * localStorage mein "ur" save hai -> "ur" return hoga.
 * Koi setting nahi hai -> "auto" return hoga.
 *
 * try/catch isliye hai taaki browser storage access fail hone
 * par page crash na ho.
 */
function readSiteLanguage(): string {
  try {
    return localStorage.getItem("site-language") || "auto";
  } catch {
    return "auto";
  }
}

/*
 * ============================================================
 * SECTION 5: MAIN READER COMPONENT
 * ============================================================
 *
 * KanzUlImanReader ko parent page ayaton ki list deta hai.
 * Component har ayat ka Arabic text aur available translation
 * render karta hai.
 */
export default function KanzUlImanReader({
  ayahs,
}: Props) {
  /*
   * STATE: autoMode
   *
   * true  = Auto Mode.
   * false = Manual Mode.
   *
   * Auto Mode mein har ayat ka translation button available
   * languages ke beech switch karta hai.
   *
   * Manual Mode mein upar selector se language chuni jaati hai.
   */
  const [autoMode, setAutoMode] = useState(true);

  /*
   * STATE: manualLanguage
   *
   * Manual Mode mein user ki selected language.
   *
   * Default "en" hai, lekin English translation na hone par
   * code galti se doosri language ka tarjuma nahi dikhayega.
   */
  const [manualLanguage, setManualLanguage] =
    useState<KanzLanguage>("en");

  /*
   * STATE: ayahLanguages
   *
   * Har ayat ke liye alag selected language yaad rakhta hai.
   *
   * Example:
   * {
   *   "1:1": "ur",
   *   "1:2": "en"
   * }
   *
   * Iska matlab:
   * Surah 1 Ayah 1 par Urdu selected hai.
   * Surah 1 Ayah 2 par English selected hai.
   *
   * Ye selection browser refresh ke baad save rehne ki
   * guarantee nahi deta; ye React component ki current state hai.
   */
  const [ayahLanguages, setAyahLanguages] =
    useState<Record<string, KanzLanguage>>({});

  /*
   * ==========================================================
   * SECTION 6: GLOBAL LANGUAGE SETTING KE SAATH SYNC
   * ==========================================================
   *
   * Page load hone par website ki saved language padhein.
   *
   * Agar website ki language "en", "hi" ya "ur" hai,
   * to Manual Mode mein us language ko select karein.
   *
   * Agar website ki language "auto" hai, to Auto Mode chalu karein.
   *
   * IMPORTANT:
   * Isi browser tab mein language change hone par "storage" event
   * aam taur par fire nahi hota. Isliye hum custom event
   * "site-language-change" bhi sunte hain.
   *
   * Homepage se custom event dispatch karne ke liye uske
   * changeLanguage function mein bhi event add karna hoga.
   */
  useEffect(() => {
    const updateLanguageSetting = (value?: string) => {
      const savedLanguage = value ?? readSiteLanguage();

      if (
        savedLanguage === "en" ||
        savedLanguage === "hi" ||
        savedLanguage === "ur" ||
        savedLanguage === "roman"
      ) {
        setManualLanguage(savedLanguage);
        setAutoMode(false);
      } else {
        setAutoMode(true);
      }
    };

    /*
     * Pehli baar saved setting read karein.
     */
    updateLanguageSetting();

    /*
     * Doosre browser tab se setting badalne par.
     */
    const handleStorage = () => {
      updateLanguageSetting();
    };

    /*
     * Isi tab mein custom event se language badalne par.
     */
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;

      updateLanguageSetting(customEvent.detail);
    };

    window.addEventListener("storage", handleStorage);

    window.addEventListener(
      "site-language-change",
      handleLanguageChange
    );

    /*
     * Component hatne par listeners remove karna zaroori hai.
     * Isse unwanted duplicate listeners nahi bante.
     */
    return () => {
      window.removeEventListener("storage", handleStorage);

      window.removeEventListener(
        "site-language-change",
        handleLanguageChange
      );
    };
  }, []);

  /*
   * ==========================================================
   * SECTION 7: AYAT KI UNIQUE KEY
   * ==========================================================
   *
   * Har ayat ko unique naam dena zaroori hai.
   *
   * Example:
   * Surah 1 Ayah 1 -> "1:1"
   * Surah 2 Ayah 1 -> "2:1"
   *
   * Is key se har ayat ki language alag track hoti hai.
   */
  const getAyahKey = (
    surahNumber: number,
    ayahNumber: number
  ): string => `${surahNumber}:${ayahNumber}`;

  /*
   * ==========================================================
   * SECTION 8: AYAT KI CURRENT LANGUAGE
   * ==========================================================
   *
   * FUNCTION: getCurrentLanguage
   *
   * Kaam:
   * Decide karna ki kisi ayat ke liye kaunsi language dikhani hai.
   *
   * Rules:
   * 1. Koi translation available nahi -> null.
   * 2. Manual Mode -> sirf selected language.
   * 3. Auto Mode -> ayat ki saved language, agar available ho.
   * 4. Warna English available ho to English.
   * 5. English na ho to pehli available language.
   *
   * IMPORTANT:
   * Manual Mode mein selected language missing hone par
   * doosri language ka tarjuma automatically nahi dikhayenge.
   */
  const getCurrentLanguage = (
    ayah: KanzReaderAyah
  ): KanzLanguage | null => {
    const available = getAvailableLanguages(ayah.translations);

    if (available.length === 0) {
      return null;
    }

    /*
     * Manual Mode mein selected language ko hi use karein.
     */
    if (!autoMode) {
      return ayah.translations[manualLanguage]?.trim()
        ? manualLanguage
        : null;
    }

    /*
     * Auto Mode mein pehle ayat ki apni saved language dekhein.
     */
    const key = getAyahKey(
      ayah.surahNumber,
      ayah.ayahNumber
    );

    const savedLanguage = ayahLanguages[key];

    if (
      savedLanguage &&
      ayah.translations[savedLanguage]?.trim()
    ) {
      return savedLanguage;
    }

    /*
     * Pehli preference English hai, agar available ho.
     */
    if (ayah.translations.en?.trim()) {
      return "en";
    }

    /*
     * English na ho to pehli available language.
     */
    return available[0];
  };

  /*
   * ==========================================================
   * SECTION 9: TRANSLATION BUTTON
   * ==========================================================
   *
   * FUNCTION: handleTranslationTap
   *
   * Kaam:
   * Auto Mode mein ayat ke tarjume ko agli available language
   * par switch karna.
   *
   * Example:
   * English aur Urdu available hain:
   * English button tap -> Urdu.
   * Urdu button tap -> English.
   *
   * Manual Mode mein ye function switch nahi karega.
   */
  const handleTranslationTap = (
    ayah: KanzReaderAyah
  ) => {
    if (!autoMode) {
      return;
    }

    const key = getAyahKey(
      ayah.surahNumber,
      ayah.ayahNumber
    );

    const currentLanguage = getCurrentLanguage(ayah);

    const nextLanguage = getNextAvailableLanguage(
      currentLanguage,
      ayah.translations
    );

    /*
     * Koi translation available nahi hai.
     * Isliye selected language update nahi karni.
     */
    if (!nextLanguage) {
      return;
    }

    /*
     * Sirf isi ayat ki language update karein.
     * Baaki ayaton ki language ko preserve karein.
     */
    setAyahLanguages((previous) => ({
      ...previous,
      [key]: nextLanguage,
    }));
  };

  /*
   * ==========================================================
   * SECTION 10: LANGUAGE SELECTOR
   * ==========================================================
   *
   * User Auto ya Manual language select karta hai.
   *
   * value "auto" -> Auto Mode.
   * value "en"   -> English Manual Mode.
   * value "hi"   -> Hindi Manual Mode.
   * value "ur"   -> Urdu Manual Mode.
   * value "roman" -> Roman Urdu Manual Mode.
   */
  const handleModeChange = (value: string) => {
    if (value === "auto") {
      setAutoMode(true);
      return;
    }

    if (
      value === "en" ||
      value === "hi" ||
      value === "ur" ||
      value === "roman"
    ) {
      setManualLanguage(value);
      setAutoMode(false);
    }
  };

  /*
   * ==========================================================
   * SECTION 11: READER KA HTML / UI
   * ==========================================================
   *
   * Yahan Arabic text, reference, translation button aur
   * translation message render hote hain.
   *
   * CSS classes app/globals.css mein define hongi.
   */
  return (
    <section className="kanzReader">
      {/* Reader ka title aur current mode. */}
      <header className="kanzReaderHeader">
        <div className="kanzReaderHeading">
          <span className="kanzReaderEyebrow">
            ALA HAZRAT
          </span>

          <h2>Kanz-ul-Iman</h2>

          <p>
            Qur’an ki Arabic ayat aur available tarjuma.
          </p>
        </div>

        <span
          className={
            autoMode
              ? "kanzModeBadge active"
              : "kanzModeBadge"
          }
        >
          {autoMode ? "Auto Mode" : "Manual Mode"}
        </span>
      </header>

      {/* Language selector: Auto ya Manual language. */}
      <div className="kanzLanguageControls">
        <label htmlFor="kanz-language-select">
          Tarjume ki language
        </label>

        <select
          id="kanz-language-select"
          value={autoMode ? "auto" : manualLanguage}
          onChange={(event) =>
            handleModeChange(event.target.value)
          }
        >
          <option value="auto">
            Auto — available language
          </option>

          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ur">اردو</option>
          <option value="roman">Roman Urdu</option>
        </select>
      </div>

      {/* Mode ke mutabiq user ko chhoti si help. */}
      <p className="kanzLanguageHint">
        {autoMode
          ? "Auto Mode: Har ayat ka tarjuma badalne ke liye tarjume wale button par tap karein, agar ek se zyada languages available hon."
          : `Manual Mode: ${LANGUAGE_LABELS[manualLanguage]} selected hai. Is language ka tarjuma available na hone par message dikhega.`}
      </p>

      {/* Agar ayahs list khaali hai to empty state dikhayein. */}
      {ayahs.length === 0 ? (
        <div className="kanzEmptyState">
          <div
            className="kanzEmptyIcon"
            aria-hidden="true"
          >
            ۞
          </div>

          <h3>Reader data available nahi hai</h3>

          <p>
            Arabic ayaton ka data connect hone par yahan
            Qur’an reader dikhaya jayega.
          </p>
        </div>
      ) : (
        /*
         * Har ayat ke liye alag card banega.
         * map() list ke har item ko display karta hai.
         */
        <div className="kanzAyahList">
          {ayahs.map((ayah) => {
            /*
             * Current ayat ki unique key.
             */
            const key = getAyahKey(
              ayah.surahNumber,
              ayah.ayahNumber
            );

            /*
             * Is ayat ke liye selected language.
             */
            const currentLanguage =
              getCurrentLanguage(ayah);

            /*
             * Selected language ka actual translation text.
             */
            const translation = currentLanguage
              ? ayah.translations[currentLanguage]?.trim()
              : "";

            /*
             * Kitni languages ka tarjuma available hai?
             */
            const availableLanguages =
              getAvailableLanguages(ayah.translations);

            /*
             * Cycle button tabhi active hoga jab Auto Mode ho
             * aur ek se zyada translations available hon.
             */
            const canCycle =
              autoMode && availableLanguages.length > 1;

            return (
              <article
                className="kanzAyahCard"
                key={key}
              >
                {/* Surah aur ayah ka reference. */}
                <div className="kanzAyahReference">
                  <span>
                    Surah {ayah.surahNumber}
                  </span>

                  <span className="kanzAyahNumber">
                    Ayah {ayah.ayahNumber}
                  </span>
                </div>

                {/* Arabic Qur'an text.
                    dir="rtl" Arabic ko right-to-left rakhta hai. */}
                <p
                  className="kanzArabicText"
                  dir="rtl"
                  lang="ar"
                >
                  {ayah.arabic}
                </p>

                {/* Translation section. */}
                <div className="kanzTranslationArea">
                  <button
                    type="button"
                    className="kanzTranslationButton"
                    onClick={() =>
                      handleTranslationTap(ayah)
                    }
                    disabled={!canCycle}
                    aria-label={
                      `Surah ${ayah.surahNumber}, Ayah ${ayah.ayahNumber}: agla available tarjuma`
                    }
                    title={
                      canCycle
                        ? "Agli available language"
                        : autoMode
                        ? "Is ayat ke liye sirf ek language available hai"
                        : "Language badalne ke liye upar selector use karein"
                    }
                  >
                    <span className="kanzTranslationLabel">
                      {currentLanguage
                        ? LANGUAGE_LABELS[currentLanguage]
                        : LANGUAGE_LABELS[
                            autoMode ? "en" : manualLanguage
                          ]}
                    </span>

                    {canCycle && (
                      <span
                        className="kanzCycleIcon"
                        aria-hidden="true"
                      >
                        ↻
                      </span>
                    )}
                  </button>

                  {/* Translation available hai to text dikhayein. */}
                  {translation ? (
                    <p
                      className="kanzTranslationText"
                      dir={
                        currentLanguage === "ur"
                          ? "rtl"
                          : "auto"
                      }
                      lang={
                        currentLanguage === "ur"
                          ? "ur"
                          : currentLanguage === "hi"
                          ? "hi"
                          : "en"
                      }
                    >
                      {translation}
                    </p>
                  ) : (
                    /*
                     * Translation missing hai to fake text
                     * ya doosri language ka text nahi dikhana.
                     */
                    <p className="kanzMissingTranslation">
                      Is language mein is ayat ka tarjuma abhi
                      available nahi hai. Verified source aur
                      zaroori permission confirm hone ke baad
                      hi tarjuma yahan dikhaya jayega.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Reader ke neeche source aur permission reminder. */}
      <p className="kanzReaderFooter">
        Arabic Qur’an text ko original form mein preserve kiya
        jata hai. Translation ki availability verified source
        aur permission par depend karti hai.
      </p>
    </section>
  );
      }
