import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Smartphone, Palette, ShoppingCart, Server, Wrench, X, CheckCircle } from 'lucide-react'
import PageSEO from '../components/PageSEO'
import api from '../lib/api'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Custom web application development using React, Next.js, and Node.js. We build fast, scalable, and SEO-friendly websites and platforms.',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile app development for iOS and Android using React Native. High performance with a single codebase.',
    tags: ['React Native', 'iOS', 'Android', 'Expo'],
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    desc: 'User-focused interface design in Figma. We create intuitive, modern, and conversion-focused user experiences.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Accessibility'],
  },
  {
    icon: Server,
    title: 'API & Backend Development',
    desc: 'Secure and scalable backend systems including REST APIs, GraphQL APIs, authentication, and cloud infrastructure.',
    tags: ['Express', 'REST', 'GraphQL', 'AWS'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Development',
    desc: 'Custom e-commerce platforms with payment integration, inventory management, and optimized checkout experiences.',
    tags: ['Paystack', 'Stripe', 'Custom CMS', 'Analytics'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    desc: 'Ongoing software maintenance, performance optimization, bug fixes, and feature updates.',
    tags: ['Performance', 'Security', 'Updates', 'Monitoring'],
  },
]

const engagements = [
  {
    name: 'Fixed Price',
    best: 'Best for defined projects',
    desc: 'Clear scope, timeline, and cost agreed upfront. No surprises.',
    items: ['Requirements doc & wireframes', 'Milestone-based delivery', 'Fixed budget & timeline', 'Post-launch support included'],
  },
  {
    name: 'Retainer',
    best: 'Best for ongoing work',
    desc: 'A dedicated block of hours each month for continuous development.',
    items: ['Priority response time', 'Flexible scope each month', 'Monthly billing', 'Ideal for growing products'],
    highlight: true,
  },
  {
    name: 'Hourly',
    best: 'Best for small tasks',
    desc: 'Pay only for what you need - great for audits, fixes, or consultations.',
    items: ['No long-term commitment', 'Billed per hour worked', 'Quick turnaround', 'Transparent time tracking'],
  },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your goals, users, timeline, and business needs before starting.' },
  { step: '02', title: 'Proposal & Scope', desc: 'Clear scope, timeline, and pricing with no hidden costs.' },
  { step: '03', title: 'Design & Development', desc: 'Iterative development with regular updates and transparent communication.' },
  { step: '04', title: 'Launch & Support', desc: 'Deployment, documentation, and post-launch support for your product.' },
]

interface QuoteModalProps {
  engagement: string
  onClose: () => void
}

function QuoteModal({ engagement, onClose }: QuoteModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/contact', {
        name,
        email,
        service: engagement,
        message: `Engagement model: ${engagement}\n\n${message}`,
      })
      setSent(true)
    } catch {
      setError('Failed to send. Please try again or email inntechlabhq@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-7" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-gray-900">Get a quote</h3>
            <p className="mt-0.5 text-xs text-brand-600 font-medium">{engagement} engagement</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-gray-900 mb-1">Request received!</p>
            <p className="text-sm text-gray-500">We'll get back to you within 24 hours.</p>
            <button onClick={onClose} className="mt-5 text-sm font-medium text-brand-600 hover:text-brand-700">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700">Full name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700">Email address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700">Tell us about your project *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="What do you want to build?"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold text-white rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Sending...' : 'Send request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Services() {
  const [quoteFor, setQuoteFor] = useState<string | null>(null)

  return (
    <main className="px-6 pb-24 pt-28">
      <PageSEO
        title="Web & Mobile App Development Services in Nigeria | InnTechLab"
        description="InnTechLab provides web development, mobile app development, UI/UX design, API development, e-commerce solutions, and software maintenance services for businesses in Nigeria, Africa, and globally."
        canonical="https://inntechlab.online/services"
      />

      {quoteFor && <QuoteModal engagement={quoteFor} onClose={() => setQuoteFor(null)} />}

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">What we do</p>
          <h1 className="text-4xl font-bold text-gray-900">Web & Mobile App Development Services</h1>
          <p className="max-w-xl mt-4 leading-relaxed text-gray-500">
            We provide web development, mobile app development, and custom software solutions
            for startups and businesses in Nigeria, Africa, and globally.
            View our <Link to="/projects" className="text-brand-600 underline">projects</Link> or
            learn more <Link to="/about" className="text-brand-600 underline">about us</Link>.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, tags }) => (
            <div key={title} className="flex flex-col transition-all border border-gray-100 rounded-2xl p-7 hover:border-brand-100 hover:shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 mb-5 rounded-lg bg-brand-50">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="mb-2 text-base font-semibold text-gray-900">{title}</h2>
              <p className="flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Models */}
        <div className="mb-20">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">How we engage</p>
            <h2 className="text-2xl font-bold text-gray-900">Engagement models</h2>
            <p className="mt-2 text-sm text-gray-500">
              Choose the model that fits your project. Not sure?{' '}
              <Link to="/contact" className="text-brand-600 underline">Let's talk.</Link>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {engagements.map(({ name, best, desc, items, highlight }) => (
              <div
                key={name}
                className={`flex flex-col p-7 rounded-2xl border ${
                  highlight
                    ? 'border-brand-200 bg-brand-50 ring-1 ring-brand-200'
                    : 'border-gray-100 bg-white'
                }`}
              >
                {highlight && (
                  <span className="self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-600 text-white mb-4">Most popular</span>
                )}
                <h3 className="text-base font-bold text-gray-900">{name}</h3>
                <p className="mt-1 mb-3 text-xs font-medium text-brand-600">{best}</p>
                <p className="mb-5 text-sm text-gray-500 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mt-auto">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setQuoteFor(name)}
                  className={`mt-6 block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    highlight
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Get a quote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">How it works</p>
            <h2 className="text-2xl font-bold text-gray-900">Our development process</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, desc }) => (
              <div key={step}>
                <p className="mb-3 text-5xl font-black leading-none text-gray-100">{step}</p>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 text-center border border-gray-100 rounded-2xl bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Start your project today</h2>
          <p className="max-w-md mx-auto mt-3 text-gray-500">
            Contact us to discuss your project and get a clear roadmap for building your product.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 mt-6 text-sm font-semibold text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700"
          >
            Book a free consultation
          </Link>
        </div>

      </div>
    </main>
  )
}
