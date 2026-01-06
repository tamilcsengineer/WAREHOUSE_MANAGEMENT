const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/product", require("./routes/productRoutes"));

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
const orderRoutes = require("./routes/orderRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

app.use("/order", orderRoutes);
app.use("/metrics", metricsRoutes);
