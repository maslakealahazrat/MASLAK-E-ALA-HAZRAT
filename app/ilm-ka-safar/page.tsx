import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ilm Ka Safar",

  description:
    "Ilm Ka Safar — a step-by-step journey of learning, understanding and strengthening Islamic knowledge.",

  alternates: {
    canonical: "/ilm-ka-safar",
  },

  openGraph: {
    type: "website",
    title: "Ilm Ka Safar | Maslak-e-Ala Hazrat",
    description:
      "A step-by-step journey of learning, understanding and strengthening Islamic knowledge.",
    url: "/ilm-ka-safar",
    siteName: "Maslak-e-Ala Hazrat",
  },
};

export default function IlmKaSafarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
