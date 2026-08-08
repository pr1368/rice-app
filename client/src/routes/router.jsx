import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import NotFound from "../pages/NotFound/NotFound";
import Checkout from "../pages/Checkout/Checkout";
import OrderReview from "../pages/OrderReview/OrderReview";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import Profile from "../pages/Authentication/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      {path: "/products/:id",element: <ProductDetails />},
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
      {path: "/checkout",element: <Checkout />},
      {path: "/order-review",element: <OrderReview />},
    ],
  },
]);

export default router;
