import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createWorkflow = async (req: Request, res: Response) => {
  try {
    const { name, nodes, edges } = req.body;

    if (!name || !nodes || !edges) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const workflow = await prisma.workflow.create({
      data: {
        name,
        nodes,
        edges,
      },
    });

    res.json(workflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create workflow" });
  }
};