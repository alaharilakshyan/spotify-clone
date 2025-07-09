import { Router } from "express";
import { createSong } from "#controllers/admin-controller";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protectRoute, requireAdmin, createSong);

export default router;
// Add more admin routes here as needed
// Example: router.post('/create', createAdminHandler);