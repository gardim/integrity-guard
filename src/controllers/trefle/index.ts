import axios from 'axios';
import express from 'express';
import { Application } from 'express';
import createApp from '../../config';
import { TrefleSpeciesResponse, TrefleSpeciesSearchResponse } from './type';
import { Plant, PlantIdentifier } from '../type';

const app: Application = createApp();

const trefleApiUrl: string = app.get('trefleApiUrl') as string;
const trefleApiKey: string = app.get('trefleApiKey') as string;

class TrefleController {
	async get(req: express.Request, res: express.Response): Promise<void> {
		const id: string = req.query.id as string;

		try {
			console.log(id);
			const response = await axios.get(`${trefleApiUrl}/species/${id}`, {
				params: {
					token: trefleApiKey,
				},
				headers: {
					'Content-Type': 'application/json',
				},
			});
			res.send(TrefleController.convertToPlant(response.data));
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}

	async post(req: express.Request, res: express.Response): Promise<void> {
		const query: string = req.query.q as string;

		try {
			const response = await axios.get(`${trefleApiUrl}/species/search`, {
				params: {
					token: trefleApiKey,
					q: query,
				},
				headers: {
					'Content-Type': 'application/json',
				},
			});
			res.send(TrefleController.convertToPlantIdentifier(response.data));
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}
	private static convertToPlant(trefleObject: TrefleSpeciesResponse): Plant {
		return {
			name: trefleObject.data.common_name || '',
			scientific_name: trefleObject.data.scientific_name || '',
			family: trefleObject.data.family || '',
			flower_color: trefleObject.data.flower?.color || [],
			average_height: trefleObject.data.specifications?.average_height?.cm || 0,
			maximum_height: trefleObject.data.specifications?.maximum_height?.cm || 0,
			toxicity: Boolean(trefleObject.data.specifications?.toxicity),
			days_to_harvest: trefleObject.data.growth?.days_to_harvest || 0,
			ph_maximun: trefleObject.data.growth?.ph_maximum || 0,
			ph_minimum: trefleObject.data.growth?.ph_minimum || 0,
			light: trefleObject.data.growth?.light || 0,
			humidity: trefleObject.data.growth?.atmospheric_humidity || 0,
			minimum_temperature: trefleObject.data.growth?.minimum_temperature?.deg_c || 0,
			maximum_temperature: trefleObject.data.growth?.maximum_temperature?.deg_c || 0,
			soil_humidity: trefleObject.data.growth?.soil_humidity || 0,
			nutriments: trefleObject.data.growth?.soil_nutriments || 0,
		};
	}
	private static convertToPlantIdentifier(
		trefleObject: TrefleSpeciesSearchResponse
	): PlantIdentifier[] {
		return trefleObject.data.map((trefleObject) => ({
			id: trefleObject.id || 0,
			name: trefleObject.scientific_name || '',
		}));
	}
}

export default new TrefleController();
