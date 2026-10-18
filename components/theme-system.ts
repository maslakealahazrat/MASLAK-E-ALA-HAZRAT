/**
 * Maslak-e-Ala-Hazrat
 * Central theme utilities.
 *
 * Supported themes:
 * - emerald
 * - sepia
 * - dark
 * - light
 *
 * This file does not change the UI until the existing theme
 * controls and page components are connected to these functions.
 */

export const SITE_THEME_STORAGE_KEY = "site-theme";
export const QURAN_THEME_STORAGE_KEY = "quran-app-theme";

export const SITE_THEME_CHANGE_EVENT = "maslak:theme-change";

export const SITE_THEMES = [
  "emerald",
  "sepia",
  "dark",
  "light",
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];

const DARK_BASE_THEMES: SiteTheme[] = ["emerald", "dark"];

export function isSiteTheme(value: unknown): value is SiteTheme {
  return (
    typeof value === "string" &&
    SITE_THEMES.includes(value as SiteTheme)
  );
}

/**
 * Reads the saved theme.
 *
 * The existing Quran theme preference is checked first because
 * it already supports all four themes.
 *
 * If no valid Quran theme exists, the homepage preference is
 * used when it is "light" or "dark".
 *
 * The default is "emerald", matching the existing Quran theme
 * and the site's established emerald styling.
 */
export function getStoredSiteTheme(): SiteTheme {
  if (typeof window === "undefined") {
    return "emerald";
  }

  try {
    const savedQuranTheme = localStorage.getItem(
      QURAN_THEME_STORAGE_KEY
    );

    if (isSiteTheme(savedQuranTheme)) {
      return savedQuranTheme;
    }

    const savedSiteTheme = localStorage.getItem(
      SITE_THEME_STORAGE_KEY
    );

    if (savedSiteTheme === "light" || savedSiteTheme === "dark") {
      return savedSiteTheme;
    }
  } catch {
    // Continue with the safe default if storage is unavailable.
  }

  return "emerald";
}

/**
 * Applies the selected theme to the document root.
 *
 * Existing page-specific theme classes are not removed.
 * These root classes allow shared theme variables to be
 * inherited by pages after they are connected to this system.
 */
export function applySiteTheme(theme: SiteTheme): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.dataset.siteTheme = theme;

  for (const supportedTheme of SITE_THEMES) {
    root.classList.remove(`quran-theme-${supportedTheme}`);
  }

  root.classList.add(`quran-theme-${theme}`);

  root.classList.toggle(
    "dark",
    DARK_BASE_THEMES.includes(theme)
  );

  root.classList.toggle(
    "light",
    !DARK_BASE_THEMES.includes(theme)
  );
}

/**
 * Saves and applies one common theme.
 *
 * Both existing storage keys are updated for compatibility
 * with the current homepage and Quran readers.
 */
export function setSiteTheme(theme: SiteTheme): void {
  if (!isSiteTheme(theme)) {
    return;
  }

  applySiteTheme(theme);

  try {
    localStorage.setItem(SITE_THEME_STORAGE_KEY, theme);
    localStorage.setItem(QURAN_THEME_STORAGE_KEY, theme);
  } catch {
    // The theme still applies for the current page even if
    // the browser prevents persistent storage.
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<SiteTheme>(SITE_THEME_CHANGE_EVENT, {
        detail: theme,
      })
    );
  }
}

/**
 * Subscribes to theme changes made by connected components
 * or another browser tab.
 *
 * Returns a cleanup function for React effect use.
 */
export function listenForSiteThemeChanges(
  onChange: (theme: SiteTheme) => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleCustomThemeChange = (event: Event) => {
    const customEvent = event as CustomEvent<SiteTheme>;
    const theme = customEvent.detail;

    if (!isSiteTheme(theme)) {
      return;
    }

    applySiteTheme(theme);
    onChange(theme);
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (
      event.key !== SITE_THEME_STORAGE_KEY &&
      event.key !== QURAN_THEME_STORAGE_KEY
    ) {
      return;
    }

    const theme = getStoredSiteTheme();

    applySiteTheme(theme);
    onChange(theme);
  };

  window.addEventListener(
    SITE_THEME_CHANGE_EVENT,
    handleCustomThemeChange
  );

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(
      SITE_THEME_CHANGE_EVENT,
      handleCustomThemeChange
    );

    window.removeEventListener(
      "storage",
      handleStorageChange
    );
  };
}
