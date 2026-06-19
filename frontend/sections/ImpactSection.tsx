'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useInView,
} from 'framer-motion'

// ─── Types ──────────────────────────────────────────────────────────────────

type NumberStat = {
  type: 'number'
  value: number
  suffix: string
  label: string
  context: string
  bgWord: string
}

type TextStat = {
  type: 'text'
  displayText: string
  suffix: string
  label: string
  context: string
  bgWord: string
}

type Stat = NumberStat | TextStat

// ─── Data ───────────────────────────────────────────────────────────────────

const STATS: Stat[] = [
  {
    type: 'number',
    value: 2500,
    suffix: '+',
    label: 'Participants Coordinated',
    context: 'End-to-end logistics across large-scale technical events',
    bgWord: 'COORDINATED',
  },
  {
    type: 'number',
    value: 2000,
    suffix: '+',
    label: 'Fest Participants Served',
    context: "NSSC — National Students' Space Challenge, IIT Kharagpur",
    bgWord: 'DELIVERED',
  },
  {
    type: 'number',
    value: 1500,
    suffix: '+',
    label: 'Companies Visualized',
    context: 'Full-stack dashboards built on real financial data',
    bgWord: 'VISUALIZED',
  },
  {
    type: 'number',
    value: 4,
    suffix: '+',
    label: 'Production Systems Built',
    context: 'Real software. Real users. Shipped and live.',
    bgWord: 'DEPLOYED',
  },
  {
    type: 'text',
    displayText: 'IIT KGP',
    suffix: '',
    label: 'Current Institution — 8.33 CGPA',
    context: 'Civil Engineering → Software Development',
    bgWord: 'ENGINEERED',
  },
]

// ─── Count-up hook ───────────────────────────────────────────────────────────

function useCountUp(target: number, isActive: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    if (!isActive) {
      return
    }
    let start: number | null = null
    const DURATION = 1500
    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(eased * target))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isActive, target])

  return count
}

// ─── Blueprint grid ──────────────────────────────────────────────────────────

