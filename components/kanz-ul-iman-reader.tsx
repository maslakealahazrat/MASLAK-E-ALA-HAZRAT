"use client";

/*
 * MASLAK-E-ALA HAZRAT
 * KANZ-UL-IMAN READER
 *
 * Features:
 * 1. Arabic Ayat
 * 2. Available translations only
 * 3. Har Ayat ki language alag change karna
 * 4. Sticky Page / Surah / Ayat navigation
 * 5. Compact navigation lists
 * 6. Mobile-friendly layout
 *
 * NOTE:
 * Arabic text ko modify nahi karna.
 * Bina verified source aur permission ke translation enable nahi karna.
 */

import { useEffect, useMemo, useState } from "react";

/* =========================================================
   TYPES
   ========================================================= */

export type KanzLanguage = "en" | "hi" | "ur" | "roman";

export type KanzTranslations = Partial<
  Record<KanzLanguage, string>
>;

export type KanzReaderAyah = {
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  translations: KanzTranslations;

  /*
   * Actual Madani Mushaf page number available ho,
   * to yahan pageNumber pass kar sakte hain.
   */
  pageNumber?: number;

  /*
   * Optional: Surah ka naam.
   * Nahi diya gaya to "Surah 1", "Surah 2" etc. dikhayega.
   */
  surahName?: string;
};

type Props = {
  ayahs: KanzReaderAyah[];
};

type KanzNavigationTab = "page" | "surah" | "ayah";

type NavigationItem = {
  key: string;
  label: string;
  targetId: string;
};

/* =========================================================
   LANGUAGE SETTINGS
   ========================================================= */

const LANGUAGE_ORDER: KanzLanguage[] = [
  "en",
  "hi",
  "ur",
  "roman",
];

const LANGUAGE_LABELS: Record<KanzLanguage, string> = {
  en: "English",
  hi: "हिन्दी",
  ur: "اردو",
  roman: "Roman Urdu",
};

/* =========================================================
   LANGUAGE HELPERS
   ========================================================= */

function getAvailableLanguages(
  translations: KanzTranslations
): KanzLanguage[] {
  return LANGUAGE_ORDER.filter((language) =>
    Boolean(translations[language]?.trim())
  );
}

function getNextAvailableLanguage(
  currentLanguage: KanzLanguage | null,
  translations: KanzTranslations
): KanzLanguage | null {
  const available = getAvailableLanguages(translations);

  if (available.length === 0) {
    return null;
  }

  if (!currentLanguage) {
    return available[0];
  }

  const currentIndex = available.indexOf(currentLanguage);

  if (currentIndex === -1) {
    return available[0];
  }

  return available[(currentIndex + 1) % available.length];
}

function getAyahKey(
  surahNumber: number,
  ayahNumber: number
): string {
  return `${surahNumber}:${ayahNumber}`;
}

function getAyahElementId(
  surahNumber: number,
  ayahNumber: number
): string {
  return `kanz-ayah-${surahNumber}-${ayahNumber}`;
}

function getSurahElementId(surahNumber: number): string {
  return `kanz-surah-${surahNumber}`;
}

function getPageElementId(pageNumber: number): string {
  return `kanz-page-${pageNumber}`;
}

/* =========================================================
   SURAH NAMES
   ========================================================= */

/*
 * Agar data mein surahName diya ho to wahi use hoga.
 * Warna filhaal Surah number dikhaya jayega.
 *
 * Isse galat ya andaze se Surah ka naam nahi dikhaya jayega.
 */

