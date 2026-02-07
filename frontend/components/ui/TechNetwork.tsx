'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TechItem {
    name: string
    icon: string
    id: string
    position: { x: number; y: number }
}

interface Connection {
    from: string
    to: string[]
}

const TECH_ITEMS: TechItem[] = [
    { name: 'React', icon: 'react_light.svg', id: 'react', position: { x: 50, y: 30 } },
    { name: 'Next.js', icon: 'nextjs_icon_dark.svg', id: 'nextjs', position: { x: 20, y: 50 } },
    { name: 'JavaScript', icon: 'javascript.svg', id: 'javascript', position: { x: 80, y: 50 } },
    { name: 'Tailwind CSS', icon: 'tailwindcss.svg', id: 'tailwind', position: { x: 50, y: 70 } },
    { name: 'Node.js', icon: 'nodejs.svg', id: 'nodejs', position: { x: 10, y: 20 } },
    { name: 'Express', icon: 'expressjs.svg', id: 'express', position: { x: 15, y: 80 } },
    { name: 'MongoDB', icon: 'mongodb-icon-light.svg', id: 'mongodb', position: { x: 85, y: 75 } },
    { name: 'Docker', icon: 'docker.svg', id: 'docker', position: { x: 90, y: 20 } },
    { name: 'C++', icon: 'c-plusplus.svg', id: 'cpp', position: { x: 35, y: 10 } },
    { name: 'AWS', icon: 'aws_light.svg', id: 'aws', position: { x: 65, y: 85 } },
]

const CONNECTIONS: Connection[] = [
    { from: 'react', to: ['nextjs', 'javascript', 'tailwind'] },
    { from: 'nextjs', to: ['react', 'nodejs', 'javascript', 'tailwind'] },
    { from: 'nodejs', to: ['nextjs', 'express', 'mongodb', 'docker'] },
    { from: 'express', to: ['nodejs', 'mongodb'] },
    { from: 'javascript', to: ['react', 'nextjs', 'nodejs'] },
    { from: 'tailwind', to: ['react', 'nextjs'] },
    { from: 'docker', to: ['nodejs', 'express', 'aws'] },
    { from: 'aws', to: ['docker', 'mongodb'] },
    { from: 'mongodb', to: ['nodejs', 'express', 'aws'] },
    { from: 'cpp', to: ['aws'] },
]

function AnimatedLine({
    x1,
    y1,
    x2,
    y2,
    isActive,
}: {
    x1: number
    y1: number
    x2: number
    y2: number
    isActive: boolean
}) {
    return (
        <motion.line
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
                isActive
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
            }
            transition={{
                pathLength: { duration: 0.6, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
            }}
            vectorEffect="non-scaling-stroke"
        />
    )
}

function TechNode({
    item,
    isHovered,
    hoveredId,
    isConnected,
    onHover,
}: {
    item: TechItem
    isHovered: boolean
    hoveredId: string | null
    isConnected: boolean
    onHover: (id: string | null) => void
}) {
    const isInactive = hoveredId && !isHovered && !isConnected

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transform: 'translate(-50%, -50%)',
            }}
            onHoverStart={() => onHover(item.id)}
            onHoverEnd={() => onHover(null)}
        >
            {/* Glow effect */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl"
                    style={{
                        width: '120px',
                        height: '120px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            <motion.div
                className={`
                    relative w-20 h-20 rounded-2xl
                    bg-white border border-neutral-200
                    flex items-center justify-center
                    cursor-pointer transition-all duration-300
                    ${isHovered
                        ? 'shadow-xl shadow-primary-500/30 border-primary-400'
                        : isInactive
                            ? 'opacity-20 shadow-sm'
                            : 'shadow-soft hover:shadow-lg'
                    }
                `}
                animate={{
                    scale: isHovered ? 1.3 : isInactive ? 0.8 : 1,
                    y: isHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative w-10 h-10">
                    <Image
                        src={`/assets/tech/${item.icon}`}
                        alt={item.name}
                        fill
                        className={`object-contain transition-opacity duration-300 ${isHovered ? 'brightness-110' : ''
                            }`}
                    />
                </div>
            </motion.div>

            {/* Label */}
            <motion.div
                className="absolute top-full mt-3 whitespace-nowrap"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
                initial={{ opacity: 0, y: -5 }}
                animate={{
                    opacity: isInactive ? 0.3 : 1,
                    y: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <p className={`text-xs font-medium ${isHovered ? 'text-primary-600' : 'text-neutral-600'}`}>
                    {item.name}
                </p>
            </motion.div>
        </motion.div>
    )
}

export function TechNetwork() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const containerRef = useRef<SVGSVGElement>(null)

    const getConnectedIds = (id: string): Set<string> => {
        const connected = new Set<string>()

        // Find connections from this node
        const fromConnections = CONNECTIONS.find((conn) => conn.from === id)
        if (fromConnections) {
            fromConnections.to.forEach((to) => connected.add(to))
        }

        // Find connections to this node
        CONNECTIONS.forEach((conn) => {
            if (conn.to.includes(id)) {
                connected.add(conn.from)
            }
        })

        return connected
    }

    const connectedIds = hoveredId ? getConnectedIds(hoveredId) : new Set()

    return (
        <div className="relative w-full bg-neutral-50 rounded-3xl border border-neutral-200 shadow-soft p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* SVG Background for connection lines */}
            <svg
                ref={containerRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.4" />
                    </linearGradient>
                </defs>

                {/* Render connection lines */}
                {hoveredId &&
                    CONNECTIONS.map((conn) => {
                        if (conn.from !== hoveredId) return null

                        return conn.to.map((toId) => {
                            const fromItem = TECH_ITEMS.find((item) => item.id === conn.from)!
                            const toItem = TECH_ITEMS.find((item) => item.id === toId)!

                            return (
                                <AnimatedLine
                                    key={`${conn.from}-${toId}`}
                                    x1={fromItem.position.x}
                                    y1={fromItem.position.y}
                                    x2={toItem.position.x}
                                    y2={toItem.position.y}
                                    isActive={!!hoveredId}
                                />
                            )
                        })
                    })}
            </svg>

            {/* Tech nodes container */}
            <div className="relative h-96 md:h-[500px] lg:h-[600px] w-full">
                {TECH_ITEMS.map((item) => (
                    <TechNode
                        key={item.id}
                        item={item}
                        isHovered={hoveredId === item.id}
                        hoveredId={hoveredId}
                        isConnected={connectedIds.has(item.id)}
                        onHover={setHoveredId}
                    />
                ))}
            </div>

            {/* Info text */}
            <motion.div
                className="absolute bottom-6 left-6 right-6 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <p className="text-xs md:text-sm text-neutral-500">
                    <span className="text-primary-600 font-medium">Tip:</span> Hover over any tool to see its connections
                </p>
            </motion.div>
        </div>
    )
}
