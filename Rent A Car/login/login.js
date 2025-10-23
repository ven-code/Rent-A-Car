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
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const remember = document.querySelector('input[name="remember"]').checked;

      // Here you would typically send this data to your server
      console.log("Login attempt:", { email, password, remember });
      alert("Login functionality coming soon!");
    });
  }
});
