const axios = require("axios").default;
const app = require("../config")()

const trefleApiUrl = app.get("trefleApiUrl");
const trefleApiKey = app.get("trefleApiKey");

class TrefleController {

	async post(req, res) {
		const query = req.body;
		const encodedQuery = query.join(' ');

		console.log(encodedQuery)

		axios
		.get(`${trefleApiUrl}/plants`, {
			params: {
			token: trefleApiKey,
			'filter[common_name]': encodedQuery,
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