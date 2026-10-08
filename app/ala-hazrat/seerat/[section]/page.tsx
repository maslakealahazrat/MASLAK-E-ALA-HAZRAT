import Link from "next/link";
import { notFound } from "next/navigation";

import {
  alaHazratSeeratSections,
} from "@/data/ala-hazrat/seerat";

import {
  alaHazratSeeratContent,
} from "@/data/ala-hazrat/seerat-content";

type PageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return alaHazratSeeratContent.map((section) => ({
    section: section.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { section } = await params;

  const content = alaHazratSeeratContent.find(
    (item) => item.id === section
  );

  if (!content) {
    return {
      title: "Seerat Section | Maslak-e-Ala Hazrat",
    };
  }

  return {
    title: `${content.title} | Seerat-e-Ala Hazrat`,
    description: content.paragraphs[0],
    alternates: {
      canonical: `/ala-hazrat/seerat/${section}`,
    },
  };
}

export default async function AlaHazratSeeratSectionPage({
  params,
}: PageProps) {
  const { section } = await params;

  const content = alaHazratSeeratContent.find(
    (item) => item.id === section
  );

  const sectionInfo = alaHazratSeeratSections.find(
    (item) => item.id === section
  );

  if (!content || !sectionInfo) {
    notFound();
  }

  return (
    <main className="alaHazratSeeratDetailPage">
      <section className="alaHazratSeeratDetailHero">
        <div className="alaHazratSeeratDetailHeroInner">
          <Link
            href="/ala-hazrat/seerat"
            className="alaHazratSeeratDetailBack"
          >
            ← Seerat-e-Ala Hazrat
          </Link>

          <p className="alaHazratSeeratHeroEyebrow">
            SEERAT • IMAM AHMAD RAZA KHAN
          </p>

          <h1>{content.title}</h1>

          <p className="alaHazratSeeratDetailIntro">
            {sectionInfo.description}
          </p>
        </div>
      </section>

      <section className="alaHazratSeeratDetailContent">
        <article className="alaHazratSeeratDetailCard">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        <div className="alaHazratSeeratDetailNavigation">
          <Link
            href="/ala-hazrat/seerat"
            className="alaHazratSeeratDetailButton"
          >
            ← All Seerat Sections
          </Link>
        </div>
      </section>
    </main>
  );
}
