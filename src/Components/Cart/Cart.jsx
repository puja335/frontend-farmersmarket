import { Container } from "@mui/material";
import { Loader } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../features/cart/cartSlice";
import CartItems from "./CartItems/CartItems";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import EmptyCart from "./EmptyCart/EmptyCart";
import OrderSummary from "./OrderSummary/OrderSummary";

export const checkoutContext = createContext();

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { items, status } = useSelector((state) => state.cart);
  const [isProceedToCheckout, setIsProceedToCheckout] = useState(false);
  console.log(items);

  useEffect(() => {
    window.scroll({ top: 0 });
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user?._id]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <checkoutContext.Provider
      value={[isProceedToCheckout, setIsProceedToCheckout]}
    >
      <section
        className={`${
          items.length > 0 ? "min-h-screen" : "h-screen"
        } pt-20 pb-10`}
      >
        {items.length > 0 ? (
          <Container
            sx={{ display: "flex", justifyContent: "center", height: "100%" }}
          >
            <section className='grid lg:gap-x-0 gap-x-5 gap-y-8 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-12'>
              <div className='col xl:col-span-2 lg:col-span-1 md:col-span-8'>
                {!isProceedToCheckout ? <CartItems /> : <DeliveryForm />}
              </div>
              <OrderSummary />
            </section>
          </Container>
        ) : (
          <EmptyCart />
        )}
      </section>
    </checkoutContext.Provider>
  );
};

export default Cart;
