const psqlError = (err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(400).send({ msg: "account creation failed" });
  }

  next(err);
};

module.exports = psqlError;
