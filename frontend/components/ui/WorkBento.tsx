'use client'

import { useRef, useState } from 'react'
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion'
import Image from 'next/image'
import { portfolioData } from '@/data/content'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
    id: string
    title: string
    category: string
    status: 'LIVE' | 'BETA' | 'ARCHIVED' | 'IN DEV'
    bgText: string
    story: string
    stack: string[]
    arch: string
    metrics: { value: string; label: string }[]
    image: string
}

// ─── Project data ─────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
    {
        id: 'PROJECT-01',
        title: 'Research Fundamentals',
        category: 'Financial Dashboard',
        status: 'LIVE',
        bgText: 'FINANCE',
        story: 'Production frontend built from scratch for a fintech platform. React with MUI X Data Grid renders interactive, sortable dashboards over financial data of 1500+ companies — live for selected users with real API-driven data.',
        stack: ['React', 'MUI X Data Grid', 'JavaScript', 'REST APIs'],
        arch: 'Excel-based local data pipeline migrated to live external API integration for production deployment',
        metrics: [
            { value: '1500+', label: 'Companies' },
            { value: 'Live', label: 'API Data' },
            { value: 'React', label: 'Frontend' },
            { value: 'MUI', label: 'Data Grid' },
        ],
        image: portfolioData.projects[0].image,
    },
    {
        id: 'PROJECT-02',
        title: 'KGPath',
        category: 'Lost and Found Platform',
        status: 'LIVE',
        bgText: 'CAMPUS',
        story: 'Full-stack platform built for IIT Kharagpur students to report, browse, and recover lost items. Secure authentication, CRUD APIs, and a responsive React frontend with status tracking, search, and filtering.',
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        arch: 'MERN stack with JWT-based authentication, RESTful CRUD APIs, and responsive client-side routing',
        metrics: [
            { value: 'MERN', label: 'Stack' },
            { value: 'JWT', label: 'Auth' },
            { value: 'CRUD', label: 'APIs' },
            { value: 'Vercel', label: 'Deploy' },
        ],
        image: portfolioData.projects[1].image,
    },
    {
        id: 'PROJECT-03',
        title: 'Hive',
        category: 'Query Management System',
        status: 'LIVE',
        bgText: 'WORKFLOW',
        story: 'Role-based query management system with three access levels — Participants, Admins, and Team Heads. Complete query lifecycle with state transitions and email notifications on every update.',
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        arch: 'RESTful API with role-based access control, query state machine (Unassigned → Assigned → Resolved), and email notification hooks',
        metrics: [
            { value: '3', label: 'Role Levels' },
            { value: '4', label: 'Query States' },
            { value: 'Email', label: 'Notifs' },
            { value: 'RBAC', label: 'Auth Model' },
        ],
        image: portfolioData.projects[2].image,
    },
    {
        id: 'PROJECT-04',
        title: "Nat'l Students' Space Challenge",
        category: 'Fest Website',
        status: 'LIVE',
        bgText: 'SPACE',
        story: 'Official website for NSSC — IIT Kharagpur\'s national space fest. Built with Next.js to handle 2000+ attendees across registration, schedule, and event pages with cross-device responsiveness and optimised assets.',
        stack: ['Next.js', 'Tailwind CSS', 'JavaScript'],
        arch: 'Next.js with dynamic routing, static asset optimisation, and responsive layout system for mobile and desktop parity',
        metrics: [
            { value: '2000+', label: 'Attendees' },
            { value: 'Next.js', label: 'Framework' },
            { value: 'nssc.in', label: 'Live URL' },
            { value: 'Mobile', label: 'Responsive' },
        ],
        image: portfolioData.projects[3].image,
    },
]

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CFG = {
    LIVE: {
        text: 'text-emerald-400',
        border: 'border-emerald-500/40',
        bg: 'bg-emerald-500/10',
        dot: 'bg-emerald-500',
        pulse: true,
    },
    BETA: {
        text: 'text-blue-400',
        border: 'border-blue-500/40',
        bg: 'bg-blue-500/10',
        dot: 'bg-blue-500',
        pulse: true,
    },
    ARCHIVED: {
        text: 'text-neutral-500',
        border: 'border-neutral-700',
        bg: 'bg-neutral-800/40',
        dot: 'bg-neutral-600',
        pulse: false,
    },
    'IN DEV': {
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        bg: 'bg-amber-500/10',
        dot: 'bg-amber-400',
        pulse: true,
    },
} as const

// ─── Component ────────────────────────────────────────────────────────────────

