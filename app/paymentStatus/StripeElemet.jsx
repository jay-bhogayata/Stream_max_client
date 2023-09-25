"use client";

import React, { useState, useEffect } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { notifySuccess } from "../components/NotifySuccess";
import Link from "next/link";
import { notifyError } from "../components/NotifyError";

const StripeElemet = ({}) => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!stripe) {
      return;
    }

    /*
     */

    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    console.log(server_url);
    //
    const handleAuth = (data) => {
      fetch(`${server_url}/updateClient`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "access-control-expose-headers": "Set-Cookie",
          sameSite: "none",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user);
          if (data.success === true) {
            notifySuccess(`${data.message}`);
            console.log(data.message);
            const user = {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              subscribed: data.user.subscribed,
              stripeCustomerId: data.user.stripeCustomerId,
            };
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/profile";
          } else {
            notifyError(`${data.message}`);
            console.log(data.message);
          }
        })
        .catch((e) => console.log(e));
    };
    //

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received.");
          notifySuccess("Success! Payment received.");
          const data = localStorage.getItem("user");
          let updateData = JSON.parse(data);
          updateData.subscribed = true;
          console.log(updateData);
          localStorage.setItem("user", JSON.stringify(updateData));
          handleAuth(updateData);
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          setMessage("Payment failed. Please try another payment method.");
          notifyError("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          notifyError("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="flex justify-center items-center flex-col my-10">
      {message}
      <Link
        href={"/profile"}
        className="flex justify-center rounded-md bg-stone-900 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600
      w-1/2
      md:w-1/4 mt-10"
      >
        go to profile
      </Link>
    </div>
  );
};

export default StripeElemet;
