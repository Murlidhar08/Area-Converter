// Packages
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightLeft, Calculator, CheckCheck, Copy, History, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { addListOfCalculator, clearListOfCalculator, setCalculateUnit } from '@/redux/slices/calculationSlice';
import { useDispatch, useSelector } from 'react-redux';

// Interface
import ListOfCalculation from "@/interface/ListOfCalculation";
import UnitConversion from "@/interface/UnitConversion";
import UnitDetails from "@/interface/UnitDetails";

// Utils
import { capitalizeFirstLetter, getLocalStorage, setLocalStorage } from '@/utils/commonFunctions';

// Config
import unitDetails from '@/config/DetailsUnits';
import Enums from '@/config/Enums';

const calculateCustomUnit = (h: number, r: number, sm: number): number => {
  return h * 98.842152 + r * 0.98842152 + sm * 0.0098842152;
};

export default function AreaConverterMultiple() {
  const { t } = useTranslation();
  const { unitPar, valuePar, hVal, rVal, smVal } = useParams();
  const dispatch = useDispatch();
  const calculationStore = useSelector((state: any) => state.calculation);
  const [unitValue, setUnitValue] = useState<number>(Number(getLocalStorage(Enums.multiple.value) ?? 1));
  const [fromUnit, setFromUnit] = useState<string>(getLocalStorage(Enums.multiple.fromUnit) ?? "Guntha");
  const [customH, setCustomH] = useState<number>(getLocalStorage(Enums.multiple.customH) ?? 0);
  const [customR, setCustomR] = useState<number>(getLocalStorage(Enums.multiple.customR) ?? 0);
  const [customSM, setCustomSM] = useState<number>(getLocalStorage(Enums.multiple.customSM) ?? 0);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // URL parameter values update
  useEffect(() => {
    if (valuePar) {
      const numPar = Number(valuePar)
      if (!isNaN(numPar)) setUnitValue(numPar);
    }

    if (unitPar) {
      const par = capitalizeFirstLetter(unitPar.toLowerCase());
      if (unitDetails[par as keyof UnitDetails]) setFromUnit(par);
    }

    if (unitPar && unitPar?.toLowerCase()?.trim() == "hasm") {
      setFromUnit("H.RA.SM");
      const valH = Number(hVal ?? valuePar);
      if (!isNaN(valH)) setCustomH(valH);
      else setCustomH(0);
      const valR = Number(rVal)
      if (!isNaN(valR)) setCustomR(valR);
      else setCustomR(0);
      const ValSM = Number(smVal)
      if (!isNaN(ValSM)) setCustomSM(ValSM);
      else setCustomSM(0);
    }
  }, [unitPar, valuePar, hVal, rVal, smVal]);

  // Sync with Local Storage
  useEffect(() => {
    setLocalStorage(Enums.calculator.calculateUnit, calculationStore.calculateUnit)
    setLocalStorage(Enums.calculator.calculator, JSON.stringify(calculationStore.listOfCalc))
  }, [calculationStore.calculateUnit, calculationStore.listOfCalc]);

  useEffect(() => {
    const units = Object.keys(unitDetails).filter((u) => u !== fromUnit);
    if (units.length > 0) {
      const defaultUnit = units[0];
      const defaultValue = convertArea(defaultUnit);
      setSelectedUnit(defaultUnit);
      setSelectedValue(defaultValue);
    }

    setLocalStorage(Enums.multiple.value, unitValue);
    setLocalStorage(Enums.multiple.fromUnit, fromUnit);
    setLocalStorage(Enums.multiple.customH, customH);
    setLocalStorage(Enums.multiple.customR, customR);
    setLocalStorage(Enums.multiple.customSM, customSM);
  }, [unitValue, fromUnit, customH, customR, customSM]);

  const convertArea = (targetUnit: keyof UnitConversion): number => {
    if (fromUnit === "H.RA.SM") {
      const gunthaValue = calculateCustomUnit(customH, customR, customSM);
      return Number((gunthaValue * unitDetails["Guntha"][targetUnit]).toFixed(6));
    }
    return Number((unitValue * unitDetails[fromUnit as keyof UnitDetails][targetUnit]).toFixed(6));
  };

  const handleCopy = (text: string, unit: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(unit);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const formatSelectedValue = (selectedVal: number, selectedUnit: string | null) => {
    if (!selectedUnit) return `${selectedVal}`;
    if (selectedUnit === "Guntha") return <><strong>{selectedVal}</strong> {t("converter.label.Guntha")}</>

    const floorVal = Math.floor(selectedVal);
    const remainVal = selectedVal - floorVal;
    const gunthaPerUnit = unitDetails[selectedUnit as keyof UnitDetails]?.Guntha || 0;
    const guntha = Number((remainVal * gunthaPerUnit).toFixed(2));

    if (guntha == 0) return <><strong>{floorVal}</strong> {t(`converter.label.${selectedUnit}`)}</>
    if (floorVal == 0) return <><strong>{guntha}</strong> {t("converter.label.Guntha")}</>

    return (
      <span className="flex flex-wrap items-center gap-1">
        <strong className="text-violet-700">{floorVal}</strong> {t(`converter.label.${selectedUnit}`)}
        <span className="text-slate-400 mx-1">{t("and")}</span>
        <strong className="text-violet-700">{guntha}</strong> {t("converter.label.Guntha")}
      </span>
    )
  };

  const addToCalculation = (num: number, unit: string) => {
    const obj: ListOfCalculation = {
      unit: fromUnit,
      unitValue: unitValue,
      value: num
    }
    if (fromUnit == "H.RA.SM") obj.unitValue = `${customH}-${customR}-${customSM}`;
    dispatch(addListOfCalculator(obj));
    dispatch(setCalculateUnit(unit));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pb-10">
      <motion.div
        className="glass-card w-full max-w-xl shadow-2xl overflow-hidden !p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-6">
          {/* Input Section */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col gap-4">
              {fromUnit === "H.RA.SM" ? (
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase ml-1">{t("converter.custom.hectare")}</label>
                    <input
                      type="number"
                      min={0}
                      value={customH}
                      onChange={(e) => setCustomH(Number(e.target.value))}
                      className="input-field bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                      placeholder="H"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase ml-1">{t("converter.custom.are")}</label>
                    <input
                      type="number"
                      min={0}
                      value={customR}
                      onChange={(e) => setCustomR(Number(e.target.value))}
                      className="input-field bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                      placeholder="R"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase ml-1">{t("converter.custom.squareMeter")}</label>
                    <input
                      type="number"
                      min={0}
                      value={customSM}
                      onChange={(e) => setCustomSM(Number(e.target.value))}
                      className="input-field bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                      placeholder="SM"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase ml-1">{t("converter.valueIn")} {t(`converter.label.${fromUnit}`)}</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={unitValue}
                      onChange={(e) => setUnitValue(Number(e.target.value))}
                      className="input-field pr-12 text-lg font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                      placeholder="0.00"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300">
                      <ArrowRightLeft size={20} />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase ml-1">{t("converter.convertFrom")}</label>
                <select
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value);
                    setSelectedUnit(null);
                    setSelectedValue(null);
                  }}
                  className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2394a3b8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12 bg-slate-100 dark:bg-slate-800/40 text-slate-900 dark:text-white font-bold"
                >
                  {Object.keys(unitDetails).map((unit) => (
                    <option key={unit} value={unit} className="bg-white dark:bg-slate-900">{t(`converter.label.${unit}`)}</option>
                  ))}
                  <option value="H.RA.SM" className="bg-white dark:bg-slate-900">{t("converter.label.Hectare")} - {t("converter.label.Are")} - {t("converter.label.SquareMeter")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
              <History size={14} /> {t("label.results")}
            </h2>
            <div className="grid gap-2 pr-1 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {Object.keys(unitDetails).map((unit) => {
                  const isSelected = selectedUnit === unit;
                  const value = convertArea(unit);

                  return (
                    <motion.div
                      key={unit}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setSelectedValue(value);
                      }}
                      className={`group cursor-pointer p-4 rounded-2xl flex items-center justify-between transition-all duration-200 border
                        ${isSelected
                          ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/40 ring-2 ring-violet-500/20"
                          : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 hover:border-violet-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-900 dark:text-slate-300"}`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-lg font-bold ${isSelected ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                          {value}
                          <span className={`text-sm ml-2 font-bold tracking-wider ${isSelected ? "text-violet-100" : "text-slate-400 dark:text-slate-500 text-violet-600 dark:group-hover:text-violet-400"}`}>
                            {t(`converter.label.${unit}`)}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleCopy(String(value), unit)}
                          className={`p-2.5 rounded-xl transition-all ${isSelected
                            ? "bg-white/20 hover:bg-white/30 text-white"
                            : "bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-violet-500/10 dark:hover:bg-violet-500/20 hover:text-violet-600 dark:hover:text-violet-400"}`}
                        >
                          {copied === unit ? <CheckCheck size={18} /> : <Copy size={18} />}
                        </button>

                        <AnimatePresence>
                          {(calculationStore.calculateUnit === unit || calculationStore.calculateUnit === "") && (
                            <motion.button
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              onClick={() => addToCalculation(value, unit)}
                              className={`p-2.5 rounded-xl transition-all ${isSelected
                                ? "bg-white/20 hover:bg-white/30 text-white"
                                : "bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-400"}`}
                            >
                              <Plus size={18} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Selected Result Detail */}
        <AnimatePresence>
          {selectedValue !== null && selectedUnit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-0 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-[10px] font-extrabold text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em] mb-1">{t("calculation.breakdown")}</p>
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight" ref={resultRef}>
                    {formatSelectedValue(selectedValue, selectedUnit)}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const text = resultRef.current?.innerText ?? "";
                    navigator.clipboard.writeText(text);
                    setCopied("detail");
                    setTimeout(() => setCopied(null), 1500);
                  }}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 whitespace-nowrap shadow-md text-xs font-bold uppercase tracking-wider"
                >
                  {copied === "detail" ? t("copied") : <><Copy size={16} /> {t("copy")}</>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Action Button for Calculation */}
      <AnimatePresence>
        {!!calculationStore?.listOfCalc?.length && (
          <div className="fixed top-18 right-8 z-60 flex flex-col items-end gap-3 hidden sm:flex">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="relative group"
            >
              <div className="absolute -top-3 -left-3 bg-rose-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg z-10">
                {calculationStore.listOfCalc.length}
              </div>
              <button
                onClick={() => navigate("/calculation")}
                className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-violet-600 transition-all group-active:scale-90"
              >
                <Calculator size={28} />
              </button>
              <button
                onClick={() => dispatch(clearListOfCalculator())}
                className="absolute -bottom-2 -right-2 bg-white text-slate-400 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:text-rose-500 hover:scale-110 transition-all border border-slate-100"
              >
                <X size={16} />
              </button>

              {/* Tooltip */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                {t("title.calculation")}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
