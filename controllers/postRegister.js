const register = require("../models/register");

const postRegister = (req, res, next) => {
  const { email, password } = req.body;
  return register(email, password)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postRegister;
