const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.js");
const perfilController = require("../controllers/perfilController.js");

router.get("/perfil", [authorization], perfilController.obterTodosPerfis);
router.post("/perfil", [authorization], perfilController.criarPerfil);
router.delete("/perfil/:id", [authorization], perfilController.deletarPerfil);
router.put("/perfil/:id", [authorization], perfilController.editarPerfil);

module.exports = router;
