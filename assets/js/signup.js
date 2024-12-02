document.getElementById("signupForm").addEventListener("submit", handleSignup);

function handleSignup(event) {
  event.preventDefault();
  const submitButton = event.target.querySelector("button[type='submit']");
  toggleSubmitButton(submitButton, true);

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("cpassword").value;

  if (!name || !email || !password || !confirmPassword) {
    showError("Please fill in all fields.", submitButton);
    return;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match!", submitButton);
    return;
  }

  const signupData = { fullName: name, email, password };

  fetch('http://127.0.0.1:5000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        showError(data.message || "An error occurred during signup.", submitButton);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showError("Signup failed. Please try again.", submitButton);
    });
}

function toggleSubmitButton(button, isDisabled) {
  button.disabled = isDisabled;
  button.innerText = isDisabled ? "Signing up..." : "Sign Up";
}

function showError(message, button) {
  alert(message);
  toggleSubmitButton(button, false);
}
