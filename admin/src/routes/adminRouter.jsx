import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminLogin from "../pages/Login/AdminLogin";
import AdminProtectedRoute from "./AdminProtectedRoute";

const adminRouter = createBrowserRouter([
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export { adminRouter };