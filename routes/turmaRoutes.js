const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.js");
const turmaController = require("../controllers/turmaController.js");

router.get("/turma", [authorization], turmaController.obterTodasTurmas);
router.post("/turma", [authorization], turmaController.criarTurma);
router.delete("/turma/:id", [authorization], turmaController.deletarTurma);
router.put("/turma/:id", [authorization], turmaController.editarTurma);

module.exports = router;
