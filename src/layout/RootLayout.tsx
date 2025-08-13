import { Outlet, useOutletContext } from "react-router";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import type { ViewMode } from "../types/tmdb";

export type ControlsCtx = {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

export function useControls() {
  return useOutletContext<ControlsCtx>();
}

export default function RootLayout({ controls }: { controls: ControlsCtx }) {
  const {
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    soundEnabled,
    toggleSound,
  } = controls;
  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
      />
      <main className="min-h-[70vh]">
        <Outlet context={controls} />
      </main>
      <Footer />
    </div>
  );
}
