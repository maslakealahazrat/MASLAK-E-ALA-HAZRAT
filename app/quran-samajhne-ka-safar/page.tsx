import Link from "next/link";
import { BookOpen, Sparkles, CheckCircle2, Compass, ArrowRight, Heart } from "lucide-react";

export const metadata = {
  title: "Qur’an Samajhne Ka Safar | Maslak-e-Ala Hazrat",
  description: "A comprehensive guided roadmap for learning, understanding, and reflecting upon the Holy Qur’an with Kanz-ul-Iman translation.",
};

export default function QuranSamajhneKaSafarPage() {
  const steps = [
    {
      step: 1,
      title: "Sahih Makharij & Tarteel (تلاوت و ترتیل)",
      description: "Qur'an ko saaf aur sahi makharij ke saath padhna pehla farz hai. Tilawat-e-Quran ki barkat aur roohani tasir se dil mein noor paida hota hai.",
      actionText: "Read Surah Al-Fatihah",
      actionHref: "/quran/1",
    },
    {
      step: 2,
      title: "Tarjuma Kanz-ul-Iman (فہمِ قرآن)",
      description: "Ala Hazrat Imam Ahmad Raza Khan ka mubarak tarjuma 'Kanz-ul-Iman' aisi adabi aur aqaidi ihtiyat ke saath likha gaya hai jisme Allah Ta'ala ki tauheed aur Huzoor Akram ﷺ ki shaan aur ta'zeem ka adna sa pehlu bhi mehfooz rehta hai.",
      actionText: "Explore Kanz-ul-Iman in Quran Reader",
      actionHref: "/quran",
    },
    {
      step: 3,
      title: "Gaur-o-Fikr & Tadabbur (تدبر و تفکر)",
      description: "Har ayat ke mafhum par ruk kar gaur karein — yeh kis mauqe par nazil hui, isme hamare liye kya naseehat hai, aur yeh hamare aamal ko kaise sudhar sakti hai.",
      actionText: "Read Surah Yaseen with Reflection",
      actionHref: "/quran/36",
    },
    {
      step: 4,
      title: "Amal aur Zindagi mein Nafaz (عمل بالقرآن)",
      description: "Hazrat Ayesha Siddiqa (RA) se jab Huzoor ﷺ ke akhlaq ke bare mein pucha gaya to unhone farmaya: 'Aap ﷺ ka khuluq Quran hi tha.' Quran ko samajhne ka asal maqsad zindagi ko uske mutabiq dhaalna hai.",
      actionText: "Start Daily Quran Journey",
      actionHref: "/quran",
    },
  ];

  return (
    <main className="contentPage" style={{ background: "var(--q-bg, #0b1a18)", color: "var(--q-text, #f0f7f5)", minHeight: "100vh" }}>
      <section className="contentHero" style={{ borderBottom: "1px solid var(--q-card-border, rgba(212, 175, 55, 0.2))" }}>
        <div className="contentHeroInner">
          <Link href="/quran" className="backHome">
            <span>←</span>
            Back to Quran Majeed
          </Link>

          <div className="contentArabic" style={{ color: "var(--q-arabic, #fffdf7)", fontFamily: "var(--font-arabic-uthmani)" }}>
            قرآن سمجھنے کا سفر
          </div>

          <div className="contentEyebrow">
            GUIDED STUDY ROADMAP
          </div>

          <h1 style={{ color: "var(--q-accent, #d4af37)" }}>Qur’an Samajhne Ka Safar</h1>

          <p style={{ color: "var(--q-translation, #c2dcd8)", fontSize: "16px", maxWidth: "680px", margin: "0 auto" }}>
            Ek structured aur ba-adab rasta jisme har Musalman Qur’an Majeed ko padh sake, uska tarjuma samajh sake, aur uski taleemat par amal kar sake.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gap: "24px" }}>
          {steps.map((item) => (
            <div
              key={item.step}
              style={{
                background: "var(--q-card, #122825)",
                border: "1px solid var(--q-card-border, rgba(212, 175, 55, 0.2))",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--q-badge-bg, #1e3f3a)",
                  color: "var(--q-badge-text, #e8d085)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "18px",
                  flexShrink: 0,
                  border: "1px solid var(--q-card-border, rgba(212, 175, 55, 0.25))",
                }}
              >
                0{item.step}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", color: "var(--q-accent, #d4af37)" }}>
                  {item.title}
                </h3>
                <p style={{ margin: "0 0 18px 0", fontSize: "15px", lineHeight: 1.7, color: "var(--q-translation, #c2dcd8)" }}>
                  {item.description}
                </p>
                <Link
                  href={item.actionHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--q-accent, #d4af37)",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>{item.actionText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SPECIAL BOX: KANZ UL IMAN */}
        <div
          style={{
            margin: "40px 0",
            padding: "32px",
            background: "radial-gradient(circle at top right, var(--q-card-hover, #16322e), var(--q-card, #122825))",
            border: "1px solid var(--q-accent, #d4af37)",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "var(--font-urdu, serif)", fontSize: "28px", color: "var(--q-accent, #d4af37)", marginBottom: "10px" }}>
            کنز الایمان فی ترجمۃ القرآن
          </div>
          <h2 style={{ fontSize: "22px", margin: "0 0 12px 0" }}>Imam Ahmad Raza Khan ka Shahkar Tarjuma</h2>
          <p style={{ maxWidth: "750px", margin: "0 auto 24px", lineHeight: 1.8, fontSize: "15px", color: "var(--q-translation, #c2dcd8)" }}>
            Kanz-ul-Iman ki sabse badi khubi yeh hai ke yeh aam lafzi tarjuma nahi balke Qur'an ke maqsad aur rooh ka tarjuma hai. Jahan kisi aam tarjume mein thodi si kotahi se galat fahmi ka andesha hota hai, wahan Ala Hazrat ne aisi kamil tehrir likhi hai jo aqaid-e-Ahle Sunnat aur ta'zeem-e-Risalat ka aaina-dar hai.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/quran"
              className="quranIconButton active"
              style={{ padding: "10px 24px", fontSize: "14px" }}
            >
              Open Quran Reader Now
            </Link>
            <Link
              href="/ala-hazrat/books/kanz-ul-iman"
              className="quranIconButton"
              style={{ padding: "10px 24px", fontSize: "14px" }}
            >
              About Kanz-ul-Iman History
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
