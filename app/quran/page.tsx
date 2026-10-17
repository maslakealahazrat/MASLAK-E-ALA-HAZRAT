import type { Metadata } from "next";
import QuranIndexClient from "@/components/QuranIndexClient";

export const metadata: Metadata = {
  title: "Qur’an Majeed — Read & Listen Full Holy Quran with Kanz-ul-Iman",
  description:
    "Explore all 114 Surahs and 30 Juz of the Holy Qur’an in authentic Arabic Uthmani and IndoPak scripts, multi-reciter streaming audio, and Urdu Kanz-ul-Iman translation by Ala Hazrat.",
  alternates: {
    canonical: "/quran",
  },
  openGraph: {
    type: "website",
    title: "Qur’an Majeed — Read & Listen | Maslak-e-Ala Hazrat",
    description:
      "Explore all 114 Surahs and 30 Juz of the Holy Qur’an in authentic Arabic script, multi-reciter audio, and Urdu Kanz-ul-Iman translation.",
    url: "/quran",
    siteName: "Maslak-e-Ala Hazrat",
  },
};

export default function QuranPage() {
  return (
    <main>
      <QuranIndexClient />
    </main>
  );
}
