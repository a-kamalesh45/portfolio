'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { GraduationCap, Briefcase } from 'lucide-react'
import { resumeData } from '@/data/content'

interface TimelineItemProps {
    title: string
    organization: string
    duration: string
    description: string
    isCurrent?: boolean
    index: number
    side: 'left' | 'right'
}

function TimelineItem({ title, organization, duration, description, isCurrent, index, side }: TimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative"
        >
            {/* Timeline dot */}
            <div className={`
        absolute top-0 w-4 h-4 rounded-full border-4 z-10
        ${isCurrent
                    ? 'bg-primary-500 border-primary-200'
                    : 'bg-white border-neutral-300'
                }
        ${side === 'left' ? '-right-2' : '-left-2'}
      `} />

            {/* Content card */}
            <div className={`
        bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300
        ${isCurrent ? 'border-l-4 border-primary-500' : ''}
      `}>
                <span className={`
          inline-block text-xs font-medium px-3 py-1 rounded-full mb-3
          ${isCurrent
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-600'
                    }
        `}>
                    {duration}
                </span>
                <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-1">
                    {title}
                </h4>
                <p className="text-primary-500 font-medium text-sm mb-3">
                    {organization}
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

function TimelineColumn({
    title,
    icon: Icon,
    items,
    side
}: {
    title: string
    icon: React.ElementType
    items: Array<{
        title: string
        organization: string
        duration: string
        description: string
        isCurrent?: boolean
    }>
    side: 'left' | 'right'
}) {
    return (
        <div>
            {/* Column Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
            >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-primary-500" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-neutral-900">
                    {title}
                </h3>
            </motion.div>

            {/* Timeline items */}
            <div className={`
        relative space-y-8 
        ${side === 'left' ? 'pr-6 border-r-2 border-neutral-200' : 'pl-6 border-l-2 border-neutral-200'}
      `}>
                {items.map((item, index) => (
                    <TimelineItem
                        key={item.title + item.organization}
                        {...item}
                        index={index}
                        side={side}
                    />
                ))}
            </div>
        </div>
    )
}

export function ResumeSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section
            id="resume"
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
                        My Journey
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                        Resume
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        A timeline of my education and professional experience
                    </p>
                </motion.div>

                {/* Two Column Timeline */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <TimelineColumn
                        title="Education"
                        icon={GraduationCap}
                        items={resumeData.education}
                        side="right"
                    />
                    <TimelineColumn
                        title="Experience"
                        icon={Briefcase}
                        items={resumeData.experience}
                        side="left"
                    />
                </div>

                {/* Download Resume Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Full Resume
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
