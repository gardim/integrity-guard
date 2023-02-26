const app = require("./config")();
const port = app.get("port");
const serverless = require("serverless-http");


app.use(`/.netlify/functions/api`, require("./routes"));

module.exports = app;
module.exports.handler = serverless(app);
