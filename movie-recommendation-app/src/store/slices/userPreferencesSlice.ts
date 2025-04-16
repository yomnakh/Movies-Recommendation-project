import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './moviesSlice';

interface UserPreferencesState {
    favorites: Movie[];
    watchlist: Movie[];
    theme: 'light' | 'dark';
}

function loadPreferences(): UserPreferencesState {
    const savedPreferences = localStorage.getItem('userPreferences');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        return {
            ...preferences,
            theme: savedTheme as 'light' | 'dark'
        };
    }

    return {
        favorites: [],
        watchlist: [],
        theme: 'dark'
    };
}

const initialState: UserPreferencesState = loadPreferences();

const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Movie>) => {
            const index = state.favorites.findIndex(movie => movie.id === action.payload.id);
            if (index === -1) {
                state.favorites.push(action.payload);
            } else {
                state.favorites.splice(index, 1);
            }
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },
        toggleWatchlist: (state, action: PayloadAction<Movie>) => {
            const index = state.watchlist.findIndex(movie => movie.id === action.payload.id);
            if (index === -1) {
                state.watchlist.push(action.payload);
            } else {
                state.watchlist.splice(index, 1);
            }
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            localStorage.setItem('userPreferences', JSON.stringify(state));
            // Update the data-theme attribute on the root element
            document.documentElement.setAttribute('data-theme', state.theme);
        },
        clearPreferences: (state) => {
            state.favorites = [];
            state.watchlist = [];
            state.theme = 'dark'; // Reset to dark theme
            localStorage.removeItem('userPreferences');
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
});

export const { toggleFavorite, toggleWatchlist, toggleTheme, clearPreferences } = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer; 