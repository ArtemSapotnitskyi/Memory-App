"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

interface BottomNavProps {
  onAddClick: () => void;
  filter: "Today" | "All";
  onFilterChange: (filter: "Today" | "All") => void;
}

export default function BottomNav({
  onAddClick,
  filter,
  onFilterChange,
}: BottomNavProps) {
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
          onClick={() => onFilterChange("Today")}
          className={`flex-1 py-3.5 rounded-full font-bold text-sm z-10 transition-colors duration-300 bg-transparent ${
            filter === "Today"
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => onFilterChange("All")}
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
        className="w-14 h-14 rounded-full flex items-center justify-center bg-theme-accent shadow-lg active:scale-95 transition-all"
      >
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
}
