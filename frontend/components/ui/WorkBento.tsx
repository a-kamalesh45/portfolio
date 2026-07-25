'use client'

import { useRef, useState } from 'react'
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
    id: string
    title: string
    subtitle: string
    category: string
    status: 'LIVE' | 'BETA' | 'ARCHIVED' | 'IN DEV'
    bgText: string
    story: string
    stack: string[]
    architecture: string
    date: string
    metrics: { value: string; label: string }[]
}

// ─── Project data ─────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
    {
        id: 'PROJECT-01',
        title: 'Isolated-State Market Matching Engine',
        subtitle: 'Trading Simulator',
        category: 'Systems',
        status: 'LIVE',
        bgText: 'MARKET',
        story: 'A trading simulator that streams live Binance data and lets users place synthetic trades that shift local price independently of real market.',
        stack: ['C++', 'Node.js', 'Next.js', 'Redis', 'std::thread', 'WebSockets', 'Redis queues', 'Redis Pub/Sub', 'Binance live trade data'],
        architecture: 'Architected a fully decoupled microservices system using C++, Node.js, Next.js, and Redis for real-time, low-latency trading simulation. Engineered a multi-threaded C++ matching engine using std::thread, dedicating one CPU thread per asset across 8 parallel order books. Wired a Node.js WebSocket ingestion pipeline that normalizes and streams thousands of live Binance trades per minute into Redis queues. Broadcasted synthetic price updates via Redis Pub/Sub, simulating market impact and slippage with instant resync to the real market.',
        metrics: [
            { value: '8', label: 'Parallel Order Books' },
            { value: '1', label: 'CPU Thread / Asset' },
            { value: 'Thousands', label: 'Binance Trades / Minute' },
            { value: 'Redis', label: 'Queues + Pub/Sub' },
        ],
        date: 'Mar 2026 - May 2026',
    },
    {
        id: 'PROJECT-02',
        title: 'Real-Time Collaborative Document Editor',
        subtitle: 'CRDT Document Collaboration',
        category: 'Collaboration',
        status: 'LIVE',
        bgText: 'SYNC',
        story: 'Collaborative editor that lets multiple users edit a document at once, using Conflict-Free Replication Datatypes to stay synced, server-free.',
        stack: ['Yjs', 'CRDT', 'WebSockets', 'Socket.io', 'PostgreSQL', 'JWT', 'RBAC'],
        architecture: 'Designed a dual-layer state machine using the Yjs CRDT engine, replacing last-write-wins logic with deterministic, conflict-free merging. Formed a WebSocket relay with Socket.io that transmits compressed binary deltas instead of full JSON payloads, reducing network latency. Developed an append-only version history engine in PostgreSQL, restoring past snapshots into active CRDT session without desync. Implemented dual-layer RBAC and stateless JWT authentication, enforcing Owner, Editor, and Viewer permissions across both layers.',
        metrics: [
            { value: 'Owner / Editor / Viewer', label: 'Roles' },
            { value: 'Binary deltas', label: 'Relay Transport' },
            { value: 'Append-only', label: 'Version History' },
            { value: 'JWT', label: 'Auth' },
        ],
        date: 'Mar 2026 - Apr 2026',
    },
    {
        id: 'PROJECT-03',
        title: 'Intelligent Query Management Platform',
        subtitle: 'AI Ticketing Platform',
        category: 'Full-Stack',
        status: 'LIVE',
        bgText: 'TICKETS',
        story: 'A full-stack ticketing platform that uses AI to categorize queries, routes them to the right team, and tracks resolution against SLA deadlines.',
        stack: ['MERN', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'LLM API', 'MongoDB text search', 'RBAC'],
        architecture: 'Architected a full-stack MERN application with role-based access control, separating Participant, Admin, and Team Head permissions. Integrated the LLM API to auto-categorize incoming queries and generate confidence scores, routing tickets to the right Team Head. Built an SLA tracking system with priority-based deadlines and breach detection, surfacing real-time compliance metrics on dashboards. Implemented a knowledge base using MongoDB text search, suggesting resolved queries to users before they submit a duplicate ticket.',
        metrics: [
            { value: 'Participant / Admin / Team Head', label: 'Roles' },
            { value: 'LLM', label: 'Categorization' },
            { value: 'SLA', label: 'Tracking' },
            { value: 'MongoDB', label: 'Search' },
        ],
        date: 'Nov 2025 - Jan 2026',
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
                                                className={`font-mono text-sm font-semibold truncate leading-tight ${i === activeIndex ? 'text-white' : 'text-neutral-600'
                                                    }`}
                                            >
                                                {p.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span
                                                    className={`font-mono text-[9px] ${i === activeIndex ? 'text-orange-400' : 'text-neutral-700'
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

                                <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-[9px] text-neutral-600 uppercase tracking-[0.2em]">
                                    <span>{project.subtitle}</span>
                                    <span className="text-neutral-700">/</span>
                                    <span>{project.date}</span>
                                </div>

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
                                                {project.architecture}
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

                                    {/* Panel C: Preview */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.35, duration: 0.5 }}
                                        className="hidden lg:block w-48 xl:w-56"
                                    >
                                        <div className="relative h-full min-h-[180px] border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background:
                                                        'radial-gradient(circle at top left, rgba(249,115,22,0.28), transparent 40%), linear-gradient(135deg, rgba(17,24,39,0.95), rgba(15,23,42,0.88))',
                                                }}
                                            />
                                            <div className="absolute inset-0 flex flex-col justify-between p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="font-mono text-[9px] text-orange-400 uppercase tracking-[0.25em]">
                                                        {project.date}
                                                    </div>
                                                    <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em] text-right">
                                                        {project.subtitle}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-black text-white leading-none text-2xl tracking-tight">
                                                        {project.bgText}
                                                    </p>
                                                    <p className="mt-2 text-[10px] leading-relaxed text-neutral-300">
                                                        {project.category}
                                                    </p>
                                                </div>
                                            </div>

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
                                                    {project.subtitle}
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
