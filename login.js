function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let role = "";

  if (email === "admin@warehouse.com" && password === "admin123") {
    role = "admin";
  } else if (email === "manager@warehouse.com" && password === "manager123") {
    role = "manager";
  } else if (email === "staff@warehouse.com" && password === "staff123") {
    role = "staff";
  } else {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userRole", role);

  if (role === "admin") location.href = "admindashboard.html";
  if (role === "manager") location.href = "manager.html";
  if (role === "staff") location.href = "staff.html";
}
