import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="flex flex-col justify-between max-w-6xl gap-6 px-6 py-12 mx-auto md:items-center md:flex-row">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/ITL-LOGO1-dark.svg" alt="InnTechLab" className="w-auto h-7" />
            <span className="text-base font-bold tracking-tight text-gray-900">
              Inn<span className="text-brand-600">Tech</span>Lab
            </span>
          </Link>
          <p className="mt-1 text-sm text-gray-400">Building digital products that matter.</p>
        </div>

        <nav className="flex gap-6 text-sm text-gray-500">
          <Link to="/" className="transition-colors hover:text-gray-900">Home</Link>
          <Link to="/services" className="transition-colors hover:text-gray-900">Services</Link>
          <Link to="/projects" className="transition-colors hover:text-gray-900">Projects</Link>
          <Link to="/about" className="transition-colors hover:text-gray-900">About</Link>
        </nav>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} InnTechLab. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
