import express, { Request, Response } from "express";
import cors from "cors";

import workflowRoutes from "./routes/workflowRoutes";
import runRoutes from "./routes/run";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use("/api/workflows", workflowRoutes);
app.use("/run", runRoutes);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});