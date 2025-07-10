import { Router } from "express";
import { deleteAlbum, createAlbum, createSong, deleteSong } from "#controllers/admin-controller";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/check", protectRoute, requireAdmin, checkAdmin)

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);


router.post("/album", protectRoute, requireAdmin, createAlbum);
router.delete("/album:id", protectRoute, requireAdmin, deleteAlbum);

export default router;
// Add more admin routes here as needed
// Example: router.post('/create', createAdminHandler);