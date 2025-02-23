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
        particle.style.top = '-20px';
        particle.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        canvas.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            particle.remove();
            particles.splice(particles.indexOf(particle), 1);
        }, 5000);
    }

    setInterval(createParticle, 50);

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
    try {
        const username = "arun3676";
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        
        const container = document.getElementById("projects-container");
        if (!container) return;
        
        container.innerHTML = ''; // Clear existing content
        
        // Filter and sort repos
        const significantRepos = repos
            .filter(repo => !repo.fork && repo.description) // Only show repos with descriptions
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by most recently updated
            .slice(0, 6); // Show top 6 repos

        significantRepos.forEach(repo => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <div class="project-footer">
                    <span class="project-language">${repo.language || 'N/A'}</span>
                    <a href="${repo.html_url}" target="_blank" class="view-project">View Project</a>
                </div>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
    }
}

// Initialize on page load
window.onload = () => {
    createCodeBackground();
    fetchGitHubProjects();
};

// Handle form submission
document.getElementById("contact-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thanks for reaching out! Message functionality coming soon.");
});