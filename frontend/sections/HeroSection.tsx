'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'
import { personalInfo } from '@/data/content'
import { useState, useEffect } from 'react'

// --- CONSTANTS & ASSETS ---

const socialIcons = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.social.twitter, label: 'Twitter' },
]

const BLOB_PATH = "M65.4,-37.9C79.2,-13.9,81,17,68.1,38C55.2,59.1,27.6,70.5,1.5,69.6C-24.6,68.8,-49.3,55.7,-56,38.2C-62.6,20.7,-51.3,-1.2,-39,-24.4C-26.7,-47.6,-13.3,-72,6.2,-75.6C25.8,-79.2,51.6,-62,65.4,-37.9Z"

const TYPEWRITER_ROLES = [
    "Full-Stack Engineer",
    "Creative Technologist"
]

// --- HOOKS ---

function useTypewriter(words: string[], typingSpeed: number = 50, deletingSpeed: number = 30, pauseTime: number = 2000) {
    const [displayedText, setDisplayedText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentWord = words[wordIndex]
        let timeout: NodeJS.Timeout

        if (!isDeleting && displayedText === currentWord) {
            // Pause before deleting
            timeout = setTimeout(() => {
                setIsDeleting(true)
            }, pauseTime)
        } else if (isDeleting && displayedText === '') {
            // Move to next word
            setWordIndex((prev) => (prev + 1) % words.length)
            setIsDeleting(false)
        } else {
            // Typing or deleting
            const speed = isDeleting ? deletingSpeed : typingSpeed
            timeout = setTimeout(() => {
                if (isDeleting) {
                    setDisplayedText((prev) => prev.slice(0, -1))
                } else {
                    setDisplayedText((prev) => currentWord.slice(0, prev.length + 1))
                }
            }, speed)
        }

        return () => clearTimeout(timeout)
    }, [displayedText, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime])

    return displayedText
}

// --- COMPONENT ---

export function HeroSection() {
    const typewriterText = useTypewriter(TYPEWRITER_ROLES, 50, 30, 2000)

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
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
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/40 backdrop-blur-[10px] border border-white/20 shadow-sm transition-all duration-300 hover:bg-white/60"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgb(34,197,94)]" />
                        <span className="text-sm font-medium text-gray-600">Available for opportunities</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-2">
                        I&apos;M <br />
                        <span className="text-gray-900">Kamalesh</span> <span className="text-gray-500">Acharya</span>
                    </h1>

                    <div className="h-8 mt-4 mb-6">
                        <p className="text-xl md:text-2xl font-medium text-gray-600">
                            {typewriterText}
                            <span className="inline-block w-[2px] h-6 bg-amber-500 ml-1 animate-blink align-middle" />
                        </p>
                    </div>

                    <p className="text-lg text-gray-500 max-w-md leading-relaxed mb-10">
                        I build robust systems and craft elegant digital experiences. From high-frequency
                        trading platforms to modern web applications — engineering meets creativity.
                    </p>

                    <div className="flex flex-wrap items-center gap-5">
                        <button
                            onClick={scrollToAbout}
                            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Discover More <ArrowDown size={18} />
                        </button>
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                        >
                            Let&apos;s Talk
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Find me on</span>
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
                                        className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
                                    >
                                        <Icon size={20} />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
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