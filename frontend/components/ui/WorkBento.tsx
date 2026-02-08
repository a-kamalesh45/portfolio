'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ProjectTerminalCard } from '@/components/ui/ProjectTerminalCard'
import { portfolioData } from '@/data/content'

export function WorkBento() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    // Add specs to each project
    const projectsWithSpecs = portfolioData.projects.map((project, index) => ({
        ...project,
        specs: {
            status: index % 2 === 0 ? 'DEPLOYED' : 'ACTIVE',
            latency: `${12 + index * 3}ms`,
            scale: index < 3 ? 'High' : 'Medium',
            performance: `${99.9 - index * 0.1}%`,
        },
    }))

    return (
        <section id="portfolio" ref={sectionRef} className="py-24 lg:py-32 bg-neutral-100 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(249, 115, 22, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(249, 115, 22, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Background Text */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute text-gray-900 font-heading font-black opacity-3"
                    style={{
                        fontSize: 'clamp(12rem, 20vw, 24rem)',
                        lineHeight: '1',
                        left: '50%',
                        top: '30%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.02 } : {}}
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
                    <div className="font-mono text-xs md:text-sm text-orange-600 tracking-widest uppercase mb-6">
                        // Engineering Archives
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                        Work
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                        A collection of high-impact projects spanning full-stack web, systems engineering, and creative technology.
                        <span className="block mt-2 text-orange-600 font-mono text-sm">
                            Hover over any project to inspect technical specs.
                        </span>
                    </p>
                </motion.div>

                {/* Uniform Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {projectsWithSpecs.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="h-[400px] md:h-[450px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: index * 0.08,
                                duration: 0.5,
                            }}
                        >
                            <ProjectTerminalCard
                                id={project.id}
                                title={project.title}
                                category={project.category}
                                description={project.description}
                                image={project.image}
                                specs={project.specs}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Stats */}
                <motion.div
                    className="mt-20 pt-12 border-t border-gray-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-center">
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                                {projectsWithSpecs.length}
                            </p>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">
                                Total Projects
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                                500+
                            </p>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">
                                Commits
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                                99.9%
                            </p>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">
                                Uptime
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                &lt;20ms
                            </p>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">
                                Avg Latency
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
