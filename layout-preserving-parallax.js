// Layout-preserving parallax effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('Layout-preserving parallax script loaded');

    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }

    // Create a background element for parallax
    const parallaxBg = document.createElement('div');
    parallaxBg.id = 'parallax-bg';

    // Style the background element
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
        zIndex: '-2' // Below the ::before overlay
    });

    // Add the background element to the header
    header.insertBefore(parallaxBg, header.firstChild);

    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        const translateY = Math.min(scrollY * 0.3, 50); // 30% of scroll, max 50px
        parallaxBg.style.transform = `translateY(${translateY}px)`;

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

    console.log('Layout-preserving parallax effect initialized');
});
