import { NextRequest, NextResponse } from "next/server";
import { getTranslationsForSurah } from "@/lib/translations-loader";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahParam = searchParams.get("surah");
  const surahNumber = Number(surahParam) || 1;

  if (surahNumber < 1 || surahNumber > 114) {
    return NextResponse.json({ error: "Invalid surah number" }, { status: 400 });
  }

  const { urdu, english } = await getTranslationsForSurah(surahNumber);
  return NextResponse.json({
    surahNumber,
    urdu,
    english,
  });
}
