const express = require("express");
const getStatus = require("./controllers/getStatus");
const router = express.Router();

router.get("/status", getStatus);

module.exports = router;
