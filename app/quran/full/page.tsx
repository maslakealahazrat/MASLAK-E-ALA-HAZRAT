import type { Metadata } from "next";
import FullQuranClient from "@/components/FullQuranClient";

export const metadata: Metadata = {
  title: "Full Holy Qur’an — Complete 114 Surahs & 30 Juz with Kanz-ul-Iman & Audio",
  description:
    "Read the complete Holy Qur’an with smooth pagination, continuous Mushaf mode, Ala Hazrat's Kanz-ul-Iman Urdu translation, English translation, and recitation by world-renowned Qaris.",
  alternates: {
    canonical: "/quran/full",
  },
};

export default function FullQuranPage() {
  return <FullQuranClient />;
}
