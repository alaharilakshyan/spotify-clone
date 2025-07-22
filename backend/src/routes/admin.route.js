import { Router } from "express";
import { checkAdmin, deleteAlbum, createAlbum, createSong, deleteSong } from "#controllers/admin-controller";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin)

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);


router.post("/album", createAlbum);
router.delete("/album:id", deleteAlbum);

export default router;
// Add more admin routes here as needed
// Example: router.post('/create', createAdminHandler);