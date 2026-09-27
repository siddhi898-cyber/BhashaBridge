import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const audioCache = new Map<string, Buffer>();

function odiaToDevanagari(text: string): string {
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 0x0b01 && code <= 0x0b71) {
        return String.fromCharCode(code - 0x0200);
      }
      return c;
    })
    .join("");
}

function santaliToDevanagari(text: string): string {
  const map: Record<string, string> = {
    "ᱚ": "ओ", "ᱛ": "त", "ᱜ": "ग", "ᱝ": "ङ", "ᱞ": "ल",
    "ᱟ": "आ", "ᱠ": "क", "ᱡ": "ज", "ᱢ": "म", "ᱣ": "व",
    "ᱤ": "इ", "ᱥ": "स", "ᱦ": "ह", "ᱧ": "ञ", "ᱨ": "र",
    "ᱩ": "उ", "ᱪ": "च", "ᱫ": "द", "ᱬ": "ण", "ᱭ": "य",
    "ᱮ": "ए", "ᱯ": "प", "ᱰ": "ड", "ᱱ": "न", "ᱲ": "ड़",
    "ᱳ": "ओ", "ᱴ": "ट", "ᱵ": "ब", "ᱶ": "भ", "ᱷ": "ख",
    "ᱸ": "ं", "ᱹ": "़", "ᱺ": "ं", "ᱻ": "ः", "ᱼ": "",
    "᱐": "०", "᱑": "१", "᱒": "२", "᱓": "३", "᱔": "४",
    "᱕": "५", "᱖": "६", "᱗": "७", "᱘": "८", "᱙": "९"
  };
  return Array.from(text).map(c => map[c] || c).join("");
}

