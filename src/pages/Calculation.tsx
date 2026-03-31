import { clearListOfCalculator, removeCalcItem } from '@/redux/slices/calculationSlice';
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, IndianRupee, PieChart, Receipt, Trash2, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

// Utils
import { getLocalStorage, setLocalStorage } from '@/utils/commonFunctions';

// Config
import Enums from '@/config/Enums';

export default function Calculation() {
    const { t } = useTranslation();
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

    useEffect(() => {
        setLocalStorage(Enums.calculator.calculator, JSON.stringify(calculationStore.listOfCalc))
    }, [calculationStore.listOfCalc]);

    const clearCalculation = () => {
        dispatch(clearListOfCalculator())
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-start md:px-4 md:pb-12">
            <motion.div
                className="glass-card flex-1 md:flex-none w-full max-w-lg shadow-2xl overflow-hidden !p-0 bg-white border border-slate-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="p-6 space-y-8">
                    {/* Price Input Wrapper */}
                    <div className="p-5 bg-slate-100/50 border border-slate-200 rounded-3xl space-y-3">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <IndianRupee size={12} />
                            {t("calculation.price")}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={pricePerUnit}
                                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                                className="input-field text-xl font-bold border-none bg-white shadow-sm text-slate-900"
                                placeholder="0.00"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                /{calculationStore.calculateUnit ? t(`converter.label.${calculationStore.calculateUnit}`) : "Unit"}
                            </div>
                        </div>
                    </div>

                    {/* Calculations List */}
                    <div className="space-y-4">
                        <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                            <Receipt size={12} /> {t("calculation.breakdown") || "ITEMIZED"}
                        </h2>

                        <div className="space-y-2 pr-1 custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {calculationStore?.listOfCalc.length > 0 ? (
                                    calculationStore.listOfCalc.map((row: any, index: number) => (
                                        <motion.div
                                            key={`${index}-${row.value}`}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="group flex justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all duration-200"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                                    {row.unitValue} {" "} {t(`converter.label.${row.unit}`)}
                                                </span>
                                                <span className="text-sm font-bold text-slate-800">
                                                    {row.value} <span className="text-violet-600">{t(`converter.label.${calculationStore.calculateUnit}`)}</span>
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeCalcItem(index))}
                                                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                                            >
                                                <X size={18} />
                                            </button>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-3xl">
                                        <div className="inline-flex p-3 bg-slate-100 rounded-2xl text-slate-400 mb-3">
                                            <Calculator size={32} />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t("calculation.noItems")}</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="pt-6 border-t border-slate-200">
                        <div className="grid grid-cols-1 gap-3">
                            {/* Total Area */}
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide flex items-center gap-2">
                                    <PieChart size={14} /> {t("calculation.totalArea")}
                                </span>
                                <span className="text-lg font-extrabold text-slate-900">
                                    {totalVal} <span className="text-xs font-medium opacity-70">{t(`converter.label.${calculationStore.calculateUnit}`)}</span>
                                </span>
                            </div>

                            {/* Net Payable */}
                            <div className="bg-indigo-600 p-6 rounded-3xl relative overflow-hidden group shadow-lg shadow-indigo-200">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity" />
                                <div className="relative z-10 text-white">
                                    <span className="text-[10px] font-extrabold text-indigo-100 uppercase tracking-[0.2em] mb-1 block">
                                        {t("calculation.estimatedCost")}
                                    </span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold tracking-tighter">
                                            {Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                                maximumFractionDigits: 0,
                                            }).format(totalVal * pricePerUnit)}
                                        </span>
                                        <span className="text-xs font-medium text-indigo-100/70">
                                            ({totalVal} × ₹{pricePerUnit})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
                    <button
                        onClick={clearCalculation}
                        disabled={calculationStore?.listOfCalc.length === 0}
                        className="w-full sm:w-auto px-8 py-3 bg-red-50 hover:bg-red-100 text-rose-600 rounded-2xl transition-all transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 disabled:grayscale"
                    >
                        <Trash2 size={16} /> {t("calculation.clear")}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
