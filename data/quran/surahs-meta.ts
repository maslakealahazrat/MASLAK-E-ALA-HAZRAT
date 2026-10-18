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
  { juzNumber: 5, nameArabic: "وَالْمُحْصَنَاتُ", nameEnglish: "Wal Muhsanat", nameUrdu: "والمحصنت", startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147 },
  { juzNumber: 6, nameArabic: "لَا يُحِبُّ اللَّهُ", nameEnglish: "La Yuhibbullah", nameUrdu: "لا یحب اللہ", startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81 },
  { juzNumber: 7, nameArabic: "وَإِذَا سَمِعُوا", nameEnglish: "Wa Iza Samiu", nameUrdu: "واذا سمعوا", startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110 },
  { juzNumber: 8, nameArabic: "وَلَوْ أَنَّنَا", nameEnglish: "Wa Lau Annana", nameUrdu: "ولو اننا", startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87 },
  { juzNumber: 9, nameArabic: "قَالَ الْمَلَأُ", nameEnglish: "Qalal Mala'u", nameUrdu: "قال الملاء", startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40 },
  { juzNumber: 10, nameArabic: "وَاعْلَمُوا", nameEnglish: "Wa'lamoo", nameUrdu: "واعلموا", startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92 },
  { juzNumber: 11, nameArabic: "يَعْتَذِرُونَ", nameEnglish: "Ya'taziroona", nameUrdu: "یعتذرون", startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5 },
  { juzNumber: 12, nameArabic: "وَمَا مِنْ دَابَّةٍ", nameEnglish: "Wa Mamin Da'abbah", nameUrdu: "وما من دابۃ", startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52 },
  { juzNumber: 13, nameArabic: "وَمَا أُبَرِّئُ", nameEnglish: "Wa Ma Ubarri'u", nameUrdu: "وما ابرئ", startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52 },
  { juzNumber: 14, nameArabic: "رُبَمَا", nameEnglish: "Rubama", nameUrdu: "ربما", startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128 },
  { juzNumber: 15, nameArabic: "سُبْحَانَ الَّذِي", nameEnglish: "Subhanallazi", nameUrdu: "سبحٰن الذی", startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74 },
  { juzNumber: 16, nameArabic: "قَالَ أَلَمْ", nameEnglish: "Qala Alam", nameUrdu: "قال الم", startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135 },
  { juzNumber: 17, nameArabic: "اقْتَرَبَ لِلنَّاسِ", nameEnglish: "Iqtaraba Linnaas", nameUrdu: "اقترب للناس", startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78 },
  { juzNumber: 18, nameArabic: "قَدْ أَفْلَحَ", nameEnglish: "Qad Aflaha", nameUrdu: "قد افلح", startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20 },
  { juzNumber: 19, nameArabic: "وَقَالَ الَّذِينَ", nameEnglish: "Wa Qalal Lazeena", nameUrdu: "وقال الذین", startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55 },
  { juzNumber: 20, nameArabic: "أَمَّنْ خَلَقَ", nameEnglish: "Amman Khalaqa", nameUrdu: "امن خلق", startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45 },
  { juzNumber: 21, nameArabic: "اتْلُ مَا أُوحِيَ", nameEnglish: "Utlu Ma Oohiya", nameUrdu: "اتل ما اوحی", startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30 },
  { juzNumber: 22, nameArabic: "وَمَنْ يَقْنُتْ", nameEnglish: "Wa May Yaqnut", nameUrdu: "ومن یقنت", startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27 },
  { juzNumber: 23, nameArabic: "وَمَا لِيَ", nameEnglish: "Wa Maliya", nameUrdu: "وما لی", startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31 },
  { juzNumber: 24, nameArabic: "فَمَنْ أَظْلَمُ", nameEnglish: "Faman Azlamu", nameUrdu: "فمن اظلم", startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46 },
  { juzNumber: 25, nameArabic: "إِلَيْهِ يُرَدُّ", nameEnglish: "Ilaihi Yuraddu", nameUrdu: "الیہ یرد", startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37 },
  { juzNumber: 26, nameArabic: "حم", nameEnglish: "Ha'a Meem", nameUrdu: "حم", startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30 },
  { juzNumber: 27, nameArabic: "قَالَ فَمَا خَطْبُكُمْ", nameEnglish: "Qala Fama Khatbukum", nameUrdu: "قال فما خطبکم", startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29 },
  { juzNumber: 28, nameArabic: "قَدْ سَمِعَ اللَّهُ", nameEnglish: "Qad Sami Allah", nameUrdu: "قد سمع اللہ", startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12 },
  { juzNumber: 29, nameArabic: "تَبَارَكَ الَّذِي", nameEnglish: "Tabarakallazi", nameUrdu: "تبارک الذی", startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50 },
  { juzNumber: 30, nameArabic: "عَمَّ", nameEnglish: "Amma Yatasa'alun", nameUrdu: "عم یتساءلون", startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6 },
];

