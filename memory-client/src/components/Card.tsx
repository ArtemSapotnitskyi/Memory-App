import { ReactNode } from "react";
import { ArrowRightLeft, Trash2, Pencil } from "lucide-react";
import TaskRow from "./TaskRow";

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface CardItem {
  id: string;
  title: string;
  icon?: ReactNode;
  iconName?: string;
  color?: string;
  date: "Today" | "All";
  tasks: TaskItem[];
}

interface CardProps {
  card: CardItem;
  isExpanded?: boolean;
  style?: React.CSSProperties;
  onToggleTask?: (taskId: string) => void;
  onHeaderClick?: () => void;
  onMoveCard?: () => void;
  onDeleteCard?: () => void;
  onEditCard?: () => void;
}

export default function Card({
  card,
  isExpanded = false,
  style,
  onToggleTask,
  onHeaderClick,
  onMoveCard,
  onDeleteCard,
  onEditCard,
}: CardProps) {
  const bgColor = card.color || "#3b82f6";

  return (
    <div
      style={{ backgroundColor: bgColor, ...style }}
      className={`w-full rounded-[40px] pt-5 px-6 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden`}
    >
      <div
        onClick={onHeaderClick}
        className="flex items-center text-white min-h-5 cursor-pointer select-none shrink-0"
      >
        <div className="flex-1 flex gap-2 justify-start">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onEditCard) onEditCard();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-all active:scale-95 shadow-inner"
            title="Edit Card"
          >
            <Pencil size={17} strokeWidth={2.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDeleteCard) onDeleteCard();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white hover:text-red-200 transition-all active:scale-95 shadow-inner"
            title="Delete Card"
          >
            <Trash2 size={17} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 shrink-0 px-2">
          {card.icon && <span className="shrink-0">{card.icon}</span>}
          <h3 className="font-bold text-[22px] tracking-wide truncate max-w-30">
            {card.title}
          </h3>
        </div>

        <div className="flex-1 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onMoveCard) onMoveCard();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-all active:scale-95 shadow-inner"
            title={card.date === "Today" ? "Move to All" : "Move to Today"}
          >
            <ArrowRightLeft size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        style={
          {
            "--theme-element": "rgba(255, 255, 255, 0.15)",
          } as React.CSSProperties
        }
        className={`mt-4 w-full liquid-glass rounded-4xl p-5 overflow-y-auto custom-scrollbar flex flex-col gap-3 transition-all duration-500 origin-top ${
          isExpanded
            ? "flex-1 mb-6 opacity-100 scale-y-100"
            : "flex-1 mb-6 opacity-0 scale-y-0"
        }`}
      >
        <div className="flex flex-col gap-3 flex-1">
          {card.tasks.map((task) => (
            <TaskRow
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              onToggle={() => onToggleTask && onToggleTask(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
