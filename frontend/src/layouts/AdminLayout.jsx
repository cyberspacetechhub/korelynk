import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminAside from '../components/admin/AdminAside';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <AdminAside isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-6 lg:ml-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;