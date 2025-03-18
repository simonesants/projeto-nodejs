// precisa importar model de professor
const Professor = require("../models/professor");

//precisa exportar
const criarProfessor = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { nome, idade, disciplinas, email, senha } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      email,
      senha,
      disciplinas,
    });
    console.log("chegou aqui 3");
    await novoProfessor.save();
    console.log("chegou aqui 4");

    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

//precisa importar
const obterTodosProfessores = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const professores = await Professor.find().populate("disciplinas");
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send(professores);
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

//precisa importar
const deletarProfessor = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;

    await Professor.deleteOne({ _id: id });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({ message: "Professor removido com sucesso!" });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

//precisa importar
const editarProfessor = async (req, res) => {
  // precisa colocar try/catch para capturar os erros
  try {
    const { id } = req.params;
    const { nome, idade, disciplinasIds } = req.body;

    let professor = await Professor.findByIdAndUpdate(id, {
      nome,
      idade,
      disciplinas: disciplinasIds,
    });
    //precisa usar o comando return, para retornar o objeto e o respectivo status code
    return res.status(200).send({
      message: "Professor atualizado com sucesso!",
      professor,
    });
  } catch (error) {
    return res.status(500).send({
      erro: "InternalServerError",
      mensagem: "ocorreu um erro interno",
    });
  }
};

module.exports = {
  criarProfessor,
  obterTodosProfessores,
  deletarProfessor,
  editarProfessor,
};
