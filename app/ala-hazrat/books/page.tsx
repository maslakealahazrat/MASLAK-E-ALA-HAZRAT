import Link from "next/link";
import type { Metadata } from "next";
import AlaHazratWorks from "@/components/AlaHazratWorks";

export const metadata: Metadata = {
  title: "Books & Works",
  description:
    "Explore the books and literary works of Imam Ahmad Raza Khan, with each work kept as a separate independent collection.",
  alternates: {
    canonical: "/ala-hazrat/books",
  },
  openGraph: {
    title: "Books & Works | Ala Hazrat",
    description:
      "Explore the books and literary works of Imam Ahmad Raza Khan.",
    url: "/ala-hazrat/books",
    siteName: "Maslak-e-Ala Hazrat",
    type: "website",
  },
};

export default function AlaHazratBooksPage() {
  return (
    <main className="alaHazratBooksPage">
      <section className="alaHazratBooksHero">
        <Link href="/" className="alaHazratBackLink">
          ← Home
        </Link>

        <div className="alaHazratBooksHeroContent">
          <p className="alaHazratBooksEyebrow">
            IMAM AHMAD RAZA KHAN
          </p>

          <h1>Books &amp; Works</h1>

          <p className="alaHazratBooksArabic">
            کتب و تصانیف
          </p>

          <p className="alaHazratBooksDescription">
            A separate collection of the verified books and literary works
            associated with Ala Hazrat, with every work kept independent.
          </p>
        </div>
      </section>

      <section className="alaHazratBooksContent">
        <AlaHazratWorks />
      </section>
    </main>
  );
}
