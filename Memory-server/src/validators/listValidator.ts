import { z } from "zod";

export const createListSchema = z.object({
  title: z.string().min(3, "The title must contain at least 3 characters."),
  icon: z.string().min(1, "Icon is required."),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Must be HEX."),
  viewType: z.enum(["list", "grid"], {
    message: "View type must be either 'list' or 'grid'",
  }),
});

export const updateListSchema = createListSchema.partial();
