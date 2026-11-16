"use client";
import React from "react";
import { X, User, Moon, Sun, Palette } from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const colorThemes = [
  { id: "default", color: "#808080", label: "Neutral" },
  { id: "blue", color: "#3b82f6", label: "Blue" },
  { id: "purple", color: "#8b5cf6", label: "Purple" },
  { id: "green", color: "#10b981", label: "Green" },
  { id: "rose", color: "#f43f5e", label: "Rose" },
];

export default function SettingsModal({
  onClose,
  isDark,
  setIsDark,
  currentTheme,
  setTheme,
}: SettingsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-[40px] p-6 flex flex-col gap-6 shadow-2xl border border-black/5 dark:border-white/5 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-bold text-black dark:text-white tracking-wide">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-3xl bg-black/5 dark:bg-white/5 shadow-inner">
          <div className="w-14 h-14 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
            <User size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-[19px] text-black dark:text-white truncate">
              User Name
            </h4>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              user@example.com
            </p>
          </div>
        </div>

        <hr className="border-black/5 dark:border-white/10" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-black dark:text-white mb-2">
            <Palette size={20} />
            <h3 className="font-bold text-lg">Appearance</h3>
          </div>

          <div className="flex items-center justify-between p-1 rounded-full bg-black/5 dark:bg-[#2c2c2e] shadow-inner">
            <button
              onClick={() => setIsDark(false)}
              className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                !isDark
                  ? "bg-white text-black shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-black"
              }`}
            >
              <Sun size={18} /> Light
            </button>
            <button
              onClick={() => setIsDark(true)}
              className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                isDark
                  ? "bg-[#3c3c3e] text-white shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-white"
              }`}
            >
              <Moon size={18} /> Dark
            </button>
          </div>

          <div className="flex justify-between items-center mt-2 px-2">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                title={theme.label}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentTheme === theme.id
                    ? "scale-110 shadow-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#1c1c1e] ring-black/20 dark:ring-white/20"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: theme.color }}
              >
                {currentTheme === theme.id && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
