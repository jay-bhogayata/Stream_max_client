"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  console.log(server_url);
  //
  const handleAuth = (data) => {
    console.log(`${server_url}/login`);
    fetch(`${server_url}/login`, {
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

  return (
    <main className="w-full overflow-y-hidden h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-5">
      <Toaster />
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md px-3 ">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600">StreamMax</h1>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Login into account
            </h3>
            <p className="">
              Not have account with us?{" "}
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                signup
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 rounded-lg">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 ">email field is required.</span>
              )}
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 ">
                  {errors.password.message}.
                </span>
              )}
              <Link className="text-indigo-600" href="/sendResetPasswordMail">
                <p className="mt-3">Forgot Password ?</p>
              </Link>
            </div>
            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleSubmit(handleAuth)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
