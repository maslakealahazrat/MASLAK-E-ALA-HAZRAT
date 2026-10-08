"use client";

import Link from "next/link";
import { alaHazratSeeratSections } from "@/data/ala-hazrat/seerat";
import { alaHazratSeeratContent } from "@/data/ala-hazrat/seerat-content";

export default function AlaHazratSeerat() {
  const contentMap = new Map(
    alaHazratSeeratContent.map((section) => [section.id, section])
  );

  return (
    <section className="alaHazratSeeratSection">
      <div className="alaHazratSeeratHeader">
        <p className="alaHazratSeeratEyebrow">
          SEERAT • LIFE • SCHOLARSHIP
        </p>

        <h2>Seerat-e-Ala Hazrat</h2>

        <p className="alaHazratSeeratIntro">
          Imam Ahmad Raza Khan Fazil-e-Barelvi ki zindagi,
          taleem, ilm, tasneefaat, roohani nisbat aur ilmī
          virasat ko organized aur verified format mein pesh kiya ja raha hai.
        </p>
      </div>

      <div className="alaHazratSeeratContentList">
        {alaHazratSeeratSections.map((section, index) => {
          const content = contentMap.get(section.id);

          return (
            <article
              key={section.id}
              id={section.id}
              className="alaHazratSeeratContentCard"
            >
              <div className="alaHazratSeeratContentTop">
                <div className="alaHazratSeeratNumber">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <p className="alaHazratSeeratStatus">
                    {content ? "Verified Content" : "Coming Soon"}
                  </p>

                  <h3>{content?.title ?? section.title}</h3>
                </div>
              </div>

              {content ? (
                <div className="alaHazratSeeratParagraphs">
                  {content.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="alaHazratSeeratPending">
                  Hamari team is section par kaam kar rahi hai. Yeh page
                  bahut jald verified content ke saath update kiya jayega.
                </p>
              )}

              <div className="alaHazratSeeratCardFooter">
                <Link
                  href={`/ala-hazrat/seerat#${section.id}`}
                  className="alaHazratSeeratLink"
                >
                  Open Section
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="alaHazratSeeratNote">
        <div className="alaHazratSeeratNoteInner">
          <p className="alaHazratSeeratNoteEyebrow">
            RESEARCH &amp; VERIFICATION
          </p>

          <h2>Verified Content Policy</h2>

          <p>
            Biography aur Seerat se related detailed information reliable
            sources, bibliographical records aur available scholarly
            references ko compare karke add ki jayegi. Jahan source ya
            edition mein difference hoga, wahan usko clearly mention kiya jayega.
          </p>
        </div>
      </div>
    </section>
  );
}
