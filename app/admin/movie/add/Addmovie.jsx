"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

const Addmovie = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    fetch("http://localhost:3001/api/v1/movie/addMovie", {
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
          notifySuccess("movie added");
          router.push("/admin/movie/list");
        } else {
          notifyError("some error");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="">
      <Toaster />
      <h1 className="text-center my-2 text-2xl">Add Movie</h1>
      <div className="mt-10 shadow p-4 py-6 sm:p-6 rounded-lg bg-gray-100 ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5 mt-5"
          encType="multipart/form-data"
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
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            onClick={handleSubmit(handleFormSubmit)}
          >
            add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addmovie;
