const ENV = process.env.NODE_ENV || "dev";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

const db = require("../db/connection");
const verifyPassword = require("../utils/verifyPassword");

const jwt = require("jsonwebtoken");

const login = (email, password) => {
  if (!email || !password) {
    return Promise.reject({ code: 400, msg: "invalid email or password" });
  }

  return db
    .query("SELECT user_id, password FROM users WHERE email = $1", [email])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({
          code: 400,
          msg: "invalid email or password",
        });
      return Promise.all([
        verifyPassword(password, rows[0].password),
        rows[0].user_id,
      ]);
    })
    .then(([hashResult, user_id]) => {
      if (!hashResult) {
        return Promise.reject({ code: 400, msg: "invalid email or password" });
      } else {
        const user = { user_id: user_id };
        const encryptionKey = Buffer.from(
          process.env.PRIVATE_KEY,
          "base64"
        ).toString("ascii");

        const accessToken = jwt.sign(user, encryptionKey, {
          algorithm: "RS256",
          expiresIn: "24h",
        });

        return { accessToken };
      }
    });
};

module.exports = login;
