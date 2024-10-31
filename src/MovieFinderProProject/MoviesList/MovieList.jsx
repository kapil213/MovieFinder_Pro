 export default function MovieList({ movies ,selectIdHandle }) {
    return (
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <li key={movie.imdbID}
           onClick={()=>selectIdHandle(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }