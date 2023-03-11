const login = require("../models/login");

const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  login(email, password)
    .then((token) => {
      res.status(200).send(token);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postLogin;
