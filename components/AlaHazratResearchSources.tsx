"use client";

import { alaHazratSources } from "@/data/ala-hazrat";

export default function AlaHazratResearchSources() {
  return (
    <section className="alaHazratResearchSources">
      <div className="alaHazratResearchSourcesHeader">
        <p className="alaHazratResearchSourcesEyebrow">
          RESEARCH • SOURCES
        </p>

        <h2>Research Sources</h2>

        <p className="alaHazratResearchSourcesIntro">
          Ala Hazrat se related biography, bibliography, works aur
          research information ke liye use kiye gaye important sources.
        </p>
      </div>

      <div className="alaHazratResearchSourcesGrid">
        {alaHazratSources.map((source) => (
          <article
            key={source.id}
            className="alaHazratResearchSourceCard"
          >
            <div className="alaHazratResearchSourceTop">
              <span className="alaHazratResearchSourceType">
                {source.type.replace("-", " ")}
              </span>
            </div>

            <h3>{source.title}</h3>

            <p className="alaHazratResearchSourceOrganization">
              {source.organization}
            </p>

            <p className="alaHazratResearchSourceNote">
              {source.reliabilityNote}
            </p>

            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="alaHazratResearchSourceLink"
            >
              View Source
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
