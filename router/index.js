const express = require('express');
const router = express.Router();

const { fetchData } = require("../controller/fetchController");

router.get("/", fetchData);

module.exports = router;