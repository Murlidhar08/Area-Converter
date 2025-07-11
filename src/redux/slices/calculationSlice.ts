import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
import ListOfCalculation from "@/interface/ListOfCalculation";
import ApplicationState from '@/interface/ApplicationState';

// Utils
import { getLocalStorage } from '@/utils/commonFunctions'

// Config
import Enums from '@/config/Enums'

const initialState: ApplicationState = {
    calculateUnit: getLocalStorage(Enums.calculator.calculateUnit) ?? "",
    listOfCalc: JSON.parse(getLocalStorage(Enums.calculator.calculator)) ?? []
};

const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        setCalculateUnit: (state, action: PayloadAction<string>) => {
            state.calculateUnit = action.payload;
        },
        addListOfCalculator: (state, action: PayloadAction<ListOfCalculation>) => {
            state.listOfCalc = [...state.listOfCalc, action.payload];
        },
        removeCalcItem: (state, action) => {
            state.listOfCalc = state.listOfCalc.filter((_, i) => i !== action.payload);
            if (state?.listOfCalc?.length == 0) state.calculateUnit = "";
        },
        clearListOfCalculator: (state) => {
            state.calculateUnit = "";
            state.listOfCalc = [];
        }
    }
});

export const { setCalculateUnit, addListOfCalculator, removeCalcItem, clearListOfCalculator } = calculationSlice.actions;
export default calculationSlice.reducer;
