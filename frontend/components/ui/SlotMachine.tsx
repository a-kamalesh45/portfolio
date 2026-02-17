'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface WordPair {
    left: string
    right: string
}

interface SlotMachineProps {
    wordPairs: WordPair[]
    interval?: number
    className?: string
}

export function SlotMachine({
    wordPairs,
    interval = 2000,
    className = ''
}: SlotMachineProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % wordPairs.length)
        }, interval)

        return () => clearInterval(timer)
    }, [wordPairs.length, interval])

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex items-center gap-3 font-bold uppercase tracking-wide"
                >
                    <span className="text-gray-900">
                        {wordPairs[currentIndex].left}
                    </span>
                    <span className="text-gray-400 font-mono text-base">//</span>
                    <span className="text-orange-500">
                        {wordPairs[currentIndex].right}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
