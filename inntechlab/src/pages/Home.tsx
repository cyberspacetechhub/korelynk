import { Link } from 'react-router-dom'
import {
  ArrowRight, Code2, Smartphone, Palette, ShoppingCart,
  Globe, Users, Clock, CheckCircle, ExternalLink
} from 'lucide-react'
import { useProjects } from '../lib/useProjects'
import Testimonials from '../components/Testimonials'
import PageSEO from '../components/PageSEO'
import BrandedPlaceholder from '../components/BrandedPlaceholder'

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '30+', label: 'Happy clients' },
  { value: '3+', label: 'Years experience' },
  { value: '99%', label: 'Satisfaction rate' },
]

const services = [
  { icon: Code2, title: 'Web Development', desc: 'React, Next.js, Node.js — from landing pages to full SaaS platforms.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform iOS & Android apps with React Native.' },
  { icon: Palette, title: 'UI / UX Design', desc: 'Clean, user-centered interfaces designed in Figma.' },
  { icon: ShoppingCart, title: 'E-commerce', desc: 'Custom stores with Paystack & Stripe payment integration.' },
]

const process = [
  { step: '01', title: 'Discovery', desc: 'We learn your goals, users, and constraints before writing any code.' },
  { step: '02', title: 'Design', desc: 'Wireframes and high-fidelity designs reviewed and approved by you.' },
  { step: '03', title: 'Build', desc: 'Iterative development with regular demos and clear communication.' },
  { step: '04', title: 'Launch', desc: 'Deployment, testing, and ongoing support after go-live.' },
]

const categoryColors: Record<string, string> = {
  web: 'bg-indigo-50 text-indigo-600',
  mobile: 'bg-sky-50 text-sky-600',
  ecommerce: 'bg-emerald-50 text-emerald-600',
  saas: 'bg-violet-50 text-violet-600',
}

