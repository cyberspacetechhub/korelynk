import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Fidel',
    role: 'Business Owner',
    review:
      'InnTechLab transformed how we operate online. Their team was professional, responsive, and delivered exactly what we needed. The quality of work is outstanding.',
    rating: 5,
    initials: 'FI',
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    name: 'Valentine',
    role: 'Startup Founder',
    review:
      'Working with InnTechLab was one of the best decisions I made for my startup. They understood our vision from day one and built a platform that our users genuinely love.',
    rating: 5,
    initials: 'VA',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Sunday',
    role: 'Product Manager',
    review:
      'Their attention to detail, clear communication, and ability to deliver on time sets them apart. Our product launched ahead of schedule and exceeded expectations.',
    rating: 5,
    initials: 'SU',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Divine',
    role: 'Software Developer · Academy Graduate',
    review:
      'The InnTechLab Academy completely changed my career. I went from zero experience to building full-stack apps with React and Node.js. I landed my first dev job within two months.',
    rating: 5,
    initials: 'DI',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Chukwuemeka',
    role: 'E-commerce Entrepreneur',
    review:
      'My online store went from zero to processing real orders within weeks. The payment integration was seamless and my customers always compliment how easy the site is to use.',
    rating: 5,
    initials: 'CH',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Blessing',
    role: 'NGO Director',
    review:
      'InnTechLab built our website and donor management system. They were patient, thorough, and genuinely cared about our mission. The platform has helped us reach far more donors.',
    rating: 5,
    initials: 'BL',
    color: 'bg-pink-100 text-pink-700',
  },
]

export default function Testimonials() {
  return (
    <section className="px-6 py-24 bg-white border-gray-100 border-y">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">What clients say</p>
          <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, review, rating, initials, color }) => (
            <div key={name} className="flex flex-col p-6 border border-gray-100 rounded-2xl bg-gray-50">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-gray-700 mb-5">
                "{review}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
