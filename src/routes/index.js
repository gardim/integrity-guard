const express = require("express");
const routes = express.Router();

const TrefleController = require("../controllers/trefle");
const WeatherstackController = require("../controllers/weatherstack");

routes.get("/", (req, res) => {
	return res.send("It works! 🚀");
});
routes.get("/trefle", TrefleController.get);
routes.post("/trefle", TrefleController.post);
routes.post("/weather", WeatherstackController.post);

module.exports = routes;
