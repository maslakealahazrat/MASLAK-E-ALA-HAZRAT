import AlaHazratBookPage from "@/components/AlaHazratBookPage";

export default function KanzUlImanPage() {
  return (
    <AlaHazratBookPage
      title="Kanz-ul-Iman"
      arabic="کنز الایمان"
      description="Kanz-ul-Iman, Imam Ahmad Raza Khan ki mashhoor Urdu Qur'an translation hai. Is section mein verified text, references aur source material ko carefully organize kiya jayega."
      status="available"
    >
      <div className="comingBox">
        <div className="comingIcon">﷽</div>

        <span className="comingLabel">
          CONTENT PREPARATION
        </span>

        <h2>Kanz-ul-Iman</h2>

        <p>
          Kanz-ul-Iman ka verified content aur references
          InshaAllah is dedicated section mein add kiye jayenge.
        </p>
      </div>
    </AlaHazratBookPage>
  );
}
