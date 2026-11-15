"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Brain, Wrench } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="flex justify-between items-center py-6 px-6 w-full">
      <div className="flex items-center gap-0.5 p-1 rounded-full bg-[#E5E5E5] dark:bg-[#2c2c2e]">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass text-black dark:text-white transition-transform active:scale-95"
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass text-black dark:text-white transition-transform active:scale-95">
          <Wrench size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-black dark:text-white">
        <Brain size={24} />
        <span className="font-bold text-xl tracking-wide">Memory</span>
      </div>
    </header>
  );
}