export default function Home() {
  const { data: projects = [], isLoading } = useProjects({ featured: true })
  const featured = projects.slice(0, 3)

  return (
    <main>
      <PageSEO
        title="InnTechLab | Web & Mobile App Development Company in Nigeria"
        description="InnTechLab builds high-quality web apps, mobile apps, and digital products for startups and businesses. Based in Nigeria, serving clients worldwide."
        canonical="/"
      />
      {/* Hero */}
      <section className="px-6 pb-0 bg-white pt-36">
        <div className="max-w-6xl mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="pb-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 tracking-wide uppercase mb-8">
                <Globe className="w-3.5 h-3.5" />
                Web · Mobile · Design
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-display text-gray-900 leading-[1.1] tracking-tight">
                We build web & mobile apps<br />
                <span className="text-brand-600">that drive business growth.</span>
              </h1>
              <p className="max-w-xl mt-6 text-lg leading-relaxed text-gray-500">
                InnTechLab is a software development company based in Nigeria. We design
                and build web apps, mobile apps, and digital products that help startups
                and businesses grow.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Explore our <Link to="/projects" className="underline text-brand-600">projects</Link> or view our <Link to="/services" className="underline text-brand-600">services</Link>.
              </p>
              <div className="flex flex-col gap-4 mt-10 sm:flex-row">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700"
                >
                  View our work <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:inntechlabhq@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Start a project
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative pb-10 lg:pb-16">
              <div className="overflow-hidden border border-gray-100 shadow-2xl rounded-2xl shadow-gray-200">
                <img
                  src="/hero-image-coding-screen.webp"
                  alt="Web and mobile app development workspace at InnTechLab"
                  className="w-full h-56 sm:h-72 lg:h-[480px] object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-100 shadow-lg bottom-2 left-4 lg:bottom-16 lg:-left-5 rounded-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-gray-800">Available for new projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 border-gray-100 border-y bg-gray-50 py-14">
        <div className="grid max-w-6xl grid-cols-2 gap-8 mx-auto text-center md:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-bold text-gray-900">{value}</p>
              <p className="mt-1 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">What we do</p>
            <h2 className="text-3xl font-bold text-gray-900 font-display">Services</h2>
            <p className="max-w-lg mt-3 text-gray-500">
              End-to-end digital product development — from idea to deployment.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 transition-all border border-gray-100 rounded-2xl hover:border-brand-100 hover:shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-lg bg-brand-50">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
              See all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-24 border-gray-100 bg-gray-50 border-y">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">Our work</p>
              <h2 className="text-3xl font-bold text-gray-900 font-display">Featured projects</h2>
            </div>
            <Link to="/projects" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="overflow-hidden border border-gray-100 rounded-2xl animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="w-1/3 h-4 bg-gray-200 rounded" />
                    <div className="w-2/3 h-5 bg-gray-200 rounded" />
                    <div className="w-full h-4 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map(project => (
                <div key={project._id} className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 rounded-2xl hover:shadow-sm hover:border-gray-200">
                  <div className="relative h-48 overflow-hidden">
                    
                      <BrandedPlaceholder title={project.title} subtitle={project.category} aspectRatio="16/9" />
                    
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[project.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {project.category}
                    </span>
                    <h3 className="mb-2 text-base font-semibold text-gray-900">{project.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map(t => (
                        <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{t}</span>
                      ))}
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
                      >
                        Live site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'InnTechLab Platform', category: 'saas', desc: 'Full-stack company platform with admin dashboard, blog, and academy.', stack: ['React', 'Node.js', 'MongoDB'] },
                { title: 'E-commerce Store', category: 'ecommerce', desc: 'Custom online store with Paystack integration and order tracking.', stack: ['Next.js', 'Stripe', 'PostgreSQL'] },
                { title: 'Healthcare Portal', category: 'web', desc: 'Patient management system with appointment booking and records.', stack: ['React', 'Express', 'MongoDB'] },
              ].map(p => (
                <div key={p.title} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
                  <BrandedPlaceholder title={p.title} subtitle={p.category} aspectRatio="16/9" />
                  <div className="flex flex-col flex-1 p-6">
                    <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[p.category] ?? 'bg-gray-100 text-gray-600'}`}>{p.category}</span>
                    <h3 className="mb-2 text-base font-semibold text-gray-900">{p.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-500">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map(t => <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Process */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">How we work</p>
            <h2 className="text-3xl font-bold text-gray-900 font-display">Our process</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <p className="mb-4 text-5xl font-black leading-none text-gray-100">{step}</p>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="px-6 py-24 border-gray-100 bg-gray-50 border-y">
        <div className="grid items-center max-w-6xl gap-16 mx-auto md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">Why InnTechLab</p>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 font-display">We deliver results, not just code</h2>
            <p className="mb-8 leading-relaxed text-gray-500">
              We take on a limited number of projects at a time so every client gets
              our full focus. You work directly with the people building your product —
              no account managers, no handoffs.
            </p>
            <ul className="space-y-4">
              {[
                { icon: CheckCircle, text: 'Clean, maintainable code with full documentation' },
                { icon: Clock, text: 'On-time delivery with transparent progress updates' },
                { icon: Users, text: 'Direct access to the developers building your product' },
                { icon: Globe, text: 'Remote-first team serving clients globally' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Avg. project delivery', value: '6 weeks' },
              { label: 'Client retention rate', value: '94%' },
              { label: 'Countries served', value: '8+' },
              { label: 'Lines of code shipped', value: '1M+' },
            ].map(({ label, value }) => (
              <div key={label} className="p-6 bg-white border border-gray-100 rounded-2xl">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="mt-1 text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 bg-brand-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white font-display">Ready to build your web or mobile app?</h2>
          <p className="max-w-xl mx-auto mt-4 text-brand-100">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
            <a
              href="mailto:inntechlabhq@gmail.com"
              className="px-8 py-3 text-sm font-semibold transition-colors bg-white rounded-lg text-brand-600 hover:bg-brand-50"
            >
              Start a conversation
            </a>
            <Link
              to="/about"
              className="px-8 py-3 text-sm font-semibold text-white transition-colors border rounded-lg border-white/30 hover:bg-white/10"
            >
              Learn about us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
