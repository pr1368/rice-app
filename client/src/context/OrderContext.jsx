import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  createOrder as createOrderApi,
  payOrder as payOrderApi,
} from "../services/orderService";

const OrderContext = createContext(undefined);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const [error, setError] = useState("");

  const [paymentError, setPaymentError] = useState("");

  // ایجاد سفارش
  const createOrder = async ({
    customer,
    cart,
    totalPrice,
  }) => {
    try {
      setLoading(true);
      setError("");

      const items = cart.map((item) => ({
        productId:
          item.productId ||
          item._id ||
          item.id,

        name:
          item.name ||
          item.title ||
          "",

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
        totalPrice: Number(totalPrice),
      });

      setOrder(response.order);

      return response.order;
    } catch (error) {
      console.error(
        "Create order error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "ثبت سفارش با خطا مواجه شد.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // پرداخت سفارش
  const payOrder = async () => {
    if (!order?._id) {
      const error = new Error(
        "سفارش معتبر نیست."
      );

      setPaymentError(error.message);

      throw error;
    }

    try {
      setPaymentLoading(true);
      setPaymentError("");

      const response =
        await payOrderApi(order._id);

      setOrder(response.order);

      return response.order;
    } catch (error) {
      console.error(
        "Pay order error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "پرداخت سفارش با خطا مواجه شد.";

      setPaymentError(message);

      throw error;
    } finally {
      setPaymentLoading(false);
    }
  };

  // پاک کردن سفارش فعلی از Context
  const clearOrder = () => {
    setOrder(null);
    setError("");
    setPaymentError("");
  };

  const value = {
    order,

    loading,

    paymentLoading,

    error,

    paymentError,

    createOrder,

    payOrder,

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

  if (context === undefined) {
    throw new Error(
      "useOrder باید داخل OrderProvider استفاده شود."
    );
  }

  return context;
}