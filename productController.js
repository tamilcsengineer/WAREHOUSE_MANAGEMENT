const Product = require("../models/product");

// Auto-assign icon based on product name
function getIcon(name) {
    name = name.toLowerCase();

    if (name.includes("book")) return "📘";
    if (name.includes("pen")) return "✒️";
    if (name.includes("note")) return "📓";

    return "🛒"; // default icon
}

// Add new product
exports.addProduct = async (req, res) => {
    const { name, totalStock } = req.body;

    if (!name || !totalStock) {
        return res.json({ error: "Please enter all fields" });
    }

    const icon = getIcon(name);

    const newProduct = new Product({
        name,
        icon,
        totalStock,
        remainingStock: totalStock,
        soldHistory: []
    });

    await newProduct.save();
    res.json({ message: "Product added successfully!", product: newProduct });
};

// Get all products (Dashboard + Dropdowns)
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Sell product
exports.sellProduct = async (req, res) => {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.json({ error: "Product not found" });

    if (qty > product.remainingStock)
        return res.json({ error: "Not enough stock" });

    product.remainingStock -= qty;
    const time = new Date().toLocaleTimeString();
    product.soldHistory.push({ qty, time });

    await product.save();
    res.json({ message: "Sale recorded!", product });
};

// Refill stock
exports.refillProduct = async (req, res) => {
    const { productId, amount } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.json({ error: "Product not found" });

    product.remainingStock += amount;

    await product.save();
    res.json({ message: "Stock refilled!", product });
};

// Update total stock
exports.updateTotalStock = async (req, res) => {
    const { productId, newTotal } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.json({ error: "Product not found" });

    const difference = newTotal - product.totalStock;
    product.totalStock = newTotal;
    product.remainingStock += difference;

    if (product.remainingStock < 0) product.remainingStock = 0;

    await product.save();
    res.json({ message: "Total stock updated!", product });
};

// Product sale history
exports.getProductHistory = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.json({ error: "Product not found" });

    res.json(product.soldHistory);
};
