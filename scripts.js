// Matrix background animation
function createMatrixBackground() {
    const canvas = document.createElement('div');
    canvas.id = 'code-background';
    document.body.appendChild(canvas);

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('code-particle');
        
        // Random character
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        particle.textContent = characters[Math.floor(Math.random() * characters.length)];
        
        // Random position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-20px';
        
        // Random animation duration between 2 and 5 seconds
        const duration = Math.random() * 3 + 2;
        particle.style.animation = `fall ${duration}s linear`;
        
        canvas.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Create new particles periodically
    setInterval(createParticle, 50);

    // Add CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(${window.innerHeight}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// GitHub projects
async function fetchGitHubProjects() {
    try {
        const username = "arun3676";
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        
        const container = document.getElementById("projects-container");
        container.innerHTML = ''; // Clear existing content
        
        repos.forEach(repo => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Start matrix background
    createMatrixBackground();
    
    // Fetch GitHub projects
    fetchGitHubProjects();
    
    // Contact form handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Thanks for reaching out! Automation coming soon.");
        });
    }
});

// Handle clicks on projects
document.addEventListener('click', function(event) {
    if (event.target.closest('.project')) {
        const link = event.target.closest('.project').querySelector('a').href;
        window.open(link, '_blank');
    }
});