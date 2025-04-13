import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import authReducer from './slices/authSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        auth: authReducer,
        userPreferences: userPreferencesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 