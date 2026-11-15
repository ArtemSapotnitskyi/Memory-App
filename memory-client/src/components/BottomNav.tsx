"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

interface BottomNavProps {
  onAddClick: () => void;
}

export default function BottomNav({ onAddClick }: BottomNavProps) {
  const [filter, setFilter] = useState<"Today" | "All">("Today");

  return (
    <div className="flex justify-between items-center w-full py-2">
      <div className="relative flex items-center p-1 rounded-full liquid-glass w-55">
        <div className="absolute inset-1 pointer-events-none">
          <div
            className={`h-full w-1/2 rounded-full liquid-glass transition-transform duration-300 ease-out ${
              filter === "Today" ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>

        <button
          onClick={() => setFilter("Today")}
          className={`flex-1 py-3.5 rounded-full font-bold text-sm z-10 transition-colors duration-300 bg-transparent ${
            filter === "Today"
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setFilter("All")}
          className={`flex-1 py-3.5 rounded-full font-bold text-sm z-10 transition-colors duration-300 bg-transparent ${
            filter === "All"
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          All
        </button>
      </div>
      <button
        onClick={onAddClick}
        className="w-30 h-16 flex items-center justify-center rounded-full bg-[#0f0f11] dark:bg-white text-white dark:text-black active:scale-95 transition-all"
      >
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
}
