"use client";

import "./cssfile/home.css";
import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Play,
  Pause,
  ArrowRight,
  Calendar,
  Volume2,
  X,
  Menu,
  Sun,
  Moon,
  Clock,
} from "lucide-react";
import { ALL_SURAHS } from "@/data/quran/surahs-meta";
import {
  getStoredSiteTheme,
  listenForSiteThemeChanges,
  setSiteTheme,
  type SiteTheme,
} from "@/components/theme-system";

const POPULAR_SURAHS = [
  { number: 36, name: "Ya-Seen", arabic: "يس", title: "Heart of Qur’an", desc: "Forgiveness & peace" },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", title: "The Beneficent", desc: "Beauty & gratitude" },
  { number: 67, name: "Al-Mulk", arabic: "الملك", title: "Sovereignty", desc: "Protection in the grave" },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", title: "The Cave", desc: "Friday illumination" },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", title: "The Inevitable", desc: "Barakah in sustenance" },
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", title: "The Opening", desc: "The Mother of Qur’an" },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", title: "The Cow", desc: "Ayat al-Kursi" },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", title: "Purity of Faith", desc: "1/3 of the Qur’an" },
];

const FOUR_TOP_QARIS = [
  {
    id: "Alafasy_128kbps",
    name: "Mishary Rashid Alafasy",
    arabic: "الشيخ مشاري راشد العفاسي",
    style: "Heartfelt, Melodious & Clear",
    origin: "Kuwait",
    initial: "M",
  },
  {
    id: "Abdul_Basit_Murattal_192kbps",
    name: "Qari Abdul Basit Abdul Samad",
    arabic: "القارئ عبد الباسط عبد الصمد",
    style: "Legendary Classical Egyptian Murattal",
    origin: "Egypt",
    initial: "A",
  },
  {
    id: "Husary_128kbps",
    name: "Sheikh Mahmoud Khalil Al-Husary",
    arabic: "الشيخ محمود خليل الحصري",
    style: "The Golden Standard of Tajweed Precision",
    origin: "Al-Azhar, Egypt",
    initial: "H",
  },
  {
    id: "Abu_Bakr_Ash-Shaatree_128kbps",
    name: "Sheikh Abu Bakr Al-Shatri",
    arabic: "الشيخ أبو بكر الشاطري",
    style: "Deep, Resonant & Soulful Recitation",
    origin: "Jeddah, Saudi Arabia",
    initial: "S",
  },
];

const BLESSED_AYAH_TRACKS = [
  {
    id: "ayatul-kursi",
    title: "Ayat al-Kursi (The Throne Verse)",
    surahNumber: 2,
    ayahNumber: 255,
    arabic:
      "اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    urdu:
      "اللہ ہے جس کے سوا کسی کی بندگی نہیں وہ آپ زندہ اوروں کا قائم رکھنے والا، اسے نہ اونگھ آئے نہ نیند۔ (کنز الایمان)",
    english:
      "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.",
  },
  {
    id: "fatihah",
    title: "Surah Al-Fatihah (Ayah 1-2)",
    surahNumber: 1,
    ayahNumber: 1,
    arabic:
      "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    urdu:
      "اللہ کے نام سے شروع جو نہایت مہربان رحمت والا، سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ (کنز الایمان)",
    english:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.",
  },
  {
    id: "rahman",
    title: "Surah Ar-Rahman (Ayah 1-4)",
    surahNumber: 55,
    ayahNumber: 1,
    arabic:
      "الرَّحْمَٰنُ ۝ عَلَّمَ الْقُرْآنَ ۝ خَلَقَ الْإِنسَانَ ۝ عَلَّمَهُ الْبَيَانَ",
    urdu:
      "رحمان نے قرآن سکھایا، انسان کو پیدا کیا، اسے بولنا سکھایا۔ (کنز الایمان)",
    english:
      "The Most Merciful, taught the Qur’an, created man, and taught him articulate speech.",
  },
  {
    id: "ikhlas",
    title: "Surah Al-Ikhlas (Ayah 1-4)",
    surahNumber: 112,
    ayahNumber: 1,
    arabic:
      "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ",
    urdu:
      "تم فرماؤ: وہ اللہ ہے ایک، اللہ بے نیاز ہے، نہ اس کی کوئی اولاد اور نہ وہ کسی سے پیدا ہوا۔ (کنز الایمان)",
    english:
      "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born.'",
  },
];

