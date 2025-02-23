function createCodeBackground() {
    const canvas = document.createElement('div');
    canvas.id = 'code-background';
    document.body.appendChild(canvas);

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+-=[]{}|;:,.<>?'; // Matrix-style characters
    const columns = window.innerWidth / 10; // Number of columns based on screen width

    for (let x = 0; x < columns; x++) {
        drops.push([]);
        for (let y = 0; y < 100; y += 10) {
            const particle = document.createElement('div');
            particle.classList.add('code-particle');
            particle.textContent = characters[Math.floor(Math.random() * characters.length)];
            particle.style.left = (x * 10) + 'px';
            particle.style.top = (y - Math.random() * 1000) + 'px'; // Random starting positions
            particle.style.animation = `matrixFall ${Math.random() * 5 + 3}s linear infinite`; // Slower, endless fall
            canvas.appendChild(particle);
            drops[x].push(particle);
        }
    }

    // CSS animation for matrix fall
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    styleSheet.sheet.insertRule(`
        @keyframes matrixFall {
            0% { top: -1000px; opacity: 1; }
            100% { top: 100vh; opacity: 0.5; }
        }
    `, 0);
}

async function fetchGitHubProjects() {
    const username = "arun3676"; // Your GitHub username
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();
    
    const container = document.getElementById("projects-container");
    repos.forEach(repo => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.innerHTML = `
            <img src="https://via.placeholder.com/300x200?text=${repo.name}" alt="${repo.name}">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        container.appendChild(projectDiv);
    });
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thanks for reaching out! Automation coming soon.");
});

document.querySelectorAll('.project, .gallery-grid img').forEach(item => {
    item.addEventListener('click', () => {
        alert('Clicked! Check out more details on GitHub or my blog.');
    });
});

window.onload = () => {
    createCodeBackground();
    fetchGitHubProjects();
};