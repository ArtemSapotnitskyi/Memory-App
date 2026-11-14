import { Router } from "express";
import {
  getMe,
  register,
  login,
  logout,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.get("/me", requireAuth, getMe);

export default router;
