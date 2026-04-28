import { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Pages
import Calculation from '@/pages/Calculation';
import UnitConverterMultiple from '@/pages/UnitConverterMultiple';
import UnitConverterSingle from '@/pages/UnitConverterSingle';
import SettingPage from "./pages/SettingPage";

// Components
import Navigation from '@/components/Navigation';

function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem("theme", "light");
  }, []);

  return (
    <Router>
      <Navigation />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] bg-indigo-500/10 rounded-full blur-[100px] delay-700 animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] bg-pink-500/10 rounded-full blur-[100px] delay-1000 animate-pulse"></div>
      </div>

      <div className="relative pt-14 md:pt-20 z-10 md:px-0 flex flex-col min-h-dvh md:min-h-0 md:ml-64 transition-all duration-300"> {/* Layout wrapper for full-height pages */}
        <Routes>
          <Route path="/multiple" element={<UnitConverterMultiple />} />
          <Route path="/multiple/:unitPar/:valuePar" element={<UnitConverterMultiple />} />
          <Route path="/multiple/:unitPar/:hVal/:rVal" element={<UnitConverterMultiple />} />
          <Route path="/multiple/:unitPar/:hVal/:rVal/:smVal" element={<UnitConverterMultiple />} />

          <Route path="/single" element={<UnitConverterSingle />} />
          <Route path="/single/:unitFromVal" element={<UnitConverterSingle />} />
          <Route path="/single/:unitFromVal/:unitToVal" element={<UnitConverterSingle />} />
          <Route path="/single/:unitFromVal/:unitToVal/:unitVal" element={<UnitConverterSingle />} />

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
