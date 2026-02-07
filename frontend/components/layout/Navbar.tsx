'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Resume', href: '#resume' },
]

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeNavItem, setActiveNavItem] = useState('home')

    const handleNavClick = (href: string) => {
        const id = href.replace('#', '')
        setActiveNavItem(id)
        setIsMobileMenuOpen(false)

        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            {/* Floating Pill Navbar - Desktop */}
            <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                        flex items-center justify-between
                        px-8 py-3
                        max-w-4xl
                        bg-white/80 backdrop-blur-md
                        border border-white/20
                        rounded-full
                        shadow-lg shadow-black/5
                    "
                >
                    {/* Logo / Initials - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex items-center mr-12"
                    >
                        <span className="font-heading font-bold text-2xl text-neutral-900 tracking-tight">
                            KA
                        </span>
                    </motion.div>

                    {/* Navigation Links - Center */}
                    <motion.div className="flex items-center gap-1" layout>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
                                className="relative"
                            >
                                {/* Pill Background (animated) */}
                                {activeNavItem === item.href.replace('#', '') && (
                                    <motion.div
                                        layoutId="navPill"
                                        className="absolute inset-0 bg-neutral-100 rounded-full"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <button
                                    onClick={() => handleNavClick(item.href)}
                                    className={`
                        relative px-4 py-2 rounded-full text-sm font-medium
                        transition-colors duration-300
                        ${activeNavItem === item.href.replace('#', '')
                                            ? 'text-neutral-900'
                                            : 'text-neutral-600 hover:text-neutral-900'
                                        }
                    `}
                                >
                                    {item.label}
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button - Right */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="
                            ml-8 px-6 py-2
                            bg-primary-500 hover:bg-primary-600
                            text-white
                            rounded-full text-sm font-semibold
                            transition-all duration-300
                            hover:shadow-lg hover:shadow-primary-500/30
                            active:scale-95
                        "
                    >
                        Let's Talk
                    </motion.button>
                </motion.div>
            </nav>

            {/* Mobile Floating Navbar */}
            <div className="md:hidden fixed top-4 left-4 right-4 z-50">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                        flex items-center justify-between
                        px-4 py-3
                        bg-white/80 backdrop-blur-md
                        border border-white/20
                        rounded-full
                        shadow-lg shadow-black/5
                    "
                >
                    {/* Logo */}
                    <span className="font-heading font-bold text-lg text-neutral-900">KA</span>

                    {/* Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="
                            p-2 rounded-full
                            hover:bg-neutral-100
                            transition-colors duration-300
                            text-neutral-900
                        "
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </motion.div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="
                                mt-2 rounded-3xl
                                bg-white/80 backdrop-blur-md
                                border border-white/20
                                shadow-lg shadow-black/5
                                overflow-hidden
                            "
                        >
                            <div className="flex flex-col p-4 gap-2">
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className="
                            px-4 py-3 text-left rounded-lg
                            text-neutral-900 hover:bg-neutral-100
                            transition-colors duration-300
                            font-medium text-sm
                        "
                                        whileHover={{ x: 4 }}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}

                                <motion.div className="h-px bg-neutral-200 my-2" />

                                <motion.button
                                    onClick={() => handleNavClick('#contact')}
                                    className="
                        px-4 py-3 rounded-lg
                        bg-primary-500 text-white
                        font-medium text-sm
                        hover:bg-primary-600
                        transition-all duration-300
                    "
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Let's Talk
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
