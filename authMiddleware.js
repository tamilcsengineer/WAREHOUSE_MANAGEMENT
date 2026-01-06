const jwt = require("jsonwebtoken");
const SECRET_KEY = "MY_SECRET_KEY_123";

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.json({ error: "No token provided" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.json({ error: "Invalid token" });

        req.user = decoded;
        next();
    });
};

exports.allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.json({ error: "Access denied" });
        }
        next();
    };
};
