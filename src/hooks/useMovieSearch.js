import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';

export function useMovieSearch(query) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query.trim()) {
            setMovies([]);
            return;
        }

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const results = await searchMovies(query);
                setMovies(results);
            } catch (err) {
                setError('Không thể tìm kiếm phim');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    return { movies, loading, error };
}