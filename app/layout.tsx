import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "MASLAK-E-ALA-HAZRAT",
  description:
    "Islamic knowledge, Quran, Hadith, Naat, Manqabat, Islamic Books and Seerat.",
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