export const SURAH_METADATA: Record<number, SurahMeta> = {
  1: {
    number: 1,
    nameArabic: "الفاتحة",
    nameEnglish: "Al-Fatihah",
    nameUrdu: "سورۃ الفاتحہ",
    meaningEnglish: "The Opening",
    type: "Meccan",
    ayahCount: 7,
    revelationOrder: 5,
    rukus: 1,
    juzStart: 1,
    overview: "Umm-ul-Quran (The Mother of the Book), recited in every unit of Salah. A complete prayer for divine guidance and mercy.",
    virtues: "Declared by the Prophet ﷺ as the greatest Surah in the Quran. He described it as Ash-Shifa (the cure)."
  },
  2: {
    number: 2,
    nameArabic: "البقرة",
    nameEnglish: "Al-Baqarah",
    nameUrdu: "سورۃ البقرہ",
    meaningEnglish: "The Cow",
    type: "Medinan",
    ayahCount: 286,
    revelationOrder: 87,
    rukus: 40,
    juzStart: 1,
    overview: "The longest chapter of the Quran, encompassing laws, faith, history of Prophet Adam, Abraham, Moses, and the pinnacle verse Ayat al-Kursi.",
    virtues: "Satan flees from the home where Surah Al-Baqarah is recited. Contains Ayat al-Kursi (2:255), the master verse of the Quran."
  },
  3: {
    number: 3,
    nameArabic: "آل عمران",
    nameEnglish: "Aal-e-Imran",
    nameUrdu: "سورۃ آلِ عمران",
    meaningEnglish: "The Family of Imran",
    type: "Medinan",
    ayahCount: 200,
    revelationOrder: 89,
    rukus: 20,
    juzStart: 3,
    overview: "Focuses on the purity of monotheism, the virgin birth of Isa (Jesus), the battle of Uhud, steadfastness, and unity of the Muslim Ummah.",
    virtues: "Together with Al-Baqarah, named 'Az-Zahrawayn' (the two bright radiant lights) which will provide shade on the Day of Judgment."
  },
  4: {
    number: 4,
    nameArabic: "النساء",
    nameEnglish: "An-Nisa",
    nameUrdu: "سورۃ النساء",
    meaningEnglish: "The Women",
    type: "Medinan",
    ayahCount: 176,
    revelationOrder: 92,
    rukus: 24,
    juzStart: 4,
    overview: "Establishes rights of women, orphans, inheritance, marriage, legal contracts, social justice, and protection of the vulnerable.",
    virtues: "Crucial foundation of Islamic civil law and social justice, clarifying familial obligations."
  },
  5: {
    number: 5,
    nameArabic: "المائدة",
    nameEnglish: "Al-Ma'idah",
    nameUrdu: "سورۃ المائدہ",
    meaningEnglish: "The Table Spread",
    type: "Medinan",
    ayahCount: 120,
    revelationOrder: 112,
    rukus: 16,
    juzStart: 6,
    overview: "Details dietary laws, contracts, covenants, purification, and the declaration of the completion of Islam (5:3).",
    virtues: "One of the last Surahs revealed, emphasizing fulfillment of covenants and oaths."
  },
  6: {
    number: 6,
    nameArabic: "الأنعام",
    nameEnglish: "Al-An'am",
    nameUrdu: "سورۃ الانعام",
    meaningEnglish: "The Cattle",
    type: "Meccan",
    ayahCount: 165,
    revelationOrder: 55,
    rukus: 20,
    juzStart: 7,
    overview: "A comprehensive exposition of Tawheed (monotheism), God's omnipotence, and the refutation of polytheism and superstitions.",
    virtues: "Narrated to have been revealed all at once in Mecca, accompanied by thousands of angels."
  },
  7: {
    number: 7,
    nameArabic: "الأعراف",
    nameEnglish: "Al-A'raf",
    nameUrdu: "سورۃ الاعراف",
    meaningEnglish: "The Heights",
    type: "Meccan",
    ayahCount: 206,
    revelationOrder: 39,
    rukus: 24,
    juzStart: 8,
    hasSajdah: true,
    sajdahAyahs: [206],
    overview: "Chronicles the narratives of prophets (Nuh, Hud, Salih, Lut, Shu'ayb, Musa) and describes the Heights between Heaven and Hell.",
    virtues: "Ends with the first Sajdah at-Tilawah in the Quran (7:206)."
  },
  8: {
    number: 8,
    nameArabic: "الأنفال",
    nameEnglish: "Al-Anfal",
    nameUrdu: "سورۃ الانفال",
    meaningEnglish: "The Spoils of War",
    type: "Medinan",
    ayahCount: 75,
    revelationOrder: 88,
    rukus: 10,
    juzStart: 9,
    overview: "Revealed following the decisive Battle of Badr, outlining spiritual lessons of victory, moral discipline, and brotherhood.",
    virtues: "Teaches that ultimate victory comes only from Allah."
  },
  9: {
    number: 9,
    nameArabic: "التوبة",
    nameEnglish: "At-Tawbah",
    nameUrdu: "سورۃ التوبہ",
    meaningEnglish: "The Repentance",
    type: "Medinan",
    ayahCount: 129,
    revelationOrder: 113,
    rukus: 16,
    juzStart: 10,
    overview: "The only Surah that does not begin with Bismillah. Deals with treaties, hypocrites, the Tabuk expedition, and acceptance of sincere repentance.",
    virtues: "Contains the beautiful concluding verses praising the compassion of Prophet Muhammad ﷺ (9:128-129)."
  },
  10: {
    number: 10,
    nameArabic: "يونس",
    nameEnglish: "Yunus",
    nameUrdu: "سورۃ یونس",
    meaningEnglish: "Jonah",
    type: "Meccan",
    ayahCount: 109,
    revelationOrder: 51,
    rukus: 11,
    juzStart: 11,
    overview: "Explores divine revelation, the Signs of Allah in creation, and the account of Prophet Yunus and his people.",
    virtues: "Emphasizes that Allah’s decree is absolute and truth always prevails over falsehood."
  },
  11: {
    number: 11,
    nameArabic: "هود",
    nameEnglish: "Hud",
    nameUrdu: "سورۃ ہود",
    meaningEnglish: "Hud",
    type: "Meccan",
    ayahCount: 123,
    revelationOrder: 52,
    rukus: 10,
    juzStart: 11,
    overview: "Revolves around patience and perseverance of messengers facing opposition, including Nuh, Hud, Salih, Ibrahim, and Lut.",
    virtues: "The Prophet ﷺ remarked: 'Surah Hud and its sisters have aged me (due to their profound gravity).'"
  },
  12: {
    number: 12,
    nameArabic: "يوسف",
    nameEnglish: "Yusuf",
    nameUrdu: "سورۃ یوسف",
    meaningEnglish: "Joseph",
    type: "Meccan",
    ayahCount: 111,
    revelationOrder: 53,
    rukus: 12,
    juzStart: 12,
    overview: "Touted in the Quran as 'Ahsan al-Qasas' (The Best of Stories), narrating the profound journey of Prophet Yusuf from the well to the throne.",
    virtues: "A comforting sanctuary for troubled hearts, illustrating trust in Allah through hardship."
  },
  13: {
    number: 13,
    nameArabic: "الرعد",
    nameEnglish: "Ar-Ra'd",
    nameUrdu: "سورۃ الرعد",
    meaningEnglish: "The Thunder",
    type: "Medinan",
    ayahCount: 43,
    revelationOrder: 96,
    rukus: 6,
    juzStart: 13,
    hasSajdah: true,
    sajdahAyahs: [15],
    overview: "Reflects on cosmic phenomena, the thunder praising Allah, and the solace found in remembrance: 'Verily, in the remembrance of Allah do hearts find rest' (13:28).",
    virtues: "Contains the Sajdah of verse 15."
  },
  14: {
    number: 14,
    nameArabic: "إبراهيم",
    nameEnglish: "Ibrahim",
    nameUrdu: "سورۃ ابراہیم",
    meaningEnglish: "Abraham",
    type: "Meccan",
    ayahCount: 52,
    revelationOrder: 72,
    rukus: 7,
    juzStart: 13,
    overview: "Focuses on bringing humanity from darkness into light, the beautiful parable of the Good Tree, and the timeless prayer of Prophet Ibrahim for Makkah.",
    virtues: "Highlights gratitude: 'If you are grateful, I will surely increase you' (14:7)."
  },
  15: {
    number: 15,
    nameArabic: "الحجر",
    nameEnglish: "Al-Hijr",
    nameUrdu: "سورۃ الحجر",
    meaningEnglish: "The Rocky Tract",
    type: "Meccan",
    ayahCount: 99,
    revelationOrder: 54,
    rukus: 6,
    juzStart: 14,
    overview: "Affirms divine preservation of the Quran: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian' (15:9).",
    virtues: "Reassures believers that the Quran is eternally safeguarded by Allah."
  },
  16: {
    number: 16,
    nameArabic: "النحل",
    nameEnglish: "An-Nahl",
    nameUrdu: "سورۃ النحل",
    meaningEnglish: "The Bee",
    type: "Meccan",
    ayahCount: 128,
    revelationOrder: 70,
    rukus: 16,
    juzStart: 14,
    hasSajdah: true,
    sajdahAyahs: [50],
    overview: "Known as the Surah of Blessings (Surat an-Ni'am), enumerating nature's bounties, the wisdom of the honeybee, and calls to wisdom in dawah.",
    virtues: "Contains Sajdah at verse 50."
  },
  17: {
    number: 17,
    nameArabic: "الإسراء",
    nameEnglish: "Al-Isra",
    nameUrdu: "سورۃ الاسراء",
    meaningEnglish: "The Night Journey",
    type: "Meccan",
    ayahCount: 111,
    revelationOrder: 50,
    rukus: 12,
    juzStart: 15,
    hasSajdah: true,
    sajdahAyahs: [109],
    overview: "Opens with the miraculous Night Journey (Isra and Mi'raj) of the Prophet ﷺ from Makkah to Jerusalem and beyond.",
    virtues: "Outlines core moral commandments and honors the status of the Beloved Prophet ﷺ."
  },
  18: {
    number: 18,
    nameArabic: "الكهف",
    nameEnglish: "Al-Kahf",
    nameUrdu: "سورۃ الکہف",
    meaningEnglish: "The Cave",
    type: "Meccan",
    ayahCount: 110,
    revelationOrder: 69,
    rukus: 12,
    juzStart: 15,
    overview: "Four illuminating stories: The Companions of the Cave, the Owner of Two Gardens, Musa and Khidr, and Dhul-Qarnayn.",
    virtues: "Whoever recites Surah Al-Kahf on Friday will have a light shining for him between the two Fridays, and protection from Dajjal."
  },
  19: {
    number: 19,
    nameArabic: "مريم",
    nameEnglish: "Maryam",
    nameUrdu: "سورۃ مریم",
    meaningEnglish: "Mary",
    type: "Meccan",
    ayahCount: 98,
    revelationOrder: 44,
    rukus: 6,
    juzStart: 16,
    hasSajdah: true,
    sajdahAyahs: [58],
    overview: "Tells the miraculous birth of Prophet Yahya to Zakariyya, and Prophet Isa (Jesus) to Virgin Maryam, defending her purity.",
    virtues: "Recited before the Christian King Negus of Abyssinia, bringing tears to his eyes."
  },
  20: {
    number: 20,
    nameArabic: "طه",
    nameEnglish: "Ta-Ha",
    nameUrdu: "سورۃ طٰہٰ",
    meaningEnglish: "Ta-Ha",
    type: "Meccan",
    ayahCount: 135,
    revelationOrder: 45,
    rukus: 8,
    juzStart: 16,
    overview: "Comforts the Prophet ﷺ: 'We did not send down to you the Quran that you be distressed.' Covers Musa's calling in Mount Sinai.",
    virtues: "The recitation of these opening verses led to the conversion of Umar ibn al-Khattab (RA) to Islam."
  },
  21: {
    number: 21,
    nameArabic: "الأنبياء",
    nameEnglish: "Al-Anbiya",
    nameUrdu: "سورۃ الانبیاء",
    meaningEnglish: "The Prophets",
    type: "Meccan",
    ayahCount: 112,
    revelationOrder: 73,
    rukus: 7,
    juzStart: 17,
    overview: "Spotlights 16 noble prophets, culminating in the declaration that Prophet Muhammad ﷺ is sent as a mercy to all creation (21:107).",
    virtues: "Contains the powerful supplication of Yunus in the belly of the whale (21:87)."
  },
  22: {
    number: 22,
    nameArabic: "الحج",
    nameEnglish: "Al-Hajj",
    nameUrdu: "سورۃ الحج",
    meaningEnglish: "The Pilgrimage",
    type: "Medinan",
    ayahCount: 78,
    revelationOrder: 103,
    rukus: 10,
    juzStart: 17,
    hasSajdah: true,
    sajdahAyahs: [18, 77],
    overview: "The call to pilgrimage proclaimed by Prophet Ibrahim, the sanctity of the Ka'bah, and the Day of Resurrection.",
    virtues: "The unique Surah in the Quran that has two Ayahs of Sajdah (18 and 77)."
  },
  23: {
    number: 23,
    nameArabic: "المؤمنون",
    nameEnglish: "Al-Mu'minoon",
    nameUrdu: "سورۃ المؤمنون",
    meaningEnglish: "The Believers",
    type: "Meccan",
    ayahCount: 118,
    revelationOrder: 74,
    rukus: 6,
    juzStart: 18,
    overview: "Profiles the golden traits of successful believers: humility in prayer, avoiding vain talk, paying charity, and guarding chastity.",
    virtues: "Promises inheritance of Al-Firdaws (the highest paradise) for those fulfilling these qualities."
  },
  24: {
    number: 24,
    nameArabic: "النور",
    nameEnglish: "An-Nur",
    nameUrdu: "سورۃ النور",
    meaningEnglish: "The Light",
    type: "Medinan",
    ayahCount: 64,
    revelationOrder: 102,
    rukus: 9,
    juzStart: 18,
    overview: "Outlines social ethics, chastity, modesty, lowering gaze, and the sublime Ayat an-Nur: 'Allah is the Light of the heavens and the earth' (24:35).",
    virtues: "Foundational for personal purity, family integrity, and spiritual illumination."
  },
  25: {
    number: 25,
    nameArabic: "الفرقان",
    nameEnglish: "Al-Furqan",
    nameUrdu: "سورۃ الفرقان",
    meaningEnglish: "The Criterion",
    type: "Meccan",
    ayahCount: 77,
    revelationOrder: 42,
    rukus: 6,
    juzStart: 18,
    hasSajdah: true,
    sajdahAyahs: [60],
    overview: "The Quran as the criterion between truth and falsehood, ending with the sublime qualities of 'Ibad ar-Rahman' (the servants of the Merciful).",
    virtues: "Contains Sajdah at verse 60."
  },
  26: {
    number: 26,
    nameArabic: "الشعراء",
    nameEnglish: "Ash-Shu'ara",
    nameUrdu: "سورۃ الشعراء",
    meaningEnglish: "The Poets",
    type: "Meccan",
    ayahCount: 227,
    revelationOrder: 47,
    rukus: 11,
    juzStart: 19,
    overview: "Narrates the struggles of past messengers with rhythmic eloquence, distinguishing between divine prophetic revelation and poetry.",
    virtues: "Affirms that only righteous poets guided by truth earn divine favor."
  },
  27: {
    number: 27,
    nameArabic: "النمل",
    nameEnglish: "An-Naml",
    nameUrdu: "سورۃ النمل",
    meaningEnglish: "The Ant",
    type: "Meccan",
    ayahCount: 93,
    revelationOrder: 48,
    rukus: 7,
    juzStart: 19,
    hasSajdah: true,
    sajdahAyahs: [26],
    overview: "The grandeur of Prophet Sulayman (Solomon) who understood the speech of birds and ants, and Queen of Sheba’s embrace of monotheism.",
    virtues: "Contains the second Bismillah in the Quran at verse 30."
  },
  28: {
    number: 28,
    nameArabic: "القصص",
    nameEnglish: "Al-Qasas",
    nameUrdu: "سورۃ القصص",
    meaningEnglish: "The Stories",
    type: "Meccan",
    ayahCount: 88,
    revelationOrder: 49,
    rukus: 8,
    juzStart: 20,
    overview: "The comprehensive story of Musa from infancy in the Nile to confrontations with Pharaoh and the downfall of Qarun's arrogant wealth.",
    virtues: "Emphasizes that Allah’s subtle care protects His righteous servants."
  },
  29: {
    number: 29,
    nameArabic: "العنكبوت",
    nameEnglish: "Al-Ankabut",
    nameUrdu: "سورۃ العنکبوت",
    meaningEnglish: "The Spider",
    type: "Meccan",
    ayahCount: 69,
    revelationOrder: 85,
    rukus: 7,
    juzStart: 20,
    overview: "Opens asking if people think they will be left saying 'We believe' without being tested. Parable of polytheism like the fragile spider's web.",
    virtues: "Strengthens faith amidst tribulation and hardship."
  },
  30: {
    number: 30,
    nameArabic: "الروم",
    nameEnglish: "Ar-Rum",
    nameUrdu: "سورۃ الروم",
    meaningEnglish: "The Romans",
    type: "Meccan",
    ayahCount: 60,
    revelationOrder: 84,
    rukus: 6,
    juzStart: 21,
    overview: "A miraculous prophecy of the Roman victory against the Persians within years, proving the divine origin of the Quran.",
    virtues: "Contains verses on signs of Allah in human diversity, marital love, and nature."
  },
  36: {
    number: 36,
    nameArabic: "يس",
    nameEnglish: "Ya-Seen",
    nameUrdu: "سورۃ یٰسٓ",
    meaningEnglish: "Ya-Seen",
    type: "Meccan",
    ayahCount: 83,
    revelationOrder: 41,
    rukus: 5,
    juzStart: 22,
    overview: "Known as 'The Heart of the Quran'. Addresses core theological tenets: divine revelation, resurrection, and nature’s witnesses.",
    virtues: "The Prophet ﷺ said: 'Everything has a heart, and the heart of the Quran is Ya-Seen.'"
  },
  55: {
    number: 55,
    nameArabic: "الرحمن",
    nameEnglish: "Ar-Rahman",
    nameUrdu: "سورۃ الرحمٰن",
    meaningEnglish: "The Beneficent",
    type: "Medinan",
    ayahCount: 78,
    revelationOrder: 97,
    rukus: 3,
    juzStart: 27,
    overview: "Known as 'Uroos al-Quran' (The Bride of the Quran). Repeatedly asks: 'Which of the favors of your Lord will you deny?' (31 times).",
    virtues: "Brings immense peace, gratitude, and spiritual tranquility."
  },
  56: {
    number: 56,
    nameArabic: "الواقعة",
    nameEnglish: "Al-Waqi'ah",
    nameUrdu: "سورۃ الواقعہ",
    meaningEnglish: "The Inevitable",
    type: "Meccan",
    ayahCount: 96,
    revelationOrder: 46,
    rukus: 3,
    juzStart: 27,
    overview: "Describes the Day of Judgment and categorizes humanity into three: The Foremost (As-Sabiqoon), Right hand, and Left hand.",
    virtues: "The Prophet ﷺ said: 'Whoever recites Surah Al-Waqi'ah every night will never be afflicted by poverty.'"
  },
  67: {
    number: 67,
    nameArabic: "الملك",
    nameEnglish: "Al-Mulk",
    nameUrdu: "سورۃ الملک",
    meaningEnglish: "The Sovereignty",
    type: "Meccan",
    ayahCount: 30,
    revelationOrder: 77,
    rukus: 2,
    juzStart: 29,
    overview: "The majestic dominion of Allah, the perfection of the heavens, and accountability of human actions.",
    virtues: "Intercedes for its reciter in the grave until their sins are forgiven."
  },
  112: {
    number: 112,
    nameArabic: "الإخلاص",
    nameEnglish: "Al-Ikhlas",
    nameUrdu: "سورۃ الاخلاص",
    meaningEnglish: "The Sincerity",
    type: "Meccan",
    ayahCount: 4,
    revelationOrder: 22,
    rukus: 1,
    juzStart: 30,
    overview: "Pure unadulterated monotheism: 'Say: He is Allah, the One. Allah the Eternal Refuge.'",
    virtues: "Equivalent to one-third of the entire Quran in spiritual reward."
  },
  113: {
    number: 113,
    nameArabic: "الفلق",
    nameEnglish: "Al-Falaq",
    nameUrdu: "سورۃ الفلق",
    meaningEnglish: "The Daybreak",
    type: "Meccan",
    ayahCount: 5,
    revelationOrder: 20,
    rukus: 1,
    juzStart: 30,
    overview: "Seeking divine refuge from darkness, envy, and the mischief of created beings.",
    virtues: "One of the Mu'awwidhatayn (surahs of protection) recommended for daily recitation."
  },
  114: {
    number: 114,
    nameArabic: "الناس",
    nameEnglish: "An-Nas",
    nameUrdu: "سورۃ الناس",
    meaningEnglish: "Mankind",
    type: "Meccan",
    ayahCount: 6,
    revelationOrder: 21,
    rukus: 1,
    juzStart: 30,
    overview: "Seeking refuge in the Lord, King, and God of mankind against the whispers of insidious instigators.",
    virtues: "The concluding Surah of the Holy Quran, sealing the revelation in divine sanctuary."
  }
};

