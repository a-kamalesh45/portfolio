'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { LivingBlueprint } from '@/components/ui/LivingBlueprint'

export function TechStackSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Define the system architecture zones
    const systemArchitecture = [
        {
            title: 'Frontend',
            techs: [
                {
                    name: 'React',
                    icon: 'react_light.svg',
                    connections: ['Node.js', 'Next.js'],
                    version: 'UI Library',
                    latency: 'Component-based',
                    status: 'active'
                },
                {
                    name: 'Next.js',
                    icon: 'nextjs_icon_dark.svg',
                    connections: ['Node.js', 'React'],
                    version: 'SSR / SSG',
                    latency: 'Full-stack',
                    status: 'active'
                },
                {
                    name: 'Tailwind CSS',
                    icon: 'tailwindcss.svg',
                    connections: ['React', 'Next.js'],
                    version: 'Utility CSS',
                    latency: 'Styling',
                    status: 'active'
                },
            ]
        },
        {
            title: 'Backend',
            techs: [
                {
                    name: 'Node.js',
                    icon: 'nodejs.svg',
                    connections: ['React', 'MongoDB', 'Express'],
                    version: 'JS Runtime',
                    latency: 'Server-side',
                    status: 'active'
                },
                {
                    name: 'Express',
                    icon: 'expressjs.svg',
                    connections: ['Node.js', 'MongoDB'],
                    version: 'REST APIs',
                    latency: 'Routing',
                    status: 'active'
                },
                {
                    name: 'C++',
                    icon: 'c-plusplus.svg',
                    connections: ['Python'],
                    version: 'Systems',
                    latency: 'Low-level',
                    status: 'active'
                },
                {
                    name: 'Python',
                    icon: 'python.svg',
                    connections: ['MongoDB', 'C++'],
                    version: 'Scripting',
                    latency: 'Data / General',
                    status: 'active'
                },
            ]
        },
        {
            title: 'Data & Tools',
            techs: [
                {
                    name: 'MongoDB',
                    icon: 'mongodb-icon-light.svg',
                    connections: ['Node.js', 'Express'],
                    version: 'NoSQL DB',
                    latency: 'Document store',
                    status: 'active'
                },
                {
                    name: 'Git',
                    icon: 'git.svg',
                    connections: ['GitHub'],
                    version: 'Version Control',
                    latency: 'Source',
                    status: 'active'
                },
                {
                    name: 'GitHub',
                    icon: 'github_light.svg',
                    connections: ['Git'],
                    version: 'Code Hosting',
                    latency: 'Collaboration',
                    status: 'active'
                },
                {
                    name: 'VS Code',
                    icon: 'vscode.svg',
                    connections: ['Git'],
                    version: 'IDE',
                    latency: 'Editor',
                    status: 'active'
                },
            ]
        }
    ]

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
                    className="mb-12 text-center"
                >
                    <div className="font-mono text-xs md:text-sm text-orange-600 tracking-widest uppercase mb-4">
                        {`// Holographic System Schematic`}
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                        Architecture Map
                    </h2>
                    <p className="text-gray-600 text-base max-w-3xl mx-auto font-mono">
                        Real-time diagnostics of the technology pipeline. Hover over components to trace signal flow through the system.
                    </p>
                </motion.div>

                {/* Living Blueprint Component */}
                <LivingBlueprint zones={systemArchitecture} />
            </div>
        </section>
    )
}
