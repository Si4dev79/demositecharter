// WordPress-style Header Implementation
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    const topBar = document.querySelector('.top-bar');

    // Sticky header functionality
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky-active');
        } else {
            header.classList.remove('sticky-active');
        }

        // Parallax effect for header background
        const scrollY = window.scrollY;
        const translateY = Math.min(scrollY * 0.2, 30); // Reduced movement for subtler effect

        // Apply the parallax effect to the background
        if (header.style.backgroundImage) {
            header.style.backgroundPositionY = `${translateY}px`;
        }
    });

    // Mobile menu functionality
    const createMobileNav = () => {
        const nav = document.querySelector('.main-nav');

        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

            // Insert button in the header
            header.querySelector('.container').appendChild(mobileMenuBtn);

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
        }
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
});
