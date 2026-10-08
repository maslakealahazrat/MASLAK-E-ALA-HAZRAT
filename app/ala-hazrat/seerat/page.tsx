import Link from "next/link";
import AlaHazratSeerat from "@/components/AlaHazratSeerat";
import AlaHazratResearchSources from "@/components/AlaHazratResearchSources";
import AlaHazratResearchFacts from "@/components/AlaHazratResearchFacts";

export const metadata = {
  title: "Seerat-e-Ala Hazrat | Imam Ahmad Raza Khan",
  description:
    "Imam Ahmad Raza Khan Fazil-e-Barelvi ki zindagi, taleem, ilm, tasneefaat, roohani nisbat aur ilmī virasat ka detailed Seerat section.",
  alternates: {
    canonical: "/ala-hazrat/seerat",
  },
};

export default function AlaHazratSeeratPage() {
  return (
    <main className="alaHazratSeeratPage">
      <section className="alaHazratSeeratHero">
        <div className="alaHazratSeeratHeroInner">
          <Link
            href="/ala-hazrat"
            className="alaHazratSeeratBackLink"
          >
            ← Ala Hazrat
          </Link>

          <p className="alaHazratSeeratHeroEyebrow">
            IMAM AHMAD RAZA KHAN
          </p>

          <h1>Seerat-e-Ala Hazrat</h1>

          <p className="alaHazratSeeratHeroArabic">
            سیرتِ اعلیٰ حضرت
          </p>

          <p className="alaHazratSeeratHeroDescription">
            Ala Hazrat Imam Ahmad Raza Khan Fazil-e-Barelvi ki
            zindagi aur ilmī virasat ko ek organized, verified
            aur detailed format mein pesh karne ka dedicated section.
          </p>
        </div>
      </section>

      <AlaHazratSeerat />
      <AlaHazratResearchFacts />
      <AlaHazratResearchSources />
     
      <section className="alaHazratSeeratNote">
        <div className="alaHazratSeeratNoteInner">
          <p className="alaHazratSeeratNoteEyebrow">
            RESEARCH &amp; VERIFICATION
          </p>

          <h2>Verified Content</h2>

          <p>
            Is section mein biography aur Seerat se related content
            reliable sources, bibliographic records aur available
            scholarly references ko compare karke tayyar kiya jayega.
            Jahan source ya edition mein difference hoga, wahan usko
            clearly mention kiya jayega.
          </p>
        </div>
      </section>
    </main>
  );
}
