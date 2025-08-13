import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { About } from "./About";
import { Home } from "./Home";
import RootLayout, { type ControlsCtx } from "./layout/RootLayout";
import type { ViewMode } from "./types/tmdb";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const toggleSound = useCallback(() => setSoundEnabled((p) => !p), []);

  const controls: ControlsCtx = {
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    soundEnabled,
    toggleSound,
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout controls={controls} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
