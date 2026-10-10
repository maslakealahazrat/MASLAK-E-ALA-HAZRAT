import AlaHazratBookPage from "@/components/AlaHazratBookPage";
import KanzUlImanReader from "@/components/kanz-ul-iman-reader";
import { quranAyahs } from "@/data/quran/ayahs";

export default function KanzUlImanPage() {
const readerAyahs = quranAyahs.map((ayah) => ({
surahNumber: ayah.surahNumber,
ayahNumber: ayah.ayahNumber,
arabic: ayah.arabic,
translations: {},
}));

return (
<AlaHazratBookPage
title="Kanz-ul-Iman"
arabic="کنز الایمان"
description="Kanz-ul-Iman, Imam Ahmad Raza Khan ki mashhoor Urdu Qur'an translation hai. Is section mein verified text, references aur source material ko carefully organize kiya jayega."
status="available"
>
<KanzUlImanReader ayahs={readerAyahs} />
</AlaHazratBookPage>
);
}
