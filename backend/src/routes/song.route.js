import { Router } from 'express';

const router = Router();

// Example route for getting all songs
router.get('/', (req, res) => {
    res.send({ message: 'Song route is working!' });
});

export default router;
