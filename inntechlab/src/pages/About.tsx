import { Search, Handshake, PenTool, Zap, Mail, Phone } from 'lucide-react'

const values = [
  { icon: Search, title: 'Clarity', desc: 'We ask the right questions before writing a single line of code.' },
  { icon: Handshake, title: 'Partnership', desc: 'We treat every client project as if it were our own product.' },
  { icon: PenTool, title: 'Craft', desc: 'We care deeply about code quality, design detail, and user experience.' },
  { icon: Zap, title: 'Momentum', desc: 'We move fast, communicate clearly, and ship on time.' },
]

const team = [
  {
    name: 'Mkpuma Shedrach',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer specialising in React, Node.js, and scalable web architecture. Passionate about building tools that empower people across Africa and beyond.',
    initials: 'MS',
  },
]

const milestones = [
  { year: '2022', event: 'InnTechLab founded in Abakaliki, Nigeria.' },
  { year: '2023', event: 'Delivered 20+ projects across web, mobile, and design.' },
  { year: '2024', event: 'Launched the InnTechLab Academy and LMS platform.' },
  { year: '2025', event: 'Serving clients across 8+ countries globally.' },
]

export default function About() {
  return (
    <main className="px-6 pb-24 pt-28">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">Who we are</p>
          <h1 className="mb-4 text-4xl font-bold font-display text-gray-900">About InnTechLab</h1>
          <p className="max-w-2xl leading-relaxed text-gray-500">
            InnTechLab is a software development company based in Abakaliki, Nigeria.
            We build web apps, mobile apps, and digital products for businesses across
            Africa and beyond. We believe great software comes from clear thinking,
            honest communication, and disciplined execution.
          </p>
        </div>

        {/* Story */}
        <div className="p-10 mb-12 border border-gray-100 rounded-2xl">
          <h2 className="mb-5 text-xl font-bold font-display text-gray-900">Our story</h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-500">
            <p>
              InnTechLab was started with one goal: to build software that actually works for
              the people using it. We saw too many businesses in Nigeria and across Africa
              stuck with poor-quality websites, broken apps, and developers who disappeared
              after delivery.
            </p>
            <p>
              We started small — taking on projects for local businesses and startups, helping
              them launch faster and look credible online. Word spread, and we grew into a
              full-service development company handling everything from brand identity to
              complex full-stack platforms.
            </p>
            <p>
              Today we work with clients in Nigeria, the UK, the US, and across Africa.
              We're remote-first, deadline-driven, and genuinely invested in every project we take on.
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-12">
          <h2 className="mb-8 text-xl font-bold font-display text-gray-900">Timeline</h2>
          <div className="space-y-0">
            {milestones.map(({ year, event }, i) => (
              <div key={year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 border-2 rounded-full bg-brand-50 border-brand-200">
                    <div className="w-2 h-2 rounded-full bg-brand-600" />
                  </div>
                  {i < milestones.length - 1 && <div className="flex-1 w-px my-1 bg-gray-100" />}
                </div>
                <div className="pb-8">
                  <p className="mb-1 text-xs font-bold text-brand-600">{year}</p>
                  <p className="text-sm text-gray-600">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="mb-8 text-xl font-bold font-display text-gray-900">What we stand for</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 border border-gray-100 rounded-2xl">
                <div className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-brand-50">
                  <Icon className="w-4.5 h-4.5 text-brand-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="mb-8 text-xl font-bold font-display text-gray-900">The team</h2>
          <div className="flex justify-start">
            {team.map(({ name, role, bio, initials }) => (
              <div key={name} className="w-full max-w-sm p-8 border border-gray-100 rounded-2xl">
                <div className="flex items-center justify-center mb-4 text-lg font-bold rounded-full w-14 h-14 bg-brand-100 text-brand-700">
                  {initials}
                </div>
                <h3 className="text-base font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-brand-600 font-medium mt-0.5 mb-3">{role}</p>
                <p className="text-sm leading-relaxed text-gray-500">{bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="p-10 border border-gray-100 rounded-2xl bg-gray-50">
          <h2 className="mb-2 text-xl font-bold font-display text-gray-900">Work with us</h2>
          <p className="max-w-md mb-6 text-sm text-gray-500">
            We're always open to interesting projects. Reach out and let's see if we're a good fit.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:inntechlabhq@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700"
            >
              <Mail className="w-4 h-4" /> inntechlabhq@gmail.com
            </a>
            <a
              href="tel:+2349167071094"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors border border-gray-200 rounded-lg hover:bg-gray-100"
            >
              <Phone className="w-4 h-4" /> 09167071094
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
