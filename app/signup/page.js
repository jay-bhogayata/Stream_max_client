"use client";

import Link from "next/link";
import "../globals.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 10000 });
};
export default () => {
  // rhf

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  //   handle Auth
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleAuth = (data) => {
    console.log("Hello");
    const email = data.email;
    fetch(`${server_url}/signupOtpSend`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          openModal();
          notifySuccess(`otp send successfully to ${email}`);
          console.log(data.message);
        } else {
          notifyError(`${data.message}`);
          console.log(data.message);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleVerify = (data) => {
    console.log(data);
    const email = data.email;
    const otp =
      data.input1 +
      data.input2 +
      data.input3 +
      data.input4 +
      data.input5 +
      data.input6;
    console.log(otp);
    const d = {
      email: data.email,
      otp: otp,
    };
    fetch(`${server_url}/signup`, {
      method: "POST",
      body: JSON.stringify(d),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.message);
          // window.location.href = "/";
          notifySuccess(`${email} is verified now you can login with it.`);
          window.location.href = "/login";
        } else {
          // TODO: check if otp is wrong plz try agin later
          closeModal();
          notifyError(data.message);
          console.log(data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  //   model
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <main className="w-full overflow-y-hidden h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-5">
      <Toaster />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-transparent  h-screen w-full flex">
                  <div className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all self-center mx-auto">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      verify your email
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        we have send otp to you email address and it is valid
                        for 10 min.
                      </p>
                    </div>

                    <div className="flex justify-center items-center my-5 px-5">
                      <div className="">
                        <form className="flex gap-3">
                          <input
                            type="text"
                            className="md:w-14 w-10 md:h-14 h-10 text-center border rounded focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:border-blue-400"
                            pattern="[0-9]*"
                            inputMode="text"
                            maxLength="1"
                            required
                            {...register("input1")}
                          />
                          <input
                            type="text"
                            className="md:w-14 w-10 md:h-14 h-10 text-center border rounded focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:border-blue-400"
                            pattern="[0-9]*"
                            inputMode="text"
                            maxLength="1"
                            required
                            {...register("input2")}
                          />
                          <input
                            type="text"
                            className="md:w-14 w-10 md:h-14 h-10 text-center border rounded focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:border-blue-400"
                            pattern="[0-9]*"
                            inputMode="text"
                            maxLength="1"
                            required
                            {...register("input3")}
                          />
                          <input
                            type="text"
                            className="md:w-14 w-10 md:h-14 h-10 text-center border rounded focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:border-blue-400"
                            pattern="[0-9a-zA-Z]*"
                            inputMode="text"
                            maxLength="1"
                            required
                            {...register("input4")}
                          />
                          <input
                            type="text"
                            className="md:w-14 w-10 md:h-14 h-10 text-center border rounded focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:border-blue-400"
                            pattern="[0-9a-zA-Z]*"
                            inputMode="text"
                            maxLength="1"
                            required
                            {...register("input5")}
                          />
                          <input
                            type="text"
                            className="md:w-14 w-10 md:h-14 h-10 text-center border rounded focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:border-blue-400"
                            pattern="[0-9a-zA-Z]*"
                            inputMode="text"
                            maxLength="1"
                            required
                            {...register("input6")}
                          />
                        </form>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        onClick={handleSubmit(handleVerify)}
                      >
                        signup
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="w-full space-y-6 text-gray-600 sm:max-w-md px-3 ">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600">StreamMax</h1>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 rounded-lg">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-600  ">name filed is required.</span>
              )}
            </div>
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
                {...register("password", rule.password)}
              />
              {errors.password && (
                <span className="text-red-600 ">
                  {errors.password.message}.
                </span>
              )}
            </div>
            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleSubmit(handleAuth)}
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
