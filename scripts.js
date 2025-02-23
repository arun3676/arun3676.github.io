// Matrix background animation with programming code
function createMatrixBackground() {
    const canvas = document.createElement('div');
    canvas.id = 'code-background';
    document.body.appendChild(canvas);

    // Real programming code snippets
    const codeSnippets = [
        'function(){', 'return', 'const', 'let', 'var', 'if(', 'else{', 'for(let i=0;',
        'document.', 'addEventListener', 'window.', 'console.log', '.push(', '.apply(',
        'getElementById', '});', '};', '=>',
        'async', 'await', 'try{', 'catch(', 'finally{',
        'class', 'extends', 'new', 'this.',
        'Object.', 'Array.', 'String.', 'Number.',
        '&&', '||', '===', '!==', '>=', '<=',
        '{data:', '[index]', '.map(', '.filter(',
        'setTimeout(', 'clearTimeout',
        'Promise.', '.then(', '.catch(',
        'null', 'undefined', 'true', 'false'
    ];

    function createCodeParticle() {
        const particle = document.createElement('div');
        particle.classList.add('code-particle');
        
        // Random code snippet
        particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        particle.style.top = '-20px';
        
        // Random animation duration between 3 and 8 seconds
        const duration = Math.random() * 5 + 3;
        
        // Random delay before starting
        const delay = Math.random() * 2;
        
        particle.style.animation = `fall ${duration}s ${delay}s linear`;
        particle.style.opacity = Math.random() * 0.5 + 0.5; // Varying opacity
        
        canvas.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Create multiple particles initially
    for(let i = 0; i < 50; i++) {
        createCodeParticle();
    }

    // Create new particles periodically
    setInterval(createCodeParticle, 100);

    // Add CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            from {
                transform: translateY(0) translateX(0);
                opacity: 0.8;
            }
            to {
                transform: translateY(${window.innerHeight + 100}px) translateX(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}