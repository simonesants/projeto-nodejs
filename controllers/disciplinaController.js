// Precisa importar o model de Disciplina
const Disciplina = require("../models/disciplina");

const criarDisciplina = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    const novaDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    });

    console.log("chegou aqui");
    await novaDisciplina.save();
    console.log("chegou aqui 2");

    // Atualiza as tarefas associadas à disciplina

    // verificar se nao tem nenhum erro nessa funcao
    if (tarefasIds) {
      await Tarefa.updateMany(
        { _id: { $in: tarefasIds } },
        { $push: { disciplinas: novaDisciplina._id } }
      );
    }

    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Disciplina criada com sucesso!",
      disciplina: novaDisciplina,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisar exportar
const obterTodasDisciplinas = async (req, res) => {
  // para buscar todas as disciplinas, usamos a funcao find passando um objeto vazio {}
  // precisa colocar try/catch para capturar os erros
  try {
    const disciplinas = await Disciplina.find({}).populate("tarefas");
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send(disciplinas);
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisa expotar
const deletarDisciplina = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;

    await Disciplina.deleteOne({ _id: id });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res
      .status(200)
      .send({ message: "Disciplina removida com sucesso!" });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// precisar r
const editarDisciplina = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    let disciplina = await Disciplina.findByIdAndUpdate(id, {
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Disciplina atualizada com sucesso!",
      disciplina,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

// Precisa exportar a funcao para fazer ela ser acessivel por outros arquivos, por exemplo o arquivo disciplinaRoutes.js
module.exports = {
  criarDisciplina,
  deletarDisciplina,
  editarDisciplina,
  obterTodasDisciplinas,
};
