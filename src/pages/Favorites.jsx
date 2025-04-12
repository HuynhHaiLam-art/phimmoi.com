import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
        return (
          <div className="favorites">
            <h2>Phim yêu thích</h2>
        <div className="movie-grid">
          {favorites.map(
              (movie) =>
                  (
                      <MovieCard movie={movie} key={movie.id} />
                  )
          )}
      </div>
      </div>
      );
    }

  return <div className="favorites-empty"> 
   <h2>Chưa có phim yêu thích hả</h2>
   <p>Thêm phim yêu thích vào đây nè</p>
  </div>
}
export default Favorites;