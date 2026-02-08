'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface PRTestimonialCardProps {
    testimonial: {
        id: number
        name: string
        role: string
        avatar: string
        feedback: string
        rating?: number
    }
    index: number
}

export function PRTestimonialCard({ testimonial, index }: PRTestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg overflow-hidden hover:bg-neutral-900/60 transition-colors duration-300"
        >
            {/* GitHub-style header */}
            <div className="border-b border-neutral-800 bg-neutral-950/50 px-5 md:px-6 py-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm md:text-base font-semibold text-neutral-100">
                            {testimonial.name}
                        </p>
                        <p className="font-mono text-xs text-neutral-500">
                            commented on commit
                        </p>
                    </div>
                </div>
                <p className="font-mono text-xs text-neutral-600 ml-11">
                    {testimonial.role}
                </p>
            </div>

            {/* Comment body */}
            <div className="px-5 md:px-6 py-5 md:py-6">
                {/* Approval badge */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-4"
                >
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="font-mono text-xs font-semibold text-green-400 uppercase tracking-wider">
                        APPROVED
                    </span>
                </motion.div>

                {/* Feedback text */}
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans">
                    {testimonial.feedback}
                </p>

                {/* Footer - role/title as requested review */}
                <div className="mt-4 pt-4 border-t border-neutral-800/50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    <p className="font-mono text-xs text-neutral-500">
                        Requested review: <span className="text-neutral-400">{testimonial.role}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
