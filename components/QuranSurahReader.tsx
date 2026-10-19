"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Settings,
  Info,
  BookOpen,
  Share2,
  Copy,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
  Eye,
  EyeOff,
  Search,
  X,
  Compass
} from "lucide-react";
import type { SurahMeta } from "@/data/quran/surahs-meta";
import {
  getStoredSiteTheme,
  listenForSiteThemeChanges,
  setSiteTheme,
  type SiteTheme,
} from "@/components/theme-system";
import "@/app/quran/quran-app.css";

type AyahItem = {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
};

type Props = {
  surah: SurahMeta;
  ayahs: AyahItem[];
  urduTranslations: Record<number, string>;
  englishTranslations: Record<number, string>;
  allSurahs: SurahMeta[];
};

const RECITERS = [
  { id: "Alafasy_128kbps", name: "Mishary Rashid Alafasy", label: "Mishary Alafasy (العفاسي)" },
  { id: "Abdul_Basit_Murattal_192kbps", name: "Abdul Basit (Murattal)", label: "Abdul Basit Murattal (مرتل)" },
  { id: "Abdul_Basit_Mujawwad_128kbps", name: "Abdul Basit (Mujawwad)", label: "Abdul Basit Mujawwad (مجود)" },
  { id: "Husary_128kbps", name: "Mahmoud Khalil Al-Husary", label: "Mahmoud Al-Husary (الحصري)" },
  { id: "Abu_Bakr_Ash-Shaatree_128kbps", name: "Abu Bakr Al-Shatri", label: "Abu Bakr Al-Shatri (الشاطري)" },
  { id: "Minshawy_Murattal_128kbps", name: "Mohamed Siddiq El-Minshawi", label: "Siddiq El-Minshawi (المنشاوي)" },
  { id: "Ghamadi_40kbps", name: "Saad Al-Ghamdi", label: "Saad Al-Ghamdi (الغامدي)" },
  { id: "Saood_ash-Shuraym_128kbps", name: "Saud Al-Shuraim", label: "Saud Al-Shuraim (الشريم)" },
];

function pad3(num: number): string {
  return String(num).padStart(3, "0");
}

function toArabicNumerals(num: number): string {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).split("").map((d) => digits[parseInt(d, 10)]).join("");
}

