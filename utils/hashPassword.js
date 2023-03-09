const argon2 = require("argon2");

const hashOptions = {
  hashLength: 32,
  timeCost: 12,
};

const hashPassword = (password) => {
  return argon2.hash(password, hashOptions).catch((err) => {
    return err;
  });
};

module.exports = hashPassword;
