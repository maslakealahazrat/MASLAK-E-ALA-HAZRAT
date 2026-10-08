import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL =
  "https://maslak-e-ala-hazrat-weld.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Maslak-e-Ala Hazrat",
    template: "%s | Maslak-e-Ala Hazrat",
  },

  description:
    "Maslak-e-Ala Hazrat — Islamic knowledge, Qur’an, Hadith, Naat, Manqabat, Islamic Books, Seerat and more.",

  applicationName: "Maslak-e-Ala Hazrat",

  authors: [
    {
      name: "Maslak-e-Ala Hazrat",
    },
  ],

  creator: "Maslak-e-Ala Hazrat",
  publisher: "Maslak-e-Ala Hazrat",

  keywords: [
    "Maslak-e-Ala Hazrat",
    "Islamic knowledge",
    "Quran",
    "Qur’an",
    "Hadith",
    "Naat",
    "Manqabat",
    "Kanz-ul-Iman",
    "Fatawa Razawiyya",
    "Seerat-un-Nabi",
    "Islamic Books",
    "Ala Hazrat",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Maslak-e-Ala Hazrat",
    title: "Maslak-e-Ala Hazrat",
    description:
      "Islamic knowledge, Qur’an, Hadith, Naat, Manqabat, Islamic Books, Seerat and more.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme =
                    localStorage.getItem("site-theme") || "auto";

                  var root = document.documentElement;

                  if (theme === "dark") {
                    root.classList.add("dark");
                  } else if (theme === "light") {
                    root.classList.remove("dark");
                  } else {
                    var dark =
                      window.matchMedia &&
                      window.matchMedia(
                        "(prefers-color-scheme: dark)"
                      ).matches;

                    root.classList.toggle("dark", dark);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
