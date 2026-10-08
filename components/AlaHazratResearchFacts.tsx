"use client";

import {
  alaHazratResearchFactsWithSources,
  resolveAlaHazratSources,
} from "@/data/ala-hazrat";

function formatTopic(topic: string) {
  return topic
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function AlaHazratResearchFacts() {
  const verifiedFacts =
    alaHazratResearchFactsWithSources.filter(
      (fact) => fact.status === "verified"
    );

  return (
    <section className="alaHazratResearchFacts">
      <div className="alaHazratResearchFactsHeader">
        <p className="alaHazratResearchFactsEyebrow">
          RESEARCH • VERIFIED FACTS
        </p>

        <h2>Verified Research Facts</h2>

        <p className="alaHazratResearchFactsIntro">
          Ala Hazrat ki zindagi aur ilm se related documented
          research facts ko source references ke saath organized
          format mein pesh kiya gaya hai.
        </p>
      </div>

      <div className="alaHazratResearchFactsGrid">
        {verifiedFacts.map((fact) => {
          const sources = resolveAlaHazratSources(
            fact.sourceIds
          );

          return (
            <article
              key={fact.id}
              className="alaHazratResearchFactCard"
            >
              <div className="alaHazratResearchFactTop">
                <span className="alaHazratResearchFactTopic">
                  {formatTopic(fact.topic)}
                </span>

                <span className="alaHazratResearchFactStatus">
                  Verified
                </span>
              </div>

              <p className="alaHazratResearchFactClaim">
                {fact.claim}
              </p>

              {fact.notes && (
                <p className="alaHazratResearchFactNotes">
                  {fact.notes}
                </p>
              )}

              {sources.length > 0 && (
                <div className="alaHazratResearchFactSources">
                  <p className="alaHazratResearchFactSourcesTitle">
                    Sources
                  </p>

                  <div className="alaHazratResearchFactSourceList">
                    {sources.map((source) => (
                      <div
                        key={source.id}
                        className="alaHazratResearchFactSource"
                      >
                        <div>
                          <p className="alaHazratResearchFactSourceTitle">
                            {source.title}
                          </p>

                          <p className="alaHazratResearchFactSourceOrganization">
                            {source.organization}
                          </p>
                        </div>

                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="alaHazratResearchFactSourceLink"
                        >
                          View Source
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
