import Link from "next/link";

type ContentPageProps = {
  title: string;
  arabic?: string;
  description: string;
  children?: React.ReactNode;
};

export default function ContentPage({
  title,
  arabic,
  description,
  children,
}: ContentPageProps) {
  return (
    <main className="contentPage">

      {/* PAGE HERO */}
      <section className="contentHero">
        <div className="contentHeroInner">

          <Link href="/" className="backHome">
            <span>←</span>
            Home
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

        {children || (
          <div className="comingBox">

            <div className="comingIcon">﷽</div>

            <span className="comingLabel">
              COMING SOON
            </span>

            <h2>{title}</h2>

            <p>
              Is section par Islamic content jald
              InshaAllah add kiya jayega.
            </p>

          </div>
        )}

      </section>

    </main>
  );
}
