const customError = (err, req, res, next) => {
  console.log(err);
  res.status(err.code).send({ msg: err.msg });
};

module.exports = customError;
