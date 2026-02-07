'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ProjectSpecCard } from '@/components/ui/ProjectSpecCard'
import { portfolioData } from '@/data/content'

export function WorkBento() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    // Map portfolio data to bento layout specs
    const projectsWithSpans = portfolioData.projects.map((project, index) => {
        let span: 'normal' | 'wide' | 'tall' | 'hero' = 'normal'

        // Create visual hierarchy with specific spans
        if (index === 0) span = 'hero' // First project is the hero (2x2)
        else if (index === 3) span = 'wide' // Fourth project is wide (2x1)
        else if (index === 5) span = 'tall' // Last project is tall (1x2)

        return {
            ...project,
            span,
            specs: {
                status: index % 2 === 0 ? 'Deployed' : 'In Progress',
                latency: `<${20 + index * 5}ms`,
                scale: 'High',
                performance: `${99 - index}%`,
            },
            codeSnippet: `// ${project.title.toUpperCase()}\nconst project = {\n  id: ${project.id},\n  status: "active",\n  impact: "high"\n};`,
        }
    })

    return (
        <section id="portfolio" ref={sectionRef} className="py-24 lg:py-32 bg-neutral-100">
            <div className="max-w-full mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-4">
                        // Engineering Archives
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-6">
                        Work
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed">
                        A collection of high-impact projects spanning full-stack web, systems engineering, and creative technology.
                        Hover over any project to see the architectural specs.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] sm:auto-rows-[350px] lg:auto-rows-[400px] gap-4 md:gap-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {projectsWithSpans.map((project, index) => {
                        const spanClasses = {
                            normal: 'col-span-1 row-span-1',
                            wide: 'col-span-1 sm:col-span-2 row-span-1',
                            tall: 'col-span-1 row-span-1 sm:row-span-2',
                            hero: 'col-span-1 sm:col-span-2 row-span-2',
                        }

                        return (
                            <motion.div
                                key={project.id}
                                className={spanClasses[project.span as keyof typeof spanClasses]}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.5,
                                }}
                            >
                                <ProjectSpecCard
                                    id={project.id}
                                    title={project.title}
                                    category={project.category}
                                    description={project.description}
                                    image={project.image}
                                    specs={project.specs}
                                    codeSnippet={project.codeSnippet}
                                />
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-neutral-500 font-mono text-sm">
                        {projectsWithSpans.length} projects — {Math.floor(Math.random() * 1000) + 500}+ commits — infinite growth
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
