import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import BrandedLoader from './components/BrandedLoader';

// Critical pages (loaded immediately)
import Home from './components/home/Home';
import About from './components/home/About';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import InstructorLogin from './pages/InstructorLogin';
import Unauthorized from './pages/Unauthorized';

// Lazy loaded pages
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Feedback = React.lazy(() => import('./components/home/Feedback'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const CodingDemo = React.lazy(() => import('./pages/CodingDemo'));
const CodeSamples = React.lazy(() => import('./pages/CodeSamples'));
const CodeSampleDetail = React.lazy(() => import('./pages/CodeSampleDetail'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Unsubscribe = React.lazy(() => import('./pages/Unsubscribe'));

// Student pages
const StudentDashboard = React.lazy(() => import('./pages/StudentDashboard'));
const StudentCourseEnroll = React.lazy(() => import('./pages/StudentCourseEnroll'));
const StudentCourseView = React.lazy(() => import('./pages/StudentCourseView'));
const StudentAssignmentSubmit = React.lazy(() => import('./pages/StudentAssignmentSubmit'));
const StudentClasses = React.lazy(() => import('./pages/student/StudentClasses'));
const StudentAssignments = React.lazy(() => import('./pages/student/StudentAssignments'));

// Instructor pages
const InstructorDashboard = React.lazy(() => import('./pages/InstructorDashboard'));
const InstructorClasses = React.lazy(() => import('./pages/instructor/InstructorClasses'));
const InstructorClassDetail = React.lazy(() => import('./pages/instructor/InstructorClassDetail'));
const InstructorAssignments = React.lazy(() => import('./pages/instructor/InstructorAssignments'));
const InstructorAssignmentDetail = React.lazy(() => import('./pages/instructor/InstructorAssignmentDetail'));
const InstructorClassForm = React.lazy(() => import('./pages/instructor/InstructorClassForm'));
const InstructorAssignmentForm = React.lazy(() => import('./pages/instructor/InstructorAssignmentForm'));

// Admin pages
const AdminOverview = React.lazy(() => import('./pages/admin/AdminOverview'));
const AdminContacts = React.lazy(() => import('./pages/admin/AdminContacts'));
const AdminProjects = React.lazy(() => import('./pages/admin/AdminProjects'));
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings'));
const AdminNewsletter = React.lazy(() => import('./pages/admin/AdminNewsletter'));
const AdminTeam = React.lazy(() => import('./pages/admin/AdminTeam'));
const AdminFeedback = React.lazy(() => import('./pages/admin/AdminFeedback'));
const AdminBlog = React.lazy(() => import('./pages/admin/AdminBlog'));
const AdminCategories = React.lazy(() => import('./pages/admin/AdminCategories'));
const AdminCodeSamples = React.lazy(() => import('./pages/admin/AdminCodeSamples'));
const AdminCodeSampleForm = React.lazy(() => import('./pages/admin/AdminCodeSampleForm'));
const AdminCodeSampleDetail = React.lazy(() => import('./pages/admin/AdminCodeSampleDetail'));
const AdminBlogForm = React.lazy(() => import('./pages/admin/AdminBlogForm'));
const AdminBlogDetails = React.lazy(() => import('./pages/admin/AdminBlogDetails'));
const AdminAnalytics = React.lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminProfile = React.lazy(() => import('./pages/admin/AdminProfile'));
const AdminContactDetails = React.lazy(() => import('./pages/admin/AdminContactDetails'));
const AdminCourses = React.lazy(() => import('./pages/admin/AdminCourses'));
const AdminCourseForm = React.lazy(() => import('./pages/admin/AdminCourseForm'));
const AdminCourseDetail = React.lazy(() => import('./pages/admin/AdminCourseDetail'));
const AdminEnrollments = React.lazy(() => import('./pages/admin/AdminEnrollments'));
const AdminStudents = React.lazy(() => import('./pages/admin/AdminStudents'));
const AdminInstructors = React.lazy(() => import('./pages/admin/AdminInstructors'));
const AdminInstructorDetail = React.lazy(() => import('./pages/admin/AdminInstructorDetail'));
const AdminStudentDetail = React.lazy(() => import('./pages/admin/AdminStudentDetail'));
const AdminClasses = React.lazy(() => import('./pages/admin/AdminClasses'));
const AdminAdvancedAnalytics = React.lazy(() => import('./pages/admin/AdminAdvancedAnalytics'));
const AdminPaymentAccount = React.lazy(() => import('./pages/admin/AdminPaymentAccount'));
const AdminPayments = React.lazy(() => import('./pages/admin/AdminPayments'));
const AdminAssignments = React.lazy(() => import('./pages/admin/AdminAssignments'));

// Auth
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import ProtectedRoute from './components/ProtectedRoute';
import StudentProtectedRoute from './components/StudentProtectedRoute';
import InstructorProtectedRoute from './components/InstructorProtectedRoute';
import RouteGuard from './components/RouteGuard';
import PersistLogin from './components/PersistLogin';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import DynamicFavicon from './components/DynamicFavicon';
import GoogleAnalytics from './components/GoogleAnalytics';
import PerformanceMonitor from './components/PerformanceMonitor';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 15 * 60 * 1000, // 15 minutes
      refetchOnMount: false,
      refetchOnReconnect: false,
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
          <PerformanceMonitor />
          <ScrollToTop />
          <ScrollToTopButton />
          <RouteGuard>
            <Suspense fallback={<BrandedLoader />}>
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
                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:id" element={<CourseDetail />} />
                    <Route path="careers" element={<Careers />} />
                  </Route>
                  <Route path="/newsletter/unsubscribe" element={<Unsubscribe />} />
          
                  {/* Student Routes */}
                  <Route path="/student/login" element={<StudentLogin />} />
                  <Route path="/student/dashboard" element={<StudentProtectedRoute><StudentDashboard /></StudentProtectedRoute>} />
                  <Route path="/student/courses/:id/enroll" element={<StudentProtectedRoute><StudentCourseEnroll /></StudentProtectedRoute>} />
                  <Route path="/student/courses/:id" element={<StudentProtectedRoute><StudentCourseView /></StudentProtectedRoute>} />
                  <Route path="/student/assignments/:id/submit" element={<StudentProtectedRoute><StudentAssignmentSubmit /></StudentProtectedRoute>} />
                  <Route path="/student/assignments" element={<StudentProtectedRoute><StudentAssignments /></StudentProtectedRoute>} />
                  <Route path="/student/classes" element={<StudentProtectedRoute><StudentClasses /></StudentProtectedRoute>} />
                
                  {/* Instructor Routes */}
                  <Route path="/instructor/login" element={<InstructorLogin />} />
                  <Route path="/instructor/dashboard" element={<InstructorProtectedRoute><InstructorDashboard /></InstructorProtectedRoute>} />
                  <Route path="/instructor/classes" element={<InstructorProtectedRoute><InstructorClasses /></InstructorProtectedRoute>} />
                  <Route path="/instructor/classes/:id" element={<InstructorProtectedRoute><InstructorClassDetail /></InstructorProtectedRoute>} />
                  <Route path="/instructor/classes/new" element={<InstructorProtectedRoute><InstructorClassForm /></InstructorProtectedRoute>} />
                  <Route path="/instructor/assignments" element={<InstructorProtectedRoute><InstructorAssignments /></InstructorProtectedRoute>} />
                  <Route path="/instructor/assignments/:id" element={<InstructorProtectedRoute><InstructorAssignmentDetail /></InstructorProtectedRoute>} />
                  <Route path="/instructor/assignments/new" element={<InstructorProtectedRoute><InstructorAssignmentForm /></InstructorProtectedRoute>} />
                
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
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="courses/new" element={<AdminCourseForm />} />
                    <Route path="courses/edit/:id" element={<AdminCourseForm />} />
                    <Route path="courses/:id" element={<AdminCourseDetail />} />
                    <Route path="courses/:courseId/assignments" element={<AdminAssignments />} />
                    <Route path="enrollments" element={<AdminEnrollments />} />
                    <Route path="students" element={<AdminStudents />} />
                    <Route path="students/:id" element={<AdminStudentDetail />} />
                    <Route path="instructors" element={<AdminInstructors />} />
                    <Route path="instructors/:id" element={<AdminInstructorDetail />} />
                    <Route path="classes" element={<AdminClasses />} />
                    <Route path="advanced-analytics" element={<AdminAdvancedAnalytics />} />
                    <Route path="payment-account" element={<AdminPaymentAccount />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="profile" element={<AdminProfile />} />
                  </Route>
                  
                  {/* Catch-all route for undefined paths */}
                  <Route path="*" element={<Unauthorized />} />
                </Route>
              </Routes>
            </Suspense>
          </RouteGuard>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="mt-16"
          toastClassName="shadow-lg"
          bodyClassName="text-sm"
          progressClassName="bg-indigo-600"
        />
          </SettingsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;