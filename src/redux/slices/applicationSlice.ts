import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplicationState {
    test: string;
}

const initialState: ApplicationState = {
    test: "Hello",
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

export const { setDarkMode } = applicationSlice.actions;
export default applicationSlice.reducer;
