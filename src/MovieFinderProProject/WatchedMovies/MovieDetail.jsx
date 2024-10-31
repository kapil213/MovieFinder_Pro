import { useEffect, useState } from "react";
import StarRating from "../StarRating";
export default function MovieDetail({
  id,
  selectedIdclose,
  HandleWatchedChange,
  watched,
}) {
  let [movie, setmovie] = useState({});
  let [isloading, setIsloading] = useState(false);
  let [userRating, setuserRating] = useState("");
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const iswatched = watched.map((movie) => movie.imdbID).includes(id);

  const handlewatchlist = () => {
    let WatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: userRating,
    };

    HandleWatchedChange(WatchedMovie);
    selectedIdclose();
  };
  useEffect(
    function () {
      setIsloading(true);
      async function getmoviedetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=a243e032&i=${id}`
        );

        const data = await res.json();
        // console.log(data);
        setmovie(data);
        setIsloading(false);
      }
      getmoviedetails();
    },
    [id]
  );

  useEffect(() => {
    if(!title) return;
    document.title = `Movie || ${title} `;
  }, [title]);

  const HandleTitlechange = ()=>{
    //  console.log("Hello kapil");
    document.title="usePopcorn";
  }
  return (
    <div>
      <button
        onClick={()=>{
          selectedIdclose()
          HandleTitlechange()
        }}
        className="text-xl border mt-4 ml-3 px-2 rounded-full font-extrabold text-white bg-gray-800"
      >
        &larr;
      </button>
      <br></br>
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <div className=" h-full w-full flex px-5 ">
              <div className="h-56 w-48 px-2 ">
                <img src={poster} alt="" className="w-full h-full rounded-sm" />
              </div>
              <div className=" ml-8 px-2 py-4">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <p className="text-xl mt-3">
                  {released} &bull;{runtime}
                </p>
                <p className="text-xl mt-3">{genre}</p>
                <p className="text-xl mt-3">
                  <i class="mr-3">⭐️</i>
                  {imdbRating} IMDB Rating
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <div className="bg-slate-50 py-2 px-2 rounded-lg flex flex-col justify-center items-center">
                {!iswatched ? (
                  <>
                    <StarRating maxlength={10} onSetRating={setuserRating} />
                    {userRating && (
                      <button
                        className="w-64 px-7  py-1 border-2 text-white rounded-lg mt-3 font-bold text-xl bg-black"
                        onClick={()=>{
                          handlewatchlist()
                          HandleTitlechange()
                          // setuserRating("")
                        }}
                      >
                        {" "}
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-black text-2xl font-bold px-2">
                    You Rated This Movie
                  </p>
                )}
              </div>
            </div>
          </header>
          <section>
            <div className="px-20 py-8">
              <p className="text-xl">
                <em>{plot}</em>
              </p>
              <p className="text-xl mt-3">Starring {actors}</p>
              <p className="text-xl mt-3 font-semibold">
                Directed By {director}
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className=" w-full flex h-full justify-center items-center ">
      <span className="text-3xl">Loading.....</span>
    </div>
  );
}
