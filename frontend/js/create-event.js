window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const form = document.getElementById("eventForm");
    const successContainer = document.getElementById("successContainer");
    const newEventBtn = document.getElementById("newEventBtn");
    const viewEventsBtn = document.getElementById("viewEventsBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (!token) {
        window.location.href = "admin-login.html";
        return;
    }

    const resetForm = () => {
        form.reset();
        successContainer.classList.add("hidden");
    };

    newEventBtn.addEventListener("click", () => {
        resetForm();
    });

    viewEventsBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const date = document.getElementById("date").value;
        const venue = document.getElementById("venue").value;

        submitBtn.disabled = true;
        submitBtn.textContent = "Creating...";

        try {
            const response = await fetch("http://localhost:5000/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    title,
                    description,
                    date,
                    venue
                })
            });

            if (response.ok) {
                resetForm();
                successContainer.classList.remove("hidden");
            } else {
                const data = await response.json();
                alert(data.message || "Unable to create event. Please try again.");
            }
        } catch (error) {
            alert("Network error. Make sure the backend is running.");
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Create Event";
        }
    });
});