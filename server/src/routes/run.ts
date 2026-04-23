import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { workflowId, status, duration, nodes } = req.body;

    // create run
    const run = await prisma.workflowRun.create({
      data: {
        workflowId,
        status,
        duration,
      },
    });

    // create node executions
    const nodeData = nodes.map((n: any) => ({
      runId: run.id,
      nodeId: n.id,
      type: n.type,
      status: n.status,
      output: n.output,
      startedAt: new Date(n.startedAt),
      endedAt: new Date(n.endedAt),
    }));

    await prisma.nodeExecution.createMany({
      data: nodeData,
    });

    res.json({ success: true, runId: run.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save run" });
  }
});

export default router;