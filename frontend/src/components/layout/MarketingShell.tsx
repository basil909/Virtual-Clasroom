import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
