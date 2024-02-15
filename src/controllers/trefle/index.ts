import axios from 'axios';
import express from 'express';
import { Application } from 'express';
import createApp from '../../config';
import { convertToPlantIdentifier } from '../mappers';

const app: Application = createApp();

const trefleApiUrl: string = app.get('trefleApiUrl') as string;
const trefleApiKey: string = app.get('trefleApiKey') as string;

class TrefleController {
	async post(req: express.Request, res: express.Response): Promise<void> {
		/**	
		#swagger.summary = Obtain plants that match your keywords
		#swagger.parameters['q'] = {
			 description: 'Keywords',
			 required: true,
			}
		#swagger.responses[200] = {
			required: true,
			schema: { $ref: "#/components/schemas/PlantSearchTextResponse" }
		}
		*/
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
			res.send(convertToPlantIdentifier(response.data));
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}
}

export default new TrefleController();
