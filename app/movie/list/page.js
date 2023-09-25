"use client";

import { notifyError } from "@/app/components/NotifyError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/movie/getAllMovie",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "access-control-expose-headers": "Set-Cookie",
            sameSite: "none",
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        notifyError("Not authorized");
        router.push("/");

        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.movie);
      setMovies(data.movie);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //

  const filteredMovies = movies.filter((movie) =>
    movie.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl pb-10  font-bold tracking-tight text-gray-900">
            Movie catalogue
          </h2>
          <form>
            <input
              type="text"
              placeholder="Search movie by name"
              className="border-2 px-5 py-1 rounded-lg outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {filteredMovies.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filteredMovies.map((movie) => (
                <Link href={`list/${movie._id}`} key={movie._id}>
                  <div className="group relative border-2 p-2 rounded-lg">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={movie.thumbnailImg}
                        alt={movie.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-700">
                          <a href={"/"}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 text-lg "
                            />
                            {movie.displayName}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {movie.year}
                        </p>
                      </div>
                      <p className="text-sm  text-gray-900 flex font-bold">
                        {movie.imdbRating} &#9733;
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
