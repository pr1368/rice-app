import {
  createContext,
  useContext,
  useState,
} from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  const createOrder = ({
    customer,
    cart,
    totalPrice,
  }) => {
    const newOrder = {
      customer,
      items: cart,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    setOrder(newOrder);

    return newOrder;
  };

  const clearOrder = () => {
    setOrder(null);
  };

  const value = {
    order,
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