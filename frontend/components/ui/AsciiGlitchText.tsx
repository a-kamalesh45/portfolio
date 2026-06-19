'use client'

import { useEffect, useRef, useCallback } from 'react'

// ──────────────────────────────────────────────
// TYPES & CONSTANTS
// ──────────────────────────────────────────────

interface AsciiGlitchTextProps {
    line1: string
    line2: string
    className?: string
    decodeOnLoad?: boolean
    glitchOnHover?: boolean
}

const ASCII_CHARS = ['#', '%', '@', '&', '$', '*', '+', '=', 'X', 'M', 'A', '0', '1']
const CELL_SIZE = 7        // Grid cell size in px
const FONT_RENDER = 200    // Offscreen canvas font size for mask
const LINE_GAP = 0.15      // Vertical spacing between lines as fraction of line height
const ALPHA_THRESHOLD = 128
const DECODE_DURATION = 800

const randomAscii = () => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]

// ──────────────────────────────────────────────
// STEP 1 & 2: MASK GENERATION + ASCII GRID MAPPING
// ──────────────────────────────────────────────

/** Renders text to an offscreen canvas and extracts a 2D ASCII grid */
function textToAsciiGrid(
    text: string,
    gridWidth: number,
    gridHeight: number
): string[][] {
    // Create offscreen canvas at high res for clean pixel data
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return []

    canvas.width = gridWidth * CELL_SIZE
    canvas.height = gridHeight * CELL_SIZE

    // Render text centered
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Auto-size font to fit width
    let fontSize = FONT_RENDER
    ctx.font = `900 ${fontSize}px "Space Grotesk", "Inter", sans-serif`
    let measured = ctx.measureText(text)
    while (measured.width > canvas.width * 0.95 && fontSize > 20) {
        fontSize -= 4
        ctx.font = `900 ${fontSize}px "Space Grotesk", "Inter", sans-serif`
        measured = ctx.measureText(text)
    }

    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    // Extract pixel data → 2D ASCII grid
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const grid: string[][] = []

    for (let row = 0; row < gridHeight; row++) {
        const line: string[] = []
        for (let col = 0; col < gridWidth; col++) {
            // Sample center of each cell
            const px = Math.floor(col * CELL_SIZE + CELL_SIZE / 2)
            const py = Math.floor(row * CELL_SIZE + CELL_SIZE / 2)
            const idx = (py * canvas.width + px) * 4
            const alpha = pixels[idx + 3] || 0

            line.push(alpha > ALPHA_THRESHOLD ? randomAscii() : '')
        }
        grid.push(line)
    }

    return grid
}

// ──────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────

