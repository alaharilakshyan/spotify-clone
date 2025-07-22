import { Router } from 'express';
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from '#controllers/song-controller';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';


const router = Router();

// Example route for getting all songs
router.get('/', protectRoute, requireAdmin,getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);



export default router;
