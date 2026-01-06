const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.post("/add", controller.addProduct);
router.get("/getall", controller.getAllProducts);
router.post("/sell", controller.sellProduct);
router.post("/refill", controller.refillProduct);
router.post("/update", controller.updateTotalStock);
router.get("/history/:id", controller.getProductHistory);

module.exports = router;
