import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieSlider from "../components/MovieSlider";
import { searchMovies, getPopularMovies, getPhimMoi } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const popularMovies = await getPopularMovies();
                const latestMovies = await getPhimMoi();
                
                setMovies(popularMovies);
                setNewMovies(latestMovies.slice(0, 5));
            } catch (error) {
                console.error(error);
                setError("Không thể tải danh sách phim");
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Không tìm thấy phim nào");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-wrapper">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Muốn coi phim gì nè..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Tìm kiếm
                    </button>
                </div>
            </form>

            
            {newMovies.length > 0 && !searchQuery && (
            <section className="slider-section">
                <MovieSlider movies={newMovies.slice(0, 5)} /> {/* Giới hạn 5 phim cho slider */}
            </section>
        )}

            <div className="main-content">
                {error ? (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                ) : loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <span>Đang tải...</span>
                    </div>
                ) : (
                    <div className="movies-section">
                        <h2 className="section-title">
                            {searchQuery ? 'Kết quả tìm kiếm' : 'Phim phổ biến'}
                        </h2>
                        <div className="movie-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;