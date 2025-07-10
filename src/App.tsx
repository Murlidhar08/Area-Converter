import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AreaConverterMultiple from '@/pages/AreaConverterMultiple'
import AreaConverterSingle from '@/pages/AreaConverterSingle'
import Calculation from '@/pages/Calculation'
import BottomMobileBar from '@/components/BottomMobileBar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/multiple" element={<AreaConverterMultiple />} />
        <Route path="/single" element={<AreaConverterSingle />} />
        <Route path="/calculation" element={<Calculation />} />
        <Route path="*" element={<AreaConverterMultiple />} />
      </Routes>
      <BottomMobileBar />
    </Router>
  );
}

export default App;
