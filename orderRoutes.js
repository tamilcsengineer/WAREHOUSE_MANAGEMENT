const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// 📦 Create Order (used by Staff)
router.post("/create", async (req, res) => {
  const { productId, qty, pickedCorrectly, shippedOnTime } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.json({ error: "Product not found" });

  product.remainingStock -= qty;

  product.salesHistory.push({
    qty,
    pickedCorrectly,
    shippedOnTime,
    date: new Date()
  });

  await product.save();
  res.json({ message: "Order processed" });
});

module.exports = router;
