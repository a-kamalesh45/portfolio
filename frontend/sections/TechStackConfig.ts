/**
 * TECH STACK SECTION - QUICK REFERENCE
 * 
 * File: sections/TechStackSection.tsx
 * Added to: app/page.tsx (between Resume and Portfolio sections)
 * 
 * VISUAL LAYOUT:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                        Tech Stack                            │
 * │        Technologies and tools I use to bring ideas to life   │
 * │                                                               │
 * │  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
 * │  │ ⚛️ │  │ ▲  │  │ TS │  │ 🟢 │  │ 🎨 │  │ 🐳 │  │ 🐘 │   │
 * │  │React│ │Next│  │Type│  │Node│  │Tail│  │Dock│  │Post│   │
 * │  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘   │
 * │                                                               │
 * │  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
 * │  │ 🍃 │  │ 📦 │  │ 🔧 │  │ C++│  │ 🐍 │  │ ☁️ │  │ 🐧 │   │
 * │  │Mongo│ │Redis│  │ Git│  │C++ │  │Pyth│  │ AWS│  │Linux│  │
 * │  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘   │
 * │                                                               │
 * │         16 technologies mastered and counting...             │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * RESPONSIVE BREAKPOINTS:
 * - Mobile (< 768px):  3 columns
 * - Tablet (768-1024): 4 columns  
 * - Desktop (1024-1280): 6 columns
 * - XL (> 1280px): 8 columns
 * 
 * HOVER EFFECTS:
 * - Scale up 5% (transform: scale(1.05))
 * - Brighten icon 10%
 * - Border color change (zinc-800 → zinc-700)
 * - Subtle shadow glow
 * - Smooth 300ms transition
 * 
 * TO ADD NEW TECH:
 * 1. Add SVG to: /public/assets/tech/your-tech.svg
 * 2. Update: data/content.ts
 *    techStack: [..., { name: "Your Tech", icon: "your-tech.svg" }]
 * 3. Done! Auto-updates in UI
 * 
 * TO REMOVE TECH:
 * 1. Delete SVG from /public/assets/tech/
 * 2. Remove entry from data/content.ts
 * 
 * COLOR SCHEME:
 * - Background: bg-zinc-950 (near black)
 * - Cards: bg-zinc-900/50 (dark transparent)
 * - Border: border-zinc-800/50 (subtle)
 * - Text: text-zinc-400 → hover:text-zinc-200
 * - Hover glow: from-zinc-700/10
 * 
 * PERFORMANCE:
 * - Uses Next.js Image component (auto-optimization)
 * - Lazy loading enabled
 * - Responsive image sizes
 * - No layout shift (aspect-square)
 */

export const TECH_STACK_CONFIG = {
    section: {
        id: "tech-stack",
        title: "Tech Stack",
        subtitle: "Technologies and tools I use to bring ideas to life",
        background: "bg-zinc-950",
        padding: "py-20 px-6 lg:px-16",
    },
    grid: {
        mobile: "grid-cols-3",      // 3 columns on mobile
        tablet: "md:grid-cols-4",   // 4 columns on tablet
        desktop: "lg:grid-cols-6",  // 6 columns on desktop
        xl: "xl:grid-cols-8",       // 8 columns on XL screens
        gap: "gap-4 md:gap-6",
    },
    card: {
        base: "group relative aspect-square bg-zinc-900/50 rounded-xl border border-zinc-800/50",
        hover: "hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50",
        padding: "p-4",
    },
    icon: {
        size: "w-12 h-12 md:w-16 md:h-16",
        hover: "group-hover:brightness-110 transition-all duration-300",
    },
    text: {
        base: "text-xs md:text-sm text-zinc-400",
        hover: "group-hover:text-zinc-200 transition-colors duration-300",
    },
}
