const login = require("../models/login");

const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  login(email, password)
    .then((msg) => {
      //need to add JWT to header before sending
      res.status(200).send(msg);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postLogin;
