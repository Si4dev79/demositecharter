// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const header = document.querySelector('.main-header');
        const nav = document.querySelector('.main-nav');

        // Only create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
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
        }
    };

    // Create mobile nav immediately regardless of screen width
    createMobileNav();

    // Handle initial state based on screen width
    if (window.innerWidth >= 768) {
        const nav = document.querySelector('.main-nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (nav) nav.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
    } else {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
    }

    // Resize event listener
    window.addEventListener('resize', function() {
        const nav = document.querySelector('.main-nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        if (window.innerWidth >= 768) {
            if (nav) nav.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
        } else {
            if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
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
// Minimal parallax effect that preserves original design
document.addEventListener('DOMContentLoaded', function() {
    console.log('Minimal parallax script loaded');

    // Get the header element
    const header = document.querySelector('.main-header');
    if (!header) {
        console.error('Header element not found');
        return;
    }

    // Create a background element for parallax
    const parallaxBg = document.createElement('div');
    parallaxBg.id = 'parallax-bg';

    // Style the background element to match the existing design
    Object.assign(parallaxBg.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: '-2', // Below the existing ::before overlay
        opacity: '0.4' // Subtle background
    });

    // Add the background element to the header
    header.insertBefore(parallaxBg, header.firstChild);

    // Function to update the parallax effect
    function updateParallax() {
        const scrollY = window.scrollY;
        // Very subtle movement
        const translateY = Math.min(scrollY * 0.1, 20); // 10% of scroll, max 20px
        parallaxBg.style.transform = `translateY(${translateY}px)`;

        // Keep the original header shrink effect
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

    console.log('Minimal parallax effect initialized');
});
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
        backgroundImage: 'url("contact-hero.jpg")',
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
        background: 'url("water-texture.png") repeat',
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
// Contact page animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page animations loaded');

    // Initialize scroll animations
    initScrollAnimations();

    // Form validation and submission
    initFormValidation();

    // Map interaction
    initMapInteraction();
});

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
    if (!contactForm) return;

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
            window.open('https://www.google.com/maps/dir//Oranjestad,+Aruba', '_blank', 'noopener,noreferrer');
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    const bookingOverlay = document.getElementById('bookingOverlay');
    const closeBookingBtn = document.getElementById('closeBooking');
    const collapseMenuBtn = document.getElementById('collapseMenu');
    const bookingPopup = document.querySelector('.booking-popup');
    const bookingSteps = document.querySelectorAll('.booking-step');
    const formSteps = document.querySelectorAll('.booking-form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const doneButton = document.getElementById('doneBooking');
    const serviceCards = document.querySelectorAll('.service-card');
    const calendarDays = document.querySelectorAll('.calendar-day');
    const timeSlots = document.querySelectorAll('.time-slot-option');

    // Booking data object
    let bookingData = {
        service: 'half-day-morning',
        serviceName: 'Half-Day Morning',
        price: 460,
        participants: 4,
        date: 'May 21, 2025',
        time: '8:00 AM',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
    };

    // Open booking popup when "Book Now" is clicked
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Pre-select the service based on which button was clicked
            const buttonText = this.textContent.trim();
            if (buttonText.includes('BOOK NOW')) {
                // Get the package title from the closest package card
                const packageCard = this.closest('.package-details');
                const packageTitle = packageCard.querySelector('.package-title').textContent.trim();

                if (packageTitle.includes('4 HRS')) {
                    // Check if it's morning or afternoon based on the time slot
                    const timeSlots = packageCard.querySelectorAll('.time-slot');
                    let isAfternoon = false;

                    timeSlots.forEach(slot => {
                        if (slot.textContent.includes('1-5 PM')) {
                            isAfternoon = true;
                        }
                    });

                    if (isAfternoon) {
                        preSelectService('half-day-afternoon');
                    } else {
                        preSelectService('half-day-morning');
                    }
                } else if (packageTitle.includes('8 HRS')) {
                    preSelectService('full-day');
                } else if (packageTitle.includes('PRIVATE')) {
                    preSelectService('custom');
                }
            }

            // Show the booking overlay with animation
            bookingOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling

            // Reset to first step
            goToStep(1);
        });
    });

    // Close booking popup
    closeBookingBtn.addEventListener('click', closeBookingPopup);
    doneButton.addEventListener('click', closeBookingPopup);

    // Close when clicking outside the popup
    bookingOverlay.addEventListener('click', function(e) {
        if (e.target === bookingOverlay) {
            closeBookingPopup();
        }
    });

    // Collapse/expand menu
    collapseMenuBtn.addEventListener('click', function() {
        bookingPopup.classList.toggle('collapsed');

        // Change icon based on state
        const icon = this.querySelector('i');
        if (bookingPopup.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        }
    });

    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));

            // Validate current step before proceeding
            const currentStep = parseInt(this.closest('.booking-form-step').getAttribute('data-step'));
            if (validateStep(currentStep)) {
                goToStep(nextStep);

                // If going to confirmation step, show success message with animation
                if (nextStep === 4) {
                    // Generate a random booking reference
                    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                    const bookingRef = `HOOK-${randomNum}-${bookingData.time.replace(':', '').replace(' ', '')}`;
                    document.getElementById('bookingReference').textContent = bookingRef;

                    // Collect form data
                    bookingData.firstName = document.getElementById('firstName').value;
                    bookingData.lastName = document.getElementById('lastName').value;
                    bookingData.email = document.getElementById('email').value;
                    bookingData.phone = document.getElementById('phone').value;
                    bookingData.specialRequests = document.getElementById('specialRequests').value;

                    // Show success message
                    document.querySelector('.booking-success').classList.add('active');
                }
            }
        });
    });

    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });

    // Service card selection
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            serviceCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            this.classList.add('selected');

            // Update booking data
            const service = this.getAttribute('data-service');
            const serviceName = this.querySelector('.service-title').textContent;
            const priceText = this.querySelector('.service-price').textContent;
            const price = priceText.includes('Contact') ? 'Contact for pricing' : parseInt(priceText.replace('$', ''));

            bookingData.service = service;
            bookingData.serviceName = serviceName;
            bookingData.price = price;

            // Update summary
            updateSummary();
        });
    });

    // Calendar day selection
    calendarDays.forEach(day => {
        if (!day.classList.contains('disabled')) {
            day.addEventListener('click', function() {
                // Remove selected class from all days
                calendarDays.forEach(d => d.classList.remove('selected'));

                // Add selected class to clicked day
                this.classList.add('selected');

                // Update booking data
                const dayNum = this.textContent;
                const month = document.querySelector('.month-title').textContent;
                bookingData.date = `${month} ${dayNum}`;

                // Update summary
                updateSummary();
            });
        }
    });

    // Time slot selection
    timeSlots.forEach(slot => {
        if (!slot.classList.contains('disabled')) {
            slot.addEventListener('click', function() {
                // Remove selected class from all time slots
                timeSlots.forEach(s => s.classList.remove('selected'));

                // Add selected class to clicked time slot
                this.classList.add('selected');

                // Update booking data
                bookingData.time = this.getAttribute('data-time');

                // Update summary
                updateSummary();
            });
        }
    });

    // Participants selection
    document.getElementById('participants').addEventListener('change', function() {
        bookingData.participants = parseInt(this.value);
        updateSummary();
    });

    // Helper Functions
    function closeBookingPopup() {
        bookingOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling

        // Reset form after animation completes
        setTimeout(() => {
            resetForm();
        }, 300);
    }

    function goToStep(stepNumber) {
        // Update steps in sidebar
        bookingSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');

            if (stepNum === stepNumber) {
                step.classList.add('active');
            } else if (stepNum < stepNumber) {
                step.classList.add('completed');
            }
        });

        // Show the correct form step
        formSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNumber) {
                step.classList.add('active');
            }
        });

        // Scroll to top of form
        const bookingContent = document.querySelector('.booking-content');
        bookingContent.scrollTop = 0;
    }

    function validateStep(stepNumber) {
        let isValid = true;

        switch(stepNumber) {
            case 1:
                // Check if a service is selected
                if (!bookingData.service) {
                    alert('Please select a fishing package');
                    isValid = false;
                }
                break;

            case 2:
                // Check if date and time are selected
                if (!bookingData.date || !bookingData.time) {
                    alert('Please select a date and time');
                    isValid = false;
                }
                break;

            case 3:
                // Validate contact information
                const firstName = document.getElementById('firstName');
                const lastName = document.getElementById('lastName');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');

                // Simple validation
                if (!firstName.value.trim()) {
                    showError(firstName, 'Please enter your first name');
                    isValid = false;
                } else {
                    hideError(firstName);
                }

                if (!lastName.value.trim()) {
                    showError(lastName, 'Please enter your last name');
                    isValid = false;
                } else {
                    hideError(lastName);
                }

                if (!email.value.trim() || !isValidEmail(email.value)) {
                    showError(email, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    hideError(email);
                }

                if (!phone.value.trim() || !isValidPhone(phone.value)) {
                    showError(phone, 'Please enter a valid phone number');
                    isValid = false;
                } else {
                    hideError(phone);
                }
                break;
        }

        return isValid;
    }

    function showError(inputElement, message) {
        inputElement.classList.add('invalid');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        }
    }

    function hideError(inputElement) {
        inputElement.classList.remove('invalid');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.classList.remove('visible');
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        // Simple validation - at least 10 digits
        const re = /^[0-9+\-\s()]{10,}$/;
        return re.test(phone);
    }

    function updateSummary() {
        // Update summary section
        document.getElementById('summaryService').textContent = bookingData.serviceName;
        document.getElementById('summaryDate').textContent = bookingData.date;
        document.getElementById('summaryTime').textContent = bookingData.time;
        document.getElementById('summaryParticipants').textContent = `${bookingData.participants} ${bookingData.participants === 1 ? 'person' : 'people'}`;

        // Calculate total price
        let totalPrice = bookingData.price;
        if (typeof totalPrice === 'number') {
            // Add additional participant fees if applicable
            if (bookingData.participants > 4) {
                const additionalParticipants = bookingData.participants - 4;
                const additionalFee = bookingData.service === 'full-day' ? 50 : 35;
                totalPrice += additionalParticipants * additionalFee;
            }

            document.getElementById('summaryTotal').textContent = `$${totalPrice}`;
        } else {
            document.getElementById('summaryTotal').textContent = totalPrice;
        }
    }

    function resetForm() {
        // Reset all form fields
        const form = document.querySelectorAll('.booking-form-step input, .booking-form-step select, .booking-form-step textarea');
        form.forEach(field => {
            field.value = '';
            field.classList.remove('invalid');
        });

        // Hide all error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('visible');
        });

        // Reset service selection
        serviceCards.forEach(card => card.classList.remove('selected'));
        serviceCards[0].classList.add('selected');

        // Reset calendar selection
        calendarDays.forEach(day => day.classList.remove('selected'));
        document.querySelector('.calendar-day.today').classList.add('selected');

        // Reset time slot selection
        timeSlots.forEach(slot => slot.classList.remove('selected'));
        timeSlots[1].classList.add('selected');

        // Reset booking data
        bookingData = {
            service: 'half-day-morning',
            serviceName: 'Half-Day Morning',
            price: 460,
            participants: 4,
            date: 'May 21, 2025',
            time: '8:00 AM',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            specialRequests: ''
        };

        // Reset to first step
        goToStep(1);

        // Reset success message
        document.querySelector('.booking-success').classList.remove('active');
    }

    function preSelectService(serviceId) {
        // Find and select the service card
        serviceCards.forEach(card => {
            if (card.getAttribute('data-service') === serviceId) {
                // Simulate a click on this card
                card.click();
            }
        });
    }

    // Initialize the form
    resetForm();
    updateSummary();

    // Pre-select the first service card
    serviceCards[0].classList.add('selected');
});
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
