"use client";
import React from "react";
import Navbar from "./Navbar.js";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
