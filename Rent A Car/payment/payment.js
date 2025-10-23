document.addEventListener("DOMContentLoaded", () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Update booking summary
  document.getElementById("selected-car-name").textContent = urlParams.get("carName");
  document.getElementById("selected-car-type").textContent = urlParams.get("carType");

  // Set car image
  const carId = urlParams.get("carId");
  document.getElementById("selected-car-image").src = `../images/${carId}.jpg`;

  // Format dates for display
  function formatDateTime(date, time) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `${formattedDate} ${time}`;
  }

  // Update pickup/dropoff details
  document.getElementById("pickup-details").textContent = `${urlParams.get("pickupLocation")} - ${formatDateTime(
    urlParams.get("pickupDate"),
    urlParams.get("pickupTime")
  )}`;

  document.getElementById("dropoff-details").textContent = `${urlParams.get("dropoffLocation")} - ${formatDateTime(
    urlParams.get("dropoffDate"),
    urlParams.get("dropoffTime")
  )}`;

  // Update duration and total amount
  document.getElementById("duration").textContent = `${urlParams.get("numDays")} days`;
  document.getElementById("total-amount").textContent = `₱${parseFloat(urlParams.get("totalAmount")).toLocaleString(
    "en-US",
    { minimumFractionDigits: 2 }
  )}`;

  // Payment method switching
  const paymentMethods = document.querySelectorAll(".payment-method-btn");
  const cardForm = document.getElementById("card-payment-form");
  const gcashForm = document.getElementById("gcash-payment-form");
  const mayaForm = document.getElementById("maya-payment-form");

  paymentMethods.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      paymentMethods.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      // Hide all payment forms
      cardForm.style.display = "none";
      if (gcashForm) gcashForm.style.display = "none";
      if (mayaForm) mayaForm.style.display = "none";

      // Show selected payment form
      const method = btn.dataset.method;
      if (method === "card") {
        cardForm.style.display = "block";
      } else if (method === "gcash" && gcashForm) {
        gcashForm.style.display = "block";
      } else if (method === "maya" && mayaForm) {
        mayaForm.style.display = "block";
      }
    });
  });

  // Card number formatting
  const cardNumber = document.getElementById("cardNumber");
  cardNumber.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
  });

  // Expiry date formatting
  const expiryDate = document.getElementById("expiryDate");
  expiryDate.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    e.target.value = value;
  });

  // CVV formatting
  const cvv = document.getElementById("cvv");
  cvv.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
  });

  // Form submission
  const paymentForm = document.getElementById("paymentForm");
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show loading state
    const payBtn = document.querySelector(".pay-btn");
    const originalText = payBtn.textContent;
    payBtn.textContent = "Processing...";
    payBtn.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
      alert("Payment successful! Redirecting to confirmation page...");
      // Redirect to confirmation page or homepage
      window.location.href = "../homepage/homepage.html";
    }, 2000);
  });
});
