document.addEventListener("DOMContentLoaded", () => {
  fetch("data/membership.json")
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.getElementById("card-container");
      const modalsContainer = document.getElementById("membership-information");

      data.memberships.forEach((membership, index) => {
        const modalId = `modal-${index}`;

        // Create the membership card
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${membership.level} Membership</h3>
          <p>${membership.access}</p>
          <button onclick="openModal('${modalId}')">View Benefits</button>
        `;
        cardsContainer.appendChild(card);

        // Create the modal
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.id = modalId;
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close" onclick="closeModal('${modalId}')">&times;</span>
            <h2>${membership.level} Membership Benefits</h2>
            <ul>
              ${membership.benefits.map(b => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        `;
        modalsContainer.appendChild(modal);
      });
    })
    .catch(err => console.error("Error loading membership data:", err));
});

function openModal(id) {
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("formLoadTimestamp");
  if (timestampInput) {
    // Use ISO string format for universal readability
    timestampInput.value = new Date().toISOString();
  }
});

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date)) return isoString; // fallback to raw string
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const params = getQueryParams();

  document.getElementById("firstName").textContent = params.fname || "";
  document.getElementById("lastName").textContent = params.lname || "";
  document.getElementById("email").textContent = params.email || "";
  document.getElementById("phone").textContent = params.phone || "";
  document.getElementById("businessName").textContent = params.businessname || "";

  // Format and display the hidden timestamp field
  document.getElementById("formDate").textContent = formatDate(params.formLoadTimestamp);
});