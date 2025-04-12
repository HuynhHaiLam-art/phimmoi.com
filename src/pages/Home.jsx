import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            } catch (error) {
                console.log(error)
                setError("Không thể tải phim phổ biến");
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
}, {})
        
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.log(error)
            setError("Không tìm thấy phim nào");
        }
        finally {
            setLoading(false);
        }
        
    };
    
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Muốn coi phim gì nè..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Tìm kiếm</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        {loading ? <div className="loading">Loading...</div> : <div className="movie-grid">
                {movies.map(
                    (movie) =>
                        (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                )}
            </div>} 
        </div>
    );
}
export default Home;