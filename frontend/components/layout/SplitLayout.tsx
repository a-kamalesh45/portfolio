'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import clsx from 'clsx'

interface SplitLayoutProps {
    children: React.ReactNode
}

const navItems = ['About', 'Stack', 'Projects', 'Contact']

export function SplitLayout({ children }: SplitLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200">
            {/* LEFT SIDEBAR - Fixed */}
            <aside className="fixed left-0 top-0 h-screen w-1/4 border-r border-slate-800 p-8 flex flex-col justify-between bg-slate-950/80 backdrop-blur-sm z-50">
                {/* Profile Section */}
                <div className="space-y-8">
                    {/* Profile Picture with Glowing Amber Ring */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-28 h-28 mx-auto"
                    >
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)] animate-pulse" />
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-800 to-slate-900" />
                        <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                            <span className="text-amber-400 font-mono font-bold text-2xl">CP</span>
                        </div>
                    </motion.div>

                    {/* Name & Role */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-center space-y-2"
                    >
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-slate-100">
                            User Name
                        </h1>
                        <p className="text-amber-400 text-sm font-mono tracking-wide">
                            Chaos-Pilot & Systems Architect
                        </p>
                    </motion.div>

                    {/* Navigation Links */}
                    <nav className="pt-6 space-y-2">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className={clsx(
                                    'block px-4 py-3 rounded-lg',
                                    'text-slate-400 hover:text-amber-400',
                                    'font-mono text-sm tracking-wider uppercase',
                                    'border border-transparent hover:border-slate-800',
                                    'transition-all duration-300',
                                    'hover:translate-x-2 hover:bg-slate-900/50'
                                )}
                            >
                                <span className="text-amber-400/50 mr-2">0{index + 1}.</span>
                                {item}
                            </motion.a>
                        ))}
                    </nav>
                </div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4 justify-center pt-8 border-t border-slate-800"
                >
                    <a
                        href="#"
                        className="p-3 rounded-lg border border-slate-800 hover:border-amber-400/50 transition-all duration-300 text-slate-400 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="#"
                        className="p-3 rounded-lg border border-slate-800 hover:border-amber-400/50 transition-all duration-300 text-slate-400 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="#"
                        className="p-3 rounded-lg border border-slate-800 hover:border-amber-400/50 transition-all duration-300 text-slate-400 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                    >
                        <Mail size={20} />
                    </a>
                </motion.div>
            </aside>

            {/* RIGHT CONTENT AREA - Scrollable */}
            <main className="ml-[25%] w-3/4 min-h-screen bg-slate-950">
                <div className="max-w-5xl mx-auto px-8 md:px-16 py-16 space-y-24">
                    {children}
                </div>
            </main>
        </div>
    )
}
