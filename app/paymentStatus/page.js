"use client";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeElemet from "./StripeElemet";
import { loadStripe } from "@stripe/stripe-js";

const PaymentStatus = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  return (
    <Elements stripe={stripePromise}>
      <StripeElemet />
    </Elements>
  );
};

export default PaymentStatus;
