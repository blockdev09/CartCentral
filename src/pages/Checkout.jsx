import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderapi";
import { resetCart } from "../redux/reducer/cartReducer";
import { toastResponse } from "../utils/feature";
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY
  //   "pk_test_51PQLCIGijqw05TSY2Dn8Lge60FU1e2c2G6BNNX7Y9YgKwEDI03kZXjIO0JkXZaNCRKKGn8Qbx5CFiOcHHWhWkTVG00rOzoluSm"
);
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const {
    shippingInfo,
    cartitems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state) => state.cartReducer);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newOrder] = useNewOrderMutation();
  // console.log(useNewOrderMutation());
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const order = {
      shippingInfo,
      orderItems: cartitems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user.user._id,
    };
    // console.log(order);
    // console.log(newOrder);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,

      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something went Wrong!");
    }
    // console.log(paymentIntent.status);
    const res = await newOrder(order);
    navigate("/orders");
    // const res = await newOrder(order)
    // toastResponse(res,navigate,'/orders')
    // if (paymentIntent.status === "succeeded") {
    //   // const res = await newOrder(order);
    //   // dispatch(resetCart());
    //   // console.log(res);

    //   // console.log("Placing Order",res);
    //   // toastResponse(res, navigate, "/orders");
    // }
    setIsProcessing(false);
  };
  return (
    <div className="checkoutContainer">
      <form onSubmit={handlesubmit}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};
const Checkout = () => {
  const location = useLocation();
  const clientSecret = location.state;
  // console.log(clientSecret)
  if (!clientSecret) {
    return <Navigate to={"/shipping"} />;
  }
  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
