// Parallax effect based on web developer landing page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Web developer parallax script loaded');
    
    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }
    
    // Set up the header for parallax
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.width = '100%';
    header.style.zIndex = '1000';
    header.style.transition = 'all 0.3s ease';
    
    // Add background image
    header.style.backgroundImage = 'url("index.jpg")';
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center 0';
    
    // Add padding to body to prevent content from being hidden under fixed header
    document.body.style.paddingTop = header.offsetHeight + 'px';
    
    // Navbar scroll effect - from web developer landing page
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            header.style.height = '70px';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            header.style.height = '80px';
        }
    });
    
    console.log('Web developer parallax effect initialized');
});
