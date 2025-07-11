// Packages
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { CalculatorIcon, X } from 'lucide-react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearListOfCalculator, addListOfCalculator, setCalculateUnit } from '@/redux/slices/calculationSlice';

// Interface
import ListOfCalculation from "@/interface/ListOfCalculation";
import UnitDetails from "@/interface/UnitDetails";
import UnitConversion from "@/interface/UnitConversion";

// Utils
import { capitalizeFirstLetter, getLocalStorage, setLocalStorage } from '@/utils/commonFunctions'

// Config
import Enums from '@/config/Enums'
import unitDetails from '@/config/DetailsUnits'

const calculateCustomUnit = (h: number, r: number, sm: number): number => {
  return h * 98.425197 + r * 0.988421 + sm * 0.009882;
};

export default function AreaConverterMultiple() {
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

  // URL parameter vaules update
  useEffect(() => {
    // Value parameter
    if (valuePar) {
      const numPar = Number(valuePar)
      if (!isNaN(numPar))
        setUnitValue(numPar);
    }

    // Unit Parameter
    if (unitPar) {
      const par = capitalizeFirstLetter(unitPar.toLowerCase());
      if (unitDetails[par as keyof UnitDetails]) setFromUnit(par);
    }

    // Use HAS
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

  // Add calculate Unit to local storage
  useEffect(() => {
    setLocalStorage(Enums.calculator.calculateUnit, calculationStore.calculateUnit)
  }, [calculationStore.calculateUnit]);

  // Add list of calculation to local storage
  useEffect(() => {
    setLocalStorage(Enums.calculator.calculator, JSON.stringify(calculationStore.listOfCalc))
  }, [calculationStore.listOfCalc]);

  // Update values to local storage
  useEffect(() => {
    const units = Object.keys(unitDetails).filter((u) => u !== fromUnit);
    if (units.length > 0) {
      const defaultUnit = units[0];
      const defaultValue = convertArea(defaultUnit);
      setSelectedUnit(defaultUnit);
      setSelectedValue(defaultValue);
    }

    // Preserve last vaule
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

  const addToCalculation = (num: number, unit: string) => {
    const obj: ListOfCalculation = {
      unit: fromUnit,
      unitValue: unitValue,
      value: num
    }

    if (fromUnit == "H.RA.SM")
      obj.unitValue = `${customH}-${customR}-${customSM}`;

    dispatch(addListOfCalculator(obj));
    dispatch(setCalculateUnit(unit));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4 pb-20">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Area Converter
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
              value={unitValue}
              min={0}
              onChange={(e) => setUnitValue(Number(e.target.value))}
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
                    <td className="flex py-2 px-2 border-b border-purple-200">
                      <button
                        onClick={() => handleCopy(String(convertArea(unit)), unit)}
                        className="w-20 px-3 py-1 text-xs text-purple-800 bg-purple-50 rounded hover:bg-purple-200 text-center"
                      >
                        {copied === unit ? "Copied!" : "Copy"}
                      </button>

                      {/* Add Calculation button */}
                      {(calculationStore.calculateUnit == unit || calculationStore.calculateUnit == "") && (
                        <button
                          onClick={() => addToCalculation(convertArea(unit), unit)}
                          className="ml-1 px-3 py-1 text-xs text-purple-800 bg-purple-50 rounded hover:bg-purple-200 text-center"
                        >
                          Add
                        </button>
                      )}
                    </td>
                  </motion.tr>
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

      {/* Navigate to Calculation */}
      {!!calculationStore?.listOfCalc?.length && (
        <motion.button
          title="Calculation"
          className="fixed top-6 right-6 bg-purple-700 hover:bg-purple-900 text-white p-4 rounded-full shadow-lg focus:outline-none"
          aria-label="Go to Single Page"
        >
          <CalculatorIcon
            onClick={() => navigate("/calculation")}
            size={30} />

          <X
            onClick={() => dispatch(clearListOfCalculator())}
            size={30}
            className="absolute bg-white text-red-600 p-2 rounded-full font-bold -top-4 -right-1" />
        </motion.button>
      )}
    </div>
  );
}
