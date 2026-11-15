"use client";
import { useState, useRef, useEffect } from "react";
import { ImageIcon, Paintbrush, Plus } from "lucide-react";

interface ListModalProps {
  onClose: () => void;
}

export default function ListModal({ onClose }: ListModalProps) {
  const [isAddingItem, setIsAddingItem] = useState(false);

  const addItemContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isAddingItem &&
        addItemContainerRef.current &&
        !addItemContainerRef.current.contains(event.target as Node)
      ) {
        setIsAddingItem(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAddingItem]);
  useEffect(() => {
    if (isAddingItem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingItem]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-87.5 h-125 bg-[#1c1c1e] rounded-[40px] p-4 flex flex-col gap-4 border border-white/5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <button className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#1c1c1e] border border-white/10 hover:bg-[#2c2c2e] transition-colors text-white shadow-inner active:scale-95">
            <ImageIcon size={20} />
          </button>

          <input
            type="text"
            placeholder="Add Card Name"
            className="flex-1 min-w-0 h-12 bg-[#151517] rounded-full px-4 text-center text-white placeholder:text-gray-600 outline-none border border-black/50 focus:border-white/20 shadow-inner font-medium text-sm"
          />

          <button className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#1c1c1e] border border-white/10 hover:bg-[#2c2c2e] transition-colors text-white shadow-inner active:scale-95">
            <Paintbrush size={20} />
          </button>
        </div>

        <div className="flex-1 w-full rounded-4xl liquid-glass bg-[#0f0f11]! relative p-5 overflow-hidden">
          <div
            ref={addItemContainerRef}
            onClick={() => !isAddingItem && setIsAddingItem(true)}
            className={`absolute top-5 left-5 h-12 bg-white rounded-full flex items-center transition-all duration-300 ease-out shadow-lg overflow-hidden ${
              isAddingItem
                ? "w-60 cursor-text"
                : "w-12 cursor-pointer hover:scale-105 active:scale-95"
            }`}
          >
            <div
              className={`flex items-center justify-center shrink-0 transition-all duration-300 ${isAddingItem ? "w-10 ml-2" : "w-12"}`}
            >
              <Plus
                size={isAddingItem ? 24 : 28}
                strokeWidth={3}
                className="text-black transition-all duration-300"
              />
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="Add Item"
              className={`bg-transparent outline-none text-black font-extrabold text-base transition-all duration-300 ${
                isAddingItem ? "w-full opacity-100 pr-4" : "w-0 opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
