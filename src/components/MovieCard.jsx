import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
    const { currentUser } = useAuth();
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (!currentUser) {
            // TODO: Show login modal
            return;
        }
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            <div className="movie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/movie-placeholder.jpg';
                    }}
                />
                <div className="movie-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}
                    >
                        ♡
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h2>{movie.title}</h2>
                <div className="movie-meta">
                    <span className="year">{movie.release_date?.split("-")[0]}</span>
                    <span className="rating">
                        {movie.vote_average?.toFixed(1)}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;