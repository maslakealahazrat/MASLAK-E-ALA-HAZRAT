"use client";

import { useEffect, useMemo, useState } from "react";

export type KanzLanguage = "en" | "hi" | "ur" | "roman";

export type KanzTranslations = Partial<Record<KanzLanguage, string>>;

export type KanzReaderAyah = {
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  translations: KanzTranslations;
  surahName?: string;
};

type Props = {
  ayahs: KanzReaderAyah[];
};

const LANGUAGE_ORDER: KanzLanguage[] = ["en", "ur", "hi", "roman"];

function readSiteLanguage(): string {
  if (typeof window === "undefined") return "auto";

  try {
    return localStorage.getItem("site-language") || "auto";
  } catch {
    return "auto";
  }
}

/*
 * Search matching ke liye sirf search query aur comparison text
 * normalize hote hain. Original Arabic data ko modify nahi kiya jata.
 */
function normalizeSearchText(value: string): string {
  return value
    .normalize("NFC")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function getAvailableLanguages(
  translations: KanzTranslations
): KanzLanguage[] {
  return LANGUAGE_ORDER.filter((language) => {
    return Boolean(translations[language]?.trim());
  });
}

export default function KanzUlImanReader({ ayahs }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [siteLanguage, setSiteLanguage] = useState("auto");
  const [ayahLanguages, setAyahLanguages] = useState<
    Record<string, KanzLanguage>
  >({});
  const [activeAyah, setActiveAyah] = useState<string | null>(null);

  useEffect(() => {
    setSiteLanguage(readSiteLanguage());

    const updateLanguage = (event: Event) => {
      setSiteLanguage(readSiteLanguage());

      const customEvent = event as CustomEvent<{ language?: string }>;

      if (customEvent.detail?.language) {
        setSiteLanguage(customEvent.detail.language);
      }
    };

    window.addEventListener("storage", updateLanguage);
    window.addEventListener("site-language-change", updateLanguage);

    return () => {
      window.removeEventListener("storage", updateLanguage);
      window.removeEventListener("site-language-change", updateLanguage);
    };
  }, []);

  const filteredAyahs = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    if (!query) return [];

    return ayahs.filter((ayah) => {
      const reference = `${ayah.surahNumber}:${ayah.ayahNumber}`;

      const surahName = normalizeSearchText(
        ayah.surahName || `Surah ${ayah.surahNumber}`
      );

      const arabic = normalizeSearchText(ayah.arabic);

      const translations = Object.values(ayah.translations)
        .filter((value): value is string => Boolean(value))
        .map(normalizeSearchText);

      return (
        reference.includes(query) ||
        surahName.includes(query) ||
        arabic.includes(query) ||
        translations.some((translation) => translation.includes(query))
      );
    });
  }, [ayahs, searchQuery]);

  function getAyahKey(ayah: KanzReaderAyah): string {
    return `${ayah.surahNumber}:${ayah.ayahNumber}`;
  }

  function getCurrentLanguage(
    ayah: KanzReaderAyah
  ): KanzLanguage | null {
    const available = getAvailableLanguages(ayah.translations);

    if (available.length === 0) return null;

    const selected = ayahLanguages[getAyahKey(ayah)];

    if (selected && available.includes(selected)) {
      return selected;
    }

    if (
      siteLanguage !== "auto" &&
      available.includes(siteLanguage as KanzLanguage)
    ) {
      return siteLanguage as KanzLanguage;
    }

    return available[0];
  }

  function cycleTranslation(ayah: KanzReaderAyah) {
    const available = getAvailableLanguages(ayah.translations);

    if (available.length < 2) return;

    const key = getAyahKey(ayah);
    const current = getCurrentLanguage(ayah);
    const currentIndex = current ? available.indexOf(current) : -1;
    const next = available[(currentIndex + 1) % available.length];

    setAyahLanguages((previous) => ({
      ...previous,
      [key]: next,
    }));
  }

  function jumpToAyah(ayah: KanzReaderAyah) {
    const key = getAyahKey(ayah);
    setActiveAyah(key);
    setSearchQuery("");

    window.setTimeout(() => {
      const element = document.getElementById(`kanz-ayah-${key}`);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  return (
    <section className="kanzReader">
      {/* Sticky search bar: Page / Surah / Ayat navigation ki jagah */}
      <div className="kanzSearchSticky">
        <label className="kanzSearchLabel" htmlFor="kanz-ayah-search">
          Qur’an mein search karein
        </label>

        <div className="kanzSearchInputWrap">
          <span className="kanzSearchIcon" aria-hidden="true">
            ⌕
          </span>

          <input
            id="kanz-ayah-search"
            className="kanzSearchInput"
            type="search"
            placeholder="Arabic ayat, tarjuma ya 2:255..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoComplete="off"
          />

          {searchQuery && (
            <button
              type="button"
              className="kanzSearchClear"
              onClick={() => setSearchQuery("")}
              aria-label="Search clear karein"
            >
              ×
            </button>
          )}
        </div>

        {searchQuery.trim() && (
          <div className="kanzSearchResults" role="status">
            <div className="kanzSearchResultsHeader">
              <span>Search results</span>
              <span>{filteredAyahs.length} results</span>
            </div>

            {filteredAyahs.length > 0 ? (
              <div className="kanzSearchResultsList">
                {filteredAyahs.slice(0, 50).map((ayah) => {
                  const key = getAyahKey(ayah);

                  return (
                    <button
                      key={key}
                      type="button"
                      className="kanzSearchResult"
                      onClick={() => jumpToAyah(ayah)}
                    >
                      <span className="kanzSearchResultReference">
                        {ayah.surahName || `Surah ${ayah.surahNumber}`}
                        {" · "}
                        Ayat {ayah.ayahNumber}
                      </span>

                      <span className="kanzSearchResultArabic" dir="rtl">
                        {ayah.arabic}
                      </span>
                    </button>
                  );
                })}

                {filteredAyahs.length > 50 && (
                  <p className="kanzSearchMore">
                    Pehle 50 results dikhaye gaye hain. Search ko aur specific
                    banayein.
                  </p>
                )}
              </div>
            ) : (
              <p className="kanzSearchEmpty">
                Koi matching Ayat nahi mili. Doosre alfaaz se search karein.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Ayat list — Arabic text ko original form mein render kiya jata hai */}
      <div className="kanzAyahList">
        {ayahs.map((ayah) => {
          const key = getAyahKey(ayah);
          const language = getCurrentLanguage(ayah);
          const translation = language
            ? ayah.translations[language]
            : undefined;

          return (
            <article
              key={key}
              id={`kanz-ayah-${key}`}
              className={`kanzAyahCard ${
                activeAyah === key ? "kanzAyahActive" : ""
              }`}
            >
              <div className="kanzAyahReference">
                <span>
                  {ayah.surahName || `Surah ${ayah.surahNumber}`}
                </span>

                <span>
                  {ayah.surahNumber}:{ayah.ayahNumber}
                </span>
              </div>

              <p className="kanzArabicText" dir="rtl" lang="ar">
                {ayah.arabic}
              </p>

              {language && translation ? (
                <>
                  <button
                    type="button"
                    className="kanzTranslationButton"
                    onClick={() => cycleTranslation(ayah)}
                    aria-label="Tarjuma badalne ke liye tap karein"
                    title="Available translations badalne ke liye tap karein"
                  >
                    {language === "en"
                      ? "English"
                      : language === "ur"
                        ? "اردو"
                        : language === "hi"
                          ? "हिन्दी"
                          : "Roman Urdu"}
                    {getAvailableLanguages(ayah.translations).length > 1
                      ? " ↻"
                      : ""}
                  </button>

                  <p
                    className="kanzTranslationText"
                    dir={language === "ur" ? "rtl" : "auto"}
                    lang={language}
                  >
                    {translation}
                  </p>
                </>
              ) : (
                <p className="kanzMissingTranslation">
                  Is Ayat ka tarjuma abhi available nahi hai.
                </p>
              )}
            </article>
          );
        })}
      </div>

      <div className="kanzTanzilAttribution">
        Arabic text ke liye Tanzil ka attribution aur license notice usi
        surat mein rakhein jab istemal kiya gaya text Tanzil se aaya ho.
        <br />
        <a
          href="https://tanzil.net/docs/Text_License"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanzil Text License
        </a>
      </div>
    </section>
  );
}
