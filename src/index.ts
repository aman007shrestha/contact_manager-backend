import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./misc/logger";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import appRoutes from "./routes";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(`
  API IS UP AND RUNNING
  Try Hitting on
    /users
    /auth
    
  `);
});
app.use("/api", appRoutes);
app.use(notFound);
app.use(errorHandler);

// Server Listen
app.listen(PORT, () => {
  console.clear();
  logger.info(`Server is running on port ${PORT}`);
});
