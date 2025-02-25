// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initializeLoadingScreen();
    createMatrixRain();
    initializeTypewriter();
    initializeNavigation();
    fetchGitHubProjects();
    initializeThemeToggle();
    initializeMusicPlayers();
    initializeAIMusic();
    initializeThoughtSubmission();
    initializeContactForm();
    initializeModalClosers();
    initializeBackToTop();
    initializeProjectFilters();
    
    // Initialize any animations
    initializeLinkAnimations();
    initializeAvatarMatrix();
});

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    });
}

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

    // Matrix characters - expanded set
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?~`abcdefghijklmnopqrstuvwxyz';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops with random positions
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Random start position above screen
    }

    // Add some color variety
    const matrixColors = [
        '#0f0',     // Classic green
        '#0ff',     // Cyan
        '#0f8'      // Mint
    ];

    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw characters
        ctx.font = `${fontSize}px Fira Code, monospace`;

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Random color from our palette (bias toward green)
            const colorIndex = Math.random() < 0.8 ? 0 : Math.floor(Math.random() * matrixColors.length);
            ctx.fillStyle = matrixColors[colorIndex];
            
            // Calculate position
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Draw the character
            ctx.fillText(char, x, y);

            // Random brightness effect for some characters
            if (Math.random() > 0.99) {
                ctx.fillStyle = '#fff'; // Brighter white for emphasis
                ctx.fillText(char, x, y);
            }

            // Reset drop to top when it reaches bottom or randomly
            if (y > canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            }
            // Add randomness to the speed as well
            drops[i] += Math.random() * 0.5 + 0.5;
        }

        // Schedule next frame
        requestAnimationFrame(draw);
    }

    // Start animation
    requestAnimationFrame(draw);
}

// Typewriter effect for the intro section
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    const messages = [
        "Software Engineer & AI Enthusiast",
        "Building at the intersection of AI and creativity",
        "Exploring the future of technology",
        "Learning, building, and sharing"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If finished typing the message
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } 
        // If finished deleting the message
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500; // Pause before typing next message
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fetch and display GitHub projects
async function fetchGitHubProjects() {
    try {
        const username = "arun3676";
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub projects');
        }
        
        const repos = await response.json();
        
        const container = document.getElementById("projects-container");
        if (!container) return;
        
        // Remove loading indicator
        const loadingElement = container.querySelector('.project-loading');
        if (loadingElement) {
            container.removeChild(loadingElement);
        }
        
        // Filter and sort repos
        const significantRepos = repos
            .filter(repo => !repo.fork && repo.description) // Only show repos with descriptions
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by most recently updated
            .slice(0, 6); // Show top 6 repos
        
        // Define project categories (in a real scenario, this would come from repo topics or other metadata)
        const projectCategories = {
            "learning-path-generator": ["ai", "web"],
            "data-analysis-toolkit": ["data", "ai"],
            "ev-charging-dashboard": ["web", "data"],
            "matrix-portfolio": ["web"],
            "llm-titanic-analysis": ["ai", "data"],
            "ai-music-generator": ["ai"]
        };
        
        // Assign default categories based on repo name or use existing ones
        significantRepos.forEach(repo => {
            const lowerCaseName = repo.name.toLowerCase();
            let categories = [];
            
            // Look for keywords in repo name and description to assign categories
            if (lowerCaseName.includes('ai') || lowerCaseName.includes('ml') || 
                lowerCaseName.includes('model') || lowerCaseName.includes('neural') ||
                lowerCaseName.includes('learn')) {
                categories.push('ai');
            }
            
            if (lowerCaseName.includes('web') || lowerCaseName.includes('app') || 
                lowerCaseName.includes('ui') || lowerCaseName.includes('frontend') ||
                lowerCaseName.includes('react') || lowerCaseName.includes('vue') ||
                lowerCaseName.includes('angular')) {
                categories.push('web');
            }
            
            if (lowerCaseName.includes('data') || lowerCaseName.includes('analytics') || 
                lowerCaseName.includes('dashboard') || lowerCaseName.includes('visualization') ||
                lowerCaseName.includes('analysis')) {
                categories.push('data');
            }
            
            // If no categories were assigned, use "web" as default
            if (categories.length === 0) {
                categories = ['web'];
            }
            
            // Create project element
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.dataset.categories = categories.join(' ');
            
            // Generate tags HTML
            const tagsHTML = categories.map(tag => 
                `<span class="project-tag">${tag}</span>`
            ).join('');
            
            projectDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || ""}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Source
                    </a>
                    <a href="#" class="view-details" data-repo="${repo.name}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        Details
                    </a>
                </div>
            `;
            
            container.appendChild(projectDiv);
            
            // Add event listener for the "View Details" button
            const detailsButton = projectDiv.querySelector('.view-details');
            detailsButton.addEventListener('click', (e) => {
                e.preventDefault();
                openProjectModal(repo);
            });
        });
        
        // Initialize filter buttons after projects are loaded
        initializeFilterButtons();
        
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        const container = document.getElementById("projects-container");
        if (container) {
            container.innerHTML = '<div class="error-message"><p>Could not load projects at this time. Please try again later.</p></div>';
        }
    }
}

