import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTrendingMovies, getMoviesByGenre, searchMovies } from '../../services/tmdb';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    genres: Array<{ id: number; name: string }>;
    popularity: number;
    genre_ids: number[];
}

interface MoviesState {
    trending: Movie[];
    searchResults: Movie[];
    selectedGenre: number | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
}

const initialState: MoviesState = {
    trending: [],
    searchResults: [],
    selectedGenre: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
};

export const fetchTrendingMovies = createAsyncThunk(
    'movies/fetchTrending',
    async () => {
        const response = await getTrendingMovies();
        return response.data;
    }
);

export const fetchMoviesByGenre = createAsyncThunk(
    'movies/fetchByGenre',
    async ({ genreId, page }: { genreId: number; page: number }) => {
        const response = await getMoviesByGenre(genreId, page);
        return response.data;
    }
);

export const searchMoviesAsync = createAsyncThunk(
    'movies/search',
    async ({ query, page }: { query: string; page: number }) => {
        const response = await searchMovies(query, page);
        return response.data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setTrending: (state, action: PayloadAction<Movie[]>) => {
            state.trending = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<Movie[]>) => {
            state.searchResults = action.payload;
        },
        setSelectedGenre: (state, action: PayloadAction<number | null>) => {
            state.selectedGenre = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.trending = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch trending movies';
            })
            .addCase(fetchMoviesByGenre.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movies by genre';
            })
            .addCase(searchMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(searchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search movies';
            });
    },
});

export const {
    setTrending,
    setSearchResults,
    setSelectedGenre,
    setLoading,
    setError,
    setCurrentPage
} = moviesSlice.actions;

export default moviesSlice.reducer; 