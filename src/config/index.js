const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
	const app = express();

	app.set("port", process.env.PORT);

	app.use(express.json());

	app.set("trefleApiUrl", process.env.TREFLE_API_URL);
	app.set("trefleApiKey", process.env.TREFLE_API_KEY);

	console.log(process.env.TREFLE_API_URL)

	return app;
};
