"use client";

import {
  alaHazratResearchFactsWithSources,
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
        {verifiedFacts.map((fact) => (
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

            <div className="alaHazratResearchFactMeta">
              <span>
                {fact.sourceCount}{" "}
                {fact.sourceCount === 1
                  ? "Source"
                  : "Sources"}
              </span>
            </div>

            {fact.notes && (
              <p className="alaHazratResearchFactNotes">
                {fact.notes}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
