"use client";
import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";

const page = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/movie/getAllMovieAdmin",
        {
          method: "GET",

          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            sameSite: "none",
          },
        }
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Movie List</h1>
      <MovieList movies={movies} onDeleteMovie={fetchData} />
    </div>
  );
};

export default page;
