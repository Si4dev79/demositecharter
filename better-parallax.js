// Better parallax effect for fishing charter
document.addEventListener('DOMContentLoaded', function() {
    console.log('Better parallax script loaded');

    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }

    // Create a background container for the parallax effect
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'parallax-container';

    // Style the container
    Object.assign(parallaxContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: '-1'
    });

    // Create the actual parallax background
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';

    // Style the background
    Object.assign(parallaxBg.style, {
        position: 'absolute',
        top: '-50px', // Adjusted for better initial position
        left: '0',
        width: '100%',
        height: 'calc(100% + 150px)', // Adjusted height for movement
        backgroundImage: 'url("index.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%', // Position more toward the top fifth
        transition: 'transform 0.1s ease-out',
        opacity: '0.9' // Slightly increased opacity
    });

    // Add the background to the container
    parallaxContainer.appendChild(parallaxBg);

    // Add the container to the header (before any other elements)
    header.insertBefore(parallaxContainer, header.firstChild);

    // Add a gradient overlay to improve text visibility
    const overlay = document.createElement('div');
    overlay.className = 'header-overlay';

    // Style the overlay
    Object.assign(overlay.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.7) 0%, rgba(0, 102, 153, 0.6) 100%)',
        zIndex: '-1'
    });

    // Add the overlay to the header
    header.insertBefore(overlay, header.firstChild);

    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        // Move the background downward as user scrolls down (standard parallax)
        const translateY = Math.min(scrollY * 0.2, 60); // 20% of scroll, max 60px
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

    console.log('Better parallax effect initialized');
});
