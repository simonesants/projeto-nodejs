const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.js");
const disciplinaController = require("../controllers/disciplinaController.js");

router.get(
  "/disciplina",
  [authorization],
  disciplinaController.obterTodasDisciplinas
);
router.post("/disciplina", disciplinaController.criarDisciplina);
router.delete(
  "/disciplina/:id",
  [authorization],
  disciplinaController.deletarDisciplina
);
router.put(
  "/disciplina/:id",
  [authorization],
  disciplinaController.editarDisciplina
);

module.exports = router;
