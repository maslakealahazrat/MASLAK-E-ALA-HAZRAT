import type { MetadataRoute } from "next";

import { quranAyahs } from "@/data/quran/ayahs";
import { ilmKaSafarLessons } from "@/data/ilm-ka-safar";

const SITE_URL =
  "https://maslak-e-ala-hazrat-weld.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  /*
   * ---------------------------------------------------------
   * IMPORTANT
   * ---------------------------------------------------------
   * Sitemap mein sirf woh URLs rakhe ja rahe hain
   * jinhe hum Google Search mein appear karwana chahte hain.
   *
   * Ayah ke #anchor URLs sitemap mein nahi daale ja rahe,
   * kyunki URL fragments (#ayah-...) server ko nahi bheje jaate.
   */

  const staticPages = [
    "",
    "/quran",
    "/quran/full",
    "/search",
    "/hadith",
    "/ala-hazrat",
    "/naat-manqabat",
    "/hadaiq-e-bakhshish",
    "/fatawa-razawiyya",
    "/kanz-ul-iman",
    "/seerat-un-nabi",
    "/ilm-ka-safar",
    "/islamic-books",
    "/gulzar-e-millat",
    "/quran-samajhne-ka-safar",
    "/artist-biography",
    "/contact",
    "/about",
    "/disclaimer",
    "/islamic-calendar",
  ];

  /*
   * ---------------------------------------------------------
   * QUR'AN SURAH PAGES
   * ---------------------------------------------------------
   * quranAyahs se unique Surah numbers automatically niklenge.
   *
   * Isliye future mein Quran data expand/change hone par
   * yahan manually 1,2,3...114 likhne ki zarurat nahi.
   */

  const surahNumbers = Array.from(
    new Set(
      quranAyahs.map(
        (ayah) => ayah.surahNumber
      )
    )
  ).sort((a, b) => a - b);

  const quranPages = surahNumbers.map(
    (surahNumber) => ({
      url: `${SITE_URL}/quran/${surahNumber}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  /*
   * ---------------------------------------------------------
   * ILM KA SAFAR
   * ---------------------------------------------------------
   * Jitne lessons data registry mein hain,
   * utne Day URLs automatically sitemap mein aa jayenge.
   *
   * Day 4, Day 5, Day 6... add karoge aur
   * ilmKaSafarLessons mein available honge,
   * to sitemap automatically update ho jayega.
   */

  const ilmKaSafarPages = Object.keys(
    ilmKaSafarLessons
  ).map((day) => ({
    url: `${SITE_URL}/ilm-ka-safar/day/${day}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /*
   * ---------------------------------------------------------
   * FINAL SITEMAP
   * ---------------------------------------------------------
   */

  const mainPages = staticPages.map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency:
        path === ""
          ? ("weekly" as const)
          : ("monthly" as const),
      priority:
        path === ""
          ? 1
          : path === "/quran"
          ? 0.9
          : 0.7,
    })
  );

  return [
    ...mainPages,
    ...quranPages,
    ...ilmKaSafarPages,
  ];
}
