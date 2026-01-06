const express = require("express");
const router = express.Router();
const controller = require("./stockController");

router.post("/init", controller.initializeStock);
router.post("/sell", controller.sellBooks);
router.post("/refill", controller.refillStock);
router.get("/get", controller.getStock);

module.exports = router;
