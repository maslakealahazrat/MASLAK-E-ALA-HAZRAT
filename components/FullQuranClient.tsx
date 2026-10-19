"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Settings,
  BookOpen,
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark,
  Volume2,
  Share2,
  Check,
  Layers,
  ArrowRight,
  Copy
} from "lucide-react";
import { quranAyahs } from "@/data/quran/ayahs";
import { ALL_SURAHS, JUZ_LIST, type SurahMeta, type JuzMeta } from "@/data/quran/surahs-meta";
import {
  getStoredSiteTheme,
  listenForSiteThemeChanges,
  setSiteTheme,
  type SiteTheme,
} from "@/components/theme-system";
import "@/app/quran/quran-app.css";

const PROGRESS_KEY = "maslak-quran-progress";

function pad3(num: number): string {
  return String(num).padStart(3, "0");
}

function toArabicNumerals(num: number): string {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).split("").map((d) => digits[parseInt(d, 10)]).join("");
}

const RECITERS = [
  { id: "Alafasy_128kbps", name: "Mishary Rashid Alafasy", label: "Mishary Alafasy (العفاسي)" },
  { id: "Abdul_Basit_Murattal_192kbps", name: "Abdul Basit (Murattal)", label: "Abdul Basit Murattal (مرتل)" },
  { id: "Husary_128kbps", name: "Mahmoud Khalil Al-Husary", label: "Mahmoud Al-Husary (الحصري)" },
  { id: "Abu_Bakr_Ash-Shaatree_128kbps", name: "Abu Bakr Al-Shatri", label: "Abu Bakr Al-Shatri (الشاطري)" },
];

