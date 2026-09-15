import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "../components/common/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="mr-64 min-h-screen">
        <AdminHeader />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;