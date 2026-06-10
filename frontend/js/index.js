const container =
document.getElementById("eventsContainer");

async function loadEvents() {
    const res = await fetch("http://localhost:5000/api/events");
    const events = await res.json();

    container.innerHTML = "";

    if (!events.length) {
        container.innerHTML = `<div class="card empty-card">No upcoming events yet.</div>`;
        return;
    }

    events.forEach(event => {
        const eventDate = new Date(event.date).toLocaleDateString();
        container.innerHTML += `
            <div class="card event-card">
                <div class="event-header">
                    <h2>${event.title}</h2>
                    <span class="event-date">${eventDate}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <p class="event-venue"><strong>Venue:</strong> ${event.venue}</p>
            </div>
        `;
    });
}

loadEvents();