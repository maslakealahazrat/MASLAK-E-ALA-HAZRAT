export type SurahMeta = {
number: number;
nameArabic: string;
nameEnglish: string;
nameUrdu: string;
meaningEnglish: string;
type: "Meccan" | "Medinan";
ayahCount: number;
revelationOrder: number;
rukus: number;
juzStart: number;
hasSajdah?: boolean;
sajdahAyahs?: number[];
overview: string;
virtues?: string;
};

export type JuzMeta = {
juzNumber: number;
nameArabic: string;
nameEnglish: string;
nameUrdu: string;
startSurah: number;
startAyah: number;
endSurah: number;
endAyah: number;
};

export const JUZ_LIST: JuzMeta[] = [
{ juzNumber: 1, nameArabic: "الم", nameEnglish: "Alif Lam Meem", nameUrdu: "الم", startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 141 },
{ juzNumber: 2, nameArabic: "سَيَقُولُ", nameEnglish: "Sayaqool", nameUrdu: "سیقول", startSurah: 2, startAyah: 142, endSurah: 2, endAyah: 252 },
{ juzNumber: 3, nameArabic: "تِلْكَ الرُّسُلُ", nameEnglish: "Tilkar Rusul", nameUrdu: "تلک الرسل", startSurah: 2, startAyah: 253, endSurah: 3, endAyah: 92 },
{ juzNumber: 4, nameArabic: "لَنْ تَنَالُوا", nameEnglish: "Lan Tanaalu", nameUrdu: "لن تنالوا", startSurah: 3, startAyah: 93, endSurah: 4, endAyah: 23 },
{ juzNumber: 5, nameArabic: "وَالْمُحْصَنَاتُ", nameEnglish: "Wal Muhsanat", nameUrdu: "والمحصنات", startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147 },
{ juzNumber: 6, nameArabic: "لَا يُحِبُّ اللَّهُ", nameEnglish: "La Yuhibbullah", nameUrdu: "لا یحب اللہ", startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81 },
{ juzNumber: 7, nameArabic: "وَإِذَا سَمِعُوا", nameEnglish: "Wa Iza Samiu", nameUrdu: "واذا سمعوا", startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110 },
{ juzNumber: 8, nameArabic: "وَلَوْ أَنَّنَا", nameEnglish: "Wa Lau Annana", nameUrdu: "ولو اننا", startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87 },
{ juzNumber: 9, nameArabic: "قَالَ الْمَلَأُ", nameEnglish: "Qalal Mala'u", nameUrdu: "قال الملأ", startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40 },
{ juzNumber: 10, nameArabic: "وَاعْلَمُوا", nameEnglish: "Wa'lamoo", nameUrdu: "واعلموا", startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92 },
{ juzNumber: 11, nameArabic: "يَعْتَذِرُونَ", nameEnglish: "Ya'taziroona", nameUrdu: "یعتذرون", startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5 },
{ juzNumber: 12, nameArabic: "وَمَا مِنْ دَابَّةٍ", nameEnglish: "Wa Mamin Da'abbah", nameUrdu: "وما من دابۃ", startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52 },
{ juzNumber: 13, nameArabic: "وَمَا أُبَرِّئُ", nameEnglish: "Wa Ma Ubarri'u", nameUrdu: "وما أبرئ", startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52 },
{ juzNumber: 14, nameArabic: "رُبَمَا", nameEnglish: "Rubama", nameUrdu: "ربما", startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128 },
{ juzNumber: 15, nameArabic: "سُبْحَانَ الَّذِي", nameEnglish: "Subhanallazi", nameUrdu: "سبحان الذی", startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74 },
{ juzNumber: 16, nameArabic: "قَالَ أَلَمْ", nameEnglish: "Qala Alam", nameUrdu: "قال ألم", startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135 },
{ juzNumber: 17, nameArabic: "اقْتَرَبَ لِلنَّاسِ", nameEnglish: "Iqtaraba Linnaas", nameUrdu: "اقترب للناس", startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78 },
{ juzNumber: 18, nameArabic: "قَدْ أَفْلَحَ", nameEnglish: "Qad Aflaha", nameUrdu: "قد أفلح", startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20 },
{ juzNumber: 19, nameArabic: "وَقَالَ الَّذِينَ", nameEnglish: "Wa Qalal Lazeena", nameUrdu: "وقال الذين", startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55 },
{ juzNumber: 20, nameArabic: "أَمَّنْ خَلَقَ", nameEnglish: "Amman Khalaqa", nameUrdu: "أمن خلق", startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45 },
{ juzNumber: 21, nameArabic: "اتْلُ مَا أُوحِيَ", nameEnglish: "Utlu Ma Oohiya", nameUrdu: "اتل ما أوحي", startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30 },
{ juzNumber: 22, nameArabic: "وَمَنْ يَقْنُتْ", nameEnglish: "Wa May Yaqnut", nameUrdu: "ومن يقنت", startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27 },
{ juzNumber: 23, nameArabic: "وَمَا لِيَ", nameEnglish: "Wa Maliya", nameUrdu: "وما لي", startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31 },
{ juzNumber: 24, nameArabic: "فَمَنْ أَظْلَمُ", nameEnglish: "Faman Azlamu", nameUrdu: "فمن أظلم", startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46 },
{ juzNumber: 25, nameArabic: "إِلَيْهِ يُرَدُّ", nameEnglish: "Ilaihi Yuraddu", nameUrdu: "إليه يرد", startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37 },
{ juzNumber: 26, nameArabic: "حم", nameEnglish: "Ha'a Meem", nameUrdu: "حم", startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30 },
{ juzNumber: 27, nameArabic: "قَالَ فَمَا خَطْبُكُمْ", nameEnglish: "Qala Fama Khatbukum", nameUrdu: "قال فما خطبکم", startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29 },
{ juzNumber: 28, nameArabic: "قَدْ سَمِعَ اللَّهُ", nameEnglish: "Qad Sami Allah", nameUrdu: "قد سمع اللہ", startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12 },
{ juzNumber: 29, nameArabic: "تَبَارَكَ الَّذِي", nameEnglish: "Tabarakallazi", nameUrdu: "تبارک الذی", startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50 },
{ juzNumber: 30, nameArabic: "عَمَّ", nameEnglish: "Amma Yatasa'alun", nameUrdu: "عم", startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6 },
];

