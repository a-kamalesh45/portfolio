'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { testimonialsData } from '@/data/content'
import { PRTestimonialCard } from '@/components/ui/PRTestimonialCard'

export function TestimonialsSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-neutral-50 relative overflow-hidden"
        >
            {/* Background: Massive Low-Opacity Text */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute text-neutral-900 font-heading font-black opacity-5"
                    style={{
                        fontSize: 'clamp(12rem, 20vw, 24rem)',
                        lineHeight: '1',
                        left: '50%',
                        top: '40%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.03 } : {}}
                    transition={{ duration: 1 }}
                >
                    REVIEWS
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="font-mono text-xs md:text-sm text-primary-600 tracking-widest uppercase mb-6">
                        // Peer Feedback
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-neutral-900 mb-6">
                        What People Say
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                        Feedback from amazing collaborators and teams I've worked with.
                    </p>
                </motion.div>

                {/* Testimonials Grid - PR Style */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                    {testimonialsData.map((testimonial, index) => (
                        <PRTestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
