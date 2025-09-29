import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './components/home/Home';
import About from './components/home/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Feedback from './components/home/Feedback';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import SearchResults from './pages/SearchResults';
import CodingDemo from './pages/CodingDemo';
import CodeSamples from './pages/CodeSamples';
import CodeSampleDetail from './pages/CodeSampleDetail';
import Careers from './pages/Careers';
import Unsubscribe from './pages/Unsubscribe';
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
import AdminCodeSamples from './pages/admin/AdminCodeSamples';
import AdminCodeSampleForm from './pages/admin/AdminCodeSampleForm';
import AdminCodeSampleDetail from './pages/admin/AdminCodeSampleDetail';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminBlogDetails from './pages/admin/AdminBlogDetails';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminProfile from './pages/admin/AdminProfile';
import AdminContactDetails from './pages/admin/AdminContactDetails';

// Auth
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import ProtectedRoute from './components/ProtectedRoute';
import PersistLogin from './components/PersistLogin';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import DynamicFavicon from './components/DynamicFavicon';
import GoogleAnalytics from './components/GoogleAnalytics';

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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SettingsProvider>
          <DynamicFavicon />
          <GoogleAnalytics />
          <ScrollToTop />
          <ScrollToTopButton />
          <Routes>
          <Route element={<PersistLogin />}>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="coding-demo" element={<CodingDemo />} />
            <Route path="code-samples" element={<CodeSamples />} />
            <Route path="code-samples/:slug" element={<CodeSampleDetail />} />
            <Route path="careers" element={<Careers />} />
          </Route>
          <Route path="/newsletter/unsubscribe" element={<Unsubscribe />} />
          
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminOverview />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="contacts/:id" element={<AdminContactDetails />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blog/new" element={<AdminBlogForm />} />
              <Route path="blog/:id" element={<AdminBlogDetails />} />
              <Route path="blog/edit/:id" element={<AdminBlogForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="code-samples" element={<AdminCodeSamples />} />
              <Route path="code-samples/new" element={<AdminCodeSampleForm />} />
              <Route path="code-samples/edit/:id" element={<AdminCodeSampleForm />} />
              <Route path="code-samples/:id" element={<AdminCodeSampleDetail />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
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
    </HelmetProvider>
  );
}

export default App;