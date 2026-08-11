import {
  createContext,
  useContext,
  useState,
} from "react";

import { createOrder as createOrderApi } from "../services/orderService";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createOrder = async ({
    customer,
    cart,
    totalPrice,
  }) => {
    try {
      setLoading(true);
      setError("");

      const items = cart.map((item) => ({
        productId: item.productId || item._id || item.id,
        name: item.name || item.title,
        image:
          item.images?.[0] ||
          item.image ||
          "",
        price: Number(item.price),
        weight: Number(item.weight),
        quantity: Number(item.quantity),
      }));

      const response = await createOrderApi({
        customer,
        items,
        totalPrice,
      });

      setOrder(response.order);

      return response.order;
    } catch (error) {
      console.error("Create order error:", error);

      const message =
        error.response?.data?.message ||
        "ثبت سفارش با خطا مواجه شد.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearOrder = () => {
    setOrder(null);
    setError("");
  };

  const value = {
    order,
    loading,
    error,
    createOrder,
    clearOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder باید داخل OrderProvider استفاده شود."
    );
  }

  return context;
}