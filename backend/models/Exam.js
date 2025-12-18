const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    subject: { type: String, required: true },
    venue: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Exam", examSchema);
