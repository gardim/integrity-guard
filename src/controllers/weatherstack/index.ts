import axios from 'axios';
import express from 'express';
import { Application } from 'express';
import createApp from '../../config';
import { WeatherstackResponse, PlantCareInfo } from './type';

const app: Application = createApp();

const weatherstackApiUrl: string = app.get('weatherstackApiUrl') as string;
const weatherstackApiKey: string = app.get('weatherstackApiKey').replace(/'/g, '') as string;

class WeatherstackController {
	async post(req: express.Request, res: express.Response): Promise<void> {
		const query: string = req.body.query;

		try {
			const response = await axios.get(
				`${weatherstackApiUrl}?access_key=${weatherstackApiKey}&query=${query}`,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			res.send(WeatherstackController.mapResponseToPlantCareInfo(response.data));
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}

	static mapResponseToPlantCareInfo(response: WeatherstackResponse): PlantCareInfo {
		return {
			temperature: response.current.temperature,
			humidity: response.current.humidity,
			wind_speed: response.current.wind_speed,
			pressure: response.current.pressure,
			precipitation: response.current.precip,
			uv_index: response.current.uv_index,
			is_day: response.current.is_day,
		};
	}
}

export default new WeatherstackController();
