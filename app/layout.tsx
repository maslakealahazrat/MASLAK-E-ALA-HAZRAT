import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MASLAK-E-ALA-HAZRAT",
  description:
    "Islamic knowledge, Naat, Manqabat, Books, Hadith and Islamic Artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
