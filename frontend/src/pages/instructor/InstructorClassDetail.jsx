import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Clock, Video } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const InstructorClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassDetail();
  }, [id]);

  const fetchClassDetail = async () => {
    try {
      const token = localStorage.getItem('instructorToken');
      const response = await axios.get(`/classes/instructor/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setClassData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching class:', error);
      toast.error('Failed to load class details');
      navigate('/instructor/classes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Class not found</h2>
        <button 
          onClick={() => navigate('/instructor/classes')}
          className="text-purple-600 hover:text-purple-800"
        >
          Back to Classes
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/instructor/classes')}
        className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Classes
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{classData.title}</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Class Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {classData.startDate ? new Date(classData.startDate).toLocaleDateString() : 'No date set'}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                {classData.duration} minutes
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                {classData.students?.length || 0}/{classData.maxStudents} students
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Course</h3>
            <p className="text-gray-600">{classData.course?.title || 'No course assigned'}</p>
            <p className="text-sm text-gray-500">{classData.course?.category}</p>
          </div>
        </div>

        {classData.description && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{classData.description}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Class Code</h3>
          <div className="bg-gray-100 p-3 rounded-lg inline-block">
            <span className="font-mono text-lg font-bold">{classData.code}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Share this code with students to join the class</p>
        </div>

        {classData.meetingLink && (
          <div className="mb-6">
            <a
              href={classData.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Video className="w-4 h-4 mr-2" />
              Join Meeting
            </a>
          </div>
        )}

        {classData.students && classData.students.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Enrolled Students</h3>
            <div className="space-y-2">
              {classData.students.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{student.student?.fullName || 'Unknown Student'}</p>
                    <p className="text-sm text-gray-500">{student.student?.email}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined: {student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorClassDetail;