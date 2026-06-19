'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { resumeData } from '@/data/content'

interface Mission {
    id: string
    role: string
    company: string
    duration: string
    description: string
    isCurrent?: boolean
    type: string
    bgText: string
    metrics: { label: string; value: string }[]
    code: string
    lang: string
}

const MISSIONS: Mission[] = [
    {
        id: 'MISSION-01',
        role: resumeData.experience[0].title,
        company: resumeData.experience[0].organization,
        duration: resumeData.experience[0].duration,
        description: resumeData.experience[0].description,
        isCurrent: resumeData.experience[0].isCurrent,
        type: 'ACTIVE DEPLOYMENT',
        bgText: 'FINTECH',
        metrics: [
            { label: 'Companies', value: '1500+' },
            { label: 'Frontend', value: 'React' },
            { label: 'Status', value: 'LIVE' },
        ],
        code: `// MUI X Data Grid — financial dashboard
<DataGrid
  rows={companies}
  columns={columns}
  sortingMode="server"
  filterMode="server"
  onSortModelChange={fetchData}
/>`,
        lang: 'tsx',
    },
    {
        id: 'MISSION-02',
        role: resumeData.experience[1].title,
        company: resumeData.experience[1].organization,
        duration: resumeData.experience[1].duration,
        description: resumeData.experience[1].description,
        isCurrent: resumeData.experience[1].isCurrent,
        type: 'ACTIVE DEPLOYMENT',
        bgText: 'SPACE',
        metrics: [
            { label: 'Attendees', value: '2000+' },
            { label: 'Framework', value: 'Next.js' },
            { label: 'Status', value: 'LIVE' },
        ],
        code: `// Next.js — dynamic event routing
export async function generateStaticParams() {
  return events.map((e) => ({
    slug: e.slug,
  }))
}`,
        lang: 'ts',
    },
    {
        id: 'MISSION-03',
        role: resumeData.experience[2].title,
        company: resumeData.experience[2].organization,
        duration: resumeData.experience[2].duration,
        description: resumeData.experience[2].description,
        isCurrent: resumeData.experience[2].isCurrent,
        type: 'ACTIVE DEPLOYMENT',
        bgText: 'EVENTS',
        metrics: [
            { label: 'Participants', value: '2500+' },
            { label: 'Domain', value: 'Logistics' },
            { label: 'Status', value: 'ONGOING' },
        ],
        code: `// Event coordination checklist
const phases = [
  'outreach',
  'scheduling',
  'volunteer_mgmt',
  'on_ground_exec',
]
phases.forEach(run)`,
        lang: 'js',
    },
]

