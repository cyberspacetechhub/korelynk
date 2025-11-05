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
        <main className="flex-1 max-w-full px-6 pt-24 pb-10 ml-0 overflow-hidden lg:ml-72">
          <div className='mx-auto max-w-7xl'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;