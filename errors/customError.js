const customError = (err, req, res, next) => {
  res.status(err.code).send({ msg: err.msg });
};

module.exports = customError;
