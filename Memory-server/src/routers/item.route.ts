import { Router } from "express";
import * as itemController from "../controllers/item.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createItemSchema,
  updateItemSchema,
} from "../validators/itemValidator.js";

const router = Router();

router.use(requireAuth);
router.get("/list/:listId", itemController.getAll);
router.post("/", validate(createItemSchema), itemController.create);
router.patch("/:id", validate(updateItemSchema), itemController.update);
router.delete("/:id", itemController.remove);

export default router;
