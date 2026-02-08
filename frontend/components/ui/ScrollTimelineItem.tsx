'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TimelineItemData {
    title: string
    organization: string
    duration: string
    description: string
    isCurrent?: boolean
}

interface ScrollTimelineItemProps {
    item: TimelineItemData
    index: number
    totalItems: number
}

export function ScrollTimelineItem({ item, index, totalItems }: ScrollTimelineItemProps) {
    const itemRef = useRef(null)
    const isInView = useInView(itemRef, {
        margin: '-40% 0px -40% 0px', // Activates when item is near center of viewport
        once: false // Allow re-triggering
    })

    // Extract year from duration
    const year = item.duration.split('-')[0].trim()
    const isActive = item.isCurrent

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="relative flex gap-8 mb-12 md:mb-16"
        >
            {/* Timeline Spine & Node */}
            <div className="flex flex-col items-center flex-shrink-0 relative">
                {/* Node */}
                <motion.div
                    animate={{
                        scale: isInView ? 1.4 : 1,
                        backgroundColor: isInView ? '#f97316' : '#e5e7eb',
                        boxShadow: isInView
                            ? '0 0 30px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.4)'
                            : 'none',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-4 h-4 rounded-full border-2 border-primary-600 z-10 relative"
                >
                    {/* Pulse effect when active */}
                    {isInView && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-primary-500"
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                    )}
                </motion.div>

                {/* Vertical Line - Glows when item is in view */}
                {index < totalItems - 1 && (
                    <motion.div
                        className="w-1 h-full mt-2"
                        animate={{
                            background: isInView
                                ? 'linear-gradient(to bottom, rgba(249, 115, 22, 0.8), rgba(249, 115, 22, 0.3))'
                                : 'linear-gradient(to bottom, rgba(229, 231, 235, 0.5), rgba(229, 231, 235, 0.3))',
                        }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 pb-8">
                {/* STATE A: Inactive / Out of Focus */}
                {!isInView && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="py-4"
                    >
                        <p className="font-mono text-xs md:text-sm text-neutral-500 mb-1">
                            {year}
                        </p>
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-neutral-900">
                            {item.title}
                        </h3>
                    </motion.div>
                )}

                {/* STATE B: Active / In Viewport */}
                {isInView && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1] // Custom easing for smooth expansion
                        }}
                        className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center gap-3 px-4 md:px-6 py-3 bg-neutral-950 border-b border-neutral-800">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs text-neutral-500 font-mono ml-2">
                                {item.title.toLowerCase().replace(/\s+/g, '_')}.sh
                            </span>
                            {isActive && (
                                <span className="ml-auto text-xs font-mono text-emerald-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    ACTIVE
                                </span>
                            )}
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 md:p-8 font-mono text-sm space-y-4">
                            {/* Header Info */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary-500">
                                    <span className="text-neutral-600">$</span>
                                    <span>cat role.txt</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white pl-4">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Organization */}
                            <div className="flex items-center gap-2 pl-4">
                                <span className="text-pink-400">const</span>
                                <span className="text-neutral-400">company</span>
                                <span className="text-primary-500">=</span>
                                <span className="text-emerald-400">&quot;{item.organization}&quot;</span>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center gap-2 pl-4 text-neutral-500">
                                <span className="text-neutral-600">//</span>
                                <span>{item.duration}</span>
                            </div>

                            {/* Description as console logs */}
                            <div className="pt-4 border-t border-neutral-800 space-y-2">
                                {item.description.split('.').filter(s => s.trim()).map((sentence, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        className="flex items-start gap-2 text-neutral-300"
                                    >
                                        <span className="text-emerald-500 flex-shrink-0">&gt;</span>
                                        <span className="text-blue-400">console.log</span>
                                        <span className="text-neutral-500">(</span>
                                        <span className="text-emerald-400">&quot;{sentence.trim()}&quot;</span>
                                        <span className="text-neutral-500">)</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
