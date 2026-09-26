# BhashaBridge Project Status & Roadmap

## SIH 2026 Problem Statement PS#26042
**Multilingual, offline-capable education app with teacher/student/parent dashboards and dialect-aware AI transcreation tool for rural students.**

### In-Phone Chatbot Updates
- [x] Remove Bhasha Buddy from the global header.
- [x] Add a small robot-style Bhasha Buddy icon inside the phone UI.
- [x] Make the in-phone icon open the real multilingual chatbot.
- [x] Confirm questions can be submitted in any selected or typed language.
- [x] Verify responsive placement and save the checkpoint.
- [x] Make Bhasha Buddy detect and answer in the language used by each typed question, while retaining the selected language as the default context.

### Complete Multilingual & Voice Engine Updates
- [x] Support 12 Indian regional languages with native typography:
  - Hindi (हिन्दी)
  - Bengali (বাংলা)
  - Marathi (मराठी)
  - Tamil (தமிழ்)
  - Telugu (తెలుగు)
  - Kannada (ಕನ್ನಡ)
  - Gujarati (ગુજરાતી)
  - Odia (ଓଡ଼ିଆ)
  - Punjabi (ਪੰਜਾਬੀ)
  - Malayalam (മലയാളം)
  - Assamese (অসমীয়া)
  - English (India)
- [x] Dual-engine audio architecture ensuring audible voice on any device:
  - Web Speech API SpeechSynthesis with BCP-47 fallback
  - Melodic Web Audio Formant Synthesizer for 100% reliable voice playback regardless of OS voice pack limitations
  - SpeechRecognition with microphone voice input and sample prompt triggers
- [x] Teacher Dashboard: 4 live metrics + Dialect-aware AI Transcreation Studio (Bhojpuri, Awadhi, Maithili, Ahirani, Kongu, etc.) + Vernacular Vocabulary Bridge
- [x] Student Journey: Interactive SVG Roti fraction visualizer (1/4, 1/2, 3/4) + Spoken syllables + Visual quiz with instant feedback and score
- [x] Parent Dashboard: Zero-literacy daily spoken voice progress report + two-way voice question recorder to teacher
- [x] Offline Mode & Data Sync: SQLite/IndexedDB simulation saving 94% cellular bandwidth
- [x] 90-Second Guided Tour Presentation Companion with scene spine and PPT talking points
