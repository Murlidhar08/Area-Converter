import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AreaConverter from '@/pages/AreaConverter.js'
import AreaConverterSingle from '@/pages/AreaConverterSingle.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/multiple" element={<AreaConverter />} />
        <Route path="*" element={<AreaConverterSingle />} />
      </Routes>
    </Router>
  );
}

export default App;
