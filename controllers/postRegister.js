const insertRegister = require("../models/insertRegister");

const postRegister = (req, res, next) => {
  const { email, password } = req.body;
  return insertRegister(email, password)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postRegister;
