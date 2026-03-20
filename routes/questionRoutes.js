const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// NEW
router.get("/new/:moduleId", questionController.renderNewForm);

// CREATE
router.post("/:moduleId", questionController.createQuestion);

// EDIT
router.get("/:id/edit", questionController.renderEditForm);

// UPDATE
router.put("/:id", questionController.updateQuestion);

// DELETE
router.delete("/:id/:moduleId", questionController.deleteQuestion);

module.exports = router;