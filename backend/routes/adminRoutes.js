import express from "express";
import {
  promoteToAdmin,
  demoteToUser,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect and restrict access to admin routes
router.put("/promote/:userId", verifyToken, verifyAdmin, promoteToAdmin);
router.put("/demote/:userId", verifyToken, verifyAdmin, demoteToUser);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/delete/:userId", verifyToken, verifyAdmin, deleteUser);

export default router;
