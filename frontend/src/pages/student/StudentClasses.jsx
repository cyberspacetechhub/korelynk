import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Video, Plus } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const StudentClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentClasses();
  }, []);

  const fetchStudentClasses = async () => {
    try {
      const response = await axios.get('/classes/student');
      if (response.data.success) {
        setClasses(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching student classes:', error);
      toast.error('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-600">View your enrolled classes</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Enrolled Classes</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {classes.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              You haven't joined any classes yet.
            </div>
          ) : (
            classes.map((classItem) => (
              <div key={classItem._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{classItem.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(classItem.status)}`}>
                    {classItem.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Course:</strong> {classItem.course?.title}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <strong>Instructor:</strong> {classItem.instructor?.fullName}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(classItem.scheduledDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {classItem.duration} min
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {classItem.students?.length || 0}/{classItem.maxStudents} students
                  </div>
                </div>
                
                {classItem.meetingLink && classItem.status !== 'cancelled' && (
                  <div className="mt-4">
                    <a
                      href={classItem.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentClasses;