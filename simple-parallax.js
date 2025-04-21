// Simple parallax effect for fishing charter
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple parallax script loaded');
    
    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }
    
    // Set the background image directly on the header
    header.style.backgroundImage = 'url("index.jpg")';
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center 25%';
    header.style.position = 'relative'; // Ensure relative positioning
    
    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        const newPosition = `center calc(25% + ${scrollY * 0.1}px)`;
        header.style.backgroundPosition = newPosition;
        
        // Optional: Add a subtle shrink effect to the header on scroll
        if (scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.height = '70px';
        } else {
            header.style.padding = '15px 0';
            header.style.height = '80px';
        }
    }
    
    // Add the scroll event listener
    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // Initial call
    updateParallax();
    
    console.log('Simple parallax effect initialized');
});
