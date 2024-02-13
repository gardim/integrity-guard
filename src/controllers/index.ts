import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { Application } from 'express';
import createApp from '../config';
import { convertToPlant, convertToPlantIdentifier, mergePlantDetails } from './mappers';

const app: Application = createApp();

const trefleApiUrl: string = app.get('trefleApiUrl') as string;
const trefleApiKey: string = app.get('trefleApiKey') as string;
const plantIdApiUrl: string = app.get('plantIdApiUrl') as string;
const plantIdApiKey: string = app.get('plantIdApiKey') as string;

const details =
	'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods';

class Controller {
	constructor() {
		this.get = this.get.bind(this);
		this.getTrefleData = this.getTrefleData.bind(this);
		this.getTrefleDetails = this.getTrefleDetails.bind(this);
		this.getPlantIdData = this.getPlantIdData.bind(this);
		this.getPlantIdDetails = this.getPlantIdDetails.bind(this);
	}

	async get(req: Request, res: Response): Promise<void> {
		const name: string = req.params.name;

		try {
			const trefleResponse = await this.getTrefleData(name);
			const id = convertToPlantIdentifier(trefleResponse.data)[0]?.id;

			if (id) {
				const trefleDetailResponse = await this.getTrefleDetails(id);
				const plantIdResponse = await this.getPlantIdData(name);
				const access_token = plantIdResponse.data?.entities[0]?.access_token;
				const plantIdDetailsResponse = await this.getPlantIdDetails(access_token);

				const plant = convertToPlant(trefleDetailResponse.data);
				res.send(mergePlantDetails(plant, plantIdDetailsResponse.data));
			} else {
				res.status(404).send('Plant not found');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}

	private async getTrefleData(name: string): Promise<AxiosResponse> {
		return axios.get(`${trefleApiUrl}/species/search`, {
			params: {
				token: trefleApiKey,
				q: name,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	private async getTrefleDetails(id: number): Promise<AxiosResponse> {
		return axios.get(`${trefleApiUrl}/species/${id}`, {
			params: {
				token: trefleApiKey,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	private async getPlantIdData(name: string): Promise<AxiosResponse> {
		return axios.get(`${plantIdApiUrl}/kb/plants/name_search`, {
			params: {
				q: name.replace(/"/g, ''),
			},
			headers: {
				'Api-key': plantIdApiKey,
				'Content-Type': 'application/json',
			},
		});
	}

	private async getPlantIdDetails(access_token: string): Promise<AxiosResponse> {
		return axios.get(`${plantIdApiUrl}/kb/plants/${access_token}`, {
			params: {
				details: details.replace(/"/g, ''),
			},
			headers: {
				'Api-key': plantIdApiKey,
				'Content-Type': 'application/json',
			},
		});
	}
}

export default new Controller();
