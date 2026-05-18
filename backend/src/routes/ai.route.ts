import { Router } from "express";
import { applyAI, getTags } from "../controllers/ai.controller";


const router =  Router();

router.post("/ai", applyAI)
router.post("/ai/tags", getTags)

export default router;
