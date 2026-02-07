'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { testimonialsData } from '@/data/content'

interface TestimonialCardProps {
    testimonial: {
        id: number
        name: string
        role: string
        avatar: string
        feedback: string
        rating: number
    }
    index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ rotate: 0, y: -5 }}
            className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative"
        >
            {/* Quote icon */}
            <div className="absolute -top-4 -left-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Quote size={18} className="text-white" fill="currentColor" />
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? 'text-primary-400 fill-primary-400' : 'text-neutral-200'}
                    />
                ))}
            </div>

            {/* Feedback */}
            <p className="text-neutral-600 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.feedback}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100">
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-heading font-semibold text-neutral-900">
                        {testimonial.name}
                    </h4>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
            </div>
        </motion.div>
    )
}

export function TestimonialsSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-neutral-50"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-primary-500 font-medium text-sm tracking-wider uppercase mb-4">
                        What They Say
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                        Testimonials
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        Kind words from amazing people I&apos;ve had the pleasure to work with
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
