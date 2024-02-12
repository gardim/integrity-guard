import express, { Response } from 'express';
const routes = express.Router();

import TrefleController from '../controllers/trefle';
import WeatherstackController from '../controllers/weatherstack';

routes.get('/', (req, res): Response => {
	return res.send('It works! 🚀');
});

routes.get('/trefle', TrefleController.get);
routes.post('/trefle', TrefleController.post);
routes.post('/weather', WeatherstackController.post);

export default routes;
