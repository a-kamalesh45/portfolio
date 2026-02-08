'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface TimelineItemData {
    title: string
    organization: string
    duration: string
    description: string
    isCurrent?: boolean
}

interface ActiveTimelineItemProps {
    item: TimelineItemData
    index: number
}

export function ActiveTimelineItem({ item, index }: ActiveTimelineItemProps) {
    const [isHovered, setIsHovered] = useState(false)
    const isActive = item.isCurrent

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative flex gap-8 mb-16"
        >
            {/* Timeline Spine & Node */}
            <div className="flex flex-col items-center flex-shrink-0">
                {/* Node */}
                <motion.div
                    animate={{
                        scale: isHovered || isActive ? 1.3 : 1,
                        backgroundColor: isHovered || isActive ? '#f97316' : '#ffffff',
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-4 h-4 rounded-full border-2 z-10 ${isActive ? 'border-primary-600' : 'border-primary-500'
                        }`}
                    style={{
                        boxShadow: isHovered || isActive ? '0 0 20px rgba(249, 115, 22, 0.6)' : 'none',
                    }}
                />

                {/* Vertical Line */}
                {index < 5 && (
                    <div className="w-0.5 h-full bg-primary-500/30 mt-2" />
                )}
            </div>

            {/* Content Area */}
            <motion.div
                layout
                className="flex-1 pb-4 cursor-pointer"
                transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            >
                {/* STATE A: Clean Editorial Text (Not Hovered) */}
                {!isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Date as Comment */}
                        <p className="font-mono text-xs md:text-sm text-primary-600 mb-2">
                            // {item.duration}
                        </p>

                        {/* Role Title */}
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                            {item.title}
                        </h3>

                        {/* Company as Variable */}
                        <p className="font-mono text-sm md:text-base text-neutral-600 mb-4">
                            <span className="text-pink-500">const</span> company{' '}
                            <span className="text-primary-600">=</span>{' '}
                            <span className="text-emerald-600">&quot;{item.organization}&quot;</span>
                        </p>

                        {/* Description - Summary */}
                        <p className="text-neutral-700 text-sm md:text-base leading-relaxed max-w-2xl">
                            {item.description.length > 120
                                ? `${item.description.substring(0, 120)}...`
                                : item.description}
                        </p>
                    </motion.div>
                )}

                {/* STATE B: Dark Terminal Card (Hovered or Active) */}
                {isHovered && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-2xl p-6 md:p-8"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs text-neutral-500 font-mono ml-3">
                                {item.title.toLowerCase().replace(/\s+/g, '_')}.log
                            </span>
                        </div>

                        {/* Terminal Content */}
                        <div className="font-mono text-sm md:text-base space-y-4">
                            {/* Date */}
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-600 w-6">1</span>
                                <span className="text-primary-500">// {item.duration}</span>
                            </div>

                            {/* Role */}
                            <div className="flex items-start gap-2">
                                <span className="text-neutral-600 w-6">2</span>
                                <div>
                                    <span className="text-pink-400">function</span>{' '}
                                    <span className="text-emerald-400">
                                        {item.title.replace(/\s+/g, '')}
                                    </span>
                                    <span className="text-neutral-400">() {'{'}</span>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="flex items-start gap-2">
                                <span className="text-neutral-600 w-6">3</span>
                                <div className="ml-4">
                                    <span className="text-pink-400">const</span>
                                    <span className="text-neutral-400"> company </span>
                                    <span className="text-primary-500">=</span>
                                    <span className="text-emerald-400"> &quot;{item.organization}&quot;</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex items-start gap-2">
                                <span className="text-neutral-600 w-6">4</span>
                                <div className="ml-4">
                                    <span className="text-pink-400">return</span>
                                    <span className="text-neutral-400"> (</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <span className="text-neutral-600 w-6">5</span>
                                <p className="ml-8 text-neutral-300 leading-relaxed max-w-xl">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-neutral-600 w-6">6</span>
                                <div className="ml-4">
                                    <span className="text-neutral-400">)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-neutral-600 w-6">7</span>
                                <span className="text-neutral-400">{'}'}</span>
                            </div>
                        </div>

                        {/* Status Badge */}
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 pt-6 border-t border-neutral-800"
                            >
                                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="font-mono text-xs text-emerald-400 font-semibold uppercase">
                                        Currently Active
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
