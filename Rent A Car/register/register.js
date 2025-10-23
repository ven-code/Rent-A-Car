function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const toggleButton = input.parentElement.querySelector(".password-toggle");

  if (input.type === "password") {
    input.type = "text";
    toggleButton.style.opacity = "1";
  } else {
    input.type = "password";
    toggleButton.style.opacity = "0.7";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Here you would typically send this data to your server
      console.log("Registration attempt:", { fullName, email, password });
      alert("Registration functionality coming soon!");
    });
  }
});
