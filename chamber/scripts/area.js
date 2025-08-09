fetch('data/area.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('site-cards');

        data.sites.slice(0, 8).forEach((site, index) => {
            const card = document.createElement('article');
            card.id = `card${index + 1}`;
            card.classList.add('site-card');  // <-- added class here
            card.innerHTML = `
        <h2>${site.siteName}</h2>
        <figure><img src="${site.imageUrl}" alt="${site.siteName}"></figure>
        <address>${site.address}</address>
        <p>${site.description}</p>
        <button type="button">Learn More</button>
      `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });