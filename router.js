const express = require("express");
const router = express.Router();
const getStatus = require("./controllers/getStatus");
const postRegister = require("./controllers/postRegister");
const customError = require("./errors/customError");
const psqlError = require("./errors/psqlError");

router.use(express.json());
router.get("/status", getStatus);
router.post("/register", postRegister);

router.use(psqlError);
router.use(customError);

module.exports = router;
