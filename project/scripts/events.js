document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-cards");

    const upcomingEvents = [
        {
            title: "Business Networking Breakfast",
            date: "2025-08-15",
            location: "Pretoria Convention Centre",
            description: "Connect with local entrepreneurs, hear from industry experts, and grow your business network."
        },
        {
            title: "Healthy Cooking Workshop",
            date: "2025-09-05",
            location: "Living Long Club Kitchen",
            description: "Learn how to prepare meals that promote longevity and wellbeing."
        },
        {
            title: "Farmers Market Visit",
            date: "2025-09-20",
            location: "Local Pretoria Market",
            description: "Discover seasonal produce and enjoy a guided tour."
        }
    ];

    upcomingEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
    `;
        eventsContainer.appendChild(card);
    });
});