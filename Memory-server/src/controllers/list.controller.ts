import { type Request, type Response } from "express";
import * as listService from "../services/list.service.js";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const lists = await listService.getAllByUserId(userId);
    res.status(200).json(lists);
  } catch (error) {
    console.error("GetAllLists error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const listId = req.params.id as string;

    const list = await listService.getById(listId, userId);
    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    res.status(200).json(list);
  } catch (error) {
    console.error("GetOneList error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const { title, icon, color, viewType } = req.body;

    const newList = await listService.create({
      title,
      icon,
      color,
      viewType,
      userId,
    });

    res.status(201).json(newList);
  } catch (error) {
    console.error("CreateList error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const listId = req.params.id as string;
    const data = req.body;

    const updatedList = await listService.update(listId, userId, data);

    if (!updatedList) {
      res
        .status(404)
        .json({ message: "List not found or you don't have access" });
      return;
    }

    res.status(200).json(updatedList);
  } catch (error) {
    console.error("UpdateList error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as string;
    const listId = req.params.id as string;

    const list = await listService.getById(listId, userId);
    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    await listService.remove(listId, userId);
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error("RemoveList error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
