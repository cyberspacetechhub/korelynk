import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminAside from './AdminAside';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <AdminAside isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-6 lg:ml-72">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;