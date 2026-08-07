import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";

import { RouterProvider } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import "@fontsource/vazirmatn";

import "./index.css";

import router from "./routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<CartProvider>
  <OrderProvider>
    <RouterProvider router={router} />
  </OrderProvider>
</CartProvider>
  </StrictMode>
);