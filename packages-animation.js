// Animation for package cards
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animation
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                // Add a slight delay based on data attribute or position
                setTimeout(() => {
                    element.classList.add('visible');
                }, element.dataset.delay || 0);
            }
        });
    }

    // Initial check on page load
    handleScrollAnimation();

    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Add hover effects for package cards
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add pulsing effect to book now buttons
    const bookButtons = document.querySelectorAll('.book-now-btn');
    
    bookButtons.forEach(button => {
        setInterval(() => {
            button.classList.add('pulse');
            
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 1000);
        }, 3000);
    });
});

// Add pulse animation to CSS
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
        }
        
        .pulse {
            animation: pulse 1s ease;
        }
    `;
    document.head.appendChild(style);
});
