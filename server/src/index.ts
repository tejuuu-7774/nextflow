import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import aiRoutes from "./routes/ai";
import workflowRoutes from "./routes/workflowRoutes";
import runRoutes from "./routes/run";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use("/api/ai", aiRoutes);
app.use("/api/workflows", workflowRoutes);
app.use("/run", runRoutes);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
