// Car database with all car information
const carDatabase = {
  wigo: {
    id: "wigo",
    name: "Subcompact Sedan",
    type: "Toyota Wigo or similar",
    specs: {
      passengers: 4,
      luggage: 4,
      transmission: "AT",
      fuel: "Unleaded",
    },
    rates: {
      inclusive: 1966.0,
      standard: 1416.0,
    },
    features: ["Air Conditioning", "Power Windows", "AM/FM Radio", "ABS Brakes", "Dual Airbags"],
  },
  vios: {
    id: "vios",
    name: "Economy Sedan",
    type: "Toyota Vios or similar",
    specs: {
      passengers: 5,
      luggage: 4,
      transmission: "AT",
      fuel: "Gasoline",
    },
    rates: {
      inclusive: 2164.0,
      standard: 1614.0,
    },
    features: ["Air Conditioning", "Power Windows", "Bluetooth Audio", "ABS Brakes", "Multiple Airbags"],
  },
  city: {
    id: "city",
    name: "Economy Sedan Plus",
    type: "Honda City or Similar",
    specs: {
      passengers: 5,
      luggage: 4,
      transmission: "AT",
      fuel: "Gasoline",
    },
    rates: {
      inclusive: 2364.0,
      standard: 1814.0,
    },
    features: [
      "Bluetooth Connectivity",
      "Reverse Camera",
      "Touch Screen Display",
      "Multiple Airbags",
      "Cruise Control",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // Get booking details from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const pickupLocation = urlParams.get("pickupLocation");
  const pickupDate = urlParams.get("pickupDate");
  const pickupTime = urlParams.get("pickupTime");
  const dropoffLocation = urlParams.get("dropoffLocation");
  const dropoffDate = urlParams.get("dropoffDate");
  const dropoffTime = urlParams.get("dropoffTime");

  // Format the dates nicely
  function formatDateTime(date, time) {
    if (!date || !time) return "Not specified";
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `${formattedDate} ${time}`;
  }

  // Display booking details
  document.getElementById("pickup-location-display").textContent = pickupLocation || "Not specified";
  document.getElementById("pickup-datetime-display").textContent = formatDateTime(pickupDate, pickupTime);

  document.getElementById("dropoff-location-display").textContent = dropoffLocation || "Not specified";
  document.getElementById("dropoff-datetime-display").textContent = formatDateTime(dropoffDate, dropoffTime);

  // Set up click handlers for rate buttons
  document.querySelectorAll(".rate-btn").forEach((button) => {
    button.onclick = (e) => {
      e.stopPropagation(); // Prevent vehicle card click
      const card = button.closest(".vehicle-card");
      const carId = card.getAttribute("data-car-id");
      const rateType = button.classList.contains("inclusive-btn") ? "inclusive" : "standard";
      proceedToPayment(carId, rateType);
    };
  });

  // Modal functionality
  const modal = document.getElementById("carModal");
  const closeBtn = document.querySelector(".close-modal");

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// Function to handle proceeding to payment
function proceedToPayment(carId, rateType) {
  const carData = carDatabase[carId];
  if (!carData) return;

  // Get booking details from URL
  const urlParams = new URLSearchParams(window.location.search);

  // Calculate number of days between pickup and dropoff
  const pickupDate = new Date(urlParams.get("pickupDate"));
  const dropoffDate = new Date(urlParams.get("dropoffDate"));
  const days = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24)) || 1;

  // Calculate total amount
  const ratePerDay = carData.rates[rateType];
  const totalAmount = ratePerDay * days;

  // Create payment URL with all necessary parameters
  const paymentParams = new URLSearchParams({
    carId: carId,
    carName: carData.name,
    carType: carData.type,
    rateType: rateType,
    ratePerDay: ratePerDay,
    totalAmount: totalAmount,
    numDays: days,
    pickupLocation: urlParams.get("pickupLocation"),
    pickupDate: urlParams.get("pickupDate"),
    pickupTime: urlParams.get("pickupTime"),
    dropoffLocation: urlParams.get("dropoffLocation"),
    dropoffDate: urlParams.get("dropoffDate"),
    dropoffTime: urlParams.get("dropoffTime"),
  });

  // Redirect to payment page
  window.location.href = `../payment/payment.html?${paymentParams.toString()}`;
}

function showCarDetails(carId) {
  const carData = carDatabase[carId];
  if (!carData) return;

  const modal = document.getElementById("carModal");

  // Update modal content with car data
  document.getElementById("modalCarTitle").textContent = carData.name;
  document.getElementById("modalCarType").textContent = carData.type;

  // Update specifications
  document.getElementById("carPassengers").textContent = carData.specs.passengers;
  document.getElementById("carLuggage").textContent = carData.specs.luggage;
  document.getElementById("carTransmission").textContent = carData.specs.transmission;
  document.getElementById("carFuel").textContent = carData.specs.fuel;

  // Update features list
  const featuresList = document.getElementById("carFeaturesList");
  featuresList.innerHTML = carData.features.map((feature) => `<li>${feature}</li>`).join("");

  // Update rates
  document.getElementById("modalInclusiveRate").textContent = `₱${carData.rates.inclusive.toFixed(2)}`;
  document.getElementById("modalStandardRate").textContent = `₱${carData.rates.standard.toFixed(2)}`;

  modal.style.display = "block";
}
