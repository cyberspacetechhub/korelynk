import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, Users, Star, Play, CheckCircle, Zap } from 'lucide-react';
import axios from '../../api/axios';
import SEO from '../SEO';
import Testimonials from '../Testimonials';
import BlogPreview from '../BlogPreview';
import CodeSamplesPreview from '../CodeSamplesPreview';
import TechStackMarquee from '../TechStackMarquee';
import BrandedPlaceholder from '../BrandedPlaceholder';

const STATS = [
  { number: '500+', label: 'Students Enrolled' },
  { number: '20+',  label: 'Courses Available' },
  { number: '100+', label: 'Free Tutorials' },
  { number: '99%',  label: 'Satisfaction Rate' },
];

const WHY_US = [
  { icon: BookOpen,     title: 'Structured Learning',    desc: 'Carefully designed curricula that take you from zero to job-ready.' },
  { icon: Code2,        title: 'Hands-on Projects',      desc: 'Build real projects you can add to your portfolio from day one.' },
  { icon: Users,        title: 'Expert Instructors',     desc: 'Learn from practitioners who build real products every day.' },
  { icon: Zap,          title: 'Self-paced & Live',      desc: 'Choose between self-paced tutorials or live instructor-led classes.' },
  { icon: CheckCircle,  title: 'Free Tutorials',         desc: 'Hundreds of free lessons covering HTML, CSS, JS, React, Node and more.' },
  { icon: Star,         title: 'Career Support',         desc: 'Resume reviews, mock interviews, and job placement assistance.' },
];

const TechIcon = ({ name }) => {
  const icons = {
    HTML: (
      <svg viewBox="0 0 32 32" className="w-8 h-8"><path fill="#e44d26" d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3z"/><path fill="#f16529" d="M16 27.1V5.1H25l-1.8 20z"/><path fill="#ebebeb" d="M16 13.5H11.5l-.3-3.5H16V6.6H7.8l.8 9h7.4zm0 8.4l-.1.1-3.7-1-.2-2.7H8.6l.5 5.5 6.9 1.9z"/><path fill="#fff" d="M16 13.5v3.4h4.2l-.4 4.6-3.8 1v3.4l6.9-1.9.1-.6 1-11.5.1-.9H16z"/></svg>
    ),
    CSS: (
      <svg viewBox="0 0 32 32" className="w-8 h-8"><path fill="#1572b6" d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3z"/><path fill="#33a9dc" d="M16 27.1V5.1H25l-1.8 20z"/><path fill="#fff" d="M16 13.5h4.5l.3-3.5H16V6.6h8.2l-.8 9H16zm0 8.4v-3.4l.1.1 3.7-1 .2-2.7h3.4l-.5 5.5-6.9 1.9z"/><path fill="#ebebeb" d="M16 13.5v3.4h-4.2l-.4-4.6 3.8 1V10l-6.9 1.9-.1.6-1 11.5-.1.9H16v-3.4l-3.7-1-.2-2.7H16z"/></svg>
    ),
    JavaScript: (
      <svg viewBox="0 0 32 32" className="w-8 h-8"><rect width="32" height="32" rx="3" fill="#f7df1e"/><path d="M19.5 25.6c.6 1 1.4 1.7 2.8 1.7 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.6-3.6 4-3.6 1.7 0 3 .6 3.9 2.2l-2.1 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.2 1.7 1.7l.7.3c2.3 1 3.6 2 3.6 4.3 0 2.5-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.8l2-.1zM10.5 25.9c.4.7.8 1.3 1.7 1.3.9 0 1.4-.3 1.4-1.7v-9.1h2.6v9.2c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4-2.5l2.3-1.2z"/></svg>
    ),
    React: (
      <svg viewBox="0 0 32 32" className="w-8 h-8"><circle cx="16" cy="16" r="2.8" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1.2"><ellipse cx="16" cy="16" rx="11" ry="4.2"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)"/></g></svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 32 32" className="w-8 h-8"><path fill="#83cd29" d="M16 3L4 9.8v12.4L16 29l12-6.8V9.8z"/><path fill="#404137" d="M16 3L4 9.8v12.4L16 29V3z" opacity=".15"/><path fill="#fff" d="M16 8.5c-.4 0-.7.1-1 .3l-6.5 3.7c-.6.4-1 1-1 1.7v7.4c0 .7.4 1.4 1 1.7l1.7 1c.8.4 1.1.4 1.5.4 1.2 0 1.9-.7 1.9-2v-7.3h-1.9v7.3c0 .5-.5.9-1.4.5l-1.8-1V14c0-.2.1-.4.3-.5l6.5-3.7c.2-.1.4-.1.6 0l6.5 3.7c.2.1.3.3.3.5v7.4c0 .2-.1.4-.3.5l-6.5 3.7c-.2.1-.4.1-.6 0l-1.7-1c-.1-.1-.3-.1-.4 0-.5.3-.6.3-1.1.5.1.1.3.2.4.3l1.7 1c.3.2.6.3 1 .3s.7-.1 1-.3l6.5-3.7c.6-.4 1-1 1-1.7V14c0-.7-.4-1.4-1-1.7L17 8.8c-.3-.2-.6-.3-1-.3z"/></svg>
    ),
    Python: (
      <svg viewBox="0 0 32 32" className="w-8 h-8"><path fill="#3776ab" d="M15.9 3C11 3 11.3 5.1 11.3 5.1l.1 2.1h4.7v.6H8.8S6 7.5 6 12.5s2.4 4.8 2.4 4.8h1.5v-2.3s-.1-2.4 2.4-2.4h4.1s2.3 0 2.3-2.2V5.3S19.1 3 15.9 3zm-2.3 1.3c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z"/><path fill="#ffd43b" d="M16.1 29c4.9 0 4.6-2.1 4.6-2.1l-.1-2.1h-4.7v-.6h7.3s2.8.3 2.8-4.7-2.4-4.8-2.4-4.8h-1.5v2.3s.1 2.4-2.4 2.4h-4.1s-2.3 0-2.3 2.2v4.1S12.9 29 16.1 29zm2.3-1.3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z"/></svg>
    ),
  };
  return icons[name] || null;
};

