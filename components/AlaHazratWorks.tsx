"use client";

import Link from "next/link";
import { alaHazratWorks } from "@/data/ala-hazrat/works";

export default function AlaHazratWorks() {
  return (
    <section className="alaHazratWorks">
      <div className="alaHazratWorksHeader">
        <p className="alaHazratWorksEyebrow">
          ALA HAZRAT
        </p>

        <h2>Books &amp; Works</h2>

        <p className="alaHazratWorksIntro">
          Explore the books and literary works of Imam Ahmad Raza Khan
          separately, with each work having its own dedicated section.
        </p>
      </div>

      <div className="alaHazratWorksGrid">
        {alaHazratWorks.map((work) => {
          const isAvailable = work.status === "available";

          return (
            <article
              key={work.slug}
              className={`alaHazratWorkCard ${
                !isAvailable ? "isComingSoon" : ""
              }`}
            >
              <div className="alaHazratWorkIcon">📖</div>

              <div className="alaHazratWorkContent">
                <h3>{work.title}</h3>

                {work.description && (
                  <p>{work.description}</p>
                )}

                {isAvailable ? (
                  <Link
                    href={work.href}
                    className="alaHazratWorkLink"
                  >
                    Open Book
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="alaHazratWorkComingSoon">
                    Coming Soon
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
