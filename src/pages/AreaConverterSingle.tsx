import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface UnitConversion {
  [key: string]: number;
}

interface UnitDetails {
  Guntha: UnitConversion;
  Bigha: UnitConversion;
  Acre: UnitConversion;
  Hectare: UnitConversion;
  Are: UnitConversion;
  SquareFeet: UnitConversion;
  SquareMeter: UnitConversion;
}

const unitDetails: UnitDetails = {
  Guntha: {
    Guntha: 1,
    Bigha: 0.0625,
    Acre: 0.025,
    Hectare: 0.010162,
    Are: 0.098842,
    SquareFeet: 1089.0,
    SquareMeter: 101.1714,
  },
  Bigha: {
    Guntha: 16.0,
    Bigha: 1,
    Acre: 0.4,
    Hectare: 0.162597,
    Are: 1.618742,
    SquareFeet: 17424.0,
    SquareMeter: 1618.7424,
  },
  Acre: {
    Guntha: 40.0,
    Bigha: 2.5,
    Acre: 1,
    Hectare: 0.404686,
    Are: 4.04686,
    SquareFeet: 43560.0,
    SquareMeter: 4046.86,
  },
  Hectare: {
    Guntha: 98.425197,
    Bigha: 6.151575,
    Acre: 2.471054,
    Hectare: 1,
    Are: 10.0,
    SquareFeet: 107639.104167,
    SquareMeter: 10000.0,
  },
  Are: {
    Guntha: 0.988421,
    Bigha: 0.061776,
    Acre: 0.024711,
    Hectare: 0.1,
    Are: 1,
    SquareFeet: 1076.391042,
    SquareMeter: 100.0,
  },
  SquareFeet: {
    Guntha: 0.000918,
    Bigha: 0.000057,
    Acre: 0.000023,
    Hectare: 0.000093,
    Are: 0.000093,
    SquareFeet: 1,
    SquareMeter: 0.092903,
  },
  SquareMeter: {
    Guntha: 0.009882,
    Bigha: 0.000618,
    Acre: 0.000247,
    Hectare: 0.01,
    Are: 0.01,
    SquareFeet: 10.76391,
    SquareMeter: 1,
  },
};

const AreaConverter: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<keyof UnitDetails>("Bigha");
  const [toUnit, setToUnit] = useState<keyof UnitDetails>("Guntha");
  const navigate = useNavigate();

  const convertArea = (): number => {
    return Number((value * unitDetails[fromUnit][toUnit]).toFixed(6));
  };

    /** Swap the selected units */
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const navigateToSinglePage = () => {
    navigate("/multiple");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4 relative">
            {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Area Converter
      </motion.h1>

            {/* Converter Box */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
                {/* Input Field */}
        <div className="flex flex-col space-y-4 mb-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter Value"
          />
        </div>

                {/* From - Swap - To */}
        <div className="flex items-center justify-between mb-4">
                    {/* From Unit */}
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as keyof UnitDetails)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {Object.keys(unitDetails).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

                    {/* Swap Button with SVG */}
          <button
            onClick={swapUnits}
            className="text-purple-500 hover:text-purple-700 transition-colors flex items-center justify-center p-2 mx-3"
            aria-label="Swap Units"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 92 92"
              width="40"
              height="40"
              className="fill-current"
            >
              <path d="M92 55.5c0 1.1-.4 2.1-1.2 2.8L72.2 76.9c-.8.8-1.8 1.1-2.8 1.1-1 0-2.1-.5-2.8-1.2-1.6-1.6-1.6-4.2 0-5.8l11.7-12H39.2c-2.2 0-4-1.8-4-4s1.8-4 4-4h39.1L66.6 39.5c-1.6-1.6-1.6-3.9 0-5.4 1.6-1.6 4.1-1.6 5.7 0l18.6 18.6c.7.7 1.1 1.7 1.1 2.8zM13.7 41h39.1c2.2 0 4-1.8 4-4s-1.8-4-4-4H13.7l11.7-12c1.6-1.6 1.6-4.2 0-5.8s-4.1-1.6-5.7-.1L1.2 33.7c-.8.7-1.2 1.7-1.2 2.8s.4 2.1 1.2 2.8l18.6 18.6c.8.8 1.8 1.2 2.8 1.2 1 0 2.1-.4 2.8-1.2 1.6-1.6 1.6-3.9 0-5.4L13.7 41z"></path>
            </svg>
          </button>

                    {/* To Unit */}
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as keyof UnitDetails)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          className="bg-gray-100 p-4 rounded-lg shadow-md text-center font-semibold text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {value} {fromUnit} ={" "}
          <span className="text-purple-600 font-bold">{convertArea()}</span>{" "}
          {toUnit}
        </motion.div>
      </motion.div>

            {/* Floating Button for Single Page */}
      <motion.button
        onClick={navigateToSinglePage}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Go to Single Page"
      >
        <img className="w-6 h-6" src="/images/convert.png" alt="img" />
      </motion.button>
    </div>
  );
};

export default AreaConverter;
