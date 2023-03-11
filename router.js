const express = require("express");
const router = express.Router();
const getStatus = require("./controllers/getStatus");
const postLogin = require("./controllers/postLogin");
const postRegister = require("./controllers/postRegister");
const customError = require("./errors/customError");
const psqlError = require("./errors/psqlError");

router.use(express.json());
router.get("/status", getStatus);
router.post("/register", postRegister);
router.post("/login", postLogin);

router.use(psqlError);
router.use(customError);

module.exports = router;
