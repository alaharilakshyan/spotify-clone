import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send({ message: "Stat route is working!" });
});

export default router;
