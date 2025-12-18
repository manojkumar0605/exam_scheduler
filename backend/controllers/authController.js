const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { name, designation, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, designation, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user: { name: user.name, email: user.email, designation: user.designation } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { name, email, password, designation } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if(user.designation !== designation){
            return res.status(400).json({ message: "Invalid role selected" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email, designation: user.designation } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
