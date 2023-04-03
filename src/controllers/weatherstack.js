const axios = require("axios").default;
const app = require("../config")()

const weatherstackApiUrl = app.get("weatherstackApiUrl");
const weatherstackApiKey = app.get("weatherstackApiKey");

class WeatherstackController {

	async post(req, res) {
		const query = req.body;

		axios
		.get(`${weatherstackApiUrl}?access_key=${weatherstackApiKey}&query=${query}`, {
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

module.exports = new WeatherstackController();