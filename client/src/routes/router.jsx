import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import OrderReview from "../pages/OrderReview/OrderReview";
import OrderSuccess from "../pages/Order/OrderSuccess";
import NotFound from "../pages/NotFound/NotFound";

// Authentication
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import Profile from "../pages/Authentication/Profile/Profile";

// Auth Protection
import ProtectedRoute from "../components/auth/ProtectedRoute";
import EditProfile from "../pages/Authentication/Profile/EditProfile";
import Orders from "../pages/Order/Orders";
import OrderDetails from "../pages/Order/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      // =========================
      // Public Routes
      // =========================

      {
        index: true,
        element: <Home />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:id",
        element: <ProductDetails />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      // =========================
      // Protected Routes
      // =========================

      {
        element: <ProtectedRoute />,

        children: [
          {
            path: "profile",
            element: <Profile />,
          },
         {path:"/profile/edit",
         element:<EditProfile/>
          } ,

          {
            path: "checkout",
            element: <Checkout />,
          },
      {
         path:"/orders",
        element:<Orders/>
      },
      {
  path: "/orders/:id",
  element: <OrderDetails />,
}
      ,
          {
            path: "order-review",
            element: <OrderReview />,
          },

          {
            path: "order-success",
            element: <OrderSuccess />,
          },
        ],
      },

      // =========================
      // 404
      // =========================

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;