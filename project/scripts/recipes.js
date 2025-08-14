const recipesUrl = "data/recipes.json";
const cardsContainer = document.getElementById("recipes-cards");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");
const spotlightContainer = document.getElementById("spotlights-cards");

// Helper: convert membershipLevel number to name
function getMembershipName(level) {
    switch (level) {
        case 1: return 'Bronze';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Create a recipe card
function createRecipeCard(recipe, includeOverlay = true) {
    const card = document.createElement('section');
    card.classList.add('recipes-cards');

    const overlayHTML = includeOverlay ? `
        <div class="image-container">
            <img src="${recipe.imageUrl}" alt="${recipe.recipeName}" loading="lazy" width="300"
                 onerror="this.src='images/placeholder.webp';">
            <div class="overlay-title">${recipe.recipeName}</div>
        </div>
    ` : '';

    card.innerHTML = `
        ${overlayHTML}
        <div class="info-row">
            <div class="info-origin"><strong>Origin:</strong> ${recipe.origin}</div>
            <div class="info-healthBenefit"><strong>Health Benefits:</strong> ${recipe.healthBenefits}</div>
            <div class="info-membership"><strong>Membership Level:</strong> ${getMembershipName(recipe.membershipLevel)}</div>
        </div>
        <p class="recipe-description">${recipe.description}</p>
        <a href="${recipe.websiteUrl}" target="_blank">
            <button class="recipe-btn">View Recipe</button>
        </a>
    `;
    return card;
}

// -------- DIRECTORY PAGE LOGIC --------
if (cardsContainer && gridBtn && listBtn) {
    let recipesData = [];

    async function getRecipes() {
        try {
            const response = await fetch(recipesUrl);
            const data = await response.json();
            recipesData = data.recipes;
            displayRecipes("grid");
        } catch (error) {
            console.error("Error fetching recipes:", error);
            cardsContainer.innerHTML = "<p>Unable to load recipes.</p>";
        }
    }

    function displayRecipes(viewType) {
        cardsContainer.innerHTML = "";
        cardsContainer.classList.toggle("grid-view", viewType === "grid");
        cardsContainer.classList.toggle("list-view", viewType === "list");

        recipesData.forEach(recipe => {
            const card = createRecipeCard(recipe, viewType === "grid");
            cardsContainer.appendChild(card);
        });
    }

    gridBtn.addEventListener("click", () => displayRecipes("grid"));
    listBtn.addEventListener("click", () => displayRecipes("list"));

    getRecipes();
}

// -------- SPOTLIGHT PAGE LOGIC --------
if (spotlightContainer) {
    fetch(recipesUrl)
        .then(response => response.json())
        .then(data => {
            const eligible = data.recipes.filter(r => r.membershipLevel >= 2); // Silver or Gold
            const shuffled = eligible.sort(() => 0.5 - Math.random());
            const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
            const selected = shuffled.slice(0, spotlightCount);

            if (selected.length === 0) {
                spotlightContainer.innerHTML = "<p>No spotlight recipes available.</p>";
                return;
            }

            selected.forEach(recipe => spotlightContainer.appendChild(createRecipeCard(recipe)));
        })
        .catch(error => {
            console.error("Error loading spotlight recipes:", error);
            spotlightContainer.innerHTML = "<p>Error loading spotlight recipes.</p>";
        });
}