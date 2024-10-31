import { useState } from "react";

export default function MoviesWatchedList({ watched, HandleWatchedDelete }) {
  let [currid, setcurrid] = useState();
  // console.log(currid);

  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <div className="flex">
            <div className="flex flex-col">
              <h3>{movie.title}</h3>
              <div>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{movie.runtime} min</span>
                </p>
              </div>
            </div>
            <button
              className="text-xl bg-red-700 text-white px-3 font-bold rounded-xl py-1 ml-7"
              onClick={() => {
                HandleWatchedDelete(movie.imdbID);
              }}
            >
              close
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
