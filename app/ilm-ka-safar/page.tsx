"use client";

import Link from "next/link";
import { ilmKaSafarLessons } from "@/data/ilm-ka-safar";

export default function IlmKaSafarPage() {
  const lessons = Object.values(ilmKaSafarLessons);

  return (
    <main className="ilmIndexPage">
      <div className="ilmIndexContainer">

        <Link
          href="/"
          className="ilmBackLink"
        >
          ← Home
        </Link>

        <header className="ilmIndexHeader">

          <div className="ilmIndexBadge">
            ISLAMIC KNOWLEDGE
          </div>

          <h1>
            Ilm Ka Safar
          </h1>

          <p>
            A step-by-step journey of learning,
            understanding and strengthening our
            Islamic knowledge.
          </p>

        </header>

        <section className="ilmLessonList">

          {lessons.map((lesson) => (

            <Link
              key={lesson.day}
              href={`/ilm-ka-safar/day/${lesson.day}`}
              className="ilmLessonCard"
            >

              <div className="ilmLessonNumber">
                {String(lesson.day).padStart(2, "0")}
              </div>

              <div className="ilmLessonCardContent">

                <span>
                  DAY {lesson.day}
                </span>

                <h2>
                  {lesson.title.en}
                </h2>

                <p>
                  {lesson.subtitle.en}
                </p>

              </div>

              <div className="ilmLessonArrow">
                →
              </div>

            </Link>

          ))}

        </section>

      </div>
    </main>
  );
}
