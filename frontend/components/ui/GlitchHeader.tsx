'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import { createElement } from 'react'

interface GlitchHeaderProps {
    children: React.ReactNode
    className?: string
    level?: 'h1' | 'h2' | 'h3'
}

export function GlitchHeader({
    children,
    className,
    level = 'h1',
}: GlitchHeaderProps) {
    const sizeClasses = {
        h1: 'text-5xl md:text-7xl lg:text-8xl',
        h2: 'text-3xl md:text-5xl',
        h3: 'text-2xl md:text-3xl',
    }

    const headingElement = createElement(
        level,
        {
            className: clsx(
                'font-[family-name:var(--font-space-grotesk)] font-bold tracking-tighter',
                sizeClasses[level],
                'text-slate-100',
                'transition-all duration-300',
                'group-hover:text-amber-400',
                className
            ),
        },
        children
    )

    return (
        <motion.div
            whileHover={{
                x: [0, -3, 3, -2, 2, 0],
                transition: { duration: 0.4 },
            }}
            className="inline-block relative group"
        >
            {headingElement}
            {/* Glitch underline effect */}
            <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-amber-400"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}
