import { configureStore } from '@reduxjs/toolkit';
import applicationReducer from './slices/applicationSlice';

export const store = configureStore({
    reducer: {
        application: applicationReducer,
    },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
