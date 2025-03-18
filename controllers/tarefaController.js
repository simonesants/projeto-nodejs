//precisa importar
const Tarefa = require("../models/tarefa");

// precisa exportar
const criarTarefa = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { titulo, alunoId, disciplinasIds } = req.body;
    const concluida = false;

    const novaTarefa = new Tarefa({
      titulo,
      aluno: alunoId,
      concluida,
      disciplinas: disciplinasIds,
    });

    await novaTarefa.save();
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Tarefa criada com sucesso!",
      tarefa: novaTarefa,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const obterTodasTarefas = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const tarefas = await Tarefa.find({})
      .populate("aluno")
      .populate("disciplinas");
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send(tarefas);
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const deletarTarefa = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;

    await Tarefa.deleteOne({ _id: id });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({ message: "Tarefa removida com sucesso!" });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const editarTarefa = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;
    const { titulo, concluida } = req.body;

    let tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Tarefa atualizada com sucesso!",
      tarefa,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

module.exports = {
  criarTarefa,
  deletarTarefa,
  obterTodasTarefas,
  editarTarefa,
};
