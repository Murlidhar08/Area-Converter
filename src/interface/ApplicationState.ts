import ListOfCalculation from "@/interface/ListOfCalculation";

export default interface ApplicationState {
    selectedUnit: string,
    totalUnit: number,
    listOfCalc: ListOfCalculation[]
}