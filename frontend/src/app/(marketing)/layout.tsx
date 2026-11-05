import MarketingShell from '@/components/layout/MarketingShell'

// Shared by all public pages so the navbar and footer persist between
// navigations instead of remounting on every click.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>
}
