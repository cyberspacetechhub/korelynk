import { useState } from 'react'
import { ExternalLink, GitBranch } from 'lucide-react'
import { useProjects } from '../lib/useProjects'

const categories = [
  { id: '', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'saas', label: 'SaaS' },
]

const categoryColors: Record<string, string> = {
  web: 'bg-indigo-50 text-indigo-600',
  mobile: 'bg-sky-50 text-sky-600',
  ecommerce: 'bg-emerald-50 text-emerald-600',
  saas: 'bg-violet-50 text-violet-600',
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('')
  const { data: allProjects = [], isLoading, isError } = useProjects()

  const filtered = activeCategory
    ? allProjects.filter(p => p.category === activeCategory)
    : allProjects

  return (
    <main className="px-6 pb-24 pt-28">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">Our work</p>
          <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
          <p className="max-w-xl mt-3 text-gray-500">
            A selection of products we've designed and built for clients and ourselves.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === id
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* States */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-16 bg-gray-100 rounded-full" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                  <div className="h-3 w-full bg-gray-100 rounded-full" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded-full" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-6 w-14 bg-gray-100 rounded-full" />
                    <div className="h-6 w-14 bg-gray-100 rounded-full" />
                    <div className="h-6 w-14 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="py-24 text-center">
            <p className="text-gray-500">Failed to load projects. Please try again later.</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && (
          <>
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-gray-400">No projects found in this category.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(project => (
                  <div
                    key={project._id}
                    className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 rounded-2xl hover:shadow-sm hover:border-gray-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[project.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {project.category}
                      </span>
                      <h3 className="mb-2 text-base font-semibold text-gray-900">{project.title}</h3>
                      <p className="flex-1 text-sm leading-relaxed text-gray-500 line-clamp-3">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map(t => (
                          <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700">
                            <ExternalLink className="w-3.5 h-3.5" /> Live site
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">
                            <GitBranch className="w-3.5 h-3.5" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="p-10 mt-16 text-center border border-gray-100 rounded-2xl bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Have a project in mind?</h2>
          <p className="mt-2 text-sm text-gray-500">Let's build it together.</p>
          <a
            href="mailto:inntechlabhq@gmail.com"
            className="inline-block px-6 py-3 mt-6 text-sm font-semibold text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700"
          >
            Get in touch
          </a>
        </div>
      </div>
    </main>
  )
}
