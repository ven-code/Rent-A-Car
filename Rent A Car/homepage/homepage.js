// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav item
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Set current date and minimum date for date pickers
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayFormatted = formatDate(today);
  const tomorrowFormatted = formatDate(tomorrow);

  // Set minimum dates for date pickers
  const pickupDate = document.getElementById("pickup-date");
  if (pickupDate) {
    pickupDate.min = todayFormatted;
  }

  // Set minimum date for dropoff
  const dropoffDate = document.getElementById("dropoff-date");
  if (dropoffDate) {
    dropoffDate.min = todayFormatted;
  }

  // Book Now button functionality
  const bookBtn = document.getElementById("bookBtn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      const pickupLocation = document.getElementById("pickup-location").value;
      const pickupDate = document.getElementById("pickup-date").value;
      const pickupTime = document.getElementById("pickup-time").value;
      const dropoffLocation = document.getElementById("dropoff-location").value;
      const dropoffDate = document.getElementById("dropoff-date").value;
      const dropoffTime = document.getElementById("dropoff-time").value;

      if (!pickupLocation) {
        alert("Please select a pick-up location");
        return;
      }
      if (!pickupDate) {
        alert("Please select a pick-up date");
        return;
      }
      if (!pickupTime) {
        alert("Please select a pick-up time");
        return;
      }
      if (!dropoffLocation) {
        alert("Please select a drop-off location");
        return;
      }
      if (!dropoffDate) {
        alert("Please select a drop-off date");
        return;
      }
      if (!dropoffTime) {
        alert("Please select a drop-off time");
        return;
      }

      // Redirect to vehicles page with query parameters
      const queryParams = new URLSearchParams({
        pickupLocation,
        pickupDate,
        pickupTime,
        dropoffLocation,
        dropoffDate,
        dropoffTime,
      });

      window.location.href = `../vehicles/vehicles.html?${queryParams.toString()}`;
    });
  }

  // Login button
  const loginBtn = document.querySelector(".auth-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loginBtn.style.pointerEvents = "none";
      loginBtn.style.opacity = "0.7";
      loginBtn.textContent = "Redirecting...";
      setTimeout(() => {
        window.location.href = "../login/login.html";
      }, 300);
    });
  }
});
