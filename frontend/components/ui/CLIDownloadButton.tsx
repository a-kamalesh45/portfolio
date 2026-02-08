'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface CLIDownloadButtonProps {
    href?: string
    className?: string
}

export function CLIDownloadButton({ href = '#', className = '' }: CLIDownloadButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const command = 'download --verbose resume.pdf'
    const prompt = '>'

    return (
        <motion.a
            href={href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)'
            }}
            className={`
                relative inline-block
                bg-neutral-900 border border-neutral-800 hover:border-green-500/50
                rounded-lg px-6 md:px-8 py-4 md:py-5
                transition-all duration-300
                group cursor-pointer
                ${className}
            `}
        >
            {/* Terminal-style prompt */}
            <div className="font-mono text-sm md:text-base flex items-center gap-2 whitespace-nowrap relative z-10">
                {/* Prompt symbol */}
                <span className="text-green-400 font-bold group-hover:text-green-300 transition-colors">
                    {prompt}
                </span>

                {/* Command text */}
                <span className="text-green-400/90 group-hover:text-green-300 transition-colors">
                    {command}
                </span>

                {/* Blinking cursor */}
                {isHovered && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="w-2 h-5 md:h-6 bg-green-400 rounded-sm ml-1"
                    />
                )}

                {/* Cursor when not hovered */}
                {!isHovered && (
                    <span className="w-2 h-5 md:h-6 bg-green-500/50 rounded-sm ml-1" />
                )}
            </div>
        </motion.a>
    )
}
