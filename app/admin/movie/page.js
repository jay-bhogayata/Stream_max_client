"use client";

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="relative w-full">
      <div className="mx-auto  max-w-7xl items-center justify-between px-4 py-2 space-y-4 sm:px-6 lg:px-8 text-xl">
        <p>This movie page.</p>
        <p>Using this we can add edit and remove movie.</p>
        <br />
        <Link
          href={"/admin/movie/list"}
          className="bg-blue-700 text-white py-2 px-2 rounded-lg"
        >
          List all movies
        </Link>
        <br />
        <br />
        <Link
          href={"/admin/movie/add"}
          className="bg-blue-700 text-white py-2 px-2 rounded-lg"
        >
          add a movie
        </Link>
      </div>
    </div>
  );
};

export default page;
