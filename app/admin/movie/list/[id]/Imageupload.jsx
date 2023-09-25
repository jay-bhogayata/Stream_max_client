"use client";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

export default function ImageUpload({ titlename }) {
  const router = useRouter();

  console.log(titlename);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setTitle(titlename);
    const title = titlename;
    if (!title || !file) {
      setMessage("Please provide both a title and an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    const uploadPromise = toast.promise(
      fetch("http://localhost:3001/api/v1/movie/thumbImgUpload", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          sameSite: "none",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessage("Upload successful");
            setTitle("");
            setFile(null);
            notifySuccess("Upload successful");
            router.push("/admin/movie/list/");
          } else {
            setMessage("Upload failed");
            notifyError("Upload failed");
          }
          console.log(data);
          console.log(data.success);
          console.log(data.message);
          console.log(data.imageUrl);
        })
        .catch((error) => {
          console.error("Error during upload:", error);
          setMessage("Upload failed");
          notifyError("Upload failed");
        }),
      {
        loading: "Uploading...",
        success: "Upload successful!",
        error: "Upload failed!",
      }
    );

    await uploadPromise;
  };

  return (
    <div className="">
      <Toaster />
      <div className="flex justify-center items-center mt-5">
        <div className="bg-white p-6 rounded shadow-md w-full sm:w-96">
          <h1 className="text-2xl font-semibold mb-4">Upload Image</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <form
            id="upload-form"
            className="space-y-4"
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              className="p-2 border rounded w-full"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            >
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