export default function FullQuranClient() {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedJuz, setSelectedJuz] = useState<number>(1);
  const [readingMode, setReadingMode] = useState<"surah" | "juz" | null>(null);
  const [viewMode, setViewMode] = useState<"translation" | "mushaf">("translation");
  // Keep the first client render theme-neutral: app/layout.tsx applies the saved theme
  // to <html> before hydration, so an Emerald child class here would override it briefly.
  const [theme, setTheme] = useState<SiteTheme | null>(null);

  // Typography
  const [arabicFontSize, setArabicFontSize] = useState<number>(32);
  const [translationFontSize, setTranslationFontSize] = useState<number>(16);
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [surahDrawerOpen, setSurahDrawerOpen] = useState<boolean>(false);
  const [juzDrawerOpen, setJuzDrawerOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Audio state
  const [reciter, setReciter] = useState<string>("Alafasy_128kbps");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [repeatMode, setRepeatMode] = useState<"none" | "1x" | "loop">("none");

  // Translations
  const [urduTranslations, setUrduTranslations] = useState<Record<number, string>>({});
  const [englishTranslations, setEnglishTranslations] = useState<Record<number, string>>({});
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(false);

  // Toast & Copy
  const [toastMessage, setToastMessage] = useState<string>("");
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Map<number, HTMLElement>>(new Map());

  const currentSurahMeta = useMemo(() => {
    return ALL_SURAHS.find((s) => s.number === selectedSurah) || ALL_SURAHS[0];
  }, [selectedSurah]);

  const currentSurahAyahs = useMemo(() => {
    return quranAyahs.filter((a) => a.surahNumber === selectedSurah);
  }, [selectedSurah]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  // Fetch Kanz-ul-Iman and English translations for selected surah
  useEffect(() => {
    let isCancelled = false;
    setLoadingTranslations(true);

    fetch(`/api/quran/translation?surah=${selectedSurah}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.urdu) {
          setUrduTranslations(data.urdu);
          setEnglishTranslations(data.english || {});
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!isCancelled) setLoadingTranslations(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedSurah]);

  // Load preferences
  useEffect(() => {
    try {
      const savedTheme = getStoredSiteTheme();
       setTheme(savedTheme);
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        const p = JSON.parse(savedProgress);
        if (p.surahNumber) setSelectedSurah(p.surahNumber);
      }
    } catch {}
  }, []);

// Sync theme changes across the entire website
  useEffect(() => {
    const syncTheme = (nextTheme: SiteTheme) => {
      setTheme(nextTheme);
    };

    setTheme(getStoredSiteTheme());

    return listenForSiteThemeChanges(syncTheme);
  }, []);
  
  // Save Progress
  const saveProgress = (surahNum: number, ayahNum: number) => {
    try {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ surahNumber: surahNum, ayahNumber: ayahNum })
      );
      localStorage.setItem(
        "maslak-reading-progress",
        JSON.stringify({
          type: "quran",
          title: "Qur’an Majeed",
          subtitle: `Surah ${currentSurahMeta.nameEnglish} (${surahNum}:${ayahNum})`,
          url: `/quran/full#ayah-${surahNum}-${ayahNum}`,
        })
      );
      showToast(`Progress saved: Surah ${currentSurahMeta.nameEnglish} Ayah ${ayahNum}`);
    } catch {}
  };

  // Audio Playback
  const getAudioUrl = (ayahNum: number, rec: string = reciter) => {
    return `https://everyayah.com/data/${rec}/${pad3(selectedSurah)}${pad3(ayahNum)}.mp3`;
  };

  const playAyah = (ayahNum: number, recOverride?: string, forcePlay: boolean = false) => {
    if (!audioRef.current) return;
    const activeRec = recOverride || reciter;

    if (!forcePlay && !recOverride && currentAyah === ayahNum && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentAyah(ayahNum);
    saveProgress(selectedSurah, ayahNum);

    audioRef.current.pause();
    audioRef.current.src = getAudioUrl(ayahNum, activeRec);
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        const el = ayahRefs.current.get(ayahNum);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      })
      .catch((err) => {
        console.warn("Audio play error, retrying fallback:", err);
        if (activeRec !== "Alafasy_128kbps") {
          audioRef.current!.src = getAudioUrl(ayahNum, "Alafasy_128kbps");
          audioRef.current!.load();
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
    if (next <= currentSurahMeta.ayahCount) {
      playAyah(next);
    } else {
      setIsPlaying(false);
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
    if (repeatMode === "1x") {
      playAyah(currentAyah);
      return;
    }
    if (repeatMode === "loop") {
      playAyah(currentAyah);
      return;
    }
    playNextAyah();
  };

  const copyAyah = async (ayahNum: number, arabic: string) => {
    const uText = urduTranslations[ayahNum] || "";
    const eText = englishTranslations[ayahNum] || "";
    let t = `${arabic}\n\nUrdu (Kanz-ul-Iman):\n${uText}\n\nEnglish:\n"${eText}"\n\n— [Surah ${currentSurahMeta.nameEnglish} ${selectedSurah}:${ayahNum}]`;
    try {
      await navigator.clipboard.writeText(t);
      setCopiedAyah(ayahNum);
      showToast("Ayah & Kanz-ul-Iman translation copied!");
      setTimeout(() => setCopiedAyah(null), 2000);
    } catch {}
  };

  // Jump to Surah / Juz
  const handleSelectSurah = (num: number) => {
    setSelectedSurah(num);
    setCurrentAyah(1);
    setSurahDrawerOpen(false);
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectJuz = (juzNum: number) => {
    setSelectedJuz(juzNum);
    const j = JUZ_LIST.find((item) => item.juzNumber === juzNum);
    if (j) {
      setSelectedSurah(j.startSurah);
      setCurrentAyah(j.startAyah);
    }
    setJuzDrawerOpen(false);
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Ask the reader how they want to navigate before opening the reading interface.
  if (!readingMode) {
    return (
      <div className={`quranContainer${theme ? ` quran-theme-${theme}` : ""}`}>
        <main className="quranAyahsContainer" style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(20px, 5vw, 48px) 16px" }}>
          <div className="surahHeroBanner" style={{ textAlign: "center" }}>
            <div className="surahArabicTitleHero" dir="rtl" lang="ar">القرآن الكريم</div>
            <h1 className="surahEnglishTitleHero">Read the Full Qur’an</h1>
            <p className="surahMeaningHero">Choose your preferred reading method to begin.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 16, marginTop: 22 }}>
            <button
              type="button"
              onClick={() => { setReadingMode("surah"); setSelectedSurah(1); setCurrentAyah(1); }}
              style={{ textAlign: "left", padding: 22, borderRadius: 16, border: "1px solid var(--q-card-border)", background: "var(--q-card)", color: "var(--q-text)", cursor: "pointer" }}
            >
              <BookOpen size={26} style={{ marginBottom: 12, color: "var(--q-accent)" }} />
              <strong style={{ display: "block", fontSize: 19, marginBottom: 8 }}>Surah-by-Surah</strong>
              <span style={{ display: "block", opacity: .8, lineHeight: 1.6 }}>Start from a Surah and navigate through the Qur’an in Surah order.</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontWeight: 700 }}>Start reading <ArrowRight size={16} /></span>
            </button>
            <button
              type="button"
              onClick={() => { setReadingMode("juz"); setSelectedJuz(1); setSelectedSurah(1); setCurrentAyah(1); }}
              style={{ textAlign: "left", padding: 22, borderRadius: 16, border: "1px solid var(--q-card-border)", background: "var(--q-card)", color: "var(--q-text)", cursor: "pointer" }}
            >
              <Layers size={26} style={{ marginBottom: 12, color: "var(--q-accent)" }} />
              <strong style={{ display: "block", fontSize: 19, marginBottom: 8 }}>Para-by-Para (Juz)</strong>
              <span style={{ display: "block", opacity: .8, lineHeight: 1.6 }}>Choose any of the 30 Paras and begin at its correct starting ayah.</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontWeight: 700 }}>Choose a Para <ArrowRight size={16} /></span>
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <Link href="/" className="quranIconButton" style={{ display: "inline-flex" }}><ChevronLeft size={16} /> Home</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`quranContainer${theme ? ` quran-theme-${theme}` : ""}`}>
      <audio ref={audioRef} onEnded={handleAudioEnded} />

      {/* TOP FLOATING NAVIGATION BAR */}
      <nav className="quranTopNav">
        <div className="quranTopNavInner">
          <div className="quranNavLeft">
            <Link href="/" className="quranIconButton" title="Return to Home">
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Mode-specific navigation picker */}
            {readingMode === "surah" ? (
              <button type="button" className="quranSurahPickerBtn" onClick={() => setSurahDrawerOpen(true)} title="Select Surah">
                <BookOpen size={16} />
                <span>{selectedSurah}. {currentSurahMeta.nameEnglish}</span>
                <span className="pickerArabic">{currentSurahMeta.nameArabic}</span>
              </button>
            ) : (
              <button type="button" className="quranSurahPickerBtn" onClick={() => setJuzDrawerOpen(true)} title="Select Para (Juz)">
                <Layers size={15} />
                <span>Para {selectedJuz}</span>
              </button>
            )}
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
              Mushaf
            </button>
          </div>

          <div className="quranNavRight">
            {/* SETTINGS TOGGLE */}
            <button
              type="button"
              className="quranIconButton"
              onClick={() => setSettingsOpen(true)}
              title="Display & Audio Settings"
            >
              <Settings size={16} />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* TOAST NOTIFICATION */}
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
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* SURAH HERO BANNER */}
      <header className="surahHeroBanner">
        <div className="surahArabicTitleHero" dir="rtl" lang="ar">
          سورة {currentSurahMeta.nameArabic}
        </div>

        <h1 className="surahEnglishTitleHero">
          {selectedSurah}. Surah {currentSurahMeta.nameEnglish}
        </h1>

        <p className="surahMeaningHero">
          {currentSurahMeta.meaningEnglish} &bull; {currentSurahMeta.nameUrdu}
        </p>

        <div className="surahBadgesHero">
          <span className="surahBadgeItem">{currentSurahMeta.type}</span>
          <span className="surahBadgeItem">{currentSurahMeta.ayahCount} Ayahs</span>
          <span className="surahBadgeItem">{currentSurahMeta.rukus} Rukus</span>
          <span className="surahBadgeItem">Juz {currentSurahMeta.juzStart}</span>
          <span className="surahBadgeItem">Revelation #{currentSurahMeta.revelationOrder}</span>
        </div>

        {/* QUICK AUDIO BAR */}
        <div className="surahQuickActions">
          <button
            type="button"
            className="quranIconButton active"
            onClick={togglePlayPause}
            style={{ padding: "8px 20px" }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? "Pause Recitation" : "Listen to Reciter"}</span>
          </button>

          {/* RECITER CHANGER QUICK DROPDOWN */}
          <select
            value={reciter}
            onChange={(e) => {
              const newRec = e.target.value;
              setReciter(newRec);
              showToast(`Reciter: ${e.target.options[e.target.selectedIndex].text}`);
              if (isPlaying && currentAyah) {
                playAyah(currentAyah, newRec, true);
              }
            }}
            className="audioDockSelect"
            style={{ padding: "8px 12px", background: "var(--q-card)" }}
            title="Choose Qari"
          >
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* BISMILLAH BANNER (Except Surah At-Tawbah 9) */}
      {selectedSurah !== 9 && (
        <div className="bismillahCard" dir="rtl" lang="ar">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
      )}

      {/* MAIN AYAH CONTAINER */}
      <main className="quranAyahsContainer">
        {/* VIEW 1: TRANSLATION READING MODE */}
        {viewMode === "translation" && (
          <div className="ayahsList">
            {currentSurahAyahs.map((ayah) => {
              const isCurrent = currentAyah === ayah.ayahNumber;
              const uTrans = urduTranslations[ayah.ayahNumber];
              const eTrans = englishTranslations[ayah.ayahNumber];

              return (
                <article
                  key={ayah.ayahNumber}
                  id={`ayah-${selectedSurah}-${ayah.ayahNumber}`}
                  ref={(el) => {
                    if (el) ayahRefs.current.set(ayah.ayahNumber, el);
                  }}
                  className={`ayahCard ${isCurrent ? "ayahActive" : ""}`}
                >
                  <div className="ayahHeaderRow">
                    <div className="ayahNumberBadge">
                      {selectedSurah}:{ayah.ayahNumber}
                    </div>

                    <div className="ayahActionsBar">
                      <button
                        type="button"
                        className="ayahActionBtn"
                        onClick={() => playAyah(ayah.ayahNumber)}
                        title="Listen to this Ayah"
                      >
                        {isCurrent && isPlaying ? <Pause size={14} color="var(--q-accent)" /> : <Play size={14} />}
                        <span>{isCurrent && isPlaying ? "Pause" : "Play"}</span>
                      </button>

                      <button
                        type="button"
                        className="ayahActionBtn"
                        onClick={() => copyAyah(ayah.ayahNumber, ayah.arabic)}
                        title="Copy Ayah with Kanz-ul-Iman"
                      >
                        {copiedAyah === ayah.ayahNumber ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedAyah === ayah.ayahNumber ? "Copied" : "Copy"}</span>
                      </button>

                      <button
                        type="button"
                        className="ayahActionBtn"
                        onClick={() => saveProgress(selectedSurah, ayah.ayahNumber)}
                        title="Mark as Current Reading Progress"
                      >
                        <Bookmark size={14} />
                        <span>Bookmark</span>
                      </button>
                    </div>
                  </div>

                  {/* ARABIC TEXT */}
                  <p
                    className="ayahArabicText font-uthmani"
                    style={{ fontSize: `${arabicFontSize}px` }}
                    dir="rtl"
                    lang="ar"
                  >
                    {ayah.arabic}
                    <span className="inlineAyahEndSymbol">
                      ۝{toArabicNumerals(ayah.ayahNumber)}
                    </span>
                  </p>

                  {/* URDU TRANSLATION — KANZ UL IMAN */}
                  {showUrdu && (
                    <div className="translationBox urduBox">
                      <div className="translationAuthorLabel">
                        كنز الایمان فی ترجمۃ القرآن — امام احمد رضا خان فاضل بریلوی
                      </div>
                      <p
                        className="translationText urduText"
                        style={{ fontSize: `${translationFontSize + 2}px` }}
                        dir="rtl"
                      >
                        {uTrans || (loadingTranslations ? "Loading Kanz-ul-Iman..." : "اور اللہ کے نام سے شروع...")}
                      </p>
                    </div>
                  )}

                  {/* ENGLISH TRANSLATION */}
                  {showEnglish && (
                    <div className="translationBox englishBox">
                      <div className="translationAuthorLabel">
                        English Translation (Ala Hazrat / Prof. Farid-ul-Haque)
                      </div>
                      <p
                        className="translationText englishText"
                        style={{ fontSize: `${translationFontSize}px` }}
                      >
                        {eTrans || (loadingTranslations ? "Loading translation..." : "In the name of Allah, the Most Gracious, the Most Merciful.")}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* VIEW 2: CONTINUOUS MUSHAF READING MODE */}
        {viewMode === "mushaf" && (
          <div className="mushafContainer">
            <div className="mushafFrame">
              <div className="mushafPageContent font-uthmani" style={{ fontSize: `${arabicFontSize + 4}px` }} dir="rtl" lang="ar">
                {currentSurahAyahs.map((ayah) => {
                  const isCurrent = currentAyah === ayah.ayahNumber;
                  return (
                    <span
                      key={ayah.ayahNumber}
                      onClick={() => playAyah(ayah.ayahNumber)}
                      className={`mushafAyahWord ${isCurrent ? "mushafWordActive" : ""}`}
                      title={`Ayah ${ayah.ayahNumber} — Click to listen`}
                    >
                      {ayah.arabic}{" "}
                      <span className="inlineAyahEndSymbol">
                        ۝{toArabicNumerals(ayah.ayahNumber)}
                      </span>{" "}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SURAH FOOTER PAGINATION */}
      <footer className="surahFooterNav">
        {selectedSurah > 1 ? (
          <button
            type="button"
            className="quranIconButton"
            onClick={() => handleSelectSurah(selectedSurah - 1)}
            style={{ padding: "10px 18px" }}
          >
            <ChevronLeft size={16} />
            <span>Previous Surah ({selectedSurah - 1})</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          className="quranIconButton"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top ↑
        </button>

        {selectedSurah < 114 ? (
          <button
            type="button"
            className="quranIconButton"
            onClick={() => handleSelectSurah(selectedSurah + 1)}
            style={{ padding: "10px 18px" }}
          >
            <span>Next Surah ({selectedSurah + 1})</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <div />
        )}
      </footer>

      {/* FLOATING BOTTOM AUDIO DOCK */}
      <div className="quranAudioDock">
        <div className="audioDockContent">
          {/* TRACK INFO */}
          <div className="audioDockInfo">
            <div className="ayahNumberBadge" style={{ width: "32px", height: "32px", fontSize: "12px" }}>
              {currentAyah || 1}
            </div>
            <div>
              <div className="audioDockSurahName">
                Surah {currentSurahMeta.nameEnglish} ({currentSurahMeta.nameArabic})
              </div>
              <div className="audioDockAyahInfo">
                Ayah {currentAyah || 1} of {currentSurahMeta.ayahCount}
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

            {/* REPEAT BUTTON */}
            <button
              type="button"
              className={`audioDockNavBtn ${repeatMode !== "none" ? "active" : ""}`}
              onClick={() => {
                const modes: Array<"none" | "1x" | "loop"> = ["none", "1x", "loop"];
                const next = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
                setRepeatMode(next);
                showToast(`Repeat mode: ${next}`);
              }}
              title="Repeat Ayah for memorization"
            >
              <RotateCcw size={15} />
              <span style={{ fontSize: "10px", marginLeft: "2px", fontWeight: 700 }}>
                {repeatMode === "none" ? "" : repeatMode}
              </span>
            </button>
          </div>

          {/* RECITER PICKER IN AUDIO DOCK */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <select
              value={reciter}
              onChange={(e) => {
                const newRec = e.target.value;
                setReciter(newRec);
                showToast(`Reciter: ${e.target.options[e.target.selectedIndex].text}`);
                if (isPlaying && currentAyah) {
                  playAyah(currentAyah, newRec, true);
                }
              }}
              className="audioDockSelect"
              title="Select Qari"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SURAH DRAWER MODAL */}
      {surahDrawerOpen && (
        <div className="quranModalBackdrop" onClick={() => setSurahDrawerOpen(false)}>
          <div className="quranModalContent" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="quranModalHeader">
              <h3>Select Surah (114 Surahs)</h3>
              <button type="button" className="quranIconButton" onClick={() => setSurahDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "0 16px 14px" }}>
              <input
                type="text"
                placeholder="Search Surah by name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--q-card-border)",
                  background: "var(--q-bg)",
                  color: "var(--q-text)",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "0 16px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {ALL_SURAHS.filter(
                  (s) =>
                    !searchQuery ||
                    String(s.number).includes(searchQuery) ||
                    s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.nameArabic.includes(searchQuery) ||
                    s.nameUrdu.includes(searchQuery)
                ).map((s) => (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => handleSelectSurah(s.number)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: s.number === selectedSurah ? "var(--q-accent)" : "var(--q-card)",
                      color: s.number === selectedSurah ? "#071311" : "var(--q-text)",
                      border: "1px solid var(--q-card-border)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "13px" }}>{s.number}. {s.nameEnglish}</strong>
                      <div style={{ fontSize: "11px", opacity: 0.8 }}>{s.ayahCount} Ayahs</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "16px" }} dir="rtl" lang="ar">
                      {s.nameArabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JUZ (PARA) DRAWER MODAL */}
      {juzDrawerOpen && (
        <div className="quranModalBackdrop" onClick={() => setJuzDrawerOpen(false)}>
          <div className="quranModalContent" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="quranModalHeader">
              <h3>Select 30 Juz (Paras)</h3>
              <button type="button" className="quranIconButton" onClick={() => setJuzDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "0 16px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {JUZ_LIST.map((j) => (
                  <button
                    key={j.juzNumber}
                    type="button"
                    onClick={() => handleSelectJuz(j.juzNumber)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: j.juzNumber === selectedJuz ? "var(--q-accent)" : "var(--q-card)",
                      color: j.juzNumber === selectedJuz ? "#071311" : "var(--q-text)",
                      border: "1px solid var(--q-card-border)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "13px" }}>Juz {j.juzNumber}</strong>
                      <div style={{ fontSize: "11px", opacity: 0.8 }}>{j.nameEnglish}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-arabic-uthmani)", fontSize: "18px" }} dir="rtl" lang="ar">
                      {j.nameArabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS DRAWER MODAL */}
      {settingsOpen && (
        <div className="quranModalBackdrop" onClick={() => setSettingsOpen(false)}>
          <div className="quranModalContent" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div className="quranModalHeader">
              <h3>Reading &amp; Audio Settings</h3>
              <button type="button" className="quranIconButton" onClick={() => setSettingsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* THEME PICKER */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--q-accent)", display: "block", marginBottom: "8px" }}>
                  BACKGROUND THEME
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {(["emerald", "sepia", "dark", "light"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSiteTheme(t)}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: theme === t ? "2px solid var(--q-accent)" : "1px solid var(--q-card-border)",
                        background: t === "emerald" ? "#0b1a18" : t === "sepia" ? "#2a241c" : t === "dark" ? "#111" : "#f5f9f8",
                        color: t === "light" ? "#111" : "#fff",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "capitalize",
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* ARABIC FONT SIZE SLIDER */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                  <span>ARABIC FONT SIZE</span>
                  <span style={{ color: "var(--q-accent)" }}>{arabicFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="48"
                  value={arabicFontSize}
                  onChange={(e) => setArabicFontSize(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--q-accent)" }}
                />
              </div>

              {/* TRANSLATION FONT SIZE SLIDER */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                  <span>TRANSLATION FONT SIZE</span>
                  <span style={{ color: "var(--q-accent)" }}>{translationFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="13"
                  max="24"
                  value={translationFontSize}
                  onChange={(e) => setTranslationFontSize(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--q-accent)" }}
                />
              </div>

              {/* TRANSLATION VISIBILITY TOGGLES */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--q-accent)", display: "block", marginBottom: "8px" }}>
                  TRANSLATIONS
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={showUrdu}
                      onChange={(e) => setShowUrdu(e.target.checked)}
                      style={{ accentColor: "var(--q-accent)" }}
                    />
                    <span>Urdu (Kanz-ul-Iman — Ala Hazrat)</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={showEnglish}
                      onChange={(e) => setShowEnglish(e.target.checked)}
                      style={{ accentColor: "var(--q-accent)" }}
                    />
                    <span>English (Farid-ul-Haque / Ala Hazrat)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
