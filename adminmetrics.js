const METRICS_API = "http://localhost:5000/metrics/dashboard";

async function loadMetrics() {
  const res = await fetch(METRICS_API);
  const data = await res.json();

  const box = document.getElementById("dashboard");

  box.innerHTML = `
    <div class="card">
      <h3>📦 Inventory</h3>
      <p>Total Products: <b>${data.inventory.totalProducts}</b></p>
      <p>Sold Products: <b>${data.inventory.soldProducts}</b></p>
      <p>Remaining Stock: <b>${data.inventory.remainingStock}</b></p>
      <p class="low">Low Stock Items: <b>${data.inventory.lowStockItems}</b></p>
      <p>Stock Accuracy: <b>${data.inventory.stockAccuracy}</b></p>
      <p>Lost Items: <b>${data.inventory.lostItems}</b></p>
    </div>

    <div class="card">
      <h3>📈 Order Fulfillment</h3>
      <p>Total Order Time: <b>${data.orderFulfillment.totalOrderTime}</b></p>
      <p>Perfect Orders: <b>${data.orderFulfillment.perfectOrders}</b></p>
      <p>Picking Mistakes: <b>${data.orderFulfillment.pickingMistakes}</b></p>
      <p>On-Time Shipping: <b>${data.orderFulfillment.onTimeShipping}</b></p>
    </div>

    <div class="card">
      <h3>⚙️ Efficiency</h3>
      <p>Time to Shelf: <b>${data.efficiency.timeToShelf}</b></p>
      <p>Receiving Speed: <b>${data.efficiency.receivingSpeed}</b></p>
      <p>Warehouse Output: <b>${data.efficiency.warehouseOutput}</b></p>
    </div>

    <div class="card">
      <h3>👷 Labor & Safety</h3>
      <p>Worker Output: <b>${data.labor.workerOutput}</b></p>
      <p>Accidents: <b>${data.labor.accidents}</b></p>
    </div>
  `;
}

loadMetrics();
// WORKER DATA (Mock for demo)
const workersData = [
  { name: "Arun", role: "Manager", status: "Active" },
  { name: "Kumar", role: "Staff", status: "Active" },
  { name: "Priya", role: "Staff", status: "Idle" }
];

// Render workers
function renderWorkers() {
  const tbody = document.getElementById("workers");
  tbody.innerHTML = "";

  workersData.forEach(w => {
    tbody.innerHTML += `
      <tr>
        <td>${w.name}</td>
        <td>${w.role}</td>
        <td style="color:${w.status === "Active" ? "green" : "orange"}">
          ${w.status}
        </td>
      </tr>
    `;
  });
}

// Inventory snapshot
function renderSnapshot() {
  const stock = JSON.parse(localStorage.getItem("stock")) || {};
  const snap = document.getElementById("snapshot");
  snap.innerHTML = "";

  Object.keys(stock).forEach(p => {
    const low = stock[p] <= 10;
    snap.innerHTML += `
      <li style="color:${low ? 'red' : 'black'}">
        ${p}: ${stock[p]} ${low ? "(LOW)" : ""}
      </li>
    `;
  });
}
function renderAlerts() {
  const stock = JSON.parse(localStorage.getItem("stock")) || {};
  const alertsBox = document.getElementById("alerts");

  const lowProducts = Object.entries(stock)
    .filter(([_, qty]) => qty <= 10);

  // No alerts
  if (lowProducts.length === 0) {
    alertsBox.innerHTML = "✅ All systems normal";
    alertsBox.style.color = "green";
    return;
  }

  // Build alert HTML
  let html = `<div style="color:red; font-weight:bold; margin-bottom:6px;">
                ⚠️ Low Stock Alerts
              </div>`;

  lowProducts.forEach(([name, qty]) => {
    html += `
      <div style="margin:4px 0;">
        • <b>${name}</b> (${qty} left)
        <a href="manager.html" 
           style="margin-left:8px; color:#007bff; font-size:13px;">
           Refill
        </a>
      </div>
    `;
  });

  alertsBox.innerHTML = html;
  alertsBox.style.color = "red";
}
function renderWorkers() {
  const tbody = document.getElementById("workers");
  tbody.innerHTML = "";

  const logs = JSON.parse(localStorage.getItem("salesLog")) || [];
  const now = Date.now();

  const workers = [
    { name: "Arun", role: "Manager" },
    { name: "Kumar", role: "Staff" },
    { name: "Priya", role: "Staff" }
  ];

  workers.forEach(w => {
    let status = "Idle";

    if (w.role === "Staff") {
      const lastSale = logs.filter(l => l.staff === w.name).pop();

      if (lastSale && (now - lastSale.time) < 120000) {
        status = "Active";
      }
    }

    tbody.innerHTML += `
      <tr>
        <td>${w.name}</td>
        <td>${w.role}</td>
        <td style="color:${status === "Active" ? "green" : "orange"}">
          ${status}
        </td>
      </tr>
    `;
  });
}
