import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { getMoviesByGenre, getGenres } from '../services/api';
import '../css/Home.css';

function PhimTheoTheLoai() {
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const { genreId } = useParams();

    const genreTranslations = {
        'Action': 'Hành Động',
        'Adventure': 'Phiêu Lưu',
        'Animation': 'Hoạt Hình',
        'Comedy': 'Hài Hước',
        'Crime': 'Tội Phạm',
        'Documentary': 'Tài Liệu',
        'Drama': 'Chính Kịch',
        'Family': 'Gia Đình',
        'Fantasy': 'Viễn Tưởng',
        'History': 'Lịch Sử',
        'Horror': 'Kinh Dị',
        'Music': 'Âm Nhạc',
        'Mystery': 'Bí Ẩn',
        'Romance': 'Lãng Mạn',
        'Science Fiction': 'Khoa Học Viễn Tưởng',
        'TV Movie': 'Phim Truyền Hình',
        'Thriller': 'Giật Gân',
        'War': 'Chiến Tranh',
        'Western': 'Cao Bồi',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch genre name
                const genres = await getGenres();
                const genre = genres.find(g => g.id === parseInt(genreId));
                const translatedName = genre ? genreTranslations[genre.name] || genre.name : '';
                setGenreName(translatedName);

                // Fetch movies by genre
                const movieData = await getMoviesByGenre(genreId);
                setMovies(movieData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [genreId]);

    return (
        <div className="movies-container">
            <h2 className="section-title">Phim Thể Loại: {genreName}</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default PhimTheoTheLoai;