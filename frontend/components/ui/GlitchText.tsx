'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
    text: string
    className?: string
    decodeOnLoad?: boolean
    decodeOnHover?: boolean
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/>#<01X@$%&'

export function GlitchText({
    text,
    className = '',
    decodeOnLoad = true,
    decodeOnHover = true
}: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text)
    const [isDecoding, setIsDecoding] = useState(false)

    const decode = () => {
        if (isDecoding) return
        setIsDecoding(true)

        let iteration = 0
        const originalText = text
        const totalIterations = originalText.length * 2

        const interval = setInterval(() => {
            setDisplayText(
                originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' '
                        if (index < iteration / 2) {
                            return originalText[index]
                        }
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
                    })
                    .join('')
            )

            iteration++

            if (iteration >= totalIterations) {
                clearInterval(interval)
                setDisplayText(originalText)
                setIsDecoding(false)
            }
        }, 30)
    }

    useEffect(() => {
        if (decodeOnLoad) {
            const timeout = setTimeout(() => {
                decode()
            }, 300)
            return () => clearTimeout(timeout)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            className={className}
            onHoverStart={decodeOnHover ? decode : undefined}
            style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
        >
            {displayText}
        </motion.div>
    )
}
