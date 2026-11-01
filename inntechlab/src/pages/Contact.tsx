import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import PageSEO from '../components/PageSEO'
import api from '../lib/api'

const PROJECT_TYPES = ['Web Development', 'Mobile App', 'UI/UX Design', 'E-commerce', 'API / Backend', 'Other']
const BUDGETS = ['Under ₦200k', '₦200k – ₦500k', '₦500k – ₦1M', '₦1M – ₦3M', '₦3M+', 'Not sure yet']

interface FormState {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', projectType: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/contacts', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.projectType || 'Project inquiry',
        message: `Budget: ${form.budget}\n\n${form.message}`,
      })
      setSent(true)
      setForm(EMPTY)
    } catch {
      setError('Something went wrong. Please email us directly at inntechlabhq@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-6 pb-24 pt-28">
      <PageSEO
        title="Contact InnTechLab | Start Your Web or Mobile App Project"
        description="Get in touch with InnTechLab to discuss your web app, mobile app, or software project. Based in Nigeria, serving clients worldwide."
        canonical="/contact"
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">Get in touch</p>
          <h1 className="mb-4 text-4xl font-bold font-display text-gray-900">Start a project</h1>
          <p className="max-w-xl text-gray-500 leading-relaxed">
            Tell us about your project and we'll get back to you within 24 hours with a clear plan and honest pricing.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <p className="mb-5 text-sm font-semibold text-gray-900">Contact details</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <a href="mailto:inntechlabhq@gmail.com" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                    inntechlabhq@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <a href="tel:+2349167071094" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                    +234 916 707 1094
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Abakaliki, Ebonyi State, Nigeria</span>
                </li>
              </ul>
            </div>

            <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50">
              <p className="mb-1 text-sm font-semibold text-gray-900">Response time</p>
              <p className="text-sm text-gray-500">We reply to all inquiries within 24 hours on business days.</p>
            </div>

            <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50">
              <p className="mb-1 text-sm font-semibold text-gray-900">Prefer WhatsApp?</p>
              <a
                href={`https://wa.me/2347067659889?text=${encodeURIComponent('Hi InnTechLab, I would like to discuss a project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-white bg-[#25D366] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center border border-gray-100 rounded-2xl bg-gray-50">
                <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h2>
                <p className="text-sm text-gray-500 max-w-sm">
                  Thanks for reaching out. We'll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-700">Full name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your name"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-700">Email address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-700">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+234 ..."
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-700">Project type</label>
                    <select
                      value={form.projectType}
                      onChange={set('projectType')}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select type...</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-700">Budget range</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, budget: b }))}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                          form.budget === b
                            ? 'bg-brand-600 text-white border-brand-600'
                            : 'border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-700">Tell us about your project *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Describe what you want to build, your goals, and any relevant details..."
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
