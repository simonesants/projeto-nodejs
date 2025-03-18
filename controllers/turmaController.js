// precisa importar
const Turma = require("../models/turma");

// precisa exportar
const criarTurma = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { nome, alunosIds, professorId } = req.body;

    const novaTurma = new Turma({
      nome,
      alunos: alunosIds,
      professor: professorId,
    });

    await novaTurma.save();
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Turma criada com sucesso!",
      turma: novaTurma,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const obterTodasTurmas = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const turmas = await Turma.find({}).populate("alunos professor");
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send(turmas);
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const deletarTurma = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;

    await Turma.deleteOne({ _id: id });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({ message: "Turma removida com sucesso!" });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const editarTurma = async (req, res) => {
  // precisa colocar try/catch para capturar os erros

  try {
    const { id } = req.params;
    const { nome, alunosIds, professorId } = req.body;

    let turma = await Turma.findByIdAndUpdate(id, {
      nome,
      alunos: alunosIds,
      professor: professorId,
    });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Turma atualizada com sucesso!",
      turma,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

module.exports = { criarTurma, editarTurma, obterTodasTurmas, deletarTurma };
