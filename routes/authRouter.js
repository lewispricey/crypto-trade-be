const express = require("express");
const router = express.Router();
const getStatus = require("../controllers/getStatus");
const postLogin = require("../controllers/postLogin");
const postRegister = require("../controllers/postRegister");

router.get("/status", getStatus);
router.post("/register", postRegister);
router.post("/login", postLogin);

module.exports = router;
