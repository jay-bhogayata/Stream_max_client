"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

const resetPassword = () => {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchParams = useSearchParams();
  const q = searchParams.get("token");
  console.log(q);
  const url = `${server_url}/password/reset/${q}`;
  const onSubmit = async (data) => {
    console.log(url);
    if (data.password !== data.confirmPassword) {
      notifyError("password do not match");
      return;
    }
    fetch(url, {
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
      .then((response) => {
        console.log(response);
        if (response.success == true) {
          notifySuccess(
            "password reset success now you can go to login page nad login with new password"
          );
          window.location.href = "/login";
        } else if (response.success === "false") {
          notifyError(response.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const rule = {
    password: {
      required: "password field is required",
      minLength: {
        value: 8,
        message: "password length at least be 8 ch. long",
      },
      maxLength: {
        value: 20,
        message: "password length can not be more then 20 ch.",
      },
    },
  };

  return (
    <>
      <div className="flex flex-col  min-h-screen items-center">
        <Toaster />
        <div className="mt-10 flex items-center justify-center">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                id="password"
                name="password"
                {...register("password", rule.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
              <label
                className="mt-5 block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                id="password"
                name="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default resetPassword;

// &RBzecdBoJ%5
