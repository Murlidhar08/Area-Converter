import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
import ListOfCalculation from "@/interface/ListOfCalculation";
import ApplicationState from '@/interface/ApplicationState';

const initialState: ApplicationState = {
    selectedUnit: "Acre",
    totalUnit: 0,
    listOfCalc: [
        { value: 30 },
        { value: 20 },
    ]
};

const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        setSelectedUnit: (state, action: PayloadAction<string>) => {
            state.selectedUnit = action.payload;
        },
        addListOfCalculator: (state, action: PayloadAction<ListOfCalculation>) => {
            state.listOfCalc = [...state.listOfCalc, action.payload];
        },
        clearListOfCalculator: (state) => {
            state.listOfCalc = [];
        }
    }
});

export const { setSelectedUnit, addListOfCalculator, clearListOfCalculator } = calculationSlice.actions;
export default calculationSlice.reducer;
