document.addEventListener("DOMContentLoaded", () => {
    fetch("membership.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("membership-information");

            data.memberships.forEach((membership) => {
                const card = document.createElement("div");
                card.classList.add("card2");

                card.innerHTML = `
          <h3>${membership.level}</h3>
          <p>${membership.description}</p>
          <p><strong>${membership.price}</strong></p>
          <label>
            <input type="radio" name="membership" value="${membership.level}">
            Select ${membership.level}
          </label>
        `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});