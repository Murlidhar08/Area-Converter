import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, CalculatorIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCalcItem } from '@/redux/slices/calculationSlice';
import { useNavigate } from "react-router-dom";

// Utils
import { getLocalStorage, setLocalStorage } from '@/utils/commonFunctions'
import { clearListOfCalculator } from '@/redux/slices/calculationSlice';

// Config
import Enums from '@/config/Enums'

export default function Calculation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const calculationStore = useSelector((state: any) => state.calculation);
    const [pricePerUnit, setPricePerUnit] = useState<number>(getLocalStorage(Enums.calculator.pricePerUnit) ?? 0);
    const [totalVal, setTotalVal] = useState<number>(0);

    useEffect(() => {
        const total = calculationStore.listOfCalc.reduce((sum: number, item: any) => sum + Number(item.value || 0), 0);
        setTotalVal(total);
    }, [calculationStore.listOfCalc]);

    useEffect(() => {
        setLocalStorage(Enums.calculator.pricePerUnit, pricePerUnit)
    }, [pricePerUnit]);

    // Add list of calculation to local storage
    useEffect(() => {
        setLocalStorage(Enums.calculator.calculator, JSON.stringify(calculationStore.listOfCalc))
    }, [calculationStore.listOfCalc]);

    return (
        <div className="sm:flex flex-col min-h-screen sm:bg-purple-800 sm:p-4 bg-white">
            {/* Title */}
            <motion.h1
                className="text-3xl sm:text-4xl font-extrabold p-6 bg-purple-800 text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Total Calculation
            </motion.h1>

            {/* Content */}
            <motion.div
                className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 sm:shadow-xl sm:border border-purple-200 sm:rounded-2xl sm:max-w-xl w-full mx-auto pb-24"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="space-y-4">
                    {/* Price Input */}
                    <div className="flex justify-between items-center gap-4">
                        <label className="text-purple-900 font-medium w-1/2">
                            Price per unit
                        </label>
                        <input
                            type="number"
                            value={pricePerUnit}
                            onChange={(e) => setPricePerUnit(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded-lg w-full text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter Value"
                        />
                    </div>

                    <hr className="border-purple-200" />

                    {/* Calculations List */}
                    {calculationStore?.listOfCalc.map((row: any, index: number) => (
                        <motion.div
                            key={index}
                            className="flex justify-between items-center bg-purple-50 hover:bg-purple-100 p-3 rounded-md shadow-sm transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="text-purple-900 font-medium">
                                {row.unitValue} ({row.unit})
                            </div>
                            <div className="flex items-center gap-3 font-semibold text-purple-900">
                                <span>
                                    {row.value} {calculationStore.calculateUnit}
                                </span>
                                <button
                                    onClick={() => dispatch(removeCalcItem(index))}
                                    className="hover:bg-red-100 p-1 rounded-full"
                                >
                                    <X size={18} className="text-red-500" />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {/* Totals */}
                    <div className="bg-purple-100 p-3 rounded-lg space-y-2 mt-4">
                        <div className="flex justify-between font-bold text-purple-900">
                            <span>Total Area</span>
                            <span>
                                {totalVal}{" "}
                                {calculationStore.calculateUnit
                                    ? `(${calculationStore.calculateUnit})`
                                    : ""}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-purple-900">
                            <span>Total Price</span>
                            <span>
                                {Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 2,
                                }).format(totalVal * pricePerUnit)}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Button */}
            {!!calculationStore?.listOfCalc?.length && (
                <motion.button
                    title="Calculation"
                    className="fixed top-6 right-6 bg-purple-700 hover:bg-purple-900 text-white p-4 rounded-full shadow-lg focus:outline-none cursor-default hidden sm:block"
                    aria-label="Go to Single Page"
                >
                    <CalculatorIcon className="cursor-pointer" onClick={() => navigate("/calculation")} size={30} />
                    <X
                        onClick={() => dispatch(clearListOfCalculator())}
                        size={30}
                        className="absolute bg-white text-red-600 p-2 rounded-full font-bold -top-4 -right-1" />
                </motion.button>
            )}
        </div>
    );
}
