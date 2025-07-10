import { configureStore } from '@reduxjs/toolkit';
import calculationSlice from './slices/calculationSlice';

export const store = configureStore({
    reducer: {
        calculation: calculationSlice,
    },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
