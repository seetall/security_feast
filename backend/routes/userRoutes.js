import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
  verifyUser,
} from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema, loginSchema } from "../validator/userValidator.js";

const router = express.Router();

// Registration Route with validation middleware
router.post("/register", validateRequest(registerSchema), createUser);

// Login Route with validation middleware
router.post("/login", validateRequest(loginSchema), loginUser);

// Verification Route (no validation needed)
router.get("/verify/:token", verifyUser);

router.get("/change_password", changePassword);

export default router;
