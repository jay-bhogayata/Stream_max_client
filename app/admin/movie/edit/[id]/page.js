"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

export default function Page({ params }) {
  const router = useRouter();
  console.log(params.id);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3001/api/v1/movie/getMovieById/${params.id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              sameSite: "none",
            },
          }
        );
        const data = await resp.json();
        const movie = data.movie;
        console.log(movie);
        setValue("name", movie.name);
        setValue("displayName", movie.displayName);
        setValue("year", movie.year);
        setValue("imdbRating", movie.imdbRating);
        setValue("movieTime", movie.movieTime);
        setValue("shortIntro", movie.shortIntro);
        setValue("director", movie.director);
        setValue("writers", movie.writers);
        setValue("cast", movie.cast);
        setValue("genre", movie.genre);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //
  const handleFormSubmit = (data) => {
    console.log("handle fomr submit", data);
    fetch(`http://localhost:3001/api/v1/movie/updateMovieById/${params.id}`, {
      method: "PUT",
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
          notifySuccess("movie updated");
          router.push("/admin/movie/list");
        } else {
          notifyError("some error");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="px-5 md:px-20 w-full justify-center items-center my-5">
      <h1 className="text-2xl font-bold">edit movie</h1>
      <h1>{params.id}</h1>
      <Toaster />
      <div className="mt-10 shadow p-4 py-6 sm:p-6 rounded-lg bg-gray-100 ">
        <form
          className="space-y-5 mt-5"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {/* Name */}
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600 ">name field is required.</span>
            )}
          </div>
          {/* Display Name */}
          <div>
            <label className="font-medium">Display Name</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("displayName", { required: true })}
            />
            {errors.displayName && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>

          {/* Release year */}
          <div>
            <label className="font-medium">Release year</label>
            <input
              type="number"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("year", { required: true })}
            />
            {errors.year && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* imdbRating */}
          <div>
            <label className="font-medium">imdb Rating</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("imdbRating", { required: true })}
            />
            {errors.imdbRating && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* movieTime */}
          <div>
            <label className="font-medium">movie Time</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("movieTime", { required: true })}
            />
            {errors.movieTime && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* shortIntro */}
          <div>
            <label className="font-medium">short Intro</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("shortIntro", { required: true })}
            />
            {errors.shortIntro && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* director */}
          <div>
            <label className="font-medium">director</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("director", { required: true })}
            />
            {errors.director && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* writers */}
          <div>
            <label className="font-medium">writers</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("writers", { required: true })}
            />
            {errors.writers && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* cast */}
          <div>
            <label className="font-medium">cast</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("cast", { required: true })}
            />
            {errors.cast && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>
          {/* genre */}
          <div>
            <label className="font-medium">genre</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              {...register("genre", { required: true })}
            />
            {errors.genre && (
              <span className="text-red-600 ">this field is required.</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            update Movie
          </button>
        </form>
      </div>
    </div>
  );
}
