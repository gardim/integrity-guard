const app = require("./config")();
const port = app.get("port");

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});