export default function QuranSurahReader({
  surah,
  ayahs,
  urduTranslations,
  englishTranslations,
  allSurahs,
}: Props) {
  // View mode
  const [viewMode, setViewMode] = useState<"translation" | "mushaf" | "hifz">("translation");

  // Settings
  const [theme, setTheme] = useState<"emerald" | "sepia" | "dark" | "light" | null>(null);
  const [arabicFont, setArabicFont] = useState<"uthmani" | "indopak">("uthmani");
  const [arabicFontSize, setArabicFontSize] = useState<number>(32);
  const [translationFontSize, setTranslationFontSize] = useState<number>(16);
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [hifzConceal, setHifzConceal] = useState<"translation" | "arabic">("translation");

  // Audio state
  const [reciter, setReciter] = useState<string>("Alafasy_128kbps");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [repeatMode, setRepeatMode] = useState<"none" | "1x" | "2x" | "loop">("none");
  const [repeatCounter, setRepeatCounter] = useState<number>(0);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  // Modals
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [jumpOpen, setJumpOpen] = useState<boolean>(false);
  const [jumpInput, setJumpInput] = useState<string>("");
  const [activeTafseerAyah, setActiveTafseerAyah] = useState<number | null>(null);

  // Popups & Feedback
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Set<number>>(new Set());
  const [toastMessage, setToastMessage] = useState<string>("");

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const savedTheme = getStoredSiteTheme();
      setTheme(savedTheme);

      const savedFont = localStorage.getItem("quran-arabic-font");
      if (savedFont === "uthmani" || savedFont === "indopak") {
        setArabicFont(savedFont);
      }

      const savedArSize = localStorage.getItem("quran-ar-size");
      if (savedArSize) setArabicFontSize(Number(savedArSize));

      const savedTrSize = localStorage.getItem("quran-tr-size");
      if (savedTrSize) setTranslationFontSize(Number(savedTrSize));

      const savedBookmarks = localStorage.getItem("maslak-quran-bookmarks");
      if (savedBookmarks) {
        const parsed = JSON.parse(savedBookmarks);
        const set = new Set<number>();

        for (const item of parsed) {
          if (item.surahNumber === surah.number) {
            set.add(item.ayahNumber);
          }
        }

        setBookmarkedAyahs(set);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [surah.number]);

// Sync theme changes across the entire website
useEffect(() => {
  const syncTheme = (nextTheme: SiteTheme) => {
    setTheme(nextTheme);
  };

  setTheme(getStoredSiteTheme());

  return listenForSiteThemeChanges(syncTheme);
}, []);
  
  // Persist Theme & Settings
const handleThemeChange = (newTheme: SiteTheme) => {
  setSiteTheme(newTheme);
};

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  // Audio Playback
  const getAudioUrl = (ayahNum: number, targetReciter: string = reciter) => {
    return `https://everyayah.com/data/${targetReciter}/${pad3(surah.number)}${pad3(ayahNum)}.mp3`;
  };

  const playAyah = (ayahNum: number, overrideReciter?: string, forcePlay: boolean = false) => {
    if (!audioRef.current) return;
    const activeRec = overrideReciter || reciter;

    if (!forcePlay && !overrideReciter && currentAyah === ayahNum && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentAyah(ayahNum);
    const primaryUrl = getAudioUrl(ayahNum, activeRec);
    audioRef.current.src = primaryUrl;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      // Auto scroll
      if (autoScroll) {
        const el = ayahRefs.current.get(ayahNum);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }).catch((err) => {
      console.warn("Primary audio play failed, testing fallback:", err);
      // If selected reciter encounters an issue, fallback immediately to Alafasy
      if (activeRec !== "Alafasy_128kbps") {
        const fallbackUrl = getAudioUrl(ayahNum, "Alafasy_128kbps");
        audioRef.current!.src = fallbackUrl;
        audioRef.current!.play().then(() => setIsPlaying(true)).catch(() => {
          showToast("Audio loading error, please check connection.");
          setIsPlaying(false);
        });
      } else {
        showToast("Audio loading error, please check connection.");
        setIsPlaying(false);
      }
    });
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const ayahToPlay = currentAyah || 1;
      playAyah(ayahToPlay);
    }
  };

  const playNextAyah = () => {
    const next = (currentAyah || 1) + 1;
    if (next <= surah.ayahCount) {
      playAyah(next);
    } else {
      setIsPlaying(false);
      setCurrentAyah(null);
      showToast("Surah completed.");
    }
  };

  const playPrevAyah = () => {
    const prev = (currentAyah || 1) - 1;
    if (prev >= 1) {
      playAyah(prev);
    }
  };

  const handleAudioEnded = () => {
    if (!currentAyah) return;

    if (repeatMode === "loop") {
      playAyah(currentAyah);
      return;
    }

    if (repeatMode === "1x" && repeatCounter < 1) {
      setRepeatCounter((prev) => prev + 1);
      playAyah(currentAyah);
      return;
    }

    if (repeatMode === "2x" && repeatCounter < 2) {
      setRepeatCounter((prev) => prev + 1);
      playAyah(currentAyah);
      return;
    }

    setRepeatCounter(0);
    playNextAyah();
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration > 0) {
      setAudioProgress((currentTime / duration) * 100);
    }
  };

  // Bookmarking
  const toggleBookmark = (ayahNum: number) => {
    const updated = new Set(bookmarkedAyahs);
    let isAdded = false;
    if (updated.has(ayahNum)) {
      updated.delete(ayahNum);
    } else {
      updated.add(ayahNum);
      isAdded = true;
    }
    setBookmarkedAyahs(updated);

    try {
      const raw = localStorage.getItem("maslak-quran-bookmarks") || "[]";
      let list = JSON.parse(raw);
      if (isAdded) {
        list.push({
          surahNumber: surah.number,
          surahName: surah.nameEnglish,
          ayahNumber: ayahNum,
          timestamp: Date.now(),
        });
        showToast(`Ayah ${surah.number}:${ayahNum} added to bookmarks.`);
      } else {
        list = list.filter(
          (item: any) =>
            !(item.surahNumber === surah.number && item.ayahNumber === ayahNum)
        );
        showToast(`Bookmark removed.`);
      }
      localStorage.setItem("maslak-quran-bookmarks", JSON.stringify(list));
    } catch {}
  };

  // Copy Ayah
  const copyAyah = async (ayah: AyahItem) => {
    const uText = urduTranslations[ayah.ayahNumber] || "";
    const eText = englishTranslations[ayah.ayahNumber] || "";
    
    let textToCopy = `${ayah.arabic}\n\n`;
    if (uText) textToCopy += `Urdu (Kanz-ul-Iman):\n${uText}\n\n`;
    if (eText) textToCopy += `English:\n${eText}\n\n`;
    textToCopy += `— [Surah ${surah.nameEnglish} (${surah.nameArabic}) ${surah.number}:${ayah.ayahNumber}]`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAyah(ayah.ayahNumber);
      showToast("Ayah & translation copied to clipboard!");
      setTimeout(() => setCopiedAyah(null), 2000);
    } catch {
      showToast("Could not copy to clipboard.");
    }
  };

  // Share Ayah
  const shareAyah = async (ayah: AyahItem) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/quran/${surah.number}#ayah-${ayah.ayahNumber}` : "";
    const shareData = {
      title: `Surah ${surah.nameEnglish} - Ayah ${ayah.ayahNumber}`,
      text: `${ayah.arabic}\n\n${urduTranslations[ayah.ayahNumber] || ""}`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      copyAyah(ayah);
    }
  };

  // Jump to Ayah
  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (!isNaN(target) && target >= 1 && target <= surah.ayahCount) {
      const el = ayahRefs.current.get(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setJumpOpen(false);
        setJumpInput("");
      }
    } else {
      showToast(`Please enter an ayah number between 1 and ${surah.ayahCount}`);
    }
  };

  // Previous & Next Surahs
  const prevSurah = surah.number > 1 ? allSurahs.find((s) => s.number === surah.number - 1) : null;
  const nextSurah = surah.number < 114 ? allSurahs.find((s) => s.number === surah.number + 1) : null;

  return (
    <div className={`quranContainer${theme ? ` quran-theme-${theme}` : ""}`}>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* STICKY TOP APP BAR */}
      <nav className="quranStickyNav">
        <div className="quranStickyNavInner">
          <div className="quranNavLeft">
            <Link href="/quran" className="quranIconButton">
              <ChevronLeft size={16} />
              <span>Surahs</span>
            </Link>

            <button
              type="button"
              className="quranIconButton"
              onClick={() => setJumpOpen(true)}
              title="Jump to Ayah"
            >
              <Compass size={16} />
              <span>Ayah {currentAyah ? `${currentAyah}/${surah.ayahCount}` : `1-${surah.ayahCount}`}</span>
            </button>
          </div>

          {/* VIEW MODE TOGGLE */}
          <div className="quranViewSelector">
            <button
              type="button"
              className={`quranViewBtn ${viewMode === "translation" ? "active" : ""}`}
              onClick={() => setViewMode("translation")}
            >
              Translation
            </button>
            <button
              type="button"
              className={`quranViewBtn ${viewMode === "mushaf" ? "active" : ""}`}
              onClick={() => setViewMode("mushaf")}
            >
              Mushaf / Reading
            </button>
            <button
              type="button"
              className={`quranViewBtn ${viewMode === "hifz" ? "active" : ""}`}
              onClick={() => setViewMode("hifz")}
            >
              Hifz Mode
            </button>
          </div>

          <div className="quranNavRight">
            <button
              type="button"
              className="quranIconButton"
              onClick={() => setInfoOpen(true)}
              title="Surah Information & Benefits"
            >
              <Info size={16} />
              <span className="hidden sm:inline">Info</span>
            </button>

            <button
              type="button"
              className="quranIconButton"
              onClick={() => setSettingsOpen(true)}
              title="Display & Typography Settings"
            >
              <Settings size={16} />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--q-card, #122825)",
            border: "1px solid var(--q-accent, #d4af37)",
            color: "var(--q-text, #f0f7f5)",
            padding: "8px 18px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Sparkles size={14} color="var(--q-accent, #d4af37)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HERO BANNER */}
      <section className="surahHeroBanner">
        <h1 className="surahArabicTitleHero" dir="rtl" lang="ar">
          {surah.nameArabic}
        </h1>
        <div className="surahEnglishTitleHero">
          {surah.number}. {surah.nameEnglish}
        </div>
        <div className="surahMeaningHero">
          &ldquo;{surah.meaningEnglish}&rdquo; &bull; {surah.nameUrdu}
        </div>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">
            {surah.type === "Meccan" ? "🕋 Makki" : "🕌 Madani"}
          </span>
          <span className="surahBadgeItem">
            {surah.ayahCount} Verses
          </span>
          <span className="surahBadgeItem">
            Juz {surah.juzStart}
          </span>
          <span className="surahBadgeItem">
            {surah.rukus} Rukus
          </span>
          {surah.hasSajdah && (
            <span className="surahBadgeItem" style={{ background: "rgba(212, 175, 55, 0.25)", color: "#ffe082" }}>
              ۩ Contains Sajdah
            </span>
          )}
        </div>

        <div className="surahQuickActions">
          <button
            type="button"
            className="quranIconButton active"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? "Pause Recitation" : "Listen Full Surah"}</span>
          </button>

          <button
            type="button"
            className="quranIconButton"
            onClick={() => setInfoOpen(true)}
          >
            <BookOpen size={16} />
            <span>Surah Overview &amp; Virtues</span>
          </button>
        </div>
      </section>

      {/* BISMILLAH (for all except Surah 9 At-Tawbah) */}
      {surah.number !== 9 && (
        <div className="bismillahContainer">
          <div className="bismillahArabic" dir="rtl" lang="ar">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>
      )}

      {/* MAIN CONTENT BASED ON VIEW MODE */}
      {viewMode === "translation" && (
        <div className="ayahsContainer">
          {ayahs.map((ayah) => {
            const isCurrent = currentAyah === ayah.ayahNumber && isPlaying;
            const isBookmarked = bookmarkedAyahs.has(ayah.ayahNumber);
            const urdu = urduTranslations[ayah.ayahNumber];
            const english = englishTranslations[ayah.ayahNumber];

            return (
              <article
                key={ayah.ayahNumber}
                id={`ayah-${ayah.ayahNumber}`}
                ref={(el) => {
                  if (el) ayahRefs.current.set(ayah.ayahNumber, el);
                  else ayahRefs.current.delete(ayah.ayahNumber);
                }}
                className={`ayahCard ${isCurrent ? "activeAyah" : ""}`}
              >
                {/* AYAH HEADER BAR */}
                <div className="ayahTopBar">
                  <div className="ayahReference">
                    <div className="ayahNumberBadge">
                      {surah.number}:{ayah.ayahNumber}
                    </div>
                    <span className="ayahMetaTag">
                      Ayah {ayah.ayahNumber}
                    </span>
                    {surah.sajdahAyahs?.includes(ayah.ayahNumber) && (
                      <span className="ayahMetaTag" style={{ color: "#d4af37", fontWeight: 700 }}>
                        ۩ Sajdah
                      </span>
                    )}
                  </div>

                  <div className="ayahActions">
                    <button
                      type="button"
                      className="ayahActionBtn"
                      onClick={() => playAyah(ayah.ayahNumber)}
                      title={isCurrent ? "Pause" : "Play this Ayah"}
                    >
                      {isCurrent ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button
                      type="button"
                      className="ayahActionBtn"
                      onClick={() => copyAyah(ayah)}
                      title="Copy Ayah with Translation"
                    >
                      {copiedAyah === ayah.ayahNumber ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                    </button>

                    <button
                      type="button"
                      className={`ayahActionBtn ${isBookmarked ? "bookmarked" : ""}`}
                      onClick={() => toggleBookmark(ayah.ayahNumber)}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Ayah"}
                    >
                      <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>

                    <button
                      type="button"
                      className="ayahActionBtn"
                      onClick={() => shareAyah(ayah)}
                      title="Share Ayah"
                    >
                      <Share2 size={16} />
                    </button>

                    <button
                      type="button"
                      className="ayahActionBtn"
                      onClick={() => setActiveTafseerAyah(ayah.ayahNumber)}
                      title="Tafseer & Notes"
                    >
                      <BookOpen size={16} />
                    </button>
                  </div>
                </div>

                {/* ARABIC CALLIGRAPHY */}
                <div className="ayahArabicSection">
                  <p
                    className={`ayahArabicText ${
                      arabicFont === "indopak" ? "ayahArabicIndoPak" : "ayahArabicUthmani"
                    }`}
                    style={{ fontSize: `${arabicFontSize}px` }}
                    dir="rtl"
                    lang="ar"
                  >
                    {ayah.arabic}{" "}
                    <span className="ayahEndSymbol">
                      ﴿{toArabicNumerals(ayah.ayahNumber)}﴾
                    </span>
                  </p>
                </div>

                {/* TRANSLATIONS */}
                <div className="ayahTranslationsSection">
                  {showUrdu && urdu && (
                    <div className="translationBox">
                      <div className="translationHeader">
                        <span>کنز الایمان — امام احمد رضا خان</span>
                        <span>اردو ترجمہ</span>
                      </div>
                      <p
                        className="translationUrduText"
                        style={{ fontSize: `${translationFontSize + 3}px` }}
                      >
                        {urdu}
                      </p>
                    </div>
                  )}

                  {showEnglish && english && (
                    <div className="translationBox">
                      <div className="translationHeader">
                        <span>English Translation — Shah Farid-ul-Haq</span>
                        <span>Meaning</span>
                      </div>
                      <p
                        className="translationEnglishText"
                        style={{ fontSize: `${translationFontSize}px` }}
                      >
                        {english}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* MUSHAF CONTINUOUS READING VIEW */}
      {viewMode === "mushaf" && (
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px" }}>
          <div className="mushafReadingSheet">
            {ayahs.map((ayah) => {
              const isCurrent = currentAyah === ayah.ayahNumber && isPlaying;
              return (
                <span
                  key={ayah.ayahNumber}
                  id={`mushaf-ayah-${ayah.ayahNumber}`}
                  className={`mushafFlowingAyah ${
                    arabicFont === "indopak" ? "ayahArabicIndoPak" : "ayahArabicUthmani"
                  } ${isCurrent ? "activeAyah" : ""}`}
                  style={{ fontSize: `${arabicFontSize + 4}px` }}
                  onClick={() => playAyah(ayah.ayahNumber)}
                  title={`Ayah ${ayah.ayahNumber} - Click to recite`}
                >
                  {ayah.arabic}{" "}
                  <span className="mushafAyahBadge">
                    ﴿{toArabicNumerals(ayah.ayahNumber)}﴾
                  </span>{" "}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* HIFZ / MEMORIZATION MODE */}
      {viewMode === "hifz" && (
        <div className="ayahsContainer">
          <div
            style={{
              background: "var(--q-card, #122825)",
              padding: "16px 20px",
              borderRadius: "14px",
              border: "1px solid var(--q-card-border)",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <strong style={{ color: "var(--q-accent, #d4af37)" }}>Hifz &amp; Memorization Mode Active</strong>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--q-translation)" }}>
                Test your memory! Tap or hover any concealed text to reveal it.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                className={`quranIconButton ${hifzConceal === "translation" ? "active" : ""}`}
                onClick={() => setHifzConceal("translation")}
              >
                Conceal Translation
              </button>
              <button
                type="button"
                className={`quranIconButton ${hifzConceal === "arabic" ? "active" : ""}`}
                onClick={() => setHifzConceal("arabic")}
              >
                Blur Arabic
              </button>
            </div>
          </div>

          {ayahs.map((ayah) => {
            const isCurrent = currentAyah === ayah.ayahNumber && isPlaying;
            const urdu = urduTranslations[ayah.ayahNumber];

            return (
              <article
                key={ayah.ayahNumber}
                className={`ayahCard ${isCurrent ? "activeAyah" : ""}`}
              >
                <div className="ayahTopBar">
                  <div className="ayahNumberBadge">{ayah.ayahNumber}</div>
                  <button
                    type="button"
                    className="ayahActionBtn"
                    onClick={() => playAyah(ayah.ayahNumber)}
                  >
                    {isCurrent ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>

                <div className="ayahArabicSection">
                  <p
                    className={`ayahArabicText ${
                      arabicFont === "indopak" ? "ayahArabicIndoPak" : "ayahArabicUthmani"
                    } ${hifzConceal === "arabic" ? "hifzBlurred" : ""}`}
                    style={{ fontSize: `${arabicFontSize}px` }}
                    dir="rtl"
                    lang="ar"
                  >
                    {ayah.arabic}{" "}
                    <span className="ayahEndSymbol">
                      ﴿{toArabicNumerals(ayah.ayahNumber)}﴾
                    </span>
                  </p>
                </div>

                {urdu && (
                  <div
                    className={`translationBox ${
                      hifzConceal === "translation" ? "hifzBlurred" : ""
                    }`}
                  >
                    <div className="translationHeader">Urdu (Kanz-ul-Iman)</div>
                    <p className="translationUrduText">{urdu}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* SURAH FOOTER NAVIGATION */}
      <footer
        style={{
          maxWidth: "1000px",
          margin: "40px auto 20px",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {prevSurah ? (
          <Link
            href={`/quran/${prevSurah.number}`}
            className="quranIconButton"
            style={{ padding: "10px 18px" }}
          >
            <ChevronLeft size={16} />
            <span>Surah {prevSurah.nameEnglish} ({prevSurah.nameArabic})</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/quran"
          className="quranIconButton"
          style={{ padding: "10px 20px", fontWeight: 700 }}
        >
          All 114 Surahs
        </Link>

        {nextSurah ? (
          <Link
            href={`/quran/${nextSurah.number}`}
            className="quranIconButton"
            style={{ padding: "10px 18px" }}
          >
            <span>Surah {nextSurah.nameEnglish} ({nextSurah.nameArabic})</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <div />
        )}
      </footer>

      {/* FLOATING AUDIO CONTROLLER DOCK (Visible when playing or selected) */}
      <div className="quranAudioDock">
        <div className="audioDockContent">
          {/* TRACK INFO */}
          <div className="audioDockInfo">
            <div className="ayahNumberBadge" style={{ width: "32px", height: "32px", fontSize: "12px" }}>
              {currentAyah || 1}
            </div>
            <div>
              <div className="audioDockSurahName">
                Surah {surah.nameEnglish}
              </div>
              <div className="audioDockAyahInfo">
                Ayah {currentAyah || 1} of {surah.ayahCount}
              </div>
            </div>
          </div>

          {/* MAIN PLAYER CONTROLS */}
          <div className="audioDockControls">
            <button
              type="button"
              className="audioDockNavBtn"
              onClick={playPrevAyah}
              title="Previous Ayah"
            >
              <SkipBack size={18} />
            </button>

            <button
              type="button"
              className="audioPlayBtnMain"
              onClick={togglePlayPause}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              type="button"
              className="audioDockNavBtn"
              onClick={playNextAyah}
              title="Next Ayah"
            >
              <SkipForward size={18} />
            </button>

            {/* REPEAT MODE BUTTON */}
            <button
              type="button"
              className={`audioDockNavBtn ${repeatMode !== "none" ? "active" : ""}`}
              onClick={() => {
                const modes: Array<"none" | "1x" | "2x" | "loop"> = ["none", "1x", "2x", "loop"];
                const nextIndex = (modes.indexOf(repeatMode) + 1) % modes.length;
                setRepeatMode(modes[nextIndex]);
                showToast(`Repeat mode: ${modes[nextIndex]}`);
              }}
              title="Ayah Repeat (for Hifz)"
              style={{ color: repeatMode !== "none" ? "var(--q-accent)" : "inherit" }}
            >
              <RotateCcw size={16} />
              <span style={{ fontSize: "10px", marginLeft: "2px", fontWeight: 700 }}>
                {repeatMode === "none" ? "" : repeatMode}
              </span>
            </button>

            {/* PLAYBACK SPEED */}
            <button
              type="button"
              className="audioDockNavBtn"
              onClick={() => {
                const speeds = [0.75, 1, 1.25, 1.5];
                const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                setPlaybackSpeed(next);
                if (audioRef.current) audioRef.current.playbackRate = next;
                showToast(`Playback speed: ${next}x`);
              }}
              title="Recitation Speed"
              style={{ fontSize: "11px", fontWeight: 700, width: "36px" }}
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* RECITER PICKER */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <select
              value={reciter}
              onChange={(e) => {
                const newReciter = e.target.value;
                setReciter(newReciter);
                showToast(`Reciter: ${e.target.options[e.target.selectedIndex].text}`);
                if (isPlaying && currentAyah) {
                  playAyah(currentAyah, newReciter, true);
                }
              }}
              className="audioDockSelect"
              title="Select Qari / Reciter"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PROGRESS SCRUB BAR */}
        <div
          className="audioDockProgressBar"
          onClick={(e) => {
            if (!audioRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            if (audioRef.current.duration) {
              audioRef.current.currentTime = clickPos * audioRef.current.duration;
            }
          }}
        >
          <div
            className="audioDockProgressFill"
            style={{ width: `${audioProgress}%` }}
          />
        </div>
      </div>

      {/* DISPLAY SETTINGS MODAL */}
      {settingsOpen && (
        <div className="quranModalBackdrop" onClick={() => setSettingsOpen(false)}>
          <div className="quranModalWindow" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>
                <Settings size={20} />
                <span>Reading &amp; Audio Settings</span>
              </h3>
              <button
                type="button"
                className="quranIconButton"
                onClick={() => setSettingsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            {/* THEME SELECTOR */}
            <div className="settingGroup">
              <label className="settingLabel">Color Theme</label>
              <div className="themeSelectorGrid">
                <button
                  type="button"
                  className={`themeCardOption ${theme === "emerald" ? "active" : ""}`}
                  onClick={() => handleThemeChange("emerald")}
                >
                  <span className="themeColorCircle" style={{ background: "#0b1a18", borderColor: "#d4af37" }} />
                  <span>Emerald Sanctuary</span>
                </button>

                <button
                  type="button"
                  className={`themeCardOption ${theme === "sepia" ? "active" : ""}`}
                  onClick={() => handleThemeChange("sepia")}
                >
                  <span className="themeColorCircle" style={{ background: "#fcf8ee", borderColor: "#b07228" }} />
                  <span>Sepia Manuscript</span>
                </button>

                <button
                  type="button"
                  className={`themeCardOption ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <span className="themeColorCircle" style={{ background: "#090d12", borderColor: "#38bdf8" }} />
                  <span>Midnight Dark</span>
                </button>

                <button
                  type="button"
                  className={`themeCardOption ${theme === "light" ? "active" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <span className="themeColorCircle" style={{ background: "#ffffff", borderColor: "#0284c7" }} />
                  <span>Pure Light</span>
                </button>
              </div>
            </div>

            {/* SCRIPT FONT SELECTION */}
            <div className="settingGroup">
              <label className="settingLabel">Arabic Script Style</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  type="button"
                  className={`themeCardOption ${arabicFont === "uthmani" ? "active" : ""}`}
                  onClick={() => {
                    setArabicFont("uthmani");
                    try { localStorage.setItem("quran-arabic-font", "uthmani"); } catch {}
                  }}
                >
                  <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "18px" }}>عثماني</span>
                  <span>Uthmani Script</span>
                </button>

                <button
                  type="button"
                  className={`themeCardOption ${arabicFont === "indopak" ? "active" : ""}`}
                  onClick={() => {
                    setArabicFont("indopak");
                    try { localStorage.setItem("quran-arabic-font", "indopak"); } catch {}
                  }}
                >
                  <span style={{ fontFamily: "var(--font-arabic-indopak)", fontSize: "18px" }}>ہند و پاک</span>
                  <span>Indo-Pak Script</span>
                </button>
              </div>
            </div>

            {/* ARABIC FONT SIZE SLIDER */}
            <div className="settingGroup">
              <label className="settingLabel">Arabic Text Size</label>
              <div className="sliderRow">
                <input
                  type="range"
                  min="22"
                  max="52"
                  value={arabicFontSize}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setArabicFontSize(val);
                    try { localStorage.setItem("quran-ar-size", String(val)); } catch {}
                  }}
                  className="sliderInput"
                />
                <span className="sliderValBadge">{arabicFontSize}px</span>
              </div>
            </div>

            {/* TRANSLATION FONT SIZE SLIDER */}
            <div className="settingGroup">
              <label className="settingLabel">Translation Text Size</label>
              <div className="sliderRow">
                <input
                  type="range"
                  min="13"
                  max="24"
                  value={translationFontSize}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTranslationFontSize(val);
                    try { localStorage.setItem("quran-tr-size", String(val)); } catch {}
                  }}
                  className="sliderInput"
                />
                <span className="sliderValBadge">{translationFontSize}px</span>
              </div>
            </div>

            {/* TRANSLATIONS TOGGLE */}
            <div className="settingGroup">
              <label className="settingLabel">Translations Visibility</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px" }}>
                  <input
                    type="checkbox"
                    checked={showUrdu}
                    onChange={(e) => setShowUrdu(e.target.checked)}
                    style={{ accentColor: "var(--q-accent)" }}
                  />
                  <span>Show Urdu Translation (Kanz-ul-Iman — Ala Hazrat)</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px" }}>
                  <input
                    type="checkbox"
                    checked={showEnglish}
                    onChange={(e) => setShowEnglish(e.target.checked)}
                    style={{ accentColor: "var(--q-accent)" }}
                  />
                  <span>Show English Translation (Shah Farid-ul-Haq)</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px" }}>
                  <input
                    type="checkbox"
                    checked={autoScroll}
                    onChange={(e) => setAutoScroll(e.target.checked)}
                    style={{ accentColor: "var(--q-accent)" }}
                  />
                  <span>Auto-scroll to Ayah during recitation</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SURAH INFORMATION MODAL */}
      {infoOpen && (
        <div className="quranModalBackdrop" onClick={() => setInfoOpen(false)}>
          <div className="quranModalWindow" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>
                <Info size={20} />
                <span>About Surah {surah.nameEnglish} ({surah.nameArabic})</span>
              </h3>
              <button
                type="button"
                className="quranIconButton"
                onClick={() => setInfoOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "20px" }}>
              <div style={{ background: "var(--q-bg)", padding: "12px", borderRadius: "10px" }}>
                <small style={{ color: "var(--q-accent)", fontWeight: 700 }}>REVELATION TYPE</small>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>{surah.type} (Order: {surah.revelationOrder})</div>
              </div>
              <div style={{ background: "var(--q-bg)", padding: "12px", borderRadius: "10px" }}>
                <small style={{ color: "var(--q-accent)", fontWeight: 700 }}>TOTAL VERSES</small>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>{surah.ayahCount} Ayahs ({surah.rukus} Rukus)</div>
              </div>
            </div>

            <div className="settingGroup">
              <label className="settingLabel" style={{ color: "var(--q-accent)" }}>SURAH OVERVIEW &amp; THEMES</label>
              <p style={{ lineHeight: 1.7, color: "var(--q-translation)", fontSize: "14px", margin: 0 }}>
                {surah.overview}
              </p>
            </div>

            {surah.virtues && (
              <div className="settingGroup">
                <label className="settingLabel" style={{ color: "var(--q-accent)" }}>VIRTUES &amp; BENEFITS (FAZILAT)</label>
                <p style={{ lineHeight: 1.7, color: "var(--q-translation)", fontSize: "14px", margin: 0 }}>
                  {surah.virtues}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* JUMP TO AYAH MODAL */}
      {jumpOpen && (
        <div className="quranModalBackdrop" onClick={() => setJumpOpen(false)}>
          <div className="quranModalWindow" style={{ maxWidth: "380px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>
                <Compass size={20} />
                <span>Go to Ayah</span>
              </h3>
              <button
                type="button"
                className="quranIconButton"
                onClick={() => setJumpOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleJump}>
              <p style={{ fontSize: "13px", color: "var(--q-translation)", margin: "0 0 10px 0" }}>
                Enter verse number (1 to {surah.ayahCount}):
              </p>
              <div className="jumpInputRow">
                <input
                  type="number"
                  min="1"
                  max={surah.ayahCount}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={`1 - ${surah.ayahCount}`}
                  className="jumpTextInput"
                  autoFocus
                />
                <button type="submit" className="quranIconButton active">
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAFSEER & REFLECTION MODAL */}
      {activeTafseerAyah && (
        <div className="quranModalBackdrop" onClick={() => setActiveTafseerAyah(null)}>
          <div className="quranModalWindow" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>
                <BookOpen size={20} />
                <span>Reflection &amp; Context: Ayah {surah.number}:{activeTafseerAyah}</span>
              </h3>
              <button
                type="button"
                className="quranIconButton"
                onClick={() => setActiveTafseerAyah(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ marginBottom: "16px", padding: "14px", borderRadius: "12px", background: "var(--q-bg)" }}>
              <div style={{ fontSize: "11px", color: "var(--q-accent)", fontWeight: 700, marginBottom: "6px" }}>
                URDU (KANZ-UL-IMAN)
              </div>
              <p className="translationUrduText" style={{ margin: 0 }}>
                {urduTranslations[activeTafseerAyah] || "Translation loading..."}
              </p>
            </div>

            <div style={{ marginBottom: "16px", padding: "14px", borderRadius: "12px", background: "var(--q-bg)" }}>
              <div style={{ fontSize: "11px", color: "var(--q-accent)", fontWeight: 700, marginBottom: "6px" }}>
                ENGLISH
              </div>
              <p className="translationEnglishText" style={{ margin: 0 }}>
                {englishTranslations[activeTafseerAyah] || "Translation loading..."}
              </p>
            </div>

            <div>
              <small style={{ color: "var(--q-accent)", fontWeight: 700 }}>STUDY NOTES &amp; GUIDANCE</small>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--q-translation)", marginTop: "6px" }}>
                Every Ayah of the Holy Qur’an contains profound oceans of wisdom. Contemplate on the divine choice of words, repeat in your heart, and apply its guidance in daily actions and prayers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
