import Link from "next/link";

type AlaHazratBookPageProps = {
  title: string;
  arabic?: string;
  description: string;
  status?: "available" | "coming-soon";
  children?: React.ReactNode;
};

export default function AlaHazratBookPage({
  title,
  arabic,
  description,
  status = "coming-soon",
  children,
}: AlaHazratBookPageProps) {
  const isComingSoon = status === "coming-soon";

  return (
    <main className="alaHazratBookPage">

      {/* PAGE HERO */}
      <section className="contentHero">
        <div className="contentHeroInner">

          <Link href="/ala-hazrat/books" className="backHome">
            <span>←</span>
            Books &amp; Works
          </Link>

          {arabic && (
            <div className="contentArabic">
              {arabic}
            </div>
          )}

          <div className="contentEyebrow">
            MASLAK-E-ALA-HAZRAT
          </div>

          <h1>{title}</h1>

          <p>{description}</p>

        </div>
      </section>

      {/* PAGE CONTENT */}
      <section className="contentBody">

        {isComingSoon ? (
          <div className="comingBox">

            <div className="comingIcon">﷽</div>

            <span className="comingLabel">
              COMING SOON
            </span>

            <h2>{title}</h2>

            <p>
              Is kitab ka verified Islamic content, references aur
              source material InshaAllah jald add kiya jayega.
            </p>

          </div>
        ) : (
          children || (
            <div className="comingBox">

              <div className="comingIcon">﷽</div>

              <h2>{title}</h2>

              <p>
                Is kitab ka content jald InshaAllah add kiya jayega.
              </p>

            </div>
          )
        )}

      </section>

    </main>
  );
}
