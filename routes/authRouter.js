const express = require("express");
const router = express.Router();
const postLogin = require("../controllers/postLogin");
const postRegister = require("../controllers/postRegister");

router.post("/register", postRegister);
router.post("/login", postLogin);

module.exports = router;
