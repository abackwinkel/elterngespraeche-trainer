import Sidebar from '@/components/layout/Sidebar'

export default function ReferendareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden page-with-sidebar" style={{ background: 'var(--c-offwhite)' }}>
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
