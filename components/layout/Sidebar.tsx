'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  const isActive = (href: string) => pathname === href
  const isPrefix = (prefix: string) => pathname.startsWith(prefix)

  const sidebarContent = (
    <>
      {/* Brand */}
      <Link
        href="/"
        style={{
          padding: '1.5rem 1.25rem 1.2rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textDecoration: 'none',
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontSize: '1.3rem',
            fontWeight: 500,
            color: '#fff',
            lineHeight: 1.2,
          }}>
            Elterngespräche
          </div>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--c-teal-light, #15a08a)',
            marginTop: '0.2rem',
          }}>
            trainieren mit KI
          </div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setMobileOpen(false) }}
          className="sidebar-close-btn"
          aria-label="Menü schließen"
          style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.5rem', cursor: 'pointer',
            lineHeight: 1, padding: '0.25rem',
          }}
        >×</button>
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.75rem 0', overflowY: 'auto' }}>

        <NavLink label="Startseite" href="/" isActive={isActive('/')} />

        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0' }} />

        {/* Gemeinsame Module */}
        <NavLink label="Grundlagen & Info"  href="/info"           isActive={isPrefix('/info')} />
        <NavLink label="Wissensquiz"         href="/quiz"           isActive={isPrefix('/quiz')} />
        <NavLink label="Nachbereitung"       href="/nachbereitung"  isActive={isPrefix('/nachbereitung')} />

        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0' }} />

        {/* Gesprächsschmiede – je Schultyp */}
        <div style={{
          padding: '0.5rem 1.25rem 0.25rem',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
        }}>
          Gesprächsschmiede
        </div>

        <GespraechsschmiedeLink
          label="Gymnasium"
          href="/gymnasium/gespraech"
          isActive={isPrefix('/gymnasium')}
        />
        <GespraechsschmiedeLink
          label="Realschule"
          href="/realschule/gespraech"
          isActive={isPrefix('/realschule')}
        />
        <GespraechsschmiedeLink
          label="Gesamtschule"
          href="/gesamtschule/gespraech"
          isActive={isPrefix('/gesamtschule')}
        />

        <GespraechsschmiedeLink
          label="Grundschule"
          href="/grundschule/gespraech"
          isActive={isPrefix('/grundschule')}
        />
        <GespraechsschmiedeLink
          label="Mittelschule"
          href="/mittelschule/gespraech"
          isActive={isPrefix('/mittelschule')}
        />

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0 0.25rem' }} />

        <NavLink label="Mein Fortschritt" href="/fortschritt" isActive={isActive('/fortschritt')} />

      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 0' }}>
        <FooterLinkHref label="Datenschutz & Privatsphäre" href="/datenschutz" />
        <FooterButton label="Abmelden" onClick={handleLogout} />
      </div>
    </>
  )

  return (
    <>
      <aside className="sidebar-desktop">{sidebarContent}</aside>

      <button
        className="sidebar-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="Menü öffnen"
      >
        <span /><span /><span />
      </button>

      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sidebar-mobile${mobileOpen ? ' sidebar-mobile--open' : ''}`}>
        {sidebarContent}
      </aside>
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavLink({ label, href, isActive }: { label: string; href: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        padding: '0.55rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: isActive ? 500 : 400,
        color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
        background: isActive ? 'rgba(15,123,108,0.22)' : 'transparent',
        borderLeft: `3px solid ${isActive ? 'var(--c-teal)' : 'transparent'}`,
        textDecoration: 'none',
        transition: 'color 0.15s, background 0.15s',
      }}
    >
      {label}
    </Link>
  )
}

function GespraechsschmiedeLink({ label, href, isActive }: { label: string; href: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#fff' : 'var(--c-teal-light)',
        background: isActive ? 'rgba(15,123,108,0.28)' : 'rgba(15,123,108,0.07)',
        borderLeft: `3px solid ${isActive ? 'var(--c-teal-light)' : 'transparent'}`,
        textDecoration: 'none',
        marginBottom: '0.15rem',
        transition: 'color 0.15s, background 0.15s',
      }}
    >
      <span style={{ fontSize: '0.85em', opacity: 0.9 }}>🎭</span>
      {label}
    </Link>
  )
}

function DemnachstLink({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 1.25rem',
      fontSize: '0.875rem',
      color: 'rgba(255,255,255,0.2)',
      cursor: 'default',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.85em', opacity: 0.5 }}>🎭</span>
        {label}
      </span>
      <span style={{
        fontSize: '0.6rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '3px',
        padding: '0.1rem 0.4rem',
      }}>
        bald
      </span>
    </div>
  )
}

function FooterButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '0.4rem 1.25rem', fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.28)', background: 'none',
        border: 'none', cursor: 'pointer', transition: 'color 0.15s',
      }}
      onMouseOver={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
      onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.28)' }}
    >
      {label}
    </button>
  )
}

function FooterLinkHref({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block', padding: '0.4rem 1.25rem',
        fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)',
        textDecoration: 'none', transition: 'color 0.15s',
      }}
      onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
      onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.28)' }}
    >
      {label}
    </Link>
  )
}
