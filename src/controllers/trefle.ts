import axios from 'axios';
import express from 'express';
import { Application } from 'express';
import createApp from '../config';

const app: Application = createApp();

const trefleApiUrl: string = app.get('trefleApiUrl') as string;
const trefleApiKey: string = app.get('trefleApiKey') as string;

class TrefleController {
	async get(req: express.Request, res: express.Response): Promise<void> {
		const id: string = req.query.id as string;

		try {
			const response = await axios.get(`${trefleApiUrl}/species/${id}`, {
				params: {
					token: trefleApiKey,
				},
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log(response.data);
			res.send(response.data);
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}

	async post(req: express.Request, res: express.Response): Promise<void> {
		const query: string[] = req.body;
		const encodedQuery: string = query.join(' ');

		console.log(encodedQuery);

		try {
			const response = await axios.get(`${trefleApiUrl}/plants/search`, {
				params: {
					token: trefleApiKey,
					q: encodedQuery,
				},
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log(response.data);
			res.send(response.data);
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}
}

export default new TrefleController();
