import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { loadEnv } from "config/envs";
import { connectDb, disconnectDB } from "config/database";
import './utils/cronjob';

loadEnv();

import { handleApplicationErrors } from "middlewares/error-handling-middleware";
import router from "./routers/index.routers"

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(router)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;