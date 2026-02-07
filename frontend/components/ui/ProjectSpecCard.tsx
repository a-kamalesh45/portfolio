'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ProjectSpecCardProps {
    id: number
    title: string
    category: string
    description: string
    image: string
    specs?: {
        latency?: string
        status?: string
        scale?: string
        performance?: string
    }
    codeSnippet?: string
}

export function ProjectSpecCard({
    id,
    title,
    category,
    description,
    image,
    specs = {
        status: 'Deployed',
        latency: '<20ms',
        scale: 'High',
        performance: '99.9%',
    },
    codeSnippet = `const project${id} = {\n  name: "${title}",\n  status: "live",\n  performance: "optimized"\n};`,
}: ProjectSpecCardProps) {
    const [isRevealed, setIsRevealed] = useState(false)

    return (
        <motion.div
            className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white group h-full"
            onHoverStart={() => setIsRevealed(true)}
            onHoverEnd={() => setIsRevealed(false)}
            whileHover={{ borderColor: 'rgb(251, 191, 36)', boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)' }}
            transition={{ duration: 0.3 }}
        >
            {/* Main Image Container */}
            <motion.div className="relative w-full h-full bg-neutral-900 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Image Overlay on Hover */}
                <motion.div
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isRevealed ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Slide-up Reveal Effect - Wireframe/Code */}
                <motion.div
                    className="absolute inset-0 bg-neutral-900 border-t-4 border-primary-500 flex flex-col justify-between p-6 md:p-8 overflow-hidden"
                    initial={{ y: '100%' }}
                    animate={{ y: isRevealed ? 0 : '100%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    {/* Code Snippet Display */}
                    <div className="flex-1 overflow-auto">
                        <pre className="font-mono text-xs md:text-sm text-emerald-400 whitespace-pre-wrap break-words">
                            {codeSnippet}
                        </pre>
                    </div>

                    {/* System Stats */}
                    <div className="border-t border-neutral-700 pt-4 mt-4">
                        <p className="font-mono text-xs text-neutral-500 mb-3">SYSTEM_SPECS</p>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="text-neutral-600 text-xs">{key}:</span>
                                    <span className="text-emerald-400 font-mono text-xs font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Card Info Overlay - Visible in Default State */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 md:p-8 flex flex-col justify-end pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: isRevealed ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Category Badge */}
                <div className="mb-4">
                    <span className="inline-block font-mono text-xs tracking-wider text-primary-500 font-semibold px-3 py-1 border border-primary-500/30 rounded-full">
                        {category}
                    </span>
                </div>

                {/* Title & Description */}
                <div>
                    <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Hover Indicator */}
                <motion.div
                    className="absolute top-4 right-4 font-mono text-xs text-neutral-500"
                    animate={{ opacity: isRevealed ? 0 : 0.7 }}
                    transition={{ duration: 0.3 }}
                >
                    hover_to_reveal()
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
