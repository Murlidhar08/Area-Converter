import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AreaConverterMultiple from '@/pages/AreaConverterMultiple.js'
import AreaConverterSingle from '@/pages/AreaConverterSingle.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/multiple" element={<AreaConverterMultiple />} />
        <Route path="/single" element={<AreaConverterSingle />} />
        <Route path="*" element={<AreaConverterMultiple />} />
      </Routes>
    </Router>
  );
}

export default App;
