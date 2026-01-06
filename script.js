// ================================================
// BASE API URL
// ================================================
const API_URL = "http://localhost:5000/product";


// ================================================
// LOAD ALL PRODUCTS (Used by dashboard, dropdowns)
// ================================================
async function getAllProducts() {
    const res = await fetch(API_URL + "/getall");
    const data = await res.json();
    return data;
}


// ================================================
// DASHBOARD: Load all products into cards
// ================================================
async function loadDashboard() {
    const grid = document.getElementById("productGrid");
    if (!grid) return; // Not dashboard page

    const products = await getAllProducts();
    grid.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${p.icon} ${p.name}</h2>
            <p>Total Stock: ${p.totalStock}</p>
            <p>Remaining: ${p.remainingStock}</p>
            <p>Sold: ${getTotalSold(p.soldHistory)}</p>
        `;
        grid.appendChild(div);
    });

    loadDashboardChart(products);
}


// ================================================
// CALCULATE Total Sold for a product
// ================================================
function getTotalSold(history) {
    return history.reduce((sum, sale) => sum + sale.qty, 0);
}


// ================================================
// DASHBOARD CHART.JS
// ================================================
function loadDashboardChart(products) {
    if (!document.getElementById("salesChart")) return;

    const labels = products.map(p => p.name);
    const values = products.map(p => getTotalSold(p.soldHistory));

    const ctx = document.getElementById("salesChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Total Items Sold",
                data: values,
                backgroundColor: "#0984e3"
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}


// ================================================
// MANAGE PAGE: Load dropdown
// ================================================
async function loadProductDropdown() {
    const select = document.getElementById("productSelect");
    if (!select) return;

    const products = await getAllProducts();
    select.innerHTML = "";

    products.forEach(p => {
        const option = document.createElement("option");
        option.value = p._id;
        option.innerHTML = `${p.icon} ${p.name}`;
        select.appendChild(option);
    });
}


// ================================================
// SELL PAGE: Load dropdown
// ================================================
async function loadSellDropdown() {
    const select = document.getElementById("sellSelect");
    if (!select) return;

    const products = await getAllProducts();
    select.innerHTML = "";

    products.forEach(p => {
        const option = document.createElement("option");
        option.value = p._id;
        option.innerHTML = `${p.icon} ${p.name}`;
        select.appendChild(option);
    });
}


// ================================================
// HISTORY PAGE: Load dropdown
// ================================================
async function loadHistoryDropdown() {
    const select = document.getElementById("historySelect");
    if (!select) return;

    const products = await getAllProducts();
    select.innerHTML = "";

    products.forEach(p => {
        const option = document.createElement("option");
        option.value = p._id;
        option.innerHTML = `${p.icon} ${p.name}`;
        select.appendChild(option);
    });

    loadProductHistory();
}


// ================================================
// ADD PRODUCT
// ================================================
async function addProduct() {
    const name = document.getElementById("productName").value;
    const totalStock = document.getElementById("productStock").value;

    const res = await fetch(API_URL + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, totalStock })
    });

    const data = await res.json();
    alert(data.message);

    loadProductDropdown();
}


// ================================================
// RELOAD AFTER ADD/UPDATE
// ================================================
function reloadAllDropdowns() {
    loadProductDropdown();
    loadSellDropdown();
    loadHistoryDropdown();
}


// ================================================
// UPDATE TOTAL STOCK
// ================================================
async function updateTotalStock() {
    const productId = document.getElementById("productSelect").value;
    const newTotal = parseInt(document.getElementById("totalStockInput").value);

    const res = await fetch(API_URL + "/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, newTotal })
    });

    const data = await res.json();
    alert(data.message);
}


// ================================================
// REFILL STOCK
// ================================================
async function refillProduct() {
    const productId = document.getElementById("productSelect").value;
    const amount = parseInt(document.getElementById("refillInput").value);

    const res = await fetch(API_URL + "/refill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, amount })
    });

    const data = await res.json();
    alert(data.message);
}


// ================================================
// SELL PRODUCT
// ================================================
async function sellProduct() {
    const productId = document.getElementById("sellSelect").value;
    const qty = parseInt(document.getElementById("sellQty").value);

    const res = await fetch(API_URL + "/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
    } else {
        alert("Sale successful!");
    }
}


// ================================================
// HISTORY PAGE: Load product sale history
// ================================================
async function loadProductHistory() {
    const productId = document.getElementById("historySelect").value;
    const historyList = document.getElementById("historyList");
    if (!historyList) return;

    const res = await fetch(API_URL + "/history/" + productId);
    const history = await res.json();

    historyList.innerHTML = "";

    history.forEach(h => {
        const li = document.createElement("li");
        li.innerHTML = `Sold ${h.qty} at ${h.time}`;
        historyList.appendChild(li);
    });
}


// ================================================
// AUTO-INIT PAGE FUNCTIONS
// ================================================
document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
    loadProductDropdown();
    loadSellDropdown();
    loadHistoryDropdown();
});
