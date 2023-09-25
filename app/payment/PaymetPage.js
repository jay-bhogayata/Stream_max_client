"use client";

import React, { useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

const PaymentPage = ({ clientSecret }) => {
  const [data, setData] = useState({});
  console.log(clientSecret);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user === null) {
        // window.location.href = "/";
      }
      if (user !== null) {
        const userInfo = JSON.parse(user);
        setData(userInfo);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      notifyError(submitError.message);
      return;
    }
    const data = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/paymentStatus",
      },
    });
    console.log(data.paymentIntent);
    if (data.paymentIntent.status === "succeeded") {
      notifySuccess("Payment success");
    }
    if (data.error) {
      setErrorMessage(data.error.message);
      notifyError(data.error.message);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-center items-center "
      >
        <h1 className="text-2xl font-bold text-blue-500 my-5">
          Pay for StreamMax
        </h1>
        <PaymentElement />

        <button
          type="submit"
          disabled={!stripe || !elements}
          className="flex justify-center rounded-md bg-stone-900  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600
        w-44
          mt-10"
        >
          pay now
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default PaymentPage;
