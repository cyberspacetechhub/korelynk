// Preload critical routes for better performance
export const preloadCriticalRoutes = () => {
  // Preload most commonly accessed pages
  import('../pages/Services');
  import('../pages/Portfolio');
  import('../pages/Contact');
  import('../pages/Blog');
  import('../pages/Courses');
};

export const preloadAdminRoutes = () => {
  // Preload admin dashboard and overview
  import('../pages/admin/AdminOverview');
  import('../pages/admin/AdminAnalytics');
};

export const preloadStudentRoutes = () => {
  // Preload student dashboard
  import('../pages/StudentDashboard');
  import('../pages/student/StudentClasses');
};

export const preloadInstructorRoutes = () => {
  // Preload instructor dashboard
  import('../pages/InstructorDashboard');
  import('../pages/instructor/InstructorClasses');
};