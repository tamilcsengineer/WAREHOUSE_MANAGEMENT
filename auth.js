function protectPage(allowedRoles) {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("userRole");

  if (!loggedIn || !allowedRoles.includes(role)) {
    alert("Access denied. Please login.");
    location.href = "login.html";
  }
}

function logout() {
  localStorage.clear();
  location.href = "login.html";
}
