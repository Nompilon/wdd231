document.addEventListener("DOMContentLoaded", () => {
  fetch("data/membership.json")
    .then(response => response.json())
    .then(data => {
      const cardContainer = document.getElementById("membership-information");
      const modalsContainer = document.getElementById("modals");

      data.memberships.forEach((membership, index) => {
        const modalId = `modal-${index}`;

        // Create card
        const card = document.createElement("div");
        card.className = `card ${membership.level.toLowerCase()}`;
        card.innerHTML = `
          <h3>${membership.level} Membership</h3>
          <p>${membership.description}</p>
          <button onclick="openModal('${modalId}')">View Benefits</button>
        `;
        cardContainer.appendChild(card);

        // Create modal
        const modal = document.createElement("dialog");
        modal.id = modalId;
        modal.innerHTML = `
          <h2>${membership.level} Membership Benefits</h2>
          <ul>${membership.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
          <button onclick="closeModal('${modalId}')">Close</button>
        `;
        modalsContainer.appendChild(modal);
      });
    })
    .catch(err => console.error("Error loading membership data:", err));

  // Set form load timestamp
  const timestampInput = document.getElementById("formLoadTimestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }
});

  // If thank you page, display submitted info
  if (document.getElementById("formDate")) {
    const params = getQueryParams();

    document.getElementById("firstName").textContent = params.fname || "";
    document.getElementById("lastName").textContent = params.lname || "";
    document.getElementById("email").textContent = params.email || "";
    document.getElementById("phone").textContent = params.phone || "";
    document.getElementById("formDate").textContent = formatDate(params.formLoadTimestamp);
  }


// Modal handlers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal?.showModal) modal.showModal();
  else modal.style.display = "block"; 
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal?.close) modal.close();
  else modal.style.display = "none";
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll("dialog[open]").forEach(modal => modal.close());
    document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
  }
});

function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");

  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });

  return params;
}

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return isNaN(date) ? isoString : date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
