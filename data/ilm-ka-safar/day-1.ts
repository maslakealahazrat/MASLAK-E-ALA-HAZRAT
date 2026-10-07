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

export const day1 = {
  day: 1,

  title: {
    en: "Ilm Ka Safar — Day 1",
    hi: "इल्म का सफ़र — दिन 1",
    ur: "علم کا سفر — دن ۱",
  },

  subtitle: {
    en: "Allah Ta'ala ki Wahdaniyyat",
    hi: "अल्लाह तआला की वहदानियत",
    ur: "اللہ تعالیٰ کی وحدانیت",
  },

  autoModeNote: {
    en: "If Auto Mode is ON, tap any English text to change it to Urdu, then Hindi, then English. This can help you learn Urdu while reading. If Auto Mode is not ON, go to the Home Page and turn Auto Mode ON. We have worked hard to create this system especially for all of you.",

    hi: "अगर Auto Mode ON है, तो किसी भी English text पर tap करें। वह पहले Urdu, फिर Hindi और फिर English में बदलेगा। इससे पढ़ते हुए Urdu सीखने में मदद मिल सकती है। अगर Auto Mode ON नहीं है, तो Home Page पर जाकर Auto Mode ON करें। हमने यह system खास तौर पर आप सभी के लिए मेहनत से तैयार किया है।",

    ur: "اگر Auto Mode ON ہے تو کسی بھی English text پر tap کریں۔ وہ پہلے اردو، پھر ہندی اور پھر English میں تبدیل ہوگا۔ اس سے پڑھتے ہوئے اردو سیکھنے میں مدد مل سکتی ہے۔ اگر Auto Mode ON نہیں ہے تو Home Page پر جاکر Auto Mode ON کریں۔ ہم نے یہ system خاص طور پر آپ سب کے لیے محنت سے تیار کیا ہے۔",
  },

  sections: [

    {
      type: "heading",
      title: {
        en: "Allah Ta'ala ki Pehchaan",
        hi: "अल्लाह तआला की पहचान",
        ur: "اللہ تعالیٰ کی پہچان",
      },
    },

    {
      type: "text",
      text: {
        en: "Allah Ta'ala is One. He has no partner. He is the Creator of everything and everyone depends upon Him.",

        hi: "अल्लाह तआला एक हैं। उनका कोई शरीक नहीं। वह हर चीज़ के पैदा करने वाले हैं और हर कोई उन्हीं का मोहताज है।",

        ur: "اللہ تعالیٰ ایک ہیں۔ ان کا کوئی شریک نہیں۔ وہ ہر چیز کے پیدا کرنے والے ہیں اور ہر کوئی انہی کا محتاج ہے۔",
      },
    },

    {
      type: "bismillah",
    },

    {
      type: "heading",
      title: {
        en: "Surah Al-Ikhlas",
        hi: "सूरह अल-इख़लास",
        ur: "سورۂ اخلاص",
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
          arabic: "أَحَدٌ",
          meaning: {
            en: "One, absolutely unique",
            hi: "एक, बिल्कुल अद्वितीय",
            ur: "ایک، بالکل یکتا",
          },
        },
      ],
    },

    {
      type: "quran",

      reference: {
        surah: 112,
        ayah: 2,
      },

      translation: {
        en: "Allah is Independent of all and all depend upon Him.",

        hi: "अल्लाह बेनियाज़ है और सब उसी के मोहताज हैं।",

        ur: "اللہ بے نیاز ہے اور سب اسی کے محتاج ہیں۔",
      },

      difficultWords: [
        {
          arabic: "الصَّمَدُ",
          meaning: {
            en: "The One upon whom all depend",
            hi: "जिसके सब मोहताज हैं",
            ur: "جس کے سب محتاج ہیں",
          },
        },
      ],
    },

    {
      type: "quran",

      reference: {
        surah: 112,
        ayah: 3,
      },

      translation: {
        en: "He neither begets nor is born.",

        hi: "न वह किसी का बाप है और न वह पैदा किया गया।",

        ur: "نہ وہ کسی کا باپ ہے اور نہ وہ پیدا کیا گیا۔",
      },
    },

    {
      type: "quran",

      reference: {
        surah: 112,
        ayah: 4,
      },

      translation: {
        en: "And there is none comparable to Him.",

        hi: "और कोई उसके बराबर नहीं।",

        ur: "اور کوئی اس کے برابر نہیں۔",
      },
    },

    {
      type: "heading",

      title: {
        en: "What We Learn",
        hi: "हम क्या सीखते हैं",
        ur: "ہم کیا سیکھتے ہیں",
      },
    },

    {
      type: "text",

      text: {
        en: "We learn that Allah Ta'ala is One and Unique. He does not depend on anyone, while everyone depends on Him. Nothing and no one is equal to Him.",

        hi: "हम सीखते हैं कि अल्लाह तआला एक और बेमिसाल हैं। वह किसी के मोहताज नहीं, बल्कि सब उन्हीं के मोहताज हैं। कोई चीज़ और कोई व्यक्ति उनके बराबर नहीं।",

        ur: "ہم سیکھتے ہیں کہ اللہ تعالیٰ ایک اور بے مثال ہیں۔ وہ کسی کے محتاج نہیں بلکہ سب انہی کے محتاج ہیں۔ کوئی چیز اور کوئی شخص ان کے برابر نہیں۔",
      },
    },

    {
      type: "heading",

      title: {
        en: "Our Final Lesson",
        hi: "हमारा अंतिम सबक",
        ur: "ہمارا آخری سبق",
      },
    },

    {
      type: "text",

      text: {
        en: "The purpose of this lesson is to strengthen our belief in the Oneness of Allah Ta'ala and to understand the message of Surah Al-Ikhlas.",

        hi: "इस पाठ का उद्देश्य अल्लाह तआला की वहदानियत पर हमारे ईमान को मजबूत करना और सूरह अल-इख़लास के संदेश को समझना है।",

        ur: "اس سبق کا مقصد اللہ تعالیٰ کی وحدانیت پر ہمارے ایمان کو مضبوط کرنا اور سورۂ اخلاص کے پیغام کو سمجھنا ہے۔",
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
