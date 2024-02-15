import axios from 'axios';
import express from 'express';
import { Application } from 'express';
import { ImageType, PlantIDResponse, PlantIdentifier } from './type';
import createApp from '../../config';

const app: Application = createApp();

const plantIdApiUrl: string = app.get('plantIdApiUrl') as string;
const plantIdApiKey: string = app.get('plantIdApiKey') as string;

interface RequestBody {
	images: string[];
	latitude?: string;
	longitude?: string;
	similar_images: boolean;
}

class PlantIdController {
	async post(req: express.Request, res: express.Response): Promise<void> {
		/**	
		#swagger.summary = Obtain plants that match images
		#swagger.requestBody = {
        	required: true,
        	schema: { $ref: "#/components/schemas/PlantSearchImageRequest" }
    	}
		#swagger.responses[200] = {
			required: true,
			schema: { $ref: "#/components/schemas/PlantSearchImageResponse" }
		}
		*/
		const { images, latitude, longitude, similar_images } = req.body;

		const base64Images: string[] = await Promise.all(
			images.map(async (image: ImageType) => {
				try {
					const response = await axios.get(image.uri, { responseType: 'arraybuffer' });
					const base64String = Buffer.from(response.data, 'binary').toString('base64');
					return `data:${response.headers['content-type']};base64,${base64String}`;
				} catch (error) {
					console.error('Failed to convert image to base64:', error);
					throw new Error('Failed to convert image to base64');
				}
			})
		);

		console.log('Images: ' + base64Images);

		const requestBody: RequestBody = {
			images: base64Images,
			latitude: latitude,
			longitude: longitude,
			similar_images: similar_images,
		};

		try {
			const response = await axios.post(`${plantIdApiUrl}/identification`, requestBody, {
				headers: {
					'Content-Type': 'application/json',
					'Api-Key': plantIdApiKey,
				},
			});
			res.send(PlantIdController.convertToPlantIdentifier(response.data));
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}
	private static convertToPlantIdentifier(plantIdObject: PlantIDResponse): { data: PlantIdentifier[] } {
		return {
		  data: plantIdObject?.result?.classification?.suggestions?.map((suggestion) => ({
			name: suggestion.name,
			probability: suggestion.probability,
		  })) || [],
		};
	}
}

export default new PlantIdController();
