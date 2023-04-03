const axios = require("axios").default;
const app = require("../config")()

const trefleApiUrl = app.get("trefleApiUrl");
const trefleApiKey = app.get("trefleApiKey");

class TrefleController {

	async get(req, res) {
		const id = req.query.id;

		axios
		.get(`${trefleApiUrl}/species/${id}`, {
			params: {
			token: trefleApiKey,
			},
			headers: {
			'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			console.log(response.data);
			res.send(response.data);
		})
		.catch((error) => {
			console.error(error);
		});
	}

	async post(req, res) {
		const query = req.body;
		const encodedQuery = query.join(' ');

		console.log(encodedQuery)

		axios
		.get(`${trefleApiUrl}/plants/search`, {
			params: {
			token: trefleApiKey,
			'q': encodedQuery,
			},
			headers: {
			'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			console.log(response.data);
			res.send(response.data);
		})
		.catch((error) => {
			console.error(error);
		});
	}

}

module.exports = new TrefleController();