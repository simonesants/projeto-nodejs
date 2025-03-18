const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.js");
const tarefaController = require("../controllers/tarefaController.js");

router.get("/tarefa", [authorization], tarefaController.obterTodasTarefas);
router.post("/tarefa", [authorization], tarefaController.criarTarefa);
router.delete("/tarefa/:id", [authorization], tarefaController.deletarTarefa);
router.put("/tarefa/:id", [authorization], tarefaController.editarTarefa);

module.exports = router;
