# LokaLearn Design Direction

## Three stylistic approaches

### Theme Name: Village Notebook
Very Brief Intro: A tactile, paper-and-ink learning companion inspired by classroom notebooks, local craft, and hand-drawn diagrams. Warm, human, and rooted in everyday learning.
Probability: 0.07

### Theme Name: Field Notes Utility
Very Brief Intro: A calm editorial interface built like a community education field guide, using clear data blocks, soft paper textures, and practical navigation. Trustworthy and quietly optimistic.
Probability: 0.03

### Theme Name: Solar Signal
Very Brief Intro: A vivid, energetic learning system with deep ink surfaces and electric accents that make every action feel immediate. Designed for high-contrast, thumb-friendly moments.
Probability: 0.08

## Selected approach: Field Notes Utility

### Design Movement
Contemporary editorial information design blended with vernacular Indian print ephemera: practical, legible, and human rather than clinical.

### Core Principles
1. Make every learning action obvious at a glance, with generous tap targets and one primary decision per screen.
2. Use visual metaphors from real life—roti, chalk, notebook marks, spoken language—to make learning feel local and memorable.
3. Treat progress as a shared community signal, not a judgment; data should be encouraging, concise, and actionable.
4. Let the interface feel carried and used: soft paper texture, ink-like linework, and purposeful imperfections.

### Color Philosophy
The palette starts with warm parchment and deep indigo ink, then adds one ownable marigold accent for moments of confidence and action. The colors should feel like a well-loved workbook in afternoon light: grounded, readable, and optimistic without becoming childish.

### Layout Paradigm
A portrait story rail rather than a dashboard-first grid. The user moves through a sequence of tall, card-like learning scenes with a persistent progress spine, while role-specific panels slide into focus. On larger screens the phone-like stage sits beside a slim narrative rail; on small screens the stage fills the viewport.

### Signature Elements
1. A hand-drawn progress spine with numbered lesson moments.
2. Roti-inspired circular fraction diagrams and local-language speech marks.
3. Paper tabs and ink stamps for role, offline, and feedback states.

### Interaction Philosophy
Every tap should confirm itself through a short, tactile response: cards lift slightly, selected language gets an ink underline, audio buttons pulse like a spoken syllable, and success states use a warm stamp rather than confetti. Interactions remain forgiving, with clear back and repeat actions.

### Animation
Use 160–240ms ease-out transitions for taps, soft slide-ins for scene changes, and a 1.2s looping pulse for audio playback. The progress spine draws forward as the user advances. Avoid decorative motion that competes with reading; movement should explain state change.

### Typography System
Use Fraunces for expressive headlines and DM Sans for interface text, labels, and metrics. Headlines should be compact and editorial, with sentence-case emphasis; body text should stay between 15–18px on mobile. Bengali/Hindi/local-language samples should use Noto Sans Bengali and Noto Sans Devanagari fallbacks where available.

### Brand Essence
LokaLearn is a low-bandwidth, local-language learning companion for teachers, students, and families who want education to feel understandable and close to home. Personality: grounded, encouraging, resourceful.

### Brand Voice
Headlines are direct and warm. CTAs sound like a helpful person beside you, never a corporate funnel. Examples: “Learn it in your language.” and “Play the hint again.”

### Wordmark & Logo
A simple open-book mark formed from two uneven indigo strokes with a marigold dot at the fold, suggesting both a book and a spoken syllable. The wordmark uses a custom rounded serif treatment, never default system text.

### Signature Brand Color
LokaLearn Marigold: #E9A23B, reserved for primary actions, confidence moments, and the active point on the progress spine.

## 90-second interaction story

The prototype opens on a language choice, then lets the visitor choose Teacher, Student, or Parent. A “Try the journey” control guides the visitor through the same 90-second narrative: language selection, role selection, a teacher dashboard with four metrics, a text/voice lesson translator, a student roti-based fraction lesson with audio and repeat controls, a visual quiz with feedback, a parent spoken-progress card, and an offline-mode confirmation. A persistent timeline and scene labels make the demo feel like a product story rather than disconnected screens. The final screen returns to the chosen role and offers a replay path.

## Style Decisions

- The interface is portrait-first and stage-based, with a warm editorial field-notes aesthetic.
- Generated visuals should support the roti fraction lesson and the open-book brand mark; the rest of the interface remains crisp, editable UI so interactions stay deterministic.
- The experience is a functional interactive website prototype, not a pre-rendered video file. Its 90-second story is controlled by the visitor, with an optional guided playback mode.
