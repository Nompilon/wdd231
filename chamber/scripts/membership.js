document.addEventListener("DOMContentLoaded", () => {
  fetch("data/membership.json") 
    .then(response => {
      if (!response.ok) throw new Error("Failed to load membership.json");
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("membership-information");
      if (!container) {
        console.error("Membership container not found!");
        return;
      }

      data.memberships.forEach((membership, index) => {
        const card = document.createElement("fieldset");
        card.classList.add("card2");

        card.innerHTML = `
                    <legend>${membership.level}</legend>
                    <p>${membership.description}</p>
                    <p>${membership.detailedDescription}</p>
                    <p><strong>${membership.price}</strong></p>
                    
                `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading JSON:", error));
});
