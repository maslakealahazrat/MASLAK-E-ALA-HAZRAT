import type { LanguageText, LessonSection } from "./day-1";

export type FullLesson = {
  day: number;
  title: LanguageText;
  subtitle: LanguageText;
  category: string;
  autoModeNote?: LanguageText;
  sections: LessonSection[];
  practicalAmal: LanguageText;
  dailyDua: {
    arabic: string;
    transliteration: string;
    meaning: LanguageText;
  };
};

export const ALL_30_DAYS_LESSONS: Record<number, FullLesson> = {
  1: {
    day: 1,
    title: {
      en: "Ilm Ka Safar — Day 1",
      hi: "इल्म का सफ़र — दिन 1",
      ur: "علم کا سفر — دن ۱",
    },
    subtitle: {
      en: "Seeking Knowledge & Purity of Intention (Niyyah)",
      hi: "इल्म हासिल करने की फ़ज़ीलत और नियत",
      ur: "طلبِ علم کی فضیلت اور اخلاصِ نیت",
    },
    category: "Aqaid & Niyyah",
    sections: [
      { type: "bismillah" },
      {
        type: "heading",
        title: {
          en: "The Supreme Honor of Seeking Sacred Knowledge",
          hi: "इल्म-ए-दीन सीखने का आला मक़ाम",
          ur: "حصولِ علمِ دین کا بلند مرتبہ",
        },
      },
      {
        type: "quran",
        reference: { surah: 58, ayah: 11 },
        translation: {
          en: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
          hi: "अल्लाह तुम में से ईमान वालों के और जिनको इल्म दिया गया उनके दर्जे बुलंद फ़रमाता है।",
          ur: "اللہ تمہارے ایمان والوں کے اور ان کے جن کو علم دیا گیا درجے بلند فرماتا ہے۔ (کنز الایمان)",
        },
      },
      {
        type: "text",
        text: {
          en: "The Beloved Messenger of Allah ﷺ stated: 'Seeking knowledge is an obligation upon every Muslim' (Sunan Ibn Majah). Knowledge of basic faith, halal and haram, and obligatory prayers is mandatory for every believer. Purity of intention (Ikhlas) is the key — we seek knowledge solely for the pleasure of Allah and to follow the Sunnah of the Prophet ﷺ.",
          hi: "हुज़ूर नबी-ए-करीम ﷺ ने फ़रमाया: 'इल्म हासिल करना हर मुसलमान पर फ़र्ज़ है।' बुनियादी अक़ाइद, हलाल व हराम की पहचान और नमाज़ के मसाइल सीखना हर मोमिन पर लाज़िम है। सारी इबादतों की जान 'इख़लास' (सच्ची नियत) है।",
          ur: "رسول اللہ ﷺ نے ارشاد فرمایا: 'طلب العلم فريضة على كل مسلم' (علم حاصل کرنا ہر مسلمان پر فرض ہے)۔ بنیادی عقائد، نماز و طہارت اور حلال و حرام کا ضروری علم سیکھنا ہر مسلمان پر فرض ہے۔ علم ہمیشہ اللہ کی رضا اور شریعت پر عمل کی نیت سے حاصل کرنا چاہیے۔",
        },
      },
    ],
    practicalAmal: {
      en: "Renew your intention today: 'I am learning to please Allah, to remove ignorance, and to practice the Sunnah.'",
      hi: "आज अपनी नियत ताज़ा करें: 'मैं सिर्फ़ अल्लाह की रज़ा और सुन्नत पर अमल के लिए सीख रहा हूँ।'",
      ur: "آج اپنی نیت کی تجدید کریں: 'میں محض اللہ کی رضا، جہالت دور کرنے اور سنت پر عمل کی نیت سے سیکھ رہا ہوں۔'",
    },
    dailyDua: {
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidnee 'ilmaa",
      meaning: {
        en: "O my Lord! Increase me in knowledge. (Surah Ta-Ha 20:114)",
        hi: "ऐ मेरे रब! मुझे इल्म में और तरक़्क़ी अता फ़रमा।",
        ur: "اے میرے رب! مجھے علم میں زیادتی عطا فرما۔ (۲۰:۱۱۴)",
      },
    },
  },

  2: {
    day: 2,
    title: {
      en: "Ilm Ka Safar — Day 2",
      hi: "इल्म का सफ़र — दिन 2",
      ur: "علم کا سفر — دن ۲",
    },
    subtitle: {
      en: "The Articles of Faith (Iman-e-Mufassal)",
      hi: "ईमान-ए-मुफ़स्सल और बुनियादी अक़ाइद",
      ur: "ایمانِ مفصل اور بنیادی عقائد",
    },
    category: "Creed (Aqaid)",
    sections: [
      { type: "bismillah" },
      {
        type: "heading",
        title: {
          en: "The Six Pillars of Islamic Belief",
          hi: "ईमान के छः बुनियादी अरकान",
          ur: "ایمان کے چھ بنیادی ارکان",
        },
      },
      {
        type: "quran",
        reference: { surah: 2, ayah: 285 },
        translation: {
          en: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers...",
          hi: "रसूल ने ईमान रखा उस पर जो उनके रब की तरफ़ से उन पर उतरा और मोमिनों ने भी; सबने ईमान लाया अल्लाह पर और उसके फ़रिश्तों पर और उसकी किताबों पर और उसके रसूलों पर...",
          ur: "رسول ایمان لائے اس پر جو ان کے رب کی طرف سے ان پر اترا اور مسلمان بھی؛ سب نے مانا اللہ کو اور اس کے فرشتوں کو اور اس کی کتابوں کو اور اس کے رسولوں کو... (کنز الایمان)",
        },
      },
      {
        type: "text",
        text: {
          en: "Iman-e-Mufassal summarizes the core creed of Islam: (1) Belief in Allah, (2) Belief in His Angels, (3) Belief in the Divine Scriptures, (4) Belief in all Prophets and Messengers with Sayyiduna Muhammad ﷺ as the seal and finality, (5) Belief in the Day of Judgment, and (6) Belief in Divine Decree (Taqdeer).",
          hi: "ईमान-ए-मुफ़स्सल में इस्लामी अक़ीदे का निचोड़ है: अल्लाह तआला पर, उसके पाक फ़रिश्तों पर, उसकी आसमानी किताबों पर, तमाम नबियों पर (हुज़ूर ﷺ को आख़िरी नबी मानते हुए), क़यामत के दिन पर और अच्छी-बुरी तक़दीर पर ईमान रखना।",
          ur: "ایمانِ مفصل: 'آمنتُ باللہِ و ملائکتہِ و کتبہِ و رسلہِ و الیومِ الآخرِ و القدرِ خیرہِ و شرہِ من اللہِ تعالٰی و البعثِ بعد الموت'۔ ایمان دل کی تصدیق اور زبان کے اقرار کا نام ہے۔",
        },
      },
    ],
    practicalAmal: {
      en: "Recite the Kalimah Tayyibah and Iman-e-Mufassal with contemplation on their profound meaning.",
      hi: "कलिमा-ए-तय्यिबा और ईमान-ए-मुफ़स्सल को समझकर पढ़ें और दिल में यक़ीन ताज़ा करें।",
      ur: "کلمہ طیبہ اور ایمانِ مفصل کو سمجھ کر پڑھیں اور اپنے دل کے یقین کو جلا بخشیں۔",
    },
    dailyDua: {
      arabic: "آمَنْتُ بِاللّٰهِ وَرُسُلِهِ",
      transliteration: "Aamantu billaahi wa rusulihi",
      meaning: {
        en: "I have believed in Allah and His Messengers.",
        hi: "मैं अल्लाह और उसके रसूलों पर ईमान लाया।",
        ur: "میں اللہ اور اس کے رسولوں پر ایمان لایا।",
      },
    },
  },

  3: {
    day: 3,
    title: {
      en: "Ilm Ka Safar — Day 3",
      hi: "इल्म का सफ़र — दिन 3",
      ur: "علم کا سفر — دن ۳",
    },
    subtitle: {
      en: "Tawheed (Monotheism) & Safeguarding Faith",
      hi: "तौहीद की हक़ीक़त और शिर्क से हिफ़ाज़त",
      ur: "توحیدِ باری تعالیٰ اور شرک سے حفاظت",
    },
    category: "Tawheed",
    sections: [
      { type: "bismillah" },
      {
        type: "heading",
        title: {
          en: "The Absolute Unicity of Allah Almighty",
          hi: "अल्लाह तआला की यकताई और शान-ए-यकगानगी",
          ur: "اللہ تعالیٰ کی وحدانیت اور بے نیازی",
        },
      },
      {
        type: "quran",
        reference: { surah: 112, ayah: 1 },
        translation: {
          en: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'",
          hi: "तुम फ़रमाओ: वह अल्लाह है एक। अल्लाह बेनियाज़ है। न उसने किसी को जना और न वह किसी से जना गया। और न कोई उसके बराबर का है।",
          ur: "تم فرماؤ وہ اللہ ہے ایک۔ اللہ بے نیاز ہے۔ نہ اس کی کوئی اولاد اور نہ وہ کسی سے پیدا ہوا۔ اور نہ کوئی اس کے جوڑ کا ہے۔ (کنز الایمان)",
        },
      },
      {
        type: "text",
        text: {
          en: "Tawheed means affirming that Allah is unique in His Essence (Zat) and His Attributes (Sifat). None shares in His divinity, creation, or worship. Everything in the heavens and earth depends upon Him, while He is free from all needs.",
          hi: "तौहीद का मतलब है कि अल्लाह अपनी ज़ात और सिफ़ात में अकेला है। उसका कोई साझी या शरीक नहीं। वही सबका ख़ालिक़ और मालिक है और हर चीज़ उसी की मोहताज है।",
          ur: "توحید کا مفہوم یہ ہے کہ اللہ تعالیٰ اپنی ذات اور صفات میں یکتا ہے۔ اس کا کوئی شریک نہیں، نہ کوئی اس کا ثانی ہے۔ سب اس کے محتاج ہیں اور وہ کسی کا محتاج نہیں۔",
        },
      },
    ],
    practicalAmal: {
      en: "Recite Surah Al-Ikhlas 3 times today, equivalent in reward to reciting the entire Qur'an.",
      hi: "आज 3 बार सूरह अल-इख़्लास पढ़ें, जिसका सवाब पूरे क़ुरआन की तिलावत के बराबर है।",
      ur: "آج ۳ بار سورۃ الاخلاص کی تلاوت کریں جس کا ثواب پورے قرآنِ مجید کے برابر ہے۔",
    },
    dailyDua: {
      arabic: "لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
      transliteration: "Laa ilaaha illaa Anta subhaanaka innee kuntu minaz-zaalimeen",
      meaning: {
        en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers. (21:87)",
        hi: "तेरे सिवा कोई माबूद नहीं, तू पाक है, बेशक मैं ही क़ुसूरवार था।",
        ur: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک مجھ سے بے جا ہوا (۲۱:۸۷)",
      },
    },
  },
};

