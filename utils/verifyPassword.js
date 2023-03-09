const argon2 = require("argon2");

const verifyPassword = (password, hash) => {
  return argon2.verify(hash, password);
};

module.exports = verifyPassword;
