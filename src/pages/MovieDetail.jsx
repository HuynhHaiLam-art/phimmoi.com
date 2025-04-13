import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdb';
import '../css/MovieDetail.css';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError('Không thể tải thông tin phim');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return <div className="movie-detail-loading">Đang tải...</div>;
    if (error) return <div className="movie-detail-error">{error}</div>;
    if (!movie) return <div className="movie-detail-error">Không tìm thấy phim</div>;

    const trailer = movie.videos?.find(video => video.type === 'Trailer') || movie.videos?.[0];

    return (
        <div className="movie-detail-page">
            <div 
                className="movie-detail-backdrop" 
                style={{
                    backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`
                }}
            >
                <div className="movie-detail-backdrop-overlay" />
            </div>

            <div className="movie-detail-content-wrapper">
                <div className="movie-detail-main-content">
                    <div className="movie-detail-poster-section">
                        <img 
                            src={getImageUrl(movie.poster_path, 'w500')} 
                            alt={movie.title} 
                            className="movie-detail-poster"
                        />
                        <div className="movie-detail-action-buttons">
                            <button className="movie-detail-watch-now-btn">
                                <i className="fas fa-play"></i>
                                Xem phim
                            </button>
                            <button className="movie-detail-trailer-btn">
                                <i className="fas fa-film"></i>
                                Trailer
                            </button>
                        </div>
                    </div>

                    <div className="movie-detail-info-section">
                        <h1 className="movie-detail-title">{movie.title}</h1>
                        
                        <div className="movie-detail-metadata">
                            <div className="movie-detail-meta-item">
                                <i className="fas fa-calendar"></i>
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                            <div className="movie-detail-meta-item">
                                <i className="fas fa-clock"></i>
                                <span>{Math.floor(movie.runtime/60)}h {movie.runtime%60}m</span>
                            </div>
                            <div className="movie-detail-meta-item movie-detail-rating">
                                <i className="fas fa-star"></i>
                                <span>{movie.vote_average.toFixed(1)}/10</span>
                                <span className="movie-detail-vote-count">({movie.vote_count} đánh giá)</span>
                            </div>
                        </div>

                        <div className="movie-detail-genres">
                            {movie.genres?.map(genre => (
                                <span key={genre.id} className="movie-detail-genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="movie-detail-overview">
                            <h3>Nội dung phim</h3>
                            <p>{movie.overview}</p>
                        </div>

                        {trailer && (
                            <div className="movie-detail-trailer-section">
                                <h3>Trailer</h3>
                                <div className="movie-detail-trailer-container">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="Movie Trailer"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}

                        <div className="movie-detail-cast-section">
                            <h3>Diễn viên chính</h3>
                            <div className="movie-detail-cast-grid">
                                {movie.credits?.cast?.slice(0, 6).map(actor => (
                                    <div key={actor.id} className="movie-detail-cast-card">
                                        <div className="movie-detail-cast-image">
                                            <img 
                                                src={getImageUrl(actor.profile_path, 'w185')} 
                                                alt={actor.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder-actor.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="movie-detail-cast-info">
                                            <span className="movie-detail-actor-name">{actor.name}</span>
                                            <span className="movie-detail-character-name">{actor.character}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;