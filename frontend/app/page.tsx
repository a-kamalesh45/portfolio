'use client'

import { Navbar } from '@/components/layout'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { TechStackSection } from '@/sections/TechStackSection'
import { PortfolioSection } from '@/sections/PortfolioSection'
import { ImpactSection } from '@/sections/ImpactSection'
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
        <PortfolioSection />
        <TechStackSection />
        <ImpactSection />
        <ContactSection />
      </main>
      <Analytics />
    </>
  )
}