const TECH_PATHS = [
  { name: 'HTML',       href: '/academy', color: 'from-orange-500 to-red-500' },
  { name: 'CSS',        href: '/academy', color: 'from-blue-500 to-cyan-500' },
  { name: 'JavaScript', href: '/academy', color: 'from-yellow-400 to-orange-500' },
  { name: 'React',      href: '/academy', color: 'from-cyan-500 to-blue-500' },
  { name: 'Node.js',    href: '/academy', color: 'from-green-500 to-emerald-500' },
  { name: 'Python',     href: '/academy', color: 'from-blue-600 to-yellow-500' },
];

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    axios.get('/courses?limit=3')
      .then(r => { if (r.data.success) setFeaturedCourses(r.data.data.slice(0, 3)); })
      .catch(() => {})
      .finally(() => setLoadingCourses(false));
  }, []);

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO
        title="InnTechLab Academy — Learn to Code & Build Real Projects"
        description="Master web development, mobile apps, and software engineering with InnTechLab Academy. Structured courses, free tutorials, and live classes taught by industry experts."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-midnight transition-colors">
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 opacity-40 bg-gradient-glow" />
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-electric-blue/20 blur-3xl animate-pulse" />
          <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-electric-violet/20 blur-3xl animate-pulse" />
        </div>
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric-blue/5 via-transparent to-electric-violet/5" />
        </div>

        <div className="container relative px-6 py-20 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-wide uppercase rounded-full bg-electric-blue/10 text-electric-cyan border border-electric-blue/20">
            <BookOpen className="w-3.5 h-3.5" /> Learn · Build · Get Hired
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-7xl font-display dark:text-white">
            Learn to code.<br />
            <span className="text-transparent bg-gradient-electric bg-clip-text">
              Build real projects.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            InnTechLab Academy offers structured courses, free tutorials, and live classes
            to take you from beginner to job-ready developer.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-lg group bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50"
            >
              Browse Courses <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/academy"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 border border-gray-300 rounded-lg dark:text-white dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <Play className="w-4 h-4 mr-2" /> Free Tutorials
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-electric">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="mb-1 text-4xl font-bold text-white lg:text-5xl font-display">{number}</div>
                <div className="text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack Marquee ───────────────────────────────────────────── */}
      <TechStackMarquee />

      {/* ── Featured Courses ─────────────────────────────────────────────── */}
      <section className="py-24 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-electric-cyan">What we offer</p>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Featured Courses</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Expert-led, project-based courses designed to get you hired.
            </p>
          </div>

          {loadingCourses ? (
            <div className="grid gap-8 md:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} className="overflow-hidden border border-gray-200 dark:border-white/10 rounded-2xl animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-white/10" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              {featuredCourses.map(course => (
                <div key={course._id} className="overflow-hidden transition-all duration-300 border border-gray-200 group dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-electric-blue/40 hover:shadow-lg dark:hover:bg-white/10">
                  <div className="relative h-48 overflow-hidden">
                    {course.featuredImage ? (
                      <img src={course.featuredImage} alt={course.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <BrandedPlaceholder title={course.title} subtitle={course.category} className="h-48" aspectRatio="16/9" />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-black/60">{course.level}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="px-3 py-1 mb-3 inline-block text-xs font-medium rounded-full bg-electric-blue/10 text-electric-cyan">{course.category}</span>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white group-hover:text-electric-cyan transition-colors">{course.title}</h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">₦{course.price?.toLocaleString()}</span>
                      <Link to={`/courses/${course._id}`} className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-electric hover:shadow-md">
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-10 text-center">
            <Link to="/courses" className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
              View All Courses <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Free Tutorials ───────────────────────────────────────────────── */}
      <section className="py-24 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-electric-cyan">100% Free</p>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Start Learning for Free</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Hundreds of free tutorials covering the full web development stack.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {TECH_PATHS.map(({ name, href, color }) => (
              <Link
                key={name}
                to={href}
                className="flex items-center gap-3 px-6 py-4 transition-all duration-300 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl hover:border-electric-blue/40 hover:shadow-md dark:hover:bg-white/10 group"
              >
                <TechIcon name={name} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-electric-cyan transition-colors">{name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Free tutorials</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/academy" className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
              Browse All Tutorials <Code2 className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why InnTechLab Academy ───────────────────────────────────────── */}
      <section className="py-24 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-electric-cyan">Why us</p>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Everything you need to succeed</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 transition-all border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-electric-blue/40 hover:shadow-md dark:hover:bg-white/10">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-electric">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Code Samples ─────────────────────────────────────── */}
      <section className="py-24 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-electric-cyan">Hands-on learning</p>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Interactive Code Samples</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Learn by doing — browse real code examples from HTML basics to advanced React patterns.
            </p>
          </div>
          <CodeSamplesPreview />
          <div className="mt-10 text-center">
            <Link to="/code-samples" className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
              Explore Code Samples <Code2 className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────────────── */}
      <section className="py-24 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-electric-cyan">Stay sharp</p>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Latest from the Blog</h2>
            <p className="text-gray-600 dark:text-gray-400">Tutorials, tips, and tech insights from our instructors.</p>
          </div>
          <BlogPreview />
          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
              Read All Articles <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-electric opacity-10" />
        <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-electric-blue/15 blur-3xl" />
        <div className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-electric-violet/15 blur-3xl" />
        <div className="container relative px-6 mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl font-display">
            Ready to start your journey?
          </h2>
          <p className="max-w-xl mx-auto mb-10 text-xl text-gray-300">
            Join hundreds of students already learning and building with InnTechLab Academy.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/courses" className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50">
              Browse Courses
            </Link>
            <Link to="/student/login" className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border rounded-lg bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
