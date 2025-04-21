// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const header = document.querySelector('.main-header');
        const nav = document.querySelector('.main-nav');

        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        // Insert button before nav
        header.querySelector('.container').insertBefore(mobileMenuBtn, nav);

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };

    // Only create mobile nav if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileNav();
    }

    // Resize event listener
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileNav();
        }
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Super simple parallax effect - final attempt
    const parallaxBg = document.getElementById('parallax-bg');

    if (parallaxBg) {
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const translateY = Math.min(scrollY * 0.3, 50); // Limit the movement

            // Move the background element using transform for better performance
            parallaxBg.style.transform = `translateY(${translateY}px)`;
        });
    }
});
