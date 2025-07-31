const membersUrl = "data/members.json";

// Directory Page Elements
const cardsContainer = document.getElementById("members-cards");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

// Spotlight Page Element
const spotlightContainer = document.getElementById("spotlights-cards");

// Function to get membership name
function getMembershipName(level) {
    switch (level) {
        case 1: return 'Bronze';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// -------- DIRECTORY PAGE LOGIC --------
if (cardsContainer && gridBtn && listBtn) {
    let membersData = [];

    async function getMembers() {
        try {
            const response = await fetch(membersUrl);
            const data = await response.json();
            membersData = data.members;
            displayMembers("grid"); // default to grid view
        } catch (error) {
            console.error("Error fetching members for directory:", error);
            cardsContainer.innerHTML = "<p>Unable to load members.</p>";
        }
    }

    function displayMembers(viewType) {
        cardsContainer.innerHTML = ""; // Clear container

        cardsContainer.classList.toggle("grid-view", viewType === "grid");
        cardsContainer.classList.toggle("list-view", viewType === "list");

        membersData.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("members-cards");

            // Image only in grid view
            if (viewType === "grid") {
                const portrait = document.createElement("img");
                portrait.src = member.imageUrl;
                portrait.alt = `Portrait of ${member.memberName}`;
                portrait.loading = "lazy";
                portrait.width = 300;
                portrait.height = 200;
                portrait.classList.add("member-image");
                card.appendChild(portrait);
            }

            // Info container
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

            const membership = document.createElement("div");
            membership.classList.add("info-membership");
            membership.textContent = `Membership Level: ${getMembershipName(member.membershipLevel)}`;

            const description = document.createElement("p");
            description.classList.add("member-description");
            description.textContent = member.description;

            // Append all info
            infoRow.appendChild(name);
            infoRow.appendChild(address);
            infoRow.appendChild(phone);
            infoRow.appendChild(website);
            infoRow.appendChild(membership);
            infoRow.appendChild(description);

            card.appendChild(infoRow);

            cardsContainer.appendChild(card);
        });
    }

    // Button events for toggling views
    gridBtn.addEventListener("click", () => displayMembers("grid"));
    listBtn.addEventListener("click", () => displayMembers("list"));

    // Initial load
    getMembers();
}

// -------- SPOTLIGHT PAGE LOGIC --------
if (spotlightContainer) {
    fetch(membersUrl)
        .then(response => response.json())
        .then(data => {
            const members = data.members;

            // Filter eligible members (Silver or Gold or Platinum)
            const eligible = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

            // Shuffle and select 2 or 3 random members
            const shuffled = eligible.sort(() => 0.5 - Math.random());
            const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 spotlights
            const selected = shuffled.slice(0, spotlightCount);

            if (selected.length === 0) {
                spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
                return;
            }

            selected.forEach(member => displaySpotlightCard(member, spotlightContainer));
        })
        .catch(error => {
            console.error("Error loading spotlight members:", error);
            spotlightContainer.innerHTML = "<p>Error loading spotlight members.</p>";
        });
}

function displaySpotlightCard(member, container) {
    const card = document.createElement('section');
    card.classList.add('members-cards');

    card.innerHTML = `
        <img src="${member.imageUrl}" alt="${member.memberName} logo" loading="lazy" width="300"
             onerror="this.src='images/placeholder.webp';">
        <h3 class="info-name">${member.memberName}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipName(member.membershipLevel)}</p>
    `;

    container.appendChild(card);
}