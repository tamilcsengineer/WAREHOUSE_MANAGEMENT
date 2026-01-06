const LOW_STOCK_LIMIT = 10;

// Ensure stock exists
if (!localStorage.getItem("stock")) {
  localStorage.setItem("stock", JSON.stringify({
    BOOKS: 50,
    TOYS: 30,
    METALS: 20
  }));
}

// Logs for demo
if (!localStorage.getItem("salesLog")) {
  localStorage.setItem("salesLog", JSON.stringify([]));
}

function getStock() {
  return JSON.parse(localStorage.getItem("stock"));
}

function saveStock(data) {
  localStorage.setItem("stock", JSON.stringify(data));
}

function sell() {
  const product = document.getElementById("product").value;
  const qty = parseInt(document.getElementById("qty").value);
  const stock = getStock();
  const msg = document.getElementById("msg");

  if (!qty || qty <= 0) {
    msg.innerText = "❌ Invalid quantity";
    msg.style.color = "red";
    return;
  }

  if (qty > stock[product]) {
    msg.innerText = `❌ Only ${stock[product]} left in stock`;
    msg.style.color = "red";
    return;
  }

  // Reduce stock
  stock[product] -= qty;
  saveStock(stock);

  // Log sale
  const logs = JSON.parse(localStorage.getItem("salesLog"));
  logs.push({
    product,
    qty,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("salesLog", JSON.stringify(logs));

  msg.innerText = `✅ Sold ${qty} ${product}`;
  msg.style.color = "green";

  // LOW STOCK ALERT FLAG
  if (stock[product] <= LOW_STOCK_LIMIT) {
    localStorage.setItem("lowStockAlert", JSON.stringify({
      product,
      qty: stock[product],
      time: new Date().toLocaleString()
    }));
  }

  renderLogs();
}

function renderLogs() {
  const logs = JSON.parse(localStorage.getItem("salesLog"));
  const tbody = document.getElementById("logs");
  tbody.innerHTML = "";

  logs.slice(-5).reverse().forEach(log => {
    tbody.innerHTML += `
      <tr>
        <td>${log.product}</td>
        <td>${log.qty}</td>
        <td>${log.time}</td>
      </tr>
    `;
  });
}

renderLogs();
