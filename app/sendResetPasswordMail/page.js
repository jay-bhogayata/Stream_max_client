"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
const handleSendMail = (data) => {
  fetch(`${server_url}/password/forgot`, {
    method: "post",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "access-control-expose-headers": "Set-Cookie",
      sameSite: "none",
    },
  })
    .then((res) => res.json())
    .then((data) => notifySuccess(data.message))
    .catch((e) => notifyError(e));
};

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main className="w-full overflow-y-hidden h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-5">
      <Toaster />
      <div className="bg-white shadow p-4 py-6 sm:p-6 rounded-lg">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <h1 className="text-2xl font-bold">Forgot password?</h1>
          <div>
            <input
              type="email"
              required
              placeholder="email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600 ">email field is required.</span>
            )}
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            onClick={handleSubmit(handleSendMail)}
          >
            send reset email
          </button>
        </form>
      </div>
    </main>
  );
};

export default page;
