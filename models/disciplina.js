let mongoose = require("mongoose");
// Nao esta sendo utilizado, logo pode ser removido
const Tarefa = require("./tarefa.js");

let disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  dataInicio: { type: Date, default: Date.now },
  dataFim: { type: Date },
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }],
});

module.exports = mongoose.model("Disciplina", disciplinaSchema);