function pad3(num: number): string {
  return String(num).padStart(3, "0");
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastRead, setLastRead] = useState<{
    surahNumber: number;
    title: string;
  } | null>(null);

  const [selectedQari, setSelectedQari] =
    useState<string>("Alafasy_128kbps");
  const [selectedAyahIndex, setSelectedAyahIndex] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string>("");
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

const [isDark, setIsDark] = useState(true);

useEffect(() => {
  const syncTheme = (theme: SiteTheme) => {
    setIsDark(theme === "emerald" || theme === "dark");
  };

  // Restore the shared theme when the homepage opens.
  syncTheme(getStoredSiteTheme());

  // Keep the homepage in sync when another connected
  // page or component changes the theme.
  const unsubscribe = listenForSiteThemeChanges(syncTheme);

  // Restore the existing reading progress.
  try {
    const savedProgress = localStorage.getItem(
      "maslak-reading-progress"
    );

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);

      if (progress.url) {
        const match = progress.url.match(/\/quran\/(\d+)/);

        if (match) {
          setLastRead({
            surahNumber: Number(match[1]),
            title: progress.subtitle || `Surah ${match[1]}`,
          });
        }
      }
    }
  } catch (error) {
    console.warn(
      "Unable to restore saved reading progress:",
      error
    );
  }

  return unsubscribe;
}, []);

