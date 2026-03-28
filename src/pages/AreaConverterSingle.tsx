import { motion } from "framer-motion";
import { ArrowLeftRight, ChevronRight, Hash, RefreshCw, Target } from 'lucide-react';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// Utils
import { capitalizeFirstLetter, getLocalStorage, setLocalStorage } from '@/utils/commonFunctions';

// Config
import unitDetails from '@/config/DetailsUnits';
import Enums from '@/config/Enums';

// Interface
import UnitDetails from "@/interface/UnitDetails";

export default function AreaConverterSingle() {
  const { t } = useTranslation();
  const { unitFromVal, unitToVal, unitVal } = useParams();
  const [value, setValue] = useState<number>(Number(getLocalStorage(Enums.single.value) ?? 1));
  const [fromUnit, setFromUnit] = useState<keyof UnitDetails>(getLocalStorage(Enums.single.fromUnit) ?? "Bigha");
  const [toUnit, setToUnit] = useState<keyof UnitDetails>(getLocalStorage(Enums.single.toUnit) ?? "Guntha");

  useEffect(() => {
    setLocalStorage(Enums.single.value, value);
    setLocalStorage(Enums.single.fromUnit, fromUnit);
    setLocalStorage(Enums.single.toUnit, toUnit);
  }, [value, fromUnit, toUnit]);

  useEffect(() => {
    if (unitFromVal) {
      const par = capitalizeFirstLetter(unitFromVal.toLowerCase());
      if (unitDetails[par as keyof UnitDetails]) setFromUnit(par as keyof UnitDetails);
      else setFromUnit("Bigha")
    }

    if (unitToVal) {
      const par = capitalizeFirstLetter(unitToVal.toLowerCase());
      if (unitDetails[par as keyof UnitDetails]) setToUnit(par as keyof UnitDetails);
      else setToUnit("Guntha");
    }

    if (unitVal) {
      const par = Number(unitVal);
      if (!isNaN(par)) setValue(par);
      else setValue(0);
    }
  }, [unitFromVal, unitToVal, unitVal]);

  const convertArea = (): number => {
    return Number((value * unitDetails[fromUnit][toUnit]).toFixed(6));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
      <motion.div
        className="glass-card w-full max-w-lg relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-8">
          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Hash size={14} /> Enter Value
            </label>
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="input-field text-2xl font-bold py-5 text-center focus:scale-[1.02] !bg-slate-800/60"
              placeholder="0.00"
            />
          </div>

          {/* Unit Selection Grid */}
          <div className="grid grid-cols-1 gap-2 relative">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as keyof UnitDetails)}
                className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2394a3b8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12 font-semibold !bg-slate-800/40"
              >
                {Object.keys(unitDetails).map((unit) => (
                  <option key={unit} value={unit} className="bg-slate-900">{t(`converter.label.${unit}`) || unit}</option>
                ))}
              </select>
            </div>

            {/* Swap Button Overlap */}
            <div className="flex justify-center z-10">
              <motion.button
                onClick={swapUnits}
                className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-2xl hover:bg-indigo-600 hover:rotate-180 transition-all duration-500 active:scale-90 border border-white/5"
                whileTap={{ scale: 0.9 }}
              >
                <RefreshCw size={20} />
              </motion.button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as keyof UnitDetails)}
                className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2394a3b8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12 font-semibold !bg-slate-800/40"
              >
                {Object.keys(unitDetails).map((unit) => (
                  <option key={unit} value={unit} className="bg-slate-900">{t(`converter.label.${unit}`) || unit}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Section */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl text-white shadow-xl shadow-indigo-950/50 relative overflow-hidden group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`${fromUnit}-${toUnit}-${value}`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-3">
                <Target size={14} /> Result
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white/70 flex items-center gap-2">
                  {value} {t(`converter.label.${fromUnit}`) || fromUnit} <ChevronRight size={14} />
                </span>
                <span className="text-4xl font-extrabold tracking-tight">
                  {convertArea()}
                  <span className="text-xl ml-2 font-medium text-white/80">{t(`converter.label.${toUnit}`) || toUnit}</span>
                </span>
              </div>
            </div>
            {/* Animated Decor */}
            <div className="absolute right-[-10%] bottom-[-20%] opacity-10 group-hover:opacity-20 transition-opacity">
              <ArrowLeftRight size={160} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
