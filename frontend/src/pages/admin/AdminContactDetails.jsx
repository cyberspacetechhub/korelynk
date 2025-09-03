import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building, Calendar, MessageSquare, CheckCircle, Clock, User } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactDetails();
  }, [id]);

  const fetchContactDetails = async () => {
    try {
      const response = await axios.get(`/admin/contacts/${id}`);
      if (response.data.success) {
        setContact(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
      toast.error('Failed to load contact details');
      navigate('/admin/contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (status) => {
    try {
      const response = await axios.put(`/admin/contacts/${id}/status`, { status });
      if (response.data.success) {
        setContact(prev => ({ ...prev, status }));
        toast.success('Contact status updated');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <MessageSquare className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!contact) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Not Found</h2>
          <button
            onClick={() => navigate('/admin/contacts')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Back to Contacts
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/contacts')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Details</h2>
              <p className="text-sm sm:text-base text-gray-600">View and manage contact information</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(contact.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contact.status)}`}>
              {contact.status || 'new'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${contact.email}`} className="font-medium text-indigo-600 hover:text-indigo-700">
                      {contact.email}
                    </a>
                  </div>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href={`tel:${contact.phone}`} className="font-medium text-indigo-600 hover:text-indigo-700">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-medium text-gray-900">{contact.company}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                {contact.service && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Service Requested</p>
                    <p className="font-medium text-gray-900">{contact.service}</p>
                  </div>
                )}
                {contact.budget && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Budget</p>
                    <p className="font-medium text-gray-900">{contact.budget}</p>
                  </div>
                )}
                {contact.timeline && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Timeline</p>
                    <p className="font-medium text-gray-900">{contact.timeline}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Management</h3>
              <div className="space-y-3">
                <button
                  onClick={() => updateContactStatus('new')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    contact.status === 'new' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  New
                </button>
                <button
                  onClick={() => updateContactStatus('in-progress')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    contact.status === 'in-progress' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  In Progress
                </button>
                <button
                  onClick={() => updateContactStatus('completed')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    contact.status === 'completed' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </button>
              </div>
            </div>

            {/* Contact Meta */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Meta</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Received: {formatDate(contact.createdAt)}</span>
                </div>
                {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Updated: {formatDate(contact.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your inquiry'}`}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    Call Contact
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContactDetails;