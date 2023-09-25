"use client";

import React from "react";
import { Menu, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { notifySuccess } from "../components/NotifySuccess";
import { notifyError } from "../components/NotifyError";
import Link from "next/link";
const menuItems = [
  {
    name: "movie",
    href: "admin/movie",
  },
  {
    name: "user",
    href: "#",
  },
  {
    name: "payment",
    href: "#",
  },
];

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleLogout = () => {
    fetch(`${server_url}/logout`, {
      credentials: "include",
      sameSite: "none",
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.success) {
          notifySuccess("logout success");
          localStorage.clear();
          window.location.href = "/";
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="relative w-full bg-blue-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link href={"/admin"}>
            <span className="font-bold text-2xl text-red-500">StreamMax</span>
          </Link>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`/admin/${item.name}`}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <Link
            type="button"
            className="flex rounded-md bg-blue-500 mx-10 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
            href={"/profile"}
          >
            <User />
            <span className="px-2">Profile</span>
          </Link>
        </div>
        <div className="hidden lg:block">
          <button
            type="button"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link href={"/admin"}>
                      <span className="font-bold text-2xl text-red-500 ml-2">
                        StreamMax
                      </span>
                    </Link>
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
                        href={`/admin/${item.name}`}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
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
                  className="mt-4 w-full rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={handleLogout}
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
