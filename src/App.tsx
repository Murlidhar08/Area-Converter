import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AreaConverterMultiple from '@/pages/AreaConverterMultiple.tsx'
import AreaConverterSingle from '@/pages/AreaConverterSingle.tsx'
import Calculation from '@/pages/Calculation.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/multiple" element={<AreaConverterMultiple />} />
        <Route path="/single" element={<AreaConverterSingle />} />
        <Route path="/calculation" element={<Calculation />} />
        <Route path="*" element={<AreaConverterMultiple />} />
      </Routes>
    </Router>
  );
}

export default App;
