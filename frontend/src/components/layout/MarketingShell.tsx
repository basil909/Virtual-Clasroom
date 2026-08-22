import Navbar from '../navbar/Navbar'
import Footer from '../sections/Footer'

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
