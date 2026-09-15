import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { adminRouter } from "./routes/adminRouter";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import "./styles/admin.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <RouterProvider router={adminRouter} />
    </AdminAuthProvider>
  </React.StrictMode>
);