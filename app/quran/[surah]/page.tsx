import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quranAyahs } from "@/data/quran/ayahs";
import { supabase } from "@/lib/supabase";

type PageProps = {
params: Promise<{ surah: string }>;
};

type AyahRow = {
surah_number: number;
ayah_number: number;
arabic_text: string;
};

export async function generateMetadata({
params,
}: PageProps): Promise<Metadata> {
const { surah } = await params;
const number = Number(surah);

const firstAyah = quranAyahs.find(
(ayah) => ayah.surahNumber === number
);

if (
!Number.isInteger(number) ||
number < 1 ||
number > 114 ||
!firstAyah
) {
return {
title: "Surah Not Found",
robots: {
index: false,
follow: false,
},
};
}

return {
title: ${firstAyah.surahNameArabic} | Qur’an Majeed,
description: Read Surah ${firstAyah.surahNameArabic} in original Arabic text.,
alternates: {
canonical: /quran/${number},
},
openGraph: {
type: "website",
title: ${firstAyah.surahNameArabic} | Qur’an Majeed,
description: Read Surah ${firstAyah.surahNameArabic} in original Arabic text.,
url: /quran/${number},
siteName: "Maslak-e-Ala Hazrat",
},
};
}

export default async function SurahPage({
params,
}: PageProps) {
const { surah } = await params;
const surahNumber = Number(surah);

if (
!Number.isInteger(surahNumber) ||
surahNumber < 1 ||
surahNumber > 114
) {
notFound();
}

const localAyahs = quranAyahs.filter(
(ayah) => ayah.surahNumber === surahNumber
);

if (localAyahs.length === 0) {
notFound();
}

let ayahs: AyahRow[] = localAyahs.map((ayah) => ({
surah_number: ayah.surahNumber,
ayah_number: ayah.ayahNumber,
arabic_text: ayah.arabic,
}));

if (supabase) {
try {
const { data, error } = await supabase
.from("quran_ayahs")
.select("surah_number, ayah_number, arabic_text")
.eq("surah_number", surahNumber)
.order("ayah_number", { ascending: true });

if (!error && data && data.length > 0) {  
    ayahs = data as AyahRow[];  
  }  
} catch {  
  // Use local Arabic Quran data if the database is unavailable.  
}

}

const firstAyah = localAyahs[0];

const previousSurah =
surahNumber > 1 ? surahNumber - 1 : null;

const nextSurah =
surahNumber < 114 ? surahNumber + 1 : null;

return (
<main className="quranSurahPage">
<section className="quranSurahHero">
<Link href="/quran" className="quranBack">
← All Surahs
</Link>

<div  
      className="quranSurahArabic"  
      dir="rtl"  
      lang="ar"  
    >  
      {firstAyah.surahNameArabic}  
    </div>  

    <h1>{firstAyah.surahNameArabic}</h1>  

    <p>سورة رقم {surahNumber}</p>  

    <p>القرآن الكريم</p>  
  </section>  

  <nav  
    className="quranSurahNavigation"  
    aria-label="Surah navigation"  
  >  
    <div className="quranSurahNavSide">  
      {previousSurah ? (  
        <Link  
          href={`/quran/${previousSurah}`}  
          className="quranSurahNavButton"  
        >  
          ← Previous  
        </Link>  
      ) : (  
        <span className="quranSurahNavButton disabled">  
          ← Previous  
        </span>  
      )}  
    </div>  

    <div className="quranSurahNavCenter">  
      <Link  
        href="/quran"  
        className="quranSurahListButton"  
      >  
        Surah List  
      </Link>  
    </div>  

    <div className="quranSurahNavSide quranSurahNavRight">  
      {nextSurah ? (  
        <Link  
          href={`/quran/${nextSurah}`}  
          className="quranSurahNavButton"  
        >  
          Next →  
        </Link>  
      ) : (  
        <span className="quranSurahNavButton disabled">  
          Next →  
        </span>  
      )}  
    </div>  
  </nav>  

  <section className="ayahPageContent">  
    {ayahs.map((ayah) => (  
      <article  
        key={ayah.ayah_number}  
        id={`ayah-${ayah.ayah_number}`}  
        className="quranAyahCard"  
      >  
        <div className="quranAyahCardNumber">  
          آية {ayah.ayah_number}  
        </div>  

        <div  
          className="quranInlineArabic"  
          dir="rtl"  
          lang="ar"  
        >  
          {ayah.arabic_text}  
          {" "}  
          <span className="quranInlineNumber">  
            ﴿{ayah.ayah_number}﴾  
          </span>  
        </div>  
      </article>  
    ))}  
  </section>  

  <nav  
    className="quranSurahNavigation quranSurahNavigationBottom"  
    aria-label="Surah navigation"  
  >  
    <div className="quranSurahNavSide">  
      {previousSurah ? (  
        <Link  
          href={`/quran/${previousSurah}`}  
          className="quranSurahNavButton"  
        >  
          ← Previous  
        </Link>  
      ) : (  
        <span className="quranSurahNavButton disabled">  
          ← Previous  
        </span>  
      )}  
    </div>  

    <div className="quranSurahNavCenter">  
      <Link  
        href="/quran"  
        className="quranSurahListButton"  
      >  
        Surah List  
      </Link>  
    </div>  

    <div className="quranSurahNavSide quranSurahNavRight">  
      {nextSurah ? (  
        <Link  
          href={`/quran/${nextSurah}`}  
          className="quranSurahNavButton"  
        >  
          Next →  
        </Link>  
      ) : (  
        <span className="quranSurahNavButton disabled">  
          Next →  
        </span>  
      )}  
    </div>  
  </nav>  

  <section className="quranSource">  
    <p>  
      Arabic Qur’an text sourced from the Tanzil Project.  
    </p>  

    <a  
      href="https://tanzil.net/"  
      target="_blank"  
      rel="noopener noreferrer"  
    >  
      Tanzil Project  
    </a>  
  </section>  
</main>

);
}
