export const initialState = {
  cart: [],
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.weight === action.payload.weight
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id &&
            item.weight === action.payload.weight
              ? {
                  ...item,
                  quantity:
                    item.quantity + action.payload.quantity,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.weight === action.payload.weight
            )
        ),
      };
    }

    case "INCREASE": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id &&
          item.weight === action.payload.weight
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };
    }

    case "DECREASE": {
      return {
        ...state,
        cart: state.cart.flatMap((item) => {
          if (
            item.id === action.payload.id &&
            item.weight === action.payload.weight
          ) {
            if (item.quantity === 1) {
              return [];
            }

            return [
              {
                ...item,
                quantity: item.quantity - 1,
              },
            ];
          }

          return [item];
        }),
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
}