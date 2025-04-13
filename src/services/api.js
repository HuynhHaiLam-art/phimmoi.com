const API_KEY = "408adfbfad2ca647e92ffdffef879efa";
const BASE_URL = "https://api.themoviedb.org/3";

// Helper function để xử lý fetch request
const fetchFromApi = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }
};

// Lấy danh sách phim phổ biến
export const getPopularMovies = async () => {
    try {
        const data = await fetchFromApi(`/movie/popular?api_key=${API_KEY}&language=vi-VN`);
        return data.results;
    } catch (error) {
        console.error('Error getting popular movies:', error);
        throw error;
    }
};

// Tìm kiếm phim
export const searchMovies = async (query) => {
    try {
        const data = await fetchFromApi(
            `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=vi-VN`
        );
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

// Lấy danh sách phim lẻ
export const getPhimLe = async () => {
    try {
        const data = await fetchFromApi(
            `/discover/movie?api_key=${API_KEY}&with_original_language=en|ko|ja&sort_by=popularity.desc&language=vi-VN`
        );
        return data.results;
    } catch (error) {
        console.error('Error getting phim le:', error);
        throw error;
    }
};

// Lấy danh sách phim mới
export const getPhimMoi = async () => {
    try {
        const data = await fetchFromApi(`/movie/now_playing?api_key=${API_KEY}&language=vi-VN`);
        return data.results;
    } catch (error) {
        console.error('Error getting new movies:', error);
        throw error;
    }
};

// Lấy danh sách thể loại
export const getGenres = async () => {
    try {
        const data = await fetchFromApi(`/genre/movie/list?api_key=${API_KEY}&language=vi-VN`);
        return data.genres;
    } catch (error) {
        console.error('Error getting genres:', error);
        throw error;
    }
};

// Lấy danh sách phim theo thể loại
export const getMoviesByGenre = async (genreId) => {
    try {
        const data = await fetchFromApi(
            `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=vi-VN`
        );
        return data.results;
    } catch (error) {
        console.error('Error getting movies by genre:', error);
        throw error;
    }
};

// Lấy chi tiết phim
export const getMovieDetails = async (movieId) => {
    try {
        const data = await fetchFromApi(
            `/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,similar&language=vi-VN`
        );
        return data;
    } catch (error) {
        console.error('Error getting movie details:', error);
        throw error;
    }
};

// Lấy danh sách phim đề xuất
export const getSimilarMovies = async (movieId) => {
    try {
        const data = await fetchFromApi(
            `/movie/${movieId}/similar?api_key=${API_KEY}&language=vi-VN`
        );
        return data.results;
    } catch (error) {
        console.error('Error getting similar movies:', error);
        throw error;
    }
};

// Lấy danh sách phim top rated
export const getTopRatedMovies = async () => {
    try {
        const data = await fetchFromApi(`/movie/top_rated?api_key=${API_KEY}&language=vi-VN`);
        return data.results;
    } catch (error) {
        console.error('Error getting top rated movies:', error);
        throw error;
    }
};

// Lấy danh sách phim sắp chiếu
export const getUpcomingMovies = async () => {
    try {
        const data = await fetchFromApi(`/movie/upcoming?api_key=${API_KEY}&language=vi-VN`);
        return data.results;
    } catch (error) {
        console.error('Error getting upcoming movies:', error);
        throw error;
    }
};

// Alias cho getPhimMoi để sử dụng trong component MovieSlider
export const getNewMovies = getPhimMoi;