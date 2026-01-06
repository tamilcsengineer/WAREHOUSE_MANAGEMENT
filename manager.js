// Initial predefined products
const DEFAULT_STOCK = {
  BOOKS: 50,
  TOYS: 30,
  METALS: 20
};

const LOW_STOCK_LIMIT = 10;

if (!localStorage.getItem("stock")) {
  localStorage.setItem("stock", JSON.stringify(DEFAULT_STOCK));
}

function getStock() {
  return JSON.parse(localStorage.getItem("stock"));
}

function saveStock(data) {
  localStorage.setItem("stock", JSON.stringify(data));
  renderTable();
}

// 🔔 ALERT CHECK FUNCTION
function checkLowStock(product, qty) {
  if (qty <= LOW_STOCK_LIMIT) {
    alert(`⚠️ LOW STOCK ALERT!\n\n${product} has only ${qty} items left.\nPlease refill soon.`);
  }
}

// ➕ ADD PRODUCT
function addProduct() {
  const product = document.getElementById("addProduct").value;
  const qty = parseInt(document.getElementById("addQty").value);
  const stock = getStock();

  if (!qty || qty <= 0) return alert("Enter valid quantity");

  stock[product] += qty;
  saveStock(stock);

  document.getElementById("addMsg").innerText =
    `✅ ${qty} added to ${product}`;

  checkLowStock(product, stock[product]);
}

// ➖ SELL PRODUCT
function sellProduct() {
  const product = document.getElementById("sellProduct").value;
  const qty = parseInt(document.getElementById("sellQty").value);
  const stock = getStock();

  if (!qty || qty <= 0) {
    document.getElementById("sellMsg").innerText = "❌ Enter valid quantity";
    return;
  }

  if (qty > stock[product]) {
    document.getElementById("sellMsg").innerText =
      "❌ Not enough stock!";
    return;
  }

  stock[product] -= qty;
  saveStock(stock);

  document.getElementById("sellMsg").innerText =
    `✅ Sold ${qty} ${product}`;

  checkLowStock(product, stock[product]);
}

// 🔁 REFILL STOCK
function refillStock() {
  const product = document.getElementById("refillProduct").value;
  const qty = parseInt(document.getElementById("refillQty").value);
  const stock = getStock();

  if (!qty || qty <= 0) return alert("Enter valid refill quantity");

  stock[product] += qty;
  saveStock(stock);

  document.getElementById("refillMsg").innerText =
    `✅ ${product} refilled by ${qty}`;

  alert(`✅ STOCK RESTORED!\n\n${product} stock is now ${stock[product]}`);
}

// 📊 TABLE RENDER + RED HIGHLIGHT
function renderTable() {
  const stock = getStock();
  const tbody = document.getElementById("stockTable");
  tbody.innerHTML = "";

  for (let item in stock) {
    const isLow = stock[item] <= LOW_STOCK_LIMIT;

    tbody.innerHTML += `
      <tr style="background:${isLow ? '#ffe5e5' : 'white'}">
        <td>${item}</td>
        <td>${stock[item]}</td>
        <td style="color:${isLow ? 'red' : 'green'}; font-weight:bold;">
          ${isLow ? '⚠️ LOW STOCK' : '✅ OK'}
        </td>
      </tr>
    `;
  }
}

renderTable();
const alertData = JSON.parse(localStorage.getItem("lowStockAlert"));

if (alertData) {
  alert(`🚨 MANAGER ALERT!\n\n${alertData.product} stock is LOW.\nRemaining: ${alertData.qty}`);
  localStorage.removeItem("lowStockAlert");
}
