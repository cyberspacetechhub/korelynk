import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

const ACADEMY_URL = 'https://academy.inntechlab.online'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <nav className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src="/ITL-LOGO1-dark.svg" alt="InnTechLab" className="w-auto h-8" />
          <span className="text-base font-bold tracking-tight text-gray-900">
            Inn<span className="text-brand-600">Tech</span>Lab
          </span>
        </NavLink>

        <ul className="items-center hidden gap-8 md:flex">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-brand-600' : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href={ACADEMY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Academy
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </li>
        </ul>

        <a
          href="mailto:inntechlaabhq@gmail.com"
          className="hidden px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg md:inline-flex bg-brand-600 hover:bg-brand-700"
        >
          Get in touch
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-600 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="px-6 py-4 space-y-3 bg-white border-t border-gray-100 md:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium py-1 ${isActive ? 'text-brand-600' : 'text-gray-600'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={ACADEMY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1 text-sm font-medium text-brand-600"
          >
            Academy ↗
          </a>
          <a
            href="mailto:inntechlaabhq@gmail.com"
            className="block px-4 py-2 mt-2 text-sm font-medium text-center text-white rounded-lg bg-brand-600"
          >
            Get in touch
          </a>
        </div>
      )}
    </header>
  )
}