// Open project modal with details
function openProjectModal(repo) {
    const modal = document.getElementById('project-modal');
    const projectDetails = modal.querySelector('.project-details');
    
    // Sample tech stack and features (in a real app, this would come from repo data)
    const techStack = ['React', 'Node.js', 'MongoDB', 'Express'];
    const features = [
        'User authentication and authorization',
        'Real-time data visualization',
        'API integration with third-party services',
        'Responsive design for all devices'
    ];
    
    projectDetails.innerHTML = `
        <h2>${repo.name}</h2>
        <p class="project-description">${repo.description}</p>
        
        <div class="project-section">
            <h3>Tech Stack</h3>
            <div class="tech-stack">
                ${techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="project-section">
            <h3>Key Features</h3>
            <ul class="feature-list">
                ${features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="project-actions">
            <a href="${repo.html_url}" target="_blank" class="btn primary-btn">View Source</a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn secondary-btn">Live Demo</a>` : ''}
        </div>
    `;
    
    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Initialize project filter buttons
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the filter value
            const filter = button.dataset.filter;
            
            // Filter the projects
            filterProjects(filter);
        });
    });
}

// Filter projects based on category
function filterProjects(filter) {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        const categories = project.dataset.categories ? project.dataset.categories.split(' ') : [];
        
        if (filter === 'all' || categories.includes(filter)) {
            project.style.display = 'flex';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize filter buttons after projects are loaded
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Set "All" as active by default
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Apply filter
            const projects = document.querySelectorAll('.project');
            
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.categories.includes(filter)) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle theme class
            body.classList.toggle('light-theme');
            
            // Save preference
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            
            // Show toast notification
            showToast(`Switched to ${currentTheme} mode`);
        });
    }
}

// Initialize music players
function initializeMusicPlayers() {
    const playButtons = document.querySelectorAll('.play-button');
    let currentAudio = null;
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const trackSrc = button.getAttribute('data-track');
            
            // If there's already an audio playing, pause it
            if (currentAudio) {
                currentAudio.pause();
                const previousButton = document.querySelector(`.play-button[data-track="${currentAudio.src.split('/').pop()}"]`);
                if (previousButton) {
                    previousButton.classList.remove('playing');
                }
            }
            
            // If the clicked button was already playing, just pause it
            if (currentAudio && currentAudio.src.includes(trackSrc) && !currentAudio.paused) {
                button.classList.remove('playing');
                currentAudio = null;
                return;
            }
            
            // Create a new audio element
            const audio = new Audio(trackSrc);
            currentAudio = audio;
            
            // Update button state
            button.classList.add('playing');
            
            // Get progress bar and time elements
            const progressBar = button.parentElement.querySelector('.progress');
            const currentTimeDisplay = button.parentElement.querySelector('.current-time');
            const totalTimeDisplay = button.parentElement.querySelector('.total-time');
            
            // Initialize audio visualizer
            const visualizerCanvas = button.closest('.music-player').querySelector('.visualizer');
            initializeVisualizer(audio, visualizerCanvas);
            
            // Play the audio
            audio.play();
            
            // Update progress bar and time displays
            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Update current time display
                const currentMinutes = Math.floor(audio.currentTime / 60);
                const currentSeconds = Math.floor(audio.currentTime % 60);
                currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
            });
            
            // Set total time once metadata is loaded
            audio.addEventListener('loadedmetadata', () => {
                const totalMinutes = Math.floor(audio.duration / 60);
                const totalSeconds = Math.floor(audio.duration % 60);
                totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
            });
            
            // Reset when finished
            audio.addEventListener('ended', () => {
                button.classList.remove('playing');
                progressBar.style.width = '0%';
                currentAudio = null;
            });
            
            // Allow clicking on progress bar to seek
            const progressContainer = button.parentElement.querySelector('.progress-bar');
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const clickPosition = (e.clientX - rect.left) / rect.width;
                audio.currentTime = clickPosition * audio.duration;
            });
        });
    });
}

// Initialize audio visualizer
function initializeVisualizer(audio, canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Draw the visualizer
    function draw() {
        requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            
            // Use a gradient for visualization
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0f0');
            gradient.addColorStop(0.5, '#0ff');
            gradient.addColorStop(1, '#00f');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
    
    draw();
}

// Initialize AI Music Generator
function initializeAIMusic() {
    const generateMusicBtn = document.getElementById('generate-ai-music');
    const aiMusicGenerator = document.getElementById('ai-music-generator');
    const generateButton = document.getElementById('generate-button');
    const aiMusicModal = document.getElementById('ai-music-modal');
    
    // Toggle the AI Music Generator section
    if (generateMusicBtn && aiMusicGenerator) {
        generateMusicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aiMusicGenerator.classList.toggle('hidden');
            
            // Scroll to the generator if it's now visible
            if (!aiMusicGenerator.classList.contains('hidden')) {
                aiMusicGenerator.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Music style buttons
    const styleButtons = document.querySelectorAll('.style-btn');
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            styleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Handle generate button click
    if (generateButton && aiMusicModal) {
        generateButton.addEventListener('click', () => {
            const musicPrompt = document.getElementById('music-prompt').value;
            const selectedStyle = document.querySelector('.style-btn.active');
            
            if (!musicPrompt) {
                showToast('Please describe the music you want to generate', 'error');
                return;
            }
            
            // Show generation status
            const generationStatus = document.querySelector('.generation-status');
            generationStatus.classList.remove('hidden');
            
            // Simulate generation process (in a real app, this would call an API)
            setTimeout(() => {
                generationStatus.classList.add('hidden');
                
                // Show the AI music modal
                aiMusicModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Initialize the generated music visualizer
                const canvas = aiMusicModal.querySelector('.generated-visualizer');
                simulateVisualizer(canvas);
                
                // Create a dummy audio for demo purposes
                const dummyAudio = new Audio('audio/Maa Meri.mp3'); // Reuse existing audio for demo
                
                // Play button functionality
                const playButton = aiMusicModal.querySelector('.play-generated-button');
                playButton.addEventListener('click', () => {
                    if (dummyAudio.paused) {
                        dummyAudio.play();
                        playButton.classList.add('playing');
                    } else {
                        dummyAudio.pause();
                        playButton.classList.remove('playing');
                    }
                });
                
                // Download button functionality
                const downloadButton = aiMusicModal.querySelector('.download-btn');
                downloadButton.addEventListener('click', () => {
                    showToast('Demo: Music download started');
                });
            }, 3000);
        });
    }
}

// Simulate audio visualizer without actual audio
function simulateVisualizer(canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const bars = 60;
    const barWidth = canvas.width / bars;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < bars; i++) {
            // Generate random heights for a more dynamic effect
            const height = Math.random() * canvas.height * 0.8;
            
            // Use a gradient for visualization
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0f0');
            gradient.addColorStop(0.5, '#0ff');
            gradient.addColorStop(1, '#00f');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
}

// Initialize avatar matrix effect
function initializeAvatarMatrix() {
    const avatar = document.querySelector('.avatar-matrix');
    if (!avatar) return;
    
    const avatarCanvas = document.createElement('canvas');
    avatarCanvas.width = avatar.clientWidth;
    avatarCanvas.height = avatar.clientHeight;
    avatar.appendChild(avatarCanvas);
    
    const ctx = avatarCanvas.getContext('2d');
    
    // Matrix characters
    const chars = 'ARUN01'.split('');
    const fontSize = 14;
    const columns = avatarCanvas.width / fontSize;
    const rows = Math.ceil(avatarCanvas.height / fontSize);
    
    // Initialize the character grid
    const grid = [];
    for (let i = 0; i < columns; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = {
                char: chars[Math.floor(Math.random() * chars.length)],
                opacity: Math.random(),
                speed: Math.random() * 0.1 + 0.01
            };
        }
    }
    
    function drawAvatar() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, avatarCanvas.width, avatarCanvas.height);
        
        ctx.font = `${fontSize}px Fira Code, monospace`;
        
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = grid[i][j];
                
                // Update opacity with a sine wave effect
                cell.opacity += cell.speed;
                const opacity = Math.sin(cell.opacity) * 0.5 + 0.5;
                
                // Set character color
                ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                
                // Randomly change character
                if (Math.random() < 0.01) {
                    cell.char = chars[Math.floor(Math.random() * chars.length)];
                }
                
                // Draw character
                ctx.fillText(cell.char, i * fontSize, j * fontSize);
            }
        }
        
        requestAnimationFrame(drawAvatar);
    }
    
    drawAvatar();
}

// Initialize thought submission
function initializeThoughtSubmission() {
    const thoughtForm = document.querySelector('.thought-form');
    const thoughtInput = document.getElementById('thought-input');
    const thoughtAuthor = document.getElementById('thought-author');
    const submitButton = document.getElementById('submit-thought');
    
    if (thoughtForm && submitButton) {
        submitButton.addEventListener('click', () => {
            const thought = thoughtInput.value.trim();
            const author = thoughtAuthor.value.trim() || 'Anonymous';
            
            if (!thought) {
                showToast('Please enter a thought to share', 'error');
                return;
            }
            
            // In a real app, this would submit to a backend
            // For the demo, add the thought to the quotes container
            const quotesContainer = document.querySelector('.quotes-container');
            
            const newQuote = document.createElement('blockquote');
            newQuote.innerHTML = `
                <p>"${thought}"</p>
                <cite>- ${author}</cite>
            `;
            
            // Add animation class
            newQuote.classList.add('new-quote');
            
            // Add to the container
            quotesContainer.prepend(newQuote);
            
            // Clear form
            thoughtInput.value = '';
            thoughtAuthor.value = '';
            
            // Show success message
            showToast('Your thought has been shared!');
            
            // Scroll to the new quote
            newQuote.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // In a real app, this would submit to a backend
            // For the demo, just show a success message
            showToast('Message sent successfully! I\'ll get back to you soon.');
            
            // Clear form
            contactForm.reset();
        });
    }
}

// Initialize modal closers
function initializeModalClosers() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show button when page is scrolled down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'error') {
        toast.classList.add('error');
    }
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Animate links on hover
function initializeLinkAnimations() {
    document.querySelectorAll('a:not(nav a)').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'text-shadow 0.3s ease';
            link.style.textShadow = '0 0 10px var(--neon-green)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
        });
    });
}