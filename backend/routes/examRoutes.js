const express = require("express");
const router = express.Router();
const { createExam, getExams, deleteExam } = require("../controllers/examController");

router.post("/", createExam);
router.get("/", getExams);
router.delete("/:id", deleteExam);

module.exports = router;
