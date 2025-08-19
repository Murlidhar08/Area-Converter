import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from 'lucide-react';
import { useParams } from "react-router-dom";

// Utils
import { capitalizeFirstLetter, getLocalStorage, setLocalStorage } from '@/utils/commonFunctions'

// Config
import Enums from '@/config/Enums'
import unitDetails from '@/config/DetailsUnits'

// Interface
import UnitDetails from "@/interface/UnitDetails";

export default function AreaConverterSingle() {
  const { unitFromVal, unitToVal, unitVal } = useParams();
  const [value, setValue] = useState<number>(Number(getLocalStorage(Enums.single.value) ?? 1));
  const [fromUnit, setFromUnit] = useState<keyof UnitDetails>(getLocalStorage(Enums.single.fromUnit) ?? "Bigha");
  const [toUnit, setToUnit] = useState<keyof UnitDetails>(getLocalStorage(Enums.single.toUnit) ?? "Guntha");

  useEffect(() => {
    // Preserve last vaule
    setLocalStorage(Enums.single.value, value);
    setLocalStorage(Enums.single.fromUnit, fromUnit);
    setLocalStorage(Enums.single.toUnit, toUnit);
  }, [value, fromUnit, toUnit]);

  useEffect(() => {
    // Unit From
    if (unitFromVal) {
      const par = capitalizeFirstLetter(unitFromVal.toLowerCase());
      if (unitDetails[par as keyof UnitDetails])
        setFromUnit(par as keyof UnitDetails);
      else setFromUnit("Bigha")
    }

    // Unit To
    if (unitToVal) {
      const par = capitalizeFirstLetter(unitToVal.toLowerCase());
      if (unitDetails[par as keyof UnitDetails])
        setToUnit(par as keyof UnitDetails);
      else setToUnit("Guntha");
    }

    // Conversion Value
    if (unitVal) {
      const par = Number(unitVal);
      if (!isNaN(par)) setValue(par);
      else setValue(0);
    }
  }, [unitFromVal, unitToVal, unitVal]);

  const convertArea = (): number => {
    return Number((value * unitDetails[fromUnit][toUnit]).toFixed(6));
  };

  /** Swap the selected units */
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="sm:flex flex-col items-center justify-center min-h-screen sm:bg-purple-800 sm:pb-20 sm:p-4 bg-white">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold p-6 bg-purple-800 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Area Converter
      </motion.h1>

      {/* Converter Box */}
      <motion.div
        className="bg-white p-4 sm:p-6 sm:shadow-xl sm:h-full w-full mx-auto sm:border border-purple-200 sm:rounded-2xl sm:max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Input Field */}
        <div className="flex flex-col space-y-4 mb-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="p-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter Value"
          />
        </div>

        {/* From - Swap - To */}
        <div className="flex items-center justify-between mb-4">
          {/* From Unit */}
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as keyof UnitDetails)}
            className="w-1/2 p-3 border border-purple-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {Object.keys(unitDetails).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

          {/* Swap Button */}
          <motion.button
            onClick={swapUnits}
            className="text-purple-600 hover:text-purple-800 transition-colors flex items-center justify-center p-2 mx-3"
            aria-label="Swap Units"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
          >
            <ArrowLeftRight size={35} />
          </motion.button>

          {/* To Unit */}
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as keyof UnitDetails)}
            className="w-1/2 p-3 border border-purple-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {Object.keys(unitDetails).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Result Box */}
        <motion.div
          className="bg-purple-50 p-4 rounded-lg sm:shadow-md text-center font-semibold text-sm sm:text-base text-purple-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {value} {fromUnit} ={" "}
          <span className="text-purple-700 font-bold">{convertArea()}</span>{" "}
          {toUnit}
        </motion.div>
      </motion.div>
    </div>
  );
}
