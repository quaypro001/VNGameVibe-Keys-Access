// Load data from data.json (fallback to localStorage if fetch fails)
let allData = [];
let filteredData = [];
let currentPart = 1;
const itemsPerPart = 2; // Each part shows 2 items (adjustable)
let currentGame = 'all';

async function loadData() {
    try {
        const response = await fetch('data.json');
        allData = await response.json();
    } catch (error) {
        // Fallback: Load from localStorage or sample data
        allData = JSON.parse(localStorage.getItem('keysData')) || [
            { "Key": "KEY001", "Game": "Plants vs Zombies Fusion", "Key Page": "Part 1 - Level 1", "Email": "player1@example.com", "User": "ZombieHunterVN", "Claimed On": "2025-09-01", "Last Viewed On": "2025-09-10" },
            { "Key": "KEY002", "Game": "Plants vs Zombies Fusion", "Key Page": "Part 1 - Level 2", "Email": "player2@example.com", "User": "PlantMaster", "Claimed On": "2025-09-05", "Last Viewed On": "2025-09-15" },
            { "Key": "KEY003", "Game": "Plants vs Zombies Symbiosis", "Key Page": "Part 1 - Survival Mode", "Email": "player3@example.com", "User": "VNVibeGamer", "Claimed On": "2025-09-10", "Last Viewed On": "2025-09-20" },
            { "Key": "KEY004", "Game": "Plants vs Zombies Symbiosis", "Key Page": "Part 2 - Co-op Mode", "Email": "player4@example.com", "User": "AccessKing", "Claimed On": "2025-09-12", "Last Viewed On": "2025-09-22" },
            { "Key": "KEY005", "Game": "Plants vs Zombies Fusion", "Key Page": "Part 3 - Endless Mode", "Email": "player5@example.com", "User": "FusionFan", "Claimed On": "2025-09-18", "Last Viewed On": "2025-09-22" }
        ];
    }
    filterByGame();
}

function filterByGame() {
    currentGame = document.getElementById('game-filter').value;
    currentPart = 1; // Reset to first part when changing game
    if (currentGame === 'all') {
        filteredData = allData;
    } else {
        filteredData = allData.filter(row => row.Game === currentGame);
    }
    renderTable();
}

function renderTable() {
    const start = (currentPart - 1) * itemsPerPart;
    const end = start + itemsPerPart;
    const partData = filteredData.slice(start, end);
    
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    
    partData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Key">${row.Key}</td>
            <td data-label="Game">${row.Game}</td>
            <td data-label="Key Page">${row['Key Page']}</td>
            <td data-label="Email">${row.Email}</td>
            <td data-label="User">${row.User}</td>
            <td data-label="Claimed On">${row['Claimed On']}</td>
            <td data-label="Last Viewed On">${row['Last Viewed On']}</td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById('current-part').textContent = `Part ${currentPart}`;
    document.getElementById('part-info').textContent = `Part ${currentPart}`;
    
    // Enable/disable prev/next buttons
    document.querySelector('button[onclick="prevPart()"]').disabled = currentPart === 1;
    document.querySelector('button[onclick="nextPart()"]').disabled = end >= filteredData.length;
}

function nextPart() {
    if ((currentPart * itemsPerPart) < filteredData.length) {
        currentPart++;
        renderTable();
    }
}

function prevPart() {
    if (currentPart > 1) {
        currentPart--;
        renderTable();
    }
}

function switchToConvert() {
    window.location.href = 'convert.html';
}

// Initialize on page load
loadData();
