"use client";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./PaymetPage.js";
import { notifySuccess } from "../components/NotifySuccess.jsx";
import { notifyError } from "../components/NotifyError.jsx";
import { Toaster } from "react-hot-toast";

const page = () => {
  const [data, setData] = useState({});
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user === null) {
        // window.location.href = "/";
      }
      if (user !== null) {
        const userInfo = JSON.parse(user);
        setData(userInfo);

        const paymentObj = {
          name: userInfo.name,
          email: userInfo.email,
          role: userInfo.role,
          priceId: "price_1NocddSJLlvkZdceAmJA7d3N",
          customerId: userInfo.stripeCustomerId,
        };
        console.log(paymentObj);
        fetch(`http://localhost:3001/create-customer`, {
          method: "POST",
          body: JSON.stringify(paymentObj),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "access-control-expose-headers": "Set-Cookie",
            sameSite: "none",
          },
        })
          .then((res) => res.json())

          .then((data) => {
            console.log(data);
            if (data.success) {
              setClientSecret(data.clientSecret);
              notifySuccess("payment intent load success");
            } else {
              notifyError(data.message);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const options = {
    mode: "subscription",
    currency: "inr",
    amount: 199,
    setup_future_usage: "off_session",
    payment_method_types: ["card"],
  };

  return (
    <div className="px-5 md:px-48 mt-10">
      <Elements stripe={stripePromise} options={options}>
        {console.log(data)}
        <Toaster />
        <PaymentPage clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

export default page;
