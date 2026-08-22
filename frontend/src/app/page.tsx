import Navbar from '../components/navbar/Navbar'
import HeroSection from '../components/hero/HeroSection'
import PlatformFeaturesGrid from '../components/sections/PlatformFeaturesGrid'
import StatsSection from '../components/sections/StatsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import DashboardPreview from '../components/sections/DashboardPreview'
import CTASection from '../components/sections/CTASection'
import Footer from '../components/sections/Footer'

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#f5f7fb]">
      <Navbar />
      <HeroSection />
      <PlatformFeaturesGrid />
      <StatsSection />
      <DashboardPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}