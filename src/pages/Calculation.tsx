import { useSelector } from 'react-redux';
import { motion } from "framer-motion";

export default function Calculation() {
    const calculationStore = useSelector((state: any) => state.calculation);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
            {/* Title */}
            <motion.h1
                className="text-4xl font-extrabold mb-6 text-white text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Total Area {calculationStore.selectedUnit}
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
                            {calculationStore?.listOfCalc.map((row: any, index: any) => (
                                <motion.tr
                                    key={index}
                                    className="bg-purple-50 hover:bg-purple-200 transition-colors cursor-pointer"
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                >
                                    <td className="py-3 px-4 font-semibold text-purple-900">{row.value}</td>
                                    <td className="py-3 px-4 font-medium text-purple-900">{calculationStore.selectedUnit}</td>
                                </motion.tr>
                            ))}

                            {/* Total */}
                            <motion.tr
                                className="bg-purple-200 hover:bg-purple-300 transition-colors cursor-pointer"
                                initial="hidden"
                                animate="visible"
                            >
                                <td className="py-3 px-4 text-purple-900 font-bold">{calculationStore.totalUnit}</td>
                                <td className="py-3 px-4 text-purple-900 font-bold">Total ({calculationStore.selectedUnit})</td>
                            </motion.tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
