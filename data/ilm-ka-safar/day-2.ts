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

export const day2 = {
  day: 2,

  title: {
    en: "Ilm Ka Safar — Day 2",
    hi: "इल्म का सफ़र — दिन 2",
    ur: "علم کا سفر — دن ۲",
  },

  subtitle: {
    en: "Allah Ta'ala ki Wahdaniyyat ko aur gehra samajhna",
    hi: "अल्लाह तआला की वहदानियत को और गहराई से समझना",
    ur: "اللہ تعالیٰ کی وحدانیت کو اور گہرا سمجھنا",
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
        en: "In Day 1, we introduced the Oneness of Allah Ta'ala through Surah Al-Ikhlas. Today, we will understand this belief a little more deeply.",

        hi: "दिन 1 में हमने सूरह अल-इख़लास के ज़रिए अल्लाह तआला की वहदानियत का बुनियादी परिचय हासिल किया। आज हम इसी अकीदे को थोड़ा और गहराई से समझेंगे।",

        ur: "دن ۱ میں ہم نے سورۂ اخلاص کے ذریعے اللہ تعالیٰ کی وحدانیت کا بنیادی تعارف کیا۔ آج ہم اسی عقیدے کو تھوڑا اور گہرائی سے سمجھیں گے۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Allah Ta'ala ek hai",
        hi: "अल्लाह तआला एक हैं",
        ur: "اللہ تعالیٰ ایک ہیں",
      },
    },

    {
      type: "text",
      text: {
        en: "Allah Ta'ala is One in His Being. The true One worthy of worship is only Allah Ta'ala. It is not correct to associate anyone with Him in worship.",

        hi: "अल्लाह तआला अपनी ज़ात में एक हैं। इबादत के लायक़ हक़ीक़ी माबूद सिर्फ़ अल्लाह तआला हैं। उनकी इबादत में किसी को शरीक करना दुरुस्त नहीं।",

        ur: "اللہ تعالیٰ اپنی ذات میں واحد ہیں۔ عبادت کے لائق حقیقی معبود صرف اللہ تعالیٰ ہیں۔ ان کی عبادت میں کسی کو شریک کرنا درست نہیں۔",
      },
    },

    {
      type: "bismillah",
    },

    {
      type: "heading",
      title: {
        en: "Qur'an-e-Pak ki ek azeem ayat",
        hi: "क़ुरआन-ए-पाक की एक अज़ीम आयत",
        ur: "قرآنِ پاک کی ایک عظیم آیت",
      },
    },

    {
      type: "quran",
      reference: {
        surah: 112,
        ayah: 1,
      },

      translation: {
        en: "Say: He is Allah, the One.",

        hi: "कहो: वह अल्लाह एक है।",

        ur: "تم فرماؤ: وہ اللہ ایک ہے۔",
      },

      difficultWords: [
        {
          arabic: "قُلْ",
          meaning: {
            en: "Qul — Farmaiye / Keh dijiye",
            hi: "क़ुल — फ़रमाइए / कह दीजिए",
            ur: "قُلْ — فرمائیے / کہہ دیجیے",
          },
        },

        {
          arabic: "هُوَ",
          meaning: {
            en: "Huwa — Woh",
            hi: "हुवा — वह",
            ur: "ہُوَ — وہ",
          },
        },

        {
          arabic: "اللّٰهُ",
          meaning: {
            en: "Allahu — Allah",
            hi: "अल्लाहु — अल्लाह",
            ur: "اللّٰهُ — اللہ",
          },
        },

        {
          arabic: "أَحَدٌ",
          meaning: {
            en: "Ahad — Ek / Yekta",
            hi: "अहद — एक / यकता",
            ur: "اَحَدٌ — ایک / یکتا",
          },
        },
      ],
    },

    {
      type: "text",
      text: {
        en: "The word Ahad describes the Oneness of Allah Ta'ala — Allah Ta'ala is One and incomparable in His Being.",

        hi: "अहद का शब्द अल्लाह तआला की वहदानियत को बयान करता है — अल्लाह तआला अपनी ज़ात में एक और बेमिसाल हैं।",

        ur: "اَحَد کا لفظ اللہ تعالیٰ کی وحدانیت کو بیان کرتا ہے — اللہ تعالیٰ اپنی ذات میں یکتا اور بے مثال ہیں۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Allah Ta'ala be-niyaz hai",
        hi: "अल्लाह तआला बेनियाज़ हैं",
        ur: "اللہ تعالیٰ بے نیاز ہیں",
      },
    },

    {
      type: "quran",
      reference: {
        surah: 112,
        ayah: 2,
      },

      translation: {
        en: "Allah is Independent of all and all depend upon Him.",

        hi: "अल्लाह बेनियाज़ हैं और सब उन्हीं के मोहताज हैं।",

        ur: "اللہ بے نیاز ہیں اور سب انہی کے محتاج ہیں۔",
      },

      difficultWords: [
        {
          arabic: "الصَّمَدُ",
          meaning: {
            en: "As-Samad — Independent of all, upon whom all depend",

            hi: "अस-समद — बेनियाज़, जिसके सब मोहताज हैं",

            ur: "الصَّمَدُ — بے نیاز، جس کی طرف سب اپنی حاجات میں رجوع کریں",
          },
        },
      ],
    },

    {
      type: "text",
      text: {
        en: "The meaning is that Allah Ta'ala is Independent of all, while everyone is dependent upon Him.",

        hi: "इसका मतलब यह है कि अल्लाह तआला बेनियाज़ हैं और सब उन्हीं के मोहताज हैं।",

        ur: "اس کا مفہوم یہ ہے کہ اللہ تعالیٰ بے نیاز ہیں اور سب ان کے محتاج ہیں۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Allah Ta'ala kisi ka mohtaj nahi",
        hi: "अल्लाह तआला किसी के मोहताज नहीं",
        ur: "اللہ تعالیٰ کسی کے محتاج نہیں",
      },
    },

    {
      type: "text",
      text: {
        en: "We are dependent upon Allah Ta'ala. Our life, our strength and every need of ours are by the command and gift of Allah Ta'ala.",

        hi: "हम अल्लाह तआला के मोहताज हैं। हमारी ज़िंदगी, हमारी ताक़त और हमारी हर ज़रूरत अल्लाह तआला के हुक्म और अता से है।",

        ur: "ہم اللہ تعالیٰ کے محتاج ہیں۔ ہماری زندگی، ہماری قوت اور ہماری ہر ضرورت اللہ تعالیٰ کے حکم اور عطا سے ہے۔",
      },
    },

    {
      type: "text",
      text: {
        en: "Therefore, the more a servant recognizes his Lord, the more the greatness of Allah Ta'ala and the desire for worship develops in his heart.",

        hi: "इसलिए बंदा जितना अपने रब को पहचानता है, उतना ही उसके दिल में अल्लाह तआला की अज़मत और बंदगी का जज़्बा पैदा होता है।",

        ur: "اس لیے بندہ جتنا اپنے رب کو پہچانتا ہے، اتنا ہی اس کے دل میں اللہ تعالیٰ کی عظمت اور بندگی کا جذبہ پیدا ہوتا ہے۔",
      },
    },

    {
      type: "heading",
      title: {
        en: "Aaj ka yaad rakhne wala point",
        hi: "आज का याद रखने वाला नुक्ता",
        ur: "آج کا یاد رکھنے والا نکتہ",
      },
    },

    {
      type: "text",
      text: {
        en: "Allah Ta'ala is One, Unique and Independent of all; and the true One worthy of worship is only Allah Ta'ala.",

        hi: "अल्लाह तआला एक हैं, बेमिसाल हैं, बेनियाज़ हैं; और इबादत के लायक़ हक़ीक़ी माबूद सिर्फ़ अल्लाह तआला हैं।",

        ur: "اللہ تعالیٰ ایک ہیں، بے مثال ہیں، بے نیاز ہیں؛ اور عبادت کے لائق حقیقی معبود صرف اللہ تعالیٰ ہیں۔",
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
        en: "Allah Ta'ala grant us correct belief and correct knowledge, grant us the ability to understand the Qur'an-e-Pak, and grant us the ability to act upon the knowledge we learn. Aameen.",

        hi: "अल्लाह तआला हमें सही अकीदा और सही इल्म अता फ़रमाएँ, क़ुरआन-ए-पाक को समझने की तौफ़ीक़ दें, और जो इल्म हम सीखें उस पर अमल करने की तौफ़ीक़ अता फ़रमाएँ। आमीन।",

        ur: "اللہ تعالیٰ ہمیں صحیح عقیدہ اور صحیح علم عطا فرمائے، قرآنِ پاک کو سمجھنے کی توفیق دے، اور جو علم ہم سیکھیں اس پر عمل کرنے کی توفیق عطا فرمائے۔ آمین۔",
      },
    },

    {
      type: "text",
      text: {
        en: "Ilm Ka Safar will continue, InshaAllah.",

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
