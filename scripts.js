// Comprehensive list of code snippets for a more realistic effect
const codeSnippets = [
    // Python Data Science
    'import numpy as np',
    'import pandas as pd',
    'import tensorflow as tf',
    'from sklearn.model_selection import train_test_split',
    'def preprocess_data(df: pd.DataFrame):',
    'class NeuralNetwork(nn.Module):',
    'def forward(self, x: Tensor):',
    '@torch.no_grad()',
    
    // AI/ML Code
    'model.fit(X_train, y_train)',
    'predictions = model.predict(X_test)',
    'accuracy = accuracy_score(y_true, y_pred)',
    'loss = criterion(outputs, labels)',
    'optimizer.zero_grad()',
    'loss.backward()',
    
    // JavaScript/TypeScript
    'async function fetchData() {',
    'const response = await fetch(url)',
    'const data = await response.json()',
    'export interface IDataModel {',
    'private readonly client: Client;',
    'constructor(config: Config) {',
    'npm install tensorflow@latest',
    'git commit -m "Update models"',
    
    // SQL Queries
    'SELECT * FROM users WHERE',
    'JOIN transactions ON',
    'GROUP BY user_id HAVING',
    'CREATE TABLE IF NOT EXISTS',
    
    // Docker/DevOps
    'FROM python:3.9-slim',
    'COPY requirements.txt .',
    'RUN pip install --no-cache-dir',
    'EXPOSE 8080',
    
    // Configuration
    '{',
    '  "model_config": {',
    '  "learning_rate": 0.001,',
    '  "batch_size": 32,',
    '  "epochs": 100',
    '}',
    
    // More AI/ML
    'transformer = TransformerModel(',
    'attention_weights = self.attention(',
    'embeddings = model.encode(text)',
    'tokens = tokenizer.encode(text)',
];

// Create and manage the matrix background
function createMatrixBackground() {
    const canvas = document.createElement('div');
    canvas.id = 'code-background';
    document.body.appendChild(canvas);

    function createCodeParticle() {
        const particle = document.createElement('div');
        particle.classList.add('code-particle');
        
        // Select random code snippet
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        particle.textContent = snippet;
        
        // Random position and styling
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        particle.style.top = '-50px'; // Start above viewport
        
        // Random animation duration and delay
        const duration = Math.random() * 5 + 8; // 8-13 seconds
        const delay = Math.random() * 2;
        particle.style.animation = `fall ${duration}s ${delay}s linear`;
        
        // Random opacity
        particle.style.opacity = (Math.random() * 0.4 + 0.2).toString();
        
        canvas.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Create particles initially
    for(let i = 0; i < 30; i++) {
        createCodeParticle();
    }

    // Create new particles periodically
    setInterval(createCodeParticle, 200);

    // Add CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            from {
                transform: translateY(0) translateX(0);
            }
            to {
                transform: translateY(${window.innerHeight + 100}px) translateX(20px);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for reaching out! Message functionality coming soon.');
        });
    }
});

// Initialize everything when the window loads
window.onload = function() {
    // Start the matrix background
    createMatrixBackground();
    
    // Add click handlers for interactive elements
    document.querySelectorAll('.medium-article').forEach(article => {
        article.addEventListener('click', function(e) {
            if (!e.target.classList.contains('read-more')) {
                const link = this.querySelector('.read-more');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
    });

    // Add hover effect to code particles near mouse
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.code-particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const distance = Math.hypot(
                e.clientX - (rect.left + rect.width/2),
                e.clientY - (rect.top + rect.height/2)
            );
            
            if (distance < 100) {
                particle.style.textShadow = '0 0 15px rgba(0, 247, 255, 0.9)';
                particle.style.opacity = '0.9';
            } else {
                particle.style.textShadow = '';
                particle.style.opacity = particle.dataset.originalOpacity || '0.3';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const styleSheet = document.querySelector('style');
        if (styleSheet) {
            styleSheet.textContent = `
                @keyframes fall {
                    from {
                        transform: translateY(0) translateX(0);
                    }
                    to {
                        transform: translateY(${window.innerHeight + 100}px) translateX(20px);
                    }
                }
            `;
        }
    });
};