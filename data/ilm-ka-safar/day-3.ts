export type LanguageText = {
  en: string;
  hi: string;
  ur: string;
};

export type QuranReference = {
  surah: number;
  ayah: number;
};

export type DifficultWord = {
  arabic: string;
  meaning: LanguageText;
};

export type LessonSection =
  | {
      type: "heading";
      title: LanguageText;
    }
  | {
      type: "text";
      text: LanguageText;
    }
  | {
      type: "bismillah";
    }
  | {
      type: "quran";
      reference: QuranReference;
      translation: LanguageText;
      difficultWords?: DifficultWord[];
    };

export const day3 = {
  day: 3,

  title: {
    en: "Ilm Ka Safar — Day 3",
    hi: "इल्म का सफ़र — दिन ३",
    ur: "علم کا سفر — دن ۳",
  },

  subtitle: {
    en: "Allah Ta'ala hi hamara Rab hai",
    hi: "अल्लाह तआला ही हमारा रब है",
    ur: "اللہ تعالیٰ ہی ہمارا رب ہے",
  },

  autoModeNote: {
    en: "If Auto Mode is ON, tap any English text to change it to Urdu, then Hindi, then English. This can help you learn Urdu while reading. If Auto Mode is not ON, go to the Home Page and turn Auto Mode ON. We have worked hard to create this system especially for all of you.",

    hi: "अगर Auto Mode ON है, तो किसी भी English text पर tap करें। वह पहले Urdu, फिर Hindi और फिर English में बदलेगा। इससे पढ़ते हुए Urdu सीखने में मदद मिल सकती है। अगर Auto Mode ON नहीं है, तो Home Page पर जाकर Auto Mode ON करें। हमने यह system खास तौर पर आप सभी के लिए मेहनत से तैयार किया है।",

    ur: "اگر Auto Mode ON ہے تو کسی بھی English text پر tap کریں۔ وہ پہلے اردو، پھر ہندی اور پھر English میں تبدیل ہوگا۔ اس سے پڑھتے ہوئے اردو سیکھنے میں مدد مل سکتی ہے۔ اگر Auto Mode ON نہیں ہے تو Home Page پر جاکر Auto Mode ON کریں۔ ہم نے یہ system خاص طور پر آپ سب کے لیے محنت سے تیار کیا ہے۔",
  },

  sections: [
    {
      type: "text",
      text: {
        en: "In Day 1, we understood the Oneness of Allah Ta'ala. In Day 2, we understood that Allah Ta'ala is Ahad and As-Samad. Today, we will understand another fundamental point: Allah Ta'ala is our Rab, Who created us and granted us all kinds of blessings.",

        hi: "दिन 1 में हमने अल्लाह तआला की वहदानियत को समझा। दिन 2 में हमने समझा कि अल्लाह तआला अहद और अस-समद हैं। आज हम एक और बुनियादी बात समझेंगे: अल्लाह तआला ही हमारे रब हैं, जिन्होंने हमें पैदा फ़रमाया और हमें हर तरह की नेमतें अता फ़रमाईं।",

        ur: "دن ۱ میں ہم نے اللہ تعالیٰ کی وحدانیت سمجھی۔ دن ۲ میں ہم نے سمجھا کہ اللہ تعالیٰ اَحَد اور الصمد ہیں۔ آج ہم ایک اور بنیادی بات سمجھیں گے: اللہ تعالیٰ ہی ہمارا رب ہے، جس نے ہمیں پیدا فرمایا اور ہمیں ہر طرح کی نعمتیں عطا فرمائیں۔",
      },
    },

    {
      type: "bismillah",
    },

    {
      type: "heading",
      title: {
        en: "Qur'an-e-Pak ki Ayat",
        hi: "क़ुरआन-ए-पाक की आयत",
        ur: "قرآنِ پاک کی آیت",
      },
    },

    {
      type: "quran",
      reference: {
        surah: 2,
        ayah: 21,
      },

      translation: {
        en: "O people! Worship your Lord, Who created you and those before you, so that you may become righteous.",

        hi: "ऐ लोगो! अपने उस रब की बंदगी करो जिसने तुम्हें और तुमसे पहले लोगों को पैदा किया, इस उम्मीद पर कि तुम परहेज़गारी पाओ।",

        ur: "لوگو! بندگی کرو اپنے اس رب کی جو تمہارا اور تم سے پہلے لوگوں کا خالق ہے، اس امید پر کہ تمہیں پرہیزگاری ملے۔",
      },

      difficultWords: [
        {
          arabic: "يَا أَيُّهَا النَّاسُ",
          meaning: {
            en: "Yaa ayyuhan-naas — O people",
            hi: "या अय्युहन-नास — ऐ लोगो",
            ur: "يَا أَيُّهَا النَّاسُ — اے لوگو",
          },
        },

        {
          arabic: "اعْبُدُوا",
          meaning: {
            en: "I'budoo — Worship / Serve",
            hi: "इ'बुदू — इबादत करो / बंदगी करो",
            ur: "اعْبُدُوا — عبادت کرو / بندگی کرو",
          },
        },

        {
          arabic: "رَبَّكُمْ",
          meaning: {
            en: "Rabbakum — Your Lord",
            hi: "रब्बकुम — तुम्हारा रब",
            ur: "رَبَّكُمْ — تمہارا رب",
          },
        },

        {
          arabic: "الَّذِي",
          meaning: {
            en: "Allazee — The One Who",
            hi: "अल्लज़ी — वह जो",
            ur: "الَّذِي — وہ جو",
          },
        },

        {
          arabic: "خَلَقَكُمْ",
          meaning: {
            en: "Khalaqakum — Who created you",
            hi: "ख़लक़कुम — जिसने तुम्हें पैदा फ़रमाया",
            ur: "خَلَقَكُمْ — جس نے تمہیں پیدا فرمایا",
          },
        },

        {
          arabic: "لَعَلَّكُمْ تَتَّقُونَ",
          meaning: {
            en: "La'allakum tattaqoon — So that you may become righteous",
            hi: "लअल्लकुम तत्तक़ून — ताकि तुम परहेज़गार बनो",
            ur: "لَعَلَّكُمْ تَتَّقُونَ — تاکہ تم پرہیزگار بنو",
          },
        },
      ],
    },

    {
      type: "heading",
      title: {
        en: "Kanz-ul-Iman — Ala Hazrat Rahmatullahi Alaih",
        hi: "कंज़ुल ईमान — आला हज़रत रहमतुल्लाहि अलैह",
        ur: "کنزالایمان — اعلیٰ حضرت رحمۃ اللہ علیہ",
      },
    },

    {
      type: "text",
      text: {
        en: "Kanz-ul-Iman translation by Ala Hazrat Rahmatullahi Alaih:",

        hi: "आला हज़रत रहमतुल्लाहि अलैह का कंज़ुल ईमान अनुवाद:",

        ur: "اعلیٰ حضرت رحمۃ اللہ علیہ کا کنزالایمان ترجمہ:",
      },
    },

    {
      type: "text",
      text: {
        en: "O people! Worship your Lord, Who is the Creator of you and those before you, in the hope that you may attain righteousness.",

        hi: "ऐ लोगो! अपने उस रब की बंदगी करो जो तुम्हारा और तुमसे पहले लोगों का ख़ालिक़ है, इस उम्मीद पर कि तुम्हें परहेज़गारी मिले।",

        ur: "لوگو! بندگی کرو اپنے اس رب کی جو تمہارا اور تم سے پہلے لوگوں کا خالق ہے، اس امید پر کہ تمہیں پرہیزگاری ملے۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Asaan samajh",
        hi: "आसान समझ",
        ur: "آسان سمجھ",
      },
    },

    {
      type: "text",
      text: {
        en: "Allah Ta'ala commands us to worship Him because He created us and those who came before us.",

        hi: "अल्लाह तआला हमें अपनी इबादत का हुक्म देता है, क्योंकि उसी ने हमें और हमसे पहले लोगों को पैदा फ़रमाया।",

        ur: "اللہ تعالیٰ ہمیں اپنی عبادت کا حکم دیتا ہے، کیونکہ اسی نے ہمیں اور ہم سے پہلے لوگوں کو پیدا فرمایا۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Qur'an ke Alfaaz Samjhein",
        hi: "क़ुरआन के अल्फ़ाज़ समझें",
        ur: "قرآن کے الفاظ سمجھیں",
      },
    },

    {
      type: "heading",
      title: {
        en: "Rabb ka matlab kya hai?",
        hi: "रब का मतलब क्या है?",
        ur: "رب کا مطلب کیا ہے؟",
      },
    },

    {
      type: "text",
      text: {
        en: "Rabb does not simply mean 'the One who creates'. Allah Ta'ala alone is our Parwardigar, Master and the true One worthy of worship.",

        hi: "रब का मतलब सिर्फ़ 'पैदा करने वाला' कहना ही नहीं है। अल्लाह तआला ही हमारे परवरदिगार, मालिक और हक़ीक़ी माबूद हैं।",

        ur: "رب صرف 'پیدا کرنے والا' کہنے تک محدود نہیں۔ اللہ تعالیٰ ہی ہمارا پروردگار، مالک اور حقیقی معبود ہے۔",
      },
    },

    {
      type: "text",
      text: {
        en: "Therefore, when we say:",

        hi: "इसलिए जब हम कहते हैं:",

        ur: "اس لیے جب ہم کہتے ہیں:",
      },
    },

    {
      type: "text",
      text: {
        en: "Rabbi Allah — My Lord is Allah.",

        hi: "रब्बियल्लाह — मेरा रब अल्लाह है।",

        ur: "رَبِّيَ اللّٰهُ — میرا رب اللہ ہے۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Allah Ta'ala ki ne'maton ko pehchanna",
        hi: "अल्लाह तआला की नेमतों को पहचानना",
        ur: "اللہ تعالیٰ کی نعمتوں کو پہچاننا",
      },
    },

    {
      type: "text",
      text: {
        en: "We see many blessings of Allah Ta'ala in our lives:",

        hi: "हम अपनी ज़िंदगी में अल्लाह तआला की बहुत सी नेमतें देखते हैं:",

        ur: "ہم اپنی زندگی میں اللہ تعالیٰ کی بہت سی نعمتیں دیکھتے ہیں:",
      },
    },

    {
      type: "text",
      text: {
        en: "Life\nHealth\nIntelligence\nKnowledge\nProvision\nBreath\nWater\nHome and wealth\nAnd the greatest blessing — Imaan",

        hi: "ज़िंदगी\nसेहत\nअक़्ल\nइल्म\nरिज़्क़\nसाँस\nपानी\nघर और माल\nऔर सबसे बड़ी नेमत — ईमान",

        ur: "زندگی\nصحت\nعقل\nعلم\nرزق\nسانس\nپانی\nگھر اور مال\nاور سب سے بڑی نعمت — ایمان",
      },
    },

    {
      type: "text",
      text: {
        en: "Our life, health, intelligence, knowledge, provision and Imaan are all blessings from Allah Ta'ala.",

        hi: "हमारी ज़िंदगी, सेहत, अक़्ल, इल्म, रिज़्क़ और ईमान सब अल्लाह तआला की अता हैं।",

        ur: "ہماری زندگی، صحت، عقل، علم، رزق اور ایمان سب اللہ تعالیٰ کی عطائیں ہیں۔",
      },
    },

    {
      type: "text",
      text: {
        en: "Therefore, a servant should be grateful to Allah Ta'ala.",

        hi: "इसलिए बंदे को अल्लाह तआला का शुक्र अदा करना चाहिए।",

        ur: "اس لیے بندے کو اللہ تعالیٰ کا شکر ادا کرنا چاہیے۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Aaj ki sabse important baat",
        hi: "आज की सबसे महत्वपूर्ण बात",
        ur: "آج کی سب سے اہم بات",
      },
    },

    {
      type: "text",
      text: {
        en: "The Allah Ta'ala Who created us is our Rab, and He alone is the true One worthy of worship.",

        hi: "जिस अल्लाह तआला ने हमें पैदा फ़रमाया, वही हमारे रब हैं और इबादत के लायक़ हक़ीक़ी माबूद भी वही हैं।",

        ur: "جس اللہ تعالیٰ نے ہمیں پیدا فرمایا، وہی ہمارا رب ہے اور عبادت کے لائق حقیقی معبود بھی وہی ہے۔",
      },
    },

    {
      type: "text",
      text: {
        en: "This is one of the fundamental matters of our Imaan and Aqeedah.",

        hi: "यह हमारे ईमान और अकीदे की बुनियादी बातों में से है।",

        ur: "یہ بات ہمارے ایمان اور عقیدہ کی بنیادی باتوں میں سے ہے۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Dua",
        hi: "दुआ",
        ur: "دعا",
      },
    },

    {
      type: "text",
      text: {
        en: "May Allah Ta'ala grant us the ability to recognize our Lord, be grateful for His blessings, gain correct knowledge, and act upon that knowledge.",

        hi: "अल्लाह तआला हमें अपने रब को पहचानने, उसकी नेमतों का शुक्र अदा करने, सही इल्म हासिल करने और उस इल्म पर अमल करने की तौफ़ीक़ अता फ़रमाएँ।",

        ur: "اللہ تعالیٰ ہمیں اپنے رب کو پہچاننے، اس کی نعمتوں کا شکر ادا کرنے، صحیح علم حاصل کرنے اور اس علم پر عمل کرنے کی توفیق عطا فرمائے۔",
      },
    },

    {
      type: "text",
      text: {
        en: "Aameen Ya Rabbal-'Aalameen.",

        hi: "आमीन या रब्बल-आलमीन।",

        ur: "آمین یا رب العالمین۔",
      },
    },

    {
      type: "text",
      text: {
        en: "Ilm Ka Safar jaari rahega, InshaAllah.",

        hi: "इल्म का सफ़र जारी रहेगा, इंशाअल्लाह।",

        ur: "علم کا سفر جاری رہے گا، ان شاء اللہ۔",
      },
    },
  ],
} satisfies {
  day: number;
  title: LanguageText;
  subtitle: LanguageText;
  autoModeNote: LanguageText;
  sections: LessonSection[];
};
