"use client";

/*
  FILE: components/kanz-ul-iman-reader.tsx

  KAAM:
  Kanz-ul-Iman ke Qur'an reader ka reusable component.

  YE FILE:
  1. Arabic ayat aur translation display karti hai.
  2. Auto Mode mein translation par tap karne se language badalti hai.
  3. English -> Hindi -> Urdu -> English ka order rakhti hai.
  4. Future mein Roman Urdu/Hinglish support kar sakti hai.

  DATA:
  Is component mein asli translation hard-code nahi ki gayi.
  Ayat aur translations parent page se props ke zariye aayenge.

  IMPORTANT:
  Arabic Qur'an ki original file ko ye component modify nahi karta.
*/

import { useEffect, useState } from "react";

/* Supported translation languages.
   Future example: Roman Urdu add karne ke liye "roman" pehle se maujood hai. */
export type KanzLanguage = "en" | "hi" | "ur" | "roman";

/* Har language ka tarjuma optional hai.
   Example: translations.en = English translation.
   Example: translations.hi = Hindi translation.
   Example: translations.ur = Urdu translation.
   Example: translations.roman = Roman Urdu/Hinglish translation. */
export type KanzTranslations = Partial<
  Record<KanzLanguage, string>
>;

/* Har ayat ka data is structure mein aayega. */
export type KanzReaderAyah = {
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  translations: KanzTranslations;
};

/* Parent page ayat ki list is component ko degi. */
type Props = {
  ayahs: KanzReaderAyah[];
};

/* Auto Mode ka required switching order.
   Tap 1: English -> Hindi
   Tap 2: Hindi -> Urdu
   Tap 3: Urdu -> English

   Future mein Roman Urdu ko cycle mein shamil karna ho,
   to is array mein "roman" add kar sakte hain. */
const LANGUAGE_ORDER: KanzLanguage[] = [
  "en",
  "hi",
  "ur",
];

/* Button par dikhne wale language names. */
const LANGUAGE_LABELS: Record<KanzLanguage, string> = {
  en: "English",
  hi: "हिन्दी",
  ur: "اردو",
  roman: "Hinglish",
};

/* Website ke global language setting se language samajhna. */
function readSiteLanguage(): string {
  try {
    return localStorage.getItem("site-language") || "auto";
  } catch {
    return "auto";
  }
}

/* Agli available translation language dhoondhna.
   Isse kisi missing translation ki wajah se khaali text nahi dikhega. */
function getNextAvailableLanguage(
  currentLanguage: KanzLanguage,
  translations: KanzTranslations
): KanzLanguage | null {
  const availableLanguages = LANGUAGE_ORDER.filter(
    (language) =>
      Boolean(translations[language]?.trim())
  );

  /* Future Roman Urdu translation bhi available ho,
     to use cycle mein shamil karne ke liye LANGUAGE_ORDER
     mein "roman" add karna hoga. */

  if (availableLanguages.length === 0) {
    return null;
  }

  if (availableLanguages.length === 1) {
    return availableLanguages[0];
  }

  const currentIndex =
    availableLanguages.indexOf(currentLanguage);

  /* Current language available na ho to pehli available language. */
  if (currentIndex === -1) {
    return availableLanguages[0];
  }

  /* Example: English ke baad Hindi, Hindi ke baad Urdu. */
  return availableLanguages[
    (currentIndex + 1) % availableLanguages.length
  ];
}

