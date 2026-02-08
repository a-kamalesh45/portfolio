'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoTextProps {
    text: string[]
    className?: string
    videoSrc?: string
}

export function VideoText({
    text,
    className = '',
    videoSrc = '/assets/vdo.mp4'
}: VideoTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const canvas = canvasRef.current
        const video = videoRef.current
        const container = containerRef.current
        if (!canvas || !video || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const setupCanvas = () => {
            const rect = container.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
            canvas.style.width = `${rect.width}px`
            canvas.style.height = `${rect.height}px`
        }

        const draw = () => {
            const width = canvas.width / (window.devicePixelRatio || 1)
            const height = canvas.height / (window.devicePixelRatio || 1)

            // Clear canvas to transparent
            ctx.clearRect(0, 0, width, height)

            // Draw video frame
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                ctx.drawImage(video, 0, 0, width, height)
            }

            // Calculate font size based on container
            const baseFontSize = Math.max(40, Math.min(width * 0.12, height * 0.35))
            const fontStr = `bold ${baseFontSize}px Arial, sans-serif`

            ctx.font = fontStr
            ctx.textBaseline = 'top'
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'

            const padding = 16
            let yPos = Math.max(0, (height - baseFontSize * text.length * 0.9) / 2)

            // Apply text as clipping mask
            ctx.globalCompositeOperation = 'destination-in'
            ctx.fillStyle = 'rgba(0, 0, 0, 1)'

            text.forEach((line) => {
                ctx.fillText(line, padding, yPos)
                yPos += baseFontSize * 0.85
            })

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over'

            animationRef.current = requestAnimationFrame(draw)
        }

        // Start video
        video.play().catch(() => {
            // Autoplay might fail
        })

        setupCanvas()
        draw()

        const resizeObserver = new ResizeObserver(setupCanvas)
        resizeObserver.observe(container)

        return () => {
            cancelAnimationFrame(animationRef.current)
            resizeObserver.disconnect()
        }
    }, [mounted, text])

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden bg-white ${className}`}
        >
            {/* Hidden video element */}
            <video
                ref={videoRef}
                className="hidden"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Canvas with masked video */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: mounted ? 1 : 0, display: 'block' }}
            />
        </div>
    )
}