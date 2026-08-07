import {
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="flex flex-col gap-6 rounded-3xl border bg-white p-6 shadow-sm md:flex-row md:items-center">

      <img
        src={item.image}
        alt={item.title}
        className="h-32 w-32 rounded-2xl object-cover"
      />

      <div className="flex-1">

        <h2 className="text-xl font-bold">
          {item.title}
        </h2>

        <p className="mt-2 text-gray-500">
          وزن:
          {" "}
          {item.weight}
        </p>

        <p className="mt-2 text-2xl font-black text-green-700">
          {item.price.toLocaleString()} تومان
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() =>
            dispatch({
              type: "DECREASE",
              payload: {
                id: item.id,
                weight: item.weight,
              },
            })
          }
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FaMinus />
        </button>

        <span className="w-8 text-center font-bold">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            dispatch({
              type: "INCREASE",
              payload: {
                id: item.id,
                weight: item.weight,
              },
            })
          }
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FaPlus />
        </button>

      </div>

      <button
        onClick={() =>
          dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
              id: item.id,
              weight: item.weight,
            },
          })
        }
        className="text-red-500 transition hover:text-red-700"
      >
        <FaTrash size={22} />
      </button>

    </div>
  );
}

export default CartItem;