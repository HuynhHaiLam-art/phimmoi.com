import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPhimMoi } from '../services/api';
import '../css/Home.css';

function PhimMoi() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getPhimMoi();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="movies-container">
            <h2 className="section-title">Phim Mới Cập Nhật</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default PhimMoi;