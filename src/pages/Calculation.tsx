import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCalcItem } from '@/redux/slices/calculationSlice';

export default function Calculation() {
    const dispatch = useDispatch();
    const calculationStore = useSelector((state: any) => state.calculation);
    const [totalVal, setTotalVal] = useState<number>(0);

    useEffect(() => {
        const total = calculationStore.listOfCalc.reduce((sum: any, item: any) => sum + Number(item.value || 0), 0);
        setTotalVal(total);
    }, [calculationStore.listOfCalc]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4 pb-20">
            {/* Title */}
            <motion.h1
                className="text-4xl font-extrabold mb-6 text-white text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Total Calculation
            </motion.h1>

            {/* Box */}
            <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="bg-purple-50 p-4 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                        <tbody>
                            {calculationStore?.listOfCalc.map((row: any, index: number) => (
                                <motion.tr
                                    key={index}
                                    className="bg-purple-50 hover:bg-purple-200 transition-colors cursor-pointer"
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                >
                                    <td className="py-3 px-4 font-medium text-purple-900">{row.unitValue} ({row.unit})</td>
                                    <td className="py-3 px-4 font-semibold text-purple-900 flex justify-between">
                                        <p>{row.value} ({calculationStore.calculateUnit})</p>
                                        <X size={20}
                                            color="red"
                                            onClick={() => dispatch(removeCalcItem(index))}
                                        />
                                    </td>
                                </motion.tr>
                            ))}

                            {/* Total */}
                            <motion.tr
                                className="bg-purple-200 hover:bg-purple-300 transition-colors cursor-pointer"
                                initial="hidden"
                                animate="visible"
                            >
                                <td className="py-3 px-4 text-purple-900 font-bold">Total</td>
                                <td className="py-3 px-4 text-purple-900 font-bold">
                                    {totalVal}
                                    {calculationStore.calculateUnit ? `(${calculationStore.calculateUnit})` : ""}
                                </td>
                            </motion.tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
