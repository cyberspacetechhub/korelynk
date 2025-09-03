import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/home/Header';
import Footer from './components/home/Footer';

// Pages
import Home from './components/home/Home';
import About from './components/home/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Feedback from './components/home/Feedback';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import AdminLogin from './pages/AdminLogin';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSettings from './pages/admin/AdminSettings';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminTeam from './pages/admin/AdminTeam';
import AdminFeedback from './pages/admin/AdminFeedback';
import AdminBlog from './pages/admin/AdminBlog';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBlogForm from './pages/admin/AdminBlogForm';

// Auth
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import ProtectedRoute from './components/ProtectedRoute';
import PersistLogin from './components/PersistLogin';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import DynamicFavicon from './components/DynamicFavicon';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <DynamicFavicon />
          <ScrollToTop />
          <ScrollToTopButton />
          <Routes>
          <Route element={<PersistLogin />}>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/services" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Services />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/portfolio" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Portfolio />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/feedback" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Feedback />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/blog" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Blog />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/blog/:slug" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <BlogDetail />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/careers" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Careers />
              </main>
              <Footer />
            </div>
          } />
          
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminOverview />
              </ProtectedRoute>
            } />
            <Route path="/admin/contacts" element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/newsletter" element={
              <ProtectedRoute>
                <AdminNewsletter />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/team" element={
              <ProtectedRoute>
                <AdminTeam />
              </ProtectedRoute>
            } />
            <Route path="/admin/feedback" element={
              <ProtectedRoute>
                <AdminFeedback />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog" element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/new" element={
              <ProtectedRoute>
                <AdminBlogForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/edit/:id" element={
              <ProtectedRoute>
                <AdminBlogForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <AdminCategories />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;