import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import SearchBox from "./Navbar/SearchBox";
import NumResults from "./Navbar/NumResults";
import MovieList from "./MoviesList/MovieList";
import MoviesWatchedList from "./WatchedMovies/MoviesWatchedList";
import WatchedSummary from "./WatchedMovies/WatchedSummary";
import StarRating from "./StarRating";
import MovieDetail from "./WatchedMovies/MovieDetail";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

const KEY = "a243e032";

export default function MainApp(){
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  let [isloding, setIsloading] = useState(false);
  let [error, setError] = useState("");
  let [selectId, setselectId] = useState(null);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function(){
    let storedValue=localStorage.getItem('watched');
    
    return JSON.parse(storedValue);
  });

  const HandleWatchedChange = (data) => {
    setWatched((currdata) => [...currdata, data]);

    // localStorage.setItem("watched",JSON.stringify([...watched,data]))
  };

  const HandleWatchedDelete = (imdbID) => {
    setWatched((currtask) => {
      return currtask.filter((data) => data.imdbID != imdbID);
    });
  };

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsloading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=a243e032&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movie");
          }
          const data = await res.json();
          // console.log(data);

          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }

          if (data.Response === "False") {
            throw new Error(data.Error);
          }
          setMovies(data.Search);
        } catch (err) {
          // console.log(err.message);
          setError(err);
        } finally {
          setIsloading(false);
        }
      }
      fetchMovie();
      // console.log(error);
    },
    [query]
  );

  let selectIdHandle = (id) => {
    setselectId((selectId) => (id === selectId ? null : id));
    // console.log(id);
  };

  let selectedIdclose = () => {
    setselectId(null);
  };

  // useEffect(()=>{
  //   console.log("Hello");
  // })

  // useEffect(function(){
  //   console.log("Empty Array");
  // },[])

  // useEffect(function ()
  // {
  //   console.log("Using array dependencies");
  // },[query])

  return (
    <>
      <Navbar>
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* { isloding ? <Loader/> :<MovieList movies={movies} />} */}
          {isloding && <Loader />}
          {!isloding && !error && (
            <MovieList movies={movies} selectIdHandle={selectIdHandle} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectId ? (
            <MovieDetail
              id={selectId}
              selectedIdclose={selectedIdclose}
              HandleWatchedChange={HandleWatchedChange}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <MoviesWatchedList
                watched={watched}
                HandleWatchedDelete={HandleWatchedDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return (
    <div className=" w-full flex h-full justify-center items-center ">
      <span className="text-3xl">Loading.....</span>
    </div>
  );
}

function Error({ message }) {
  return (
    <div className="w-full flex h-full justify-center items-center ">
      <i class="fa-solid fa-triangle-exclamation h-10 w-10"></i>
      <p className="text-3xl">Movie Not Found</p>
    </div>
  );
}
