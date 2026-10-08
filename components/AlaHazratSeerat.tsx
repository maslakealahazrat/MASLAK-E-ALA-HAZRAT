"use client";

import Link from "next/link";
import { alaHazratSeeratSections } from "@/data/ala-hazrat/seerat";

export default function AlaHazratSeerat() {
  return (
    <section className="alaHazratSeeratSection">
      <div className="alaHazratSeeratHeader">
        <p className="alaHazratSeeratEyebrow">
          SEERAT • LIFE • SCHOLARSHIP
        </p>

        <h2>Seerat-e-Ala Hazrat</h2>

        <p className="alaHazratSeeratIntro">
          Imam Ahmad Raza Khan Fazil-e-Barelvi ki zindagi, taleem,
          ilm, tasneefaat, roohani nisbat aur ilmī virasat ko
          ek organized aur verified format mein pesh kiya jayega.
        </p>
      </div>

      <div className="alaHazratSeeratGrid">
        {alaHazratSeeratSections.map((section, index) => {
          const isVerified = section.status === "verified";

          return (
            <article
              key={section.id}
              className={`alaHazratSeeratCard ${
                isVerified ? "isVerified" : "isInProgress"
              }`}
            >
              <div className="alaHazratSeeratNumber">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="alaHazratSeeratCardContent">
                <div className="alaHazratSeeratStatus">
                  {isVerified ? "Verified" : "Coming Soon"}
                </div>

                <h3>{section.title}</h3>

                <p>{section.description}</p>

                {isVerified ? (
                  <Link
                    href={`/ala-hazrat/seerat/${section.id}`}
                    className="alaHazratSeeratLink"
                  >
                    Read Section
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="alaHazratSeeratComingSoon">
                    Detailed Section Coming Soon
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
