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

const themeInitScript = `
(function () {
try {
var root = document.documentElement;
var themes = ["emerald", "sepia", "dark", "light"];

var savedQuranTheme = localStorage.getItem("quran-app-theme");
var savedSiteTheme = localStorage.getItem("site-theme");

var theme = "emerald";

if (themes.indexOf(savedQuranTheme) !== -1) {
  theme = savedQuranTheme;
} else if (themes.indexOf(savedSiteTheme) !== -1) {
  theme = savedSiteTheme;
} else if (savedSiteTheme === "auto") {
  theme = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

root.dataset.siteTheme = theme;

themes.forEach(function (name) {
  root.classList.remove("quran-theme-" + name);
});

root.classList.add("quran-theme-" + theme);

var darkBaseThemes = ["emerald", "dark"];

root.classList.toggle(
  "dark",
  darkBaseThemes.indexOf(theme) !== -1
);

root.classList.toggle(
  "light",
  darkBaseThemes.indexOf(theme) === -1
);

} catch (error) {
// Keep page rendering if browser storage is unavailable.
}
})();
`;

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en" suppressHydrationWarning>
<body>
<script
dangerouslySetInnerHTML={{
__html: themeInitScript,
}}
/>

    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>

);
}
