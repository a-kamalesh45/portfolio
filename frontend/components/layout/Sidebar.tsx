'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home,
    User,
    FileText,
    Briefcase,
    MessageSquare,
    Mail,
    Menu,
    X
} from 'lucide-react'
import Image from 'next/image'

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
]

export function Sidebar() {
    const [activeSection, setActiveSection] = useState('home')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id))
            const scrollPosition = window.scrollY + 100

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop
                    const sectionHeight = section.offsetHeight
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(navItems[index].id)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 xl:w-24 flex-col items-center py-8 bg-white border-r border-neutral-200 z-50">
                {/* Profile Image */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-12 h-12 xl:w-14 xl:h-14 mb-8"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center">
                            <Image
                                src="/assets/face2.png"
                                alt="Kamalesh Acharya"
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col items-center justify-center gap-2">
                    {navItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.id

                        return (
                            <motion.button
                                key={item.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => scrollToSection(item.id)}
                                className={`
                  relative p-3 rounded-xl transition-all duration-300 group
                  ${isActive
                                        ? 'bg-primary-500 text-white shadow-soft'
                                        : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                                    }
                `}
                                aria-label={item.label}
                            >
                                <Icon size={20} />

                                {/* Tooltip */}
                                <span className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                                    {item.label}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -right-[21px] xl:-right-[25px] top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-l-full"
                                    />
                                )}
                            </motion.button>
                        )
                    })}
                </nav>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-neutral-200 z-50 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center">
                            <Image
                                src="/assets/face2.png"
                                alt="Kamalesh Acharya"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <span className="font-heading font-semibold text-neutral-900">Kamalesh Acharya</span>
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-neutral-200 z-40 py-4"
                    >
                        <nav className="flex flex-col">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = activeSection === item.id

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`
                      flex items-center gap-3 px-6 py-3 transition-colors
                      ${isActive
                                                ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                                                : 'text-neutral-600 hover:bg-neutral-50'
                                            }
                    `}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                )
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
