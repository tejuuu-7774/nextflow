import express, { Request, Response } from "express";
import cors from "cors";

import workflowRoutes from "./routes/workflowRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

// 🔥 ADD THIS
app.use("/api/workflows", workflowRoutes);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});