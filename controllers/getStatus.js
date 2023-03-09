const getStatus = (req, res, next) => {
  res.status(200).send({ msg: "online" });
};

module.exports = getStatus;
