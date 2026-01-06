const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "MY_SECRET_KEY_123";

// Register (only once to add demo accounts)
exports.register = async (req, res) => {
    const { email, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        password: hash,
        role
    });

    await user.save();
    res.json({ message: "User registered successfully!" });
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        SECRET_KEY,
        { expiresIn: "7d" }
    );

    res.json({
        message: "Login success",
        token,
        role: user.role
    });
};
