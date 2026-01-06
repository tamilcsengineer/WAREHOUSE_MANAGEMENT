const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    inventory: {
      totalProducts: 100,
      soldProducts: 50,
      remainingStock: 50,
      lowStockItems: 2,
      stockAccuracy: "96%",
      lostItems: 1
    },
    orderFulfillment: {
      totalOrderTime: "3h 20m",
      perfectOrders: "93%",
      pickingMistakes: 2,
      onTimeShipping: "95%"
    },
    efficiency: {
      timeToShelf: "1h 45m",
      receivingSpeed: "45 items/hour",
      warehouseOutput: "520 items/day"
    },
    labor: {
      workerOutput: "38 orders/day",
      accidents: 0
    }
  });
});

module.exports = router;
