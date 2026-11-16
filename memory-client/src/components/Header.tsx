"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Brain, Wrench } from "lucide-react";
import SettingsModal from "./SettingsModal";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <header className="flex justify-between items-center py-6 px-6 w-full">
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-theme-container shadow-inner transition-colors">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass transition-all active:scale-95 shadow-md"
          >
            <div className="text-theme-accent transition-colors">
              {isDark ? (
                <Sun size={22} strokeWidth={2.5} />
              ) : (
                <Moon size={22} strokeWidth={2.5} />
              )}
            </div>
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass transition-all active:scale-95 shadow-md"
          >
            <div className="text-theme-accent transition-colors">
              <Wrench size={20} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 py-3 rounded-full liquid-glass shadow-md transition-colors text-theme-accent">
          <Brain size={24} />
          <span className="font-bold text-xl tracking-wide">Memory</span>
        </div>
      </header>

      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          isDark={isDark}
          setIsDark={setIsDark}
          currentTheme={theme}
          setTheme={setTheme}
        />
      )}
    </>
  );
}
