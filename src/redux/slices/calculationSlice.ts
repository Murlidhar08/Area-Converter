import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplicationState {
    test: string;
}

const initialState: ApplicationState = {
    test: "Hello",
};

const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

export const { setDarkMode } = calculationSlice.actions;
export default calculationSlice.reducer;
