import { Check } from "lucide-react";

interface TaskRowProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  isModal?: boolean;
}

export default function TaskRow({
  id,
  text,
  completed,
  onToggle,
  isModal = false,
}: TaskRowProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle(id)}
        className={`w-5.5 h-5.5 rounded-md border-[1.5px] flex shrink-0 items-center justify-center transition-all duration-200 cursor-pointer ${
          completed
            ? "bg-white border-white text-black"
            : "border-white/60 hover:border-white/90 bg-transparent"
        }`}
      >
        {completed && <Check size={16} strokeWidth={3} />}
      </button>

      <span
        onClick={() => onToggle(id)}
        className={`font-semibold text-[17px] transition-all duration-200 cursor-pointer select-none ${
          completed
            ? isModal
              ? "text-gray-500 line-through decoration-gray-500 decoration-2"
              : "text-white/60 line-through decoration-white/60 decoration-2"
            : "text-white"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