export function AsciiGlitchText({
    line1,
    line2,
    className = '',
    decodeOnLoad = true,
    glitchOnHover = true,
}: AsciiGlitchTextProps) {
    // ── Refs (no state updates per frame) ──
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef(0)
    const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    // Grid data stored as refs
    const grid1Ref = useRef<string[][]>([])      // Current display grid for line 1
    const grid2Ref = useRef<string[][]>([])      // Current display grid for line 2
    const stable1Ref = useRef<string[][]>([])    // Stable (target) grid for line 1
    const stable2Ref = useRef<string[][]>([])    // Stable (target) grid for line 2
    const cols1Ref = useRef(0)
    const rows1Ref = useRef(0)
    const cols2Ref = useRef(0)
    const rows2Ref = useRef(0)

    // Animation state refs
    const isHoveredRef = useRef(false)
    const isDecodingRef = useRef(false)
    const decodeStartRef = useRef(0)
    const lastGlitchRef = useRef(0)
    const glitchBurstUntilRef = useRef(0)

    // ──────────────────────────────
    // STEP 1-2: Build both grids
    // ──────────────────────────────
    const buildGrids = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const w = container.clientWidth
        const totalH = container.clientHeight

        // Divide vertical space: line1 gets ~55%, gap ~10%, line2 ~35%
        const lineH1 = Math.floor(totalH * 0.48)
        const lineH2 = Math.floor(totalH * 0.38)

        const c1 = Math.floor(w / CELL_SIZE)
        const r1 = Math.floor(lineH1 / CELL_SIZE)
        const c2 = Math.floor(w / CELL_SIZE)
        const r2 = Math.floor(lineH2 / CELL_SIZE)

        cols1Ref.current = c1
        rows1Ref.current = r1
        cols2Ref.current = c2
        rows2Ref.current = r2

        // Generate stable grids
        const s1 = textToAsciiGrid(line1, c1, r1)
        const s2 = textToAsciiGrid(line2, c2, r2)

        stable1Ref.current = s1
        stable2Ref.current = s2

        // Clone for mutable display grids
        grid1Ref.current = s1.map(row => [...row])
        grid2Ref.current = s2.map(row => [...row])
    }, [line1, line2])

    // ──────────────────────────────
    // STEP 3: Canvas rendering
    // ──────────────────────────────
    const render = useCallback(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const dpr = window.devicePixelRatio || 1
        const w = container.clientWidth
        const h = container.clientHeight

        // Sync canvas size
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, w, h)

        const isGlitching = Date.now() < glitchBurstUntilRef.current
        const hovered = isHoveredRef.current
        const rgbOffset = isGlitching ? (Math.random() * 3 + 1) : (hovered ? 1.5 : 0)

        // Calculate vertical layout
        const lineH1 = rows1Ref.current * CELL_SIZE
        const gap = Math.floor(h * LINE_GAP)
        const lineH2 = rows2Ref.current * CELL_SIZE
        const totalUsed = lineH1 + gap + lineH2
        const offsetY = Math.max(0, Math.floor((h - totalUsed) / 2))

        const drawGrid = (grid: string[][], startY: number, cols: number, rows: number) => {
            // Horizontal slice distortion
            const sliceRow = isGlitching ? Math.floor(Math.random() * rows) : -1
            const sliceShift = isGlitching ? (Math.random() - 0.5) * 12 : 0

            for (let row = 0; row < rows; row++) {
                if (!grid[row]) continue
                const yPos = startY + row * CELL_SIZE + CELL_SIZE / 2
                const xShift = (row === sliceRow) ? sliceShift : 0

                for (let col = 0; col < cols; col++) {
                    const ch = grid[row][col]
                    if (!ch) continue
                    const xPos = col * CELL_SIZE + CELL_SIZE / 2 + xShift

                    // RGB split layers
                    if (rgbOffset > 0) {
                        // Red layer
                        ctx.fillStyle = 'rgba(255, 40, 40, 0.45)'
                        ctx.fillText(ch, xPos - rgbOffset, yPos)
                        // Cyan layer
                        ctx.fillStyle = 'rgba(0, 220, 255, 0.45)'
                        ctx.fillText(ch, xPos + rgbOffset, yPos)
                    }

                    // Main layer
                    ctx.fillStyle = '#1a1a1a'
                    ctx.fillText(ch, xPos, yPos)
                }
            }
        }

        // Configure text style once
        ctx.font = `${CELL_SIZE}px "Courier New", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Draw line 1
        drawGrid(grid1Ref.current, offsetY, cols1Ref.current, rows1Ref.current)

        // Draw line 2
        drawGrid(grid2Ref.current, offsetY + lineH1 + gap, cols2Ref.current, rows2Ref.current)

        // Scanline overlay
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)'
        ctx.lineWidth = 1
        const scanOffset = (Date.now() * 0.03) % h
        for (let sy = scanOffset % 4; sy < h; sy += 4) {
            ctx.beginPath()
            ctx.moveTo(0, sy)
            ctx.lineTo(w, sy)
            ctx.stroke()
        }
    }, [])

    // ──────────────────────────────
    // STEP 4: Glitch system
    // ──────────────────────────────
    const applyScramble = useCallback((
        grid: string[][],
        stable: string[][],
        intensity: number
    ) => {
        const rows = grid.length
        for (let r = 0; r < rows; r++) {
            if (!grid[r]) continue
            const cols = grid[r].length
            for (let c = 0; c < cols; c++) {
                if (!stable[r]?.[c]) continue // skip empty cells
                if (Math.random() < intensity) {
                    grid[r][c] = randomAscii()
                } else if (Math.random() < 0.08) {
                    // Gradually settle back
                    grid[r][c] = stable[r][c]
                }
            }
        }
    }, [])

    const triggerGlitchBurst = useCallback(() => {
        glitchBurstUntilRef.current = Date.now() + 180
    }, [])

    // ──────────────────────────────
    // STEP 5: Decode animation
    // ──────────────────────────────
    const startDecode = useCallback(() => {
        isDecodingRef.current = true
        decodeStartRef.current = Date.now()

        // Fill grids with random noise initially
        const fillNoise = (grid: string[][], stable: string[][]) => {
            for (let r = 0; r < grid.length; r++) {
                for (let c = 0; c < (grid[r]?.length || 0); c++) {
                    if (stable[r]?.[c]) {
                        grid[r][c] = randomAscii()
                    }
                }
            }
        }
        fillNoise(grid1Ref.current, stable1Ref.current)
        fillNoise(grid2Ref.current, stable2Ref.current)
    }, [])

    // ──────────────────────────────
    // MAIN ANIMATION LOOP
    // ──────────────────────────────
    const loopRef = useRef<(() => void) | null>(null)
    const loop = useCallback(() => {
        const now = Date.now()

        // -- Decode phase --
        if (isDecodingRef.current) {
            const elapsed = now - decodeStartRef.current
            const progress = Math.min(elapsed / DECODE_DURATION, 1)

            // Progressively lock characters into place
            const decodeSweep = (grid: string[][], stable: string[][]) => {
                for (let r = 0; r < grid.length; r++) {
                    for (let c = 0; c < (grid[r]?.length || 0); c++) {
                        if (!stable[r]?.[c]) continue
                        if (Math.random() < progress) {
                            grid[r][c] = stable[r][c]
                        } else {
                            grid[r][c] = randomAscii()
                        }
                    }
                }
            }
            decodeSweep(grid1Ref.current, stable1Ref.current)
            decodeSweep(grid2Ref.current, stable2Ref.current)

            if (progress >= 1) isDecodingRef.current = false
        }

        // -- Periodic glitch burst (every 3-5s) --
        if (!isDecodingRef.current && now - lastGlitchRef.current > 3000 + Math.random() * 2000) {
            lastGlitchRef.current = now
            triggerGlitchBurst()
        }

        // -- Continuous scramble --
        const isGlitching = now < glitchBurstUntilRef.current
        const hovered = isHoveredRef.current
        let intensity = 0
        if (isGlitching) intensity = 0.25
        else if (hovered) intensity = 0.15
        else intensity = 0.005 // subtle ambient flicker

        if (!isDecodingRef.current) {
            applyScramble(grid1Ref.current, stable1Ref.current, intensity)
            applyScramble(grid2Ref.current, stable2Ref.current, intensity)
        }

        render()
        rafRef.current = requestAnimationFrame(() => loopRef.current?.())
    }, [render, applyScramble, triggerGlitchBurst])

    // ──────────────────────────────
    // LIFECYCLE
    // ──────────────────────────────
    useEffect(() => {
        loopRef.current = loop
        buildGrids()

        // Start animation loop
        rafRef.current = requestAnimationFrame(() => loopRef.current?.())

        // Decode on load
        if (decodeOnLoad) {
            setTimeout(() => startDecode(), 200)
        }

        // Debounced resize handler
        const handleResize = () => {
            if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
            resizeTimerRef.current = setTimeout(() => {
                buildGrids()
            }, 150)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(rafRef.current)
            if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
            window.removeEventListener('resize', handleResize)
        }
    }, [buildGrids, loop, decodeOnLoad, startDecode])

    // ──────────────────────────────
    // STEP 6: Hover + click handlers
    // ──────────────────────────────
    const onMouseEnter = () => {
        if (glitchOnHover) isHoveredRef.current = true
    }
    const onMouseLeave = () => {
        isHoveredRef.current = false
        // Settle characters
        const settle = (grid: string[][], stable: string[][]) => {
            for (let r = 0; r < grid.length; r++) {
                for (let c = 0; c < (grid[r]?.length || 0); c++) {
                    if (stable[r]?.[c]) grid[r][c] = stable[r][c]
                }
            }
        }
        settle(grid1Ref.current, stable1Ref.current)
        settle(grid2Ref.current, stable2Ref.current)
    }
    const onClick = () => triggerGlitchBurst()

    return (
        <div
            ref={containerRef}
            className={`relative cursor-pointer select-none ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                style={{ imageRendering: 'crisp-edges' }}
            />
        </div>
    )
}
