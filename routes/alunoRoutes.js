const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.js");
const alunoController = require("../controllers/alunoController.js");

router.get("/aluno", [authorization], alunoController.obterTodosAlunos);
router.post("/aluno", [authorization], alunoController.criarAluno);
router.delete("/aluno/:id", [authorization], alunoController.deletarAluno);
router.put("/aluno/:id", [authorization], alunoController.editarAluno);

module.exports = router;
