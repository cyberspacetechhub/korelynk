import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Careers from './pages/Careers';
import Unsubscribe from './pages/Unsubscribe';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import StudentCourseEnroll from './pages/StudentCourseEnroll';
import StudentCourseView from './pages/StudentCourseView';
import StudentAssignmentSubmit from './pages/StudentAssignmentSubmit';
import AdminAssignments from './pages/admin/AdminAssignments';
import InstructorLogin from './pages/InstructorLogin';
import InstructorDashboard from './pages/InstructorDashboard';

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
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseForm from './pages/admin/AdminCourseForm';
import AdminCourseDetail from './pages/admin/AdminCourseDetail';
import AdminEnrollments from './pages/admin/AdminEnrollments';
import AdminStudents from './pages/admin/AdminStudents';
import AdminInstructors from './pages/admin/AdminInstructors';
import AdminInstructorDetail from './pages/admin/AdminInstructorDetail';
import AdminStudentDetail from './pages/admin/AdminStudentDetail';
import AdminClasses from './pages/admin/AdminClasses';
import AdminAdvancedAnalytics from './pages/admin/AdminAdvancedAnalytics';
import AdminPaymentAccount from './pages/admin/AdminPaymentAccount';
import InstructorClasses from './pages/instructor/InstructorClasses';
import InstructorClassDetail from './pages/instructor/InstructorClassDetail';
import InstructorAssignments from './pages/instructor/InstructorAssignments';
import InstructorAssignmentDetail from './pages/instructor/InstructorAssignmentDetail';
import InstructorClassForm from './pages/instructor/InstructorClassForm';
import InstructorAssignmentForm from './pages/instructor/InstructorAssignmentForm';
import StudentClasses from './pages/student/StudentClasses';
import StudentAssignments from './pages/student/StudentAssignments';
import Unauthorized from './pages/Unauthorized';

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
          <RouteGuard>
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
              <Route path="profile" element={<AdminProfile />} />
            </Route>
            
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Unauthorized />} />
          </Route>
        </Routes>
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