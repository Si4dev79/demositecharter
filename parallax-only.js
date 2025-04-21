// Standalone parallax effect for fishing charter website
document.addEventListener('DOMContentLoaded', function() {
    // Create the parallax background element
    const header = document.querySelector('.main-header');
    
    if (!header) {
        console.error('Header element not found');
        return;
    }
    
    // Remove any existing parallax elements to avoid conflicts
    const existingParallax = document.getElementById('parallax-bg');
    if (existingParallax) {
        existingParallax.remove();
    }
    
    // Create a new parallax background element
    const parallaxBg = document.createElement('div');
    parallaxBg.id = 'parallax-bg';
    parallaxBg.style.position = 'absolute';
    parallaxBg.style.top = '0';
    parallaxBg.style.left = '0';
    parallaxBg.style.width = '100%';
    parallaxBg.style.height = '200%'; // Extra height for movement
    parallaxBg.style.backgroundImage = 'url("index.jpg")';
    parallaxBg.style.backgroundSize = 'cover';
    parallaxBg.style.backgroundPosition = 'center top';
    parallaxBg.style.opacity = '0.3';
    parallaxBg.style.zIndex = '-2';
    
    // Make sure the header has the right styles
    header.style.position = 'relative';
    header.style.overflow = 'hidden';
    
    // Insert the parallax background as the first child of the header
    header.insertBefore(parallaxBg, header.firstChild);
    
    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        const translateY = Math.min(scrollY * 0.5, 100); // 50% of scroll, max 100px
        parallaxBg.style.transform = `translateY(${translateY}px)`;
    }
    
    // Remove any existing scroll event listeners (to avoid conflicts)
    window.onscroll = null;
    
    // Add the scroll event listener
    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // Initial call to set the correct position
    updateParallax();
    
    console.log('Parallax effect initialized');
});
