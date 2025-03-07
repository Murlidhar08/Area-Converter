import { useState } from "react";
import { motion } from "framer-motion";

interface Units {
  [key: string]: number;
}

const units: Units = {
  Bigha: 16, // 1 Bigha = 16 Guntha (Example conversion for Gujarat)
  Guntha: 1,
  Acre: 0.0247,
  SquareMeter: 40.47,
};

export default function AreaConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("Bigha");
  
  const convertArea = (targetUnit: string): number => {
    return value ? Number(((value * units[fromUnit]) / units[targetUnit]).toFixed(3)) : 0;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <motion.h1 
        className="text-4xl font-extrabold mb-6 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Area Converter
      </motion.h1>
      <motion.div 
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="0"
          />
          <select 
            value={fromUnit} 
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {Object.keys(units).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center font-semibold text-sm sm:text-base space-y-2">
          {Object.keys(units).map((unit) => (
            unit !== fromUnit && (
              <motion.p 
                key={unit} 
                className="p-2 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {value} {fromUnit} = <span className="text-purple-600 font-bold">{convertArea(unit)}</span> {unit}
              </motion.p>
            )
          ))}
        </div>
      </motion.div>
    </div>
  );
}