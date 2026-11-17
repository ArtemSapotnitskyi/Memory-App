"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

import { useAuthStore } from "@/shared/store/auth.store";
import { listService } from "@/shared/api/services/listService";
import { itemService } from "@/shared/api/services/itemService";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return <HomeIcon size={22} />;
    case "Briefcase":
      return <Briefcase size={22} />;
    case "Plane":
      return <Plane size={22} />;
    case "Car":
      return <Car size={22} />;
    case "ShoppingCart":
      return <ShoppingCart size={22} />;
    default:
      return <LayoutList size={22} />;
  }
};

export default function Home() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"Today" | "All">("Today");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<CardItem | null>(null);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/auth");
    }
  }, [user, isInitialized, router]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedLists = await listService.getAll();

      const cardsPromises = fetchedLists.map(async (list) => {
        const fetchedItems = await itemService.getAllByListId(list.id);

        const tasks: TaskItem[] = fetchedItems.map((item) => ({
          id: item.id,
          text: item.content,
          completed: item.iscompleted,
        }));

        return {
          id: list.id,
          title: list.title,
          icon: getIconComponent(list.icon),
          iconName: list.icon,
          color: list.color,
          date: list.viewtype as "Today" | "All",
          tasks: tasks,
        } as CardItem;
      });

      const fullCards = await Promise.all(cardsPromises);
      setCards(fullCards);
    } catch (error) {
      console.error("Помилка завантаження даних:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const toggleTask = async (cardId: string, taskId: string) => {
    const card = cards.find((c) => c.id === cardId);
    const task = card?.tasks.find((t) => t.id === taskId);
    if (!task) return;

    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t,
              ),
            }
          : c,
      ),
    );

    try {
      await itemService.update(taskId, { isCompleted: !task.completed });
    } catch (error) {
      console.error(error);
      fetchData();
    }
  };

  const toggleCardDate = async (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const newDate = card.date === "Today" ? "All" : "Today";

    setExpandedCardId(null);
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, date: newDate } : c)),
    );

    try {
      await listService.update(cardId, { viewType: newDate });
    } catch (error) {
      fetchData();
    }
  };

  const deleteCard = async (cardId: string) => {
    setExpandedCardId(null);
    setCards((prev) => prev.filter((c) => c.id !== cardId));

    try {
      await listService.remove(cardId);
    } catch (error) {
      fetchData();
    }
  };

  const editCard = (cardId: string) => {
    const cardToEdit = cards.find((c) => c.id === cardId);
    if (cardToEdit) {
      setEditingCard(cardToEdit);
    }
  };

  const handleSaveModal = async (
    cardName: string,
    items: TaskItem[],
    color: string,
    iconName: string,
  ) => {
    try {
      if (editingCard) {
        await listService.update(editingCard.id, {
          title: cardName,
          color: color,
          icon: iconName,
        });

        const oldTasks = editingCard.tasks;

        for (const item of items) {
          const isOld = oldTasks.find((t) => t.id === item.id);
          if (isOld) {
            if (
              isOld.text !== item.text ||
              isOld.completed !== item.completed
            ) {
              await itemService.update(item.id, {
                content: item.text,
                isCompleted: item.completed,
              });
            }
          } else {
            await itemService.create({
              listId: editingCard.id,
              content: item.text,
              isCompleted: item.completed,
            });
          }
        }

        for (const old of oldTasks) {
          const stillExists = items.find((t) => t.id === old.id);
          if (!stillExists) {
            await itemService.remove(old.id);
          }
        }
      } else {
        const newList = await listService.create({
          title: cardName,
          color: color,
          icon: iconName,
          viewType: activeFilter,
        });

        // Створюємо всі завдання для нього
        for (const item of items) {
          await itemService.create({
            listId: newList.id,
            content: item.text,
            isCompleted: item.completed,
          });
        }
      }

      await fetchData();
      setIsModalOpen(false);
      setEditingCard(null);
    } catch (error) {
      console.error("Помилка збереження", error);
    }
  };

  if (!user) return null;

  const filteredCards = cards.filter((card) => card.date === activeFilter);
  const HEADER_HEIGHT = 65;

  return (
    <div className="flex-1 flex flex-col h-full w-full pt-4 relative">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-gray-400 animate-pulse">Завантаження...</span>
        </div>
      ) : filteredCards.length === 0 ? (
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