const toggleTheme = () => {
  const nextTheme: SiteTheme = isDark ? "light" : "dark";

  setIsDark(nextTheme === "dark");

  setSiteTheme(nextTheme);
};

  const activeTrack =
    BLESSED_AYAH_TRACKS[selectedAyahIndex] || BLESSED_AYAH_TRACKS[0];

  const activeQariObj =
    FOUR_TOP_QARIS.find((q) => q.id === selectedQari) ||
    FOUR_TOP_QARIS[0];

  const getTrackUrl = (
    reciterId: string,
    surahNum: number,
    ayahNum: number
  ) => {
    return `https://everyayah.com/data/${reciterId}/${pad3(
      surahNum
    )}${pad3(ayahNum)}.mp3`;
  };

  const handleToggleQariAudio = (
    overrideQari?: string,
    overrideIndex?: number
  ) => {
    const audio = audioPlayerRef.current;
    if (!audio) return;

    const targetQari = overrideQari || selectedQari;
    const targetIdx =
      overrideIndex !== undefined ? overrideIndex : selectedAyahIndex;
    const track = BLESSED_AYAH_TRACKS[targetIdx];

    if (!track) {
      setAudioError("Please select a valid recitation passage.");
      return;
    }

    if (
      !overrideQari &&
      overrideIndex === undefined &&
      isAudioPlaying
    ) {
      audio.pause();
      setIsAudioPlaying(false);
      return;
    }

    setAudioError("");

    const playAudio = (url: string) => {
      audio.src = url;
      audio.load();

      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          setAudioError("");
        })
        .catch((error: unknown) => {
          console.warn("Audio playback failed:", error);

          if (targetQari !== "Alafasy_128kbps") {
            audio.src = getTrackUrl(
              "Alafasy_128kbps",
              track.surahNumber,
              track.ayahNumber
            );
            audio.load();

            audio
              .play()
              .then(() => {
                setIsAudioPlaying(true);
                setAudioError("");
              })
              .catch(() => {
                setIsAudioPlaying(false);
                setAudioError(
                  "Unable to play audio. Please check your internet connection and try again."
                );
              });
          } else {
            setIsAudioPlaying(false);
            setAudioError(
              "Unable to play audio. Please check your internet connection and try again."
            );
          }
        });
    };

    playAudio(
      getTrackUrl(targetQari, track.surahNumber, track.ayahNumber)
    );
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return ALL_SURAHS.filter((surah) => {
      return (
        String(surah.number) === q ||
        surah.nameEnglish.toLowerCase().includes(q) ||
        surah.nameArabic.includes(q) ||
        surah.nameUrdu.includes(q) ||
        surah.meaningEnglish.toLowerCase().includes(q)
      );
    }).slice(0, 8);
  }, [searchQuery]);

  return (
    <main className="site">
      <audio
        ref={audioPlayerRef}
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={() => setIsAudioPlaying(false)}
        onError={() => {
          if (audioPlayerRef.current?.src) {
            setIsAudioPlaying(false);
          }
        }}
      />

      {/* TOP HIJRI DATE & BISMILLAH TICKER */}
      <div className="headerTopTicker">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>🗓️</span>
          <strong style={{ color: "var(--home-gold)" }}>
            ۲۵ صفر الخیر ۱۴۴۸ھ
          </strong>
          <span>&bull;</span>
          <span>Maslak-e-Ahle Sunnat Wal Jama&apos;at</span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-arabic-uthmani)",
            color: "var(--home-gold)",
            fontSize: "14px",
            direction: "rtl",
          }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
      </div>

      {/* ROYAL HEADER NAVIGATION */}
      <header className="siteHeader">
        <div className="headerInner">
          <Link href="/" className="brandWrap">
            <div className="brandLogoCircle">م</div>

            <div className="brandTexts">
              <span className="brandTitle">Maslak-e-Ala Hazrat</span>
              <span className="brandArabicSubtitle">
                مَسْلَكُ أَهْلِ السُّنَّةِ وَالْجَمَاعَة
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="desktopNavLinks">
            <Link href="/quran" className="desktopNavLink highlight">
              <BookOpen size={15} />
              <span>Qur’an Majeed</span>
            </Link>

            <Link href="/kanz-ul-iman" className="desktopNavLink">
              <span>Kanz-ul-Iman</span>
            </Link>

            <Link href="/fatawa-razawiyya" className="desktopNavLink">
              <span>Fatawa Razawiyya</span>
            </Link>

            <Link href="/hadaiq-e-bakhshish" className="desktopNavLink">
              <span>Hadaiq-e-Bakhshish</span>
            </Link>

            <Link href="/hadith" className="desktopNavLink">
              <span>Al-Hadith</span>
            </Link>

            <Link href="/islamic-calendar" className="desktopNavLink">
              <span>Islamic Calendar</span>
            </Link>

            <Link href="/ilm-ka-safar" className="desktopNavLink">
              <span>Ilm Ka Safar</span>
            </Link>

            <Link href="/ala-hazrat" className="desktopNavLink">
              <span>Ala Hazrat</span>
            </Link>
          </nav>

          {/* HEADER ACTIONS */}
          <div className="headerActionsGroup">
            {isAudioPlaying && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "var(--home-gold-soft)",
                  border: "1px solid var(--home-gold)",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  color: "var(--home-gold)",
                  fontWeight: 700,
                }}
              >
                <div className="qariWaveform">
                  <div className="qariWaveBar" />
                  <div className="qariWaveBar" />
                  <div className="qariWaveBar" />
                </div>
                <span>Playing</span>
              </div>
            )}

            <button
              type="button"
              className="headerIconBtn"
              onClick={toggleTheme}
              title="Toggle Light / Dark Mode"
              aria-label="Toggle light or dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              className="headerIconBtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Open Navigation Menu"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "var(--home-surface)",
              borderBottom: "1px solid var(--home-border)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <Link
              href="/quran"
              className="desktopNavLink highlight"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                justifyContent: "center",
                padding: "14px",
              }}
            >
              <BookOpen size={18} />
              <strong>
                Qur’an Majeed (114 Surahs, Full Mushaf &amp; Audio)
              </strong>
            </Link>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <Link
                href="/kanz-ul-iman"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Kanz-ul-Iman
              </Link>

              <Link
                href="/fatawa-razawiyya"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Fatawa Razawiyya
              </Link>

              <Link
                href="/hadaiq-e-bakhshish"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Hadaiq-e-Bakhshish
              </Link>

              <Link
                href="/hadith"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Al-Hadith Gateway
              </Link>

              <Link
                href="/islamic-calendar"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Islamic Calendar
              </Link>

              <Link
                href="/ilm-ka-safar"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Ilm Ka Safar (30 Days)
              </Link>

              <Link
                href="/seerat-un-nabi"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Seerat-un-Nabi ﷺ
              </Link>

              <Link
                href="/ala-hazrat"
                className="desktopNavLink"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "var(--home-surface-soft)" }}
              >
                Ala Hazrat Legacy
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ROYAL HERO SECTION */}
      <section className="supremeHero">
        <div className="heroContentWrapper">
          <div className="sacredBismillah" dir="rtl" lang="ar">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>

          <div className="sacredKalimaBadge">
            <span>
              لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ ﷺ
            </span>
          </div>

          <h1 className="supremeHeroTitle">
            The Sovereign Gateway to the{" "}
            <span>Holy Qur’an &amp; Islamic Sciences</span>
          </h1>

          <p className="supremeHeroSubtitle">
            Immerse yourself in the divine revelation of the Holy Qur’an with
            4 world-renowned reciters, Ala Hazrat&apos;s celebrated
            translation <strong>Kanz-ul-Iman</strong>, the jurisprudential
            ocean of <strong>Fatawa Razawiyya</strong>, and authentic Sunni
            heritage.
          </p>

          {/* SEARCH CARD */}
          <div className="heroSearchCard">
            <Search size={20} color="var(--home-gold)" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search Surah by name (e.g. Yaseen, Rahman, 55, الفاتحة), or topic..."
              className="heroSearchInput"
              aria-label="Search Surahs"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--home-text-muted)",
                  cursor: "pointer",
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            <Link href="/quran" className="heroSearchBtn">
              <span>Explore All</span>
              <ArrowRight size={15} />
            </Link>

            {/* LIVE SEARCH RESULTS */}
            {searchResults.length > 0 && (
              <div className="heroSearchResultsMenu">
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--home-gold)",
                    padding: "4px 12px 8px",
                  }}
                >
                  MATCHING SURAHS ({searchResults.length})
                </div>

                {searchResults.map((surah) => (
                  <Link
                    key={surah.number}
                    href={`/quran/${surah.number}`}
                    className="heroSearchItem"
                    onClick={() => setSearchQuery("")}
                  >
                    <div>
                      <strong style={{ fontSize: "15px" }}>
                        {surah.number}. {surah.nameEnglish}
                      </strong>

                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--home-text-muted)",
                          marginLeft: "8px",
                        }}
                      >
                        {surah.meaningEnglish} &bull; {surah.ayahCount} Ayahs
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: "Amiri Quran",
                        fontSize: "20px",
                        color: "var(--home-gold)",
                      }}
                      dir="rtl"
                      lang="ar"
                    >
                      {surah.nameArabic}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* QUICK SURAH CHIPS */}
          <div className="quickSurahCarousel">
            {POPULAR_SURAHS.map((surah) => (
              <Link
                key={surah.number}
                href={`/quran/${surah.number}`}
                className="quickSurahChip"
              >
                <span>{surah.arabic}</span>
                <strong>{surah.name}</strong>
              </Link>
            ))}
          </div>

          {/* LAST READ RESUME BAR */}
          {lastRead && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                margin: "14px auto 0",
              }}
            >
              <Link
                href={`/quran/${lastRead.surahNumber}`}
                className="quickSurahChip"
                style={{
                  borderColor: "var(--home-gold)",
                  background: "var(--home-gold-soft)",
                }}
              >
                <Clock size={15} color="var(--home-gold)" />
                <span>Resume Reading: Surah {lastRead.surahNumber}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>
            {/* 4-QARI LIVE AUDIO SANCTUARY */}
      <section style={{ padding: "0 20px" }}>
        <div className="qariStationCard">
          <div className="qariStationHeader">
            <div className="qariBadgeGroup">
              <span className="qariStationTag">
                <Volume2 size={14} />
                <span>SAUT-UL-QUR’AN &bull; 4 RENOWNED QARIS</span>
              </span>

              <span
                style={{
                  fontSize: "13px",
                  color: "var(--home-text-muted)",
                }}
              >
                Click any Qari to listen to sacred recitation
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--home-gold)",
                  fontWeight: 700,
                }}
              >
                Passage:
              </span>

              <select
                value={selectedAyahIndex}
                onChange={(event) => {
                  const newIndex = Number(event.target.value);
                  setSelectedAyahIndex(newIndex);

                  if (isAudioPlaying) {
                    handleToggleQariAudio(selectedQari, newIndex);
                  }
                }}
                className="qariAyahSelect"
                aria-label="Select Quran recitation passage"
              >
                {BLESSED_AYAH_TRACKS.map((track, index) => (
                  <option key={track.id} value={index}>
                    {track.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4 QARI BUTTON TABS */}
          <div className="qariTabsGrid">
            {FOUR_TOP_QARIS.map((qari) => {
              const isActive = selectedQari === qari.id;

              return (
                <button
                  key={qari.id}
                  type="button"
                  className={`qariTabBtn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setSelectedQari(qari.id);
                    handleToggleQariAudio(qari.id);
                  }}
                  title={`Listen to ${qari.name}`}
                >
                  <div className="qariAvatarCircle">
                    {isActive && isAudioPlaying ? (
                      <div className="qariWaveform">
                        <div className="qariWaveBar" />
                        <div className="qariWaveBar" />
                        <div className="qariWaveBar" />
                      </div>
                    ) : (
                      qari.initial
                    )}
                  </div>

                  <div className="qariTabInfo">
                    <strong>{qari.name}</strong>
                    <small>{qari.arabic}</small>
                  </div>
                </button>
              );
            })}
          </div>

          {/* AUDIO PLAYER CONTROLS & AYAH DISPLAY */}
          <div className="qariPlayerRow">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <button
                type="button"
                className="qariPlayBtnLarge"
                onClick={() => handleToggleQariAudio()}
                title={
                  isAudioPlaying
                    ? "Pause Recitation"
                    : `Listen to ${activeQariObj.name}`
                }
                aria-label={
                  isAudioPlaying ? "Pause recitation" : "Play recitation"
                }
              >
                {isAudioPlaying ? (
                  <Pause size={24} />
                ) : (
                  <Play size={24} style={{ marginLeft: "2px" }} />
                )}
              </button>

              <div>
                <strong
                  style={{
                    fontSize: "16px",
                    color: "var(--home-text)",
                    display: "block",
                  }}
                >
                  {activeTrack.title}
                </strong>

                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--home-gold)",
                  }}
                >
                  Reciter: {activeQariObj.name} ({activeQariObj.style})
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <Link
                href={`/quran/${activeTrack.surahNumber}#ayah-${activeTrack.ayahNumber}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--home-gold)",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>Read Full Context in Quran App</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {audioError && (
            <div
              role="status"
              style={{
                color: "#ef4444",
                fontSize: "13px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              {audioError}
            </div>
          )}

          {/* SCRIPT DISPLAY */}
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background: "var(--home-surface)",
              borderRadius: "14px",
              border: "1px solid var(--home-border)",
            }}
          >
            <p
              className="dailyAyahArabicText"
              dir="rtl"
              lang="ar"
              style={{ margin: "0 0 12px 0", fontSize: "28px" }}
            >
              {activeTrack.arabic}
            </p>

            <p className="dailyAyahUrdu" style={{ margin: "0 0 8px 0" }}>
              {activeTrack.urdu}
            </p>

            <p className="dailyAyahEnglish" style={{ margin: 0 }}>
              &ldquo;{activeTrack.english}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* THE SIX PILLARS OF ISLAMIC SCHOLARSHIP */}
      <section className="heritageSection">
        <div className="heritageHeader">
          <div className="heritageEyebrow">
            ACADEMIC &amp; SPIRITUAL SANCTUARY
          </div>

          <h2 className="heritageHeading">
            The Pillars of Maslak-e-Ala Hazrat
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "var(--home-text-muted)",
              fontSize: "15px",
            }}
          >
            A comprehensive, verified digital library unifying the Holy
            Qur’an, the Prophetic Sunnah, Hanafi jurisprudence, and the
            literary contributions of Imam Ahmad Raza Khan.
          </p>
        </div>

        <div className="heritagePortalsGrid">
          {/* PORTAL 1: HOLY QURAN */}
          <Link href="/quran" className="heritagePortalCard">
            <div className="portalTop">
              <div className="portalIconBadge">📖</div>
              <span className="portalArabic">القرآن الكريم</span>
              <h3 className="portalTitle">Qur’an Majeed</h3>

              <p className="portalDesc">
                All 114 Surahs and 30 Juz with 6 world-renowned Qaris, full
                Mushaf reading, Hifz memorization mode, and Kanz-ul-Iman
                translation.
              </p>
            </div>

            <div className="portalFooterLink">
              <span>Launch Quran Reader</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* PORTAL 2: KANZ UL IMAN */}
          <Link href="/kanz-ul-iman" className="heritagePortalCard">
            <div className="portalTop">
              <div className="portalIconBadge">💎</div>
              <span className="portalArabic">
                کنز الایمان فی ترجمۃ القرآن
              </span>
              <h3 className="portalTitle">Kanz-ul-Iman</h3>

              <p className="portalDesc">
                The treasure of faith — Ala Hazrat’s celebrated Urdu Qur’an
                translation dictated extemporaneously, famous for its
                doctrinal accuracy.
              </p>
            </div>

            <div className="portalFooterLink">
              <span>Read Translation &amp; History</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* PORTAL 3: FATAWA RAZAWIYYA */}
          <Link href="/fatawa-razawiyya" className="heritagePortalCard">
            <div className="portalTop">
              <div className="portalIconBadge">⚖️</div>
              <span className="portalArabic">فتاویٰ رضویہ</span>
              <h3 className="portalTitle">Fatawa Razawiyya</h3>

              <p className="portalDesc">
                The 30-volume jurisprudential encyclopedia encompassing over
                21,000 pages of comprehensive Hanafi legal rulings and
                citations.
              </p>
            </div>

            <div className="portalFooterLink">
              <span>Explore 30 Volumes</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* PORTAL 4: HADAIQ E BAKHSHISH */}
          <Link href="/hadaiq-e-bakhshish" className="heritagePortalCard">
            <div className="portalTop">
              <div className="portalIconBadge">🌹</div>
              <span className="portalArabic">حدائقِ بخشش</span>
              <h3 className="portalTitle">Hadaiq-e-Bakhshish</h3>

              <p className="portalDesc">
                The gardens of forgiveness — devotional Naat poetry including
                the universal &ldquo;Mustafa Jane Rahmat Pe Lakho Salam&rdquo;.
              </p>
            </div>

            <div className="portalFooterLink">
              <span>Read Devotional Kalaam</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* PORTAL 5: AL-HADITH */}
          <Link href="/hadith" className="heritagePortalCard">
            <div className="portalTop">
              <div className="portalIconBadge">📜</div>
              <span className="portalArabic">الحديث النبوي</span>
              <h3 className="portalTitle">Al-Hadith Gateway</h3>

              <p className="portalDesc">
                Authentic traditions from Bukhari, Muslim, Tirmidhi, Abu
                Dawud, Nasai, and Ibn Majah with thematic categories and Urdu
                &amp; English.
              </p>
            </div>

            <div className="portalFooterLink">
              <span>Explore Ahadith</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* PORTAL 6: ILM KA SAFAR */}
          <Link href="/ilm-ka-safar" className="heritagePortalCard">
            <div className="portalTop">
              <div className="portalIconBadge">🧭</div>
              <span className="portalArabic">عِلْمٌ كَا سَفَر</span>
              <h3 className="portalTitle">Ilm Ka Safar (30 Days)</h3>

              <p className="portalDesc">
                A structured 30-day curriculum covering Aqaid, Taharah,
                Salah, Quranic reflections, and Islamic ethics with daily
                action checklists.
              </p>
            </div>

            <div className="portalFooterLink">
              <span>Start 30-Day Course</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </section>

      {/* THE SCHOLAR & POLYMATH: 54 BRANCHES OF SCIENCES */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: "var(--home-surface)",
            border: "1.5px solid var(--home-border)",
            borderRadius: "24px",
            padding: "36px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <span className="qariStationTag">POLYHISTORIC GENIUS</span>

              <h2
                style={{
                  fontSize: "28px",
                  margin: "8px 0 4px",
                  color: "var(--home-text)",
                }}
              >
                The Intellectual Mastery of Ala Hazrat
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "var(--home-text-muted)",
                  maxWidth: "600px",
                }}
              >
                Authored over 1,000 treatises across 54 distinct branches of
                Islamic and rational sciences, acclaimed by scholars of
                Makkah and Madinah.
              </p>
            </div>

            <Link
              href="/ala-hazrat"
              className="quranIconButton active"
              style={{ padding: "10px 22px" }}
            >
              <span>View Full Biography &amp; Legacy</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <Link
              href="/ala-hazrat/seerat"
              className="toolsCard"
              style={{ margin: 0, textDecoration: "none" }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--home-gold)",
                    fontWeight: 700,
                  }}
                >
                  26 CHAPTERS
                </span>

                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    margin: "4px 0",
                  }}
                >
                  Seerat-e-Ala Hazrat
                </strong>

                <small style={{ color: "var(--home-text-muted)" }}>
                  Verified life &amp; education
                </small>
              </div>
            </Link>

            <Link
              href="/ala-hazrat/books"
              className="toolsCard"
              style={{ margin: 0, textDecoration: "none" }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--home-gold)",
                    fontWeight: 700,
                  }}
                >
                  CATALOGUE
                </span>

                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    margin: "4px 0",
                  }}
                >
                  Books &amp; Treatises
                </strong>

                <small style={{ color: "var(--home-text-muted)" }}>
                  Independent works registry
                </small>
              </div>
            </Link>

            <Link
              href="/ala-hazrat/teachers"
              className="toolsCard"
              style={{ margin: 0, textDecoration: "none" }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--home-gold)",
                    fontWeight: 700,
                  }}
                >
                  SANAD &amp; IJAZAT
                </span>

                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    margin: "4px 0",
                  }}
                >
                  Asatizah &amp; Teachers
                </strong>

                <small style={{ color: "var(--home-text-muted)" }}>
                  Traditional authorities
                </small>
              </div>
            </Link>

            <Link
              href="/ala-hazrat/students"
              className="toolsCard"
              style={{ margin: 0, textDecoration: "none" }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--home-gold)",
                    fontWeight: 700,
                  }}
                >
                  CONTINUITY
                </span>

                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    margin: "4px 0",
                  }}
                >
                  Students &amp; Khulafa
                </strong>

                <small style={{ color: "var(--home-text-muted)" }}>
                  Scholarly transmission
                </small>
              </div>
            </Link>
          </div>
        </div>
      </section>
            {/* ISLAMIC LIFE & CALENDAR BANNER */}
      <section className="toolsGridSection">
        <Link href="/islamic-calendar" className="toolsCard">
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--home-gold)",
              }}
            >
              LUNAR CALENDAR
            </span>

            <h3 style={{ margin: "4px 0", fontSize: "18px" }}>
              Islamic Calendar &amp; Urs Dates
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "var(--home-text-muted)",
              }}
            >
              Sacred months, Ramadan, Urs-e-Razawi (25 Safar), Gyarween
              Shareef, and fasting milestones.
            </p>
          </div>

          <div style={{ fontSize: "28px", color: "var(--home-gold)" }}>
            ☪
          </div>
        </Link>

        <Link href="/seerat-un-nabi" className="toolsCard">
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--home-gold)",
              }}
            >
              BLESSED BIOGRAPHY
            </span>

            <h3 style={{ margin: "4px 0", fontSize: "18px" }}>
              Seerat-un-Nabi ﷺ
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "var(--home-text-muted)",
              }}
            >
              The life, miracles, and universal mercy of the Master of the
              Universe, Sayyiduna Muhammad ﷺ.
            </p>
          </div>

          <div
            style={{
              fontFamily: "Amiri Quran",
              fontSize: "28px",
              color: "var(--home-gold)",
            }}
          >
            ﷴ
          </div>
        </Link>

        <Link href="/quran/full" className="toolsCard">
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--home-gold)",
              }}
            >
              HOLY BOOK
            </span>

            <h3 style={{ margin: "4px 0", fontSize: "18px" }}>
              Full Mushaf Reader
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "var(--home-text-muted)",
              }}
            >
              Read the entire Holy Qur’an in authentic continuous Arabic
              calligraphy with Juz selector.
            </p>
          </div>

          <div style={{ fontSize: "28px", color: "var(--home-gold)" }}>
            📖
          </div>
        </Link>
      </section>

      {/* SUPREME ROYAL FOOTER */}
      <footer className="supremeFooter">
        <div className="footerInnerGrid">
          <div>
            <div className="brandWrap" style={{ marginBottom: "14px" }}>
              <div className="brandLogoCircle">م</div>
              <span className="brandTitle">Maslak-e-Ala Hazrat</span>
            </div>

            <p
              style={{
                color: "var(--home-text-muted)",
                fontSize: "14px",
                lineHeight: 1.6,
                maxWidth: "340px",
                margin: "0 0 16px 0",
              }}
            >
              Dedicated to serving the global Muslim community with authentic
              Islamic knowledge, Qur’anic tilawat, and preserving the
              scholarly heritage of Ahle Sunnat wal Jama&apos;at.
            </p>

            <div
              style={{
                fontFamily: "Amiri Quran",
                color: "var(--home-gold)",
                fontSize: "16px",
              }}
            >
              صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ
            </div>
          </div>

          <div>
            <div className="footerColTitle">Qur’an Majeed</div>

            <ul className="footerLinksList">
              <li>
                <Link href="/quran">All 114 Surahs</Link>
              </li>
              <li>
                <Link href="/quran/full">Read Full Mushaf</Link>
              </li>
              <li>
                <Link href="/quran-samajhne-ka-safar">
                  Qur’an Samajhne Ka Safar
                </Link>
              </li>
              <li>
                <Link href="/quran/36">Surah Ya-Seen</Link>
              </li>
              <li>
                <Link href="/quran/55">Surah Ar-Rahman</Link>
              </li>
              <li>
                <Link href="/quran/67">Surah Al-Mulk</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footerColTitle">Scholarly Works</div>

            <ul className="footerLinksList">
              <li>
                <Link href="/kanz-ul-iman">Kanz-ul-Iman</Link>
              </li>
              <li>
                <Link href="/fatawa-razawiyya">Fatawa Razawiyya</Link>
              </li>
              <li>
                <Link href="/hadaiq-e-bakhshish">
                  Hadaiq-e-Bakhshish
                </Link>
              </li>
              <li>
                <Link href="/ala-hazrat/seerat">Seerat-e-Ala Hazrat</Link>
              </li>
              <li>
                <Link href="/ala-hazrat/teachers">
                  Teachers &amp; Asatizah
                </Link>
              </li>
              <li>
                <Link href="/ala-hazrat/research">
                  Academic Research
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footerColTitle">Spiritual &amp; Learning</div>

            <ul className="footerLinksList">
              <li>
                <Link href="/hadith">Al-Hadith Collections</Link>
              </li>
              <li>
                <Link href="/seerat-un-nabi">Seerat-un-Nabi ﷺ</Link>
              </li>
              <li>
                <Link href="/naat-manqabat">Naat &amp; Manqabat</Link>
              </li>
              <li>
                <Link href="/ilm-ka-safar">Ilm Ka Safar</Link>
              </li>
              <li>
                <Link href="/islamic-calendar">Islamic Calendar</Link>
              </li>
              <li>
                <Link href="/about">About &amp; Mission</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footerBottomBar">
          <div>
            &copy; {new Date().getFullYear()} Maslak-e-Ala Hazrat. Built with
            Adab, Reverence, and Scholarly Precision.
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              href="/disclaimer"
              style={{ color: "var(--home-text-muted)" }}
            >
              Disclaimer
            </Link>

            <Link
              href="/contact"
              style={{ color: "var(--home-text-muted)" }}
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
