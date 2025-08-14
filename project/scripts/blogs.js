fetch('data/blogs.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('site-cards');

        // Pick only first 8 blogs (or all if fewer)
        data.blogs.slice(0, 12).forEach((blog, index) => {
            const card = document.createElement('article');
            card.id = `card${index + 1}`;
            card.classList.add('site-card');
            card.innerHTML = `
        <h2>${blog.blogTitle}</h2>
        <figure>
          <img src="${blog.imageUrl}" alt="${blog.blogTitle}" loading="lazy">
        </figure>
        <p>${blog.description}</p>
        <p><small>Published: ${blog.publishDate}</small></p>
        <p><strong>Author:</strong> ${blog.author} (${blog.profession})</p>
        <button type="button">Learn More</button>
      `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

// Select the sidebar element where the message will appear
const sidebar = document.getElementById("visit-message");

// Get the stored last visit date from localStorage
const lastVisit = localStorage.getItem("lastVisit");

// Get current date in milliseconds
const now = Date.now();

if (!lastVisit) {
    // First visit
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
} else {
    // Calculate time difference in days
    const msInDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - lastVisit) / msInDay);

    if (daysBetween < 1) {
        sidebar.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        sidebar.textContent = "You last visited 1 day ago.";
    } else {
        sidebar.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

// Update last visit in localStorage
localStorage.setItem("lastVisit", now);