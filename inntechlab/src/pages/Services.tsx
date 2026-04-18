import { Code2, Smartphone, Palette, ShoppingCart, Server, Wrench } from 'lucide-react'
import PageSEO from '../components/PageSEO'

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

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your goals, users, timeline, and business needs before starting.' },
  { step: '02', title: 'Proposal & Scope', desc: 'Clear scope, timeline, and pricing with no hidden costs.' },
  { step: '03', title: 'Design & Development', desc: 'Iterative development with regular updates and transparent communication.' },
  { step: '04', title: 'Launch & Support', desc: 'Deployment, documentation, and post-launch support for your product.' },
]

export default function Services() {
  return (
    <main className="px-6 pb-24 pt-28">

      <PageSEO
        title="Web & Mobile App Development Services in Nigeria | InnTechLab"
        description="InnTechLab provides web development, mobile app development, UI/UX design, API development, e-commerce solutions, and software maintenance services for businesses in Nigeria, Africa, and globally."
        canonical="https://inntechlab.online/services"
      />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">
            What we do
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Web & Mobile App Development Services
          </h1>

          <p className="max-w-xl mt-4 leading-relaxed text-gray-500">
            We provide web development, mobile app development, and custom software solutions 
            for startups and businesses in Nigeria, Africa, and globally. 
            View our <a href="/projects" className="text-brand-600 underline">projects</a> 
            or learn more <a href="/about" className="text-brand-600 underline">about us</a>.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, tags }) => (
            <div
              key={title}
              className="flex flex-col transition-all border border-gray-100 rounded-2xl p-7 hover:border-brand-100 hover:shadow-sm"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-5 rounded-lg bg-brand-50">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>

              <h2 className="mb-2 text-base font-semibold text-gray-900">
                {title}
              </h2>

              <p className="flex-1 text-sm leading-relaxed text-gray-500">
                {desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO Section */}
        <div className="p-10 mb-20 border border-gray-100 rounded-2xl">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Software Development Services in Nigeria
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            InnTechLab is a software development company in Nigeria offering professional web and 
            mobile application development services. We help startups and businesses build scalable, 
            high-performance digital products that solve real-world problems and grow with their users.
          </p>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">
              How it works
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              Our development process
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, desc }) => (
              <div key={step}>
                <p className="mb-3 text-5xl font-black leading-none text-gray-100">
                  {step}
                </p>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 text-center border border-gray-100 rounded-2xl bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">
            Start your project today
          </h2>
          <p className="max-w-md mx-auto mt-3 text-gray-500">
            Contact us to discuss your project and get a clear roadmap for building your product.
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