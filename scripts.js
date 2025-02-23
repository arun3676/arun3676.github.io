function createCodeBackground() {
    const canvas = document.createElement('div');
    canvas.id = 'code-background';
    document.body.appendChild(canvas);

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+-=[]{}|;:,.<>?';
    const particles = [];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('code-particle');
        particle.textContent = characters[Math.floor(Math.random() * characters.length)];
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = -20 + 'px';
        particle.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        canvas.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            particle.remove();
            particles.splice(particles.indexOf(particle), 1);
        }, 5000); // Remove after animation
    }

    setInterval(createParticle, 100);

    // CSS animation for falling
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    styleSheet.sheet.insertRule(`
        @keyframes fall {
            0% { top: -20px; opacity: 1; }
            100% { top: 100vh; opacity: 0; }
        }
    `, 0);
}

async function fetchGitHubProjects() {
    const username = "arun3676";
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