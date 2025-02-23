// Create starry background
function createStarryBackground() {
    const stars = document.createElement('div');
    stars.id = 'stars';
    document.body.appendChild(stars);
}

// Code animation with syntax highlighting
function createCodeBackground() {
    const snippets = [
        { text: 'for(', color: 'yellow' },
        { text: 'day', color: 'purple' },
        { text: ' = 1; ', color: 'yellow' },
        { text: 'day', color: 'purple' },
        { text: ' <= 7; ', color: 'yellow' },
        { text: 'day++', color: 'purple' },
        { text: ') {', color: 'yellow' },
        { text: 'if(', color: 'blue' },
        { text: 'week[', color: 'blue' },
        { text: 'day', color: 'yellow' },
        { text: '] === weekend', color: 'blue' },
        { text: ') {', color: 'blue' },
        { text: 'doRest()', color: 'green' },
        { text: '} else {', color: 'blue' },
        { text: 'hardWork(', color: 'orange' },
        { text: 'consistency', color: 'green' },
        { text: ')}', color: 'orange' }
    ];

    function createCodeParticle() {
        const snippet = snippets[Math.floor(Math.random() * snippets.length)];
        const particle = document.createElement('div');
        particle.classList.add('code-particle', `code-${snippet.color}`);
        particle.textContent = snippet.text;
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        particle.style.top = '-20px';
        
        const duration = Math.random() * 3 + 4;
        particle.style.animation = `fall ${duration}s linear`;
        
        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => particle.remove(), duration * 1000);
    }

    // Add CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            from { transform: translateY(0) translateX(0); opacity: 0.8; }
            to { transform: translateY(${window.innerHeight + 20}px) translateX(20px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Create particles periodically
    setInterval(createCodeParticle, 200);
}

// Fetch and display GitHub projects
async function fetchGitHubProjects() {
    try {
        const username = "arun3676";
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        
        const container = document.getElementById("projects-container");
        if (!container) return;
        
        container.innerHTML = '';
        
        const significantRepos = repos
            .filter(repo => !repo.fork && repo.description)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        significantRepos.forEach(repo => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <div class="project-footer">
                    <span class="project-language">${repo.language || 'N/A'}</span>
                    <a href="${repo.html_url}" target="_blank" class="read-more">View Project</a>
                </div>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
    }
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    createStarryBackground();
    createCodeBackground();
    fetchGitHubProjects();

    // Handle contact form
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for reaching out! Message functionality coming soon.');
        });
    }
});