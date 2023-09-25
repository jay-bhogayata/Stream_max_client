"use client";
import React, { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import Link from "next/link";

import { notifySuccess } from "./NotifySuccess";
import { Toaster, toast } from "react-hot-toast";
const menuItems = [
  {
    name: "All Movies",
    href: "/movie/list",
  },
  {
    name: "Movies Categories",
    href: "/movie/categories",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [data, setData] = useState({});
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  console.log(data);
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
  return (
    <div className="relative w-full bg-black text-white py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 text-white">
        <div className="inline-flex items-center space-x-2">
          <Link className="font-bold text-2xl text-red-500  " href={"/"}>
            StreamMax
          </Link>
        </div>
        <div className="hidden lg:block  self-center">
          <ul className="inline-flex space-x-48">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-white-800 "
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          {console.log(data.email)}
          {data.email !== undefined ? (
            <div className="space-x-3 flex">
              {" "}
              <Link
                type="button"
                className="flex rounded-md bg-blue-500 mx-10 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
                href={"/profile"}
              >
                <User />
                <span className="px-2">Profile</span>
              </Link>
              <button
                type="button"
                className="rounded-md bg-red-500 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
                onClick={handleLogout}
              >
                logout
              </button>
            </div>
          ) : (
            <Link
              type="button"
              className="rounded-md bg-red-500 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
              href={"/login"}
            >
              login
            </Link>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 rounded-lg  bg-black shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold ml-2 text-xl text-red-500 font-bold">
                      StreamMax
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold "
                      >
                        <span className="ml-3 text-base font-medium text-white-900 mb-5">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                {data.email !== undefined ? (
                  <div className="space-x-3 w-full flex flex-col space-y-4 ">
                    {" "}
                    <Link
                      type="button"
                      className="rounded-md bg-blue-500 ml-2 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black  items-center text-center"
                      href={"/profile"}
                    >
                      MyProfile
                    </Link>
                    <button
                      type="button"
                      className="rounded-md bg-red-500 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
                      onClick={handleLogout}
                    >
                      logout
                    </button>
                  </div>
                ) : (
                  <Link
                    type="button"
                    className="rounded-md bg-red-500 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
                    href={"/login"}
                  >
                    login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default Navbar;