export function ResumeSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const idx = Math.min(
            Math.floor(latest * MISSIONS.length),
            MISSIONS.length - 1
        )
        setActiveIndex(idx)
    })

    const mission = MISSIONS[activeIndex]

    return (
        <section id="resume">
            {/* Tall scrollable container — each mission gets 100vh of scroll travel */}
            <div ref={containerRef} style={{ height: `${MISSIONS.length * 100}vh` }}>
                <div className="sticky top-0 h-screen bg-neutral-950 overflow-hidden flex">

                    {/* ─── LEFT: Command Center ─── */}
                    <div className="hidden md:flex w-72 lg:w-80 flex-shrink-0 border-r border-neutral-800/60 flex-col px-8 py-10 relative z-20">

                        {/* Blueprint corner accent */}
                        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/20 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-orange-500/20 pointer-events-none" />

                        {/* OS label */}
                        <div className="mb-8">
                            <p className="font-mono text-[9px] tracking-[0.25em] text-orange-500 uppercase mb-2">
                                CAREER OS v2.1
                            </p>
                            <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
                        </div>

                        {/* Active mission counter */}
                        <div className="mb-10 font-mono leading-none">
                            <span className="text-[9px] text-neutral-600 uppercase tracking-widest">Mission</span>
                            <div className="flex items-baseline gap-1 mt-1">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={activeIndex}
                                        initial={{ y: -12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 12, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="text-5xl font-black text-orange-500"
                                    >
                                        {String(activeIndex + 1).padStart(2, '0')}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-neutral-700 text-xl">/</span>
                                <span className="text-neutral-700 text-xl">
                                    {String(MISSIONS.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        {/* Mission index list */}
                        <div className="space-y-7 flex-1">
                            {MISSIONS.map((m, i) => (
                                <motion.div
                                    key={m.id}
                                    animate={{ opacity: i === activeIndex ? 1 : 0.3 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex flex-col items-center pt-1 flex-shrink-0">
                                        <motion.div
                                            animate={{
                                                backgroundColor:
                                                    i === activeIndex ? '#f97316' : '#3f3f46',
                                                scale: i === activeIndex ? 1.35 : 1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="w-2 h-2 rounded-full"
                                        />
                                        {i < MISSIONS.length - 1 && (
                                            <motion.div
                                                animate={{
                                                    backgroundColor:
                                                        i < activeIndex ? '#f97316' : '#3f3f46',
                                                }}
                                                transition={{ duration: 0.5 }}
                                                className="w-px mt-2"
                                                style={{ height: '36px' }}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-mono text-[9px] text-neutral-600 mb-0.5 tracking-widest">
                                            {m.id}
                                        </p>
                                        <p
                                            className={`font-mono text-sm font-semibold ${i === activeIndex ? 'text-white' : 'text-neutral-600'}`}
                                        >
                                            {m.role}
                                        </p>
                                        <p
                                            className={`font-mono text-[10px] ${i === activeIndex ? 'text-orange-400' : 'text-neutral-700'}`}
                                        >
                                            {m.company}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* System stats */}
                        <div className="border-t border-neutral-800 pt-6 space-y-2.5 font-mono">
                            <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-3">
                                System Stats
                            </p>
                            {[
                                { k: 'Roles', v: '3' },
                                { k: 'Projects', v: '4+' },
                                { k: 'CGPA', v: '8.33' },
                            ].map((s) => (
                                <div key={s.k} className="flex justify-between items-center">
                                    <span className="text-xs text-neutral-600">{s.k}</span>
                                    <span className="text-xs text-orange-400 font-semibold">{s.v}</span>
                                </div>
                            ))}
                        </div>

                        {/* Blinking cursor */}
                        <div className="mt-6 font-mono text-xs text-neutral-700 flex items-center gap-1.5">
                            <span>$</span>
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-[7px] h-[14px] bg-orange-500"
                            />
                        </div>
                    </div>

                    {/* ─── RIGHT: Mission Panel ─── */}
                    <div className="flex-1 relative overflow-hidden">

                        {/* Blueprint grid */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)',
                                backgroundSize: '50px 50px',
                            }}
                        />

                        {/* Large background text — transitions with each mission */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`bg-${activeIndex}`}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 0.04, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden pl-8 lg:pl-12"
                            >
                                <span
                                    className="font-black text-white leading-none"
                                    style={{
                                        fontSize: 'clamp(6rem, 15vw, 19rem)',
                                        letterSpacing: '-0.05em',
                                    }}
                                >
                                    {mission.bgText}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mission content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${activeIndex}`}
                                initial={{ opacity: 0, y: 45 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -35 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex flex-col justify-center p-6 md:p-10 lg:p-14"
                            >
                                {/* Type badge */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 border font-mono text-[9px] uppercase tracking-widest ${mission.isCurrent
                                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                            : 'border-neutral-700 bg-neutral-900/40 text-neutral-500'
                                            }`}
                                    >
                                        {mission.isCurrent && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        )}
                                        {mission.type}
                                    </div>
                                    <span className="font-mono text-[9px] text-neutral-700">
                                        {mission.id}
                                    </span>
                                </div>

                                {/* Role headline */}
                                <h2
                                    className="font-black text-white tracking-tight leading-[0.9] mb-4"
                                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
                                >
                                    {mission.role}
                                </h2>

                                {/* Company + Duration */}
                                <div className="flex flex-wrap items-center gap-3 mb-8">
                                    <span className="font-mono text-orange-400 text-base lg:text-lg font-semibold">
                                        {mission.company}
                                    </span>
                                    <span className="text-neutral-700">—</span>
                                    <span className="font-mono text-neutral-500 text-sm">
                                        {mission.duration}
                                    </span>
                                </div>

                                {/* Two columns: log + code */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl">

                                    {/* Mission log terminal */}
                                    <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm">
                                        <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-950 border-b border-neutral-800">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                            </div>
                                            <span className="font-mono text-[9px] text-neutral-600 ml-2">
                                                {mission.id.toLowerCase().replace('-', '_')}.log
                                            </span>
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <p className="font-mono text-[10px] text-neutral-700 mb-2">
                                                $ cat description.txt
                                            </p>
                                            {mission.description
                                                .split('. ')
                                                .filter(Boolean)
                                                .map((line, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -6 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.15 + i * 0.1 }}
                                                        className="flex gap-2"
                                                    >
                                                        <span className="text-emerald-500 flex-shrink-0 font-mono text-xs">
                                                            ›
                                                        </span>
                                                        <span className="text-neutral-300 text-xs leading-relaxed">
                                                            {line.trim()}
                                                        </span>
                                                    </motion.div>
                                                ))}

                                            {/* Metrics row */}
                                            <div className="pt-3 mt-2 border-t border-neutral-800/60 grid grid-cols-3 gap-2">
                                                {mission.metrics.map((m) => (
                                                    <div key={m.label}>
                                                        <p className="font-mono text-[8px] text-neutral-700 uppercase tracking-wider mb-1">
                                                            {m.label}
                                                        </p>
                                                        <p className="font-mono text-[11px] font-bold text-orange-400">
                                                            {m.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Code snippet */}
                                    <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm">
                                        <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-950 border-b border-neutral-800">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                            </div>
                                            <span className="font-mono text-[9px] text-neutral-600 ml-2">
                                                snippet.{mission.lang}
                                            </span>
                                        </div>
                                        <pre className="p-4 font-mono text-[11px] leading-relaxed text-neutral-300 overflow-auto">
                                            <code>{mission.code}</code>
                                        </pre>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Right-edge scroll progress pills */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
                            {MISSIONS.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: i === activeIndex ? 40 : 8,
                                        backgroundColor:
                                            i === activeIndex ? '#f97316' : '#3f3f46',
                                        opacity: i === activeIndex ? 1 : 0.45,
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-0.5 rounded-full"
                                />
                            ))}
                        </div>

                        {/* Corner brackets */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-orange-500/15 pointer-events-none" />
                        <div className="absolute bottom-6 right-12 w-8 h-8 border-b-2 border-r-2 border-orange-500/15 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Resume CTA — sits below the sticky scroll block */}
            <div className="bg-neutral-950 border-t border-neutral-800 py-14 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                            Want the full story?
                        </h3>
                        <p className="text-neutral-500 text-sm font-mono">
                            Download complete mission log as PDF
                        </p>
                    </div>
                    <motion.a
                        href="/resume.pdf"
                        download
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-mono text-xs uppercase tracking-[0.15em] transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        Download Resume
                    </motion.a>
                </div>
            </div>
        </section>
    )
}
