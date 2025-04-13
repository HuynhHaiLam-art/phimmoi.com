const API_KEY = '408adfbfad2ca647e92ffdffef879efa'; // Thay thế bằng API key của bạn

export const getMovieDetails = async (movieId) => {
    try {
        const [details, credits, videos] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=vi-VN`),
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=vi-VN`),
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=vi-VN`)
        ]);

        const [movieData, creditsData, videosData] = await Promise.all([
            details.json(),
            credits.json(),
            videos.json()
        ]);

        return {
            ...movieData,
            credits: creditsData,
            videos: videosData.results
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const getImageUrl = (path, size = 'original') => {
    if (!path) return '/placeholder.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};