// precisa importar perfil da pasta models
const Perfil = require("../models/perfil");
const Aluno = require("../models/aluno");

const criarPerfil = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { matricula, telefone, endereco, alunoId } = req.body;

    const novoPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });

    await novoPerfil.save();

    await Aluno.updateOne(
      { _id: alunoId },
      { $set: { perfil: novoPerfil._id } }
    );
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Perfil criado com sucesso!",
      perfil: novoPerfil,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const obterTodosPerfis = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const perfis = await Perfil.find().populate("aluno");
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send(perfis);
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const deletarPerfil = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;

    await Perfil.deleteOne({ _id: id });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({ message: "Perfil removido com sucesso!" });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
const editarPerfil = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;
    const { matricula, telefone, endereco, alunoId } = req.body;

    let perfil = await Perfil.findByIdAndUpdate(id, {
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Perfil atualizado com sucesso!",
      perfil,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa exportar
module.exports = { criarPerfil, deletarPerfil, editarPerfil, obterTodosPerfis };
