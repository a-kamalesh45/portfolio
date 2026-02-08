'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface ProjectTerminalCardProps {
    id: number
    title: string
    category: string
    description: string
    image: string
    specs?: {
        status: string
        latency: string
        scale: string
        performance: string
    }
}

export function ProjectTerminalCard({
    title,
    category,
    description,
    image,
    specs
}: ProjectTerminalCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* LAYER 2: The Core (Terminal View) - Bottom Layer */}
            <div className="absolute inset-0 bg-neutral-950 p-6 md:p-8 flex flex-col">
                {/* Terminal Header */}
                <div className="mb-6 pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-neutral-500 font-mono">
                            root@project:~#
                        </span>
                    </div>
                    <p className="font-mono text-xs md:text-sm text-emerald-400">
                        ./status --verbose
                    </p>
                </div>

                {/* System Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-xs md:text-sm">
                    <div>
                        <span className="text-neutral-600">STATUS:</span>
                        <span className="ml-2 text-emerald-400 font-semibold">
                            {specs?.status || 'DEPLOYED'}
                        </span>
                    </div>
                    <div>
                        <span className="text-neutral-600">LATENCY:</span>
                        <span className="ml-2 text-green-400 font-semibold">
                            {specs?.latency || '<20ms'}
                        </span>
                    </div>
                    <div>
                        <span className="text-neutral-600">SCALE:</span>
                        <span className="ml-2 text-orange-400 font-semibold">
                            {specs?.scale || 'High'}
                        </span>
                    </div>
                    <div>
                        <span className="text-neutral-600">UPTIME:</span>
                        <span className="ml-2 text-blue-400 font-semibold">
                            {specs?.performance || '99.9%'}
                        </span>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded text-xs font-mono text-primary-400 uppercase">
                        {category}
                    </span>
                </div>

                {/* Technical Description */}
                <div className="flex-1 overflow-hidden">
                    <p className="font-mono text-xs md:text-sm text-neutral-400 leading-relaxed mb-4">
                        <span className="text-neutral-600">//</span> Technical Overview
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Footer Commands */}
                <div className="mt-4 pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3 font-mono text-xs text-neutral-600">
                        <span className="text-emerald-500">$</span>
                        <span>npm run deploy</span>
                        <span className="ml-auto text-emerald-500">✓</span>
                    </div>
                </div>
            </div>

            {/* LAYER 1: The Cover (Image + Title) - Top Layer */}
            <motion.div
                className="absolute inset-0 bg-neutral-900 z-10"
                animate={{
                    y: isHovered ? '-100%' : '0%',
                }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Custom easing for smooth blast door effect
                }}
            >
                {/* Project Image */}
                <div className="relative h-full w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            {title}
                        </h3>
                        <p className="font-mono text-xs md:text-sm text-neutral-400">
                            {category}
                        </p>
                    </div>

                    {/* Hover Indicator */}
                    <motion.div
                        className="absolute top-6 right-6 bg-neutral-950/80 backdrop-blur-sm rounded-lg px-3 py-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                            opacity: isHovered ? 0 : 1,
                            y: isHovered ? -10 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="font-mono text-xs text-emerald-400">
                            HOVER TO INSPECT
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
