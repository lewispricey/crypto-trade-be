const express = require("express");
const authRouter = require("./routes/authRouter");
const endpointsRouter = require("./routes/endpointsRouter");
const customError = require("./errors/customError");
const psqlError = require("./errors/psqlError");

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/", endpointsRouter);
app.use(psqlError);
app.use(customError);
module.exports = app;
