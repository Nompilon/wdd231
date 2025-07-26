const membersUrl = "data/members.json"; // adjust path if necessary
const cardsContainer = document.getElementById("members-cards");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Failed to load members.");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching member data:", error);
        cardsContainer.innerHTML = "<p>Unable to load member data.</p>";
    }
}

function displayMembers(members) {
    cardsContainer.innerHTML = ""; // Clear existing

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.imageUrl}" alt="Logo of ${member.memberName}" loading="lazy">
            <h3>${member.memberName}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLabel(member.membershipLevel)}</p>
            <p><em>${member.description}</em></p>
        `;

        cardsContainer.appendChild(card);
    });
}

function getMembershipLabel(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown";
    }
}

// Toggle View
gridBtn.addEventListener("click", () => {
    cardsContainer.classList.add("grid-view");
    cardsContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    cardsContainer.classList.add("list-view");
    cardsContainer.classList.remove("grid-view");
});

// Start on load
getMembers();