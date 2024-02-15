import express from 'express';
const routes = express.Router();

import TrefleController from '../controllers/trefle';
import PlantIdController from '../controllers/plant_id';
import WeatherstackController from '../controllers/weatherstack';
import TranslationController from '../controllers/translation';
import Controller from '../controllers';

routes.get('/plant/:name', Controller.get);
routes.post('/query/text', TrefleController.post);
routes.post('/query/image', PlantIdController.post);
routes.post('/translate', TranslationController.post);
routes.post('/weather', WeatherstackController.post);

export default routes;
