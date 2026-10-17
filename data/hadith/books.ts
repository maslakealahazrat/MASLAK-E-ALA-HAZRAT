export type HadithItem = {
  id: string;
  collectionId: string;
  bookId: string;
  bookTitleArabic: string;
  bookTitleEnglish: string;
  bookTitleUrdu: string;
  chapterTitleArabic?: string;
  chapterTitleEnglish: string;
  chapterTitleUrdu: string;
  hadithNumber: number;
  arabic: string;
  urdu: string;
  english: string;
  narrator: string;
  grade: "Sahih (صحيح)" | "Muttafaq 'Alayh (متفق عليه)" | "Hasan (حسن)";
  reference: string;
  tags: string[];
};

export type HadithBook = {
  id: string;
  bookNumber: number;
  collectionId: string;
  titleEnglish: string;
  titleArabic: string;
  titleUrdu: string;
  hadithCount: number;
  description: string;
};

export type HadithCollection = {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  nameUrdu: string;
  compiler: string;
  deathYearAH: number;
  totalHadith: string;
  description: string;
  books: HadithBook[];
};

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: "bukhari",
    nameEnglish: "Sahih al-Bukhari",
    nameArabic: "صحيح البخاري",
    nameUrdu: "صحیح البخاری",
    compiler: "Imam Muhammad ibn Isma'il al-Bukhari",
    deathYearAH: 256,
    totalHadith: "7,563 Ahadith",
    description: "Universally acclaimed by the Islamic Ummah as the most authentic book after the Holy Qur’an. Compiled over 16 years with the highest criteria of Hadith methodology.",
    books: [
      {
        id: "bukhari-wahy",
        bookNumber: 1,
        collectionId: "bukhari",
        titleEnglish: "Book of Revelation (Bad' al-Wahy)",
        titleArabic: "كتاب بدء الوحي",
        titleUrdu: "کتاب وحی کی ابتداء",
        hadithCount: 7,
        description: "How the divine revelation commenced to the Messenger of Allah ﷺ in Cave Hira.",
      },
      {
        id: "bukhari-iman",
        bookNumber: 2,
        collectionId: "bukhari",
        titleEnglish: "Book of Belief (Kitab al-Iman)",
        titleArabic: "كتاب الإيمان",
        titleUrdu: "کتاب ایمان",
        hadithCount: 51,
        description: "The nature of faith, branches of Iman, sincerity, and love for the Prophet ﷺ.",
      },
      {
        id: "bukhari-ilm",
        bookNumber: 3,
        collectionId: "bukhari",
        titleEnglish: "Book of Knowledge (Kitab al-Ilm)",
        titleArabic: "كتاب العلم",
        titleUrdu: "کتاب علم",
        hadithCount: 77,
        description: "The virtue of seeking sacred knowledge, teaching others, and learning with humility.",
      },
      {
        id: "bukhari-wudu",
        bookNumber: 4,
        collectionId: "bukhari",
        titleEnglish: "Book of Ablution (Kitab al-Wudu)",
        titleArabic: "كتاب الوضوء",
        titleUrdu: "کتاب وضو",
        hadithCount: 102,
        description: "Purification, rules of Wudu, toothstick (Miswak), and cleanliness before Salah.",
      },
      {
        id: "bukhari-salah",
        bookNumber: 8,
        collectionId: "bukhari",
        titleEnglish: "Book of Prayers (Kitab as-Salah)",
        titleArabic: "كتاب الصلاة",
        titleUrdu: "کتاب نماز",
        hadithCount: 147,
        description: "The conditions, pillars, timings, and spiritual excellence of the five daily prayers.",
      },
      {
        id: "bukhari-adab",
        bookNumber: 78,
        collectionId: "bukhari",
        titleEnglish: "Book of Good Manners & Ethics (Kitab al-Adab)",
        titleArabic: "كتاب الأدب",
        titleUrdu: "کتاب اخلاق و آداب",
        hadithCount: 120,
        description: "Rights of parents, kindness to neighbors, keeping kinship ties, truthfulness, and mercy.",
      },
    ],
  },
  {
    id: "muslim",
    nameEnglish: "Sahih Muslim",
    nameArabic: "صحيح مسلم",
    nameUrdu: "صحیح مسلم",
    compiler: "Imam Muslim ibn al-Hajjaj an-Naysaburi",
    deathYearAH: 261,
    totalHadith: "7,500 Ahadith",
    description: "Renowned for its unparalleled thematic coherence, rigorous chain evaluations, and grouping of all variant transmissions of a Hadith in one single place.",
    books: [
      {
        id: "muslim-iman",
        bookNumber: 1,
        collectionId: "muslim",
        titleEnglish: "Book of Faith (Kitab al-Iman)",
        titleArabic: "كتاب الإيمان",
        titleUrdu: "کتاب ایمان",
        hadithCount: 440,
        description: "The famous Hadith of Jibril explaining Islam, Iman, and Ihsan, and the intercession of the Prophet ﷺ.",
      },
      {
        id: "muslim-taharah",
        bookNumber: 2,
        collectionId: "muslim",
        titleEnglish: "Book of Purification (Kitab at-Taharah)",
        titleArabic: "كتاب الطهارة",
        titleUrdu: "کتاب طہارت",
        hadithCount: 130,
        description: "Purity is half of faith, Sunnahs of Fitrah, and spiritual cleanliness.",
      },
      {
        id: "muslim-birr",
        bookNumber: 45,
        collectionId: "muslim",
        titleEnglish: "Book of Virtue, Good Manners & Kinship",
        titleArabic: "كتاب البر والصلة والآداب",
        titleUrdu: "کتاب حسنِ سلوک و صلہ رحمی",
        hadithCount: 180,
        description: "Prohibition of mutual malice, envying, backbiting, and the supreme merit of reconciling hearts.",
      },
      {
        id: "muslim-fadail",
        bookNumber: 43,
        collectionId: "muslim",
        titleEnglish: "Book of the Virtues of the Prophet ﷺ",
        titleArabic: "كتاب الفضائل",
        titleUrdu: "کتاب فضائلِ مصطفٰے ﷺ",
        hadithCount: 165,
        description: "The exalted character, physical beauty, fragrance, compassion, and miracles of the Holy Prophet ﷺ.",
      },
    ],
  },
  {
    id: "tirmidhi",
    nameEnglish: "Jami` at-Tirmidhi",
    nameArabic: "جامع الترمذي",
    nameUrdu: "جامع الترمذی",
    compiler: "Imam Abu Isa Muhammad at-Tirmidhi",
    deathYearAH: 279,
    totalHadith: "3,956 Ahadith",
    description: "Unique among the Sihah Sittah for detailing the legal deductions of the Sahaba, Tabi'un, and great jurists (Abu Hanifa, Malik, Shafi'i, Ahmad) after each Hadith.",
    books: [
      {
        id: "tirmidhi-ilm",
        bookNumber: 39,
        collectionId: "tirmidhi",
        titleEnglish: "Chapters on Knowledge",
        titleArabic: "أبواب العلم",
        titleUrdu: "ابواب علم",
        hadithCount: 50,
        description: "The inheritance of the Prophets is knowledge, and angels spread their wings for the student of sacred knowledge.",
      },
      {
        id: "tirmidhi-birr",
        bookNumber: 25,
        collectionId: "tirmidhi",
        titleEnglish: "Chapters on Righteousness & Good Relations",
        titleArabic: "أبواب البر والصلة",
        titleUrdu: "ابواب احسان اور تعلقات",
        hadithCount: 90,
        description: "Showing mercy to elders, affection to youngsters, smiling as charity, and gentleness.",
      },
      {
        id: "tirmidhi-shamail",
        bookNumber: 50,
        collectionId: "tirmidhi",
        titleEnglish: "Chapters on the Shamail (Prophetic Portrait)",
        titleArabic: "أبواب الشمائل المحمدية",
        titleUrdu: "ابواب شمائلِ محمدیہ ﷺ",
        hadithCount: 75,
        description: "The blessed countenance, seal of prophethood, seal of speech, and weeping of the Beloved Messenger ﷺ.",
      },
    ],
  },
  {
    id: "nawawi40",
    nameEnglish: "Al-Arba'in an-Nawawiyyah (40 Hadith)",
    nameArabic: "الأربعون النووية",
    nameUrdu: "اربعینِ نووی",
    compiler: "Imam Yahya ibn Sharaf an-Nawawi",
    deathYearAH: 676,
    totalHadith: "42 Ahadith",
    description: "The celebrated collection encompassing the foundational maxims and moral pillars of Islam, memorized and studied across the Muslim world for centuries.",
    books: [
      {
        id: "nawawi-all",
        bookNumber: 1,
        collectionId: "nawawi40",
        titleEnglish: "The 40 Core Traditions of Islam",
        titleArabic: "الأحاديث الجامعة لقواعد الإسلام",
        titleUrdu: "اسلام کے بنیادی قواعد پر مشتمل احادیث",
        hadithCount: 42,
        description: "Foundational traditions on intentions, halal and haram, advising, patience, and love for Allah.",
      },
    ],
  },
];

