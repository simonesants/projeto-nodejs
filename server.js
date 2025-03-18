// Todo projeto express precisa de um ponto de entrada para rodar a aplicacao
// Esse ponto de entrada é o arquivo server.js
// Esse arquivo inicializa um servidor http que pode escutar e responder requisicoes http
// Nas linhas abaixo, eu crio e configuro o servidor http utilizando o framework express
// Crio o servidor, e configuro ele para usar json como modelo de troca de dados, e configurado para escutar a porta 3000

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const alunoRoute = require("./routes/alunoRoutes");
const disciplinaRoute = require("./routes/disciplinaRoutes");
const perfilRoute = require("./routes/perfilRoutes");
const professorRoute = require("./routes/professorRoutes");
const tarefaRoute = require("./routes/tarefaRoutes");
const turmaRoute = require("./routes/turmaRoutes");
const db = require("./database/db");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(alunoRoute);
app.use(disciplinaRoute);
app.use(perfilRoute);
app.use(professorRoute);
app.use(tarefaRoute);
app.use(turmaRoute);

db._connect();

const porta = 3000;
app.listen(porta, () => {
  console.log(`Servidor foi iniciado na porta ${porta}`);
});
