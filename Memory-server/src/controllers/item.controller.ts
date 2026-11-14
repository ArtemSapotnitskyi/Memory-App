import { type Request, type Response } from "express";
import * as itemService from "../services/item.service.js";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const listId = req.params.listId as string;

    const items = await itemService.getAllByListId(userId, listId);
    res.status(200).json(items);
  } catch (error) {
    console.error("GetAllItems error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const { content, isCompleted, listId } = req.body;

    const newItem = await itemService.create({
      content,
      isCompleted,
      userId,
      listId,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("CreateItem error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const id = req.params.id as string;
    const data = req.body;

    const updatedItem = await itemService.update(id, userId, data);

    if (!updatedItem) {
      res
        .status(404)
        .json({ message: "Item not found or you don't have access" });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("UpdateItem error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const id = req.params.id as string;

    await itemService.remove(id, userId);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("RemoveItem error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
