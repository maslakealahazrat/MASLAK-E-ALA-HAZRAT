"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import IlmKaSafarLesson from "@/components/IlmKaSafarLesson";
import { ilmKaSafarLessons } from "@/data/ilm-ka-safar";

export default function IlmKaSafarDayPage() {
  const params = useParams();

  const dayNumber = Number(params.day);

  const lesson =
    ilmKaSafarLessons[
      dayNumber as keyof typeof ilmKaSafarLessons
    ];

  if (!lesson) {
    return (
      <main
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Ilm Ka Safar</h1>

          <p>
            This lesson is not available yet.
          </p>

          <Link href="/ilm-ka-safar">
            ← Back to Ilm Ka Safar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <IlmKaSafarLesson lesson={lesson} />
  );
}