function BlueprintGrid({ id, opacity = 0.12 }: { id: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#F97316"
              strokeWidth="0.4"
              strokeOpacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

// ─── Progress pills ──────────────────────────────────────────────────────────

function ProgressPills({ total, active }: { total: number; active: number }) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-2 z-20 hidden md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={{
            width: i === active ? 22 : 6,
            height: 6,
            backgroundColor: i === active ? '#F97316' : '#A3A3A3',
            opacity: i === active ? 1 : 0.35,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Stat slide ──────────────────────────────────────────────────────────────

function StatSlide({ stat, isActive }: { stat: Stat; isActive: boolean }) {
  const count = useCountUp(
    stat.type === 'number' ? stat.value : 0,
    isActive && stat.type === 'number',
  )

  const displayValue =
    stat.type === 'text' ? stat.displayText : count.toLocaleString()

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={stat.bgWord}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background watermark word */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
            initial={{ x: 70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -70, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-heading font-black text-neutral-900 whitespace-nowrap"
              style={{
                fontSize: 'clamp(5rem, 19vw, 22rem)',
                opacity: 0.04,
                letterSpacing: '-0.02em',
              }}
            >
              {stat.bgWord}
            </span>
          </motion.div>

          {/* Main display */}
          <div className="relative z-10 text-center w-full px-8 max-w-7xl mx-auto">
            {/* Giant number / text */}
            <div className="overflow-hidden mb-3 md:mb-5">
              <motion.div
                className="font-heading font-black leading-[0.85] text-orange-500 whitespace-nowrap"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize:
                    stat.type === 'number'
                      ? 'clamp(4rem, 17vw, 18rem)'
                      : 'clamp(2.5rem, 10vw, 11rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                {displayValue}
                {stat.suffix && (
                  <span
                    className="text-amber-400"
                    style={{ fontSize: '0.38em', letterSpacing: '-0.02em' }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Label */}
            <div className="overflow-hidden mb-3">
              <motion.div
                className="font-heading font-bold text-neutral-800"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.9rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                {stat.label}
              </motion.div>
            </div>

            {/* Context */}
            <motion.div
              className="font-mono text-neutral-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{
                fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
                letterSpacing: '0.12em',
              }}
            >
              {stat.context}
            </motion.div>
          </div>

          {/* Left accent line */}
          <motion.div
            className="absolute left-10 md:left-16 top-1/2 -translate-y-1/2 flex-col items-center gap-2 hidden md:flex"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ originY: 0.5 }}
          >
            <div className="w-px h-16 bg-orange-500 opacity-40" />
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <div className="w-px h-16 bg-orange-500 opacity-40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-neutral-50 py-20 lg:py-28 px-8 md:px-16 border-b border-neutral-200"
    >
      <BlueprintGrid id="impact-header-grid" opacity={0.1} />

      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'conic-gradient(from 180deg at 100% 0%, #F97316 0deg, transparent 50deg)',
          opacity: 0.06,
          filter: 'blur(16px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {`// Impact Report`}
        </motion.div>

        <motion.h2
          className="font-heading font-black text-neutral-900 leading-[0.88]"
          style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 6rem)',
            letterSpacing: '-0.035em',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Built for Real Users.
          <br />
          <span className="text-orange-500">Delivered at Scale.</span>
        </motion.h2>

        <motion.p
          className="mt-8 font-mono text-sm text-neutral-400 tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Scroll to explore the numbers behind the work.
        </motion.p>
      </div>
    </div>
  )
}

// ─── Ending editorial block ──────────────────────────────────────────────────

function EndingBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-neutral-900 relative overflow-hidden"
    >
      <BlueprintGrid id="impact-end-grid" opacity={0.05} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-heading font-black text-white whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 16vw, 20rem)', opacity: 0.03 }}
        >
          SCALE
        </span>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-16 py-24 text-center">
        <motion.div
          className="font-mono text-[10px] tracking-[0.25em] text-orange-500 uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {`// The Summary`}
        </motion.div>

        <motion.p
          className="font-heading font-black text-white leading-[1.08]"
          style={{
            fontSize: 'clamp(1.7rem, 3.4vw, 3rem)',
            letterSpacing: '-0.025em',
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          From coordinating events for{' '}
          <span className="text-orange-400">2500+ participants</span>
          <br />
          to building software used by real users,
          <br />
          <span className="text-neutral-500">
            I enjoy creating systems that scale.
          </span>
        </motion.p>

        <motion.div
          className="mt-16 flex items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div className="h-px w-10 bg-orange-500/40" />
          <span className="font-mono text-[10px] text-neutral-600 tracking-[0.25em]">
            KAMALESH ACHARYA
          </span>
          <div className="h-px w-10 bg-orange-500/40" />
        </motion.div>
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(
      Math.floor(value * STATS.length),
      STATS.length - 1,
    )
    setActiveIndex(index)
  })

  return (
    <section id="impact">
      <SectionHeader />

      {/* Sticky scroll canvas — height = one viewport per stat */}
      <div
        ref={containerRef}
        style={{ height: `${STATS.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-neutral-50 relative">
          <BlueprintGrid id="impact-stats-grid" />

          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: 'conic-gradient(from 180deg at 100% 0%, #F97316 0deg, transparent 55deg)',
              opacity: 0.05,
            }}
          />

          <div className="absolute inset-0">
            {STATS.map((stat, i) => (
              <StatSlide key={i} stat={stat} isActive={activeIndex === i} />
            ))}
          </div>

          <ProgressPills total={STATS.length} active={activeIndex} />

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
            <span className="font-mono text-[9px] text-neutral-400 tracking-[0.2em] uppercase">
              Scroll
            </span>
            <motion.div
              className="w-px h-7 bg-orange-400 opacity-40 origin-top"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      <EndingBlock />
    </section>
  )
}
