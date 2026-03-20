const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

// INDEX
router.get("/", moduleController.index);

// NEW
router.get("/new", moduleController.renderNewForm);

// CREATE
router.post("/", moduleController.createModule);

router.post("/attempt", moduleController.submitAttempt);

// EDIT
router.get("/:id/edit", moduleController.renderEditForm);

// UPDATE
router.put("/:id", moduleController.updateModule);

// DELETE
router.delete("/:id", moduleController.deleteModule);

// SHOW (ALWAYS LAST)
router.get("/:id", moduleController.showModule);

module.exports = router;