const express = require("express");
const router = express.Router();
express.router = router;

const questionControllers = require("../controllers/question");

router.get("/", questionControllers.index);
router.post("/attempt", questionControllers.submit);

module.exports = router;
