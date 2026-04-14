import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Fidel',
    role: 'Business Owner',
    review:
      'InnTechLab transformed how we operate online. Their team was professional, responsive, and delivered exactly what we needed. The quality of work is outstanding — I would recommend them to any business looking to grow digitally.',
    rating: 5,
    initials: 'FI',
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    name: 'Valentine',
    role: 'Startup Founder',
    review:
      'Working with InnTechLab was one of the best decisions I made for my startup. They understood our vision from day one and built a platform that our users genuinely love. Fast, clean, and reliable — exactly what you want from a dev team.',
    rating: 5,
    initials: 'VA',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Sunday',
    role: 'Product Manager',
    review:
      'I have worked with several development agencies before, but InnTechLab stands out. Their attention to detail, clear communication, and ability to deliver on time sets them apart. Our product launched ahead of schedule and exceeded expectations.',
    rating: 5,
    initials: 'SU',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Divine',
    role: 'Software Developer — InnTechLab Academy Graduate',
    review:
      'The InnTechLab Academy training completely changed my career. Before joining, I had zero professional experience. After the program, I was building full-stack applications with React and Node.js confidently. I landed my first dev job within two months of completing the course. The curriculum is practical, the mentorship is real, and the community keeps pushing you forward. Best investment I ever made.',
    rating: 5,
    initials: 'DI',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Chukwuemeka',
    role: 'E-commerce Entrepreneur',
    review:
      'My online store went from zero to processing real orders within weeks of launching with InnTechLab. The payment integration was seamless and the design is clean and professional. My customers always compliment how easy the site is to use.',
    rating: 5,
    initials: 'CH',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Blessing',
    role: 'NGO Director',
    review:
      'InnTechLab built our organisation\'s website and donor management system. They were patient, thorough, and genuinely cared about our mission. The platform has helped us reach more donors and manage our programs far more efficiently.',
    rating: 5,
    initials: 'BL',
    color: 'bg-pink-100 text-pink-700',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const go = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setIsAnimating(false)
    }, 200)
  }, [isAnimating])

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length)
  const next = useCallback(() => go((current + 1) % testimonials.length), [current, go])

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[current]

  return (
    <section className="px-6 py-24 bg-white border-gray-100 border-y">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">What clients say</p>
          <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
        </div>

        <div className="relative">
          {/* Slide */}
          <div
            className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="p-8 border border-gray-100 rounded-2xl bg-gray-50 md:p-12">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="max-w-3xl mb-8 text-base leading-relaxed text-gray-700 md:text-lg">
                "{t.review}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-brand-600'
                      : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="flex items-center justify-center text-gray-500 transition-colors border border-gray-200 rounded-full w-9 h-9 hover:border-brand-300 hover:text-brand-600"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="flex items-center justify-center text-gray-500 transition-colors border border-gray-200 rounded-full w-9 h-9 hover:border-brand-300 hover:text-brand-600"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
