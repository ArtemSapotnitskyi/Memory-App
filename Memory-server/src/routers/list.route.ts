import { Router } from "express";
import * as listController from "../controllers/list.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createListSchema,
  updateListSchema,
} from "../validators/listValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/", listController.getAll);
router.get("/:id", listController.getOne);

router.post("/", validate(createListSchema), listController.create);
router.patch("/:id", validate(updateListSchema), listController.update);
router.delete("/:id", listController.remove);

export default router;