export const AHADITH_DATABASE: HadithItem[] = [
  // --- BUKHARI: WAHY ---
  {
    id: "bukhari-1",
    collectionId: "bukhari",
    bookId: "bukhari-wahy",
    bookTitleArabic: "كتاب بدء الوحي",
    bookTitleEnglish: "Book of Revelation",
    bookTitleUrdu: "کتاب وحی کی ابتداء",
    chapterTitleArabic: "باب كَيْفَ كَانَ بَدْءُ الْوَحْيِ إِلَى رَسُولِ اللَّهِ ﷺ",
    chapterTitleEnglish: "How the Divine Revelation Started",
    chapterTitleUrdu: "رسول اللہ ﷺ پر وحی کی ابتداء کیسے ہوئی",
    hadithNumber: 1,
    arabic: "عَنْ عَلْقَمَةَ بْنِ وَقَّاصٍ اللَّيْثِيِّ، قَالَ: سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ».",
    urdu: "امیر المومنین حضرت عمر بن خطاب رضی اللہ عنہ سے روایت ہے کہ میں نے منبر پر رسول اللہ صلی اللہ علیہ وسلم کو فرماتے سنا: 'اعمال کا دارومدار صرف نیتوں پر ہے، اور ہر انسان کو وہی ملے گا جس کی اس نے نیت کی۔ پس جس کی ہجرت دنیا حاصل کرنے کے لیے ہو یا کسی عورت سے نکاح کی غرض سے ہو، تو اس کی ہجرت اسی کے لیے ہے جس کی طرف اس نے ہجرت کی۔'",
    english: "Narrated 'Umar bin Al-Khattab (RA) on the pulpit: I heard Allah's Messenger (ﷺ) saying, 'The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.'",
    narrator: "Sayyiduna Umar ibn al-Khattab (RA)",
    grade: "Muttafaq 'Alayh (متفق عليه)",
    reference: "Sahih al-Bukhari 1",
    tags: ["Intentions", "Sincerity", "Ikhlas", "Hijrah"],
  },
  {
    id: "bukhari-2",
    collectionId: "bukhari",
    bookId: "bukhari-wahy",
    bookTitleArabic: "كتاب بدء الوحي",
    bookTitleEnglish: "Book of Revelation",
    bookTitleUrdu: "کتاب وحی کی ابتداء",
    chapterTitleArabic: "باب كَيْفَ كَانَ بَدْءُ الْوَحْيِ",
    chapterTitleEnglish: "Forms of Revelation",
    chapterTitleUrdu: "وحی کے نزول کی کیفیات",
    hadithNumber: 2,
    arabic: "عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ رَضِيَ اللَّهُ عَنْهَا: أَنَّ الْحَارِثَ بْنَ هِشَامٍ رَضِيَ اللَّهُ عَنْهُ سَأَلَ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْيُ؟ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ وَهُوَ أَشَدُّهُ عَلَيَّ، فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ».",
    urdu: "ام المومنین حضرت عائشہ صدیقہ رضی اللہ عنہا فرماتی ہیں کہ حارث بن ہشام رضی اللہ عنہ نے عرض کی: یا رسول اللہ! آپ کے پاس وحی کیسے آتی ہے؟ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: کبھی گھنٹی کی آواز کی طرح آتی ہے اور یہ مجھ پر سب سے زیادہ سخت ہوتی ہے، پھر جب یہ کیفیت ختم ہوتی ہے تو فرشتے کا کہا ہوا مجھے یاد ہو چکا ہوتا ہے۔ اور کبھی فرشتہ میرے سامنے انسانی شکل میں آتا ہے، وہ مجھ سے بات کرتا ہے اور میں اس کا کلام یاد رکھ لیتا ہوں۔",
    english: "Narrated 'Aisha (Mother of the Believers, RA): Al-Harith bin Hisham asked Allah's Messenger (ﷺ), 'O Allah's Messenger! How is the divine inspiration revealed to you?' Allah's Messenger (ﷺ) replied, 'Sometimes it comes to me like the ringing of a bell, which is the hardest of all for me; and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the likeness of a man and talks to me and I grasp what he says.'",
    narrator: "Sayyidatuna Aisha Siddiqa (RA)",
    grade: "Muttafaq 'Alayh (متفق عليه)",
    reference: "Sahih al-Bukhari 2",
    tags: ["Revelation", "Wahy", "Prophethood", "Angels"],
  },

  // --- BUKHARI: IMAN ---
  {
    id: "bukhari-13",
    collectionId: "bukhari",
    bookId: "bukhari-iman",
    bookTitleArabic: "كتاب الإيمان",
    bookTitleEnglish: "Book of Belief",
    bookTitleUrdu: "کتاب ایمان",
    chapterTitleArabic: "بَابٌ: مِنَ الإِيمَانِ أَنْ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    chapterTitleEnglish: "Loving for Your Brother What You Love for Yourself",
    chapterTitleUrdu: "اپنے بھائی کے لیے وہی پسند کرنا جو اپنے لیے پسند کرے",
    hadithNumber: 13,
    arabic: "عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ، عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ».",
    urdu: "حضرت انس رضی اللہ عنہ سے روایت ہے کہ نبی کریم صلی اللہ علیہ وسلم نے فرمایا: 'تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے بھی وہی پسند نہ کرے جو وہ اپنے لیے پسند کرتا ہے۔'",
    english: "Narrated Anas (RA): The Prophet (ﷺ) said, 'None of you will have complete faith until he loves for his brother (or his neighbor) that which he loves for himself.'",
    narrator: "Sayyiduna Anas ibn Malik (RA)",
    grade: "Muttafaq 'Alayh (متفق عليه)",
    reference: "Sahih al-Bukhari 13 & Sahih Muslim 45",
    tags: ["Brotherhood", "Compassion", "Iman", "Love"],
  },
  {
    id: "bukhari-15",
    collectionId: "bukhari",
    bookId: "bukhari-iman",
    bookTitleArabic: "كتاب الإيمان",
    bookTitleEnglish: "Book of Belief",
    bookTitleUrdu: "کتاب ایمان",
    chapterTitleArabic: "بَابُ حُبِّ الرَّسُولِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الإِيمَانِ",
    chapterTitleEnglish: "Love of the Messenger ﷺ is Part of Faith",
    chapterTitleUrdu: "رسول اللہ ﷺ کی محبت ایمان کا حصہ ہے",
    hadithNumber: 15,
    arabic: "عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ وَالنَّاسِ أَجْمَعِينَ».",
    urdu: "حضرت انس رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'تم میں سے کوئی مومن نہیں ہو سکتا جب تک کہ میں اس کے نزدیک اس کے باپ، اس کی اولاد اور تمام لوگوں سے زیادہ محبوب نہ ہو جاؤں۔'",
    english: "Narrated Anas (RA): The Prophet (ﷺ) said, 'None of you will have faith until he loves me more than his father, his children and all mankind.'",
    narrator: "Sayyiduna Anas ibn Malik (RA)",
    grade: "Muttafaq 'Alayh (متفق عليه)",
    reference: "Sahih al-Bukhari 15 & Sahih Muslim 44",
    tags: ["Love of the Prophet", "Ishq-e-Rasool", "Iman", "Core Faith"],
  },

  // --- BUKHARI: ILM ---
  {
    id: "bukhari-5027",
    collectionId: "bukhari",
    bookId: "bukhari-ilm",
    bookTitleArabic: "كتاب العلم",
    bookTitleEnglish: "Book of Knowledge",
    bookTitleUrdu: "کتاب علم",
    chapterTitleArabic: "بَابُ فَضْلِ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    chapterTitleEnglish: "Virtues of Learning and Teaching the Qur’an",
    chapterTitleUrdu: "قرآن سیکھنے اور سکھانے والے کی فضیلت",
    hadithNumber: 5027,
    arabic: "عَنْ عُثْمَانَ رَضِيَ اللَّهُ عَنْهُ، عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ».",
    urdu: "حضرت عثمان بن عفان رضی اللہ عنہ سے روایت ہے کہ نبی کریم صلی اللہ علیہ وسلم نے ارشاد فرمایا: 'تم میں سب سے بہترین شخص وہ ہے جس نے قرآن سیکھا اور دوسروں کو سکھایا۔'",
    english: "Narrated 'Uthman (RA): The Prophet (ﷺ) said, 'The best amongst you are those who learn the Qur'an and teach it (to others).'",
    narrator: "Sayyiduna Uthman ibn Affan (RA)",
    grade: "Sahih (صحيح)",
    reference: "Sahih al-Bukhari 5027",
    tags: ["Qur'an", "Knowledge", "Teaching", "Excellence"],
  },
  {
    id: "bukhari-71",
    collectionId: "bukhari",
    bookId: "bukhari-ilm",
    bookTitleArabic: "كتاب العلم",
    bookTitleEnglish: "Book of Knowledge",
    bookTitleUrdu: "کتاب علم",
    chapterTitleArabic: "بَابُ مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
    chapterTitleEnglish: "Whomsoever Allah Wills Good For, He Grants Understanding in Religion",
    chapterTitleUrdu: "جس کے ساتھ اللہ بھلائی کا ارادہ فرمائے اسے دین کی سمجھ عطا فرماتا ہے",
    hadithNumber: 71,
    arabic: "عَنْ مُعَاوِيَةَ رَضِيَ اللَّهُ عَنْهُ، قَالَ: سَمِعْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي».",
    urdu: "حضرت امیر معاویہ رضی اللہ عنہ سے روایت ہے کہ میں نے رسول اللہ صلی اللہ علیہ وسلم کو فرماتے سنا: 'اللہ تعالیٰ جس کے ساتھ بھلائی کا ارادہ فرماتا ہے، اسے دین کی گہری سمجھ (فقہ) عطا فرما دیتا ہے، اور میں تقسیم کرنے والا ہوں اور عطا فرمانے والا اللہ ہے۔'",
    english: "Narrated Mu'awiyah (RA): I heard the Prophet (ﷺ) saying, 'If Allah wants to do good to a person, He makes him comprehend the religion (fiqh). And I am only a distributor, and Allah gives.'",
    narrator: "Sayyiduna Mu'awiyah (RA)",
    grade: "Muttafaq 'Alayh (متفق عليه)",
    reference: "Sahih al-Bukhari 71 & Sahih Muslim 1037",
    tags: ["Fiqh", "Knowledge", "Blessing", "Distributor"],
  },

  // --- BUKHARI: ADAB ---
  {
    id: "bukhari-5971",
    collectionId: "bukhari",
    bookId: "bukhari-adab",
    bookTitleArabic: "كتاب الأدب",
    bookTitleEnglish: "Book of Good Manners",
    bookTitleUrdu: "کتاب اخلاق و آداب",
    chapterTitleArabic: "بَابُ مَنْ أَحَقُّ النَّاسِ بِحُسْنِ الصَّحَابَةِ",
    chapterTitleEnglish: "Who is Most Deserving of Good Companionship?",
    chapterTitleUrdu: "لوگوں میں حسنِ سلوک کا سب سے زیادہ حق دار کون ہے؟",
    hadithNumber: 5971,
    arabic: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، قَالَ: جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ»، قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أُمُّكَ»، قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أُمُّكَ»، قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ».",
    urdu: "حضرت ابوہریرہ رضی اللہ عنہ سے مروی ہے کہ ایک شخص نے بارگاہِ رسالت میں عرض کی: یا رسول اللہ! میرے اچھے سلوک کا سب سے زیادہ حقدار کون ہے؟ فرمایا: 'تمہاری ماں۔' اس نے پوچھا: پھر کون؟ فرمایا: 'تمہاری ماں۔' اس نے پوچھا: پھر کون؟ فرمایا: 'تمہاری ماں۔' اس نے پوچھا: پھر کون؟ فرمایا: 'پھر تمہارا باپ۔'",
    english: "Narrated Abu Hurairah (RA): A man came to Allah's Messenger (ﷺ) and said, 'O Allah's Messenger! Who is more entitled to be treated with the best companionship by me?' The Prophet (ﷺ) said, 'Your mother.' The man said, 'Who is next?' The Prophet (ﷺ) said, 'Your mother.' The man further said, 'Who is next?' The Prophet (ﷺ) said, 'Your mother.' The man asked for the fourth time, 'Who is next?' The Prophet (ﷺ) said, 'Then, your father.'",
    narrator: "Sayyiduna Abu Hurairah (RA)",
    grade: "Muttafaq 'Alayh (متفق عليه)",
    reference: "Sahih al-Bukhari 5971 & Sahih Muslim 2548",
    tags: ["Parents", "Mother", "Kindness", "Akhlaq"],
  },

  // --- MUSLIM: FADA'IL & SALAWAT ---
  {
    id: "muslim-408",
    collectionId: "muslim",
    bookId: "muslim-fadail",
    bookTitleArabic: "كتاب الفضائل",
    bookTitleEnglish: "Book of the Virtues of the Prophet ﷺ",
    bookTitleUrdu: "کتاب فضائلِ مصطفٰے ﷺ",
    chapterTitleArabic: "بَابُ الصَّلَاةِ عَلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بَعْدَ التَّشَهُّدِ",
    chapterTitleEnglish: "The Virtues of Sending Blessings upon the Prophet ﷺ",
    chapterTitleUrdu: "نبی کریم ﷺ پر درود شریف بھیجنے کی فضیلت",
    hadithNumber: 408,
    arabic: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «مَنْ صَلَّى عَلَيَّ وَاحِدَةً، صَلَّى اللَّهُ عَلَيْهِ عَشْرًا».",
    urdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'جس نے مجھ پر ایک بار درود بھیجا، اللہ تعالیٰ اس پر دس رحمتیں نازل فرماتا ہے۔'",
    english: "Narrated Abu Hurairah (RA): The Messenger of Allah (ﷺ) said, 'Whoever sends blessings upon me once, Allah sends ten blessings upon him.'",
    narrator: "Sayyiduna Abu Hurairah (RA)",
    grade: "Sahih (صحيح)",
    reference: "Sahih Muslim 408",
    tags: ["Salawat", "Durood", "Blessings", "Prophetic Love"],
  },
  {
    id: "muslim-223",
    collectionId: "muslim",
    bookId: "muslim-taharah",
    bookTitleArabic: "كتاب الطهارة",
    bookTitleEnglish: "Book of Purification",
    bookTitleUrdu: "کتاب طہارت",
    chapterTitleArabic: "بَابُ فَضْلِ الْوُضُوءِ",
    chapterTitleEnglish: "The Virtue of Wudu & Purification",
    chapterTitleUrdu: "طہارت اور وضو کی فضیلت",
    hadithNumber: 223,
    arabic: "عَنْ أَبِي مَالِكٍ الأَشْعَرِيِّ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ مَا بَيْنَ السَّمَاوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا».",
    urdu: "حضرت ابو مالک اشعری رضی اللہ عنہ سے مروی ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے ارشاد فرمایا: 'پاکیزگی نصف ایمان ہے، اور الحمد للہ میزان کو بھر دیتا ہے، اور سبحان اللہ و الحمد للہ آسمان و زمین کے درمیان کو بھر دیتے ہیں، اور نماز نور ہے، صدقہ دلیل ہے، صبر روشنی ہے، اور قرآن تمہارے حق میں یا تمہارے خلاف حجت ہے، ہر انسان صبح کرتا ہے پس وہ اپنی جان کا سودا کرتا ہے، یا تو اسے آزاد کرالیتا ہے یا اسے ہلاک کر دیتا ہے۔'",
    english: "Abu Malik al-Ash'ari (RA) reported: The Messenger of Allah (ﷺ) said, 'Cleanliness is half of faith and al-Hamdu Lillah (all praise is due to Allah) fills the scale, and Subhan Allah (glory be to Allah) and al-Hamdu Lillah fill that which is between heaven and earth; and prayer is a light, and charity is a proof (of one's faith), and endurance (Sabr) is a brightness and the Holy Qur'an is a proof on your behalf or against you. Every person goes out in the morning and trades with his soul, either emancipating it or destroying it.'",
    narrator: "Sayyiduna Abu Malik al-Ash'ari (RA)",
    grade: "Sahih (صحيح)",
    reference: "Sahih Muslim 223",
    tags: ["Purification", "Taharah", "Zikr", "Salah", "Sabr"],
  },

  // --- TIRMIDHI: RAHMAH & SHAMAIL ---
  {
    id: "tirmidhi-1924",
    collectionId: "tirmidhi",
    bookId: "tirmidhi-birr",
    bookTitleArabic: "أبواب البر والصلة",
    bookTitleEnglish: "Chapters on Righteousness & Good Relations",
    bookTitleUrdu: "ابواب احسان اور تعلقات",
    chapterTitleArabic: "بَابُ مَا جَاءَ فِي رَحْمَةِ النَّاسِ",
    chapterTitleEnglish: "Mercy Towards Mankind",
    chapterTitleUrdu: "مخلوق پر رحم کرنے کی فضیلت",
    hadithNumber: 1924,
    arabic: "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رَضِيَ اللَّهُ عَنْهُمَا، قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ».",
    urdu: "حضرت عبداللہ بن عمرو رضی اللہ عنہما سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'رحم کرنے والوں پر رحمان رحم فرماتا ہے۔ تم زمین والوں پر رحم کرو، آسمان والا (اللہ تعالیٰ) تم پر رحم فرمائے گا۔'",
    english: "Narrated 'Abdullah bin 'Amr (RA): The Messenger of Allah (ﷺ) said, 'The compassionate are shown mercy by the Most Merciful. Show mercy to those who are on earth, and the One in the heavens will show mercy to you.'",
    narrator: "Sayyiduna Abdullah ibn Amr (RA)",
    grade: "Hasan (حسن)",
    reference: "Jami` at-Tirmidhi 1924 & Sunan Abi Dawud",
    tags: ["Mercy", "Compassion", "Rahmah", "Universal Good"],
  },
  {
    id: "tirmidhi-1956",
    collectionId: "tirmidhi",
    bookId: "tirmidhi-birr",
    bookTitleArabic: "أبواب البر والصلة",
    bookTitleEnglish: "Chapters on Righteousness & Good Relations",
    bookTitleUrdu: "ابواب احسان اور تعلقات",
    chapterTitleArabic: "بَابُ مَا جَاءَ فِي صَنِيعَةِ الْمَعْرُوفِ",
    chapterTitleEnglish: "Every Good Act is Charity",
    chapterTitleUrdu: "ہر نیکی صدقہ ہے",
    hadithNumber: 1956,
    arabic: "عَنْ أَبِي ذَرٍّ رَضِيَ اللَّهُ عَنْهُ، قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ، وَأَمْرُكَ بِالْمَعْرُوفِ وَنَهْيُكَ عَنِ الْمُنْكَرِ صَدَقَةٌ، وَإِرْشَادُكَ الرَّجُلَ فِي أَرْضِ الضَّلاَلِ لَكَ صَدَقَةٌ».",
    urdu: "حضرت ابو ذر رضی اللہ عنہ سے مروی ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'اپنے بھائی کے چہرے پر دیکھ کر تمہارا مسکرانا تمہارے لیے صدقہ ہے، بھلائی کا حکم دینا اور برائی سے روکنا تمہارے لیے صدقہ ہے، اور کسی بھٹکنے والے کو راستہ بتانا تمہارے لیے صدقہ ہے۔'",
    english: "Abu Dharr (RA) narrated that the Messenger of Allah (ﷺ) said, 'Your smiling in the face of your brother is charity for you; and your commanding good and forbidding evil is charity; and your guiding a man in an unknown land is charity for you.'",
    narrator: "Sayyiduna Abu Dharr al-Ghifari (RA)",
    grade: "Hasan (حسن)",
    reference: "Jami` at-Tirmidhi 1956",
    tags: ["Smiling", "Charity", "Ethics", "Guidance"],
  },

  // --- NAWAWI 40 ---
  {
    id: "nawawi-2",
    collectionId: "nawawi40",
    bookId: "nawawi-all",
    bookTitleArabic: "الأربعون النووية",
    bookTitleEnglish: "The 40 Core Traditions",
    bookTitleUrdu: "اربعینِ نووی",
    chapterTitleArabic: "حَدِيثُ جِبْرِيلَ عَلَيْهِ السَّلَام فِي الْإِسْلَامِ وَالْإِيمَانِ وَالْإِحْسَانِ",
    chapterTitleEnglish: "The Hadith of Angel Gabriel (Islam, Iman, and Ihsan)",
    chapterTitleUrdu: "حدیثِ جبریل علیہ السلام (اسلام، ایمان اور احسان)",
    hadithNumber: 2,
    arabic: "عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعَرِ، لاَ يُرَى عَلَيْهِ أَثَرُ السَّفَرِ، وَلاَ يَعْرِفُهُ مِنَّا أَحَدٌ... فَقَالَ: يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الإِسْلاَمِ؟ فَقَالَ: «أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً»... قَالَ: فَأَخْبِرْنِي عَنِ الإِحْسَانِ؟ قَالَ: «أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ»... ثُمَّ قَالَ: «يَا عُمَرُ أَتَدْرِي مَنِ السَّائِلُ؟ هَذَا جِبْرِيلُ أَتَاكُمْ يُعَلِّمُكُمْ دِينَكُمْ».",
    urdu: "حضرت عمر بن خطاب رضی اللہ عنہ فرماتے ہیں کہ ایک دن ہم رسول اللہ صلی اللہ علیہ وسلم کی بارگاہ میں حاضر تھے کہ اچانک ایک شخص تشریف لائے جن کے کپڑے نہایت سفید اور بال نہایت سیاہ تھے، ان پر سفر کا کوئی اثر ظاہر نہ تھا اور ہم میں سے کوئی انہیں پہچانتا بھی نہ تھا... انہوں نے سوال کیا: اے محمد! مجھے بتائیے اسلام کیا ہے؟ فرمایا: 'اسلام یہ ہے کہ تم گواہی دو کہ اللہ کے سوا کوئی معبود نہیں اور محمد اللہ کے رسول ہیں، نماز قائم کرو، زکوٰۃ ادا کرو، رمضان کے روزے رکھو اور اگر استطاعت ہو تو بیت اللہ کا حج کرو۔' انہوں نے پوچھا: مجھے احسان کے بارے میں بتائیے؟ فرمایا: 'احسان یہ ہے کہ تم اللہ کی عبادت اس طرح کرو گویا تم اسے دیکھ رہے ہو، اور اگر تم اسے نہ دیکھ سکو تو یقین جانو کہ وہ تمہیں دیکھ رہا ہے۔' پھر حضور نے فرمایا: 'اے عمر! جانتے ہو یہ سائل کون تھے؟ یہ حضرت جبریل تھے، تمہارے پاس آئے تھے تاکہ تمہیں تمہارا دین سکھائیں۔'",
    english: "Also on the authority of 'Umar (RA): One day while we were sitting with the Messenger of Allah (ﷺ), there appeared before us a man whose clothes were exceedingly white and whose hair was exceedingly black; no signs of travel were to be seen upon him, and none of us knew him... He said, 'O Muhammad, tell me about Islam.' The Messenger of Allah (ﷺ) said: 'Islam is to testify that there is no god but Allah and that Muhammad is the Messenger of Allah, to perform the prayers, to pay the Zakat, to fast in Ramadan, and to make the pilgrimage to the House if you are able.' He said, 'Tell me about Ihsan (excellence).' The Prophet said: 'It is to worship Allah as though you see Him, and if you do not see Him, then truly He sees you.' Then he said, 'O Umar, do you know who the questioner was? That was Gabriel, who came to teach you your religion.'",
    narrator: "Sayyiduna Umar ibn al-Khattab (RA)",
    grade: "Sahih (صحيح)",
    reference: "Sahih Muslim 8 & 40 Hadith an-Nawawi 2",
    tags: ["Hadith Jibril", "Islam", "Iman", "Ihsan", "Pillars"],
  },
];
