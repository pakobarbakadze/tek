import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import { useAppSelector } from "../redux/hooks";

import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK as string);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    axios
      .post("/api/payment/create-payment", { amount: cart.totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
