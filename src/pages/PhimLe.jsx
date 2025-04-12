import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPhimLe } from '../services/api';
import '../css/Home.css';

function PhimLe() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getPhimLe();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="movies-container">
            <h2 className="section-title">Phim Lẻ Mới</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default PhimLe;