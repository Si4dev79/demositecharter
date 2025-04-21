// Minimal parallax effect that preserves original design
document.addEventListener('DOMContentLoaded', function() {
    console.log('Minimal parallax script loaded');
    
    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }
    
    // Create a background element for parallax
    const parallaxBg = document.createElement('div');
    parallaxBg.id = 'parallax-bg';
    
    // Style the background element to match the existing design
    Object.assign(parallaxBg.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'url("index.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: '-2', // Below the existing ::before overlay
        opacity: '0.4' // Subtle background
    });
    
    // Add the background element to the header
    header.insertBefore(parallaxBg, header.firstChild);
    
    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        // Very subtle movement
        const translateY = Math.min(scrollY * 0.1, 20); // 10% of scroll, max 20px
        parallaxBg.style.transform = `translateY(${translateY}px)`;
        
        // Keep the original header shrink effect
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
    
    console.log('Minimal parallax effect initialized');
});
