document.getElementById("loginForm").addEventListener("submit", handleLogin);

function handleLogin(event) {
  event.preventDefault();

  const submitButton = event.target.querySelector("button[type='submit']");
  toggleSubmitButton(submitButton, true);

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showError("Please fill in all fields.", submitButton);
    return;
  }

  const loginData = { email, password };

  fetch('http://127.0.0.1:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html"; // Redirect to the dashboard
      } else {
        showError(data.message || "An error occurred during login.", submitButton);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showError("Login failed. Please try again.", submitButton);
    });
}

function toggleSubmitButton(button, isDisabled) {
  button.disabled = isDisabled;
  button.innerText = isDisabled ? "Logging in..." : "Log In";
}

function showError(message, button) {
  alert(message);
  toggleSubmitButton(button, false);
}
