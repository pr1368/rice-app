import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import {
  cartReducer,
  initialState,
} from "./CartReducer";

const CartContext = createContext(null);

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem("rice-shop-cart");

    if (!savedCart) {
      return initialState;
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return initialState;
    }

    return {
      cart: parsedCart,
    };
  } catch (error) {
    console.error("خطا در خواندن سبد خرید:", error);

    return initialState;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCart
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        "rice-shop-cart",
        JSON.stringify(state.cart)
      );
    } catch (error) {
      console.error("خطا در ذخیره سبد خرید:", error);
    }
  }, [state.cart]);

  const totalItems = useMemo(() => {
    return state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [state.cart]);

  const totalPrice = useMemo(() => {
    return state.cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [state.cart]);

  const value = {
    cart: state.cart,
    totalItems,
    totalPrice,
    dispatch,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart باید داخل CartProvider استفاده شود."
    );
  }

  return context;
}