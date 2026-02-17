'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'
import { personalInfo } from '@/data/content'
import { GlitchText } from '@/components/ui/GlitchText'
import { SlotMachine } from '@/components/ui/SlotMachine'

// --- CONSTANTS & ASSETS ---

const socialIcons = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.social.twitter, label: 'Twitter' },
]

const BLOB_PATH = "M65.4,-37.9C79.2,-13.9,81,17,68.1,38C55.2,59.1,27.6,70.5,1.5,69.6C-24.6,68.8,-49.3,55.7,-56,38.2C-62.6,20.7,-51.3,-1.2,-39,-24.4C-26.7,-47.6,-13.3,-72,6.2,-75.6C25.8,-79.2,51.6,-62,65.4,-37.9Z"

const WORD_PAIRS = [
    { left: 'SYSTEMS', right: 'CREATIVITY' },
    { left: 'LOGIC', right: 'CHAOS' },
    { left: 'DESIGN', right: 'ENGINEERING' },
]

// --- COMPONENT ---

export function HeroSection() {
    const scrollToWork = () => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="home"
            className="min-h-screen relative overflow-hidden bg-neutral-100 flex items-center"
        >
            {/* 1. BACKGROUND ACCENTS */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] opacity-[0.08]"
                    style={{
                        background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgb(251, 191, 36) 10deg, transparent 20deg, transparent 30deg, rgb(251, 191, 36) 40deg, transparent 50deg, transparent 60deg, rgb(251, 191, 36) 70deg, transparent 80deg, transparent 90deg, rgb(251, 191, 36) 100deg, transparent 110deg, transparent 120deg, rgb(251, 191, 36) 130deg, transparent 140deg, transparent 150deg, rgb(251, 191, 36) 160deg, transparent 170deg, transparent 180deg, rgb(251, 191, 36) 190deg, transparent 200deg, transparent 210deg, rgb(251, 191, 36) 220deg, transparent 230deg, transparent 240deg, rgb(251, 191, 36) 250deg, transparent 260deg, transparent 270deg, rgb(251, 191, 36) 280deg, transparent 290deg, transparent 300deg, rgb(251, 191, 36) 310deg, transparent 320deg, transparent 330deg, rgb(251, 191, 36) 340deg, transparent 350deg, transparent 360deg)`,
                        filter: 'blur(40px)',
                    }}
                />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* 2. MAIN CONTAINER */}
            <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                {/* === LEFT CONTENT === */}
                <div className="relative z-30 w-full lg:w-1/2 py-20 lg:py-0">

                    {/* ID Badge / Metadata */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8 font-mono text-xs md:text-sm text-gray-500 tracking-wide flex items-center gap-1"
                    >
                        <span className="text-orange-500">::</span>
                        <span>24CE10065</span>
                        <span className="text-gray-400 mx-1">//</span>
                        <span>IIT KHARAGPUR</span>
                        <span className="text-gray-400 mx-1">//</span>
                        <span className="text-green-600">IN_FLOW_STATE</span>
                        <motion.span
                            className="inline-block w-1.5 h-3 bg-gray-400 ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            █
                        </motion.span>
                    </motion.div>

                    {/* The Name - Glitch Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <GlitchText
                            text="KAMALESH ACHARYA"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-gray-900 cursor-pointer select-none"
                            decodeOnLoad={true}
                            decodeOnHover={true}
                        />
                    </motion.div>

                    {/* Dynamic Role - Slot Machine */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-6 mb-8"
                    >
                        <SlotMachine
                            wordPairs={WORD_PAIRS}
                            interval={2500}
                            className="text-xl md:text-2xl"
                        />
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed mb-10 font-light"
                    >
                        Building robust systems and crafting elegant digital experiences.
                        From high-performance platforms to modern web applications — where engineering meets creativity.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        {/* Primary Button */}
                        <motion.button
                            onClick={scrollToWork}
                            className="group relative px-8 py-4 bg-gray-900 text-white font-mono text-sm uppercase tracking-wider overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                See My Work
                                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                            </span>
                            {/* Glitch effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute inset-0 flex items-center justify-center font-mono text-sm uppercase tracking-wider text-gray-900 opacity-0 group-hover:opacity-100"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                See My Work <ArrowDown size={16} className="ml-2" />
                            </motion.span>
                        </motion.button>

                        {/* Secondary Button */}
                        <motion.a
                            href="#contact"
                            className="group relative px-8 py-4 bg-transparent border border-gray-300 text-gray-900 font-mono text-sm uppercase tracking-wider overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">Contact</span>
                            {/* Orange border fill on hover */}
                            <motion.div
                                className="absolute inset-0 border-2 border-orange-500"
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-orange-500/5"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="mt-12 flex items-center gap-4"
                    >
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Connect</span>
                        <div className="w-8 h-[1px] bg-gray-300"></div>
                        <div className="flex gap-3">
                            {socialIcons.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                                    >
                                        <Icon size={20} />
                                    </a>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* === RIGHT VISUAL AREA === */}
                <div className="hidden lg:block relative w-[55%] h-[800px]">

                    {/* Subtle Background Accent Blob */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 translate-x-12 translate-y-4">
                        <svg viewBox="0 0 200 200" className="w-[130%] h-[130%] fill-amber-100/50 opacity-60">
                            <defs>
                                <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fef3c7" />
                                    <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.4" />
                                </linearGradient>
                            </defs>
                            <path d={BLOB_PATH} transform="translate(100 100)" fill="url(#blobGrad)" />
                        </svg>
                    </div>

                    {/* 
                        === LAYERED TEXT-IMAGE OVERLAP EFFECT ===
                        This creates the editorial overlap where:
                        - Solid text sits beneath the image (gets hidden)
                        - Outline text sits on top of the image (remains visible)
                        - Result: Text appears solid outside the image, outlined within
                    */}

                    {/* LAYER 1 (z-10): SOLID TEXT - Hidden beneath image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="absolute left-[-8%] top-[28%] z-10 pointer-events-none select-none"
                    >
                        {/* Shared typography variables for perfect alignment */}
                        <h2
                            className="font-black uppercase tracking-tighter text-amber-500/20"
                            style={{
                                fontSize: 'clamp(100px, 12vw, 140px)',
                                lineHeight: '0.9',
                                fontFamily: 'inherit',
                            }}
                        >
                            ENGINEER
                        </h2>
                        <h2
                            className="font-black uppercase tracking-tight text-gray-700/20 ml-16 mt-2"
                            style={{
                                fontSize: 'clamp(80px, 10vw, 110px)',
                                lineHeight: '0.9',
                                fontFamily: 'inherit',
                            }}
                        >
                            & CREATOR
                        </h2>
                    </motion.div>

                    {/* LAYER 2 (z-20): PORTRAIT IMAGE - Hides solid text beneath */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                        className="absolute right-[5%] bottom-0 z-20 w-[580px] h-[750px]"
                    >
                        <div className="relative w-full h-full">
                            {/* The cutout image with transparent background */}
                            <Image
                                src={personalInfo.avatar}
                                alt={personalInfo.name}
                                fill
                                className="object-contain object-bottom"
                                priority
                            />

                            {/* Bottom gradient fade to blend with background */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to top, rgb(247, 247, 247) 0%, rgba(247, 247, 247, 0.95) 25%, rgba(247, 247, 247, 0.6) 50%, transparent 100%)'
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* LAYER 3 (z-30): OUTLINE TEXT - Visible on top of image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="absolute left-[-8%] top-[28%] z-30 pointer-events-none select-none"
                    >
                        {/* CRITICAL: Must match Layer 1 exactly */}
                        <h2
                            className="font-black uppercase tracking-tighter"
                            style={{
                                fontSize: 'clamp(100px, 12vw, 140px)',
                                lineHeight: '0.9',
                                fontFamily: 'inherit',
                                WebkitTextStroke: '2px #f59f0b69',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 60px rgba(245, 158, 11, 0.2)',
                            }}
                        >
                            ENGINEER
                        </h2>
                        <h2
                            className="font-black uppercase tracking-tight ml-16 mt-2"
                            style={{
                                fontSize: 'clamp(80px, 10vw, 110px)',
                                lineHeight: '0.9',
                                fontFamily: 'inherit',
                                WebkitTextStroke: '1.5px #3741519d',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            & CREATOR
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
            </motion.div>
        </section>
    )
}