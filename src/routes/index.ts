import express, { Response } from 'express';
const routes = express.Router();

import TrefleController from '../controllers/trefle';
import PlantIdController from '../controllers/plant_id';
import WeatherstackController from '../controllers/weatherstack';
import Controller from '../controllers';

/**
 * @swagger
 * tags:
 *   - name: Plant
 *   - name: Others
 */

routes.get('/', (req, res): Response => {
	return res.send('It works! 🚀');
});

/**
 * @swagger
 * /plant/{name}:
 *   get:
 *     summary: Get specific species information
 *     description: Returns information about a specific species.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Species information.
 *       404:
 *         description: Plant not found.
 *       500:
 *         description: Internal Server Error.
 *     tags:
 *       - Plant
 */
routes.get('/plant/:name', Controller.get);

/**
 * @swagger
 * /search/text:
 *   post:
 *     summary: Get a list of species by text
 *     description: Returns a list of species based on query keywords.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of species.
 *       500:
 *         description: Internal Server Error.
 *     tags:
 *       - Plant
 */
routes.post('/search/text', TrefleController.post);

/**
 * @swagger
 * /query/image:
 *   post:
 *     summary: Get a list of species by image
 *     description: Returns a list of species based on query images.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of species.
 *       500:
 *         description: Internal Server Error.
 *     tags:
 *       - Plant
 */
routes.post('/query/image', PlantIdController.post);

/**
 * @swagger
 * /translate:
 *   post:
 *     summary: Get a translation
 *     description: Returns a list of species based on query images.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of species.
 *       500:
 *         description: Internal Server Error.
 *     tags:
 *       - Others
 */
routes.post('/translate', TrefleController.post);

/**
 * @swagger
 * /weather:
 *   post:
 *     summary: Send data to Weatherstack
 *     description: Sends data to Weatherstack.
 *     responses:
 *       200:
 *         description: Data sent successfully.
 *       500:
 *         description: Internal Server Error.
 *     tags:
 *       - Others
 */
routes.post('/weather', WeatherstackController.post);

export default routes;
