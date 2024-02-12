import axios from "axios";
import express from "express";
import { Application } from "express";
import createApp from "../config";

const app: Application = createApp();

const weatherstackApiUrl: string = app.get("weatherstackApiUrl") as string;
const weatherstackApiKey: string = app.get("weatherstackApiKey") as string;

class WeatherstackController {

  async post(req: express.Request, res: express.Response): Promise<void> {
    const query: string = req.body;

    try {
      const response = await axios.get(`${weatherstackApiUrl}?access_key=${weatherstackApiKey}&query=${query}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default new WeatherstackController();
