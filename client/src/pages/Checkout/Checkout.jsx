import Container from "../../components/ui/Container";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

function Checkout() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-10 text-4xl font-black text-gray-900">
          ثبت سفارش
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <CheckoutSummary />
        </div>
      </Container>
    </section>
  );
}

export default Checkout;