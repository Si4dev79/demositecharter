// Contact hero parallax effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact hero parallax script loaded');

    // Get the contact hero element
    const contactHero = document.querySelector('.contact-hero');
    if (!contactHero) {
        console.error('Contact hero element not found');
        return;
    }

    // Create a background element for parallax
    const parallaxBg = document.createElement('div');
    parallaxBg.id = 'contact-parallax-bg';

    // Style the background element to match the existing design
    Object.assign(parallaxBg.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '150%', // Extra height to allow for movement
        backgroundImage: 'url("images/contact-hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        zIndex: '-3', // Below everything
        opacity: '1' // Full opacity for the background image
    });

    // Create a water texture overlay
    const waterTexture = document.createElement('div');
    waterTexture.id = 'contact-water-texture';

    // Style the water texture
    Object.assign(waterTexture.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '150%', // Extra height to allow for movement
        background: 'url("images/water-texture.png") repeat',
        opacity: '0.1',
        zIndex: '-2', // Above background but below gradient
    });

    // Create a gradient overlay element
    const gradientOverlay = document.createElement('div');
    gradientOverlay.id = 'contact-gradient-overlay';

    // Style the gradient overlay
    Object.assign(gradientOverlay.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '150%', // Extra height to allow for movement
        background: 'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 77, 153, 0.7), rgba(0, 102, 204, 0.5))',
        zIndex: '-1' // Above the background image but below the content
    });

    // Add the background and overlay elements to the contact hero
    contactHero.insertBefore(parallaxBg, contactHero.firstChild);
    contactHero.insertBefore(waterTexture, contactHero.firstChild);
    contactHero.insertBefore(gradientOverlay, contactHero.firstChild);

    // Remove the background from the contact-hero element since we're adding it dynamically
    contactHero.style.background = 'none';

    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        // Adjust the movement speed to match the deep sea fishing page
        const translateY = Math.min(scrollY * 0.3, 150); // 30% of scroll, max 150px

        // Move all layers together at the same speed
        parallaxBg.style.transform = `translateY(${translateY}px)`;
        waterTexture.style.transform = `translateY(${translateY}px)`;
        gradientOverlay.style.transform = `translateY(${translateY}px)`;
    }

    // Add the scroll event listener
    window.addEventListener('scroll', updateParallax, { passive: true });

    // Initial call
    updateParallax();

    console.log('Contact hero parallax effect initialized');
});
