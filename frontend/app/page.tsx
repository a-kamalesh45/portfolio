'use client'

import { Navbar } from '@/components/layout'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { ResumeSection } from '@/sections/ResumeSection'
import { TechStackSection } from '@/sections/TechStackSection'
import { PortfolioSection } from '@/sections/PortfolioSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { ContactSection } from '@/sections/ContactSection'
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main Content Area - Full Width */}
      <main className="w-full pt-20 md:pt-0">
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <TechStackSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Analytics />
    </>
  )
}
