const express = require("express");

const app = express();

app.get("/status", (req, res, next) => {
  res.status(200).send({ msg: "online" });
});

module.exports = app;
