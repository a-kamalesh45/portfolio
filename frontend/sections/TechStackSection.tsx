'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { techStack } from '@/data/content'

export function TechStackSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Group technologies by category
    const categories = {
        frontend: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
        backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
        systems: ['C++', 'Python', 'Docker', 'AWS', 'Linux'],
    }

    const getCategoryTech = (categoryName: string) => {
        const names = categories[categoryName as keyof typeof categories] || []
        return techStack.filter(tech => names.includes(tech.name))
    }

    return (
        <section
            id="tech-stack"
            ref={sectionRef}
            className="py-24 lg:py-32 relative overflow-hidden"
        >
            {/* Large Faded Background Word - Visual Break */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute text-gray-900 font-heading font-black opacity-3"
                    style={{
                        fontSize: 'clamp(12rem, 25vw, 28rem)',
                        lineHeight: '1',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.03 } : {}}
                    transition={{ duration: 1 }}
                >
                    SYSTEMS
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
                    <div className="font-mono text-xs md:text-sm text-orange-600 tracking-widest uppercase mb-4">
                        // Technology Toolkit
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                        Tech Stack
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        A curated collection of tools and technologies that power my work across frontend, backend, and systems engineering.
                    </p>
                </motion.div>

                {/* Frontend Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16"
                >
                    <h3 className="text-sm md:text-base font-mono text-gray-500 uppercase tracking-widest mb-6">
                        Frontend
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {getCategoryTech('frontend').map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative aspect-square"
                            >
                                <div className="absolute inset-0 bg-white rounded-xl border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-orange-300 group-hover:shadow-lg group-hover:scale-105 overflow-hidden">
                                    <Image
                                        src={`/assets/tech/${tech.icon}`}
                                        alt={tech.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 md:w-14 md:h-14 group-hover:brightness-110 transition-all duration-300"
                                    />
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {tech.name}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Visual Divider - Subtle Horizontal Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent my-16 origin-left"
                />

                {/* Backend Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    <h3 className="text-sm md:text-base font-mono text-gray-500 uppercase tracking-widest mb-6">
                        Backend & Data
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {getCategoryTech('backend').map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                                className="group relative aspect-square"
                            >
                                <div className="absolute inset-0 bg-white rounded-xl border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-orange-300 group-hover:shadow-lg group-hover:scale-105 overflow-hidden">
                                    <Image
                                        src={`/assets/tech/${tech.icon}`}
                                        alt={tech.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 md:w-14 md:h-14 group-hover:brightness-110 transition-all duration-300"
                                    />
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {tech.name}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Visual Divider - Subtle Horizontal Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent my-16 origin-left"
                />

                {/* Systems & Infrastructure */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-8"
                >
                    <h3 className="text-sm md:text-base font-mono text-gray-500 uppercase tracking-widest mb-6">
                        Systems & Infrastructure
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {getCategoryTech('systems').map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                                className="group relative aspect-square"
                            >
                                <div className="absolute inset-0 bg-white rounded-xl border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-orange-300 group-hover:shadow-lg group-hover:scale-105 overflow-hidden">
                                    <Image
                                        src={`/assets/tech/${tech.icon}`}
                                        alt={tech.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 md:w-14 md:h-14 group-hover:brightness-110 transition-all duration-300"
                                    />
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {tech.name}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <p className="text-sm text-gray-500 font-mono">
                        {techStack.length} technologies — always learning and evolving
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
