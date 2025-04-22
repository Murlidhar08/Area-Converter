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

const calculateCustomUnit = (h: number, r: number, sm: number): number => {
  return h * 98.425197 + r * 0.988421 + sm * 0.009882;
};

export default function AreaConverterMultiple() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("Guntha");
  const [customH, setCustomH] = useState<number>(0);
  const [customR, setCustomR] = useState<number>(0);
  const [customSM, setCustomSM] = useState<number>(0);
  const [copied, setCopied] = useState<string | null>(null);

  const navigate = useNavigate();

  const convertArea = (targetUnit: keyof UnitConversion): number => {
    if (fromUnit === "H.RA.SM") {
      const gunthaValue = calculateCustomUnit(customH, customR, customSM);
      return Number((gunthaValue * unitDetails["Guntha"][targetUnit]).toFixed(6));
    }
    return Number(
      (value * unitDetails[fromUnit as keyof UnitDetails][targetUnit]).toFixed(6)
    );
  };

  const handleCopy = (text: string, unit: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(unit);
      setTimeout(() => setCopied(null), 1500);
    });
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
            <input
              type="number"
              placeholder="Hectare"
              className="p-3 border border-gray-300 rounded-lg shadow-sm"
              value={customH}
              onChange={(e) => setCustomH(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="RA (Guntha)"
              className="p-3 border border-gray-300 rounded-lg shadow-sm"
              value={customR}
              onChange={(e) => setCustomR(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Square Meter"
              className="p-3 border border-gray-300 rounded-lg shadow-sm"
              value={customSM}
              onChange={(e) => setCustomSM(Number(e.target.value))}
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <input
              type="number"
              value={value}
              min={0}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter value"
            />
          </div>
        )}

        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        >
          {Object.keys(unitDetails).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
          <option value="H.RA.SM">Hectare - Are - SquareMeter</option>
        </select>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-2">
          {Object.keys(unitDetails).map(
            (unit) =>
              unit !== fromUnit && (
                <motion.div
                  key={unit}
                  className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>
                    <span className="text-purple-600 font-bold">
                      {convertArea(unit)}
                    </span>{" "}
                    {unit}
                  </span>
                  <button
                    onClick={() => handleCopy(String(convertArea(unit)), unit)}
                    className="ml-2 px-2 py-1 text-xs text-black bg-purple-100 rounded hover:bg-purple-200"
                  >
                    {copied === unit ? "Copied!" : "Copy"}
                  </button>
                </motion.div>
              )
          )}
        </div>
      </motion.div>

      <motion.button
        title="Single Conversion"
        onClick={() => navigate("/single")}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Go to Single Page"
      >
        <img className="w-6 h-6" src="/images/convert.png" alt="img" />
      </motion.button>
    </div>
  );
}
