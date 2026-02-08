'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface TimelineItemData {
    title: string
    organization: string
    duration: string
    description: string
    isCurrent?: boolean
}

interface GitGraphTimelineProps {
    items: TimelineItemData[]
}

function TimelineItem({
    item,
    index,
    isDesktop,
    side
}: {
    item: TimelineItemData
    index: number
    isDesktop: boolean
    side?: 'left' | 'right'
}) {
    const isLatest = item.isCurrent
    const commitMessage = item.isCurrent
        ? `feat: ${item.title}`
        : `init: ${item.title}`

    const [year] = item.duration.split('-').slice(-1)
    const hashTag = item.isCurrent ? `#${year}-PRESENT` : `#${year}`

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`relative flex gap-6 md:gap-8 ${!isDesktop || side === 'right' ? 'flex-row' : 'flex-row-reverse'
                }`}
        >
            {/* Spine with node */}
            <div className={`flex flex-col items-center ${isDesktop && side === 'left' ? 'order-last' : ''}`}>
                {/* Timeline node */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.1 }}
                    className={`relative w-5 h-5 rounded-full flex-shrink-0 border-2 ${isLatest
                            ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/50'
                            : 'bg-transparent border-neutral-300 hover:border-neutral-400'
                        } transition-all duration-300 cursor-pointer`}
                >
                    {isLatest && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-green-500 opacity-30"
                        />
                    )}
                </motion.div>

                {/* Spine line */}
                {index < 3 && (
                    <div className="w-0.5 h-24 md:h-32 bg-gradient-to-b from-neutral-200 to-neutral-100 my-1" />
                )}
            </div>

            {/* Commit card */}
            <div className="flex-1 pb-6 md:pb-8">
                <motion.div
                    whileHover={{ borderColor: 'rgb(229, 231, 235)', boxShadow: '0 0 0 1px rgb(229, 231, 235)' }}
                    className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 rounded-lg p-5 md:p-6 hover:bg-neutral-900/40 transition-all duration-300 group"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <p className="font-mono text-xs text-neutral-500 mb-2 group-hover:text-neutral-400 transition-colors">
                                {item.duration}
                            </p>
                            <h4 className="font-mono text-sm md:text-base font-semibold text-green-400 mb-2 break-words">
                                {commitMessage}
                            </h4>
                        </div>
                        <span className="font-mono text-xs text-neutral-500 whitespace-nowrap flex-shrink-0 group-hover:text-neutral-400 transition-colors">
                            {hashTag}
                        </span>
                    </div>

                    {/* Organization */}
                    <p className="font-mono text-xs text-neutral-400 mb-4 group-hover:text-neutral-300 transition-colors">
                        @ {item.organization}
                    </p>

                    {/* Description as git diff */}
                    <div className="font-mono text-xs md:text-sm space-y-2">
                        {item.description.split('\n').map((line, i) => (
                            <div key={i} className="flex items-start gap-2 text-neutral-300 group-hover:text-neutral-200 transition-colors">
                                <Plus className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{line}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export function GitGraphTimeline({ items }: GitGraphTimelineProps) {
    // Check if desktop - simplified check (can be improved with useMedia)
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768

    return (
        <div className="relative">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(90deg, transparent 24%, rgba(68, 68, 68, .05) 25%, rgba(68, 68, 68, .05) 26%, transparent 27%, transparent 74%, rgba(68, 68, 68, .05) 75%, rgba(68, 68, 68, .05) 76%, transparent 77%, transparent), linear-gradient(rgba(68, 68, 68, .05) 25%, transparent 25%, transparent 26%, rgba(68, 68, 68, .05) 26%, rgba(68, 68, 68, .05))',
                backgroundSize: '50px 50px',
            }} />

            {/* Timeline items */}
            <div className="space-y-4 md:space-y-6 relative">
                {items.map((item, index) => (
                    <TimelineItem
                        key={`${item.title}-${item.organization}`}
                        item={item}
                        index={index}
                        isDesktop={isDesktop}
                        side={isDesktop && index % 2 === 0 ? 'right' : 'left'}
                    />
                ))}
            </div>
        </div>
    )
}
