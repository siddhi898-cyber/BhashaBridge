export interface DialectInfo {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  description: string;
  samplePhrase: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  audioText: string;
}

export interface TranscreationPreset {
  title: string;
  category: string;
  standardSource: string;
  dialectResult: string;
  audioPrompt: string;
  culturalMetaphor: string;
  glossary: { standard: string; dialect: string; meaning: string }[];
}

export interface LanguageData {
  code: string; // ISO 639-1
  bcp47: string; // BCP 47 for SpeechSynthesis
  name: string;
  nativeName: string;
  script: string;
  greeting: string;
  audioGreeting: string;
  roles: {
    teacher: string;
    student: string;
    parent: string;
  };
  ui: {
    appTitle: string;
    tagline: string;
    selectLanguage: string;
    chooseRole: string;
    startJourney: string;
    offlineMode: string;
    onlineMode: string;
    voiceActive: string;
    listenAudio: string;
    playHint: string;
    repeatAudio: string;
    submitAnswer: string;
    nextQuestion: string;
    score: string;
    correct: string;
    needsPractice: string;
    back: string;
    switchLanguage: string;
    speakNow: string;
    askBhashaBuddy: string;
  };
  dialects: DialectInfo[];
  rotiLesson: {
    title: string;
    subtitle: string;
    instructions: string;
    fractions: {
      fraction: string;
      label: string;
      vernacularTerm: string;
      description: string;
      audioSpoken: string;
    }[];
  };
  quiz: QuizQuestion[];
  parentCard: {
    title: string;
    childName: string;
    date: string;
    listenSpokenSummary: string;
    summaryAudioText: string;
    attendance: string;
    attendanceValue: string;
    masteredSkill: string;
    skillValue: string;
    teacherNoteTitle: string;
    teacherNote: string;
    voiceReplyBtn: string;
    voiceReplySent: string;
  };
  teacherDashboard: {
    title: string;
    metricsTitle: string;
    metrics: {
      comprehension: string;
      offlineSync: string;
      dialectRetention: string;
      activeStudents: string;
    };
    transcreationTitle: string;
    transcreationSubtitle: string;
    inputPlaceholder: string;
    transcreateBtn: string;
    presets: TranscreationPreset[];
  };
  buddyPrompts: {
    defaultGreeting: string;
    sampleQuestions: string[];
    responses: Record<string, string>;
  };
}

