const express = require("express");
const routes = express.Router();

const TrefleController = require("../controllers/index");

routes.get("/", (req, res) => {
	return res.send("It works! 🚀");
});
routes.post("/trefle", TrefleController.post);

module.exports = routes;
