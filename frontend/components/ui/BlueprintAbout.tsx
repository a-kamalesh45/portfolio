'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { aboutMe } from '@/data/content'

function CountUpStat({
    value,
    suffix,
    label,
    index,
}: {
    value: number
    suffix: string
    label: string
    index: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <motion.div ref={ref} className="relative">
            {/* Top-left corner bracket */}
            <motion.svg
                className="absolute -top-4 -left-4 w-6 h-6 text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
            >
                <path d="M3 3h6M3 3v6" />
            </motion.svg>

            {/* Bottom-right corner bracket */}
            <motion.svg
                className="absolute -bottom-4 -right-4 w-6 h-6 text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.1 }}
            >
                <path d="M21 21h-6M21 21v-6" />
            </motion.svg>

            <motion.div
                className="pl-6 pt-4 pb-6 pr-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
            >
                {/* Monospace Label */}
                <div className="font-mono text-xs text-primary-600 mb-2 tracking-wider">
                    [{String(index + 1).padStart(2, '0')}]
                </div>

                {/* Counting Number */}
                <div className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-none mb-3">
                    {isInView ? (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {value}
                        </motion.span>
                    ) : (
                        '0'
                    )}
                    <span className="text-primary-500 ml-1">{suffix}</span>
                </div>

                {/* Label */}
                <div className="font-mono text-xs md:text-sm text-neutral-600 tracking-wider">
                    {label.toUpperCase()}
                </div>
            </motion.div>
        </motion.div>
    )
}

export function BlueprintAbout() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 lg:py-32 relative bg-neutral-100"
        >
            {/* Background: Massive Low-Opacity Text */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute text-neutral-900 font-heading font-black opacity-5"
                    style={{
                        fontSize: 'clamp(10rem, 20vw, 22rem)',
                        lineHeight: '1',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.05 } : {}}
                    transition={{ duration: 1 }}
                >
                    ENGINEER
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-4">
                        // Get to Know Me
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900">
                        {aboutMe.title}
                    </h2>
                </motion.div>

                {/* Main Layout: Bio + Stats */}
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
                    {/* LEFT: Bio Section */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="relative">
                            {/* Corner brackets */}
                            <motion.svg
                                className="absolute -top-6 -left-6 w-8 h-8 text-primary-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.2 }}
                            >
                                <path d="M3 3h8M3 3v8" />
                            </motion.svg>

                            <motion.svg
                                className="absolute -bottom-6 -right-6 w-8 h-8 text-primary-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.3 }}
                            >
                                <path d="M21 21h-8M21 21v-8" />
                            </motion.svg>

                            <div className="pl-8 pt-6 pb-6 pr-6">
                                <div className="font-mono text-xs text-primary-600 mb-6 tracking-wider">
                                    [COORDINATES: 24.11°N • ROLE: SENIOR_ENGINEER]
                                </div>

                                <div className="space-y-6 text-neutral-700 leading-relaxed">
                                    {aboutMe.bio.split('\n\n').map((paragraph, index) => (
                                        <motion.p
                                            key={index}
                                            className="text-base md:text-lg"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{
                                                delay: 0.2 + index * 0.1,
                                                duration: 0.5,
                                            }}
                                        >
                                            {paragraph.trim()}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Stats - HUD Style */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative bg-white/50 backdrop-blur-sm border border-neutral-200/50 rounded-2xl p-8 space-y-8">
                            {/* Background pattern */}
                            <div className="absolute inset-0 rounded-2xl opacity-5 pointer-events-none" />

                            {aboutMe.stats.map((stat, index) => (
                                <CountUpStat
                                    key={stat.label}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    label={stat.label}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* What I Do Grid */}
                <motion.div
                    className="mt-24 lg:mt-32"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-12">
                        // What I Do
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {aboutMe.skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="group relative bg-white/60 backdrop-blur-sm border border-neutral-200/50 rounded-xl p-6 hover:bg-white/80 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                whileHover={{ y: -4, borderColor: 'rgb(251, 191, 36)' }}
                            >
                                <div className="font-mono text-xs text-primary-600 mb-3 tracking-wider">
                                    [{String(index + 1).padStart(2, '0')}]
                                </div>
                                <h4 className="font-heading font-semibold text-base md:text-lg text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                                    {skill.name}
                                </h4>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {skill.description}
                                </p>
                                <div className="absolute top-0 left-0 w-1 h-0 bg-primary-500 group-hover:h-8 transition-all duration-300 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
