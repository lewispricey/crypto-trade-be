const express = require("express");
const authRouter = require("./routes/authRouter");
const customError = require("./errors/customError");
const psqlError = require("./errors/psqlError");

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.use(psqlError);
app.use(customError);
module.exports = app;
