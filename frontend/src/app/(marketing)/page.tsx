import HeroSection from '@/features/landing/components/HeroSection'
import PlatformFeaturesGrid from '@/features/landing/components/PlatformFeaturesGrid'
import StatsSection from '@/features/landing/components/StatsSection'
import DashboardPreview from '@/features/landing/components/DashboardPreview'
import TestimonialsSection from '@/features/landing/components/TestimonialsSection'
import CTASection from '@/features/landing/components/CTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4ef] text-[#171717]">
      {/* Main landing content */}
      <div>
        {/* Hero */}
        <HeroSection />

        {/* What SkillX offers */}
        <PlatformFeaturesGrid />

        {/* Platform numbers / credibility */}
        <StatsSection />

        {/* Product preview */}
        <DashboardPreview />

        {/* Student experiences */}
        <TestimonialsSection />

        {/* Final conversion section */}
        <CTASection />
      </div>
    </main>
  )
}