import { readFile } from "node:fs/promises";
import path from "node:path";

let urduMap: Map<string, string> | null = null;
let englishMap: Map<string, string> | null = null;

async function loadFileMap(filename: string): Promise<Map<string, string>> {
  const filePath = path.join(process.cwd(), "data", "translations", filename);
  const content = await readFile(filePath, "utf-8");
  const map = new Map<string, string>();
  
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const firstSep = line.indexOf("|");
    if (firstSep === -1) continue;
    const secondSep = line.indexOf("|", firstSep + 1);
    if (secondSep === -1) continue;
    
    const surah = line.slice(0, firstSep).trim();
    const ayah = line.slice(firstSep + 1, secondSep).trim();
    const text = line.slice(secondSep + 1).trim();
    
    map.set(`${surah}:${ayah}`, text);
  }
  return map;
}

export async function getTranslationsForSurah(surahNumber: number): Promise<{
  urdu: Record<number, string>;
  english: Record<number, string>;
}> {
  if (!urduMap) {
    try {
      urduMap = await loadFileMap("ur.kanzuliman.txt");
    } catch (e) {
      console.error("Failed to load ur.kanzuliman.txt:", e);
      urduMap = new Map();
    }
  }
  
  if (!englishMap) {
    try {
      englishMap = await loadFileMap("en.ahmedraza.txt");
    } catch (e) {
      console.error("Failed to load en.ahmedraza.txt:", e);
      englishMap = new Map();
    }
  }

  const urdu: Record<number, string> = {};
  const english: Record<number, string> = {};

  for (let ayah = 1; ayah <= 300; ayah++) {
    const key = `${surahNumber}:${ayah}`;
    const uText = urduMap.get(key);
    const eText = englishMap.get(key);
    if (!uText && !eText) break;
    if (uText) urdu[ayah] = uText;
    if (eText) english[ayah] = eText;
  }

  return { urdu, english };
}
