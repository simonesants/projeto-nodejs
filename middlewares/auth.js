const jwt = require("jsonwebtoken");
const Professor = require("../models/professor");

const private_key = "myprivatekey";

const decodedToken = (token) => {
  let value = { success: false, body: {} };

  jwt.verify(token, "" + private_key, (err, decoded) => {
    if (err) {
      value = { success: false, body: err };
    } else {
      value = { success: true, body: { decoded } };
    }
  });

  return value;
};

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "authorization failed", message: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) {
    return res
      .status(401)
      .send({ error: "authorization failed", message: "Token error parts" });
  }

  let [scheme, token] = parts;

  if (!/^bearer$/i.test(scheme)) {
    return res
      .status(401)
      .send({ error: "authorization failed", message: "Token malformatted" });
  }
  const result = decodedToken(token);
  if (!result.success) {
    if (result.body.name === "TokenExpiredError") {
      // Refresh Token (?)
      return res
        .status(403)
        .send({ error: "authorization failed", message: "Refresh token" });
    } else {
      // Invalid Token
      return res
        .status(403)
        .send({ error: "authorization failed", message: result.body });
    }
  } else {
    return next();
  }
};

const authProfessor = async (req, res) => {
  const { email, senha } = req.body;
  const professor = Professor.findOne({ email, senha });
  if (professor) {
    const token = jwt.sign({ id: email, senha }, private_key, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .send({ success: true, authorization: "Bearer " + token });
  } else {
    return res.status(404).send({ error: "não encontrado" });
  }
};
module.exports = { authorization, authProfessor };
