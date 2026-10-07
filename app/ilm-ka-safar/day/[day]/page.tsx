"use client";

import { useParams } from "next/navigation";
import IlmKaSafarLesson from "@/components/IlmKaSafarLesson";
import { day1 } from "@/data/ilm-ka-safar/day-1";

export default function IlmKaSafarDayPage() {
  const params = useParams();

  const day = String(params.day);

  if (day === "1") {
    return <IlmKaSafarLesson lesson={day1} />;
  }

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

        <a href="/ilm-ka-safar">
          ← Back to Ilm Ka Safar
        </a>
      </div>
    </main>
  );
}
