import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdb';
import '../css/MovieSlider.css';

function MovieSlider({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!movies || movies.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === movies.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Chuyển slide mỗi 5 giây

        return () => clearInterval(interval);
    }, [movies]);

    if (!movies || movies.length === 0) return null;

    const currentMovie = movies[currentIndex];

    return (
        <div className="movie-banner">
            <div className="banner-slider">
                <div 
                    className="banner-backdrop" 
                    style={{ backgroundImage: `url(${getImageUrl(currentMovie.backdrop_path)})` }}
                >
                    <div className="banner-overlay">
                        <div className="banner-content">
                            <h2 className="banner-title">{currentMovie.title}</h2>
                            <p className="banner-overview">{currentMovie.overview}</p>
                            <div className="banner-metadata">
                                <span className="banner-rating">
                                    <i className="fas fa-star"></i>
                                    {currentMovie.vote_average?.toFixed(1)}/10
                                </span>
                                <span className="banner-year">
                                    {new Date(currentMovie.release_date).getFullYear()}
                                </span>
                            </div>
                            <Link to={`/movie/${currentMovie.id}`} className="banner-button">
                                <i className="fas fa-play"></i>
                                Xem ngay
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="banner-indicators">
                    {movies.map((_, index) => (
                        <button
                            key={index}
                            className={`banner-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieSlider;