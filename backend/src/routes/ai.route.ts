import { Router } from "express";
import { applyAI, getTags } from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth";


const router =  Router();
router.use(authMiddleware); 

router.post("/ai", applyAI)
router.post("/ai/tags", getTags)

export default router;
