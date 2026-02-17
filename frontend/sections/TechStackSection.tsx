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
                    version: 'v18.2.0',
                    latency: '~2ms',
                    status: 'idle'
                },
                {
                    name: 'Next.js',
                    icon: 'nextjs_icon_dark.svg',
                    connections: ['Node.js', 'React'],
                    version: 'v14.0.1',
                    latency: '~3ms',
                    status: 'idle'
                },
                {
                    name: 'Tailwind CSS',
                    icon: 'tailwindcss.svg',
                    connections: ['React', 'Next.js'],
                    version: 'v3.4.0',
                    latency: '<1ms',
                    status: 'ready'
                },
            ]
        },
        {
            title: 'Backend',
            techs: [
                {
                    name: 'Node.js',
                    icon: 'nodejs.svg',
                    connections: ['React', 'MongoDB', 'Redis', 'Express'],
                    version: 'v20.10.0',
                    latency: '~5ms',
                    status: 'idle'
                },
                {
                    name: 'Express',
                    icon: 'expressjs.svg',
                    connections: ['Node.js', 'MongoDB'],
                    version: 'v4.18.2',
                    latency: '~4ms',
                    status: 'idle'
                },
                {
                    name: 'C++',
                    icon: 'c-plusplus.svg',
                    connections: ['Redis', 'Docker', 'Python'],
                    version: 'C++20',
                    latency: '<1ms',
                    status: 'ready'
                },
                {
                    name: 'Python',
                    icon: 'python.svg',
                    connections: ['MongoDB', 'AWS', 'C++'],
                    version: 'v3.11.5',
                    latency: '~8ms',
                    status: 'idle'
                },
            ]
        },
        {
            title: 'Infrastructure',
            techs: [
                {
                    name: 'Docker',
                    icon: 'docker.svg',
                    connections: ['Node.js', 'C++', 'AWS'],
                    version: 'v24.0.7',
                    latency: '~12ms',
                    status: 'idle'
                },
                {
                    name: 'AWS',
                    icon: 'aws_light.svg',
                    connections: ['Docker', 'MongoDB', 'Python'],
                    version: 'SDK v3',
                    latency: '~15ms',
                    status: 'online'
                },
                {
                    name: 'Redis',
                    icon: 'redis.svg',
                    connections: ['Node.js', 'C++'],
                    version: 'v7.2.3',
                    latency: '~1ms',
                    status: 'cached'
                },
                {
                    name: 'MongoDB',
                    icon: 'mongodb-icon-light.svg',
                    connections: ['Node.js', 'Python', 'Express'],
                    version: 'v7.0.4',
                    latency: '~6ms',
                    status: 'idle'
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
                        // Holographic System Schematic
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
