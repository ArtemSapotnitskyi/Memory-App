"use client";
import { useState } from "react";
import {
  Home as HomeIcon,
  Briefcase,
  Plane,
  Car,
  ShoppingCart,
  LayoutList,
} from "lucide-react";

import BottomNav from "@/components/BottomNav";
import ListModal from "@/components/ListModal";
import Card, { CardItem } from "@/components/Card";
import type { TaskItem } from "@/components/ListModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"Today" | "All">("Today");

  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<CardItem | null>(null);

  const [cards, setCards] = useState<CardItem[]>([
    {
      id: "1",
      title: "Home Work",
      icon: <HomeIcon size={22} />,
      iconName: "Home",
      color: "#ef4444",
      date: "All",
      tasks: [],
    },
    {
      id: "2",
      title: "Work",
      icon: <Briefcase size={22} />,
      iconName: "Briefcase",
      color: "#f59e0b",
      date: "All",
      tasks: [],
    },
    {
      id: "3",
      title: "Airport",
      icon: <Plane size={22} />,
      iconName: "Plane",
      color: "#a3e635",
      date: "Today",
      tasks: [],
    },
    {
      id: "4",
      title: "Car",
      icon: <Car size={22} />,
      iconName: "Car",
      color: "#16a34a",
      date: "Today",
      tasks: [],
    },
    {
      id: "5",
      title: "Shop List",
      icon: <ShoppingCart size={22} />,
      iconName: "ShoppingCart",
      color: "#1d4ed8",
      date: "Today",
      tasks: [
        { id: "t1", text: "Apples (2-3)", completed: true },
        { id: "t2", text: "Onions (2 kg)", completed: true },
        { id: "t3", text: "Tomatos (3)", completed: false },
      ],
    },
  ]);

  const toggleTask = (cardId: string, taskId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            tasks: card.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task,
            ),
          };
        }
        return card;
      }),
    );
  };

  const toggleCardDate = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            date: card.date === "Today" ? "All" : "Today",
          };
        }
        return card;
      }),
    );
    setExpandedCardId(null);
  };

  const deleteCard = (cardId: string) => {
    if (expandedCardId === cardId) {
      setExpandedCardId(null);
    }
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const editCard = (cardId: string) => {
    const cardToEdit = cards.find((c) => c.id === cardId);
    if (cardToEdit) {
      setEditingCard(cardToEdit);
    }
  };

  const handleSaveModal = (
    cardName: string,
    items: TaskItem[],
    color: string,
    iconName: string,
  ) => {
    const { availableIcons } = require("@/components/ListModal");
    const selectedIconNode = availableIcons[iconName];

    if (editingCard) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === editingCard.id
            ? {
                ...card,
                title: cardName,
                tasks: items,
                color: color,
                icon: selectedIconNode,
                iconName: iconName,
              }
            : card,
        ),
      );
      setEditingCard(null);
    } else {
      const newCard: CardItem = {
        id: Date.now().toString(),
        title: cardName,
        icon: selectedIconNode,
        iconName: iconName,
        color: color,
        date: activeFilter,
        tasks: items,
      };

      setCards((prevCards) => [...prevCards, newCard]);
      setIsModalOpen(false);
    }
  };

  const filteredCards = cards.filter((card) => {
    return card.date === activeFilter;
  });

  const HEADER_HEIGHT = 65;

  return (
    <div className="flex-1 flex flex-col h-full w-full pt-4 relative">
      {filteredCards.length === 0 ? (
        <div className="flex-1 flex items-center justify-center liquid-glass rounded-[40px] mb-6 mx-4 shadow-inner transition-colors duration-500">
          <span className="text-3xl font-extrabold text-theme-accent opacity-70">
            {activeFilter === "Today" ? "No tasks for Today" : "No other tasks"}
          </span>
        </div>
      ) : (
        <div className="flex-1 relative mb-3 w-full overflow-hidden rounded-[40px]">
          {filteredCards.map((card, index) => {
            const isExpanded = expandedCardId === card.id;

            const expandedIndex = filteredCards.findIndex(
              (c) => c.id === expandedCardId,
            );
            let topPosition: string;
            const baseTopOffset = index * HEADER_HEIGHT;

            if (expandedIndex !== -1 && index > expandedIndex) {
              const cardsBelowCount = filteredCards.length - index;
              topPosition = `calc(98% - ${cardsBelowCount * HEADER_HEIGHT}px)`;
            } else {
              topPosition = `${baseTopOffset}px`;
            }

            return (
              <Card
                key={card.id}
                card={card}
                isExpanded={isExpanded}
                onToggleTask={(taskId) => toggleTask(card.id, taskId)}
                onMoveCard={() => toggleCardDate(card.id)}
                onDeleteCard={() => deleteCard(card.id)}
                onEditCard={() => editCard(card.id)}
                onHeaderClick={() =>
                  setExpandedCardId(isExpanded ? null : card.id)
                }
                style={{
                  position: "absolute",
                  top: topPosition,
                  bottom: "0px",
                  left: 0,
                  right: 0,
                  zIndex: index,
                  boxShadow: isExpanded
                    ? "0 10px 30px rgba(0,0,0,0.3)"
                    : "0 -4px 10px rgba(0,0,0,0.1)",
                  transition:
                    "top 0.5s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.3s ease, background-color 0.3s ease",
                }}
              />
            );
          })}
        </div>
      )}

      <BottomNav
        onAddClick={() => setIsModalOpen(true)}
        filter={activeFilter}
        onFilterChange={(newFilter) => {
          setActiveFilter(newFilter);
          setExpandedCardId(null);
        }}
      />

      {(isModalOpen || editingCard) && (
        <ListModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingCard(null);
          }}
          onSave={handleSaveModal}
          initialCardName={editingCard?.title}
          initialItems={editingCard?.tasks}
          initialColor={editingCard?.color}
          initialIconName={editingCard?.iconName}
        />
      )}
    </div>
  );
}
