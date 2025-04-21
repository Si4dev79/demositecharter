// Final attempt at parallax effect - extremely simple implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Final parallax script loaded');
    
    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }
    
    // Store the original background color
    const originalBgColor = getComputedStyle(header).backgroundColor;
    
    // Set up the header for parallax
    header.style.position = 'relative';
    header.style.overflow = 'hidden';
    
    // Create the parallax background element
    const parallaxBg = document.createElement('div');
    parallaxBg.id = 'final-parallax-bg'; // Unique ID to avoid conflicts
    
    // Style the parallax background
    Object.assign(parallaxBg.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '200%', // Extra height for movement
        backgroundImage: 'url("index.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: '0.3',
        zIndex: '-1'
    });
    
    // Add the parallax background to the header
    header.insertBefore(parallaxBg, header.firstChild);
    
    // Create a function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        const translateY = Math.min(scrollY * 0.5, 100); // 50% of scroll, max 100px
        parallaxBg.style.transform = `translateY(${translateY}px)`;
    }
    
    // Add the scroll event listener
    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // Initial call
    updateParallax();
    
    console.log('Parallax effect initialized');
});
