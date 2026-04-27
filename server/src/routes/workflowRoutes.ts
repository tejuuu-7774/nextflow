import { Router } from "express";
import { createWorkflow } from "../controllers/workflowController";
import prisma from '../prisma/client'

const router = Router();

router.post("/", createWorkflow);
router.get("/", async (req, res) => {
  try {
    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(workflows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workflows" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, nodes, edges } = req.body;

  try {
    const updated = await prisma.workflow.update({
      where: { id },
      data: {
        name,
        nodes,
        edges,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;