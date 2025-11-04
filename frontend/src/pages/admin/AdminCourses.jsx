import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, BookOpen } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, courseId: null, courseName: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses');
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (course) => {
    setDeleteDialog({
      isOpen: true,
      courseId: course._id,
      courseName: course.title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/courses/${deleteDialog.courseId}`);
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    } finally {
      setDeleteDialog({ isOpen: false, courseId: null, courseName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, courseId: null, courseName: '' });
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Courses Management</h1>
        <Link
          to="/admin/courses/new"
          className="flex items-center justify-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6">
            <SkeletonLoader rows={5} columns={7} />
          </div>
        ) : courses.length > 0 ? (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Course</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Enrollments</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Start Date</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.level} • {course.duration}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                          {course.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">₦{course.price.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Users className="w-4 h-4" />
                          {course.currentEnrollments}/{course.maxStudents}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{new Date(course.startDate).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                          course.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {course.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/courses/edit/${course._id}`}
                            className="px-3 py-1 text-sm text-white transition-all duration-200 bg-blue-600 rounded hover:bg-blue-700 hover:shadow-md"
                          >
                            <Edit className="w-3 h-3 inline mr-1" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(course)}
                            className="px-3 py-1 text-sm text-white transition-all duration-200 bg-red-600 rounded hover:bg-red-700 hover:shadow-md"
                          >
                            <Trash2 className="w-3 h-3 inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No courses found"
            description="Get started by creating your first course. You can add course details, set pricing, and assign instructors."
            actionText="Create Course"
            onAction={() => navigate('/admin/courses/new')}
          />
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        message={`Are you sure you want to delete "${deleteDialog.courseName}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete Course"
        type="danger"
      />
      </div>
  );
};

export default AdminCourses;