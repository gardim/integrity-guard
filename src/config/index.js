const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

module.exports = () => {
	const app = express();

	app.set("port", process.env.PORT);

	app.use(express.json());

	app.use(cors());

	app.set("trefleApiUrl", process.env.TREFLE_API_URL);
	app.set("trefleApiKey", process.env.TREFLE_API_KEY);
	app.set("weatherstackApiUrl", process.env.WEATHERSTACK_API_URL);
	app.set("weatherstackApiKey", process.env.WEATHERSTACK_API_KEY);	  

	return app;
};
