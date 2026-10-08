import { ilmKaSafarLessons } from "@/data/ilm-ka-safar";
import type { SearchDocument } from "./types";

export const ilmKaSafarSearchDocuments: SearchDocument[] = [];

for (const lesson of Object.values(ilmKaSafarLessons)) {
  const lessonTitle = lesson.title.en;
  const lessonSubtitle = lesson.subtitle.en;

  ilmKaSafarSearchDocuments.push({
    id: `ilm-day-${lesson.day}-title`,
    type: "ilm-ka-safar",

    title: lessonTitle,

    text: [
      lesson.title.en,
      lesson.title.hi,
      lesson.title.ur,
      lesson.subtitle.en,
      lesson.subtitle.hi,
      lesson.subtitle.ur,
      lesson.autoModeNote.en,
      lesson.autoModeNote.hi,
      lesson.autoModeNote.ur,
    ].join(" "),

    href: `/ilm-ka-safar/day/${lesson.day}`,

    english: lesson.title.en,
    hindi: lesson.title.hi,
    urdu: lesson.title.ur,

    day: lesson.day,
  });

  lesson.sections.forEach((section, index) => {
    if (section.type === "heading") {
      ilmKaSafarSearchDocuments.push({
        id: `ilm-day-${lesson.day}-heading-${index}`,
        type: "ilm-ka-safar",

        title: section.title.en,

        text: [
          section.title.en,
          section.title.hi,
          section.title.ur,
          lessonTitle,
          lessonSubtitle,
        ].join(" "),

        href: `/ilm-ka-safar/day/${lesson.day}`,

        english: section.title.en,
        hindi: section.title.hi,
        urdu: section.title.ur,

        day: lesson.day,
      });
    }

    if (section.type === "text") {
      ilmKaSafarSearchDocuments.push({
        id: `ilm-day-${lesson.day}-text-${index}`,
        type: "ilm-ka-safar",

        title: lessonTitle,

        text: [
          section.text.en,
          section.text.hi,
          section.text.ur,
          lessonTitle,
          lessonSubtitle,
        ].join(" "),

        href: `/ilm-ka-safar/day/${lesson.day}`,

        english: section.text.en,
        hindi: section.text.hi,
        urdu: section.text.ur,

        day: lesson.day,
      });
    }

    if (section.type === "quran") {
      ilmKaSafarSearchDocuments.push({
        id: `ilm-day-${lesson.day}-quran-${section.reference.surah}-${section.reference.ayah}-${index}`,

        type: "ilm-ka-safar",

        title: `${lessonTitle} · Surah ${section.reference.surah}:${section.reference.ayah}`,

        text: [
          section.translation.en,
          section.translation.hi,
          section.translation.ur,

          String(section.reference.surah),
          String(section.reference.ayah),

          `${section.reference.surah}:${section.reference.ayah}`,

          ...(
            section.difficultWords || []
          ).flatMap((word) => [
            word.arabic,
            word.meaning.en,
            word.meaning.hi,
            word.meaning.ur,
          ]),
        ].join(" "),

        href: `/quran/${section.reference.surah}#ayah-${section.reference.ayah}`,

        english: section.translation.en,
        hindi: section.translation.hi,
        urdu: section.translation.ur,

        surahNumber: section.reference.surah,
        ayahNumber: section.reference.ayah,

        day: lesson.day,
      });

      for (
        let wordIndex = 0;
        wordIndex <
        (section.difficultWords || []).length;
        wordIndex++
      ) {
        const word =
          section.difficultWords![wordIndex];

        ilmKaSafarSearchDocuments.push({
          id: `ilm-day-${lesson.day}-word-${index}-${wordIndex}`,

          type: "ilm-ka-safar",

          title: `${word.arabic} · Day ${lesson.day}`,

          text: [
            word.arabic,
            word.meaning.en,
            word.meaning.hi,
            word.meaning.ur,
          ].join(" "),

          href: `/ilm-ka-safar/day/${lesson.day}`,

          arabic: word.arabic,
          english: word.meaning.en,
          hindi: word.meaning.hi,
          urdu: word.meaning.ur,

          day: lesson.day,
        });
      }
    }
  });
}
