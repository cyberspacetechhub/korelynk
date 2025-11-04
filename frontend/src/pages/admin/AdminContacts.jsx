import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';


const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/admin/contacts?limit=50');
      if (response.data.success) {
        setContacts(response.data.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateContactStatus = async (contactId, status) => {
    try {
      const response = await axios.put(`/admin/contacts/${contactId}/status`, { status });
      if (response.data.success) {
        setContacts(prev => 
          prev.map(contact => 
            contact._id === contactId 
              ? { ...contact, status } 
              : contact
          )
        );
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3">
            <div className="flex space-x-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex space-x-4">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Messages</h2>
            <p className="text-sm sm:text-base text-gray-600">Manage and respond to customer inquiries</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{contacts.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Contacts</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{contacts.filter(c => c.status === 'new').length}</div>
            <div className="text-xs sm:text-sm text-gray-600">New</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-lg sm:text-2xl font-bold text-yellow-600">{contacts.filter(c => c.status === 'in-progress').length}</div>
            <div className="text-xs sm:text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{contacts.filter(c => c.status === 'completed').length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                    Contact
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Service
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Budget
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                    Status
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                    Date
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-2 py-4 sm:px-6">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{contact.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{contact.email}</div>
                        {contact.company && (
                          <div className="text-xs text-gray-400 truncate">{contact.company}</div>
                        )}
                        <div className="text-xs text-gray-400 lg:hidden">
                          {contact.service || 'Not specified'} • {contact.budget || 'Not specified'}
                        </div>
                        <div className="text-xs text-gray-400 md:hidden">
                          {formatDate(contact.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-900 lg:table-cell whitespace-nowrap">
                      {contact.service || 'Not specified'}
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-900 lg:table-cell whitespace-nowrap">
                      {contact.budget || 'Not specified'}
                    </td>
                    <td className="px-2 py-4 sm:px-6">
                      <select
                        value={contact.status || 'new'}
                        onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(contact.status || 'new')} min-w-0`}
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell whitespace-nowrap">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-2 py-4 text-right sm:px-6">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          to={`/admin/contacts/${contact._id}`}
                          className="p-1 text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => updateContactStatus(contact._id, 'completed')}
                          className="p-1 text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No contact messages yet'}
            </p>
          </div>
        )}
    </div>
  );
};

export default AdminContacts;