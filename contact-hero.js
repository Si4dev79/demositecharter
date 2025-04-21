document.addEventListener('DOMContentLoaded', function() {
    // Add bubbles to the contact hero section
    const contactHero = document.querySelector('.contact-hero');
    
    // Create bubbles
    for (let i = 0; i < 10; i++) {
        createBubble(contactHero);
    }
});

// Create a bubble element
function createBubble(parent) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Random size between 10px and 50px
    const size = Math.floor(Math.random() * 40) + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position
    const posX = Math.floor(Math.random() * 100);
    bubble.style.left = `${posX}%`;
    bubble.style.bottom = '-50px';
    
    // Random animation duration between 5s and 15s
    const duration = Math.floor(Math.random() * 10) + 5;
    bubble.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    const delay = Math.floor(Math.random() * 5);
    bubble.style.animationDelay = `${delay}s`;
    
    parent.appendChild(bubble);
}
