"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Rating } from "@mui/material";
import { notifySuccess } from "@/app/components/NotifySuccess";
import { notifyError } from "@/app/components/NotifyError";
import { Star } from "lucide-react";

export default function Page({ params }) {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const [movies, setMovies] = useState([]);

  const cast = movies.cast;
  const genre = movies.genre;
  const writer = movies.writers;

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  let avg;

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRating = async () => {
    setOpen(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const userMail = user.email;
    const data = {
      movieId: params.id,
      rating: value,
      email: userMail,
    };
    fetch("http://localhost:3001/api/v1/movie/rateMovie", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        sameSite: "none",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          notifySuccess(data.message);
          fetchMovies();
        } else {
          notifyError(data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/movie/userGetMovieById/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const numbers = data?.movie?.userRating;
      if (numbers.length == 0) {
        data.movie.userRating = 0;
      } else {
        let average =
          numbers.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          ) / numbers.length;
        data.movie.userRating = average;
      }
      setMovies(data.movie);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push(`/movie/watch/${movies._id}`);
  };

  return (
    <div classNameName="flex flex-col justify-center items-center">
      <div className="text-black">
        <div className="pt-6">
          <header className=" py-4">
            <div className="container mx-auto max-w-2xl pt-10 sm:px-8 lg:max-w-7xl">
              <h1 className="text-5xl my-5 font-semibold">
                {movies.displayName}
              </h1>
              <p className="text-sm flex">
                Release Year: {movies.year} | Rating: {movies.imdbRating}{" "}
                <svg
                  className="mb-3"
                  xmlns="http://www.w3  .org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#f6d32d"
                  stroke="#f6d32d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </p>
            </div>
          </header>
          {/* <!-- Image gallery --> */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3  overflow-hidden rounded-lg lg:block">
              <img
                src={movies.thumbnailImg}
                alt="Two each of gray, white, and black shirts laying flat."
                className="h-full border-2 border-black rounded-lg w-full px-10 md:px-0 object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex space-x-10">
              {genre == undefined ? (
                <></>
              ) : (
                genre.map((g) => (
                  <h1 key={g} className="text-black text-xl font-semibold">
                    {g}
                  </h1>
                ))
              )}
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg py-22">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-base font-semibold leading-6 text-gray-900"
                                >
                                  Rate the Movie
                                </Dialog.Title>
                                <div className="mt-2 py-5 ">
                                  <Rating
                                    name="simple-controlled"
                                    value={value}
                                    size="large"
                                    onChange={(event, newValue) => {
                                      setValue(newValue);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                              onClick={handleRating}
                            >
                              rate now
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
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
              <button
                type="submit"
                className="mt-10 flex w-full 
                  cursor-pointer
                  items-center justify-center rounded-md border border-transparent bg-yellow-400 px-8 py-3 text-base font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
                onClick={() => setOpen(!open)}
              >
                Rate Movie
              </button>
              <form className="mt-20" onSubmit={handleSubmit}>
                <button
                  type="submit"
                  className="mt-10 flex w-full 
                  cursor-pointer
                  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Watch Movie
                </button>
              </form>
            </div>
            <h3 className="text-xl pt-5 font-semibold  flex">
              StreamMax User rating :{" "}
              {Math.round(movies.userRating) === 0 ? (
                "No rating available"
              ) : (
                <span className="ml-5 text-yellow-400 flex">
                  {Math.round(movies.userRating)}
                  <svg
                    className="ml-3 mt-[4px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f6d32d"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
              )}
            </h3>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 text-black">
              <div>
                <h3 className="text-xl py-2 font-semibold text-black">
                  Description
                </h3>

                <div className="space-y-6">
                  <p className="text-base">{movies.shortIntro} </p>
                </div>
              </div>

              <div className="mt-10">
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-lg">
                      <span className="">Director - {movies.director}</span>
                    </li>
                    <li className="text-lg">
                      <span className="text-lg">
                        writers -
                        {writer == undefined ? (
                          <></>
                        ) : (
                          writer.map((w) => (
                            <span key={w} className="space-y-3">
                              <span className="text-black mx-3">{w}</span>
                            </span>
                          ))
                        )}
                      </span>
                    </li>

                    <li className="text-lg">
                      <span className="text-xl">
                        cast -
                        {cast == undefined ? (
                          <></>
                        ) : (
                          cast.map((c) => (
                            <span key={c} className="space-y-3 text-lg">
                              <span className="text-black mx-3">{c}</span>
                            </span>
                          ))
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-white">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-white">
                    The 6-Pack includes two black, two white, and two heather
                    gray Basic Tees. Sign up for our subscription service and be
                    the first to get new, exciting colors, like our upcoming
                    &quot;Charcoal Gray&quot; limited release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
