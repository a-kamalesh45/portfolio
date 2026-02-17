'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Tech {
    name: string
    icon: string
    connections?: string[]
    version?: string
    latency?: string
    status?: string
}

interface StackZone {
    title: string
    techs: Tech[]
}

interface LivingBlueprintProps {
    zones: StackZone[]
}

interface NodePosition {
    x: number
    y: number
    width: number
    height: number
}

export function LivingBlueprint({ zones }: LivingBlueprintProps) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [nodePositions, setNodePositions] = useState<Record<string, NodePosition>>({})
    const containerRef = useRef<HTMLDivElement>(null)

    // Update node positions for connection drawing
    useEffect(() => {
        if (!containerRef.current) return

        const updatePositions = () => {
            const positions: Record<string, NodePosition> = {}
            const elements = containerRef.current?.querySelectorAll('[data-node-name]')

            elements?.forEach((el) => {
                const name = el.getAttribute('data-node-name')
                if (name) {
                    const rect = el.getBoundingClientRect()
                    const containerRect = containerRef.current?.getBoundingClientRect()
                    if (containerRect) {
                        positions[name] = {
                            x: rect.left - containerRect.left + rect.width / 2,
                            y: rect.top - containerRect.top + rect.height / 2,
                            width: rect.width,
                            height: rect.height
                        }
                    }
                }
            })

            setNodePositions(positions)
        }

        updatePositions()
        window.addEventListener('resize', updatePositions)
        setTimeout(updatePositions, 100) // Ensure positions are captured after render

        return () => window.removeEventListener('resize', updatePositions)
    }, [zones])

    // Get all connections for the hovered node
    const getActiveConnections = (nodeName: string | null): Set<string> => {
        if (!nodeName) return new Set()

        const connections = new Set<string>()

        // Find the node and its direct connections
        zones.forEach(zone => {
            zone.techs.forEach(tech => {
                if (tech.name === nodeName) {
                    tech.connections?.forEach(conn => connections.add(conn))
                }
                if (tech.connections?.includes(nodeName)) {
                    connections.add(tech.name)
                }
            })
        })

        return connections
    }

    const activeConnections = getActiveConnections(hoveredNode)

    // Generate all connections
    const allConnections: Array<{ from: string, to: string }> = []
    zones.forEach(zone => {
        zone.techs.forEach(tech => {
            tech.connections?.forEach(targetName => {
                allConnections.push({ from: tech.name, to: targetName })
            })
        })
    })

    // Check if a connection is active
    const isConnectionActive = (from: string, to: string): boolean => {
        if (!hoveredNode) return false
        return (from === hoveredNode && activeConnections.has(to)) ||
            (to === hoveredNode && activeConnections.has(from))
    }

    return (
        <div className="relative w-full py-16">
            {/* CAD-Style Grid Background with Ruler Markings */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle, #9CA3AF 0.5px, transparent 0.5px)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0'
                    }}
                />

                {/* Top Ruler */}
                <div className="absolute top-0 left-0 right-0 h-6 border-b border-gray-300 bg-white/50 backdrop-blur-sm">
                    <div className="flex h-full items-end justify-around font-mono text-[8px] text-gray-400 px-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-px h-2 bg-gray-300" />
                                <span>{i * 50}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Left Ruler */}
                <div className="absolute top-0 left-0 bottom-0 w-6 border-r border-gray-300 bg-white/50 backdrop-blur-sm">
                    <div className="flex flex-col h-full justify-around items-end font-mono text-[8px] text-gray-400 py-4 pr-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-0.5">
                                <span>{i * 50}</span>
                                <div className="h-px w-2 bg-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div
                ref={containerRef}
                className="relative min-h-[600px] ml-6 mt-6"
            >
                {/* SVG Layer for Connections */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                >
                    <defs>
                        {/* Gradient for packet animation */}
                        <linearGradient id="packetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                            <stop offset="50%" stopColor="#F59E0B" stopOpacity="1" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {allConnections.map((conn, idx) => {
                        const fromPos = nodePositions[conn.from]
                        const toPos = nodePositions[conn.to]

                        if (!fromPos || !toPos) return null

                        const isActive = isConnectionActive(conn.from, conn.to)
                        const isRelated = hoveredNode && (
                            activeConnections.has(conn.from) ||
                            activeConnections.has(conn.to) ||
                            conn.from === hoveredNode ||
                            conn.to === hoveredNode
                        )
                        const shouldDim = hoveredNode && !isActive && !isRelated

                        // Calculate Bezier curve control points
                        const startX = fromPos.x + fromPos.width / 2
                        const startY = fromPos.y
                        const endX = toPos.x - toPos.width / 2
                        const endY = toPos.y

                        const dx = endX - startX
                        const controlPoint1X = startX + dx * 0.4
                        const controlPoint2X = endX - dx * 0.4

                        const pathD = `M ${startX} ${startY} C ${controlPoint1X} ${startY}, ${controlPoint2X} ${endY}, ${endX} ${endY}`

                        return (
                            <g key={`${conn.from}-${conn.to}-${idx}`}>
                                {/* Base Path */}
                                <motion.path
                                    d={pathD}
                                    fill="none"
                                    stroke={isActive ? '#F59E0B' : '#D1D5DB'}
                                    strokeWidth={isActive ? 2 : 1}
                                    opacity={shouldDim ? 0.2 : 1}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, delay: idx * 0.02 }}
                                />

                                {/* Animated Packet/Dot */}
                                <motion.circle
                                    r="3"
                                    fill="#F59E0B"
                                    opacity={shouldDim ? 0 : 0.8}
                                    filter="blur(0.5px)"
                                >
                                    <animateMotion
                                        dur={isActive ? "1.5s" : "3s"}
                                        repeatCount="indefinite"
                                        path={pathD}
                                    />
                                </motion.circle>

                                {/* Arrow Head */}
                                <motion.circle
                                    cx={endX}
                                    cy={endY}
                                    r="2"
                                    fill={isActive ? '#F59E0B' : '#9CA3AF'}
                                    opacity={shouldDim ? 0.2 : 1}
                                />
                            </g>
                        )
                    })}
                </svg>

                {/* Nodes Grid Layout */}
                <div className="relative grid grid-cols-3 gap-16 lg:gap-24 px-12" style={{ zIndex: 2 }}>
                    {zones.map((zone, zoneIndex) => (
                        <div key={zone.title} className="relative flex flex-col">
                            {/* Zone Header */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: zoneIndex * 0.05 }}
                                className="mb-8 pb-2 border-b border-gray-300"
                            >
                                <div className="font-mono text-[10px] text-orange-500 uppercase tracking-wider mb-1">
                                    ZONE_{String.fromCharCode(65 + zoneIndex)}
                                </div>
                                <h3 className="font-mono text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    {zone.title}
                                </h3>
                            </motion.div>

                            {/* Tech Nodes */}
                            <div className="flex flex-col gap-6">
                                {zone.techs.map((tech, techIndex) => {
                                    const isHovered = hoveredNode === tech.name
                                    const isConnected = activeConnections.has(tech.name)
                                    const isDimmed = hoveredNode && !isHovered && !isConnected

                                    return (
                                        <motion.div
                                            key={tech.name}
                                            data-node-name={tech.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{
                                                opacity: isDimmed ? 0.3 : 1,
                                                x: 0,
                                                scale: isHovered ? 1.02 : 1
                                            }}
                                            transition={{
                                                opacity: { duration: 0.2 },
                                                x: { delay: zoneIndex * 0.05 + techIndex * 0.03 },
                                                scale: { duration: 0.2 }
                                            }}
                                            onHoverStart={() => setHoveredNode(tech.name)}
                                            onHoverEnd={() => setHoveredNode(null)}
                                            className="relative group cursor-pointer"
                                        >
                                            {/* Technical Component Card */}
                                            <div className={`
                                                relative bg-white border transition-all duration-200
                                                px-3 py-2.5
                                                ${isHovered
                                                    ? 'border-orange-500 shadow-lg'
                                                    : isConnected
                                                        ? 'border-orange-300'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }
                                            `}>
                                                {/* Corner Brackets */}
                                                <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-200 ${isHovered ? 'border-orange-500' : 'border-gray-400'
                                                    }`} />
                                                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-200 ${isHovered ? 'border-orange-500' : 'border-gray-400'
                                                    }`} />

                                                <div className="flex items-start gap-3">
                                                    {/* Icon */}
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        <Image
                                                            src={`/assets/tech/${tech.icon}`}
                                                            alt={tech.name}
                                                            width={28}
                                                            height={28}
                                                            className="w-7 h-7"
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-mono text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
                                                            {tech.name}
                                                        </div>

                                                        {/* Metadata */}
                                                        <div className="space-y-0.5 font-mono text-[9px] text-gray-500">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">ver:</span>
                                                                <span>{tech.version || 'latest'}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">lat:</span>
                                                                <span>{tech.latency || '~5ms'}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">sts:</span>
                                                                <span className={isHovered ? 'text-orange-500' : 'text-green-600'}>
                                                                    {isHovered ? 'active' : (tech.status || 'idle')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Status LED */}
                                                    <div className="flex-shrink-0">
                                                        <motion.div
                                                            className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-orange-500' : 'bg-green-500'
                                                                }`}
                                                            animate={{
                                                                opacity: [1, 0.4, 1],
                                                                scale: isHovered ? [1, 1.3, 1] : [1, 0.8, 1]
                                                            }}
                                                            transition={{
                                                                duration: isHovered ? 0.6 : 2,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Connection Points (visual only) */}
                                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technical Legend/HUD */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 px-6"
            >
                <div className="flex items-center gap-6 px-4 py-2 bg-white border border-gray-300 font-mono text-[10px] text-gray-600 uppercase">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>System Online</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-gray-400 relative">
                            <div className="absolute inset-0 w-2 h-0.5 bg-orange-500 animate-ping" />
                        </div>
                        <span>Data Flow</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500">Hover</span>
                        <span>→ Trace Signal</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
