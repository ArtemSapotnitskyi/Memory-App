"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import {
  ImageIcon,
  Paintbrush,
  Plus,
  Check,
  Home as HomeIcon,
  Briefcase,
  Plane,
  Car,
  ShoppingCart,
  LayoutList,
  Coffee,
  Book,
  Dumbbell,
  Heart,
} from "lucide-react";

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ListModalProps {
  onClose: () => void;
  onSave: (
    cardName: string,
    items: TaskItem[],
    color: string,
    iconName: string,
  ) => void;
  initialCardName?: string;
  initialItems?: TaskItem[];
  initialColor?: string;
  initialIconName?: string;
}

const availableColors = [
  { id: "red", hex: "#ef4444" },
  { id: "orange", hex: "#f59e0b" },
  { id: "lime", hex: "#a3e635" },
  { id: "green", hex: "#16a34a" },
  { id: "blue", hex: "#1d4ed8" },
  { id: "purple", hex: "#8b5cf6" },
  { id: "pink", hex: "#ec4899" },
];

export const availableIcons: Record<string, ReactNode> = {
  Home: <HomeIcon size={22} />,
  Briefcase: <Briefcase size={22} />,
  Plane: <Plane size={22} />,
  Car: <Car size={22} />,
  ShoppingCart: <ShoppingCart size={22} />,
  LayoutList: <LayoutList size={22} />,
  Coffee: <Coffee size={22} />,
  Book: <Book size={22} />,
  Dumbbell: <Dumbbell size={22} />,
  Heart: <Heart size={22} />,
};

export default function ListModal({
  onClose,
  onSave,
  initialCardName = "",
  initialItems = [],
  initialColor = "#3b82f6",
  initialIconName = "LayoutList",
}: ListModalProps) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [cardName, setCardName] = useState(initialCardName);
  const [items, setItems] = useState<TaskItem[]>(initialItems);

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedIconName, setSelectedIconName] = useState(initialIconName);

  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false);

  const addItemContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorMenuRef = useRef<HTMLDivElement>(null);
  const iconMenuRef = useRef<HTMLDivElement>(null);

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
    const handleClickOutsideMenus = (event: MouseEvent) => {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(event.target as Node)
      ) {
        setIsColorMenuOpen(false);
      }
      if (
        iconMenuRef.current &&
        !iconMenuRef.current.contains(event.target as Node)
      ) {
        setIsIconMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenus);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMenus);
  }, []);

  useEffect(() => {
    if (isAddingItem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingItem]);

  const handleAddItem = () => {
    if (inputValue.trim().length > 0) {
      const newItem: TaskItem = {
        id: Date.now().toString() + Math.random().toString(),
        text: inputValue.trim(),
        completed: false,
      };
      setItems((prev) => [...prev, newItem]);
      setInputValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddItem();
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleSaveCard = () => {
    if (!cardName.trim()) {
      alert("Please enter a card name");
      return;
    }

    let finalItems = [...items];

    if (inputValue.trim().length > 0) {
      finalItems.push({
        id: Date.now().toString() + Math.random().toString(),
        text: inputValue.trim(),
        completed: false,
      });
    }

    onSave(cardName.trim(), finalItems, selectedColor, selectedIconName);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-87.5 h-125 bg-[#1c1c1e] rounded-[40px] p-4 flex flex-col gap-4 border border-white/5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 w-full relative">
          <div className="relative" ref={iconMenuRef}>
            <button
              onClick={() => setIsIconMenuOpen(!isIconMenuOpen)}
              className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#1c1c1e] border border-white/10 hover:bg-[#2c2c2e] transition-colors text-white shadow-inner active:scale-95"
            >
              {availableIcons[selectedIconName] || <ImageIcon size={20} />}
            </button>

            {isIconMenuOpen && (
              <div className="absolute top-14 left-0 w-48 bg-[#2c2c2e] border border-white/10 rounded-2xl p-3 shadow-xl z-30 grid grid-cols-4 gap-2">
                {Object.entries(availableIcons).map(([name, iconNode]) => (
                  <button
                    key={name}
                    onClick={() => {
                      setSelectedIconName(name);
                      setIsIconMenuOpen(false);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      selectedIconName === name
                        ? "bg-white/20 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {iconNode}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Add Card Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="flex-1 min-w-0 h-12 bg-[#151517] rounded-full px-4 text-center text-white placeholder:text-gray-600 outline-none border border-black/50 focus:border-white/20 shadow-inner font-medium text-sm"
          />

          {/* Меню вибору кольору */}
          <div className="relative" ref={colorMenuRef}>
            <button
              onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
              className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#1c1c1e] border border-white/10 hover:bg-[#2c2c2e] transition-colors text-white shadow-inner active:scale-95"
            >
              <Paintbrush size={20} style={{ color: selectedColor }} />
            </button>

            {isColorMenuOpen && (
              <div className="absolute top-14 right-0 w-32 bg-[#2c2c2e] border border-white/10 rounded-2xl p-3 shadow-xl z-30 flex flex-wrap gap-2 justify-center">
                {availableColors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedColor(c.hex);
                      setIsColorMenuOpen(false);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                      selectedColor === c.hex
                        ? "scale-110 ring-2 ring-white/50 ring-offset-2 ring-offset-[#2c2c2e]"
                        : "hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 w-full rounded-4xl liquid-glass bg-[#0f0f11]! relative px-5 pt-5 pb-20 overflow-hidden flex flex-col">
          <div
            ref={addItemContainerRef}
            onClick={() => !isAddingItem && setIsAddingItem(true)}
            className={`absolute top-5 left-5 h-12 bg-white rounded-full flex items-center transition-all duration-300 ease-out shadow-lg overflow-hidden z-20 ${
              isAddingItem
                ? "w-60 cursor-text"
                : "w-12 cursor-pointer hover:scale-105 active:scale-95"
            }`}
          >
            <button
              onClick={(e) => {
                if (isAddingItem) {
                  e.stopPropagation();
                  handleAddItem();
                }
              }}
              className={`flex items-center justify-center shrink-0 transition-all duration-300 ${
                isAddingItem
                  ? "w-10 ml-2 hover:scale-110"
                  : "w-12 pointer-events-none"
              }`}
            >
              <Plus
                size={isAddingItem ? 24 : 28}
                strokeWidth={3}
                className="text-black transition-all duration-300"
              />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add Item"
              className={`bg-transparent outline-none text-black font-extrabold text-base transition-all duration-300 ${
                isAddingItem ? "w-full opacity-100 pr-4" : "w-0 opacity-0"
              }`}
            />
          </div>

          <div className="mt-16 flex flex-col gap-3 overflow-y-auto z-10 custom-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-5.5 h-5.5 rounded-md border-[1.5px] flex shrink-0 items-center justify-center transition-all duration-200 ${
                    item.completed
                      ? "bg-white border-white text-black"
                      : "border-white/40 hover:border-white/70 bg-transparent"
                  }`}
                >
                  {item.completed && <Check size={16} strokeWidth={3} />}
                </button>
                <span
                  className={`font-medium text-[15px] transition-all duration-200 ${
                    item.completed
                      ? "text-gray-500 line-through decoration-gray-500 decoration-2"
                      : "text-white"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-0 w-full flex justify-center z-20 pointer-events-none">
            <button
              onClick={handleSaveCard}
              className="pointer-events-auto bg-[#2c2c2e] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#3c3c3e] active:scale-95 transition-all shadow-xl border border-white/5"
            >
              Save Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