const SURAH_ROWS = [
["الفاتحة", "Al-Fatihah", "The Opening", 7, 5],
["البقرة", "Al-Baqarah", "The Cow", 286, 87],
["آل عمران", "Aal-e-Imran", "The Family of Imran", 200, 89],
["النساء", "An-Nisa", "The Women", 176, 92],
["المائدة", "Al-Ma'idah", "The Table Spread", 120, 112],
["الأنعام", "Al-An'am", "The Cattle", 165, 55],
["الأعراف", "Al-A'raf", "The Heights", 206, 39],
["الأنفال", "Al-Anfal", "The Spoils of War", 75, 88],
["التوبة", "At-Tawbah", "The Repentance", 129, 113],
["يونس", "Yunus", "Jonah", 109, 51],
["هود", "Hud", "Hud", 123, 52],
["يوسف", "Yusuf", "Joseph", 111, 53],
["الرعد", "Ar-Ra'd", "The Thunder", 43, 96],
["إبراهيم", "Ibrahim", "Abraham", 52, 72],
["الحجر", "Al-Hijr", "The Rocky Tract", 99, 54],
["النحل", "An-Nahl", "The Bee", 128, 70],
["الإسراء", "Al-Isra", "The Night Journey", 111, 50],
["الكهف", "Al-Kahf", "The Cave", 110, 69],
["مريم", "Maryam", "Mary", 98, 44],
["طه", "Ta-Ha", "Ta-Ha", 135, 45],
["الأنبياء", "Al-Anbiya", "The Prophets", 112, 73],
["الحج", "Al-Hajj", "The Pilgrimage", 78, 103],
["المؤمنون", "Al-Mu'minoon", "The Believers", 118, 74],
["النور", "An-Nur", "The Light", 64, 102],
["الفرقان", "Al-Furqan", "The Criterion", 77, 42],
["الشعراء", "Ash-Shu'ara", "The Poets", 227, 47],
["النمل", "An-Naml", "The Ant", 93, 48],
["القصص", "Al-Qasas", "The Stories", 88, 49],
["العنكبوت", "Al-Ankabut", "The Spider", 69, 85],
["الروم", "Ar-Rum", "The Romans", 60, 84],
["لقمان", "Luqman", "Luqman", 34, 57],
["السجدة", "As-Sajdah", "The Prostration", 30, 75],
["الأحزاب", "Al-Ahzab", "The Confederates", 73, 90],
["سبأ", "Saba", "Sheba", 54, 58],
["فاطر", "Fatir", "The Originator", 45, 43],
["يس", "Ya-Seen", "Ya-Seen", 83, 41],
["الصافات", "As-Saffat", "Those Ranged in Ranks", 182, 56],
["ص", "Sad", "Sad", 88, 38],
["الزمر", "Az-Zumar", "The Troops", 75, 59],
["غافر", "Ghafir", "The Forgiver", 85, 60],
["فصلت", "Fussilat", "Explained in Detail", 54, 61],
["الشورى", "Ash-Shura", "Consultation", 53, 62],
["الزخرف", "Az-Zukhruf", "Ornaments of Gold", 89, 63],
["الدخان", "Ad-Dukhan", "The Smoke", 59, 64],
["الجاثية", "Al-Jathiyah", "The Kneeling", 37, 65],
["الأحقاف", "Al-Ahqaf", "The Wind-Curved Sandhills", 35, 66],
["محمد", "Muhammad", "Muhammad", 38, 95],
["الفتح", "Al-Fath", "The Victory", 29, 111],
["الحجرات", "Al-Hujurat", "The Rooms", 18, 106],
["ق", "Qaf", "Qaf", 45, 34],
["الذاريات", "Adh-Dhariyat", "The Winnowing Winds", 60, 67],
["الطور", "At-Tur", "The Mount", 49, 76],
["النجم", "An-Najm", "The Star", 62, 23],
["القمر", "Al-Qamar", "The Moon", 55, 37],
["الرحمن", "Ar-Rahman", "The Beneficent", 78, 97],
["الواقعة", "Al-Waqi'ah", "The Inevitable", 96, 46],
["الحديد", "Al-Hadid", "The Iron", 29, 94],
["المجادلة", "Al-Mujadilah", "The Pleading Woman", 22, 105],
["الحشر", "Al-Hashr", "The Exile", 24, 101],
["الممتحنة", "Al-Mumtahanah", "The Tested Woman", 13, 91],
["الصف", "As-Saff", "The Ranks", 14, 109],
["الجمعة", "Al-Jumu'ah", "Friday", 11, 110],
["المنافقون", "Al-Munafiqun", "The Hypocrites", 11, 104],
["التغابن", "At-Taghabun", "Mutual Disillusion", 18, 108],
["الطلاق", "At-Talaq", "Divorce", 12, 99],
["التحريم", "At-Tahrim", "The Prohibition", 12, 107],
["الملك", "Al-Mulk", "The Sovereignty", 30, 77],
["القلم", "Al-Qalam", "The Pen", 52, 2],
["الحاقة", "Al-Haqqah", "The Reality", 52, 78],
["المعارج", "Al-Ma'arij", "The Ascending Stairways", 44, 79],
["نوح", "Nuh", "Noah", 28, 71],
["الجن", "Al-Jinn", "The Jinn", 28, 40],
["المزمل", "Al-Muzzammil", "The Enshrouded One", 20, 3],
["المدثر", "Al-Muddaththir", "The Cloaked One", 56, 4],
["القيامة", "Al-Qiyamah", "The Resurrection", 40, 31],
["الإنسان", "Al-Insan", "Man", 31, 98],
["المرسلات", "Al-Mursalat", "The Emissaries", 50, 33],
["النبأ", "An-Naba", "The Tidings", 40, 80],
["النازعات", "An-Nazi'at", "Those Who Drag Forth", 46, 81],
["عبس", "Abasa", "He Frowned", 42, 24],
["التكوير", "At-Takwir", "The Overthrowing", 29, 7],
["الانفطار", "Al-Infitar", "The Cleaving", 19, 82],
["المطففين", "Al-Mutaffifin", "The Defrauding", 36, 86],
["الانشقاق", "Al-Inshiqaq", "The Splitting Open", 25, 83],
["البروج", "Al-Buruj", "The Constellations", 22, 27],
["الطارق", "At-Tariq", "The Morning Star", 17, 36],
["الأعلى", "Al-A'la", "The Most High", 19, 8],
["الغاشية", "Al-Ghashiyah", "The Overwhelming", 26, 68],
["الفجر", "Al-Fajr", "The Dawn", 30, 10],
["البلد", "Al-Balad", "The City", 20, 35],
["الشمس", "Ash-Shams", "The Sun", 15, 26],
["الليل", "Al-Layl", "The Night", 21, 9],
["الضحى", "Ad-Duha", "The Morning Hours", 11, 11],
["الشرح", "Ash-Sharh", "The Relief", 8, 12],
["التين", "At-Tin", "The Fig", 8, 28],
["العلق", "Al-Alaq", "The Clot", 19, 1],
["القدر", "Al-Qadr", "The Power", 5, 25],
["البينة", "Al-Bayyinah", "The Clear Proof", 8, 100],
["الزلزلة", "Az-Zalzalah", "The Earthquake", 8, 93],
["العاديات", "Al-Adiyat", "The Courser", 11, 14],
["القارعة", "Al-Qari'ah", "The Calamity", 11, 30],
["التكاثر", "At-Takathur", "Rivalry in Worldly Increase", 8, 16],
["العصر", "Al-Asr", "The Declining Day", 3, 13],
["الهمزة", "Al-Humazah", "The Slanderer", 9, 32],
["الفيل", "Al-Fil", "The Elephant", 5, 19],
["قريش", "Quraysh", "Quraysh", 4, 29],
["الماعون", "Al-Ma'un", "Small Kindnesses", 7, 17],
["الكوثر", "Al-Kawthar", "Abundance", 3, 15],
["الكافرون", "Al-Kafirun", "The Disbelievers", 6, 18],
["النصر", "An-Nasr", "The Divine Support", 3, 114],
["المسد", "Al-Masad", "The Palm Fibre", 5, 6],
["الإخلاص", "Al-Ikhlas", "The Sincerity", 4, 22],
["الفلق", "Al-Falaq", "The Daybreak", 5, 20],
["الناس", "An-Nas", "Mankind", 6, 21],
] as const;

