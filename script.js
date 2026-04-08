const apps = [
    { name: "WhatsApp", rating: "4.5", desc: "Chat with friends", category: "Social", img: "whats app.jpg" },
    { name: "Instagram", rating: "4.3", desc: "Share photos", category: "Social", img: "instagram.jpg"},
    { name: "Facebook", rating: "4.2", desc: "Connect with people", category: "Social", img: "facebook.jpg" },

    { name: "Candy Crush", rating: "4.4", desc: "Puzzle game", category: "Games", img: "candy_crush.jpg" },
    { name: "PUBG", rating: "4.5", desc: "Battle royale game", category: "Games", img: "pubg.jpg" },
    { name: "Subway Surfers", rating: "4.3", desc: "Endless runner", category: "Games", img: "subway_surfers.jpg" },

    { name: "Google Docs", rating: "4.6", desc: "Document editor", category: "Productivity", img: "google_docs.jpg" },
    { name: "Notion", rating: "4.5", desc: "Notes & tasks", category: "Productivity", img: "notion.jpg" },

    { name: "YouTube", rating: "4.7", desc: "Watch videos", category: "Entertainment", img: "youtube.jpg" },
    { name: "Spotify", rating: "4.4", desc: "Music streaming", category: "Entertainment", img: "spotify.jpg" }
];

const container = document.getElementById("appContainer");
const searchBar = document.getElementById("searchBar");

let currentCategory = "All";

// Display Apps
function displayApps(appList) {
    container.innerHTML = "";

    appList.forEach(app => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${app.img}" alt="${app.name}">
            <h3>${app.name}</h3>
            <p><b>${app.category}</b></p>
            <p>⭐ ${app.rating}</p>
        `;

        // Click event → open modal
        card.addEventListener("click", () => openModal(app));

        container.appendChild(card);
    });
}
// Install Button
function installApp(button) {
    function openModal(app) {
    modal.style.display = "flex";

    document.getElementById("modalImg").src = app.img;
    document.getElementById("modalName").innerText = app.name;
    document.getElementById("modalCategory").innerText = "Category: " + app.category;
    document.getElementById("modalRating").innerText = "Rating: " + app.rating;
    document.getElementById("modalDesc").innerText = app.desc;

    const btn = document.getElementById("modalBtn");
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");
    const progressText = document.getElementById("progressText");

    btn.innerText = "Install";
    btn.disabled = false;

    progressBar.style.width = "0%";
    progressContainer.style.display = "none";
    progressText.innerText = "";

    btn.onclick = () => {
        btn.style.display = "none";
        progressContainer.style.display = "block";

        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 5; // random speed

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                progressText.innerText = "Installed ✅";
            } else {
                progressText.innerText = "Installing... " + progress + "%";
            }

            progressBar.style.width = progress + "%";
        }, 300);
    };
}
}

// Category Filter
function filterCategory(category) {
    currentCategory = category;
    applyFilters();
}

// Search + Category Combined
function applyFilters() {
    const searchValue = searchBar.value.toLowerCase();

    const filteredApps = apps.filter(app => {
        const matchesCategory = currentCategory === "All" || app.category === currentCategory;
        const matchesSearch =
            app.name.toLowerCase().includes(searchValue) ||
            app.desc.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });

    displayApps(filteredApps);
}

// Search Event
searchBar.addEventListener("keyup", applyFilters);

// Initial Load
displayApps(apps);

const modal = document.getElementById("appModal");

function openModal(app) {
    modal.style.display = "flex";

    document.getElementById("modalImg").src = app.img;
    document.getElementById("modalName").innerText = app.name;
    document.getElementById("modalCategory").innerText = "Category: " + app.category;
    document.getElementById("modalRating").innerText = "Rating: " + app.rating;
    document.getElementById("modalDesc").innerText = app.desc;

    const btn = document.getElementById("modalBtn");
    btn.innerText = "Install";
    btn.disabled = false;

    btn.onclick = () => {
        btn.innerText = "Installed";
        btn.disabled = true;
        btn.style.backgroundColor = "gray";
    };
}

function closeModal() {
    modal.style.display = "none";
}