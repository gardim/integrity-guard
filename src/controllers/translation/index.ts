import axios from 'axios';
import { Request, Response } from 'express';
import createApp from '../../config';
import { TranslationResponse } from './type';

const app = createApp();
const translationApiUrl: string = app.get('translationApiUrl') as string;
const translationApiKey: string = app.get('translationApiKey') as string;

class TranslationController {
	async post(req: Request, res: Response): Promise<void> {
		/**	
		#swagger.summary = Obtain a translated text
		#swagger.requestBody = {
        	required: true,
        	schema: { $ref: "#/components/schemas/TranslateRequest" }
    	}
		#swagger.responses[200] = {
			required: true,
			schema: { $ref: "#/components/schemas/TranslateResponse" }
		}
		*/
		const { q, source, target } = req.body;

		try {
			const response = await axios.post<TranslationResponse>(
				`${translationApiUrl}/language/translate/v2?key=${translationApiKey}`,
				{
					q: q,
					source,
					target,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			res.send(TranslationController.transformResponse(response.data));
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}

	static transformResponse(response: TranslationResponse): { data: { translatedText: string }[] } {
		return {
			data: response.data.translations.map((translation) => ({
				translatedText: translation.translatedText,
			})),
		};
	}
}

export default new TranslationController();
