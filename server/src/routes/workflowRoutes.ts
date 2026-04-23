import { Router } from "express";
import { createWorkflow } from "../controllers/workflowController";

const router = Router();

router.post("/", createWorkflow);

export default router;