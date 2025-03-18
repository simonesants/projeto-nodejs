const express = require("express");
const router = express.Router();
const { authorization, authProfessor } = require("../middlewares/auth.js");
const professorController = require("../controllers/professorController.js");

router.post("/professor/login", authProfessor);
router.get(
  "/professor",
  [authorization],
  professorController.obterTodosProfessores
);
router.post("/professor", professorController.criarProfessor);
router.delete(
  "/professor/:id",
  [authorization],
  professorController.deletarProfessor
);
router.put(
  "/professor/:id",
  [authorization],
  professorController.editarProfessor
);

module.exports = router;
