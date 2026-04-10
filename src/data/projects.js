/**
 * ============================================================
 *  PORTFOLIO PROJECTS — SINGLE SOURCE OF TRUTH
 * ============================================================
 *  To add a new project, copy the object template below,
 *  fill in your content, and push it into this array.
 *  The grid and modal will update automatically.
 * ============================================================
 */

export const projects = [
  {
    id: "flux-design-system",
    title: "Flux Design System",
    subtitle: "End-to-end component library for a SaaS product",
    year: "2025",
    category: "UI Design",
    tags: ["Figma", "Design System", "UI/UX"],
    coverImage: "https://picsum.photos/seed/flux-ds/1200/800",
    accent: "#3b82f6",
    // --- CASE STUDY (fill in later) ---
    overview:
      "A comprehensive design system built in Figma for a B2B SaaS platform. Covering typography, color tokens, 80+ components, and interaction patterns across web and mobile.",
    challenge:
      "The product had grown organically over 3 years — inconsistent spacing, mismatched color ramps, and duplicate components were slowing down both design and engineering.",
    solution:
      "I audited the existing UI, defined a token-based architecture, and rebuilt every component from scratch with documented variants, states, and usage guidelines.",
    results: [
      "Reduced designer hand-off time by 40%",
      "80+ documented components",
      "Adopted by a team of 6 engineers",
    ],
    images: [
      "https://picsum.photos/seed/flux-01/1200/700",
      "https://picsum.photos/seed/flux-02/1200/700",
      "https://picsum.photos/seed/flux-03/1200/700",
    ],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: "groq-chat-interface",
    title: "Groq Chat Interface",
    subtitle: "Real-time AI chat UI powered by Groq LLM API",
    year: "2025",
    category: "AI / Vibe-Coding",
    tags: ["React", "Groq API", "Tailwind CSS", "AI"],
    coverImage: "https://picsum.photos/seed/groq-chat/1200/800",
    accent: "#10b981",
    overview:
      "A sleek, latency-optimized chat interface built on top of the Groq API. Designed for speed — Groq's inference is nearly instantaneous, so the UI had to match that energy.",
    challenge:
      "Most AI chat UIs feel heavy and laggy. The challenge was to design something that felt as fast as the model itself, with meaningful streaming animations.",
    solution:
      "Built with React and a custom streaming hook. Characters render token-by-token with a subtle typewriter cadence. The layout is minimal so the conversation stays the focus.",
    results: [
      "Sub-100ms perceived latency on first token",
      "Mobile-first, fully responsive",
      "Supports multi-turn conversation history",
    ],
    images: [
      "https://picsum.photos/seed/groq-01/1200/700",
      "https://picsum.photos/seed/groq-02/1200/700",
    ],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: "brand-identity-kalt",
    title: "Kalt — Brand Identity",
    subtitle: "Visual identity for an independent coffee studio",
    year: "2024",
    category: "Graphic Design",
    tags: ["Adobe Photoshop", "Figma", "Branding"],
    coverImage: "https://picsum.photos/seed/kalt-brand/1200/800",
    accent: "#f59e0b",
    overview:
      "Full brand identity for Kalt, a minimalist specialty coffee shop concept. The brief asked for a visual language that felt cold, precise, and slightly industrial.",
    challenge:
      "Differentiate in a saturated market without relying on clichéd 'artisan' aesthetics. The brand needed to feel modern enough for a design-literate audience.",
    solution:
      "Built the identity around a tight monochrome palette with a single warm amber accent. The wordmark uses a geometric condensed typeface with deliberate negative space.",
    results: [
      "Complete brand kit: logo, type, color, packaging",
      "Applied across cups, bags, and environmental signage",
      "Featured in a local design showcase",
    ],
    images: [
      "https://picsum.photos/seed/kalt-01/1200/700",
      "https://picsum.photos/seed/kalt-02/1200/700",
      "https://picsum.photos/seed/kalt-03/1200/700",
    ],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: "orbit-dashboard",
    title: "Orbit — Analytics Dashboard",
    subtitle: "Data visualization for a creator economy tool",
    year: "2024",
    category: "UI Design",
    tags: ["Figma", "Data Viz", "UI/UX", "Prototype"],
    coverImage: "https://picsum.photos/seed/orbit-dash/1200/800",
    accent: "#8b5cf6",
    overview:
      "A high-density analytics dashboard designed for solo creators managing multiple content channels. Focused on at-a-glance data clarity over decorative charts.",
    challenge:
      "Information hierarchy in dashboards is notoriously hard. Most designs either hide the signal in noise, or strip out so much context the data becomes meaningless.",
    solution:
      "Designed around a 12-column bento grid with deliberate empty zones. Key metrics are typographically dominant; secondary data recedes. Color is used functionally only.",
    results: [
      "Tested with 8 creators — task completion rate: 94%",
      "High-fidelity prototype with 40+ screens",
      "Handoff-ready with auto-layout and variable components",
    ],
    images: [
      "https://picsum.photos/seed/orbit-01/1200/700",
      "https://picsum.photos/seed/orbit-02/1200/700",
    ],
    liveUrl: null,
    caseStudyUrl: null,
  },
];
