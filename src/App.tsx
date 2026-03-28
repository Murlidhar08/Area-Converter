import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Pages
import AreaConverterMultiple from '@/pages/AreaConverterMultiple';
import AreaConverterSingle from '@/pages/AreaConverterSingle';
import Calculation from '@/pages/Calculation';
import SettingPage from "./pages/SettingPage";

// Components
import Navigation from '@/components/Navigation';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <Router>
      <Navigation />
      <div className="min-h-screen pt-28"> {/* Top spacing for the 80px fixed header and extra whitespace */}
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

          <Route path="/setting" element={<SettingPage />} />

          {/* Redirect unmatched routes to /multiple */}
          <Route path="*" element={<Navigate to="/multiple" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
