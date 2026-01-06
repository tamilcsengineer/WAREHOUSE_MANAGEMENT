const API = "http://localhost:5000/product";

async function loadCustomer() {
    const res = await fetch(API + "/getall");
    const products = await res.json();

    const grid = document.getElementById("customerGrid");
    grid.innerHTML = "";

    products.forEach(p => {
        const sold = p.soldHistory.reduce((t, x) => t + x.qty, 0);

        grid.innerHTML += `
            <div class="card">
                <h3>${p.icon} ${p.name}</h3>
                <p><b>Total Stock:</b> ${p.totalStock}</p>
                <p><b>Remaining:</b> ${p.remainingStock}</p>
                <p><b>Sold:</b> ${sold}</p>
            </div>
        `;
    });
}
