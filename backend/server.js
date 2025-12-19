require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors(

));

app.get("/", (req, res) => {
  res.json({ message: "Exam Scheduler API is running", status: "success" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}); 