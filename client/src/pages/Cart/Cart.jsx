import Container from "../../components/ui/Container";

import { useCart } from "../../context/CartContext";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

function Cart() {
  const { cart } = useCart();

  return (
    <section className="py-16">
      <Container>

        <h1 className="mb-10 text-4xl font-black">
          سبد خرید
        </h1>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">
              {cart.map((item) => (
                <CartItem
                  key={`${item.id}-${item.weight}`}
                  item={item}
                />
              ))}
            </div>

            <CartSummary cart={cart} />

          </div>
        )}

      </Container>
    </section>
  );
}

export default Cart;