import Link from "next/link";
import { notFound } from "next/navigation";

import { alaHazratSeeratSections } from "@/data/ala-hazrat/seerat";
import { alaHazratSeeratContent } from "@/data/ala-hazrat/seerat-content";

import {
  getSeeratResearchFacts,
  getSeeratResearchTeachers,
  getSeeratResearchFamily,
  getSeeratResearchStudents,
  getSeeratResearchWorks,
} from "@/data/ala-hazrat";

type PageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return alaHazratSeeratContent.map((section) => ({
    section: section.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps) {
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

function formatTopic(topic: string) {
  return topic
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
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

  const researchFacts = getSeeratResearchFacts(section);
  const teachers = getSeeratResearchTeachers(section);
  const family = getSeeratResearchFamily(section);
  const students = getSeeratResearchStudents(section);
  const works = getSeeratResearchWorks(section);

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

        {researchFacts.length > 0 && (
          <section className="alaHazratSeeratDetailResearch">
            <div className="alaHazratSeeratDetailResearchHeader">
              <p className="alaHazratSeeratDetailResearchEyebrow">
                RESEARCH • VERIFIED
              </p>

              <h2>Verified Research Facts</h2>

              <p>
                Is section se related documented research facts
                source references ke saath.
              </p>
            </div>

            <div className="alaHazratSeeratDetailResearchGrid">
              {researchFacts.map((fact) => (
                <article
                  key={fact.id}
                  className="alaHazratSeeratDetailResearchCard"
                >
                  <div className="alaHazratSeeratDetailResearchTop">
                    <span>
                      {formatTopic(fact.topic)}
                    </span>

                    <strong>Verified</strong>
                  </div>

                  <p className="alaHazratSeeratDetailResearchClaim">
                    {fact.claim}
                  </p>

                  {fact.notes && (
                    <p className="alaHazratSeeratDetailResearchNotes">
                      {fact.notes}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {teachers.length > 0 && (
          <section className="alaHazratSeeratDetailResearch">
            <div className="alaHazratSeeratDetailResearchHeader">
              <p className="alaHazratSeeratDetailResearchEyebrow">
                SCHOLARS
              </p>

              <h2>Related Teachers &amp; Scholars</h2>
            </div>

            <div className="alaHazratSeeratDetailResearchGrid">
              {teachers.map((teacher) => (
                <article
                  key={teacher.id}
                  className="alaHazratSeeratDetailResearchCard"
                >
                  <h3>{teacher.name}</h3>

                  <p className="alaHazratSeeratDetailResearchClaim">
                    {teacher.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {family.length > 0 && (
          <section className="alaHazratSeeratDetailResearch">
            <div className="alaHazratSeeratDetailResearchHeader">
              <p className="alaHazratSeeratDetailResearchEyebrow">
                FAMILY
              </p>

              <h2>Related Family Members</h2>
            </div>

            <div className="alaHazratSeeratDetailResearchGrid">
              {family.map((member) => (
                <article
                  key={member.id}
                  className="alaHazratSeeratDetailResearchCard"
                >
                  <h3>{member.name}</h3>

                  <p className="alaHazratSeeratDetailResearchClaim">
                    {member.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {students.length > 0 && (
          <section className="alaHazratSeeratDetailResearch">
            <div className="alaHazratSeeratDetailResearchHeader">
              <p className="alaHazratSeeratDetailResearchEyebrow">
                SCHOLARLY LEGACY
              </p>

              <h2>Related Students &amp; Deputies</h2>
            </div>

            <div className="alaHazratSeeratDetailResearchGrid">
              {students.map((student) => (
                <article
                  key={student.id}
                  className="alaHazratSeeratDetailResearchCard"
                >
                  <h3>{student.name}</h3>

                  <p className="alaHazratSeeratDetailResearchClaim">
                    {student.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {works.length > 0 && (
          <section className="alaHazratSeeratDetailResearch">
            <div className="alaHazratSeeratDetailResearchHeader">
              <p className="alaHazratSeeratDetailResearchEyebrow">
                WORKS
              </p>

              <h2>Related Works</h2>
            </div>

            <div className="alaHazratSeeratDetailResearchGrid">
              {works.map((work) => (
                <article
                  key={work.id}
                  className="alaHazratSeeratDetailResearchCard"
                >
                  <h3>{work.title}</h3>

                  <p className="alaHazratSeeratDetailResearchClaim">
                    {work.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

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
