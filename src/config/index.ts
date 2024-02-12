import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const createApp = (): express.Application => {
  const app: express.Application = express();

  app.set("port", process.env.PORT);

  app.use(express.json());

  app.use(cors());

  app.set("trefleApiUrl", process.env.TREFLE_API_URL || '');
  app.set("trefleApiKey", process.env.TREFLE_API_KEY || '');
  app.set("weatherstackApiUrl", process.env.WEATHERSTACK_API_URL || '');
  app.set("weatherstackApiKey", process.env.WEATHERSTACK_API_KEY || '');

  return app;
};

export default createApp;
