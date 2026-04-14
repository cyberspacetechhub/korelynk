import { Code2, Smartphone, Palette, ShoppingCart, Server, Wrench } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Full-stack web applications built with React, Next.js, Node.js, and modern databases. From landing pages to complex SaaS platforms.',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Cross-platform mobile apps for iOS and Android using React Native. Native performance with a single codebase.',
    tags: ['React Native', 'iOS', 'Android', 'Expo'],
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    desc: 'Clean, intuitive interfaces designed in Figma. We focus on user experience first, then bring it to life with pixel-perfect implementation.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Accessibility'],
  },
  {
    icon: Server,
    title: 'API & Backend',
    desc: 'Robust REST and GraphQL APIs, authentication systems, third-party integrations, and cloud infrastructure setup.',
    tags: ['Express', 'REST', 'GraphQL', 'AWS'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    desc: 'Custom online stores with payment integration, inventory management, and seamless checkout experiences.',
    tags: ['Paystack', 'Stripe', 'Custom CMS', 'Analytics'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    desc: 'Ongoing support, performance monitoring, bug fixes, and feature additions to keep your product running smoothly.',
    tags: ['Performance', 'Security', 'Updates', 'Monitoring'],
  },
]

const process = [
  { step: '01', title: 'Discovery call', desc: 'We understand your goals, users, timeline, and budget before anything else.' },
  { step: '02', title: 'Proposal & scope', desc: 'A clear written scope, timeline, and fixed price — no surprises.' },
  { step: '03', title: 'Design & build', desc: 'Iterative development with weekly demos and direct Slack communication.' },
  { step: '04', title: 'Launch & support', desc: 'Deployment, handover, documentation, and 30-day post-launch support.' },
]

export default function Services() {
  return (
    <main className="px-6 pb-24 pt-28">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">What we do</p>
          <h1 className="text-4xl font-bold text-gray-900">Services</h1>
          <p className="max-w-xl mt-4 leading-relaxed text-gray-500">
            End-to-end digital product development — from idea to deployment and beyond.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, tags }) => (
            <div key={title} className="flex flex-col transition-all border border-gray-100 rounded-2xl p-7 hover:border-brand-100 hover:shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 mb-5 rounded-lg bg-brand-50">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">How it works</p>
            <h2 className="text-2xl font-bold text-gray-900">Our engagement process</h2>
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
          <h2 className="text-2xl font-bold text-gray-900">Not sure what you need?</h2>
          <p className="max-w-md mx-auto mt-3 text-gray-500">
            Let's talk. We'll help you figure out the right approach for your project.
          </p>
          <a
            href="mailto:inntechlabhq@gmail.com"
            className="inline-block px-6 py-3 mt-6 text-sm font-semibold text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700"
          >
            Book a free consultation
          </a>
        </div>
      </div>
    </main>
  )
}
