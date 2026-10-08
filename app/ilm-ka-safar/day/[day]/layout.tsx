import type { Metadata } from "next";
import { ilmKaSafarLessons } from "@/data/ilm-ka-safar";

type DayLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    day: string;
  }>;
};

export async function generateMetadata({
  params,
}: DayLayoutProps): Promise<Metadata> {
  const { day } = await params;

  const dayNumber = Number(day);

  const lesson =
    ilmKaSafarLessons[
      dayNumber as keyof typeof ilmKaSafarLessons
    ];

  if (!lesson) {
    return {
      title: "Lesson Not Found",
      description:
        "The requested Ilm Ka Safar lesson could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = lesson.title.en;
  const description = lesson.autoModeNote.en;

  return {
    title,

    description,

    alternates: {
      canonical: `/ilm-ka-safar/day/${dayNumber}`,
    },

    openGraph: {
      type: "article",
      title: `${title} | Maslak-e-Ala Hazrat`,
      description,
      url: `/ilm-ka-safar/day/${dayNumber}`,
      siteName: "Maslak-e-Ala Hazrat",
    },
  };
}

export default function IlmKaSafarDayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