function getSurahLabel(ayah: KanzReaderAyah): string {
  return ayah.surahName?.trim() || `Surah ${ayah.surahNumber}`;
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function KanzUlImanReader({
  ayahs,
}: Props) {
  /*
   * Auto Mode:
   * Har Ayat ke translation button par tap karke
   * available translations ke beech switch kar sakte hain.
   */
  const [autoMode, setAutoMode] = useState(true);

  /*
   * Manual language state internal compatibility ke liye hai.
   * Reader mein alag language selector nahi dikhaya jayega.
   */
  const [manualLanguage, setManualLanguage] =
    useState<KanzLanguage>("en");

  /*
   * Har Ayat ki selected language alag store hoti hai.
   */
  const [ayahLanguages, setAyahLanguages] =
    useState<Record<string, KanzLanguage>>({});

  /*
   * Navigation ki currently open list.
   */
  const [activeTab, setActiveTab] =
    useState<KanzNavigationTab | null>(null);

  /*
   * Navigation list mein selected item.
   */
  const [selectedItem, setSelectedItem] = useState("");

  /* =======================================================
     GLOBAL LANGUAGE SETTING
     ======================================================= */

  useEffect(() => {
    function readSiteLanguage(): string {
      try {
        return localStorage.getItem("site-language") || "auto";
      } catch {
        return "auto";
      }
    }

    function updateLanguage(value?: string) {
      let savedLanguage = value;

      if (!savedLanguage) {
        savedLanguage = readSiteLanguage();
      }

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
    }

    function handleStorage() {
      updateLanguage();
    }

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<string>;
      updateLanguage(customEvent.detail);
    }

    updateLanguage();

    window.addEventListener("storage", handleStorage);

    window.addEventListener(
      "site-language-change",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener("storage", handleStorage);

      window.removeEventListener(
        "site-language-change",
        handleLanguageChange
      );
    };
  }, []);

  /* =======================================================
     NAVIGATION DATA
     ======================================================= */

  /*
   * Surah list ayahs ke actual data se banti hai.
   * Sirf wahi Surah aayengi jinki Ayat data mein maujood hain.
   */
  const surahItems = useMemo<NavigationItem[]>(() => {
    const seen = new Map<number, NavigationItem>();

    for (const ayah of ayahs) {
      if (!seen.has(ayah.surahNumber)) {
        seen.set(ayah.surahNumber, {
          key: String(ayah.surahNumber),
          label: getSurahLabel(ayah),
          targetId: getSurahElementId(ayah.surahNumber),
        });
      }
    }

    return Array.from(seen.values());
  }, [ayahs]);

  /*
   * Ayat list actual Ayat references se banti hai.
   */
  const ayahItems = useMemo<NavigationItem[]>(() => {
    return ayahs.map((ayah) => ({
      key: getAyahKey(ayah.surahNumber, ayah.ayahNumber),
      label: `${getSurahLabel(ayah)} · Ayat ${ayah.ayahNumber}`,
      targetId: getAyahElementId(
        ayah.surahNumber,
        ayah.ayahNumber
      ),
    }));
  }, [ayahs]);

  /*
   * Page list sirf tab banegi jab actual pageNumber data ho.
   *
   * Important:
   * Is code mein fake page numbers generate nahi hote.
   */
  const pageItems = useMemo<NavigationItem[]>(() => {
    const pages = new Map<number, NavigationItem>();

    for (const ayah of ayahs) {
      if (
        typeof ayah.pageNumber !== "number" ||
        !Number.isFinite(ayah.pageNumber)
      ) {
        continue;
      }

      if (!pages.has(ayah.pageNumber)) {
        pages.set(ayah.pageNumber, {
          key: String(ayah.pageNumber),
          label: `Page ${ayah.pageNumber}`,
          targetId: getPageElementId(ayah.pageNumber),
        });
      }
    }

    return Array.from(pages.values()).sort(
      (a, b) => Number(a.key) - Number(b.key)
    );
  }, [ayahs]);

  /* =======================================================
     CURRENT TRANSLATION LANGUAGE
     ======================================================= */

  function getCurrentLanguage(
    ayah: KanzReaderAyah
  ): KanzLanguage | null {
    const available = getAvailableLanguages(ayah.translations);

    if (available.length === 0) {
      return null;
    }

    /*
     * Manual mode mein doosri language ka translation
     * apne aap fallback nahi hoga.
     */
    if (!autoMode) {
      return ayah.translations[manualLanguage]?.trim()
        ? manualLanguage
        : null;
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

    if (ayah.translations.en?.trim()) {
      return "en";
    }

    return available[0];
  }

  /* =======================================================
     TAP TO CHANGE TRANSLATION
     ======================================================= */

  function handleTranslationTap(ayah: KanzReaderAyah) {
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

    if (!nextLanguage) {
      return;
    }

    setAyahLanguages((previous) => ({
      ...previous,
      [key]: nextLanguage,
    }));
  }

  /* =======================================================
     NAVIGATION ACTIONS
     ======================================================= */

  function toggleTab(tab: KanzNavigationTab) {
    setActiveTab((current) => (current === tab ? null : tab));
    setSelectedItem("");
  }

  function getItemsForTab(): NavigationItem[] {
    if (activeTab === "page") {
      return pageItems;
    }

    if (activeTab === "surah") {
      return surahItems;
    }

    if (activeTab === "ayah") {
      return ayahItems;
    }

    return [];
  }

  /*
   * Item select hone par:
   * 1. List close hogi.
   * 2. Selected item target par smooth scroll hoga.
   *
   * Sticky navigation ki height ko CSS scroll-margin-top
   * se handle kiya jayega.
   */
  function navigateToItem(item: NavigationItem) {
    setSelectedItem(item.key);
    setActiveTab(null);

    window.requestAnimationFrame(() => {
      const element = document.getElementById(item.targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  /* =======================================================
     PAGE NUMBER GROUPS
     ======================================================= */

  /*
   * Page number available ho to page ke pehle Ayat par
   * page anchor banega.
   *
   * Page metadata nahi ho to fake page anchor nahi banega.
   */
  const firstAyahForPage = useMemo(() => {
    const firstByPage = new Map<number, string>();

    for (const ayah of ayahs) {
      if (
        typeof ayah.pageNumber !== "number" ||
        !Number.isFinite(ayah.pageNumber)
      ) {
        continue;
      }

      if (!firstByPage.has(ayah.pageNumber)) {
        firstByPage.set(
          ayah.pageNumber,
          getAyahElementId(
            ayah.surahNumber,
            ayah.ayahNumber
          )
        );
      }
    }

    return firstByPage;
  }, [ayahs]);

  /* =======================================================
     EMPTY STATE
     ======================================================= */

  if (ayahs.length === 0) {
    return (
      <section className="kanzReader">
        <div className="kanzEmptyState">
          <div className="kanzEmptyIcon" aria-hidden="true">
            ۞
          </div>

          <h3>Reader data available nahi hai</h3>

          <p>
            Arabic Ayat ka data connect hone par yahan
            Qur’an reader dikhaya jayega.
          </p>
        </div>
      </section>
    );
  }

  /* =======================================================
     READER UI
     ======================================================= */

  return (
    <section className="kanzReader">
      {/* ===================================================
          STICKY NAVIGATION
          Reader ka duplicate title aur language selector
          yahan nahi hai.
         =================================================== */}

      <nav
        className="kanzStickyNavigation"
        aria-label="Qur’an reader navigation"
      >
        <div className="kanzNavigationRow">
          <button
            type="button"
            className={
              activeTab === "page"
                ? "kanzNavigationButton active"
                : "kanzNavigationButton"
            }
            onClick={() => toggleTab("page")}
            aria-expanded={activeTab === "page"}
          >
            Page ka list
          </button>

          <button
            type="button"
            className={
              activeTab === "surah"
                ? "kanzNavigationButton active"
                : "kanzNavigationButton"
            }
            onClick={() => toggleTab("surah")}
            aria-expanded={activeTab === "surah"}
          >
            Surah ka list
          </button>

          <button
            type="button"
            className={
              activeTab === "ayah"
                ? "kanzNavigationButton active"
                : "kanzNavigationButton"
            }
            onClick={() => toggleTab("ayah")}
            aria-expanded={activeTab === "ayah"}
          >
            Ayat ka list
          </button>
        </div>

        {activeTab && (
          <div className="kanzNavigationPanel">
            {activeTab === "page" && pageItems.length === 0 ? (
              <p className="kanzNavigationMessage">
                Page list dikhane ke liye Qur’an ke actual
                Mushaf page numbers data mein connect karne
                honge. Filhaal page numbers available nahi hain.
              </p>
            ) : (
              <div className="kanzNavigationList">
                {getItemsForTab().map((item) => (
                  <button
                    type="button"
                    key={item.key}
                    className={
                      selectedItem === item.key
                        ? "kanzNavigationListItem selected"
                        : "kanzNavigationListItem"
                    }
                    onClick={() => navigateToItem(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ===================================================
          AYAT LIST
         =================================================== */}

      <div className="kanzAyahList">
        {ayahs.map((ayah, index) => {
          const key = getAyahKey(
            ayah.surahNumber,
            ayah.ayahNumber
          );

          const currentLanguage = getCurrentLanguage(ayah);

          const translation = currentLanguage
            ? ayah.translations[currentLanguage]?.trim()
            : "";

          const availableLanguages =
            getAvailableLanguages(ayah.translations);

          const canCycle =
            autoMode && availableLanguages.length > 1;

          const previousAyah = ayahs[index - 1];

          const isFirstAyahOfSurah =
            !previousAyah ||
            previousAyah.surahNumber !== ayah.surahNumber;

          const isFirstAyahOfPage =
            typeof ayah.pageNumber === "number" &&
            (
              !previousAyah ||
              previousAyah.pageNumber !== ayah.pageNumber
            );

          return (
            <article
              className="kanzAyahCard"
              key={key}
              id={getAyahElementId(
                ayah.surahNumber,
                ayah.ayahNumber
              )}
            >
              {/* Page anchor: actual page metadata par hi. */}
              {isFirstAyahOfPage &&
                typeof ayah.pageNumber === "number" && (
                  <span
                    className="kanzPageAnchor"
                    id={getPageElementId(ayah.pageNumber)}
                    aria-hidden="true"
                  />
                )}

              {/* Surah anchor: har Surah ke pehle Ayat par. */}
              {isFirstAyahOfSurah && (
                <span
                  className="kanzSurahAnchor"
                  id={getSurahElementId(ayah.surahNumber)}
                  aria-hidden="true"
                />
              )}

              <div className="kanzAyahReference">
                <span>{getSurahLabel(ayah)}</span>

                <span className="kanzAyahNumber">
                  Ayat {ayah.ayahNumber}
                </span>
              </div>

              {/* Original Arabic text ko badla nahi ja raha. */}
              <p
                className="kanzArabicText"
                dir="rtl"
                lang="ar"
              >
                {ayah.arabic}
              </p>

              <div className="kanzTranslationArea">
                <button
                  type="button"
                  className="kanzTranslationButton"
                  onClick={() => handleTranslationTap(ayah)}
                  disabled={!canCycle}
                  aria-label={
                    `Surah ${ayah.surahNumber}, Ayat ${ayah.ayahNumber}: agla available tarjuma`
                  }
                  title={
                    canCycle
                      ? "Agli available language"
                      : "Ek se zyada translations available nahi hain"
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

                {translation ? (
                  <p
                    className="kanzTranslationText"
                    dir={
                      currentLanguage === "ur"
                        ? "rtl"
                        : "auto"
                    }
                    lang={currentLanguage || "en"}
                  >
                    {translation}
                  </p>
                ) : (
                  <p className="kanzMissingTranslation">
                    Is language mein is Ayat ka tarjuma abhi
                    available nahi hai. Verified source aur
                    zaroori permission confirm hone ke baad hi
                    tarjuma yahan dikhaya jayega.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="kanzReaderFooter">
        Arabic Qur’an text original form mein preserve kiya
        jata hai. Translation ki availability verified source
        aur permission par depend karti hai.
      </p>
    </section>
  );
}
