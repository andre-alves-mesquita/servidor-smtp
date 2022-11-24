const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.urlencoded());

app.use(require("cors")());
app.use(bodyParser.json());

app.post("/send", (req, res, next) => {
  const nome = req.body.name;
  const email = req.body.replyTo;
  const mensagem = req.body.text;
  const titulo = req.body.subject;
  const deployment = req.body.deployment;

  require("./nodemail")(email, nome, mensagem, titulo, deployment)
    .then((response) =>
      res.redirect("http://localhost:4000/contact?success=true")
    )
    .catch((error) => res.json(error));
});

const server = http.createServer(app);
server.listen(process.env.PORT);
console.log(`Servidor escutando na porta ${process.env.PORT}..`);
