import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";

import { RouterProvider } from "react-router-dom";

import "@fontsource/vazirmatn";

import "./index.css";

import router from "./routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<CartProvider>
  <RouterProvider router={router} />
</CartProvider>
  </StrictMode>
);