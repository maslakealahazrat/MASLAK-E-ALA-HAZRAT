import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Full Qur’an",

  description:
    "Read the complete Qur’an Majeed in continuous original Arabic text, with all 114 Surahs and Ayahs.",

  alternates: {
    canonical: "/quran/full",
  },

  openGraph: {
    type: "website",
    title: "Read Full Qur’an | Maslak-e-Ala Hazrat",
    description:
      "Read the complete Qur’an Majeed with all 114 Surahs and Ayahs in original Arabic text.",
    url: "/quran/full",
    siteName: "Maslak-e-Ala Hazrat",
  },
};

export default function FullQuranLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
