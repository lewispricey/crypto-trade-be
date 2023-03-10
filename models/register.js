const db = require("../db/connection");
const validateInputs = require("../utils/validateInputs");
const hashPassword = require("../utils/hashPassword");

const register = (email, password) => {
  return validateInputs(email, password)
    .then(() => {
      return hashPassword(password);
    })
    .then((hashedPassword) => {
      return db.query(
        `INSERT INTO users(email, password) 
        VALUES($1, $2)
        RETURNING *;`,
        [email, hashedPassword]
      );
    })
    .then(({ rows }) => {
      return rows[0].user_id;
    });
};

module.exports = register;
