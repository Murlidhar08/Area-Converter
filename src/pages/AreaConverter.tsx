import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Units {
  [key: string]: number;
}

const units: Units = {
  Guntha: 1,
  Bigha: 0.0625,
  Acre: 0.025,
  Hectare: 0.010117,
  SquareFeet: 1089,
  SquareMeter: 101.171367,
};

const calculateCustomUnit = (h: number, r: number, sm: number): number => {
  return h * 98.842195 + r * 0.98 + sm * 0.101171;
};

export default function AreaConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("Guntha");
  const [customH, setCustomH] = useState<number>(0);
  const [customR, setCustomR] = useState<number>(0);
  const [customSM, setCustomSM] = useState<number>(0);

  const navigate = useNavigate(); // Initialize navigate function

  const convertArea = (targetUnit: string): number => {
    const baseValue = fromUnit === "H.RA.SM" ? calculateCustomUnit(customH, customR, customSM) : value / units[fromUnit];
    return Number((baseValue * units[targetUnit]).toFixed(3));
  };

  // Functions
  /** Navigate to Single Page Conversion */
  const navigateToSinglePage = () => {
    navigate("/");
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
        {fromUnit === "H.RA.SM" ? (
          <div className="flex flex-col space-y-2 mb-4">
            <input type="number" placeholder="Hectare" className="p-3 border border-gray-300 rounded-lg shadow-sm" value={customH} onChange={(e) => setCustomH(Number(e.target.value))} />
            <input type="number" placeholder="RA (Guntha)" className="p-3 border border-gray-300 rounded-lg shadow-sm" value={customR} onChange={(e) => setCustomR(Number(e.target.value))} />
            <input type="number" placeholder="Square Meter" className="p-3 border border-gray-300 rounded-lg shadow-sm" value={customSM} onChange={(e) => setCustomSM(Number(e.target.value))} />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="0"
            />
          </div>
        )}
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
          <option value="H.RA.SM">H.RA.SM</option>
        </select>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center font-semibold text-sm sm:text-base space-y-2">
          {Object.keys(units).map((unit) => (
            unit !== fromUnit && (
              <motion.p
                key={unit}
                className="p-2 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {fromUnit === "H.RA.SM" ? `${customH}-${customR}-${customSM} H.RA.SM` : `${value} ${fromUnit}`} =
                <span className="text-purple-600 font-bold">{convertArea(unit)}</span> {unit}
              </motion.p>
            )
          ))}
        </div>
      </motion.div>
      {/* Floating Button for Single Page */}
      <motion.button
        onClick={navigateToSinglePage}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Go to Single Page"
      >
        {/* Single Page Icon (You can replace with an actual icon if needed) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 7h10v10H7V7z" />
          <path d="M3 3h4v4H3V3zm14 0h4v4h-4V3zM3 17h4v4H3v-4zm14 0h4v4h-4v-4z" />
        </svg>
      </motion.button>
    </div>
  );
}