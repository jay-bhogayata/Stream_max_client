"use client";
import { useState, useEffect, useRef } from "react";
import Upload from "./uploadVideo";
import ImageUpload from "./Imageupload";
import VideoPlayer from "@/app/components/VideoPlayer";
import "plyr/dist/plyr.css";
export default function Page({ params }) {
  const [movies, setMovies] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fetch movie data when the component mounts
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/movie/getMovieById/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.movie);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-xl mt-5">
        Upload or update raw video and thumbnail image
      </h1>
      <div className="mt-10 text-2xl flex flex-col items-center">
        <p className="ml-2">{movies.name}</p>
        <img
          src={movies.thumbnailImg}
          alt={movies.name}
          className="w-1/2 flex items-center my-10 "
        />
        {movies.streamUrl ? <VideoPlayer videoSource={movies.streamUrl} /> : ""}
        <Upload titlename={movies.name} />
        <ImageUpload titlename={movies.name} />
      </div>
    </div>
  );
}
