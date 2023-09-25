"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

const profile = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [nameUpdateOpen, setNameUpdateOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cancelButtonRef = useRef(null);

  const router = useRouter();

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user === null) {
        // window.location.href = "/";
      }
      if (user !== null) {
        const userInfo = JSON.parse(user);
        setValue("name", userInfo.name);
        setData(userInfo);
      }
    }
  }, []);

  const handleDeleteAccount = () => {
    fetch(`${server_url}/deleteAccount`, {
      method: "delete",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-expose-headers": "Set-Cookie",
        sameSite: "none",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          notifySuccess(d.message);
          setDeleteAccountOpen(!deleteAccountOpen);
          handleLogout();
        } else {
          notifyError(d.message);
        }
      })
      .catch((e) => notifyError(e));
  };

  const handleNameUpdate = (d) => {
    const sendData = {
      email: data.email,
      newUserName: d.name,
    };
    fetch(`${server_url}/updateUserName`, {
      method: "post",
      body: JSON.stringify(sendData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-expose-headers": "Set-Cookie",
        sameSite: "none",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        const prevDate = data;
        prevDate.name = data.name;
        notifySuccess(d.message);
        setNameUpdateOpen(!nameUpdateOpen);
        const prevData = data;
        prevData.name = d.user.name;
        setData(prevData);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((e) => notifyError(e));
  };

  const handleCancelSubscription = () => {
    const cusData = {
      stripeCustomerId: data.stripeCustomerId,
    };
    console.log(data.stripeCustomerId);
    fetch(`${server_url}/cancelSubscription`, {
      method: "post",
      body: JSON.stringify(cusData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-expose-headers": "Set-Cookie",
        sameSite: "none",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        const prevData = data;
        prevData.subscribed = false;
        setData(prevData);
        localStorage.setItem("user", JSON.stringify(data));

        fetch(`${server_url}/updateClient`, {
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
          .then((d) => {
            if (data.success) {
              notifySuccess(d.message);
              router.push("/");
            }
          })
          .catch((e) => notifyError(e));
        notifySuccess(d.message);
      })
      .catch((e) => console.log(data));
  };

  const handleLogout = () => {
    fetch(`${server_url}/logout`, {
      credentials: "include",
      sameSite: "none",
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.success) {
          notifySuccess("logout");
          localStorage.clear();
          window.location.href = "/";
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSendMail = (e) => {
    console.log(data);
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
      .then((data) => {
        fetch(`${server_url}/password/forgot`, {
          method: "post",
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "access-control-expose-headers": "Set-Cookie",
            sameSite: "none",
          },
        });
        notifySuccess(data.message);
      })
      .catch((e) => notifyError(e));
  };
  console.log(data);
  {
    return (
      <>
        <div className="flex flex-col  min-h-screen items-center">
          <Toaster />

          {/* */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <AlertCircle color="#e01b24" />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Are you sure you want to cancel your subscription
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to cancel your
                                subscription ? doing this will remove your
                                access to watching movies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          onClick={() => {
                            handleCancelSubscription(), setOpen(false);
                          }}
                        >
                          cancel my sub
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => {
                            setOpen(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {/*  */}
          <Transition.Root show={nameUpdateOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              update user name
                            </Dialog.Title>
                            <div className="mt-2">
                              <input
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                {...register("name", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                          onClick={handleSubmit(handleNameUpdate)}
                        >
                          update name
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => {
                            setNameUpdateOpen(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {/*  */}
          <Transition.Root show={deleteAccountOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setDeleteAccountOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <AlertCircle color="#e01b24" />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              delete account
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete your account?
                                All of your data will be permanently removed.
                                This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          onClick={() => {
                            handleDeleteAccount(),
                              setDeleteAccountOpen(!deleteAccountOpen);
                          }}
                        >
                          delete account
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => {
                            setDeleteAccountOpen(!deleteAccountOpen);
                          }}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {/*  */}
          <div className="flex  w-full justify-center items-center space-x-10 ">
            <div className="space-y-1">
              <p className="text-3xl py-5">Hello, {data.name}</p>
              <p className="text-xl py-1">email : {data.email}</p>
            </div>
          </div>

          {data.subscribed === true ? (
            <>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-purple-600 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600
        w-1/2
        md:w-1/4 mt-10"
                onClick={() => router.push("/movie/list")}
              >
                already subscribed enjoy watching
              </button>
              <button
                type="submit"
                className="flex my-6 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
        w-1/2
        md:w-1/4"
                onClick={() => setOpen(true)}
              >
                cancel subscription
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="flex justify-center rounded-md bg-stone-900 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600
        w-1/2
        md:w-1/4 mt-10"
              onClick={() => router.push("/payment")}
            >
              subscribe for 199 &#8377;
            </button>
          )}
          {data.role === "ADMIN" ? (
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-stone-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900
                    my-10
                    md:w-1/4"
              onClick={() => router.push("/admin")}
            >
              go to admin panel
            </button>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="flex justify-center rounded-md bg-blue-900 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
        w-1/2
        md:w-1/4 mt-10"
            onClick={() => setNameUpdateOpen(!nameUpdateOpen)}
          >
            update username
          </button>

          <button
            type="submit"
            className="my-5 flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
        w-1/2
        md:w-1/4"
            onClick={handleSendMail}
          >
            reset password
          </button>
          <button
            type="submit"
            className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
        w-1/2
        md:w-1/4"
            onClick={handleLogout}
          >
            logout
          </button>
          <button
            type="submit"
            className="flex my-5 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
        w-1/2
        md:w-1/4"
            onClick={() => setDeleteAccountOpen(true)}
          >
            delete your account
          </button>
          {/*
           */}
        </div>
      </>
    );
  }
};

export default profile;
