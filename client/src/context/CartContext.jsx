import {
  createContext,
  useContext,
  useReducer,
} from "react";

import {
  cartReducer,
  initialState,
} from "./CartReducer";

const CartContext = createContext();

export function CartProvider({
  children,
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}