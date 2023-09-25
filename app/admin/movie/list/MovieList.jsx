import Link from "next/link";
import { Trash, Pencil } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });

const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};

const MovieList = ({ movies, onDeleteMovie }) => {
  const handleDelete = (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`http://localhost:3001/api/v1/movie/deleteMovieById/${movieId}`, {
        method: "DELETE",
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
            notifySuccess("Movie deleted");
            onDeleteMovie();
          } else {
            notifyError("Some error occurred while deleting the movie");
          }
        })
        .catch((error) => {
          console.error("Error during delete:", error);
          notifyError("Some error occurred while deleting the movie");
        });
    }
  };

  return (
    <div className="grid grid-cols-1 px-5 py-10 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <Toaster />
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="bg-white rounded-lg overflow-hidden shadow-md relative border-2"
        >
          <div className="p-4">
            <Link href={`list/${movie._id}`}>
              <div>
                <h2 className="text-xl font-semibold hover:text-indigo-600 transition duration-300 ease-in-out">
                  {movie.name}
                </h2>
              </div>
            </Link>
            {/* Edit icon */}
            <Link
              href={`/admin/movie/edit/${movie._id}`}
              className="absolute top-2 right-14 text-black hover:text-indigo-600 border-2 p-1 rounded-lg"
            >
              <Pencil />
            </Link>
            {/* Remove icon */}
            <a
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer border-2 p-1  rounded-lg"
              onClick={() => handleDelete(movie._id)}
            >
              <Trash />
            </a>

            <img
              className="inline-block my-5 h-14 w-14 rounded-full"
              src={movie.thumbnailImg}
              alt={movie.displayName}
            />
            <p className="text-gray-500">{movie.displayName}</p>
            <p className="text-gray-600">Year: {movie.year}</p>
            <p className="text-gray-600">IMDb Rating: {movie.imdbRating}</p>
            <p className="text-gray-600">Duration: {movie.movieTime}</p>
            <p className="text-gray-600">Director: {movie.director}</p>
            <p className="text-gray-600">Writers: {movie.writers.join(", ")}</p>
            <p className="text-gray-600">Cast: {movie.cast.join(", ")}</p>
            <p className="text-gray-600">Genre: {movie.genre.join(", ")}</p>

            <p className="text-gray-600">
              processingState: {movie.processingState}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
