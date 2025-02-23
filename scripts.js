// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.getElementById('matrix-background').appendChild(canvas);

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Random start position above screen
    }

    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green text
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px Fira Code, monospace`;

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw the character
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(char, x, y);

            // Reset drop to top when it reaches bottom
            if (y > canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }

    // Animate
    setInterval(draw, 33); // ~30fps
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
                <p>${repo.description || ""}</p>
                <a href="${repo.html_url}" target="_blank">View Source →</a>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        const container = document.getElementById("projects-container");
        if (container) {
            container.innerHTML = '<p style="color: var(--neon-green); text-align: center;">Loading projects...</p>';
        }
    }
}

// Animate links on hover
function initializeLinkAnimations() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'text-shadow 0.3s ease';
            link.style.textShadow = '0 0 10px var(--neon-green)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
        });
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
    fetchGitHubProjects();
    initializeLinkAnimations();
});

// Handle window resize
window.addEventListener('resize', () => {
    // The matrix rain will handle itself through the canvas resize event
});