export function WorkBento() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const idx = Math.min(
            Math.floor(latest * PROJECTS.length),
            PROJECTS.length - 1
        )
        setActiveIndex(idx)
    })

    const project = PROJECTS[activeIndex]
    const statusCfg = STATUS_CFG[project.status]

    return (
        <section id="portfolio">
            {/* Scroll container — each project owns 100vh of scroll travel */}
            <div ref={containerRef} style={{ height: `${PROJECTS.length * 100}vh` }}>
                <div className="sticky top-0 h-screen bg-neutral-950 overflow-hidden flex">

                    {/* ────────────────────────────────────────────────────────
                        LEFT PANEL — Project Command Navigator
                    ──────────────────────────────────────────────────────── */}
                    <div className="hidden md:flex w-72 lg:w-80 flex-shrink-0 border-r border-neutral-800/60 flex-col px-8 py-10 relative z-20">

                        {/* Blueprint corner accents */}
                        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/20 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-orange-500/20 pointer-events-none" />

                        {/* OS header */}
                        <div className="mb-8">
                            <p className="font-mono text-[9px] tracking-[0.25em] text-orange-500 uppercase mb-2">
                                PROJECT OS v1.0
                            </p>
                            <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
                        </div>

                        {/* Active project counter */}
                        <div className="mb-10 font-mono leading-none">
                            <span className="text-[9px] text-neutral-600 uppercase tracking-widest">
                                Active
                            </span>
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
                                    {String(PROJECTS.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        {/* Project navigation list */}
                        <div className="space-y-5 flex-1 overflow-hidden">
                            {PROJECTS.map((p, i) => {
                                const cfg = STATUS_CFG[p.status]
                                return (
                                    <motion.div
                                        key={p.id}
                                        animate={{ opacity: i === activeIndex ? 1 : 0.28 }}
                                        transition={{ duration: 0.35 }}
                                        className="flex items-start gap-3"
                                    >
                                        {/* Timeline spine */}
                                        <div className="flex flex-col items-center pt-1 flex-shrink-0">
                                            <motion.div
                                                animate={{
                                                    backgroundColor: i === activeIndex ? '#f97316' : '#3f3f46',
                                                    scale: i === activeIndex ? 1.4 : 1,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="w-2 h-2 rounded-full"
                                            />
                                            {i < PROJECTS.length - 1 && (
                                                <motion.div
                                                    animate={{
                                                        backgroundColor: i < activeIndex ? '#f97316' : '#3f3f46',
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                    className="w-px mt-1.5"
                                                    style={{ height: '32px' }}
                                                />
                                            )}
                                        </div>

                                        {/* Project info */}
                                        <div className="min-w-0 flex-1">
                                            <p className="font-mono text-[9px] text-neutral-600 mb-0.5 tracking-widest">
                                                {p.id}
                                            </p>
                                            <p
                                                className={`font-mono text-sm font-semibold truncate leading-tight ${
                                                    i === activeIndex ? 'text-white' : 'text-neutral-600'
                                                }`}
                                            >
                                                {p.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span
                                                    className={`font-mono text-[9px] ${
                                                        i === activeIndex ? 'text-orange-400' : 'text-neutral-700'
                                                    }`}
                                                >
                                                    {p.category}
                                                </span>
                                                <span
                                                    className={`font-mono text-[8px] px-1.5 py-0.5 border ${cfg.border} ${cfg.bg} ${cfg.text}`}
                                                >
                                                    {p.status}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* System stats */}
                        <div className="border-t border-neutral-800 pt-5 font-mono">
                            <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-3">
                                System Stats
                            </p>
                            <div className="space-y-2">
                                {[
                                    { k: 'Total Projects', v: String(PROJECTS.length) },
                                    { k: 'Deployed Live', v: String(PROJECTS.filter((p) => p.status === 'LIVE').length) },
                                    { k: 'Primary Stack', v: 'MERN' },
                                ].map((s) => (
                                    <div key={s.k} className="flex justify-between items-center">
                                        <span className="text-xs text-neutral-600">{s.k}</span>
                                        <span className="text-xs text-orange-400 font-semibold">{s.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Blinking cursor */}
                        <div className="mt-5 font-mono text-xs text-neutral-700 flex items-center gap-1.5">
                            <span>$</span>
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-[7px] h-[14px] bg-orange-500"
                            />
                        </div>
                    </div>

                    {/* ────────────────────────────────────────────────────────
                        RIGHT PANEL — Immersive Project Showcase
                    ──────────────────────────────────────────────────────── */}
                    <div className="flex-1 relative overflow-hidden">

                        {/* Blueprint grid layer */}
                        <div
                            className="absolute inset-0 pointer-events-none z-0"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(249,115,22,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.045) 1px, transparent 1px)',
                                backgroundSize: '50px 50px',
                            }}
                        />

                        {/* Giant background text — transitions with each project */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`bg-${activeIndex}`}
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 0.038, x: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden pl-6 lg:pl-10 z-0"
                            >
                                <span
                                    className="font-black text-white leading-none"
                                    style={{
                                        fontSize: 'clamp(5rem, 13vw, 17rem)',
                                        letterSpacing: '-0.05em',
                                    }}
                                >
                                    {project.bgText}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Project content — animates on index change */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${activeIndex}`}
                                initial={{ opacity: 0, y: 45 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -35 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex flex-col justify-center p-5 md:p-8 lg:p-12 z-10"
                            >
                                {/* Row 1: Status badge + project ID */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 }}
                                    className="flex items-center flex-wrap gap-3 mb-4"
                                >
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 border font-mono text-[9px] uppercase tracking-widest ${statusCfg.border} ${statusCfg.bg} ${statusCfg.text}`}
                                    >
                                        {statusCfg.pulse && (
                                            <motion.span
                                                animate={{ opacity: [1, 0.2, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}
                                            />
                                        )}
                                        {project.status}
                                    </div>
                                    <span className="font-mono text-[9px] text-neutral-700">
                                        {project.id}
                                    </span>
                                    <span className="font-mono text-[9px] text-neutral-700">
                                        / {project.category.toUpperCase()}
                                    </span>
                                </motion.div>

                                {/* Row 2: Project title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-black text-white tracking-tight leading-none mb-3"
                                    style={{ fontSize: 'clamp(2rem, 4.5vw, 4.2rem)' }}
                                >
                                    {project.title}
                                </motion.h2>

                                {/* Row 3: Story */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.18 }}
                                    className="font-mono text-neutral-400 text-xs lg:text-sm leading-relaxed mb-6 max-w-xl"
                                >
                                    {project.story}
                                </motion.p>

                                {/* Row 4: Detail panels — stack / metrics / image */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-3 max-w-4xl">

                                    {/* Panel A: Tech stack + architecture */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.22 }}
                                        className="bg-neutral-900/70 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border-b border-neutral-800">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                            </div>
                                            <span className="font-mono text-[9px] text-neutral-600 ml-1">
                                                tech_stack.sys
                                            </span>
                                        </div>
                                        <div className="p-3.5">
                                            <p className="font-mono text-[8px] text-neutral-700 uppercase tracking-widest mb-2">
                                                Stack
                                            </p>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.stack.map((tech, i) => (
                                                    <motion.span
                                                        key={tech}
                                                        initial={{ opacity: 0, scale: 0.85 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.25 + i * 0.04 }}
                                                        className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700/60 font-mono text-[9px] text-neutral-300"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            <p className="font-mono text-[8px] text-neutral-700 uppercase tracking-widest mb-1">
                                                Architecture
                                            </p>
                                            <p className="text-neutral-400 text-[10px] leading-relaxed">
                                                {project.arch}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Panel B: Metrics */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-neutral-900/70 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border-b border-neutral-800">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                            </div>
                                            <span className="font-mono text-[9px] text-neutral-600 ml-1">
                                                metrics.log
                                            </span>
                                        </div>
                                        <div className="p-3.5 grid grid-cols-2 gap-3">
                                            {project.metrics.map((m, i) => (
                                                <motion.div
                                                    key={m.label}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.33 + i * 0.06 }}
                                                >
                                                    <p className="font-mono text-[8px] text-neutral-700 uppercase tracking-wider mb-0.5">
                                                        {m.label}
                                                    </p>
                                                    <p className="font-mono text-lg font-bold text-orange-400 leading-none">
                                                        {m.value}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Panel C: Project image (lg+ only) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.35, duration: 0.5 }}
                                        className="hidden lg:block w-48 xl:w-56"
                                    >
                                        <div className="relative h-full min-h-[180px] border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover opacity-55"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent" />

                                            {/* Corner brackets */}
                                            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-orange-500/50 pointer-events-none" />
                                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-orange-500/50 pointer-events-none" />
                                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-orange-500/50 pointer-events-none" />
                                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-orange-500/50 pointer-events-none" />

                                            {/* Scan line sweeps on project change */}
                                            <motion.div
                                                key={`scan-${activeIndex}`}
                                                initial={{ y: '-5%' }}
                                                animate={{ y: '110%' }}
                                                transition={{ duration: 1.8, ease: 'linear', delay: 0.4 }}
                                                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent pointer-events-none"
                                            />

                                            <div className="absolute bottom-3 left-3">
                                                <p className="font-mono text-[8px] text-orange-400/70 uppercase tracking-wider">
                                                    Preview
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Right-edge scroll progress pills */}
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
                            {PROJECTS.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: i === activeIndex ? 40 : 8,
                                        backgroundColor: i === activeIndex ? '#f97316' : '#3f3f46',
                                        opacity: i === activeIndex ? 1 : 0.45,
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-0.5 rounded-full"
                                />
                            ))}
                        </div>

                        {/* Blueprint corner brackets */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-orange-500/15 pointer-events-none" />
                        <div className="absolute bottom-6 right-10 w-8 h-8 border-b-2 border-r-2 border-orange-500/15 pointer-events-none" />

                        {/* Mobile: mini top bar project indicator */}
                        <div className="md:hidden absolute top-4 left-4 right-14 z-30 flex items-center gap-2">
                            <span className="font-mono text-[9px] text-orange-500 uppercase tracking-widest">
                                PROJECT OS
                            </span>
                            <div className="flex-1 h-px bg-neutral-800" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="font-mono text-[9px] text-neutral-600"
                                >
                                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                                    {String(PROJECTS.length).padStart(2, '0')}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