const REMAINING_LESSON_TITLES: Record<number, { en: string; hi: string; ur: string; category: string; desc: string }> = {
  4: { en: "The Finality of Prophethood (Khatm-e-Nubuwwat)", hi: "अक़ीदा-ए-ख़त्म-ए-नुबुव्वत ﷺ", ur: "عقیدۂ ختمِ نبوت ﷺ اور اس کی اہمیت", category: "Risalat", desc: "Sayyiduna Muhammad ﷺ is the Last and Final Messenger of Allah; no prophet can come after him." },
  5: { en: "Love and Reverence for the Prophet ﷺ (Ishq-e-Rasool)", hi: "हुज़ूर ﷺ की अज़मत और इश्क़-ए-रसूल", ur: "محبت اور تعظیمِ مصطفٰے ﷺ کی روح", category: "Ishq-e-Rasool", desc: "True faith requires placing love of the Prophet ﷺ above oneself, family, and all creation." },
  6: { en: "The Companions (Sahaba) & Ahl al-Bayt", hi: "सहाबा-ए-किराम और अहल-ए-बैत की अक़ीदत", ur: "صحابۂ کرام اور اہل بیتِ اطہار کی محبت", category: "Creed (Aqaid)", desc: "Revering the Four Caliphs, the Martyrs of Karbala, and the Blessed Household as guides." },
  7: { en: "Taharah (Purity) & 4 Fara'id of Wudu", hi: "पाकीज़गी की अहमियत और वुज़ू के 4 फ़राइज़", ur: "طہارت کی اہمیت اور وضو کے چار فرائض", category: "Fiqh (Taharah)", desc: "The four obligatory acts of Wudu and proper purification before standing before Allah." },
  8: { en: "Ghusl Essentials & Sunnah Method", hi: "ग़ुस्ल के फ़राइज़ और मुकम्मल तरीक़ा", ur: "غسل کے تین فرائض اور مسنون طریقہ", category: "Fiqh (Taharah)", desc: "Rinsing mouth thoroughly, water in nostrils, and washing the entire body completely without dryness." },
  9: { en: "The Five Daily Prayers (Salah)", hi: "पाँच वक़्त की नमाज़ की अज़मत और फ़ज़ीलत", ur: "پانچ وقت کی نماز کی عظمت اور ارکان", category: "Fiqh (Salah)", desc: "The pillar of religion, ascension of the believer, and the first question on the Day of Judgment." },
  10: { en: "Sajdah Sahw & Correcting Prayer Mistakes", hi: "सजदा-ए-सह्व और नमाज़ की इस्लाह", ur: "سجدۂ سہو کے احکام اور نماز کی درستی", category: "Fiqh (Salah)", desc: "Method and causes of compensating for unintentionally omitted or delayed Wajibat in prayer." },
  11: { en: "Friday Prayer (Jumu'ah) & Surah Al-Kahf", hi: "जुमुआ की नमाज़ और सूरह अल-कहफ़ की बरकत", ur: "نمازِ جمعہ اور سورۃ الکہف کی فضیلت", category: "Fiqh (Salah)", desc: "Virtues of Friday, bathing, wearing clean clothes, attar, listening to Khutbah silently, and reciting Surah Al-Kahf." },
  12: { en: "Tahajjud & The Voluntary Prayers (Nawafil)", hi: "तहज्जुद और नफ़्ल नमाज़ों का नूर", ur: "نمازِ تہجد اور نفلی عبادات کا نور", category: "Nawafil", desc: "The blessed late-night prayer, Ishraq, Chasht (Duha), and Awwabeen prayers." },
  13: { en: "Etiquettes of Holy Qur'an Recitation & Tajweed", hi: "क़ुरआन-ए-पाक की तिलावत के आदाब और तजवीद", ur: "تلاوتِ قرآن کے مسنون آداب اور تجوید", category: "Qur’an", desc: "Reciting with proper pronunciation (Tajweed), wudu, reverence, and listening silently when Qur'an is recited." },
  14: { en: "Secrets & Healing of Surah Al-Fatihah", hi: "सूरह अल-फ़ातिहा के असरार और शिफ़ा", ur: "سورۃ الفاتحہ کے انوار اور شفا", category: "Qur’an", desc: "The Mother of the Book (Umm al-Kitab), the seven oft-repeated verses, and dialogue with Allah." },
  15: { en: "Ayat al-Kursi — The Greatest Verse", hi: "आयतुल कुर्सी की अज़मत और बरकतें", ur: "آیت الکرسی کی عظمت اور حفاظت", category: "Qur’an", desc: "The supreme verse of divine lordship, protection against devils and evil when recited after Salah and before sleep." },
  16: { en: "Kanz-ul-Iman — Theological Masterpiece", hi: "कन्ज़ुल ईमान की ख़ुसूसियात और अदब", ur: "کنز الایمان کی خصوصیات اور عقیدتی کمال", category: "Translation", desc: "How Ala Hazrat preserved prophetic dignity and correct Islamic theology in his Urdu translation." },
  17: { en: "The Heart of the Qur'an: Surah Ya-Seen", hi: "क़ुरआन का दिल: सूरह यासीन की तिलावत", ur: "قرآن کا دل: سورۃ یٰسٓ کی فضیلت", category: "Qur’an", desc: "Resurrection, divine wisdom, signs in nature, and solace for departed souls." },
  18: { en: "Surah Al-Mulk — Intercessor in the Grave", hi: "सूरह अल-मुल्क: अज़ाब-ए-क़ब्र से नजात", ur: "سورۃ الملک: عذابِ قبر سے نجات کی ڈھال", category: "Qur’an", desc: "Reciting Surah Al-Mulk every night intercedes for the reciter until sins are forgiven." },
  19: { en: "Rights of Parents (Birr al-Walidayn)", hi: "वालिदैन (माता-पिता) के हुक़ूक़ और खिदमत", ur: "والدین کے حقوق اور خدمت کی برکات", category: "Akhlaq", desc: "The pleasure of Allah lies in the pleasure of parents; gentleness, obedience in permissible matters, and du'a." },
  20: { en: "Kinship Bonds & Neighbors' Rights", hi: "पड़ोसियों के हुक़ूक़ और सिला-ए-रेहमी", ur: "صلہ رحمی اور پڑوسیوں کے حقوق", category: "Muamalat", desc: "Treating neighbors with kindness regardless of religion, and joining broken family ties." },
  21: { en: "Guarding the Tongue from Backbiting (Gheebah)", hi: "ज़बान की हिफ़ाज़त, ग़ीबत और झूठ से परहेज़", ur: "زبان کی حفاظت، غیبت اور جھوٹ سے بچاؤ", category: "Tazkiyah", desc: "Backbiting is like eating the flesh of a dead brother; speaking good or remaining silent." },
  22: { en: "Halal Sustenance & Honest Livelihood", hi: "हलाल रोज़ी की बरकत और सूद (रबा) की हुरमत", ur: "حلال روزی کی برکت اور سود کی ممانعت", category: "Muamalat", desc: "Honesty in commerce, avoiding usury and fraud, and the acceptance of prayers through halal food." },
  23: { en: "Patience (Sabr) in Calamities & Gratitude (Shukr)", hi: "सब्र और शुक्र का आला मर्तबा", ur: "صبر و شکر کا مقام اور اجرِ عظیم", category: "Tazkiyah", desc: "Patience at the first strike of calamity; thanking Allah in prosperity and difficulty." },
  24: { en: "Haya (Modesty) & Noble Character", hi: "हया और अख़लाक़-ए-हसना", ur: "حیا اور اخلاقِ حسنہ کی فضیلت", category: "Akhlaq", desc: "Modesty is an essential branch of Iman; lowering the gaze and noble demeanor." },
  25: { en: "The Daily Sunnahs of Prophet Muhammad ﷺ", hi: "रोज़मर्रा की मुबारक सुन्नतें", ur: "روزمرہ کی مسنون ادعیہ اور سنتیں", category: "Sunnah", desc: "Sunnah of eating, drinking, sleeping on the right side, greeting with Salam, and smiling." },
  26: { en: "The Ocean of Salawat (Durood Shareef)", hi: "कसरत-ए-दुरूद शरीफ़ के फ़ज़ाइल व बरकात", ur: "کثرتِ درود شریف کے انوار و برکات", category: "Durood", desc: "Sending blessings upon the Prophet ﷺ removes grief, forgives sins, and earns his intercession." },
  27: { en: "Morning and Evening Protective Azkar", hi: "सुबह और शाम के मसनून अज़कार", ur: "صبح و شام کے مسنون اذکار و دعائیں", category: "Dua & Zikr", desc: "Daily spiritual fortification with Ayatul Kursi, 3 Quls, and authentic Prophetic supplications." },
  28: { en: "Sincere Repentance (Tawbah Nasuha)", hi: "सच्ची तौबा (तौबा-ए-नसूस) का तरीक़ा", ur: "سچی توبہ اور استغفار کی قبولیت", category: "Tazkiyah", desc: "Remorse, abandoning sin, resolving never to return, and restoring any wronged rights." },
  29: { en: "The Friends of Allah (Awliya Allah)", hi: "औलिया-ए-किराम की मोहब्बत और फैज़ान", ur: "اولیائے کرام کی شان اور فیضانِ صحبت", category: "Spiritual", desc: "The saints experience neither fear nor grief; taking beneficial companionship from righteous guides." },
  30: { en: "Steadfastness (Istiqamat) & Blessed Ending", hi: "दीन पर इस्तिराक़त और हुस्न-ए-ख़ातिमा की दुआ", ur: "دین پر استقامت اور حسنِ خاتمہ کی دعا", category: "Culmination", desc: "Remaining firm upon faith until the last breath; completing the 30-day journey with gratitude." },
};

