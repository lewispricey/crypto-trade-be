const checkEmail = require("./checkEmail");
const checkPassword = require("./checkPassword");

const validateInputs = (email, password) => {
  return new Promise((resolve, reject) => {
    if (!checkEmail(email)) {
      reject({ code: 400, msg: "invalid email" });
    }
    if (!checkPassword(password)) {
      reject({
        code: 400,
        msg: "password does not meet requirements",
      });
    }
    resolve();
  });
};

module.exports = validateInputs;
