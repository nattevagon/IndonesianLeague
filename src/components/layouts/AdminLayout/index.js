import AdminModal from "@/components/admin/molecules/AdminModal";
import AdminSidebar from "@/components/admin/molecules/AdminSidebar";
import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <div className="Admin-container">
      <AdminSidebar>
        <div className="p-8">{children}</div>
      </AdminSidebar>
      <AdminModal />
    </div>
  );
}

export default AdminLayout