export function getFullLessonForDay(dayNumber: number): FullLesson {
  if (ALL_30_DAYS_LESSONS[dayNumber]) {
    return ALL_30_DAYS_LESSONS[dayNumber];
  }

  const meta = REMAINING_LESSON_TITLES[dayNumber] || {
    en: `Ilm Ka Safar — Day ${dayNumber}`,
    hi: `इल्म का सफ़र — दिन ${dayNumber}`,
    ur: `علم کا سفر — دن ${dayNumber}`,
    category: "Islamic Knowledge",
    desc: "Essential Islamic knowledge, guidance from Qur'an and Sunnah.",
  };

  return {
    day: dayNumber,
    title: {
      en: `Ilm Ka Safar — Day ${dayNumber}`,
      hi: `इल्म का सफ़र — दिन ${dayNumber}`,
      ur: `علم کا سفر — دن ${dayNumber}`,
    },
    subtitle: {
      en: meta.en,
      hi: meta.hi,
      ur: meta.ur,
    },
    category: meta.category,
    sections: [
      { type: "bismillah" },
      {
        type: "heading",
        title: {
          en: meta.en,
          hi: meta.hi,
          ur: meta.ur,
        },
      },
      {
        type: "text",
        text: {
          en: meta.desc + " Practicing this in daily life brings spiritual illumination, steadfastness, and immense reward from Allah Almighty.",
          hi: meta.desc + " इस पर अमल करने से ज़िन्दगी में रूहानी सुकून, बरकत और अल्लाह तआला का क़ुर्ब हासिल होता है।",
          ur: meta.desc + " اس پر خلوصِ دل کے ساتھ عمل کرنا روح کی پاکیزگی، زندگی میں برکت اور قربِ الٰہی کا ذریعہ ہے۔",
        },
      },
    ],
    practicalAmal: {
      en: `Reflect on Day ${dayNumber} lesson and implement its teaching into your daily worship and moral conduct.`,
      hi: `दिन ${dayNumber} के सबक़ पर ग़ौर करें और इसे अपनी रोज़मर्रा की ज़िन्दगी में शामिल करें।`,
      ur: `دن ${dayNumber} کے سبق پر غور کریں اور اس پر عمل کو اپنی زندگی کا حصہ بنائیں۔`,
    },
    dailyDua: {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
      transliteration: "Allahumma innee as-aluka 'ilman naafi'an wa rizqan tayyiban wa 'amalan mutaqabbalaa",
      meaning: {
        en: "O Allah, I ask You for beneficial knowledge, good pure sustenance, and deeds that are accepted.",
        hi: "ऐ अल्लाह! मैं तुझसे नफ़ा बख़्शने वाले इल्म, पाकीज़ा रिज़्क़ और क़बूल होने वाले आमाल का सवाल करता हूँ।",
        ur: "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ روزی اور قبول ہونے والے عمل کا سوال کرتا ہوں۔",
      },
    },
  };
}
