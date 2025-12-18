const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
    try {
        const exam = await Exam.create(req.body);
        res.status(201).json({ message: "Exam created successfully", exam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find().sort({ date: 1 });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteExam = async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Exam deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};