const MEDINAN_SURAHS = new Set([
2, 3, 4, 5, 8, 9, 13, 22, 24, 33, 47, 48, 49, 57, 58, 59,
60, 61, 62, 63, 64, 65, 66, 76, 98, 110,
]);

function getSurahJuzStart(surahNumber: number): number {
let result = 1;

for (const juz of JUZ_LIST) {
if (surahNumber >= juz.startSurah) {
result = juz.juzNumber;
}
}

return result;
}

const SAJDAH_AYahs: Record<number, number[]> = {
7: [206],
13: [15],
16: [50],
17: [109],
19: [58],
22: [18, 77],
25: [60],
27: [26],
32: [15],
38: [24],
41: [38],
53: [62],
84: [21],
96: [19],
};

export const SURAH_METADATA: Record<number, SurahMeta> = {};

export const ALL_SURAHS: SurahMeta[] = SURAH_ROWS.map(
([nameArabic, nameEnglish, meaningEnglish, ayahCount, revelationOrder], index) => {
const number = index + 1;
const sajdahAyahs = SAJDAH_AYahs[number];

const item: SurahMeta = {
  number,
  nameArabic,
  nameEnglish,
  nameUrdu: `سورۃ ${nameArabic}`,
  meaningEnglish,
  type: MEDINAN_SURAHS.has(number) ? "Medinan" : "Meccan",
  ayahCount,
  revelationOrder,
  rukus: Math.ceil(ayahCount / 10),
  juzStart: getSurahJuzStart(number),
  overview: `${nameEnglish} — ${meaningEnglish}. Surah ${number} of the Holy Quran, containing ${ayahCount} ayahs.`,
  ...(sajdahAyahs
    ? { hasSajdah: true, sajdahAyahs }
    : {}),
};

SURAH_METADATA[number] = item;
return item;

}
);