// Generate full fallback for all 114 surahs
import { quranAyahs } from "./ayahs";

// Build complete list from Tanzil ayahs data
export const ALL_SURAHS: SurahMeta[] = [];

// Prepopulate from unique surahs in quranAyahs
const surahMap = new Map<number, { name: string; nameArabic: string; count: number }>();
for (const ayah of quranAyahs) {
  if (!surahMap.has(ayah.surahNumber)) {
    surahMap.set(ayah.surahNumber, {
      name: ayah.surahName,
      nameArabic: ayah.surahNameArabic,
      count: 0
    });
  }
  const curr = surahMap.get(ayah.surahNumber)!;
  curr.count++;
}

// Meccan vs Medinan standard classification
const MEDINAN_SURAHS = new Set([2, 3, 4, 5, 8, 9, 13, 22, 24, 33, 47, 48, 49, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 76, 98, 110]);

// Find which Juz each Surah begins in
function getSurahJuzStart(surahNum: number): number {
  for (let i = JUZ_LIST.length - 1; i >= 0; i--) {
    if (surahNum >= JUZ_LIST[i].startSurah) {
      return JUZ_LIST[i].juzNumber;
    }
  }
  return 1;
}

for (let i = 1; i <= 114; i++) {
  const meta = SURAH_METADATA[i];
  const item = surahMap.get(i);
  if (meta) {
    ALL_SURAHS.push(meta);
  } else if (item) {
    ALL_SURAHS.push({
      number: i,
      nameArabic: item.nameArabic,
      nameEnglish: item.name,
      nameUrdu: `سورۃ ${item.nameArabic}`,
      meaningEnglish: item.name,
      type: MEDINAN_SURAHS.has(i) ? "Medinan" : "Meccan",
      ayahCount: item.count,
      revelationOrder: i,
      rukus: Math.ceil(item.count / 10),
      juzStart: getSurahJuzStart(i),
      overview: `Surah ${item.name} (${item.nameArabic}), consisting of ${item.count} verses.`,
      virtues: "Recitation brings immense barakah and spiritual enlightenment."
    });
  }
}