export const LANGUAGES: Record<string, LanguageData> = {
  hi: {
    code: 'hi',
    bcp47: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    greeting: 'नमस्ते! भाषाब्रिज में आपका स्वागत है',
    audioGreeting: 'नमस्ते! भाषा ब्रिज में आपका स्वागत है। अपनी भाषा में सीखें।',
    roles: {
      teacher: 'शिक्षक (Teacher)',
      student: 'विद्यार्थी (Student)',
      parent: 'अभिभावक (Parent)',
    },
    ui: {
      appTitle: 'भाषाब्रिज',
      tagline: 'गाँव और बोली के अनुकूल स्मार्ट शिक्षण',
      selectLanguage: 'अपनी पसंदीदा भाषा चुनें',
      chooseRole: 'आप कौन हैं?',
      startJourney: '90-सेकंड डेमो देखें',
      offlineMode: 'ऑफलाइन मोड सक्रिय',
      onlineMode: 'ऑनलाइन सिंक तैयार',
      voiceActive: 'आवाज चालू है',
      listenAudio: 'बोलकर सुनें',
      playHint: 'संकेत सुनें',
      repeatAudio: 'दोबारा सुनें',
      submitAnswer: 'उत्तर जाँचें',
      nextQuestion: 'अगला प्रश्न',
      score: 'अंक',
      correct: 'शाबाश! सही उत्तर',
      needsPractice: 'फिर से प्रयास करें',
      back: 'वापस जाएँ',
      switchLanguage: 'भाषा बदलें',
      speakNow: 'माइक दबाकर बोलें...',
      askBhashaBuddy: 'भाषा बडी से पूछें',
    },
    dialects: [
      { id: 'bhojpuri', name: 'Bhojpuri', nativeName: 'भोजपुरी', region: 'पूर्वी उत्तर प्रदेश व बिहार', description: 'ग्रामीण उदाहरण और लोकोक्तियों के साथ', samplePhrase: 'एह रोटी के चार बराबर हिस्सा में बाँटीं।' },
      { id: 'maithili', name: 'Maithili', nativeName: 'मैथिली', region: 'मिथिलांचल बिहार', description: 'मधुर मैथिली शब्दावली', samplePhrase: 'एहि रोटी के चारि खण्ड कऽ कऽ देखू।' },
      { id: 'awadhi', name: 'Awadhi', nativeName: 'अवधी', region: 'मध्य अवध उत्तर प्रदेश', description: 'अवधी लोकगीतों व कथाओं की लय में', samplePhrase: 'रोटी क चारि टुकड़ा करि के समझव।' },
      { id: 'braj', name: 'Braj Bhasha', nativeName: 'ब्रजभाषा', region: 'मथुरा, आगरा व चंबल', description: 'सहज ब्रज मुहावरे', samplePhrase: 'रोटी कूँ चारि कूँटा में बाँटि लौ।' }
    ],
    rotiLesson: {
      title: 'रोटी से भिन्न (Fractions) सीखें',
      subtitle: 'घर की रसोई से गणित का मजेदार सफर',
      instructions: 'रोटी के टुकड़ों को छूकर भिन्न समझें और स्थानीय उच्चारण सुनें।',
      fractions: [
        { fraction: '1', label: 'पूरी रोटी', vernacularTerm: 'अक्खा / समूची रोटी', description: 'एक पूरा भाग (1 Whole) - कुछ भी विभाजित नहीं किया गया।', audioSpoken: 'यह पूरी समूची एक रोटी है। जब तक कोई टुकड़ा नहीं होता, यह एक पूरा भाग है।' },
        { fraction: '1/2', label: 'आधी रोटी', vernacularTerm: 'आधा हिस्सा (1 बटा 2)', description: 'जब एक पूरी रोटी को 2 बराबर हिस्सों में बाँटते हैं, तो हर हिस्सा आधा (1/2) कहलाता है।', audioSpoken: 'आधी रोटी यानी एक बटा दो। दो बराबर हिस्सों में से एक हिस्सा।' },
        { fraction: '1/4', label: 'चौथाई रोटी', vernacularTerm: 'पाव रोटी (1 बटा 4)', description: 'चार बराबर टुकड़ों में से एक टुकड़ा पाव या चौथाई (1/4) होता है।', audioSpoken: 'चौथाई रोटी या पाव रोटी यानी एक बटा चार। चार बराबर टुकड़ों में से एक।' },
        { fraction: '3/4', label: 'तीन चौथाई', vernacularTerm: 'पौन रोटी (3 बटा 4)', description: 'चार में से तीन टुकड़े मिलाने पर पौन या तीन-चौथाई (3/4) बनता है।', audioSpoken: 'तीन चौथाई यानी पौन रोटी। चार में से तीन टुकड़े।' }
      ]
    },
    quiz: [
      {
        question: 'यदि माँ एक रोटी को 4 बच्चों में बराबर बाँटती हैं, तो प्रत्येक बच्चे को कितना भाग मिलेगा?',
        options: ['1/2 (आधी रोटी)', '1/4 (चौथाई या पाव रोटी)', '3/4 (पौन रोटी)', '1 (पूरी रोटी)'],
        correctIndex: 1,
        explanation: 'बहुत अच्छे! 4 बराबर हिस्सों में से हर बच्चे को एक टुकड़ा (1/4) मिलता है।',
        audioText: 'सही उत्तर है एक बटा चार। जब एक रोटी चार बच्चों में बराबर बँटती है तो सबको एक चौथाई हिस्सा मिलता है।'
      },
      {
        question: 'दो आधे टुकड़ों (1/2 + 1/2) को साथ जोड़ने पर क्या बनेगा?',
        options: ['1 पूरी रोटी', '1/4 टुकड़ा', '3/4 टुकड़ा', '2 रोटियाँ'],
        correctIndex: 0,
        explanation: 'बिल्कुल सही! दो आधे हिस्से मिलकर एक पूरी समूची रोटी बन जाते हैं।',
        audioText: 'बिल्कुल सही! दो आधे मिलकर एक पूरी रोटी बनाते हैं।'
      }
    ],
    parentCard: {
      title: 'दैनिक प्रगति पत्र (Parent Audio Card)',
      childName: 'आरव कुमार (कक्षा 4)',
      date: 'आज की अद्यतन रिपोर्ट',
      listenSpokenSummary: 'आज की प्रगति अपनी भाषा में सुनें',
      summaryAudioText: 'नमस्ते जी! आज आपके बेटे आरव ने रोटी की मदद से भिन्न गणित सीखा। उसने क्विज़ में पूरे अंक हासिल किए और कक्षा में अपने दो दोस्तों की मदद भी की। आरव की उपस्थिति सौ प्रतिशत है।',
      attendance: 'उपस्थिति',
      attendanceValue: '100% उपस्थित',
      masteredSkill: 'सीखा गया पाठ',
      skillValue: 'भिन्न (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'गुरुजी का संदेश',
      teacherNote: 'आरव ने आज बहुत रुचि से सवाल हल किए। घर पर भी रोटी बाँटने का अभ्यास कराएं।',
      voiceReplyBtn: 'गुरुजी को आवाज में उत्तर भेजें',
      voiceReplySent: 'आपका संदेश गुरुजी को रिकॉर्ड होकर भेज दिया गया है!'
    },
    teacherDashboard: {
      title: 'शिक्षक नियंत्रण कक्ष (Teacher Transcreation Studio)',
      metricsTitle: 'कक्षा प्रदर्शन अवलोकन',
      metrics: {
        comprehension: '92% स्थानीय समझ दर',
        offlineSync: '100% उपकरण सिंक',
        dialectRetention: '88% बोली स्मरण दर',
        activeStudents: '1,420 सक्रिय ग्रामीण छात्र',
      },
      transcreationTitle: 'बोली-संवेदनशील एआई अनुवादक (Dialect Transcreator)',
      transcreationSubtitle: 'कठिन पाठ्यपुस्तकीय भाषा को स्थानीय ग्रामीण मुहावरों और आवाज़ में बदलें',
      inputPlaceholder: 'मानक पाठ लिखें या नीचे दिया गया उदाहरण चुनें...',
      transcreateBtn: 'स्थानीय बोली में बदलें व आवाज़ तैयार करें',
      presets: [
        {
          title: 'प्रकाश संश्लेषण (Photosynthesis)',
          category: 'विज्ञान',
          standardSource: 'पादप सूर्य के प्रकाश, जल तथा कार्बन डाइऑक्साइड की उपस्थिति में पर्णहरित की सहायता से अपना भोजन संश्लेषित करते हैं।',
          dialectResult: 'जइसे हमनी के माई चूल्हा पर धूप अउर पानी से खाना बनावेली, वइसे ही पेड़-पौधा के हरियर पतई सूरज के रोशनी से आपन भोजन पकावेला।',
          audioPrompt: 'भोजपुरी बोली में सुनिए: जइसे हमनी के माई चूल्हा पर खाना बनावेली, वइसे ही पेड़ पौधा के हरियर पतई सूरज के रोशनी से आपन भोजन पकावेला।',
          culturalMetaphor: 'चूल्हा और रसोई में भोजन पकाने का घरेलू उदाहरण',
          glossary: [
            { standard: 'प्रकाश संश्लेषण', dialect: 'पतई के खाना बनावल', meaning: 'पौधों द्वारा धूप से भोजन बनाना' },
            { standard: 'पर्णहरित (Chlorophyll)', dialect: 'हरियर रंग', meaning: 'पत्तियों का हरा तत्व' }
          ]
        },
        {
          title: 'भिन्न और खेत का बँटवारा (Fractions in Farming)',
          category: 'गणित',
          standardSource: 'जब किसी पूर्ण इकाई को चार समान भागों में विभक्त किया जाता है, तो प्रत्येक भाग एक-चतुर्थांश कहलाता है।',
          dialectResult: 'जइसे एक बीघा खेत के चार बराबर हिस्सा कइके चार भाई में बाँटल जाला, त हर हिस्सा के पाव या एक चौथाई कहल जाला।',
          audioPrompt: 'अवधी बोली में सुनिए: एक बीघा खेत क चार हिस्सा कइके चार भाई में बाँटब, त हर टुकड़ा पाव खेत कहाई।',
          culturalMetaphor: 'खेत और बीघा की मेड़ का बँटवारा',
          glossary: [
            { standard: 'एक-चतुर्थांश', dialect: 'पाव हिस्सा', meaning: '1/4 भाग' },
            { standard: 'समान भाग', dialect: 'बराबर बाँट', meaning: 'बिना भेदभाव के बँटवारा' }
          ]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'नमस्ते! मैं हूँ भाषा बडी (Bhasha Buddy)। गणित, विज्ञान या अपनी भाषा में कोई भी सवाल पूछिए!',
      sampleQuestions: [
        'रोटी का आधा भाग क्या होता है?',
        '1/4 और 1/2 में से कौन बड़ा है?',
        'पौधे अपना खाना कैसे बनाते हैं?'
      ],
      responses: {
        'fraction': '1/2 (आधा भाग) 1/4 (चौथाई भाग) से बड़ा होता है! जब आप एक रोटी के दो टुकड़े करते हैं तो वह चार टुकड़ों वाले हिस्से से बड़ा होता है।',
        'roti': 'रोटी को जब हम 2 बराबर टुकड़ों में बाँटते हैं, तो प्रत्येक टुकड़ा आधा यानी 1/2 कहलाता है!',
        'default': 'बहुत अच्छा सवाल! भाषाब्रिज में हम हर कठिन विषय को गाँव की बोली और रसोई के आसान उदाहरणों से समझाते हैं।'
      }
    }
  },

  bn: {
    code: 'bn',
    bcp47: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    greeting: 'নমস্কার! ভাষা ব্রিজে আপনাকে স্বাগতম',
    audioGreeting: 'নমস্কার! ভাষা ব্রিজে স্বাগতম। নিজের মাতৃভাষায় সহজে শিখুন।',
    roles: {
      teacher: 'শিক্ষক (Teacher)',
      student: 'শিক্ষার্থী (Student)',
      parent: 'অভিভাবক (Parent)',
    },
    ui: {
      appTitle: 'ভাষা ব্রিজ',
      tagline: 'স্থানীয় উপভাষায় সহজ শিক্ষা',
      selectLanguage: 'আপনার ভাষা নির্বাচন করুন',
      chooseRole: 'আপনার ভূমিকা নির্বাচন করুন',
      startJourney: '৯০-সেকেন্ড ডেমো দেখুন',
      offlineMode: 'অফলাইন মোড সক্রিয়',
      onlineMode: 'অনলাইন সিঙ্ক প্রস্তুত',
      voiceActive: 'কণ্ঠস্বর চালু আছে',
      listenAudio: 'শুনে শুনুন',
      playHint: 'ইঙ্গিত শুনুন',
      repeatAudio: 'আবার শুনুন',
      submitAnswer: 'উত্তর পরীক্ষা করুন',
      nextQuestion: 'পরবর্তী প্রশ্ন',
      score: 'স্কোর',
      correct: 'চমৎকার! সঠিক উত্তর',
      needsPractice: 'আবার চেষ্টা করুন',
      back: 'ফিরে যান',
      switchLanguage: 'ভাষা পরিবর্তন',
      speakNow: 'মাইক টিপে কথা বলুন...',
      askBhashaBuddy: 'ভাষা বাডিকে জিজ্ঞাসা করুন',
    },
    dialects: [
      { id: 'sylheti', name: 'Sylheti', nativeName: 'সিলেটি', region: 'বরাক উপত্যকা ও উত্তর-পূর্ব', description: 'সিলেটি দেশজ উপমা সহ', samplePhrase: 'ই রুটিটারে চাইর টুকরা করি বাটি দেও।' },
      { id: 'rarhi', name: 'Rarh Banga', nativeName: 'রাঢ়ী বাংলা', region: 'গ্রামীণ বাঁকুড়া ও পুরুলিয়া', description: 'রাঢ় অঞ্চলের সহজ গ্রামীণ প্রকাশ', samplePhrase: 'রুটিখানকে চাইরটি সমান ভাগে ভাগ কর।' }
    ],
    rotiLesson: {
      title: 'রুটি দিয়ে ভগ্নাংশ (Fractions) শিখুন',
      subtitle: 'রান্নাঘরের খাবার থেকে গণিতের সহজ পাঠ',
      instructions: 'রুটির টুকরোগুলিতে স্পর্শ করে ভগ্নাংশ বুঝুন এবং মাতৃভাষায় উচ্চারণ শুনুন।',
      fractions: [
        { fraction: '1', label: 'সম্পূর্ণ রুটি', vernacularTerm: 'গোটা রুটি (১)', description: 'একটি পূর্ণ ভাগ (1 Whole) - কোনো ভাগ করা হয়নি।', audioSpoken: 'এটি একটি সম্পূর্ণ গোটা রুটি। সম্পূর্ণ এক অংশ।' },
        { fraction: '1/2', label: 'আধা রুটি', vernacularTerm: 'অর্ধেক অংশ (১/২)', description: 'একটি রুটি সমান ২ ভাগে ভাগ করলে প্রতিটি ভাগ হলো আধা (১/২)।', audioSpoken: 'আধা রুটি মানে এক এর দুই অংশ। দুটি সমান ভাগের একটি।' },
        { fraction: '1/4', label: 'সিকি রুটি', vernacularTerm: 'এক চতুর্থাংশ (১/৪)', description: 'চারটি সমান টুকরোর একটি টুকরোকে সিকি বা এক চতুর্থাংশ বলে।', audioSpoken: 'সিকি রুটি বা এক চতুর্থাংশ মানে এক এর চার অংশ।' },
        { fraction: '3/4', label: 'তিন চতুর্থাংশ', vernacularTerm: 'পৌনে অংশ (৩/৪)', description: 'চার ভাগের তিনটি ভাগ একসঙ্গে পৌনে অংশ।', audioSpoken: 'তিন চতুর্থাংশ বা পৌনে রুটি মানে চার ভাগের তিন ভাগ।' }
      ]
    },
    quiz: [
      {
        question: 'মা যদি একটি রুটি ৪ জন শিশুর মধ্যে সমানভাবে ভাগ করে দেন, তবে প্রত্যেকে কতটা অংশ পাবে?',
        options: ['১/২ (আধা রুটি)', '১/৪ (সিকি রুটি)', '৩/৪ (পৌনে রুটি)', '১ (গোটা রুটি)'],
        correctIndex: 1,
        explanation: 'খুব ভালো! ৪টি সমান টুকরোর মধ্যে প্রতিটি শিশু ১/৪ ভাগ পায়।',
        audioText: 'সঠিক উত্তর হলো এক এর চার অংশ বা সিকি রুটি।'
      }
    ],
    parentCard: {
      title: 'অভিভাবক ভয়েস রিপোর্ট (Parent Audio Card)',
      childName: 'সৌম্য দাস (চতুর্থ শ্রেণী)',
      date: 'আজকের দৈনিক আপডেট',
      listenSpokenSummary: 'আজকের পড়াশোনা আপনার ভাষায় শুনুন',
      summaryAudioText: 'নমস্কার! আজ আপনার সন্তান সৌম্য রুটি ও খাবারের উদাহরণ দিয়ে ভগ্নাংশ চমৎকারভাবে শিখেছে। কুইজে ও একশো শতাংশ নম্বর পেয়েছে। ওর উপস্থিতি একশো শতাংশ।',
      attendance: 'উপস্থিতি',
      attendanceValue: '১০০% উপস্থিত',
      masteredSkill: 'শেখা পাঠ',
      skillValue: 'ভগ্নাংশ (Fractions: ১/২, ১/৪)',
      teacherNoteTitle: 'শিক্ষকের বার্তা',
      teacherNote: 'সৌম্য ক্লাসে খুব মনোযোগী ছিল। বাড়িতেও রুটি ভাগ করার অঙ্ক অভ্যাস করাবেন।',
      voiceReplyBtn: 'শিক্ষককে মুখে বলে উত্তর দিন',
      voiceReplySent: 'আপনার ভয়েস মেসেজ শিক্ষকের কাছে পাঠানো হয়েছে!'
    },
    teacherDashboard: {
      title: 'শিক্ষক ট্রান্সক্রিয়েশন স্টুডিও (Teacher Dashboard)',
      metricsTitle: 'ক্লাস পর্যবেক্ষণ',
      metrics: {
        comprehension: '৯১% উপভাষাগত বোধগম্যতা',
        offlineSync: '১০০% ডিভাইস সিঙ্ক',
        dialectRetention: '৮৯% স্মৃতি ধরে রাখার হার',
        activeStudents: '১,২৮০ জন গ্রামীণ শিক্ষার্থী',
      },
      transcreationTitle: 'উপভাষা-সচেতন এআই অনুবাদক',
      transcreationSubtitle: 'কঠিন বইয়ের ভাষাকে গ্রামীণ লোকজ উপভাষায় রূপান্তরিত করুন',
      inputPlaceholder: 'বইয়ের পাঠ্য এখানে লিখুন...',
      transcreateBtn: 'স্থানীয় উপভাষায় রূপান্তর ও ভয়েস তৈরি করুন',
      presets: [
        {
          title: 'সালোকসংশ্লেষ (Photosynthesis)',
          category: 'বিজ্ঞান',
          standardSource: 'উদ্ভিদ সূর্যালোক, জল এবং কার্বন ডাই অক্সাইডের উপস্থিতিতে ক্লোরোফিলের সাহায্যে খাদ্য তৈরি করে।',
          dialectResult: 'যেমন মায়েরা উনুনে আঁচ দিয়ে চাল ফুটিয়ে ভাত রান্না করে, তেমনই গাছের সবুজ পাতা রোদের আলো নিয়ে খাবার তৈরি করে।',
          audioPrompt: 'যেমন মায়েরা উনুনে ভাত রাঁধে, গাছের সবুজ পাতা রোদের তাপে খাবার পাকায়।',
          culturalMetaphor: 'মাটির উনুনে ভাত রান্নার গ্রামীণ উদাহরণ',
          glossary: [
            { standard: 'সালোকসংশ্লেষ', dialect: 'পাতার রান্না', meaning: 'রোদের সাহায্যে খাদ্য তৈরি' }
          ]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'নমস্কার! আমি ভাষা বাডি (Bhasha Buddy)। যে কোনো প্রশ্ন করুন বাংলায়!',
      sampleQuestions: ['১/২ এবং ১/৪ এর মধ্যে কোনটি বড়?', 'গাছের পাতা কেন সবুজ হয়?'],
      responses: {
        'fraction': '১/২ (আধা অংশ) ১/৪ (সিকি অংশ) থেকে বড়! কারণ দুটি ভাগের একটি ভাগ চার ভাগের একটির চেয়ে আকারে অনেক বড়।',
        'default': 'দারুণ প্রশ্ন! ভাষা ব্রিজে আমরা কঠিন পড়া সহজে নিজের ভাষায় বুঝিয়ে দিই।'
      }
    }
  },

  mr: {
    code: 'mr',
    bcp47: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    greeting: 'नमस्कार! भाषाब्रिजमध्ये आपले स्वागत आहे',
    audioGreeting: 'नमस्कार! भाषा ब्रिजमध्ये आपले स्वागत आहे. आपल्या भाषेत सहज शिका.',
    roles: {
      teacher: 'शिक्षक (Teacher)',
      student: 'विद्यार्थी (Student)',
      parent: 'पालक (Parent)',
    },
    ui: {
      appTitle: 'भाषाब्रिज',
      tagline: 'स्थानिक बोलीभाषेत सोपे शिक्षण',
      selectLanguage: 'आपली भाषा निवडा',
      chooseRole: 'आपली भूमिका निवडा',
      startJourney: '९०-सेकंद डेमो पहा',
      offlineMode: 'ऑफलाइन मोड सुरू',
      onlineMode: 'ऑनलाइन सिंक सज्ज',
      voiceActive: 'आवाज सुरू आहे',
      listenAudio: 'ऐकून शिका',
      playHint: 'संकेत ऐका',
      repeatAudio: 'पुन्हा ऐका',
      submitAnswer: 'उत्तर तपासा',
      nextQuestion: 'पुढील प्रश्न',
      score: 'गुण',
      correct: 'शाब्बास! बरोबर उत्तर',
      needsPractice: 'पुन्हा प्रयत्न करा',
      back: 'मागे जा',
      switchLanguage: 'भाषा बदला',
      speakNow: 'माइक दाबून बोला...',
      askBhashaBuddy: 'भाषा बडीला विचारा',
    },
    dialects: [
      { id: 'ahirani', name: 'Ahirani', nativeName: 'अहिराणी', region: 'खान्देश (जळगाव, धुळे)', description: 'खानदेशी बोलीतील उदाहरणे', samplePhrase: 'या भाकरीना चार तुकडा करीसन वाटी ल्या।' },
      { id: 'varhadi', name: 'Varhadi', nativeName: 'वऱ्हाडी', region: 'विदर्भ', description: 'विदर्भातील सहज संवाद', samplePhrase: 'भाकरीचे चार तुकडे करून पाहा बरं।' }
    ],
    rotiLesson: {
      title: 'भाकरीवरून अपूर्णांक (Fractions) शिका',
      subtitle: 'स्वयंपाकघरातील भाकरीतून गणिताची सोपी ओळख',
      instructions: 'भाकरीचे तुकडे निवडून अपूर्णांक समजून घ्या आणि आवाज ऐका.',
      fractions: [
        { fraction: '1', label: 'पूर्ण भाकरी', vernacularTerm: 'अख्खी भाकरी (१)', description: 'एक पूर्ण भाग (1 Whole) - कोणताही तुकडा न केलेला.', audioSpoken: 'ही एक पूर्ण अख्खी भाकरी आहे. संपूर्ण एक भाग.' },
        { fraction: '1/2', label: 'अर्धी भाकरी', vernacularTerm: 'अर्धा भाग (१/२)', description: 'एका भाकरीचे दोन समान भाग केले तर प्रत्येक भाग अर्धा (१/२) होतो.', audioSpoken: 'अर्धी भाकरी म्हणजे एक छेद दोन भाग. दोन समान भागांपैकी एक.' },
        { fraction: '1/4', label: 'पाव भाकरी', vernacularTerm: 'पाव भाग (१/४)', description: 'चार समान तुकड्यांपैकी एक तुकडा म्हणजे पाव (१/४) भाग.', audioSpoken: 'पाव भाकरी म्हणजे एक छेद चार भाग. चार भागांपैकी एक.' },
        { fraction: '3/4', label: 'पाऊण भाकरी', vernacularTerm: 'पाऊण भाग (३/४)', description: 'चारपैकी तीन तुकडे मिळून पाऊण (३/४) भाग तयार होतो.', audioSpoken: 'पाऊण भाकरी म्हणजे तीन छेद चार भाग. चारपैकी तीन तुकडे.' }
      ]
    },
    quiz: [
      {
        question: 'आईने १ भाकरी ४ मुलांमध्ये समान वाटली, तर प्रत्येक मुलाला किती भाग मिळेल?',
        options: ['१/२ (अर्धी भाकरी)', '१/४ (पाव भाकरी)', '३/४ (पाऊण भाकरी)', '१ (पूर्ण भाकरी)'],
        correctIndex: 1,
        explanation: 'छान! ४ समान भागांपैकी प्रत्येकाला १/४ (पाव) भाकरी मिळते.',
        audioText: 'बरोबर उत्तर आहे एक छेद चार म्हणजेच पाव भाकरी.'
      }
    ],
    parentCard: {
      title: 'पालक आवाज अहवाल (Parent Audio Card)',
      childName: 'रोहन पाटील (इयत्ता ४ थी)',
      date: 'आजचा प्रगती अहवाल',
      listenSpokenSummary: 'आजचा अभ्यास मराठीत ऐका',
      summaryAudioText: 'नमस्कार! आज रोहनने भाकरीच्या तुकड्यांवरून अपूर्णांक खूप चांगल्या प्रकारे शिकून घेतले. चाचणीत त्याला पूर्ण गुण मिळाले आहेत. रोहनची उपस्थिती शंभर टक्के आहे.',
      attendance: 'उपस्थिती',
      attendanceValue: '१००% उपस्थित',
      masteredSkill: 'शिकलेला घटक',
      skillValue: 'अपूर्णांक (Fractions: १/२, १/४)',
      teacherNoteTitle: 'गुरुजींचा संदेश',
      teacherNote: 'रोहनने आज वर्गात छान उत्तरे दिली. घरीही भाकरी वाटून अपूर्णांक समजावून सांगा.',
      voiceReplyBtn: 'गुरुजींना आवाजात उत्तर पाठवा',
      voiceReplySent: 'आपला व्हॉइस मेसेज गुरुजींपर्यंत पोहोचला आहे!'
    },
    teacherDashboard: {
      title: 'शिक्षक नियंत्रण कक्ष (Teacher Studio)',
      metricsTitle: 'वर्ग प्रगती आढावा',
      metrics: {
        comprehension: '९४% स्थानिक आकलन दर',
        offlineSync: '१००% ऑफलाइन सुरक्षित',
        dialectRetention: '८७% स्मरण दर',
        activeStudents: '१,३५० सक्रिय ग्रामीण विद्यार्थी',
      },
      transcreationTitle: 'बोलीभाषा-सक्षम एआय भाषांतरकार',
      transcreationSubtitle: 'पुस्तकातील कठीण संकल्पना स्थानिक ग्रामीण संवादात रूपांतरित करा',
      inputPlaceholder: 'येथे पाठ्यपुस्तकातील मजकूर लिहा...',
      transcreateBtn: 'स्थानिक बोलीत रुपांतर करा व आवाज तयार करा',
      presets: [
        {
          title: 'प्रकाशसंश्लेषण (Photosynthesis)',
          category: 'विज्ञान',
          standardSource: 'वनस्पती सूर्यप्रकाशाच्या उपस्थितीत हरितद्रव्याच्या मदतीने स्वतःचे अन्न स्वतः तयार करतात.',
          dialectResult: 'जशी आपली आई चुलीवर जाळ लावून स्वयंपाक करते, तसेच झाडांची हिरवी पाने उन्हाच्या प्रकाशात स्वतःचे जेवण शिजवतात.',
          audioPrompt: 'जशी आई चुलीवर स्वयंपाक करते, तशी झाडांची पाने सूर्यप्रकाशात अन्न तयार करतात.',
          culturalMetaphor: 'मातीच्या चुलीवर स्वयंपाक करण्याचे घरगुती उदाहरण',
          glossary: [{ standard: 'प्रकाशसंश्लेषण', dialect: 'पानांचा स्वयंपाक', meaning: 'उन्हातून अन्न तयार करणे' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'नमस्कार! मी आहे भाषा बडी (Bhasha Buddy). गणित किंवा विज्ञानाचा कोणताही प्रश्न विचारा!',
      sampleQuestions: ['१/२ आणि १/४ मध्ये कोणते मोठे आहे?', 'भाकरीचे ४ तुकडे केले तर काय म्हणतात?'],
      responses: {
        'fraction': '१/२ (अर्धा भाग) हा १/४ (पाव भागा) पेक्षा मोठा असतो! कारण दोन समान भागांतील एक भाग हा चार तुकड्यांतील एका भागापेक्षा आकाराने मोठा असतो.',
        'default': 'छान प्रश्न विचारला! भाषाब्रिजमध्ये आम्ही प्रत्येक संकल्पना स्थानिक बोलीत आणि घरगुती उदाहरणांनी शिकवतो.'
      }
    }
  },

  ta: {
    code: 'ta',
    bcp47: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    greeting: 'வணக்கம்! பாஷாபிரிட்ஜ் உங்களை அன்புடன் வரவேற்கிறது',
    audioGreeting: 'வணக்கம்! பாஷாபிரிட்ஜ் உங்களை வரவேற்கிறது. உங்கள் தாய்மொழியில் எளிதாகக் கற்றுக்கொள்ளுங்கள்.',
    roles: {
      teacher: 'ஆசிரியர் (Teacher)',
      student: 'மாணவர் (Student)',
      parent: 'பெற்றோர் (Parent)',
    },
    ui: {
      appTitle: 'பாஷாபிரிட்ஜ்',
      tagline: 'வட்டார வழக்கில் எளிய கிராமப்புற கல்வி',
      selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      chooseRole: 'உங்கள் பங்கைத் தேர்வுசெய்க',
      startJourney: '90-வினாடி டெமோ காண்க',
      offlineMode: 'ஆஃப்லைன் முறை செயலில் உள்ளது',
      onlineMode: 'ஆன்லைன் ஒத்திசைவு தயார்',
      voiceActive: 'குரல் செயலில் உள்ளது',
      listenAudio: 'ஒலியைக் கேளுங்கள்',
      playHint: 'குறிப்பைக் கேளுங்கள்',
      repeatAudio: 'மீண்டும் கேளுங்கள்',
      submitAnswer: 'விடையைச் சரிபார்க்கவும்',
      nextQuestion: 'அடுத்த கேள்வி',
      score: 'மதிப்பெண்',
      correct: 'அருமை! சரியான விடை',
      needsPractice: 'மீண்டும் முயல்க',
      back: 'பின்செல்க',
      switchLanguage: 'மொழி மாற்றுக',
      speakNow: 'மைக் அழுத்திப் பேசுங்கள்...',
      askBhashaBuddy: 'பாஷா படியிடம் கேளுங்கள்',
    },
    dialects: [
      { id: 'kongu', name: 'Kongu Tamil', nativeName: 'கொங்குத் தமிழ்', region: 'கோவை & ஈரோடு', description: 'கொங்கு வட்டார வழக்குடன்', samplePhrase: 'இந்த ரொட்டிய நாலு பங்காப் பிரிச்சுக்கங்க.' },
      { id: 'madurai', name: 'Madurai Tamil', nativeName: 'மதுரைத் தமிழ்', region: 'மதுரை & தென் தமிழகம்', description: 'மதுரை வட்டார எளிய பேச்சு', samplePhrase: 'ரொட்டிய நாலு கூரா வெட்டிப் பாருங்கப்பு.' }
    ],
    rotiLesson: {
      title: 'ரொட்டியைக் கொண்டு பின்னங்கள் (Fractions) கற்போம்',
      subtitle: 'அடுப்பங்கரை உணவிலிருந்து எளிய கணிதப் பாடம்',
      instructions: 'ரொட்டித் துண்டுகளைத் தொட்டு பின்னங்களைப் புரிந்துகொண்டு ஒலியைக் கேளுங்கள்.',
      fractions: [
        { fraction: '1', label: 'முழு ரொட்டி', vernacularTerm: 'முழுசு (1)', description: 'ஒரு முழு பகுதி (1 Whole) - பிரிக்கப்படாத ரொட்டி.', audioSpoken: 'இது ஒரு முழு ரொட்டி. பிரிக்கப்படாத ஒன்று.' },
        { fraction: '1/2', label: 'அரை ரொட்டி', vernacularTerm: 'அரை பகுதி (1/2)', description: 'ஒரு ரொட்டியை 2 சம பகுதிகளாகப் பிரித்தால் ஒரு பகுதி அரை (1/2).', audioSpoken: 'அரை ரொட்டி என்பது இரண்டில் ஒரு பங்கு.' },
        { fraction: '1/4', label: 'கால் ரொட்டி', vernacularTerm: 'கால் பகுதி (1/4)', description: 'நான்கு சம துண்டுகளில் ஒரு துண்டு கால் (1/4) பங்கு ஆகும்.', audioSpoken: 'கால் ரொட்டி என்பது நான்கில் ஒரு பங்கு.' },
        { fraction: '3/4', label: 'முக்கால் ரொட்டி', vernacularTerm: 'முக்கால் பகுதி (3/4)', description: 'நான்கில் மூன்று பகுதிகள் சேர்ந்தால் முக்கால் (3/4).', audioSpoken: 'முக்கால் ரொட்டி என்பது நான்கில் மூன்று பங்கு.' }
      ]
    },
    quiz: [
      {
        question: 'அம்மா ஒரு ரொட்டியை 4 குழந்தைகளுக்குச் சமமாகப் பிரித்துக் கொடுத்தால், ஒவ்வொருவருக்கும் எவ்வளவு பங்கு கிடைக்கும்?',
        options: ['1/2 (அரை ரொட்டி)', '1/4 (கால் ரொட்டி)', '3/4 (முக்கால் ரொட்டி)', '1 (முழு ரொட்டி)'],
        correctIndex: 1,
        explanation: 'மிக நன்று! நான்கு சம துண்டுகளில் ஒவ்வொருவருக்கும் 1/4 (கால்) ரொட்டி கிடைக்கும்.',
        audioText: 'சரியான விடை நான்கில் ஒரு பங்கு அல்லது கால் ரொட்டி.'
      }
    ],
    parentCard: {
      title: 'பெற்றோர் குரல் அட்டை (Parent Audio Card)',
      childName: 'கவின் குமார் (வகுப்பு 4)',
      date: 'இன்றைய முன்னேற்ற அறிக்கை',
      listenSpokenSummary: 'இன்றைய பாட அறிக்கையை தமிழில் கேளுங்கள்',
      summaryAudioText: 'வணக்கம்! இன்று கவின் ரொட்டித் துண்டுகளைக் கொண்டு பின்னங்களை மிகச் சிறப்பாகக் கற்றுக்கொண்டான். வினாடி வினாவில் முழு மதிப்பெண் பெற்றுள்ளான். அவனது வருகை நூறு சதவீதம்.',
      attendance: 'வருகை',
      attendanceValue: '100% வருகை',
      masteredSkill: 'கற்ற பாடம்',
      skillValue: 'பின்னங்கள் (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'ஆசிரியர் செய்தி',
      teacherNote: 'கவின் வகுப்பில் ஆர்வமுடன் பயின்றான். வீட்டிலும் உணவைப் பிரித்துப் பின்னங்களை நினைவூட்டுங்கள்.',
      voiceReplyBtn: 'ஆசிரியருக்குக் குரலில் பதில் அனுப்பவும்',
      voiceReplySent: 'உங்கள் குரல் செய்தி ஆசிரியருக்கு அனுப்பப்பட்டது!'
    },
    teacherDashboard: {
      title: 'ஆசிரியர் பலகை (Teacher Transcreation Studio)',
      metricsTitle: 'வகுப்பறை முன்னேற்றம்',
      metrics: {
        comprehension: '93% புரிதல் விகிதம்',
        offlineSync: '100% சாதன ஒத்திசைவு',
        dialectRetention: '89% நினைவாற்றல் தக்கவைப்பு',
        activeStudents: '1,410 கிராமப்புற மாணவர்கள்',
      },
      transcreationTitle: 'வட்டார வழக்கு-உணர் ஏஐ மாற்றி',
      transcreationSubtitle: 'கடினமான பாடநூல் சொற்களை வட்டார கிராமப்புற உரையாடலாக மாற்றுக',
      inputPlaceholder: 'பாடநூல் உரையை உள்ளிடவும்...',
      transcreateBtn: 'வட்டார வழக்கிற்கு மாற்றி குரல் உருவாக்கு',
      presets: [
        {
          title: 'ஒளிச்சேர்க்கை (Photosynthesis)',
          category: 'அறிவியல்',
          standardSource: 'தாவரங்கள் சூரிய ஒளி மற்றும் பச்சையம் முன்னிலையில் தமக்குத் தேவையான உணவைத் தாமே தயாரிக்கின்றன.',
          dialectResult: 'நம்ம அம்மா அடுப்புல சோறு ஆக்குற மாதிரி, செடிகளோட பச்ச இலையும் சூரிய வெளிச்சத்த வெச்சு சமைக்குது.',
          audioPrompt: 'அம்மா அடுப்பில் சமைப்பது போல, செடியின் பச்சை இலைகள் சூரிய ஒளியில் உணவு சமைக்கின்றன.',
          culturalMetaphor: 'அடுப்பில் சமைக்கும் வாழ்வியல் உவமை',
          glossary: [{ standard: 'ஒளிச்சேர்க்கை', dialect: 'இலை சமையல்', meaning: 'சூரிய ஒளியில் உணவு தயாரித்தல்' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'வணக்கம்! நான் பாஷா படி (Bhasha Buddy). கணிதம் அல்லது அறிவியல் கேள்விகளைத் தமிழில் கேளுங்கள்!',
      sampleQuestions: ['1/2 மற்றும் 1/4-ல் எது பெரியது?', 'ரொட்டியை நான்காக வெட்டினால் என்ன பெயர்?'],
      responses: {
        'fraction': '1/2 (அரை பங்கு) என்பது 1/4 (கால் பங்கை) விடப் பெரியது! ஏனெனில் இரண்டு துண்டுகளில் ஒன்று, நான்கு துண்டுகளில் ஒன்றை விடப் பெரியது.',
        'default': 'அருமையான கேள்வி! பாஷாபிரிட்ஜில் கடினமான பாடங்களையும் எளிமையான கிராமத்து எடுத்துக்காட்டுகளோடு விளக்குகிறோம்.'
      }
    }
  },

  te: {
    code: 'te',
    bcp47: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    greeting: 'నమస్కారం! భాషాబ్రిడ్జ్‌కి స్వాగతం',
    audioGreeting: 'నమస్కారం! భాషాబ్రిడ్జ్‌కి స్వాగతం. మీ మాతృభాషలో సులభంగా నేర్చుకోండి.',
    roles: {
      teacher: 'ఉపాధ్యాయుడు (Teacher)',
      student: 'విద్యార్థి (Student)',
      parent: 'తల్లిదండ్రులు (Parent)',
    },
    ui: {
      appTitle: 'భాషాబ్రిడ్జ్',
      tagline: 'స్థానిక మాండలికాల్లో గ్రామీణ విద్య',
      selectLanguage: 'భాషను ఎంచుకోండి',
      chooseRole: 'మీ పాత్రను ఎంచుకోండి',
      startJourney: '90-సెకన్ల డెమో చూడండి',
      offlineMode: 'ఆఫ్‌లైన్ మోడ్ సిద్ధంగా ఉంది',
      onlineMode: 'ఆన్‌లైన్ సింక్ సిద్ధం',
      voiceActive: 'వాయిస్ ఆన్‌లో ఉంది',
      listenAudio: 'వినండి',
      playHint: 'సూచన వినండి',
      repeatAudio: 'మళ్ళీ వినండి',
      submitAnswer: 'సమాధానం సరిచూడండి',
      nextQuestion: 'తరువాతి ప్రశ్న',
      score: 'స్కోరు',
      correct: 'శభాష్! సరైన సమాధానం',
      needsPractice: 'మళ్లీ ప్రయత్నించండి',
      back: 'వెనుకకు',
      switchLanguage: 'భాష మార్చుకోండి',
      speakNow: 'మైక్ నొక్కి మాట్లాడండి...',
      askBhashaBuddy: 'భాషా బడ్డీని అడగండి',
    },
    dialects: [
      { id: 'telangana', name: 'Telangana Telugu', nativeName: 'తెలంగాణ మాండలికం', region: 'తెలంగాణ గ్రామీణ ప్రాంతాలు', description: 'సహజమైన తెలంగాణ జానపద పదాలతో', samplePhrase: 'ఈ రొట్టెను నాల్గు సమ భాగాలు జేసి సూడుండ్రి.' },
      { id: 'rayalaseema', name: 'Rayalaseema Telugu', nativeName: 'రాయలసీమ మాండలికం', region: 'రాయలసీమ', description: 'రాయలసీమ జీవనశైలి ఉదాహరణలతో', samplePhrase: 'రొట్టెను నాలుగు సమ భాగాలు చెయ్యబ్బా.' }
    ],
    rotiLesson: {
      title: 'రొట్టెతో భిన్నాలు (Fractions) నేర్చుకోండి',
      subtitle: 'వంటగది రొట్టెతో గణితం ఎంతో సులభం',
      instructions: 'రొట్టె ముక్కలను తాకి భిన్నాలను సులభంగా అర్థం చేసుకోండి.',
      fractions: [
        { fraction: '1', label: 'పూర్తి రొట్టె', vernacularTerm: 'మొత్తం రొట్టె (1)', description: 'ఒక పూర్తి భాగం (1 Whole) - వేరు చేయని రొట్టె.', audioSpoken: 'ఇది ఒక పూర్తి రొట్టె. విభజించని భాగం.' },
        { fraction: '1/2', label: 'సగం రొట్టె', vernacularTerm: 'అర భాగం (1/2)', description: 'ఒక రొట్టెను 2 సమాన భాగాలు చేస్తే వచ్చే భాగం సగం (1/2).', audioSpoken: 'సగం రొట్టె అంటే రెండింటిలో ఒక భాగం.' },
        { fraction: '1/4', label: 'పావు రొట్టె', vernacularTerm: 'పావు భాగం (1/4)', description: 'నాలుగు సమాన భాగాలలో ఒక భాగాన్ని పావు (1/4) అంటారు.', audioSpoken: 'పావు రొట్టె అంటే నాలుగు భాగాలలో ఒక భాగం.' },
        { fraction: '3/4', label: 'ముప్పావు రొట్టె', vernacularTerm: 'ముప్పావు భాగం (3/4)', description: 'నాలుగింటిలో మూడు భాగాలు కలిస్తే ముప్పావు (3/4) అవుతుంది.', audioSpoken: 'ముప్పావు రొట్టె అంటే నాలుగు భాగాలలో మూడు భాగాలు.' }
      ]
    },
    quiz: [
      {
        question: 'అమ్మ ఒక రొట్టెను 4 గురు పిల్లలకు సమానంగా పంచితే, ప్రతి ఒక్కరికీ ఎంత భాగం వస్తుంది?',
        options: ['1/2 (సగం రొట్టె)', '1/4 (పావు రొట్టె)', '3/4 (ముప్పావు రొట్టె)', '1 (పూర్తి రొట్టె)'],
        correctIndex: 1,
        explanation: 'చాలా బాగుంది! 4 సమాన భాగాలలో ప్రతి బిడ్డకూ 1/4 (పావు) రొట్టె వస్తుంది.',
        audioText: 'సరైన సమాధానం నాలుగు భాగాల్లో ఒక భాగం లేదా పావు రొట్టె.'
      }
    ],
    parentCard: {
      title: 'తల్లిదండ్రుల వాయిస్ కార్డు (Parent Audio Card)',
      childName: 'సాయి కుమార్ (4వ తరగతి)',
      date: 'నేటి పురోగతి నివేదిక',
      listenSpokenSummary: 'నేటి పాఠాన్ని మీ భాషలో వినండి',
      summaryAudioText: 'నమస్కారం! ఈరోజు సాయి రొట్టె ఉదాహరణలతో భిన్నాలను అద్భుతంగా నేర్చుకున్నాడు. క్విజ్‌లో నూటికి నూరు శాతం మార్కులు సాధించాడు. అతని హాజరు నూరు శాతం.',
      attendance: 'హాజరు',
      attendanceValue: '100% హాజరు',
      masteredSkill: 'నేర్చుకున్న అంశం',
      skillValue: 'భిన్నాలు (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'గురువుగారి సందేశం',
      teacherNote: 'సాయి శ్రద్ధగా చదువుతున్నాడు. ఇంట్లో కూడా ఆహారాన్ని పంచుతూ భిన్నాలు గుర్తుచేయండి.',
      voiceReplyBtn: 'గురువుగారికి వాయిస్ సందేశం పంపండి',
      voiceReplySent: 'మీ వాయిస్ సందేశం గురువుగారికి చేరింది!'
    },
    teacherDashboard: {
      title: 'టీచర్ ట్రాన్స్‌క్రియేషన్ స్టూడియో',
      metricsTitle: 'తరగతి పురోగతి',
      metrics: {
        comprehension: '92% అవగాహన రేటు',
        offlineSync: '100% ఆఫ్‌లైన్ సింక్',
        dialectRetention: '88% గుర్తుంచుకునే రేటు',
        activeStudents: '1,390 గ్రామీణ విద్యార్థులు',
      },
      transcreationTitle: 'మాండలిక ఆధారిత ఏఐ అనువాదం',
      transcreationSubtitle: 'పాఠ్యపుస్తక కఠిన పదాలను స్థానిక జీవన భాషలోకి మార్చండి',
      inputPlaceholder: 'పాఠ్యపుస్తక పాఠ్యాంశాన్ని ఇక్కడ రాయండి...',
      transcreateBtn: 'స్థానిక మాండలికంలోకి మార్చి వాయిస్ సిద్ధం చేయండి',
      presets: [
        {
          title: 'కిరణజన్య సంయోగక్రియ (Photosynthesis)',
          category: 'సైన్స్',
          standardSource: 'మొక్కలు సూర్యరశ్మి, నీరు మరియు పత్రహరితం సమక్షంలో తమ ఆహారాన్ని తామే తయారుచేసుకుంటాయి.',
          dialectResult: 'మన అమ్మ పొయ్యి మీద మంట పెట్టి వంట చేసినట్లు, చెట్ల పచ్చని ఆకులు ఎండ వెలుగుతో తమ ఆహారాన్ని వండుకుంటాయి.',
          audioPrompt: 'అమ్మ పొయ్యి మీద వంట చేసినట్లే, చెట్ల ఆకులు ఎండ వెలుగుతో ఆహారాన్ని తయారుచేస్తాయి.',
          culturalMetaphor: 'పొయ్యి మీద వంట చేసే గ్రామీణ అనుభవం',
          glossary: [{ standard: 'కిరణజన్య సంయోగక్రియ', dialect: 'ఆకుల వంట', meaning: 'ఎండలో ఆహారం తయారుచేయడం' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'నమస్కారం! నేను భాషా బడ్డీ (Bhasha Buddy). గణితం లేదా సైన్స్ ప్రశ్నలను తెలుగులో అడగండి!',
      sampleQuestions: ['1/2 మరియు 1/4 లో ఏది పెద్దది?', 'మొక్కలు ఆహారం ఎలా తయారుచేస్తాయి?'],
      responses: {
        'fraction': '1/2 (సగం భాగం) 1/4 (పావు భాగం) కంటే పెద్దది! ఎందుకంటే రెండు ముక్కలలో ఒక ముక్క, నాలుగు ముక్కల్లో ఒకదానికంటే పెద్దదిగా ఉంటుంది.',
        'default': 'చక్కని ప్రశ్న! భాషాబ్రిడ్జ్‌లో ప్రతి పాఠాన్ని ఇంటి ముచ్చట్లలా సులభంగా వివరిస్తాం.'
      }
    }
  },

  kn: {
    code: 'kn',
    bcp47: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    greeting: 'ನಮಸ್ಕಾರ! ಭಾಷಾಬ್ರಿಡ್ಜ್‌ಗೆ ಸುಸ್ವಾಗತ',
    audioGreeting: 'ನಮಸ್ಕಾರ! ಭಾಷಾಬ್ರಿಡ್ಜ್‌ಗೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸುಲಭವಾಗಿ ಕಲಿಯಿರಿ.',
    roles: {
      teacher: 'ಶಿಕ್ಷಕರು (Teacher)',
      student: 'ವಿದ್ಯಾರ್ಥಿ (Student)',
      parent: 'ಪೋಷಕರು (Parent)',
    },
    ui: {
      appTitle: 'ಭಾಷಾಬ್ರಿಡ್ಜ್',
      tagline: 'ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣ',
      selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆ ಆರಿಸಿ',
      chooseRole: 'ನಿಮ್ಮ ಪಾತ್ರ ಆಯ್ಕೆಮಾಡಿ',
      startJourney: '90-ಸೆಕೆಂಡ್ ಡೆಮೊ ನೋಡಿ',
      offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ',
      onlineMode: 'ಆನ್‌ಲೈನ್ ಸಿಂಕ್ ಸಿದ್ಧ',
      voiceActive: 'ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ',
      listenAudio: 'ಧ್ವನಿ ಕೇಳಿ',
      playHint: 'ಸುಳುಹು ಕೇಳಿ',
      repeatAudio: 'ಮತ್ತೆ ಕೇಳಿ',
      submitAnswer: 'ಉತ್ತರ ಪರೀಕ್ಷಿಸಿ',
      nextQuestion: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
      score: 'ಅಂಕ',
      correct: 'ಅದ್ಭುತ! ಸರಿಯಾದ ಉತ್ತರ',
      needsPractice: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      back: 'ಹಿಂದೆ ಹೋಗಿ',
      switchLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
      speakNow: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ...',
      askBhashaBuddy: 'ಭಾಷಾ ಬಡ್ಡಿಗೆ ಕೇಳಿ',
    },
    dialects: [
      { id: 'dharwad', name: 'Dharwad Kannada', nativeName: 'ಧಾರವಾಡ ಕನ್ನಡ', region: 'ಉತ್ತರ ಕರ್ನಾಟಕ', description: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಆಡುಭಾಷೆ', samplePhrase: 'ಈ ರೊಟ್ಟಿನ ನಾಲ್ಕು ಸಮ ಭಾಗ ಮಾಡಿ ನೋಡ್ರಿಪಾ.' }
    ],
    rotiLesson: {
      title: 'ರೊಟ್ಟಿಯೊಂದಿಗೆ ಭಿನ್ನರಾಶಿ (Fractions) ಕಲಿಯಿರಿ',
      subtitle: 'ಅಡುಗೆಮನೆಯ ರೊಟ್ಟಿಯಿಂದ ಸುಲಭ ಗಣಿತ',
      instructions: 'ರೊಟ್ಟಿ ತುಂಡುಗಳನ್ನು ಮುಟ್ಟಿ ಭಿನ್ನರಾಶಿ ಕಲಿಯಿರಿ ಮತ್ತು ಧ್ವನಿ ಕೇಳಿ.',
      fractions: [
        { fraction: '1', label: 'ಪೂರ್ಣ ರೊಟ್ಟಿ', vernacularTerm: 'ಇಡೀ ರೊಟ್ಟಿ (1)', description: 'ಒಂದು ಇಡೀ ಭಾಗ (1 Whole).', audioSpoken: 'ಇದು ಒಂದು ಇಡೀ ಪೂರ್ಣ ರೊಟ್ಟಿ.' },
        { fraction: '1/2', label: 'ಅರ್ಧ ರೊಟ್ಟಿ', vernacularTerm: 'ಅರ್ಧ ಭಾಗ (1/2)', description: 'ಒಂದು ರೊಟ್ಟಿಯನ್ನು 2 ಸಮ ಭಾಗ ಮಾಡಿದಾಗ ಬರುವ ಭಾಗ ಅರ್ಧ (1/2).', audioSpoken: 'ಅರ್ಧ ರೊಟ್ಟಿ ಎಂದರೆ ಎರಡರಲ್ಲಿ ಒಂದು ಭಾಗ.' },
        { fraction: '1/4', label: 'ಕಾಲು ರೊಟ್ಟಿ', vernacularTerm: 'ಕಾಲು ಭಾಗ (1/4)', description: 'ನಾಲ್ಕು ಸಮ ಭಾಗಗಳಲ್ಲಿ ಒಂದು ಭಾಗ ಕಾಲು (1/4).', audioSpoken: 'ಕಾಲು ರೊಟ್ಟಿ ಎಂದರೆ ನಾಲ್ಕರಲ್ಲಿ ಒಂದು ಭಾಗ.' },
        { fraction: '3/4', label: 'ಮುಕ್ಕಾಲು ರೊಟ್ಟಿ', vernacularTerm: 'ಮುಕ್ಕಾಲು ಭಾಗ (3/4)', description: 'ನಾಲ್ಕರಲ್ಲಿ ಮೂರು ಭಾಗ ಸೇರಿದಾಗ ಮುಕ್ಕಾಲು (3/4).', audioSpoken: 'ಮುಕ್ಕಾಲು ರೊಟ್ಟಿ ಎಂದರೆ ನಾಲ್ಕರಲ್ಲಿ ಮೂರು ಭಾಗ.' }
      ]
    },
    quiz: [
      {
        question: 'ತಾಯಿ 1 ರೊಟ್ಟಿಯನ್ನು 4 ಮಕ್ಕಳಿಗೆ ಸಮವಾಗಿ ಹಂಚಿದರೆ, ಪ್ರತಿಯೊಬ್ಬರಿಗೆ ಎಷ್ಟು ಭಾಗ ಸಿಗುತ್ತದೆ?',
        options: ['1/2 (ಅರ್ಧ ರೊಟ್ಟಿ)', '1/4 (ಕಾಲು ರೊಟ್ಟಿ)', '3/4 (ಮುಕ್ಕಾಲು ರೊಟ್ಟಿ)', '1 (ಇಡೀ ರೊಟ್ಟಿ)'],
        correctIndex: 1,
        explanation: 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! 4 ಸಮ ಭಾಗಗಳಲ್ಲಿ ಪ್ರತಿಯೊಬ್ಬರಿಗೆ 1/4 (ಕಾಲು) ಸಿಗುತ್ತದೆ.',
        audioText: 'ಸರಿಯಾದ ಉತ್ತರ ನಾಲ್ಕರಲ್ಲಿ ಒಂದು ಭಾಗ ಅಥವಾ ಕಾಲು ರೊಟ್ಟಿ.'
      }
    ],
    parentCard: {
      title: 'ಪೋಷಕರ ಧ್ವನಿ ಪತ್ರ (Parent Audio Card)',
      childName: 'ಆಕಾಶ್ (ತರಗತಿ 4)',
      date: 'ಇಂದಿನ ಕಲಿಕೆಯ ವರದಿ',
      listenSpokenSummary: 'ಇಂದಿನ ವರದಿಯನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ',
      summaryAudioText: 'ನಮಸ್ಕಾರ! ಇಂದು ಆಕಾಶ್ ರೊಟ್ಟಿಯ ಉದಾಹರಣೆಯಿಂದ ಭಿನ್ನರಾಶಿಗಳನ್ನು ಅದ್ಭುತವಾಗಿ ಕಲಿತಿದ್ದಾನೆ. ಪರೀಕ್ಷೆಯಲ್ಲಿ ನೂರಕ್ಕೆ ನೂರು ಅಂಕ ಗಳಿಸಿದ್ದಾನೆ.',
      attendance: 'ಹಾಜರಾತಿ',
      attendanceValue: '100% ಹಾಜರಾಗಿದ್ದಾರೆ',
      masteredSkill: 'ಕಲಿತ ವಿಷಯ',
      skillValue: 'ಭಿನ್ನರಾಶಿ (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'ಶಿಕ್ಷಕರ ಸಂದೇಶ',
      teacherNote: 'ಆಕಾಶ್ ಆಸಕ್ತಿಯಿಂದ ಕಲಿಯುತ್ತಿದ್ದಾನೆ. ಮನೆಯಲ್ಲೂ ಆಹಾರ ಹಂಚುತ್ತಾ ಭಿನ್ನರಾಶಿ ಅಭ್ಯಾಸ ಮಾಡಿಸಿ.',
      voiceReplyBtn: 'ಶಿಕ್ಷಕರಿಗೆ ಧ್ವನಿ ಸಂದೇಶ ಕಳುಹಿಸಿ',
      voiceReplySent: 'ನಿಮ್ಮ ಧ್ವನಿ ಸಂದೇಶ ಶಿಕ್ಷಕರಿಗೆ ತಲುಪಿದೆ!'
    },
    teacherDashboard: {
      title: 'ಶಿಕ್ಷಕರ ಟ್ರಾನ್ಸ್‌ಕ್ರಿಯೇಷನ್ ಸ್ಟುಡಿಯೋ',
      metricsTitle: 'ತರಗತಿ ಪ್ರಗತಿ',
      metrics: {
        comprehension: '93% ಗ್ರಹಿಕೆ ದರ',
        offlineSync: '100% ಆಫ್‌ಲೈನ್ ರಕ್ಷಣೆ',
        dialectRetention: '88% ನೆನಪಿನ ದರ',
        activeStudents: '1,320 ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳು',
      },
      transcreationTitle: 'ಪ್ರಾದೇಶಿಕ ಭಾಷಾ ಎಐ ಅನುವಾದಕ',
      transcreationSubtitle: 'ಪಠ್ಯಪುಸ್ತಕದ ಕಠಿಣ ಪದಗಳನ್ನು ಸ್ಥಳೀಯ ಆಡುಮಾತಿಗೆ ಪರಿವರ್ತಿಸಿ',
      inputPlaceholder: 'ಪಠ್ಯಪುಸ್ತಕದ ವಿಷಯವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
      transcreateBtn: 'ಸ್ಥಳೀಯ ಭಾಷೆಗೆ ಪರಿವರ್ತಿಸಿ ಧ್ವನಿ ಸಿದ್ಧಪಡಿಸಿ',
      presets: [
        {
          title: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ (Photosynthesis)',
          category: 'ವಿಜ್ಞಾನ',
          standardSource: 'ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ಹಸಿರು ಕಣಗಳ ಸಹಾಯದಿಂದ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ.',
          dialectResult: 'ನಮ್ಮ ತಾಯಿ ಒಲೆಯ ಮೇಲೆ ಅಡುಗೆ ಮಾಡುವಂತೆ, ಗಿಡದ ಹಸಿರೆಲೆಗಳು ಬಿಸಿಲಿನಲ್ಲಿ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ.',
          audioPrompt: 'ಒಲೆಯ ಮೇಲೆ ಅಡುಗೆ ಮಾಡುವಂತೆ ಗಿಡದ ಎಲೆಗಳು ಬಿಸಿಲಿನಲ್ಲಿ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ.',
          culturalMetaphor: 'ಮನೆಯ ಒಲೆಯ ಮೇಲೆ ಅಡುಗೆ ಮಾಡುವ ಉದಾಹರಣೆ',
          glossary: [{ standard: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ', dialect: 'ಎಲೆಗಳ ಅಡುಗೆ', meaning: 'ಬಿಸಿಲಿನಲ್ಲಿ ಆಹಾರ ತಯಾರಿಕೆ' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಭಾಷಾ ಬಡ್ಡಿ (Bhasha Buddy). ಗಣಿತ ಅಥವಾ ವಿಜ್ಞಾನದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ!',
      sampleQuestions: ['1/2 ಮತ್ತು 1/4 ರಲ್ಲಿ ಯಾವುದು ದೊಡ್ಡದು?'],
      responses: {
        'fraction': '1/2 (ಅರ್ಧ ಭಾಗ) 1/4 (ಕಾಲು ಭಾಗ) ಕ್ಕಿಂತ ದೊಡ್ಡದು! ಏಕೆಂದರೆ ಎರಡರಲ್ಲಿ ಒಂದು ಭಾಗವು ನಾಲ್ಕರಲ್ಲಿ ಒಂದಕ್ಕಿಂತ ದೊಡ್ಡದಾಗಿದೆ.',
        'default': 'ಉತ್ತಮ ಪ್ರಶ್ನೆ! ಭಾಷಾಬ್ರಿಡ್ಜ್‌ನಲ್ಲಿ ನಾವು ಪ್ರತಿಯೊಂದು ಪಾಠವನ್ನು ಸುಲಭವಾಗಿ ಕಲಿಸುತ್ತೇವೆ.'
      }
    }
  },

  gu: {
    code: 'gu',
    bcp47: 'gu-IN',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    greeting: 'નમસ્તે! ભાષાબ્રિજમાં આપનું સ્વાગત છે',
    audioGreeting: 'નમસ્તે! ભાષાબ્રિજમાં આપનું સ્વાગત છે. તમારી માતૃભાષામાં સરળતાથી શીખો.',
    roles: {
      teacher: 'શિક્ષક (Teacher)',
      student: 'વિદ્યાર્થી (Student)',
      parent: 'વાલી (Parent)',
    },
    ui: {
      appTitle: 'ભાષાબ્રિજ',
      tagline: 'સ્થાનિક બોલીમાં સરળ ગ્રામીણ શિક્ષણ',
      selectLanguage: 'તમારી ભાષા પસંદ કરો',
      chooseRole: 'તમારી ભૂમિકા પસંદ કરો',
      startJourney: '90-સેકન્ડ ડેમો જુઓ',
      offlineMode: 'ઓફલાઇન મોડ સક્રિય છે',
      onlineMode: 'ઓનલાઇન સિંક તૈયાર',
      voiceActive: 'અવાજ સક્રિય છે',
      listenAudio: 'સાંભળીને શીખો',
      playHint: 'સંકેત સાંભળો',
      repeatAudio: 'ફરીથી સાંભળો',
      submitAnswer: 'જવાબ ચકાસો',
      nextQuestion: 'આગળનો પ્રશ્ન',
      score: 'ગુણ',
      correct: 'ખૂબ સરસ! સાચો જવાબ',
      needsPractice: 'ફરી પ્રયાસ કરો',
      back: 'પાછા જાઓ',
      switchLanguage: 'ભાષા બદલો',
      speakNow: 'માઈક દબાવીને બોલો...',
      askBhashaBuddy: 'ભાષા બડીને પૂછો',
    },
    dialects: [
      { id: 'kathiawari', name: 'Kathiawari Gujarati', nativeName: 'કાઠિયાવાડી', region: 'સૌરાષ્ટ્ર', description: 'મીઠી કાઠિયાવાડી બોલીમાં', samplePhrase: 'આ રોટલાના ચાર સરખા કટકા કરી નાખો.' }
    ],
    rotiLesson: {
      title: 'રોટલાથી અપૂર્ણાંક (Fractions) શીખો',
      subtitle: 'રસોડાના રોટલાથી ગણિતની મજેદાર સફર',
      instructions: 'રોટલાના ટુકડાને અડીને અપૂર્ણાંક સમજો અને અવાજ સાંભળો.',
      fractions: [
        { fraction: '1', label: 'આખો રોટલો', vernacularTerm: 'આખો રોટલો (1)', description: 'એક આખો ભાગ (1 Whole).', audioSpoken: 'આ એક આખો રોટલો છે.' },
        { fraction: '1/2', label: 'અડધો રોટલો', vernacularTerm: 'અડધો ભાગ (1/2)', description: 'બે સરખા ભાગમાંથી એક ભાગ અડધો (1/2) કહેવાય.', audioSpoken: 'અડધો રોટલો એટલે બે સરખા ભાગમાંથી એક.' },
        { fraction: '1/4', label: 'પા રોટલો', vernacularTerm: 'પા ભાગ (1/4)', description: 'ચાર સરખા ટુકડામાંથી એક ટુકડો પા (1/4) કહેવાય.', audioSpoken: 'પા રોટલો એટલે ચાર ભાગમાંથી એક.' },
        { fraction: '3/4', label: 'પોણો રોટલો', vernacularTerm: 'પોણો ભાગ (3/4)', description: 'ચારમાંથી ત્રણ ટુકડા એટલે પોણો (3/4) ભાગ.', audioSpoken: 'પોણો રોટલો એટલે ચારમાંથી ત્રણ ટુકડા.' }
      ]
    },
    quiz: [
      {
        question: 'માતા 1 રોટલો 4 બાળકોમાં સરખે ભાગે વહેંચે તો દરેક બાળકને કેટલો ભાગ મળે?',
        options: ['1/2 (અડધો રોટલો)', '1/4 (પા રોટલો)', '3/4 (પોણો રોટલો)', '1 (આખો રોટલો)'],
        correctIndex: 1,
        explanation: 'શાબાશ! 4 સરખા ટુકડામાંથી દરેકને 1/4 (પા રોટલો) મળે.',
        audioText: 'સાચો જવાબ છે એક ચતુર્થાંશ અથવા પા રોટલો.'
      }
    ],
    parentCard: {
      title: 'વાલી વોઇસ રિપોર્ટ (Parent Audio Card)',
      childName: 'ધ્રુવ પટેલ (ધોરણ 4)',
      date: 'આજનો પ્રગતિ અહેવાલ',
      listenSpokenSummary: 'આજનું પરિણામ તમારી ભાષામાં સાંભળો',
      summaryAudioText: 'નમસ્તે! આજે ધ્રુવે રોટલાના ઉદાહરણથી અપૂર્ણાંક ખૂબ સારી રીતે શીખી લીધા. ક્વિઝમાં પૂરા ગુણ મેળવ્યા છે. હાજરી 100 ટકા રહી.',
      attendance: 'હાજરી',
      attendanceValue: '100% હાજર',
      masteredSkill: 'શીખેલ વિષય',
      skillValue: 'અપૂર્ણાંક (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'શિક્ષકનો સંદેશ',
      teacherNote: 'ધ્રુવ ખૂબ હોંશિયાર છે. ઘરે પણ રોટલી વહેંચતી વખતે અપૂર્ણાંક યાદ કરાવો.',
      voiceReplyBtn: 'શિક્ષકને અવાજમાં જવાબ મોકલો',
      voiceReplySent: 'તમારો ઓડિયો સંદેશ શિક્ષકને મોકલી દેવાયો છે!'
    },
    teacherDashboard: {
      title: 'શિક્ષક સ્ટુડિયો (Teacher Dashboard)',
      metricsTitle: 'વર્ગ પરિણામ',
      metrics: {
        comprehension: '94% સમજ દર',
        offlineSync: '100% સિંક',
        dialectRetention: '89% સ્મૃતિ દર',
        activeStudents: '1,310 ગ્રામીણ બાળકો',
      },
      transcreationTitle: 'બોલી-આધારિત એઆઈ અનુવાદક',
      transcreationSubtitle: 'પાઠ્યપુસ્તકના અઘરા શબ્દોને સ્થાનિક સંવાદમાં ફેરવો',
      inputPlaceholder: 'અહીં પાઠ્યપુસ્તકનું લખાણ લખો...',
      transcreateBtn: 'સ્થાનિક બોલીમાં બદલી અવાજ બનાવો',
      presets: [
        {
          title: 'પ્રકાશસંશ્લેષણ (Photosynthesis)',
          category: 'વિજ્ઞાન',
          standardSource: 'વનસ્પતિ સૂર્યપ્રકાશ અને હરિતદ્રવ્યની મદદથી પોતાનો ખોરાક બનાવે છે.',
          dialectResult: 'જેમ આપણી બા ચૂલા પર રસોઈ બનાવે, તેમ ઝાડવાંના લીલા પાંદડા સૂરજના તડકામાં ખાવાનું રાંધે છે.',
          audioPrompt: 'જેમ બા ચૂલા પર રસોઈ બનાવે, તેમ ઝાડના પાંદડા તડકામાં ખોરાક રાંધે છે.',
          culturalMetaphor: 'માટીના ચૂલા પર રસોઈનું ઉદાહરણ',
          glossary: [{ standard: 'પ્રકાશસંશ્લેષણ', dialect: 'પાંદડાની રસોઈ', meaning: 'તડકામાં ખોરાક બનાવવો' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'નમસ્તે! હું છું ભાષા બડી (Bhasha Buddy). ગણિત કે વિજ્ઞાનનો કોઈ પણ સવાલ ગુજરાતીમાં પૂછો!',
      sampleQuestions: ['1/2 અને 1/4 માંથી કયું મોટું છે?'],
      responses: {
        'fraction': '1/2 (અડધો ભાગ) એ 1/4 (પા ભાગ) કરતાં મોટો છે! કારણ કે બે સરખા ટુકડામાંથી એક ટુકડો હંમેશા ચાર ટુકડાના એક ભાગ કરતાં મોટો હોય છે.',
        'default': 'સરસ સવાલ! ભાષાબ્રિજમાં અમે દરેક વિષય ઘરની સરળ ભાષામાં શીખવીએ છીએ.'
      }
    }
  },

  pa: {
    code: 'pa',
    bcp47: 'pa-IN',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਭਾਸ਼ਾਬ੍ਰਿਜ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    audioGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਭਾਸ਼ਾ ਬ੍ਰਿਜ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਸੌਖਾ ਸਿੱਖੋ।',
    roles: {
      teacher: 'ਅਧਿਆਪਕ (Teacher)',
      student: 'ਵਿਦਿਆਰਥੀ (Student)',
      parent: 'ਮਾਪੇ (Parent)',
    },
    ui: {
      appTitle: 'ਭਾਸ਼ਾਬ੍ਰਿਜ',
      tagline: 'ਸਥਾਨਕ ਬੋਲੀ ਵਿੱਚ ਸੌਖੀ ਪੇਂਡੂ ਸਿੱਖਿਆ',
      selectLanguage: 'ਆਪਣੀ ਬੋਲੀ ਚੁਣੋ',
      chooseRole: 'ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ',
      startJourney: '90-ਸਕਿੰਟ ਡੈਮੋ ਵੇਖੋ',
      offlineMode: 'ਆਫਲਾਈਨ ਮੋਡ ਚਾਲੂ ਹੈ',
      onlineMode: 'ਆਨਲਾਈਨ ਸਿੰਕ ਤਿਆਰ',
      voiceActive: 'ਆਵਾਜ਼ ਚਾਲੂ ਹੈ',
      listenAudio: 'ਸੁਣ ਕੇ ਸਿੱਖੋ',
      playHint: 'ਇਸ਼ਾਰਾ ਸੁਣੋ',
      repeatAudio: 'ਮੁੜ ਸੁਣੋ',
      submitAnswer: 'ਉੱਤਰ ਜਾਂਚੋ',
      nextQuestion: 'ਅਗਲਾ ਸਵਾਲ',
      score: 'ਅੰਕ',
      correct: 'ਸ਼ਾਬਾਸ਼! ਸਹੀ ਉੱਤਰ',
      needsPractice: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
      back: 'ਵਾਪਸ ਜਾਓ',
      switchLanguage: 'ਬੋਲੀ ਬਦਲੋ',
      speakNow: 'ਮਾਈਕ ਦਬਾ ਕੇ ਬੋਲੋ...',
      askBhashaBuddy: 'ਭਾਸ਼ਾ ਬੱਡੀ ਨੂੰ ਪੁੱਛੋ',
    },
    dialects: [
      { id: 'majhi', name: 'Majhi Punjabi', nativeName: 'ਮਾਝੀ', region: 'ਅੰਮ੍ਰਿਤਸਰ ਤੇ ਗੁਰਦਾਸਪੁਰ', description: 'ਟਕਸਾਲੀ ਮਾਝੀ ਬੋਲੀ', samplePhrase: 'ਇਸ ਰੋਟੀ ਦੇ ਚਾਰ ਬਰਾਬਰ ਟੁਕੜੇ ਕਰ ਲਵੋ ਜੀ।' }
    ],
    rotiLesson: {
      title: 'ਰੋਟੀ ਨਾਲ ਭਿੰਨ (Fractions) ਸਿੱਖੋ',
      subtitle: 'ਰਸੋਈ ਦੀ ਰੋਟੀ ਤੋਂ ਗਣਿਤ ਦਾ ਸੌਖਾ ਸਬਕ',
      instructions: 'ਰੋਟੀ ਦੇ ਟੁਕੜਿਆਂ ਨੂੰ ਛੂਹ ਕੇ ਭਿੰਨ ਸਮਝੋ ਤੇ ਆਵਾਜ਼ ਸੁਣੋ।',
      fractions: [
        { fraction: '1', label: 'ਪੂਰੀ ਰੋਟੀ', vernacularTerm: 'ਸਮੁੱਚੀ ਰੋਟੀ (1)', description: 'ਇੱਕ ਪੂਰਾ ਹਿੱਸਾ (1 Whole).', audioSpoken: 'ਇਹ ਇੱਕ ਪੂਰੀ ਸਮੁੱਚੀ ਰੋਟੀ ਹੈ।' },
        { fraction: '1/2', label: 'ਅੱਧੀ ਰੋਟੀ', vernacularTerm: 'ਅੱਧਾ ਹਿੱਸਾ (1/2)', description: 'ਜਦੋਂ ਇੱਕ ਰੋਟੀ ਨੂੰ ਦੋ ਬਰਾਬਰ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਦੇ ਹਾਂ ਤਾਂ ਹਰ ਹਿੱਸਾ ਅੱਧਾ (1/2) ਹੁੰਦਾ ਹੈ।', audioSpoken: 'ਅੱਧੀ ਰੋਟੀ ਯਾਨੀ ਦੋ ਹਿੱਸਿਆਂ ਵਿੱਚੋਂ ਇੱਕ ਹਿੱਸਾ।' },
        { fraction: '1/4', label: 'ਚੌਥਾਈ ਰੋਟੀ', vernacularTerm: 'ਪਾਓ ਰੋਟੀ (1/4)', description: 'ਚਾਰ ਬਰਾਬਰ ਟੁਕੜਿਆਂ ਵਿੱਚੋਂ ਇੱਕ ਟੁਕੜਾ ਚੌਥਾਈ (1/4) ਹੈ।', audioSpoken: 'ਚੌਥਾਈ ਰੋਟੀ ਯਾਨੀ ਚਾਰ ਵਿੱਚੋਂ ਇੱਕ ਟੁਕੜਾ।' },
        { fraction: '3/4', label: 'ਪੌਣੀ ਰੋਟੀ', vernacularTerm: 'ਪੌਣਾ ਹਿੱਸਾ (3/4)', description: 'ਚਾਰ ਵਿੱਚੋਂ ਤਿੰਨ ਟੁਕੜੇ ਪੌਣੀ ਰੋਟੀ (3/4) ਬਣਾਉਂਦੇ ਹਨ।', audioSpoken: 'ਪੌਣੀ ਰੋਟੀ ਯਾਨੀ ਚਾਰ ਵਿੱਚੋਂ ਤਿੰਨ ਟੁਕੜੇ।' }
      ]
    },
    quiz: [
      {
        question: 'ਜੇ ਮਾਤਾ ਜੀ ਇੱਕ ਰੋਟੀ 4 ਬੱਚਿਆਂ ਵਿੱਚ ਬਰਾਬਰ ਵੰਡਦੇ ਹਨ, ਤਾਂ ਹਰ ਬੱਚੇ ਨੂੰ ਕਿੰਨਾ ਹਿੱਸਾ ਮਿਲੇਗਾ?',
        options: ['1/2 (ਅੱਧੀ ਰੋਟੀ)', '1/4 (ਚੌਥਾਈ ਜਾਂ ਪਾਓ ਰੋਟੀ)', '3/4 (ਪੌਣੀ ਰੋਟੀ)', '1 (ਪੂਰੀ ਰੋਟੀ)'],
        correctIndex: 1,
        explanation: 'ਬਹੁਤ ਵਧੀਆ! 4 ਬਰਾਬਰ ਟੁਕੜਿਆਂ ਵਿੱਚੋਂ ਹਰ ਬੱਚੇ ਨੂੰ 1/4 (ਚੌਥਾਈ) ਰੋਟੀ ਮਿਲਦੀ ਹੈ।',
        audioText: 'ਸਹੀ ਉੱਤਰ ਹੈ ਇੱਕ ਬਟਾ ਚਾਰ ਜਾਂ ਚੌਥਾਈ ਰੋਟੀ।'
      }
    ],
    parentCard: {
      title: 'ਮਾਪੇ ਆਵਾਜ਼ ਰਿਪੋਰਟ (Parent Audio Card)',
      childName: 'ਹਰਪ੍ਰੀਤ ਸਿੰਘ (ਜਮਾਤ 4)',
      date: 'ਅੱਜ ਦਾ ਰਿਪੋਰਟ ਕਾਰਡ',
      listenSpokenSummary: 'ਅੱਜ ਦੀ ਰਿਪੋਰਟ ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਸੁਣੋ',
      summaryAudioText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਅੱਜ ਹਰਪ੍ਰੀਤ ਨੇ ਰੋਟੀ ਦੀ ਮਦਦ ਨਾਲ ਭਿੰਨ ਦੇ ਸਵਾਲ ਬਹੁਤ ਵਧੀਆ ਤਰੀਕੇ ਨਾਲ ਸਿੱਖੇ। ਕੁਇਜ਼ ਵਿੱਚ ਪੂਰੇ ਨੰਬਰ ਲਏ ਹਨ ਅਤੇ ਹਾਜ਼ਰੀ ਸੌ ਪ੍ਰਤੀਸ਼ਤ ਰਹੀ।',
      attendance: 'ਹਾਜ਼ਰੀ',
      attendanceValue: '100% ਹਾਜ਼ਰ',
      masteredSkill: 'ਸਿੱਖਿਆ ਸਬਕ',
      skillValue: 'ਭਿੰਨ (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'ਮਾਸਟਰ ਜੀ ਦਾ ਸੁਨੇਹਾ',
      teacherNote: 'ਹਰਪ੍ਰੀਤ ਬਹੁਤ ਮਿਹਨਤ ਕਰ ਰਿਹਾ ਹੈ। ਘਰ ਵਿੱਚ ਵੀ ਰੋਟੀ ਵੰਡਦੇ ਹੋਏ ਅਭਿਆਸ ਕਰਵਾਓ।',
      voiceReplyBtn: 'ਮਾਸਟਰ ਜੀ ਨੂੰ ਆਵਾਜ਼ ਵਿੱਚ ਜਵਾਬ ਭੇਜੋ',
      voiceReplySent: 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਮਾਸਟਰ ਜੀ ਕੋਲ ਪਹੁੰਚ ਗਿਆ ਹੈ!'
    },
    teacherDashboard: {
      title: 'ਅਧਿਆਪਕ ਸਟੂਡੀਓ (Teacher Dashboard)',
      metricsTitle: 'ਜਮਾਤ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ',
      metrics: {
        comprehension: '93% ਸਥਾਨਕ ਸਮਝ',
        offlineSync: '100% ਸੁਰੱਖਿਅਤ',
        dialectRetention: '90% ਯਾਦਦਾਸ਼ਤ ਦਰ',
        activeStudents: '1,290 ਪੇਂਡੂ ਵਿਦਿਆਰਥੀ',
      },
      transcreationTitle: 'ਬੋਲੀ-ਅਨੁਕੂਲ ਏਆਈ ਅਨੁਵਾਦਕ',
      transcreationSubtitle: 'ਔਖੇ ਕਿਤਾਬੀ ਸ਼ਬਦਾਂ ਨੂੰ ਪੇਂਡੂ ਬੋਲੀ ਵਿੱਚ ਬਦਲੋ',
      inputPlaceholder: 'ਇੱਥੇ ਕਿਤਾਬ ਦਾ ਪਾਠ ਲਿਖੋ...',
      transcreateBtn: 'ਸਥਾਨਕ ਬੋਲੀ ਵਿੱਚ ਬਦਲੋ ਤੇ ਆਵਾਜ਼ ਤਿਆਰ ਕਰੋ',
      presets: [
        {
          title: 'ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ (Photosynthesis)',
          category: 'ਵਿਗਿਆਨ',
          standardSource: 'ਪੌਦੇ ਸੂਰਜ ਦੀ ਰੌਸ਼ਨੀ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਆਪਣਾ ਭੋਜਨ ਤਿਆਰ ਕਰਦੇ ਹਨ।',
          dialectResult: 'ਜਿਵੇਂ ਮਾਤਾ ਜੀ ਚੁੱਲ੍ਹੇ ਤੇ ਰੋਟੀ ਪਕਾਉਂਦੇ ਹਨ, ਤਿਵੇਂ ਪੌਦਿਆਂ ਦੇ ਹਰੇ ਪੱਤੇ ਧੁੱਪ ਵਿੱਚ ਆਪਣੀ ਖੁਰਾਕ ਤਿਆਰ ਕਰਦੇ ਹਨ।',
          audioPrompt: 'ਜਿਵੇਂ ਚੁੱਲ੍ਹੇ ਤੇ ਰੋਟੀ ਪੱਕਦੀ ਹੈ, ਤਿਵੇਂ ਪੌਦੇ ਧੁੱਪ ਵਿੱਚ ਖੁਰਾਕ ਤਿਆਰ ਕਰਦੇ ਹਨ।',
          culturalMetaphor: 'ਮਿੱਟੀ ਦੇ ਚੁੱਲ੍ਹੇ ਉੱਤੇ ਰੋਟੀ ਪਕਾਉਣ ਦੀ ਮਿਸਾਲ',
          glossary: [{ standard: 'ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ', dialect: 'ਪੱਤਿਆਂ ਦੀ ਰਸੋਈ', meaning: 'ਧੁੱਪ ਨਾਲ ਖੁਰਾਕ ਬਣਾਉਣਾ' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਹਾਂ ਭਾਸ਼ਾ ਬੱਡੀ (Bhasha Buddy)। ਗਣਿਤ ਜਾਂ ਵਿਗਿਆਨ ਦਾ ਕੋਈ ਵੀ ਸਵਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਪੁੱਛੋ!',
      sampleQuestions: ['1/2 ਅਤੇ 1/4 ਵਿੱਚੋਂ ਕਿਹੜਾ ਵੱਡਾ ਹੈ?'],
      responses: {
        'fraction': '1/2 (ਅੱਧਾ ਹਿੱਸਾ) 1/4 (ਚੌਥਾਈ ਹਿੱਸੇ) ਨਾਲੋਂ ਵੱਡਾ ਹੁੰਦਾ ਹੈ! ਕਿਉਂਕਿ ਦੋ ਵਿੱਚੋਂ ਇੱਕ ਟੁਕੜਾ ਚਾਰ ਵਿੱਚੋਂ ਇੱਕ ਟੁਕੜੇ ਨਾਲੋਂ ਵੱਡਾ ਹੁੰਦਾ ਹੈ।',
        'default': 'ਵਧੀਆ ਸਵਾਲ! ਭਾਸ਼ਾਬ੍ਰਿਜ ਵਿੱਚ ਅਸੀਂ ਹਰ ਔਖੀ ਗੱਲ ਪਿੰਡ ਦੀ ਆਮ ਬੋਲੀ ਵਿੱਚ ਸਮਝਾਉਂਦੇ ਹਾਂ।'
      }
    }
  },

  or: {
    code: 'or',
    bcp47: 'or-IN',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Oriya',
    greeting: 'ନମସ୍କାର! ଭାଷାବ୍ରିଜ୍‌କୁ ସ୍ଵାଗତ',
    audioGreeting: 'ନମସ୍କାର! ଭାଷାବ୍ରିଜ୍‌କୁ ସ୍ୱାଗତ। ନିଜ ମାତୃଭାଷାରେ ସହଜରେ ଶିଖନ୍ତୁ।',
    roles: {
      teacher: 'ଶିକ୍ଷକ (Teacher)',
      student: 'ଛାତ୍ରଛାତ୍ରୀ (Student)',
      parent: 'ଅଭିଭାବକ (Parent)',
    },
    ui: {
      appTitle: 'ଭାଷାବ୍ରିଜ୍',
      tagline: 'ସ୍ଥାନୀୟ ଭାଷାରେ ସହଜ ଗ୍ରାମୀଣ ଶିକ୍ଷା',
      selectLanguage: 'ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ',
      chooseRole: 'ଆପଣଙ୍କ ଭୂମିକା ବାଛନ୍ତୁ',
      startJourney: '୯୦-ସେକେଣ୍ଡ ଡେମୋ ଦେଖନ୍ତୁ',
      offlineMode: 'ଅଫଲାଇନ୍ ମୋଡ୍ ସକ୍ରିୟ',
      onlineMode: 'ଅନଲାଇନ୍ ସିଙ୍କ୍ ପ୍ରସ୍ତୁତ',
      voiceActive: 'ସ୍ୱର ଚାଲୁ ଅଛି',
      listenAudio: 'ଶୁଣନ୍ତୁ',
      playHint: 'ସୂଚନା ଶୁଣନ୍ତୁ',
      repeatAudio: 'ପୁନର୍ବାର ଶୁଣନ୍ତୁ',
      submitAnswer: 'ଉତ୍ତର ଯାଞ୍ଚ କରନ୍ତୁ',
      nextQuestion: 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ',
      score: 'ନମ୍ବର',
      correct: 'ବହୁତ ବଢ଼ିଆ! ସଠିକ୍ ଉତ୍ତର',
      needsPractice: 'ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ',
      back: 'ଫେରିଯାଆନ୍ତୁ',
      switchLanguage: 'ଭାଷା ବଦଳାନ୍ତୁ',
      speakNow: 'ମାଇକ୍ ଚିପି କୁହନ୍ତୁ...',
      askBhashaBuddy: 'ଭାଷା ବଡିଙ୍କୁ ପଚାରନ୍ତୁ',
    },
    dialects: [
      { id: 'sambalpuri', name: 'Sambalpuri Odia', nativeName: 'ସମ୍ବଲପୁରୀ', region: 'ପଶ୍ଚିମ ଓଡ଼ିଶା', description: 'ସମ୍ବଲପୁରୀ ଗ୍ରାମୀଣ ଭାଷାରେ', samplePhrase: 'ଏ ରୁଟିଟାକେ ଚାର୍ ଖଣ୍ଡ୍ କରୀ କରି ଦେଖ୍।' }
    ],
    rotiLesson: {
      title: 'ରୁଟିରୁ ଭଗ୍ନାଂଶ (Fractions) ଶିଖନ୍ତୁ',
      subtitle: 'ରୋଷେଇ ଘରୁ ଗଣିତର ମଜାଳିଆ ପାଠ',
      instructions: 'ରୁଟି ଖଣ୍ଡକୁ ସ୍ପର୍ଶ କରି ଭଗ୍ନାଂଶ ବୁଝନ୍ତୁ ଓ ସ୍ୱର ଶୁଣନ୍ତୁ।',
      fractions: [
        { fraction: '1', label: 'ପୂରା ରୁଟି', vernacularTerm: 'ଗୋଟା ରୁଟି (୧)', description: 'ଏକ ପୂର୍ଣ୍ଣ ଭାଗ (1 Whole).', audioSpoken: 'ଏହା ଏକ ପୂରା ଗୋଟା ରୁଟି।' },
        { fraction: '1/2', label: 'ଅଧା ରୁଟି', vernacularTerm: 'ଅଧା ଅଂଶ (୧/୨)', description: 'ଦୁଇଟି ସମାନ ଭାଗରୁ ଗୋଟିଏ ଭାଗ ଅଧା (୧/୨)।', audioSpoken: 'ଅଧା ରୁଟି ମାନେ ଦୁଇ ଭାଗରୁ ଏକ ଭାଗ।' },
        { fraction: '1/4', label: 'ଚାରିଭାଗରୁ ଭାଗେ', vernacularTerm: 'ପାଆ ରୁଟି (୧/୪)', description: 'ଚାରୋଟି ସମାନ ଖଣ୍ଡରୁ ଗୋଟିଏ ଖଣ୍ଡ (୧/୪)।', audioSpoken: 'ପାଆ ରୁଟି ମାନେ ଚାରି ଭାଗରୁ ଏକ ଭାଗ।' },
        { fraction: '3/4', label: 'ତିନି ଚତୁର୍ଥାଂଶ', vernacularTerm: 'ପୌଣେ ରୁଟି (୩/୪)', description: 'ଚାରି ଭାଗରୁ ତିନି ଭାଗ ମିଶି ପୌଣେ (୩/୪)।', audioSpoken: 'ପୌଣେ ରୁଟି ମାନେ ଚାରି ଭାଗରୁ ତିନି ଭାଗ।' }
      ]
    },
    quiz: [
      {
        question: 'ମାଆ ଯଦି ୧ଟି ରୁଟି ୪ ଜଣ ପିଲାଙ୍କ ମଧ୍ୟରେ ସମାନ ବାଣ୍ଟନ୍ତି, ତେବେ ପ୍ରତ୍ୟେକ କେତେ ଭାଗ ପାଇବେ?',
        options: ['୧/୨ (ଅଧା ରୁଟି)', '୧/୪ (ଚଉଥାଇ ବା ପାଆ ରୁଟି)', '୩/୪ (ପୌଣେ ରୁଟି)', '୧ (ପୂରା ରୁଟି)'],
        correctIndex: 1,
        explanation: 'ଚମତ୍କାର! ୪ଟି ସମାନ ଭାଗରୁ ପ୍ରତ୍ୟେକଙ୍କୁ ୧/୪ (ପାଆ ରୁଟି) ମିଳିବ।',
        audioText: 'ସଠିକ୍ ଉତ୍ତର ହେଉଛି ଚାରି ଭାଗରୁ ଏକ ଭାଗ।'
      }
    ],
    parentCard: {
      title: 'ଅଭିଭାବକ ଭଏସ୍ କାର୍ଡ (Parent Audio Card)',
      childName: 'ଆୟୁଷ ମହାପାତ୍ର (ଚତୁର୍ଥ ଶ୍ରେଣୀ)',
      date: 'ଆଜିର ରିପୋର୍ଟ',
      listenSpokenSummary: 'ଆଜିର ପାଠ ନିଜ ଭାଷାରେ ଶୁଣନ୍ତୁ',
      summaryAudioText: 'ନମସ୍କାର! ଆଜି ଆୟୁଷ ରୁଟି ଉଦାହରଣ ସାହାଯ୍ୟରେ ଭଗ୍ନାଂଶ ବହୁତ ଭଲ ଭାବରେ ଶିଖିଛି। ସେ କୁଇଜ୍‌ରେ ପୂରା ନମ୍ବର ପାଇଛି।',
      attendance: 'ଉପସ୍ଥିତି',
      attendanceValue: '୧୦୦% ଉପସ୍ଥିତ',
      masteredSkill: 'ଶିଖିଥିବା ପାଠ',
      skillValue: 'ଭଗ୍ନାଂଶ (Fractions: ୧/୨, ୧/୪)',
      teacherNoteTitle: 'ଗୁରୁଜୀଙ୍କ ବାର୍ତ୍ତା',
      teacherNote: 'ଆୟୁଷ ବହୁତ ପରିଶ୍ରମ କରୁଛି। ଘରେ ମଧ୍ୟ ରୁଟି ବାଣ୍ଟିବା ବେଳେ ଏହି ପାଠ ମନେ ପକାନ୍ତୁ।',
      voiceReplyBtn: 'ଗୁରୁଜୀଙ୍କୁ ଭଏସ୍ ବାର୍ତ୍ତା ପଠାନ୍ତୁ',
      voiceReplySent: 'ଆପଣଙ୍କ ଭଏସ୍ ମେସେଜ୍ ଗୁରୁଜୀଙ୍କ ପାଖକୁ ପଠାଗଲା!'
    },
    teacherDashboard: {
      title: 'ଶିକ୍ଷକ ଷ୍ଟୁଡିଓ (Teacher Dashboard)',
      metricsTitle: 'ଶ୍ରେଣୀ ପ୍ରଦର୍ଶନ',
      metrics: {
        comprehension: '୯୨% ବୋଧଗମ୍ୟତା',
        offlineSync: '୧୦୦% ସିଙ୍କ୍',
        dialectRetention: '୮୭% ମନେ ରଖିବା ହାର',
        activeStudents: '୧,୨୪୦ ଗ୍ରାମୀଣ ଛାତ୍ରଛାତ୍ରୀ',
      },
      transcreationTitle: 'ଆଞ୍ଚଳିକ ଭାଷା ଏଆଇ ଅନୁବାଦକ',
      transcreationSubtitle: 'କଠିନ ବହି ଭାଷାକୁ ଗ୍ରାମୀଣ ଚଳଣିରେ ବଦଳାନ୍ତୁ',
      inputPlaceholder: 'ବହିର ବିଷୟ ଏଠାରେ ଲେଖନ୍ତୁ...',
      transcreateBtn: 'ଆଞ୍ଚଳିକ ଭାଷାରେ ବଦଳାଇ ସ୍ୱର ପ୍ରସ୍ତୁତ କରନ୍ତୁ',
      presets: [
        {
          title: 'ଆଲୋକ ସଂଶ୍ଳେଷଣ (Photosynthesis)',
          category: 'ବିଜ୍ଞାନ',
          standardSource: 'ଉଦ୍ଭିଦ ସୂର୍ଯ୍ୟାଲୋକର ଉପସ୍ଥିତିରେ ନିଜ ଖାଦ୍ୟ ନିଜେ ପ୍ରସ୍ତୁତ କରେ।',
          dialectResult: 'ଯେମିତି ଆମ ମାଆ ଚୁଲିରେ ରୋଷେଇ କରନ୍ତି, ସେମିତି ଗଛର ସବୁଜ ପତ୍ର ଖରାରେ ନିଜ ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରେ।',
          audioPrompt: 'ଯେପରି ମାଆ ଚୁଲିରେ ରୋଷେଇ କରନ୍ତି, ସେହିପରି ଗଛର ପତ୍ର ଖରାରେ ଖାଦ୍ୟ ତିଆରି କରେ।',
          culturalMetaphor: 'ଚୁଲିରେ ରନ୍ଧାର ଘରୋଇ ଉଦାହରଣ',
          glossary: [{ standard: 'ଆଲୋକ ସଂଶ୍ଳେଷଣ', dialect: 'ପତ୍ରର ରୋଷେଇ', meaning: 'ଖରାରେ ଖାଦ୍ୟ ପ୍ରସ୍ତୁତି' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'ନମସ୍କାର! ମୁଁ ଭାଷା ବଡି (Bhasha Buddy)। ଗଣିତ କିମ୍ବା ବିଜ୍ଞାନର ଯେକୌଣସି ପ୍ରଶ୍ନ ଓଡ଼ିଆରେ ପଚାରନ୍ତୁ!',
      sampleQuestions: ['୧/୨ ଏବଂ ୧/୪ ମଧ୍ୟରେ କେଉଁଟି ବଡ଼?'],
      responses: {
        'fraction': '୧/୨ (ଅଧା ଭାଗ) ୧/୪ (ପାଆ ଭାଗ) ଠାରୁ ବଡ଼! କାରଣ ଦୁଇ ଭାଗର ଗୋଟିଏ ଖଣ୍ଡ ଚାରି ଭାଗର ଗୋଟିଏ ଖଣ୍ଡଠାରୁ ଆକାରରେ ବଡ଼ ହୋଇଥାଏ।',
        'default': 'ଚମତ୍କାର ପ୍ରଶ୍ନ! ଭାଷାବ୍ରିଜ୍‌ରେ ଆମେ ପ୍ରତ୍ୟେକ ବିଷୟ ସହଜ ଗ୍ରାମୀଣ ଭାଷାରେ ବୁଝାଇଥାଉ।'
      }
    }
  },

  ml: {
    code: 'ml',
    bcp47: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    greeting: 'നമസ്കാരം! ഭാഷാബ്രിഡ്ജിലേക്ക് സ്വാഗതം',
    audioGreeting: 'നമസ്കാരം! ഭാഷാബ്രിഡ്ജിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ മാതൃഭാഷയിൽ എളുപ്പത്തിൽ പഠിക്കൂ.',
    roles: {
      teacher: 'അധ്യാപകൻ (Teacher)',
      student: 'വിദ്യാർത്ഥി (Student)',
      parent: 'രക്ഷിതാവ് (Parent)',
    },
    ui: {
      appTitle: 'ഭാഷാബ്രിഡ്ജ്',
      tagline: 'നാടൻ ഭാഷയിൽ ലളിതമായ ഗ്രാമീണ വിദ്യാഭ്യാസം',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
      chooseRole: 'നിങ്ങളുടെ റോൾ തിരഞ്ഞെടുക്കുക',
      startJourney: '90-സെക്കൻഡ് ഡെമോ കാണുക',
      offlineMode: 'ഓഫ്‌ലൈൻ മോഡ് സജീവം',
      onlineMode: 'ഓൺലൈൻ സമന്വയം തയാർ',
      voiceActive: 'ശബ്ദം സജീവമാണ്',
      listenAudio: 'ശ്രദ്ധിച്ചു കേൾക്കൂ',
      playHint: 'സൂചന കേൾക്കൂ',
      repeatAudio: 'വീണ്ടും കേൾക്കൂ',
      submitAnswer: 'ഉത്തരം പരിശോധിക്കൂ',
      nextQuestion: 'അടുത്ത ചോദ്യം',
      score: 'സ്കോർ',
      correct: 'വളരെ നന്ന്! ശരിയായ ഉത്തരം',
      needsPractice: 'വീണ്ടും ശ്രമിക്കൂ',
      back: 'പിന്നോട്ട്',
      switchLanguage: 'ഭാഷ മാറ്റുക',
      speakNow: 'മൈക്ക് അമർത്തി സംസാരിക്കൂ...',
      askBhashaBuddy: 'ഭാഷാ ബഡിയോടു ചോദിക്കൂ',
    },
    dialects: [
      { id: 'malabar', name: 'Malabar Malayalam', nativeName: 'മലബാർ മലയാളം', region: 'വടക്കൻ കേരളം', description: 'മലബാർ ശൈലിയിലുള്ള വാക്കുകൾ', samplePhrase: 'ഈ റൊട്ടി നാല് സമഭാഗങ്ങളാക്കി നോക്ക്യേ.' }
    ],
    rotiLesson: {
      title: 'റൊട്ടിയിലൂടെ ഭിന്നസംഖ്യകൾ (Fractions) പഠിക്കാം',
      subtitle: 'അടുക്കളയിലെ ഭക്ഷണത്തിലൂടെ കണക്കിന്റെ രസം',
      instructions: 'റൊട്ടി കഷണങ്ങൾ തൊട്ടുനോക്കി ഭിന്നസംഖ്യകൾ മനസ്സിലാക്കൂ, ശബ്ദം കേൾക്കൂ.',
      fractions: [
        { fraction: '1', label: 'മുഴുവൻ റൊട്ടി', vernacularTerm: 'മുഴു റൊട്ടി (1)', description: 'ഒരു മുഴുവൻ ഭാഗം (1 Whole).', audioSpoken: 'ഇത് ഒരു മുഴുവൻ റൊട്ടിയാണ്.' },
        { fraction: '1/2', label: 'പകുതി റൊട്ടി', vernacularTerm: 'അര ഭാഗം (1/2)', description: 'രണ്ട് തുല്യ ഭാഗങ്ങളിൽ ഒരെണ്ണം പകുതി (1/2).', audioSpoken: 'പകുതി റൊട്ടി എന്നാൽ രണ്ടിൽ ഒന്ന്.' },
        { fraction: '1/4', label: 'കാൽ റൊട്ടി', vernacularTerm: 'കാൽ ഭാഗം (1/4)', description: 'നാല് തുല്യ കഷണങ്ങളിൽ ഒരെണ്ണം കാൽ (1/4).', audioSpoken: 'കാൽ റൊട്ടി എന്നാൽ നാലിൽ ഒന്ന്.' },
        { fraction: '3/4', label: 'മുക്കാൽ റൊട്ടി', vernacularTerm: 'മുക്കാൽ ഭാഗം (3/4)', description: 'നാലിൽ മൂന്ന് കഷണങ്ങൾ ചേർന്നാൽ മുക്കാൽ (3/4).', audioSpoken: 'മുക്കാൽ റൊട്ടി എന്നാൽ നാലിൽ മൂന്ന് ഭാഗം.' }
      ]
    },
    quiz: [
      {
        question: 'അമ്മ 1 റൊട്ടി 4 കുട്ടികൾക്ക് തുല്യമായി വീതിച്ചു കൊടുത്താൽ, ഓരോരുത്തർക്കും എത്ര ഭാഗം ലഭിക്കും?',
        options: ['1/2 (പകുതി റൊട്ടി)', '1/4 (കാൽ റൊട്ടി)', '3/4 (മുക്കാൽ റൊട്ടി)', '1 (മുഴുവൻ റൊട്ടി)'],
        correctIndex: 1,
        explanation: 'വളരെ നല്ലത്! 4 തുല്യ കഷണങ്ങളിൽ ഓരോരുത്തർക്കും 1/4 (കാൽ റൊട്ടി) ലഭിക്കുന്നു.',
        audioText: 'ശരിയായ ഉത്തരം നാലിൽ ഒന്ന് അല്ലെങ്കിൽ കാൽ റൊട്ടി.'
      }
    ],
    parentCard: {
      title: 'രക്ഷിതാവിനുള്ള വോയ്സ് കാർഡ് (Parent Audio Card)',
      childName: 'അർജുൻ കൃഷ്ണ (ക്ലാസ് 4)',
      date: 'ഇന്നത്തെ പുരോഗതി റിപ്പോർട്ട്',
      listenSpokenSummary: 'ഇന്നത്തെ പാഠം സ്വന്തം ഭാഷയിൽ കേൾക്കൂ',
      summaryAudioText: 'നമസ്കാരം! ഇന്ന് അർജുൻ റൊട്ടി ഉദാഹരണങ്ങളിലൂടെ ഭിന്നസംഖ്യകൾ വളരെ മനോഹരമായി പഠിച്ചു. ക്വിസിൽ മുഴുവൻ മാർക്കും നേടി. ഹാജർ നൂറ് ശതമാനമാണ്.',
      attendance: 'ഹാജർ',
      attendanceValue: '100% ഹാജർ',
      masteredSkill: 'പഠിച്ച പാഠം',
      skillValue: 'ഭിന്നസംഖ്യകൾ (Fractions: 1/2, 1/4)',
      teacherNoteTitle: 'അധ്യാപകന്റെ സന്ദേശം',
      teacherNote: 'അർജുൻ വളരെ ശ്രദ്ധയോടെ പഠിക്കുന്നു. വീട്ടിലും ഭക്ഷണം പങ്കിടുമ്പോൾ കണക്ക് ഓർമ്മിപ്പിക്കുക.',
      voiceReplyBtn: 'അധ്യാപകന് വോയ്സ് സന്ദേശം അയക്കൂ',
      voiceReplySent: 'നിങ്ങളുടെ വോയ്സ് സന്ദേശം അധ്യാപകന് ലഭിച്ചു!'
    },
    teacherDashboard: {
      title: 'ടീച്ചർ സ്റ്റുഡിയോ (Teacher Dashboard)',
      metricsTitle: 'ക്ലാസ് പുരോഗതി',
      metrics: {
        comprehension: '94% ഗ്രാഹ്യത',
        offlineSync: '100% സിങ്ക്',
        dialectRetention: '89% ഓർമ്മശക്തി',
        activeStudents: '1,310 ഗ്രാമീണ വിദ്യാർത്ഥികൾ',
      },
      transcreationTitle: 'പ്രാദേശിക ഭാഷാ എഐ വിവർത്തകൻ',
      transcreationSubtitle: 'പുസ്തകത്തിലെ കടുപ്പമേറിയ വാക്കുകളെ നാടൻ ഭാഷയിലേക്ക് മാറ്റൂ',
      inputPlaceholder: 'പാഠപുസ്തകത്തിലെ ഭാഗം ഇവിടെ എഴുതൂ...',
      transcreateBtn: 'പ്രാദേശിക ശൈലിയിലേക്ക് മാറ്റി ശബ്ദം തയാറാക്കൂ',
      presets: [
        {
          title: 'പ്രകാശസംശ്ലේෂണം (Photosynthesis)',
          category: 'ശാസ്ത്രം',
          standardSource: 'സസ്യങ്ങൾ സൂര്യപ്രകാശത്തിന്റെയും ഹരിതകത്തിന്റെയും സാന്നിധ്യത്തിൽ ആഹാരം നിർമ്മിക്കുന്നു.',
          dialectResult: 'നമ്മുടെ അമ്മമാർ അടുപ്പിൽ തീകൂട്ടി ചോറ് വേവിക്കുന്നതുപോലെ, മരങ്ങളുടെ പച്ചിലകൾ വെയിലിൽ ഭക്ഷണം പാകം ചെയ്യുന്നു.',
          audioPrompt: 'അമ്മ അടുപ്പിൽ ചോറ് വേവിക്കുന്നത് പോലെ ചെടിയുടെ ഇലകൾ വെയിലിൽ ഭക്ഷണം ഉണ്ടാക്കുന്നു.',
          culturalMetaphor: 'അടുപ്പിൽ ആഹാരം പാകം ചെയ്യുന്ന വീട്ടിലെ ഉദാഹരണം',
          glossary: [{ standard: 'പ്രകാശസംശ്ലේෂണം', dialect: 'ഇലകളുടെ പാചകം', meaning: 'വെയിലിൽ ആഹാരം നിർമ്മിക്കൽ' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'നമസ്കാരം! ഞാൻ ഭാഷാ ബഡി (Bhasha Buddy). കണക്കോ ശാസ്ത്രമോ എന്തും മലയാളത്തിൽ ചോദിക്കൂ!',
      sampleQuestions: ['1/2 ഉം 1/4 ഉം ഇതിൽ ഏതാണ് വലുത്?'],
      responses: {
        'fraction': '1/2 (പകുതി ഭാഗം) 1/4 (കാൽ ഭാഗത്തെക്കാൾ) വലുതാണ്! കാരണം രണ്ടിൽ ഒരു കഷണം നാലിൽ ഒന്നിനേക്കാൾ വലുതാണ്.',
        'default': 'നല്ല ചോദ്യം! ഭാഷാബ്രിഡ്ജിൽ ഏത് കഠിനമായ പാഠവും ലളിതമായ ഭാഷയിൽ ഞങ്ങൾ പഠിപ്പിക്കുന്നു.'
      }
    }
  },

  as: {
    code: 'as',
    bcp47: 'as-IN',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Bengali/Assamese',
    greeting: 'নমস্কাৰ! ভাষা ব্ৰিজলৈ আপোনাক স্বাগতম',
    audioGreeting: 'নমস্কাৰ! ভাষা ব্ৰিজলৈ স্বাগতম। আপোনাৰ নিজৰ ভাষাত সহজে শিকা আৰম্ভ কৰক।',
    roles: {
      teacher: 'শিক্ষক (Teacher)',
      student: 'ছাত্ৰ-ছাত্ৰী (Student)',
      parent: 'অভিভাৱক (Parent)',
    },
    ui: {
      appTitle: 'ভাষা ব্ৰিজ',
      tagline: 'স্থানীয় উপভাষাত সহজ গ্ৰাম্য শিক্ষা',
      selectLanguage: 'আপোনাৰ ভাষা বাছক',
      chooseRole: 'আপোনাৰ ভূমিকা নিৰ্বাচন কৰক',
      startJourney: '৯০-ছেকেণ্ড ডেমো চাওক',
      offlineMode: 'অফলাইন মোড সক্ৰিয়',
      onlineMode: 'অনলাইন ছিংক প্ৰস্তুত',
      voiceActive: 'কণ্ঠস্বৰ চালিত',
      listenAudio: 'শুনি শিকা',
      playHint: 'ইংগিত শুনক',
      repeatAudio: 'পুনৰ শুনক',
      submitAnswer: 'উত্তৰ পৰীক্ষা কৰক',
      nextQuestion: 'পৰৱৰ্তী প্ৰশ্ন',
      score: 'নম্বৰ',
      correct: 'বৰ ধুনীয়া! সঠিক উত্তৰ',
      needsPractice: 'পুনৰ চেষ্টা কৰক',
      back: 'উভতি যাওক',
      switchLanguage: 'ভাষা সলনি কৰক',
      speakNow: 'মাইক টিপি কথা কওক...',
      askBhashaBuddy: 'ভাষা বাডীক সোধক',
    },
    dialects: [
      { id: 'kamrupi', name: 'Kamrupi Assamese', nativeName: 'কামৰূপী', region: 'নামনি অসম', description: 'নামনি অসমৰ সহজ কথিত ভাষা', samplePhrase: 'এইখন ৰুটি চাৰিটা সমান ভাগ কৰি চোৱাচোন।' }
    ],
    rotiLesson: {
      title: 'ৰুটিৰ সহায়ত ভগ্নাংশ (Fractions) শিকক',
      subtitle: 'ৰান্ধনীঘৰৰ ৰুটিৰ পৰা গণিতৰ সহজ পাঠ',
      instructions: 'ৰুটিৰ টুকুৰাত স্পৰ্শ কৰি ভগ্নাংশ বুজক আৰু মাত শুনক।',
      fractions: [
        { fraction: '1', label: 'সম্পূৰ্ণ ৰুটি', vernacularTerm: 'গোটা ৰুটি (১)', description: 'এটা পূৰ্ণ ভাগ (1 Whole).', audioSpoken: 'এইখন এখন সম্পূৰ্ণ গোটা ৰুটি।' },
        { fraction: '1/2', label: 'আধা ৰুটি', vernacularTerm: 'আধা অংশ (১/২)', description: 'দুটা সমান ভাগৰ এটা ভাগ হ’ল আধা (১/২)।', audioSpoken: 'আধা ৰুটি মানে দুভাগৰ এভাগ।' },
        { fraction: '1/4', label: 'চৌথাংশ ৰুটি', vernacularTerm: 'পোৱা ৰুটি (১/৪)', description: 'চাৰিটা সমান টুকুৰাৰ এটা টুকুৰা হ’ল পোৱা (১/৪)।', audioSpoken: 'পোৱা ৰুটি মানে চাৰিভাগৰ এভাগ।' },
        { fraction: '3/4', label: 'তিনি চতুৰ্থাংশ', vernacularTerm: 'পৌনে অংশ (৩/৪)', description: 'চাৰিটা ভাগৰ তিনিটা ভাগ মিলি পৌনে (৩/৪) হয়।', audioSpoken: 'তিনি চতুৰ্থাংশ মানে চাৰিভাগৰ তিনিভাগ।' }
      ]
    },
    quiz: [
      {
        question: 'আইতাই ১খন ৰুটি ৪ জন ল’ৰা-ছোৱালীক সমানকৈ ভগাই দিলে প্ৰত্যেকে কিমানকৈ পাব?',
        options: ['১/২ (আধা ৰুটি)', '১/৪ (পোৱা বা চৌথাংশ ৰুটি)', '৩/৪ (পৌনে ৰুটি)', '১ (গোটা ৰুটি)'],
        correctIndex: 1,
        explanation: 'বৰ সুন্দৰ! ৪টা সমান ভাগৰ প্ৰত্যেকে ১/৪ ভাগ পাব।',
        audioText: 'সঠিক উত্তৰ হ’ল চাৰি ভাগৰ এক ভাগ বা পোৱা ৰুটি।'
      }
    ],
    parentCard: {
      title: 'অভিভাৱক অডিঅ’ কাৰ্ড (Parent Audio Card)',
      childName: 'ৰাহুল বৰা (চতুৰ্থ শ্ৰেণী)',
      date: 'আজিৰ অগ্ৰগতি প্ৰতিবেদন',
      listenSpokenSummary: 'আজিৰ পাঠ অসমীয়াত শুনক',
      summaryAudioText: 'নমস্কাৰ! আজি ৰাহুলে ৰুটিৰ উদাহৰণৰ সহায়ত ভগ্নাংশ অতি সুন্দৰকৈ শিকিলে। কুইজত সম্পূৰ্ণ নম্বৰ পাইছে আৰু উপস্থিতি ১০০ শতাংশ।',
      attendance: 'উপস্থিতি',
      attendanceValue: '১০০% উপস্থিত',
      masteredSkill: 'শিকি লোৱা পাঠ',
      skillValue: 'ভগ্নাংশ (Fractions: ১/২, ১/৪)',
      teacherNoteTitle: 'শিক্ষকৰ বাৰ্তা',
      teacherNote: 'ৰাহুলে শ্ৰেণীত যথেষ্ট মনোযোগ দিছে। ঘৰতো খাদ্য ভগোৱাৰ সময়ত অংকটো মনত পেলাই দিব।',
      voiceReplyBtn: 'শিক্ষকলৈ মুখেৰে বাৰ্তা পঠিয়াওক',
      voiceReplySent: 'আপোনাৰ ভইচ মেছেজ শিক্ষকলৈ প্ৰেৰণ কৰা হ’ল!'
    },
    teacherDashboard: {
      title: 'শিক্ষক নিয়ন্ত্ৰণ কক্ষ (Teacher Dashboard)',
      metricsTitle: 'শ্ৰেণীৰ ফলাফল',
      metrics: {
        comprehension: '৯১% বুজিব পৰা হাৰ',
        offlineSync: '১০০% সুৰক্ষিত',
        dialectRetention: '৮৮% মনত ৰখাৰ হাৰ',
        activeStudents: '১,১৯০ গ্ৰাম্য ছাত্ৰ-ছাত্ৰী',
      },
      transcreationTitle: 'উপভাষা-সচেতন এআই অনুবাদক',
      transcreationSubtitle: 'পাঠ্যপুথিৰ টান কথাবোৰ সহজ গ্ৰাম্য ভাষালৈ পৰিৱৰ্তন কৰক',
      inputPlaceholder: 'পাঠ্যপুথিৰ কথাখিনি ইয়াত লিখক...',
      transcreateBtn: 'স্থানীয় ভাষাত ৰূপান্তৰ কৰি মাত শুনক',
      presets: [
        {
          title: 'সালোক সংশ্লেষণ (Photosynthesis)',
          category: 'বিজ্ঞান',
          standardSource: 'উদ্ভিদে সূৰ্য্যৰ পোহৰ আৰু ক্ল’ৰফিলৰ উপস্থিতিত খাদ্য প্ৰস্তুত কৰে।',
          dialectResult: 'যেনেদৰে আইতাই জুহালত জুই ধৰি ভাত ৰান্ধে, তেনেদৰে গছৰ সেউজীয়া পাতে ৰ’দৰ পোহৰত নিজৰ খাদ্য ৰান্ধে।',
          audioPrompt: 'আইতাই জুহালত ভাত ৰন্ধাৰ দৰে গছৰ পাতে ৰ’দত খাদ্য প্ৰস্তুত কৰে।',
          culturalMetaphor: 'জুহালৰ জুইত ভাত ৰন্ধাৰ উদাহৰণ',
          glossary: [{ standard: 'সালোক সংশ্লেষণ', dialect: 'পাতৰ ৰন্ধা-বঢ়া', meaning: 'ৰ’দত খাদ্য প্ৰস্তুত কৰা' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'নমস্কাৰ! মই ভাষা বাডী (Bhasha Buddy)। গণিত বা বিজ্ঞানৰ যিকোনো প্ৰশ্ন অসমীয়াত সোধক!',
      sampleQuestions: ['১/২ আৰু ১/৪ ৰ ভিতৰত কোনটো ডাঙৰ?'],
      responses: {
        'fraction': '১/২ (আধা অংশ) ১/৪ (পোৱা অংশ) তকৈ ডাঙৰ! কাৰণ দুটা ভাগৰ এটা ভাগ চাৰিটা ভাগৰ এটাতকৈ আকাৰত ডাঙৰ।',
        'default': 'বৰ ভাল প্ৰশ্ন! ভাষা ব্ৰিজত আমি সকলো বিষয় সহজভাৱে বুজাই দিওঁ।'
      }
    }
  },

  en: {
    code: 'en',
    bcp47: 'en-IN',
    name: 'English',
    nativeName: 'English (India)',
    script: 'Latin',
    greeting: 'Welcome to BhashaBridge!',
    audioGreeting: 'Welcome to Bhasha Bridge. Learn effortlessly in your local mother tongue.',
    roles: {
      teacher: 'Teacher (Dashboard & AI)',
      student: 'Student (Visual Lessons)',
      parent: 'Parent (Audio Report)',
    },
    ui: {
      appTitle: 'BhashaBridge',
      tagline: 'Dialect-aware Rural Learning & AI Transcreation',
      selectLanguage: 'Select Your Mother Tongue',
      chooseRole: 'Select Role to Explore',
      startJourney: 'Try 90s Guided Demo',
      offlineMode: 'Offline Mode Active',
      onlineMode: 'Online Sync Ready',
      voiceActive: 'Voice Audio Active',
      listenAudio: 'Listen to Audio',
      playHint: 'Play Audio Hint',
      repeatAudio: 'Repeat Spoken Syllable',
      submitAnswer: 'Check Answer',
      nextQuestion: 'Next Question',
      score: 'Score',
      correct: 'Splendid! Correct Answer',
      needsPractice: 'Try Again',
      back: 'Back',
      switchLanguage: 'Change Language',
      speakNow: 'Tap Mic to Speak...',
      askBhashaBuddy: 'Ask Bhasha Buddy',
    },
    dialects: [
      { id: 'indian_english', name: 'Indian English', nativeName: 'Standard Indian English', region: 'All India', description: 'Clear, phonetic Indian English pronunciation', samplePhrase: 'Divide this chapati into four equal portions.' }
    ],
    rotiLesson: {
      title: 'Learn Fractions with Roti',
      subtitle: 'Everyday Kitchen Metaphors for Universal Math',
      instructions: 'Tap the roti slices to explore fractions and hear clear spoken pronunciations.',
      fractions: [
        { fraction: '1', label: 'Whole Roti', vernacularTerm: '1 Whole', description: 'One undivided piece (1 Whole) - completely intact.', audioSpoken: 'This is one whole roti. One undivided unit.' },
        { fraction: '1/2', label: 'Half Roti', vernacularTerm: 'Half (1/2)', description: 'When one whole roti is cut into 2 equal parts, each piece is one half (1/2).', audioSpoken: 'Half roti means one over two. One piece out of two equal halves.' },
        { fraction: '1/4', label: 'Quarter Roti', vernacularTerm: 'Quarter (1/4)', description: 'One piece out of four equal slices is a quarter (1/4).', audioSpoken: 'Quarter roti means one over four. One slice out of four equal parts.' },
        { fraction: '3/4', label: 'Three Quarters', vernacularTerm: 'Three Quarters (3/4)', description: 'Three quarters combined represent three parts out of four (3/4).', audioSpoken: 'Three quarters roti means three pieces out of four.' }
      ]
    },
    quiz: [
      {
        question: 'If a mother divides 1 roti equally among 4 children, how much does each child receive?',
        options: ['1/2 (Half roti)', '1/4 (Quarter roti)', '3/4 (Three quarters)', '1 (Whole roti)'],
        correctIndex: 1,
        explanation: 'Spot on! Each of the 4 children receives 1 out of 4 equal portions (1/4).',
        audioText: 'The correct answer is one quarter or one over four.'
      },
      {
        question: 'What do you get when you combine two half pieces (1/2 + 1/2) together?',
        options: ['1 Whole Roti', '1/4 Slice', '3/4 Slice', '2 Rotis'],
        correctIndex: 0,
        explanation: 'Exact! Two halves (1/2 + 1/2) join together to recreate 1 complete whole roti.',
        audioText: 'Correct! Two halves combine to form one whole roti.'
      }
    ],
    parentCard: {
      title: 'Parent Spoken Audio Card',
      childName: 'Aarav Kumar (Grade 4)',
      date: 'Daily Spoken Progress Card',
      listenSpokenSummary: 'Listen to Daily Summary in Your Language',
      summaryAudioText: 'Namaste! Today your child Aarav learned mathematical fractions using roti examples. He scored 100% on the quiz and helped two classmates. His attendance is 100%.',
      attendance: 'Attendance',
      attendanceValue: '100% Present',
      masteredSkill: 'Mastered Concept',
      skillValue: 'Fractions (1/2, 1/4 with Roti models)',
      teacherNoteTitle: 'Teacher Note',
      teacherNote: 'Aarav grasped fractional divisions swiftly. Encourage him to practice sharing rotis at home dinner.',
      voiceReplyBtn: 'Send Spoken Voice Note to Teacher',
      voiceReplySent: 'Your voice note has been recorded and delivered to the teacher!'
    },
    teacherDashboard: {
      title: 'Teacher Transcreation Studio',
      metricsTitle: 'Classroom Multilingual Pulse',
      metrics: {
        comprehension: '93% Regional Comprehension',
        offlineSync: '100% Synced (Zero-loss)',
        dialectRetention: '89% Long-term Dialect Retention',
        activeStudents: '1,420 Active Rural Learners',
      },
      transcreationTitle: 'Dialect-aware AI Transcreation Tool (PS#26042)',
      transcreationSubtitle: 'Convert rigid textbook jargon into relatable rural metaphors and spoken audio',
      inputPlaceholder: 'Enter textbook lesson text here or pick a preset...',
      transcreateBtn: 'Transcreate to Dialect & Synthesize Speech',
      presets: [
        {
          title: 'Photosynthesis (Plant Food Making)',
          category: 'Science',
          standardSource: 'Plants synthesize glucose from sunlight, water, and carbon dioxide in the presence of chlorophyll.',
          dialectResult: 'Just like mothers cook food over a kitchen hearth using fire and water, green leaves use warm sunlight to prepare nourishment.',
          audioPrompt: 'Listen: Just as food is prepared over a home stove, green leaves use warm sunlight to make food.',
          culturalMetaphor: 'Home cooking hearth and stove metaphor',
          glossary: [
            { standard: 'Photosynthesis', dialect: 'Leaf Hearth Cooking', meaning: 'Plant energy creation via light' },
            { standard: 'Chlorophyll', dialect: 'Green leaf pigment', meaning: 'Light absorption chemical' }
          ]
        },
        {
          title: 'Land Division & Fractions',
          category: 'Mathematics',
          standardSource: 'When a unitary area is partitioned into four congruent subsections, each segment is denoted as one-fourth.',
          dialectResult: 'Just like dividing a family bigha field into four equal strips for four brothers, each strip is one-quarter of the total field.',
          audioPrompt: 'Listen: Dividing one farmland into four equal parts gives each brother one quarter.',
          culturalMetaphor: 'Village farmland boundary division',
          glossary: [{ standard: 'One-fourth', dialect: 'Quarter plot (Paav)', meaning: '1/4 fraction' }]
        }
      ]
    },
    buddyPrompts: {
      defaultGreeting: 'Hello! I am Bhasha Buddy. Ask me any math or science question in any language!',
      sampleQuestions: [
        'Which fraction is bigger, 1/2 or 1/4?',
        'How does a roti represent 1/4?',
        'How do plants make food in villages?'
      ],
      responses: {
        'fraction': '1/2 (one half) is larger than 1/4 (one quarter)! When you cut a roti into 2 pieces, each piece is much bigger than if you cut it into 4 pieces.',
        'roti': 'When you cut a roti into 4 equal slices, taking 1 slice gives you 1/4 (one-fourth or quarter)!',
        'default': 'Great question! In BhashaBridge, we make learning intuitive with local village metaphors and voice in your own mother tongue.'
      }
    }
  }
};

export const LANGUAGE_KEYS = Object.keys(LANGUAGES);
