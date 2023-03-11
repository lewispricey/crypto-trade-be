const register = require("../models/register");

const postRegister = (req, res, next) => {
  const { email, password } = req.body;
  return register(email, password)
    .then((user_id) => {
      res.status(201).send({ user: { user_id } });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postRegister;
