'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send } from 'lucide-react'
import { MdMail, MdOutlinePhoneAndroid } from 'react-icons/md'

export function TerminalContact() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulate form submission
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setSubmitStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setSubmitStatus('idle'), 3000)
        } catch {
            setSubmitStatus('error')
            setTimeout(() => setSubmitStatus('idle'), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-neutral-100 relative overflow-hidden"
        >
            {/* Background: Massive Low-Opacity Text */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute text-neutral-900 font-heading font-black opacity-5"
                    style={{
                        fontSize: 'clamp(12rem, 25vw, 28rem)',
                        lineHeight: '1',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.05 } : {}}
                    transition={{ duration: 1 }}
                >
                    CONNECT
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* LEFT: The Human Hook */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-neutral-900"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            className="mb-8"
                        >
                            <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-6">
                                // Let's Build
                            </div>
                            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                                Let's build something{' '}
                                <span className="text-primary-500">dangerous?</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-8 max-w-md"
                        >
                            If your problem involves scale, performance optimization, or pure engineering chaos, I'm ready to dive in. Let's talk.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-4"
                        >
                            <a
                                href="mailto:kamaleshacharya224@gmail.com"
                                className="inline-flex items-center gap-3 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                            >
                                <span className="font-mono"><MdMail /> kamaleshacharya224@gmail.com</span>
                            </a>
                            <a
                                href="tel:+918895816001"
                                className="inline-flex items-center gap-3 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                            >
                                <span className="font-mono"><MdOutlinePhoneAndroid /> +91 88958 16001</span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: The Terminal Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl">
                            {/* Window Header */}
                            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-800 border-b border-neutral-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <span className="text-xs text-neutral-400 font-mono ml-3">contact_form.tsx</span>
                            </div>

                            {/* Form Content */}
                            <form
                                onSubmit={handleSubmit}
                                className="p-6 md:p-8 font-mono text-sm md:text-base text-emerald-400"
                            >
                                <div className="space-y-6">
                                    {/* Line 1: Name */}
                                    <div className="flex items-center gap-4 group">
                                        <span className="text-neutral-600 w-6 text-right flex-shrink-0">1</span>
                                        <div className="flex-1">
                                            <span className="text-pink-400">const</span>
                                            <span className="text-neutral-400"> name </span>
                                            <span className="text-orange-400">=</span>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder='""'
                                                className="ml-2 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-emerald-400 placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-mono text-sm inline-flex"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Line 2: Email */}
                                    <div className="flex items-center gap-4 group">
                                        <span className="text-neutral-600 w-6 text-right flex-shrink-0">2</span>
                                        <div className="flex-1">
                                            <span className="text-pink-400">const</span>
                                            <span className="text-neutral-400"> email </span>
                                            <span className="text-orange-400">=</span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder='""'
                                                className="ml-2 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-emerald-400 placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-mono text-sm inline-flex"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Line 3: Comment */}
                                    <div className="flex gap-4 pt-2">
                                        <span className="text-neutral-600 w-6 text-right flex-shrink-0">3</span>
                                        <span className="text-neutral-600">{`// Your message:`}</span>
                                    </div>

                                    {/* Line 4: Message Textarea */}
                                    <div className="flex items-start gap-4 group">
                                        <span className="text-neutral-600 w-6 text-right flex-shrink-0 pt-2">4</span>
                                        <div className="flex-1">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell me about your project..."
                                                rows={4}
                                                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-emerald-400 placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-mono text-sm resize-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || submitStatus === 'success'}
                                    className="mt-8 w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-700 text-neutral-900 font-mono font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    animate={{
                                        borderColor: submitStatus === 'success' ? 'rgb(34, 197, 94)' : 'transparent',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                            <span>executing...</span>
                                        </>
                                    ) : submitStatus === 'success' ? (
                                        <>
                                            <span>✓ Message sent!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Execute</span>
                                        </>
                                    )}
                                </motion.button>

                                {/* Status Message */}
                                <AnimatePresence>
                                    {submitStatus === 'error' && (
                                        <motion.p
                                            className="mt-4 text-red-500 text-xs font-mono text-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Error: Failed to send message. Try again.
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

import { AnimatePresence } from 'framer-motion'
