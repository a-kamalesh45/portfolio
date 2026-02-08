'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { resumeData } from '@/data/content'
import { ScrollTimelineItem } from '@/components/ui/ScrollTimelineItem'

export function ResumeSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Combine all timeline items and sort by date
    const allTimelineItems = [
        ...resumeData.experience,
        ...resumeData.education,
    ].sort((a, b) => {
        const getYear = (duration: string) => {
            const parts = duration.split('-').map(p => p.trim())
            const year = parts[parts.length - 1]
            if (year.toLowerCase() === 'present') return 9999
            return parseInt(year) || 0
        }
        return getYear(b.duration) - getYear(a.duration)
    })

    return (
        <section
            id="resume"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-white relative overflow-hidden"
        >
            {/* Background: Massive Low-Opacity Text */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute text-neutral-900 font-heading font-black opacity-5"
                    style={{
                        fontSize: 'clamp(12rem, 20vw, 24rem)',
                        lineHeight: '1',
                        left: '50%',
                        top: '40%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.03 } : {}}
                    transition={{ duration: 1 }}
                >
                    HISTORY
                </motion.div>
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-6">
                        // Career Timeline
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-neutral-900 mb-6">
                        Journey
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                        Scroll through my career timeline. Each milestone activates automatically as it enters your focus—revealing the full story behind every role.
                    </p>
                </motion.div>

                {/* Scroll-Narrative Timeline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-16 relative"
                >
                    {allTimelineItems.map((item, index) => (
                        <ScrollTimelineItem
                            key={`${item.title}-${item.organization}`}
                            item={item}
                            index={index}
                            totalItems={allTimelineItems.length}
                        />
                    ))}
                </motion.div>

                {/* Download Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-20 pt-12 border-t border-neutral-200"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                                Want the full story?
                            </h3>
                            <p className="text-neutral-600 text-base md:text-lg">
                                Download my complete resume as a PDF.
                            </p>
                        </div>
                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-mono font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
                        >
                            <svg
                                className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
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
                </motion.div>
            </div>
        </section>
    )
}
