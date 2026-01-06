const Stock = require("./stock");

// Initialize stock
exports.initializeStock = async (req, res) => {
    const { total } = req.body;

    let stock = await Stock.findOne();
    if (!stock) {
        stock = new Stock({
            totalStock: total,
            remainingStock: total,
            soldHistory: []
        });
        await stock.save();
    }

    res.json(stock);
};

// Sell stock
exports.sellBooks = async (req, res) => {
    const { qty } = req.body;

    let stock = await Stock.findOne();

    if (!stock) return res.json({ error: "Stock not initialized" });
    if (qty > stock.remainingStock)
        return res.json({ error: "Not enough stock" });

    stock.remainingStock -= qty;

    const time = new Date().toLocaleTimeString();
    stock.soldHistory.push({ qty, time });

    await stock.save();
    res.json(stock);
};

// Refill stock
exports.refillStock = async (req, res) => {
    const { amount } = req.body;

    let stock = await Stock.findOne();
    if (!stock) return res.json({ error: "Stock not initialized" });

    stock.remainingStock += amount;

    await stock.save();

    res.json({ message: "Stock refilled successfully!", stock });
};

// Get stock details
exports.getStock = async (req, res) => {
    const stock = await Stock.findOne();
    res.json(stock);
};
