const express = require("express");
const router = express.Router();
const getStatus = require("../controllers/getStatus");

router.get("/status", getStatus);

module.exports = router;
