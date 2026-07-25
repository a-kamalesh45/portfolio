'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { LivingBlueprint } from '@/components/ui/LivingBlueprint'

export function TechStackSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Define the CV-aligned skill zones
    const systemArchitecture = [
        {
            title: 'Languages',
            techs: [
                {
                    name: 'C',
                    icon: 'c-plusplus.svg',
                    connections: ['C++', 'Python'],
                    version: 'Systems',
                    latency: 'Low-level',
                    status: 'active'
                },
                {
                    name: 'C++',
                    icon: 'c-plusplus.svg',
                    connections: ['C', 'Python'],
                    version: 'Systems',
                    latency: 'Low-level',
                    status: 'active'
                },
                {
                    name: 'Python',
                    icon: 'python.svg',
                    connections: ['C', 'C++', 'JavaScript'],
                    version: 'Scripting',
                    latency: 'Data / General',
                    status: 'active'
                },
                {
                    name: 'JavaScript',
                    icon: 'javascript.svg',
                    connections: ['TypeScript', 'HTML', 'CSS'],
                    version: 'Language',
                    latency: 'Client + Server',
                    status: 'active'
                },
                {
                    name: 'TypeScript',
                    icon: 'javascript.svg',
                    connections: ['JavaScript', 'React.js'],
                    version: 'Typed JS',
                    latency: 'Application',
                    status: 'active'
                },
                {
                    name: 'HTML',
                    icon: 'html5.svg',
                    connections: ['CSS', 'JavaScript'],
                    version: 'Markup',
                    latency: 'Structure',
                    status: 'active'
                },
                {
                    name: 'CSS',
                    icon: 'css_old.svg',
                    connections: ['HTML', 'Tailwind CSS'],
                    version: 'Styling',
                    latency: 'Presentation',
                    status: 'active'
                },
            ]
        },
        {
            title: 'Frameworks & Libraries',
            techs: [
                {
                    name: 'React.js',
                    icon: 'react_light.svg',
                    connections: ['Next.js', 'Tailwind CSS'],
                    version: 'UI Library',
                    latency: 'Component-based',
                    status: 'active'
                },
                {
                    name: 'Next.js',
                    icon: 'nextjs_icon_dark.svg',
                    connections: ['React.js', 'Node.js'],
                    version: 'App Router',
                    latency: 'Full-stack',
                    status: 'active'
                },
                {
                    name: 'Node.js',
                    icon: 'nodejs.svg',
                    connections: ['Express.js', 'MongoDB', 'PostgreSQL'],
                    version: 'JS Runtime',
                    latency: 'Server-side',
                    status: 'active'
                },
                {
                    name: 'Express.js',
                    icon: 'expressjs.svg',
                    connections: ['Node.js', 'MongoDB', 'REST APIs'],
                    version: 'REST APIs',
                    latency: 'Routing',
                    status: 'active'
                },
                {
                    name: 'Socket.io',
                    icon: 'vscode.svg',
                    connections: ['WebSockets', 'Yjs'],
                    version: 'Realtime',
                    latency: 'Transport',
                    status: 'active'
                },
                {
                    name: 'Yjs',
                    icon: 'vscode.svg',
                    connections: ['Socket.io', 'JWT'],
                    version: 'CRDT Engine',
                    latency: 'Sync',
                    status: 'active'
                },
                {
                    name: 'Tailwind CSS',
                    icon: 'tailwindcss.svg',
                    connections: ['React.js', 'Next.js'],
                    version: 'Utility CSS',
                    latency: 'Styling',
                    status: 'active'
                },
                {
                    name: 'Material UI',
                    icon: 'vscode.svg',
                    connections: ['React.js', 'Node.js'],
                    version: 'Component System',
                    latency: 'UI',
                    status: 'active'
                },
                {
                    name: 'JWT',
                    icon: 'jwt.svg',
                    connections: ['Node.js', 'PostgreSQL'],
                    version: 'Auth',
                    latency: 'Session-free',
                    status: 'active'
                },
            ]
        },
        {
            title: 'Tools & Technologies',
            techs: [
                {
                    name: 'MongoDB',
                    icon: 'mongodb-icon-light.svg',
                    connections: ['Node.js', 'Express.js', 'REST APIs'],
                    version: 'NoSQL DB',
                    latency: 'Document store',
                    status: 'active'
                },
                {
                    name: 'PostgreSQL',
                    icon: 'vscode.svg',
                    connections: ['JWT', 'Yjs'],
                    version: 'SQL DB',
                    latency: 'Relational',
                    status: 'active'
                },
                {
                    name: 'Redis',
                    icon: 'redis.svg',
                    connections: ['Node.js', 'WebSockets'],
                    version: 'In-memory',
                    latency: 'Queues + Pub/Sub',
                    status: 'active'
                },
                {
                    name: 'Docker',
                    icon: 'docker.svg',
                    connections: ['AWS', 'Vercel'],
                    version: 'Containers',
                    latency: 'Deployment',
                    status: 'active'
                },
                {
                    name: 'Kafka',
                    icon: 'apache-kafka-light.svg',
                    connections: ['Node.js', 'Redis'],
                    version: 'Streaming',
                    latency: 'Event bus',
                    status: 'active'
                },
                {
                    name: 'AWS',
                    icon: 'aws_light.svg',
                    connections: ['Docker', 'Vercel'],
                    version: 'Cloud',
                    latency: 'Infrastructure',
                    status: 'active'
                },
                {
                    name: 'Git/GitHub',
                    icon: 'github_light.svg',
                    connections: ['Docker', 'Vercel'],
                    version: 'Version Control',
                    latency: 'Source',
                    status: 'active'
                },
                {
                    name: 'Postman',
                    icon: 'vscode.svg',
                    connections: ['REST APIs', 'WebSockets'],
                    version: 'API Testing',
                    latency: 'Validation',
                    status: 'active'
                },
                {
                    name: 'REST APIs',
                    icon: 'vscode.svg',
                    connections: ['Node.js', 'MongoDB'],
                    version: 'HTTP',
                    latency: 'Networking',
                    status: 'active'
                },
                {
                    name: 'WebSockets',
                    icon: 'vscode.svg',
                    connections: ['Socket.io', 'Redis'],
                    version: 'Realtime',
                    latency: 'Bidirectional',
                    status: 'active'
                },
                {
                    name: 'Vercel',
                    icon: 'vscode.svg',
                    connections: ['Next.js', 'Docker'],
                    version: 'Deployment',
                    latency: 'Hosting',
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
                        {`// CV-Aligned Skill Schematic`}
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                        Skill Map
                    </h2>
                    <p className="text-gray-600 text-base max-w-3xl mx-auto font-mono">
                        Exact skill categories and technologies from the CV. Hover over components to trace relationships between the listed tools.
                    </p>
                </motion.div>

                {/* Living Blueprint Component */}
                <LivingBlueprint zones={systemArchitecture} />
            </div>
        </section>
    )
}
