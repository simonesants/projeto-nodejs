// Precisar importar o model de Aluno
const Aluno = require("../models/aluno");

const criarAluno = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    console.log(req.body);
    const { nome, idade } = req.body;

    const novoAluno = new Aluno({
      nome,
      idade,
    });

    await novoAluno.save();
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Aluno criado com sucesso!",
      aluno: novoAluno,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

const obterTodosAlunos = async (req, res) => {
  // Pesquisar no google oq essa funcao populate faz
  // precisa colocar try/catch para capturar os erros
  try {
    const alunos = await Aluno.find().populate("perfil");
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send(alunos);
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

const deletarAluno = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;

    await Aluno.deleteOne({ _id: id });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({ message: "Aluno removido com sucesso!" });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

const editarAluno = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;
    const { nome, idade } = req.body;

    let aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Aluno atualizado com sucesso!",
      aluno,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// Precisa exportar a funcao para fazer ela ser acessivel por outros arquivos, por exemplo o arquivo alunoRoutes.js
module.exports = { criarAluno, obterTodosAlunos, deletarAluno, editarAluno };
