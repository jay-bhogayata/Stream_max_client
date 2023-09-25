"use client";
import VideoPlayer from "@/app/components/VideoPlayer";
import React, { useEffect, useState } from "react";
import "plyr/dist/plyr.css";

const page = ({ params }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovies();
  }, []);
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/movie/userGetMovieById/${params.id}`
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

  console.log(params);
  return (
    <div>
      {console.log(movies.streamUrl)}
      {movies.streamUrl ? (
        <VideoPlayer videoSource={movies.streamUrl} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default page;
