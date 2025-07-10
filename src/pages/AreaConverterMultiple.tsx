import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

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

const enums = {
  value: 'value',
  fromUnit: 'fromUnit',
  customH: 'customH',
  customR: 'customR',
  customSM: 'customSM'
}

const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key: string): any => {
  return localStorage.getItem(key);
};

export default function AreaConverterMultiple() {
  const calculationStr = useSelector((state: any) => state.calculation);
  const [value, setValue] = useState<number>(Number(getLocalStorage(enums.value) ?? 1));
  const [fromUnit, setFromUnit] = useState<string>(getLocalStorage(enums.fromUnit) ?? "Guntha");
  const [customH, setCustomH] = useState<number>(getLocalStorage(enums.customH) ?? 0);
  const [customR, setCustomR] = useState<number>(getLocalStorage(enums.customR) ?? 0);
  const [customSM, setCustomSM] = useState<number>(getLocalStorage(enums.customSM) ?? 0);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const units = Object.keys(unitDetails).filter((u) => u !== fromUnit);
    if (units.length > 0) {
      const defaultUnit = units[0];
      const defaultValue = convertArea(defaultUnit);
      setSelectedUnit(defaultUnit);
      setSelectedValue(defaultValue);
    }

    // Preserve last vaule
    setLocalStorage(enums.value, value);
    setLocalStorage(enums.fromUnit, fromUnit);
    setLocalStorage(enums.customH, customH);
    setLocalStorage(enums.customR, customR);
    setLocalStorage(enums.customSM, customSM);
  }, [value, fromUnit, customH, customR, customSM]);

  const convertArea = (targetUnit: keyof UnitConversion): number => {
    if (fromUnit === "H.RA.SM") {
      const gunthaValue = calculateCustomUnit(customH, customR, customSM);
      return Number((gunthaValue * unitDetails["Guntha"][targetUnit]).toFixed(6));
    }
    return Number((value * unitDetails[fromUnit as keyof UnitDetails][targetUnit]).toFixed(6));
  };

  const handleCopy = (text: string, unit: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(unit);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleCopyString = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied("selected");
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const formatSelectedValue = (selectedVal: number, selectedUnit: string | null) => {
    if (!selectedUnit)
      return `${selectedVal}`;

    if (selectedUnit === "Guntha")
      return <><strong>{selectedVal}</strong> Guntha</>


    const floorVal = Math.floor(selectedVal);
    const remainVal = selectedVal - floorVal;

    const gunthaPerUnit = unitDetails[selectedUnit as keyof UnitDetails]?.Guntha || 0;
    const guntha = Number((remainVal * gunthaPerUnit).toFixed(2));

    // Guntha is 0
    if (guntha == 0) {
      return (
        <><strong>{floorVal}</strong> {selectedUnit}</>
      )
    }

    // Other unit is 0
    if (floorVal == 0) {
      return (
        <><strong>{guntha}</strong> Guntha</>
      )
    }

    // Show both
    return (
      <><strong>{floorVal}</strong> {selectedUnit} and <strong>{guntha}</strong> Guntha</>
    )
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Area Converter {calculationStr.test}
      </motion.h1>
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mx-auto border border-purple-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {fromUnit === "H.RA.SM" ? (
          <div className="flex flex-col space-y-2 mb-4">
            <input
              type="number"
              placeholder="Hectare"
              className="p-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={customH}
              onChange={(e) => setCustomH(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="RA (Guntha)"
              className="p-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={customR}
              onChange={(e) => setCustomR(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Square Meter"
              className="p-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              className="w-full sm:w-1/2 p-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter value"
            />
          </div>
        )}

        <select
          value={fromUnit}
          onChange={(e) => {
            setFromUnit(e.target.value);
            setSelectedUnit(null);
            setSelectedValue(null);
          }}
          className="w-full p-3 border border-purple-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        >
          {Object.keys(unitDetails).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
          <option value="H.RA.SM">Hectare - Are - SquareMeter</option>
        </select>

        <div className="bg-purple-50 p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <tbody>
              {Object.keys(unitDetails).map(
                (unit) =>
                  unit !== fromUnit && (
                    <motion.tr
                      key={unit}
                      className={`cursor-pointer transition-colors ${selectedUnit === unit ? "bg-purple-100" : "bg-white hover:bg-purple-50"
                        }`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        const val = convertArea(unit);
                        setSelectedUnit(unit);
                        setSelectedValue(val);
                      }}
                    >
                      <td className="py-2 px-4 border-b border-purple-200 font-semibold text-purple-800">
                        {convertArea(unit)}
                      </td>
                      <td className="py-2 px-4 border-b border-purple-200">
                        {unit}
                      </td>
                      <td className="py-2 px-4 border-b border-purple-200">
                        <button
                          onClick={() =>
                            handleCopy(String(convertArea(unit)), unit)
                          }
                          className="w-20 px-3 py-1 text-xs text-purple-800 bg-purple-50 rounded hover:bg-purple-200 text-center"
                        >
                          {copied === unit ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={() => { /* empt */ }}
                          className="ml-1 px-3 py-1 text-xs text-purple-800 bg-purple-50 rounded hover:bg-purple-200 text-center"
                        >
                          Add
                        </button>
                      </td>
                    </motion.tr>
                  )
              )}
            </tbody>
          </table>

          {/* Selected record result */}
          {selectedValue !== null && selectedUnit && (
            <div className="mt-4 p-3 bg-white border-t border-purple-300 rounded-md shadow-sm
            text-purple-800 flex items-center justify-between gap-4">
              <div ref={resultRef}>
                {formatSelectedValue(selectedValue, selectedUnit)}
              </div>

              <button
                onClick={() => handleCopyString(resultRef.current?.innerText ?? "")}
                className="w-20 px-3 py-1 text-xs text-purple-800 bg-purple-50 rounded hover:bg-purple-200 text-center"
              >
                {copied === "selected" ? "Copied!" : "Copy"}
              </button>
            </div>

          )}
        </div>
      </motion.div>

      <motion.button
        title="Single Conversion"
        onClick={() => navigate("/single")}
        className="fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-900 text-white p-4 rounded-full shadow-lg focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 180 }}
        aria-label="Go to Single Page"
      >
        <img className="w-6 h-6" src="/images/convert.png" alt="img" />
      </motion.button>
    </div>
  );
}
