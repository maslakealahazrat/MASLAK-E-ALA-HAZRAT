"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { quranAyahs } from "@/data/quran/ayahs";

type Lang = "en" | "ur" | "hi";

type LanguageText = {
  en: string;
  hi: string;
  ur: string;
};

type QuranReference = {
  surah: number;
  ayah: number;
};

type DifficultWord = {
  arabic: string;
  meaning: LanguageText;
};

type LessonSection =
  | {
      type: "heading";
      title: LanguageText;
    }
  | {
      type: "text";
      text: LanguageText;
    }
  | {
      type: "bismillah";
    }
  | {
      type: "quran";
      reference: QuranReference;
      translation: LanguageText;
      difficultWords?: DifficultWord[];
    };

type Lesson = {
  day: number;
  title: LanguageText;
  subtitle: LanguageText;
  autoModeNote: LanguageText;
  sections: LessonSection[];
};

type Props = {
  lesson: Lesson;
};

const languageOrder: Lang[] = ["en", "ur", "hi"];

export default function IlmKaSafarLesson({ lesson }: Props) {
  const [language, setLanguage] = useState<Lang>("en");
  const [autoMode, setAutoMode] = useState(true);
  const [clickedLanguages, setClickedLanguages] = useState<
    Record<string, Lang>
  >({});

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("site-language") || "auto";

    if (
      savedLanguage === "en" ||
      savedLanguage === "hi" ||
      savedLanguage === "ur"
    ) {
      setLanguage(savedLanguage);
      setAutoMode(false);
    } else {
      setAutoMode(true);
      setLanguage("en");
    }

    const handleStorage = () => {
      const current =
        localStorage.getItem("site-language") || "auto";

      if (
        current === "en" ||
        current === "hi" ||
        current === "ur"
      ) {
        setLanguage(current);
        setAutoMode(false);
      } else {
        setAutoMode(true);
        setLanguage("en");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "maslak-reading-progress",
        JSON.stringify({
          type: "ilm-ka-safar",
          title: lesson.title.en,
          subtitle: `Day ${lesson.day}`,
          url: `/ilm-ka-safar/day/${lesson.day}`,
        })
      );
    } catch {
      // Ignore localStorage errors.
    }
  }, [lesson]);

  const getText = (
    text: LanguageText,
    key: string
  ) => {
    if (!autoMode) {
      return text[language];
    }

    return text[clickedLanguages[key] || "en"];
  };

  const cycleText = (key: string) => {
    if (!autoMode) return;

    setClickedLanguages((previous) => {
      const current = previous[key] || "en";
      const index = languageOrder.indexOf(current);
      const next =
        languageOrder[
          (index + 1) % languageOrder.length
        ];

      return {
        ...previous,
        [key]: next,
      };
    });
  };

  const quranMap = useMemo(() => {
    const map = new Map<string, (typeof quranAyahs)[number]>();

    for (const ayah of quranAyahs) {
      map.set(
        `${ayah.surahNumber}:${ayah.ayahNumber}`,
        ayah
      );
    }

    return map;
  }, []);

  const getQuranAyah = (
    reference: QuranReference
  ) => {
    return quranMap.get(
      `${reference.surah}:${reference.ayah}`
    );
  };

  return (
    <main className="ilmLessonPage">

      <div className="ilmLessonContainer">

        <Link
          href="/ilm-ka-safar"
          className="ilmBackLink"
        >
          ← Ilm Ka Safar
        </Link>

        <header className="ilmLessonHeader">

          <div className="ilmDayBadge">
            DAY {lesson.day}
          </div>

          <h1
            className="ilmLessonTitle ilmTapText"
            onClick={() =>
              cycleText("lesson-title")
            }
          >
            {getText(
              lesson.title,
              "lesson-title"
            )}
          </h1>

          <h2
            className="ilmLessonSubtitle ilmTapText"
            onClick={() =>
              cycleText("lesson-subtitle")
            }
          >
            {getText(
              lesson.subtitle,
              "lesson-subtitle"
            )}
          </h2>

          <div
            className={`ilmAutoMode ${
              autoMode ? "active" : ""
            }`}
          >
            {autoMode
              ? "AUTO MODE ON"
              : "AUTO MODE OFF"}
          </div>

          <p
            className="ilmAutoModeNote ilmTapText"
            onClick={() =>
              cycleText("auto-mode-note")
            }
          >
            {getText(
              lesson.autoModeNote,
              "auto-mode-note"
            )}
          </p>

        </header>

        <section className="ilmLessonContent">

          {lesson.sections.map(
            (section, index) => {

              if (section.type === "heading") {
                const key = `heading-${index}`;

                return (
                  <h3
                    key={key}
                    className="ilmSectionHeading ilmTapText"
                    onClick={() =>
                      cycleText(key)
                    }
                  >
                    {getText(
                      section.title,
                      key
                    )}
                  </h3>
                );
              }

              if (section.type === "text") {
                const key = `text-${index}`;

                return (
                  <p
                    key={key}
                    className="ilmSectionText ilmTapText"
                    onClick={() =>
                      cycleText(key)
                    }
                  >
                    {getText(
                      section.text,
                      key
                    )}
                  </p>
                );
              }

              if (section.type === "bismillah") {
                const bismillah =
                  quranAyahs.find(
                    (ayah) =>
                      ayah.surahNumber === 1 &&
                      ayah.ayahNumber === 1
                  );

                return (
                  <div
                    key={`bismillah-${index}`}
                    className="ilmBismillah"
                  >
                    {bismillah?.arabic ||
                      "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
                  </div>
                );
              }

              if (section.type === "quran") {
                const key =
                  `quran-${section.reference.surah}-${section.reference.ayah}-${index}`;

                const ayah = getQuranAyah(
                  section.reference
                );

                return (
                  <article
                    key={key}
                    className="ilmQuranCard"
                  >

                    <Link
                      href={`/quran/full#ayah-${section.reference.surah}-${section.reference.ayah}`}
                      className="ilmQuranArabic"
                    >
                      {ayah?.arabic ||
                        "Qur’an Ayah"}
                    </Link>

                    <div
                      className="ilmAyahReference"
                    >
                      Surah{" "}
                      {section.reference.surah}
                      :
                      {" "}
                      {section.reference.ayah}
                    </div>

                    <p
                      className="ilmTranslation ilmTapText"
                      onClick={() =>
                        cycleText(key)
                      }
                    >
                      {getText(
                        section.translation,
                        key
                      )}
                    </p>

                    {section.difficultWords &&
                      section.difficultWords
                        .length > 0 && (
                        <div className="ilmWords">

                          <h4>
                            Difficult Words
                          </h4>

                          {section.difficultWords.map(
                            (
                              word,
                              wordIndex
                            ) => {
                              const wordKey =
                                `${key}-word-${wordIndex}`;

                              return (
                                <div
                                  key={wordKey}
                                  className="ilmWordRow"
                                >

                                  <strong>
                                    {word.arabic}
                                  </strong>

                                  <span
                                    className="ilmTapText"
                                    onClick={() =>
                                      cycleText(
                                        wordKey
                                      )
                                    }
                                  >
                                    {getText(
                                      word.meaning,
                                      wordKey
                                    )}
                                  </span>

                                </div>
                              );
                            }
                          )}

                        </div>
                      )}

                  </article>
                );
              }

              return null;
            }
          )}

        </section>

        <nav className="ilmDayNavigation">

          {lesson.day > 1 ? (
            <Link
              href={`/ilm-ka-safar/day/${lesson.day - 1}`}
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}

          <Link href="/ilm-ka-safar">
            All Days
          </Link>

          <Link
            href={`/ilm-ka-safar/day/${lesson.day + 1}`}
          >
            Next →
          </Link>

        </nav>

      </div>

    </main>
  );
            }
