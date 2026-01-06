const API = "http://localhost:5000/product/getall";
const LOW_STOCK = 20;

async function loadAdmin() {
  const res = await fetch(API);
  const products = await res.json();

  // ✅ Analytics
  let total = products.length;
  let low = products.filter(p => p.remainingStock <= LOW_STOCK).length;

  document.getElementById("stats").innerHTML = `
    <h3>Analytics</h3>
    <p>Total Products: <b>${total}</b></p>
    <p class="low">Low Stock Items: <b>${low}</b></p>
  `;

  // ✅ Product list container
  const list = document.getElementById("productList");
  list.innerHTML = "<h3>Products</h3>";

  // ✅ DISPLAY PRODUCTS + IMAGES
  products.forEach(p => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>Sold: <b>${p.totalStock - p.remainingStock}</b></p>
      <p class="${p.remainingStock <= LOW_STOCK ? 'low' : ''}">
        Remaining: ${p.remainingStock}
        ${p.remainingStock <= LOW_STOCK ? " ⚠ LOW STOCK" : ""}
      </p>
    `;

    // ✅ IMAGE GRID
    if (p.images && p.images.length > 0) {
      const imageBox = document.createElement("div");
      imageBox.className = "image-grid";

      p.images.forEach(img => {
        imageBox.innerHTML += `
          <div class="img-box">
            <img src="${img.url}" alt="${img.name}">
            <small>${img.name}</small>
          </div>
        `;
      });

      card.appendChild(imageBox);
    }

    list.appendChild(card);
  });

  // ✅ LOW STOCK ALERT
  if (low > 0) {
    alert("⚠ Low stock alert for Admin & Manager");
  }
}
