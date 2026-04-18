import { useState } from 'react'
import PageSEO from '../components/PageSEO'
import { ExternalLink, GitBranch } from 'lucide-react'
import { useProjects } from '../lib/useProjects'

const categories = [
  { id: '', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'saas', label: 'SaaS' },
]

const categoryColors = {
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

      <PageSEO
        title="Projects | Web & Mobile App Development Portfolio - InnTechLab"
        description="Explore InnTechLab’s portfolio of web development, mobile app development, and custom software projects for startups and businesses in Nigeria, Africa, and globally."
        canonical="https://inntechlab.online/projects"
      />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">
            Our work
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Web & Mobile App Development Projects
          </h1>

          <p className="max-w-xl mt-3 text-gray-500">
            A selection of web and mobile app development projects we've built for startups 
            and businesses. Learn more <a href="/services" className="text-brand-600 underline">about our services</a> 
            or <a href="/about" className="text-brand-600 underline">about us</a>.
          </p>
        </div>

        {/* SEO Section */}
        <div className="p-10 mb-12 border border-gray-100 rounded-2xl">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Our Software Development Portfolio
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            InnTechLab is a software development company in Nigeria delivering web applications,
            mobile apps, and custom software solutions. Our portfolio showcases scalable,
            high-performance digital products built for real-world use across Africa and globally.
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

        {/* Loading */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-16 bg-gray-100 rounded-full" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                  <div className="h-3 w-full bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="py-24 text-center">
            <p className="text-gray-500">Failed to load projects.</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && (
          <>
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-gray-400">No projects found.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(project => (
                  <div
                    key={project._id}
                    className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl hover:shadow-sm"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} - web or mobile app development project by InnTechLab`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-6">
                      <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[project.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {project.category}
                      </span>

                      <h2 className="mb-2 text-base font-semibold text-gray-900">
                        {project.title}
                      </h2>

                      <p className="flex-1 text-sm text-gray-500 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map(t => (
                          <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-brand-600">
                            <ExternalLink className="w-3.5 h-3.5" /> Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-gray-500">
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
          <h2 className="text-xl font-bold text-gray-900">
            Have a project in mind?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Let's build something great together.
          </p>
          <a
            href="mailto:inntechlabhq@gmail.com"
            className="inline-block px-6 py-3 mt-6 text-sm font-semibold text-white rounded-lg bg-brand-600"
          >
            Get in touch
          </a>
        </div>

      </div>
    </main>
  )
}