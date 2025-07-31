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


const membersUrl = "data/members.json";
const cardsContainer = document.getElementById("members-cards");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

let membersData = []; // store globally once fetched

async function getMembers() {
    const response = await fetch(membersUrl);
    const data = await response.json();
    membersData = data.members; // Store for reuse
    displayMembers("grid"); // Default view
}

function displayMembers(viewType) {
    cardsContainer.innerHTML = ""; // Clear previous content

    // Toggle classes on container
    cardsContainer.classList.toggle("grid-view", viewType === "grid");
    cardsContainer.classList.toggle("list-view", viewType === "list");

    membersData.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("members-cards");

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

        const description = document.createElement("p");
        description.classList.add("member-description");
        description.textContent = member.description;

        infoRow.appendChild(name);
        infoRow.appendChild(address);
        infoRow.appendChild(phone);
        infoRow.appendChild(website);
        infoRow.appendChild(description);

        if (viewType === "grid") {
            card.appendChild(portrait); // Show image only in grid
        }

        card.appendChild(infoRow);
        cardsContainer.appendChild(card);
    });
}

// Toggle View Buttons
gridBtn.addEventListener("click", () => {
    displayMembers("grid");
});

listBtn.addEventListener("click", () => {
    displayMembers("list");
});

// Load once
getMembers();

document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.getElementById("spotlights-cards");

    const loadSpotlights = (members) => {
        const eligible = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selected = shuffled.slice(0, spotlightCount);

        if (selected.length === 0) {
            spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
            return;
        }

        selected.forEach(member => displaySpotlightCard(member, spotlightContainer));
    };

    // Use already-loaded data if available, else fetch
    if (typeof membersData !== "undefined" && Array.isArray(membersData) && membersData.length > 0) {
        loadSpotlights(membersData);
    } else {
        fetch('data/members.json')
            .then(response => response.json())
            .then(data => loadSpotlights(data.members))
            .catch(error => {
                console.error("Error loading spotlight members:", error);
                spotlightContainer.innerHTML = "<p>Error loading spotlight members.</p>";
            });
    }
});

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

function getMembershipName(level) {
    switch (level) {
        case 1: return 'Bronze';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

function displayResults(data) {
    // ❄️ Display temperature
    currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

    // 🌤️ Build icon URL
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;

    // 🌈 Set image and caption
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}