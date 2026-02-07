'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TechNetwork } from '@/components/ui/TechNetwork'

export function TechStackSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="py-24 lg:py-32"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-4">
                        // Neural Ecosystem
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-4">
                        Tech Stack
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl">
                        An interconnected ecosystem of tools that power my work. Explore the relationships between technologies.
                    </p>
                </motion.div>

                {/* Neural Network Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <TechNetwork />
                </motion.div>

                {/* Stats Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="text-neutral-500 text-sm font-mono">
                        20+ technologies — interconnected and evolving
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