export default function KanzUlImanReader({
  ayahs,
}: Props) {
  /* Auto Mode ON/OFF aur manual language. */
  const [autoMode, setAutoMode] = useState(true);
  const [manualLanguage, setManualLanguage] =
    useState<KanzLanguage>("en");

  /* Har ayat ki language alag store hoti hai.
     Example: ayah "1:1" Urdu par ho sakti hai,
     jabki ayah "1:2" English par ho sakti hai. */
  const [ayahLanguages, setAyahLanguages] =
    useState<Record<string, KanzLanguage>>({});

  /* Page khulne par website ki language setting padhein. */
  useEffect(() => {
    const updateLanguageSetting = () => {
      const savedLanguage = readSiteLanguage();

      if (
        savedLanguage === "en" ||
        savedLanguage === "hi" ||
        savedLanguage === "ur"
      ) {
        setManualLanguage(savedLanguage);
        setAutoMode(false);
      } else {
        /* Website setting "auto" ho to English se shuru karein. */
        setManualLanguage("en");
        setAutoMode(true);
      }
    };

    updateLanguageSetting();

    /* Doosre tab mein language setting badle to update karein. */
    window.addEventListener("storage", updateLanguageSetting);

    return () => {
      window.removeEventListener(
        "storage",
        updateLanguageSetting
      );
    };
  }, []);

  /* Surah aur ayat number se unique key banti hai.
     Example: Surah 1, Ayat 2 -> "1:2". */
  const getAyahKey = (
    surahNumber: number,
    ayahNumber: number
  ) => `${surahNumber}:${ayahNumber}`;

  /* Current ayat ke liye kaunsi language dikhani hai. */
  const getCurrentLanguage = (
    ayah: KanzReaderAyah
  ): KanzLanguage | null => {
    const availableLanguages = LANGUAGE_ORDER.filter(
      (language) =>
        Boolean(ayah.translations[language]?.trim())
    );

    if (availableLanguages.length === 0) {
      return null;
    }

    if (!autoMode) {
      /* Manual mode mein selected language available ho to wahi. */
      if (
        ayah.translations[manualLanguage]?.trim()
      ) {
        return manualLanguage;
      }

      /* Selected language ka text abhi nahi hai,
         isliye available text dikhayein. */
      return availableLanguages[0];
    }

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

    /* Auto Mode ka default: English, agar available ho. */
    if (ayah.translations.en?.trim()) {
      return "en";
    }

    /* English abhi available nahi ho to pehla available tarjuma. */
    return availableLanguages[0];
  };

  /* Translation card par tap karne se language cycle hoti hai. */
  const handleTranslationTap = (
    ayah: KanzReaderAyah
  ) => {
    /* Manual mode mein tap karne se language nahi badlegi. */
    if (!autoMode) return;

    const key = getAyahKey(
      ayah.surahNumber,
      ayah.ayahNumber
    );

    const currentLanguage =
      getCurrentLanguage(ayah);

    if (!currentLanguage) return;

    const nextLanguage = getNextAvailableLanguage(
      currentLanguage,
      ayah.translations
    );

    if (!nextLanguage) return;

    setAyahLanguages((previous) => ({
      ...previous,
      [key]: nextLanguage,
    }));
  };

  return (
    <section className="kanzReader">
      {/* Reader heading aur mode indicator. */}
      <div className="kanzReaderHeader">
        <div>
          <h2>Kanz-ul-Iman Reader</h2>

          <p>
            Arabic ayat ke saath tarjuma padhein.
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
      </div>

      {/* Language order ka chhota guide. */}
      <p className="kanzLanguageHint">
        Auto Mode: English → Hindi → Urdu → English
      </p>

      {/* Ayat list parent page se aayegi. */}
      {ayahs.length === 0 ? (
        <div className="kanzEmptyState">
          <h3>Reader tayyar ho raha hai</h3>

          <p>
            Arabic ayat aur verified translation data
            connect karne ke baad yahan reader dikhega.
          </p>
        </div>
      ) : (
        <div className="kanzAyahList">
          {ayahs.map((ayah) => {
            const key = getAyahKey(
              ayah.surahNumber,
              ayah.ayahNumber
            );

            const currentLanguage =
              getCurrentLanguage(ayah);

            const translation = currentLanguage
              ? ayah.translations[currentLanguage]
              : undefined;

            return (
              <article
                className="kanzAyahCard"
                key={key}
              >
                {/* Ayat reference. */}
                <div className="kanzAyahReference">
                  <span>
                    Surah {ayah.surahNumber}
                  </span>

                  <span>
                    Ayah {ayah.ayahNumber}
                  </span>
                </div>

                {/* Original Arabic text ko sirf display karte hain. */}
                <p
                  className="kanzArabicText"
                  dir="rtl"
                  lang="ar"
                >
                  {ayah.arabic}
                </p>

                {/* Tap karne par translation language badlegi. */}
                <button
                  type="button"
                  className="kanzTranslationButton"
                  onClick={() =>
                    handleTranslationTap(ayah)
                  }
                  disabled={
                    !autoMode ||
                    !currentLanguage ||
                    LANGUAGE_ORDER.filter(
                      (language) =>
                        Boolean(
                          ayah.translations[language]?.trim()
                        )
                    ).length < 2
                  }
                  aria-label="Tarjume ki language badlein"
                  title={
                    autoMode
                      ? "Agli available language ke liye tap karein"
                      : "Language badalne ke liye website Language setting mein Auto chunein"
                  }
                >
                  <span className="kanzTranslationLabel">
                    {currentLanguage
                      ? LANGUAGE_LABELS[currentLanguage]
                      : "Translation unavailable"}
                  </span>

                  <span aria-hidden="true">
                    {autoMode ? " ↻" : ""}
                  </span>
                </button>

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
                  <p className="kanzMissingTranslation">
                    Is ayat ka tarjuma abhi available nahi hai.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Developer note:
          Future mein English/Hindi/Roman Urdu files connect karne ke baad
          translations object mein unke text add honge.
          Example:
          translations: {
            en: englishText,
            hi: hindiText,
            ur: urduText,
            roman: romanUrduText,
          }
      */}
    </section>
    );
}
