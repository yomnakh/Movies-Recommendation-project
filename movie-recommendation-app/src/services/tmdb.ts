import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
    console.error('TMDB API key is missing! Please add VITE_TMDB_API_KEY to your .env file');
}

const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
tmdbApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.status_message || 'An error occurred while fetching data';
        console.error('TMDB API Error:', message);
        return Promise.reject(error);
    }
);

export const getTrendingMovies = (page: number = 1) => {
    return tmdbApi.get('/trending/movie/week', {
        params: { page },
    });
};

export const getMoviesByGenre = (genreId: number, page: number = 1) => {
    return tmdbApi.get('/discover/movie', {
        params: {
            with_genres: genreId,
            page,
            sort_by: 'popularity.desc',
        },
    });
};

export const searchMovies = (query: string, page: number = 1) => {
    return tmdbApi.get('/search/movie', {
        params: {
            query,
            page,
            include_adult: false,
        },
    });
};

export const getMovieDetails = (movieId: number) => {
    return tmdbApi.get(`/movie/${movieId}`, {
        params: {
            append_to_response: 'credits,videos,similar',
        },
    });
};

export const getGenres = () => {
    return tmdbApi.get('/genre/movie/list');
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const POSTER_SIZES = {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
} as const;

export const BACKDROP_SIZES = {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
} as const; 