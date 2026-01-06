const LOW_STOCK_THRESHOLD = 10;
const API = "http://localhost:5000/product";

async function loadDashboard() {
    const res = await fetch(API + "/getall");
    const products = await res.json();

    const container = document.getElementById("cardGrid");
    container.innerHTML = "";

    let names = [];
    let soldData = [];

    const lowStockItems = products.filter(
        p => p.remainingStock <= LOW_STOCK_THRESHOLD
    );

    products.forEach(p => {
        const totalSold = p.soldHistory.reduce((t, x) => t + x.qty, 0);
        const isLow = p.remainingStock <= LOW_STOCK_THRESHOLD;

        container.innerHTML += `
            <div class="card ${isLow ? 'low-stock' : ''}">
                <h3>
                  ${p.icon} ${p.name}
                  ${isLow ? '<span class="low-stock-badge">REFILL NEEDED</span>' : ''}
                </h3>
                <p><b>Total Stock:</b> ${p.totalStock}</p>
                <p class="${isLow ? 'stock-count low' : ''}">
                   <b>Remaining:</b> ${p.remainingStock}
                </p>
                <p><b>Sold:</b> ${totalSold}</p>
            </div>
        `;

        names.push(p.name);
        soldData.push(totalSold);
    });

    if (lowStockItems.length > 0) {
        showToast(
            `⚠ ${lowStockItems.length} products are low in stock`,
            "error"
        );
    }

    loadChart(names, soldData);
}

function loadChart(labels, values) {
    new Chart(document.getElementById("chart"), {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Total Sold",
                data: values,
                backgroundColor: "#0a74ff"
            }]
        }
    });
}

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.className = "";
    toast.innerText = message;
    toast.classList.add("show", type);

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
