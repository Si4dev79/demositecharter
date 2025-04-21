document.addEventListener('DOMContentLoaded', function() {
    // Add bubbles to the contact hero section
    const contactHero = document.querySelector('.contact-hero');
    
    // Create bubbles
    for (let i = 0; i < 10; i++) {
        createBubble(contactHero);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Form validation and submission
    initFormValidation();
    
    // Map interaction
    initMapInteraction();
});

// Create a bubble element
function createBubble(parent) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Random size between 10px and 50px
    const size = Math.floor(Math.random() * 40) + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position
    const posX = Math.floor(Math.random() * 100);
    bubble.style.left = `${posX}%`;
    bubble.style.bottom = '-50px';
    
    // Random animation duration between 5s and 15s
    const duration = Math.floor(Math.random() * 10) + 5;
    bubble.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    const delay = Math.floor(Math.random() * 5);
    bubble.style.animationDelay = `${delay}s`;
    
    parent.appendChild(bubble);
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
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
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Add focus and blur events to form inputs
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validate on blur
            validateInput(this);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Hide form and show success message
            document.querySelector('.contact-form-container form').style.display = 'none';
            document.querySelector('.form-success').style.display = 'block';
            
            // Reset form after 5 seconds
            setTimeout(() => {
                document.querySelector('.contact-form-container form').style.display = 'block';
                document.querySelector('.form-success').style.display = 'none';
                contactForm.reset();
            }, 5000);
        }
    });
    
    // Input validation function
    function validateInput(input) {
        const value = input.value.trim();
        const errorMessage = input.nextElementSibling;
        
        // Skip validation if not required and empty
        if (!input.hasAttribute('required') && value === '') {
            input.classList.remove('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'none';
            }
            return true;
        }
        
        // Required field validation
        if (input.hasAttribute('required') && value === '') {
            input.classList.add('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.textContent = 'This field is required';
                errorMessage.style.display = 'block';
            }
            return false;
        }
        
        // Email validation
        if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('error');
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.style.display = 'block';
                }
                return false;
            }
        }
        
        // Phone validation (simple)
        if (input.id === 'phone' && value !== '') {
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(value)) {
                input.classList.add('error');
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.textContent = 'Please enter a valid phone number';
                    errorMessage.style.display = 'block';
                }
                return false;
            }
        }
        
        // If all validations pass
        input.classList.remove('error');
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.style.display = 'none';
        }
        return true;
    }
}

// Initialize map interaction
function initMapInteraction() {
    const mapContainer = document.querySelector('.map-container');
    
    // Add hover effect to map container
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Get directions button
    const directionsBtn = document.querySelector('.get-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://www.google.com/maps/dir//Oranjestad,+Aruba', '_blank');
        });
    }
}

// Add keyframe animation for bubble rise
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bubbleRise {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0;
            }
            20% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
