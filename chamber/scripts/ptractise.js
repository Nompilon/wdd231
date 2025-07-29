const membersUrl = "data/members.json";
const cardsContainer = document.getElementById("members-cards");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

async function getMembers() {
    const response = await fetch(membersUrl);
    const data = await response.json();

    console.table(data.members);
    displayMembers(data.members);
}

function displayMembers(members) {
    cardsContainer.innerHTML = ""; // Clear previous content

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const fullName = document.createElement("h2");
        fullName.textContent = member.memberName;

        const portrait = document.createElement("img");
        portrait.setAttribute("src", member.imageUrl);
        portrait.setAttribute("alt", `Portrait of ${member.memberName}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "300");
        portrait.setAttribute("height", "200");
        portrait.classList.add("member-image");

        const infoRow = document.createElement("div");
        infoRow.classList.add("info-row");

        const name = document.createElement("div");
        name.classList.add("info-name");
        name.textContent = member.memberName;

        const address = document.createElement("div");
        address.classList.add("info-address");
        address.textContent = member.address;

        const phone = document.createElement("div");
        phone.classList.add("info-phone");
        phone.textContent = member.phone;

        const website = document.createElement("div");
        website.classList.add("info-website");
        const link = document.createElement("a");
        link.href = member.websiteUrl;
        link.textContent = member.websiteUrl;
        link.target = "_blank";
        website.appendChild(link);

        infoRow.appendChild(name);
        infoRow.appendChild(address);
        infoRow.appendChild(phone);
        infoRow.appendChild(website);

        // Conditional rendering of image (optional)
        if (!cardsContainer.classList.contains("list-view")) {
            card.appendChild(portrait);
        }

        card.appendChild(infoRow);
        cardsContainer.appendChild(card); // ✅ <-- Important line
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
    getMembers(); // Refresh to apply view
});

listBtn.addEventListener("click", () => {
    cardsContainer.classList.add("list-view");
    cardsContainer.classList.remove("grid-view");
    getMembers(); // Refresh to apply view
});

// Start on load
getMembers();