function cleanSpeechText(text: string): string {
  return text
    .replace(/[*_#`~[\]()]/g, " ")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function ttsProxyPlugin() {
  return {
    name: "tts-proxy",
    configureServer(server: any) {
      server.middlewares.use("/api/tts", async (req: any, res: any) => {
        try {
          const url = new URL(req.url, "http://localhost");
          const rawTl = (url.searchParams.get("tl") || "en").toLowerCase();
          const rawQ = url.searchParams.get("q") || "";
          if (!rawQ) {
            res.statusCode = 400;
            res.end("Missing text");
            return;
          }

          let cleanQ = cleanSpeechText(rawQ).slice(0, 250);
          let targetTl = rawTl;

          if (rawTl === "or") {
            targetTl = "hi";
            cleanQ = odiaToDevanagari(cleanQ);
          } else if (rawTl === "as") {
            targetTl = "bn";
          } else if (rawTl === "kok") {
            targetTl = "mr";
          } else if (
            ["bho", "mwr", "chd", "mag", "mai", "mwn", "bgc"].includes(rawTl)
          ) {
            targetTl = "hi";
          } else if (rawTl === "ks") {
            const hasArabic = /[\u0600-\u06FF]/.test(cleanQ);
            targetTl = hasArabic ? "ur" : "hi";
          } else if (rawTl === "sat") {
            targetTl = "hi";
            cleanQ = santaliToDevanagari(cleanQ);
          }

          const cacheKey = `${targetTl}:::${cleanQ}`;
          if (audioCache.has(cacheKey)) {
            const cachedBuf = audioCache.get(cacheKey)!;
            res.writeHead(200, {
              "Content-Type": "audio/mpeg",
              "Content-Length": cachedBuf.length,
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "public, max-age=86400",
            });
            res.end(cachedBuf);
            return;
          }

          const https = await import("node:https");
          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(targetTl)}&q=${encodeURIComponent(cleanQ)}`;
          const gReq = https.get(
            googleUrl,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              },
            },
            (gRes) => {
              if (gRes.statusCode !== 200) {
                res.statusCode = gRes.statusCode || 500;
                gRes.pipe(res);
                return;
              }
              const chunks: Buffer[] = [];
              gRes.on("data", (chunk: Buffer) => chunks.push(chunk));
              gRes.on("end", () => {
                const completeBuf = Buffer.concat(chunks);
                audioCache.set(cacheKey, completeBuf);
                res.writeHead(200, {
                  "Content-Type": "audio/mpeg",
                  "Content-Length": completeBuf.length,
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "public, max-age=86400",
                });
                res.end(completeBuf);
              });
            }
          );
          gReq.on("error", (err) => {
            res.statusCode = 502;
            res.end(err.message);
          });
        } catch (e) {
          res.statusCode = 500;
          res.end(String(e));
        }
      });

      server.middlewares.use("/api/trpc", async (req: any, res: any) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method Not Allowed");
          return;
        }

        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            const url = req.url || "";
            let parsed: any = {};
            try {
              parsed = JSON.parse(body);
            } catch (err) {}

            const data =
              parsed["0"]?.json || parsed["0"] || parsed.json || parsed || {};
            const lang = (data.language || "").toString();
            const question = (data.question || "").toString();

            if (url.includes("student.ask")) {
              const answer = generateEducationalAnswer(lang, question);
              res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(
                JSON.stringify([
                  {
                    result: {
                      data: {
                        json: {
                          answer,
                        },
                      },
                    },
                  },
                ])
              );
              return;
            }

            if (url.includes("student.explainImage")) {
              const answer = generateImageExplanation(lang);
              res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(
                JSON.stringify([
                  {
                    result: {
                      data: {
                        json: {
                          explanation: answer,
                        },
                      },
                    },
                  },
                ])
              );
              return;
            }

            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(
              JSON.stringify([
                {
                  result: {
                    data: {
                      json: {},
                    },
                  },
                },
              ])
            );
          } catch (err: any) {
            res.statusCode = 500;
            res.end(err.message);
          }
        });
      });
    },
  };
}

function generateImageExplanation(langStr: string): string {
  const l = (langStr || "").toLowerCase();
  if (l.includes("kannada") || l.includes("kn")) {
    return "📸 **ಚಿತ್ರ ವಿವರಣೆ (Image Explanation):**\n\nಈ ಚಿತ್ರದಲ್ಲಿ ತೋರಿಸಲಾದ ಪರಿಕಲ್ಪನೆಯು ಭಿನ್ನರಾಶಿಗಳು ಮತ್ತು ಸಮಾನ ವಿಭಜನೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ. ವಸ್ತುಗಳನ್ನು ಸಮಾನವಾಗಿ ವಿಂಗಡಿಸಿದಾಗ ಪ್ರತಿಯೊಂದು ಭಾಗವೂ ಪೂರ್ಣ ವಸ್ತುವಿನ ಸಮಾನ ಅಂಶವಾಗಿರುತ್ತದೆ!";
  }
  if (l.includes("tamil") || l.includes("ta")) {
    return "📸 **பட விளக்கம் (Image Explanation):**\n\nஇந்தப் படத்தில் காட்டப்பட்டுள்ள கருத்து பின்னங்கள் மற்றும் சமமான பிரிவுகளை விளக்குகிறது. ஒரு பொருளை சமமாகப் பிரிக்கும் போது ஒவ்வொரு பகுதியும் முழுப் பொருளின் பகுதியாகும்!";
  }
  if (l.includes("telugu") || l.includes("te")) {
    return "📸 **చిత్ర వివరణ (Image Explanation):**\n\nఈ చిత్రంలో చూపబడిన అంశం భిన్నాలు మరియు సమాన భాగాలను వివరిస్తుంది. వస్తువును సమానంగా విభజించినప్పుడు ప్రతి భాగం పూర్తి భాగంలో ఒక భాగం అవుతుంది!";
  }
  if (l.includes("hindi") || l.includes("hi")) {
    return "📸 **चित्र व्याख्या (Image Explanation):**\n\nइस चित्र में दिखाई गई अवधारणा भिन्नों और बराबर विभाजन को दर्शाती है। जब किसी वस्तु को बराबर बांटा जाता है तो प्रत्येक हिस्सा पूरे का अंश होता है!";
  }
  return "📸 **Visual Explanation:**\n\nThis diagram demonstrates equal fractional division. When a whole unit is divided into equal segments, each segment represents a proportional fraction of the whole!";
}

function generateEducationalAnswer(langStr: string, query: string): string {
  const q = (query || "").trim();
  const l = (langStr || "").toLowerCase();

  let targetLang = "en";
  if (l.includes("kannada") || l.includes("kn") || /[\u0C80-\u0CFF]/.test(q))
    targetLang = "kn";
  else if (l.includes("tamil") || l.includes("ta") || /[\u0B80-\u0BFF]/.test(q))
    targetLang = "ta";
  else if (l.includes("telugu") || l.includes("te") || /[\u0C00-\u0C7F]/.test(q))
    targetLang = "te";
  else if (l.includes("hindi") || l.includes("hi") || /[\u0900-\u097F]/.test(q))
    targetLang = "hi";
  else if (l.includes("bengali") || l.includes("bn") || /[\u0980-\u09FF]/.test(q))
    targetLang = "bn";
  else if (l.includes("malayalam") || l.includes("ml") || /[\u0D00-\u0D7F]/.test(q))
    targetLang = "ml";
  else if (l.includes("gujarati") || l.includes("gu") || /[\u0A80-\u0AFF]/.test(q))
    targetLang = "gu";
  else if (l.includes("marathi") || l.includes("mr")) targetLang = "mr";
  else if (l.includes("punjabi") || l.includes("pa") || /[\u0A00-\u0A7F]/.test(q))
    targetLang = "pa";
  else if (l.includes("odia") || l.includes("or") || /[\u0B00-\u0B7F]/.test(q))
    targetLang = "or";
  else if (l.includes("santali") || l.includes("sat") || /[\u1C50-\u1C7F]/.test(q))
    targetLang = "sat";

  const isMathExpr = q.match(/(\d+)\s*([\+\-\*\/xX])\s*(\d+)/);
  if (isMathExpr) {
    const num1 = parseInt(isMathExpr[1], 10);
    const op = isMathExpr[2].toLowerCase();
    const num2 = parseInt(isMathExpr[3], 10);
    let result = 0;
    if (op === "+" || op === "add") result = num1 + num2;
    else if (op === "-" || op === "sub") result = num1 - num2;
    else if (op === "*" || op === "x" || op === "mul") result = num1 * num2;
    else if (op === "/" || op === "div")
      result = num2 !== 0 ? Math.round((num1 / num2) * 100) / 100 : 0;

    const mathAnswers: Record<string, string> = {
      kn: `🌟 **ಗಣಿತ ಪರಿಹಾರ (Math Solution):**\n\n${num1} ಮತ್ತು ${num2} ಅನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿದಾಗ ಫಲಿತಾಂಶ **${result}** ಆಗುತ್ತದೆ.\n\nಉದಾಹರಣೆಗೆ: ನಿಮ್ಮ ಬಳಿ ${num1} ಮಾವಿನಹಣ್ಣುಗಳಿದ್ದು, ಮತ್ತೊಂದು ${num2} ಸೇರಿಸಿದರೆ ಒಟ್ಟು ${result} ಹಣ್ಣುಗಳಾಗುತ್ತವೆ!`,
      ta: `🌟 **கணித தீர்வு (Math Solution):**\n\n${num1} மற்றும் ${num2} கணக்கிடும் போது விடை **${result}** ஆகும்.\n\nஉதாரணம்: உங்களிடம் ${num1} மாம்பழங்கள் இருந்து, மேலும் ${num2} சேர்த்தால் மொத்தம் ${result} பழங்கள் ஆகும்!`,
      te: `🌟 **గణిత పరిష్కారం (Math Solution):**\n\n${num1} మరియు ${num2} లెక్కిస్తే సమాధానం **${result}** వస్తుంది.\n\nఉదాహరణ: మీ దగ్గర ${num1} మామిడి పండ్లు ఉండి, మరో ${num2} కలిపితే మొత్తం ${result} పండ్లు అవుతాయి!`,
      hi: `🌟 **गणित समाधान (Math Solution):**\n\n${num1} और ${num2} की गणना करने पर उत्तर **${result}** आता है।\n\nउदाहरण: यदि आपके पास ${num1} आम हैं और उसमें ${num2} और जोड़ें तो कुल ${result} आम होंगे!`,
      bn: `🌟 **গণিত সমাধান (Math Solution):**\n\n${num1} এবং ${num2} হিসাব করলে ফলাফল **${result}** হয়।\n\nউদাহরণ: আপনার কাছে ${num1}টি আম আছে এবং আরও ${num2}টি যোগ করলে মোট ${result}টি আম হবে!`,
      en: `🌟 **Math Solution:**\n\nCalculating ${num1} and ${num2} gives **${result}**.\n\nFor example: If you have ${num1} items and add ${num2} more, you get a total of ${result}!`,
    };
    return mathAnswers[targetLang] || mathAnswers.en;
  }

  const isFraction =
    /fraction|1\/2|1\/4|3\/4|ಭಾಗ|భిన్న|பின்ன|अंश|অংশ|roti|రొట్టె|ರೊಟ್ಟಿ|ரொட்டி/i.test(
      q
    );
  if (isFraction) {
    const fractionAnswers: Record<string, string> = {
      kn: `🥞 **ಭಿನ್ನರಾಶಿಗಳ ಪರಿಕಲ್ಪನೆ (Fractions):**\n\n• **ಭಿನ್ನರಾಶಿ ಎಂದರೇನು?** ಒಂದು ಪೂರ್ಣ ವಸ್ತುವನ್ನು ಸಮಾನ ಭಾಗಗಳಾಗಿ ಹಂಚಿದಾಗ ಉಂಟಾಗುವ ಭಾಗವೇ ಭಿನ್ನರಾಶಿ.\n• **ಅರ್ಧ (1/2):** ಒಂದು ರೊಟ್ಟಿಯನ್ನು 2 ಸಮಾನ ಭಾಗಗಳಾಗಿ ಹಂಚಿದರೆ, ಪ್ರತಿಯೊಂದು ತುಂಡು 1/2.\n• **ಕಾಲು (1/4):** ಅದೇ ರೊಟ್ಟಿಯನ್ನು 4 ಸಮಾನ ಭಾಗಗಳಾಗಿ ಮಾಡಿದರೆ, ಪ್ರತಿಯೊಂದು ತುಂಡು 1/4.\n\n👉 **ನೆನಪಿಡಿ:** 1/2 ತುಂಡು 1/4 ತುಂಡಿಗಿಂತ ದೊಡ್ಡದಾಗಿದೆ, ಏಕೆಂದರೆ ಕಡಿಮೆ ಭಾಗ ಮಾಡಿದಷ್ಟೂ ತುಂಡು ದೊಡ್ಡದಾಗಿರುತ್ತದೆ!`,
      ta: `🥞 **பின்னங்களின் விளக்கம் (Fractions):**\n\n• **பின்னம் என்றால் என்ன?** ஒரு முழுப் பொருளை சம பாகங்களாகப் பிரிக்கும் போது கிடைக்கும் பகுதியே பின்னம் ஆகும்.\n• **அரை (1/2):** ஒரு ரொட்டியை 2 சம பாகங்களாகப் பிரித்தால், ஒவ்வொரு துண்டும் 1/2.\n• **கால் (1/4):** அதே ரொட்டியை 4 சம பாகங்களாகப் பிரித்தால், ஒவ்வொரு துண்டும் 1/4.\n\n👉 **நினைவில் கொள்க:** 1/2 என்பது 1/4-ஐ விட பெரியது!`,
      te: `🥞 **భిన్నాల వివరణ (Fractions):**\n\n• **భిన్నం అంటే ఏమిటి?** ఒక పూర్తి వస్తువును సమాన భాగాలుగా విభజించినప్పుడు వచ్చే భాగమే భిన్నం.\n• **సగం (1/2):** ఒక రొట్టెను 2 సమాన భాగాలుగా పంచుకుంటే, ప్రతి ముక్క 1/2.\n• **పావు (1/4):** అదే రొట్టెను 4 సమాన భాగాలుగా చేస్తే, ప్రతి ముక్క 1/4.\n\n👉 **గుర్తుంచుకోండి:** 1/2 ముక్క 1/4 ముక్క కంటే పెద్దది!`,
      hi: `🥞 **भिन्न की समझ (Fractions):**\n\n• **भिन्न क्या है?** किसी पूरी वस्तु को बराबर भागों में बांटने पर मिलने वाले हिस्से को भिन्न कहते हैं।\n• **आधी रोटी (1/2):** एक रोटी को 2 बराबर हिस्सों में बांटने पर हर हिस्सा 1/2 कहलाता है।\n• **पाव रोटी (1/4):** उसी रोटी को 4 बराबर हिस्सों में बांटने पर हर हिस्सा 1/4 होता है।\n\n👉 **याद रखें:** 1/2 हिस्सा 1/4 हिस्से से बड़ा होता है!`,
      bn: `🥞 **ভগ্নাংশের ধারণা (Fractions):**\n\n• **ভগ্নাংশ কী?** কোনো সম্পূর্ণ বস্তুকে সমান অংশে ভাগ করলে প্রতি অংশকে ভগ্নাংশ বলে।\n• **অর্ধেক (১/২):** ১টি রুটি ২টি সমান ভাগে ভাগ করলে প্রতিটি অংশ ১/২।\n• **এক-চতুর্থাংশ (১/৪):** সেই রুটি ৪ ভাগে ভাগ করলে প্রতিটি অংশ ১/৪।\n\n👉 **মনে রাখুন:** ১/২ অংশ ১/৪ অংশের চেয়ে বড়!`,
      en: `🥞 **Understanding Fractions:**\n\n• **What is a Fraction?** A fraction represents equal parts of a whole object.\n• **Half (1/2):** Dividing 1 roti into 2 equal pieces makes each piece 1/2.\n• **Quarter (1/4):** Dividing the same roti into 4 equal pieces makes each piece 1/4.\n\n👉 **Key Takeaway:** 1/2 is larger than 1/4 because fewer divisions mean larger individual slices!`,
    };
    return fractionAnswers[targetLang] || fractionAnswers.en;
  }

  const isScience =
    /science|plant|sun|water|earth|photosynthesis|ಗಿಡ|నీరు|நீர்|पौध|গাছ|सूर्य|సూర్యుడు|ಸೂರ್ಯ/i.test(
      q
    );
  if (isScience) {
    const scienceAnswers: Record<string, string> = {
      kn: `🌱 **ವಿಜ್ಞಾನ ಪರಿಕಲ್ಪನೆ (Science Insight):**\n\nಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಗಾಳಿಯಿಂದ ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಬಳಸಿಕೊಂಡು ಆಹಾರವನ್ನು ತಯಾರಿಸುತ್ತವೆ. ಈ ಪ್ರಕ್ರಿಯೆಯನ್ನು **ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ (Photosynthesis)** ಎನ್ನುತ್ತಾರೆ.\n\nಇದು ನಮಗೆ ಉಸಿರಾಡಲು ಶುದ್ಧ ಆಮ್ಲಜನಕ (Oxygen) ನೀಡುತ್ತದೆ!`,
      ta: `🌱 **அறிவியல் விளக்கம் (Science Insight):**\n\nதாவரங்கள் சூரிய ஒளி, நீர் மற்றும் காற்றில் உள்ள கார்பன் டை ஆக்சைடைப் பயன்படுத்தி உணவு தயாரிக்கின்றன. இந்த நிகழ்வு **ஒளிச்சேர்க்கை (Photosynthesis)** எனப்படும்.\n\nஇது நாம் சுவாசிக்க தூய ஆக்ஸிஜனை வழங்குகிறது!`,
      te: `🌱 **సైన్స్ వివరణ (Science Insight):**\n\nమొక్కలు సూర్యరశ్మి, నీరు మరియు గాలిని ఉపయోగించి తమ ఆహారాన్ని తయారు చేసుకుంటాయి. ఈ ప్రక్రియను **కిరణజన్య సంయోగక్రియ (Photosynthesis)** అంటారు.\n\nఇది మనకు ప్రాణవాయువును (ఆక్సిజన్) అందిస్తుంది!`,
      hi: `🌱 **विज्ञान की समझ (Science Insight):**\n\nपौधे सूर्य का प्रकाश, पानी और हवा से कार्बन डाइऑक्साइड लेकर अपना भोजन बनाते हैं। इस प्रक्रिया को **प्रकाश संश्लेषण (Photosynthesis)** कहते हैं।\n\nइससे हमें सांस लेने के लिए शुद्ध ऑक्सीजन मिलती है!`,
      en: `🌱 **Science Insight:**\n\nPlants use sunlight, water, and carbon dioxide from the air to make their own food through **Photosynthesis**. This essential process produces the fresh oxygen we breathe every day!`,
    };
    return scienceAnswers[targetLang] || scienceAnswers.en;
  }

  const generalAnswers: Record<string, string> = {
    kn: `🤖 **ಭಾಷಾ ಬಡ್ಡಿ (Bhasha Buddy):**\n\nನಿಮ್ಮ ಪ್ರಶ್ನೆ: *"${q}"*\n\nಬಹಳ ಉತ್ತಮವಾದ ಪ್ರಶ್ನೆ! ಭಾಷಾ ಬ್ರಿಡ್ಜ್‌ನಲ್ಲಿ, ನಾವು ಶಾಲಾ ವಿಷಯಗಳನ್ನು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಉದಾಹರಣೆಗಳು ಮತ್ತು ಸುಲಭ ವಿವರಣೆಗಳೊಂದಿಗೆ ಕಲಿಸುತ್ತೇವೆ. ಯಾವುದೇ ವಿಷಯದ ಕುರಿತು ಪ್ರಶ್ನೆಗಳನ್ನು ಮುಕ್ತವಾಗಿ ಕೇಳಿ!`,
    ta: `🤖 **பாஷா படி (Bhasha Buddy):**\n\nஉங்கள் கேள்வி: *"${q}"*\n\nமிகவும் அருமையான கேள்வி! பாஷா பிரிட்ஜில் பாடங்களை உங்களின் சொந்த வட்டார மொழியிலும் எளிய உதாரணங்களுடனும் விளக்குகிறோம். தொடர்ந்து ஆர்வத்துடன் பயிலுங்கள்!`,
    te: `🤖 **భాషా బడ్డీ (Bhasha Buddy):**\n\nమీ ప్రశ్న: *"${q}"*\n\nచాలా చక్కని ప్రశ్న! భాషా బ్రిడ్జ్‌లో పాఠ్యాంశాలను మీ స్థానిక భాషలో, సులభమైన నిజజీవిత ఉదాహరణలతో నేర్పిస్తాము. మీకు ఇంకేమైనా సందేహాలు ఉంటే అడగండి!`,
    hi: `🤖 **भाषा बडी (Bhasha Buddy):**\n\nआपका प्रश्न: *"${q}"*\n\nबहुत ही बढ़िया सवाल! भाषा ब्रिज में हम कठिन विषयों को आपकी मातृभाषा और सरल उदाहरणों से समझाते हैं। आप जो भी विषय सीखना चाहते हैं, बेझिझक पूछें!`,
    bn: `🤖 **ভাষা বাডি (Bhasha Buddy):**\n\nআপনার প্রশ্ন: *"${q}"*\n\nখুব সুন্দর একটি প্রশ্ন! ভাষা ব্রিজে আমরা পাঠ্যবইয়ের কঠিন বিষয়গুলো আপনার মাতৃভাষায় সহজ উদাহরণ দিয়ে বুঝিয়ে দিই। যেকোনো বিষয় জানতে নির্দ্বিধায় জিজ্ঞাসা করুন!`,
    en: `🤖 **Bhasha Buddy:**\n\nYour question: *"${q}"*\n\nGreat question! In BhashaBridge, we connect academic concepts with everyday local metaphors and rural examples so every student learns with confidence. Feel free to ask any question in any subject!`,
  };

  return generalAnswers[targetLang] || generalAnswers.en;
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ttsProxyPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    fs: {
      strict: false,
    },
  },
});
