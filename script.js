document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');

    // Fetch and parse the CSV file
    Papa.parse('iran_timeline.csv', {
        download: true, // Fetches the file
        header: true,   // Treats first row as headers
        complete: function(results) {
            const timelineData = results.data;

            // Sort data by date (newest first)
            timelineData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

            // Create timeline nodes
            timelineData.forEach((event, index) => {
                if (!event.Date || !event.Headline) return; // Skip invalid entries

                const node = document.createElement('div');
                node.classList.add('timeline-node');

                const content = document.createElement('div');
                content.classList.add('content');
                content.innerHTML = `<h2>${event.Date}</h2><p>${event.Headline}</p>`;

                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.innerHTML = `${event.Description}<br><img src="${event['Image URL']}" alt="${event.Headline}" onerror="this.style.display='none'">`;

                content.appendChild(tooltip);
                node.appendChild(content);
                timeline.appendChild(node);
            });
        },
        error: function(error) {
            console.error('Error loading CSV:', error);
            timeline.innerHTML = '<p>Failed to load timeline data. Please check the CSV file.</p>';
        }
    });
});