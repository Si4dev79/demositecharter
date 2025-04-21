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
