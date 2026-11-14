import { z } from "zod";

export const createItemSchema = z.object({
  content: z.string().min(1, "Task content cannot be empty"),
  isCompleted: z.boolean({
    message: "isCompleted must be a boolean",
  }),
  listId: z.string().min(1, "List ID is required"),
});

export const updateItemSchema = z.object({
  content: z.string().min(1, "Task content cannot be empty").optional(),
  isCompleted: z.boolean().optional(),
});
