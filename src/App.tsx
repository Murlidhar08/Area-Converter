import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import AreaConverterMultiple from '@/pages/AreaConverterMultiple';
import AreaConverterSingle from '@/pages/AreaConverterSingle';
import Calculation from '@/pages/Calculation';
import BottomMobileBar from '@/components/BottomMobileBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/multiple" element={<AreaConverterMultiple />} />
        <Route path="/multiple/:unitPar/:valuePar" element={<AreaConverterMultiple />} />
        <Route path="/multiple/:unitPar/:hVal/:rVal" element={<AreaConverterMultiple />} />
        <Route path="/multiple/:unitPar/:hVal/:rVal/:smVal" element={<AreaConverterMultiple />} />

        <Route path="/single" element={<AreaConverterSingle />} />
        <Route path="/single/:unitFromVal" element={<AreaConverterSingle />} />
        <Route path="/single/:unitFromVal/:unitToVal" element={<AreaConverterSingle />} />
        <Route path="/single/:unitFromVal/:unitToVal/:unitVal" element={<AreaConverterSingle />} />

        <Route path="/calculation" element={<Calculation />} />

        {/* Redirect unmatched routes to /multiple */}
        <Route path="*" element={<Navigate to="/multiple" replace />} />
      </Routes>
      <BottomMobileBar />
    </Router>
  );
}

export default App;
