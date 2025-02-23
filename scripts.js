async function fetchGitHubProjects() {
    const username = "your-github-username"; // Replace with yours!
    const response = await fetch(`https://api.github.com/users/${arun3676}/repos`);
    const repos = await response.json();
    
    const container = document.getElementById("projects-container");
    repos.slice(0, 6).forEach(repo => { // Limit to 6 for now
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        container.appendChild(projectDiv);
    });
}

fetchGitHubProjects();